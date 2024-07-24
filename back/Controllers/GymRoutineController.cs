using back.Model;
using back.Model.DAO;
using back.Model.DTO;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;

namespace back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GymRoutineController : ControllerBase
    {
        private GymRoutineContext _postgresContext;
        private readonly ILogger<GymRoutineController> _logger;
        private static readonly HttpClient _httpClient = new HttpClient();

        public GymRoutineController(ILogger<GymRoutineController> logger)
        {
            _postgresContext = new GymRoutineContext();
            _logger = logger;
        }

        private async Task<bool> ValidateAccessToken(string user_id, string accessToken)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://oauth2.googleapis.com/tokeninfo?access_token={accessToken}");
                var responseString = await response.Content.ReadAsStringAsync();
                var tokenResponse = JsonSerializer.Deserialize<GoogleAccessTokenDAO>(responseString);
                return tokenResponse != null
                    && tokenResponse.AuthorizedParty == _postgresContext._configuration.GetSection("GoogleAPI").GetValue("ClientID", "")
                    && tokenResponse.EmailVerified == "true"
                    && tokenResponse.Email == user_id
                    && !tokenResponse.IsExpired();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }


        #region GET
        [HttpGet]
        [Route("connexionToken")]
        public async Task<IActionResult> ConnectionToken(string code)
        {
            try
            {
                var values = new Dictionary<string, string>
                {
                    {"code", code },
                    {"client_id", _postgresContext._configuration.GetSection("GoogleAPI").GetValue("ClientID", "") },
                    {"client_secret", _postgresContext._configuration.GetSection("GoogleAPI").GetValue("ClientSecret", "") },
                    {"redirect_uri",  "http://localhost:8081"},
                    {"grant_type", "authorization_code" }

                };

                var content = new FormUrlEncodedContent(values);
                var response = await _httpClient.PostAsync("https://oauth2.googleapis.com/token", content);
                var responseString = await response.Content.ReadAsStringAsync();
                var tokenResponse = JsonSerializer.Deserialize<GoogleTokenResponseDTO>(responseString);

                var result = new
                {
                    AccessToken = tokenResponse.access_token,
                    RefreshToken = tokenResponse.refresh_token,
                    ExpiresIn = tokenResponse.expires_in
                };

                //If the user is new, add it to the database
                var email = new JwtSecurityToken(tokenResponse.id_token).Claims.First(c => c.Type == "Email").Value;
                try
                {
                    using (var db = _postgresContext)
                    {
                        if (!db.Users.Any(user => user.UserId == email))
                        {
                            db.Users.Add(new UserDAO
                            {
                                UserId = email,
                                UserType = "free"
                            });
                            db.SaveChanges();
                        }
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error exchanging code for token: {ex.Message}");
            }


        }


        [HttpGet]
        [Route("programSaved")]
        public async Task<IEnumerable<ProgramDTO>> ProgramSaved(string user_id)
        {
            var programSaved = new List<ProgramDTO>();
            try
            {
                if (Request.Headers.TryGetValue("access_token", out var access_token) && await ValidateAccessToken(user_id, access_token))
                {
                    using (var db = _postgresContext)
                    {
                        programSaved = db.LocalPrograms.Where(program => program.UserId == user_id).Select(program => new ProgramDTO { Id = program.Id, Content = program.Content }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                programSaved = new List<ProgramDTO>();
            }
            return programSaved;
        }

        [HttpGet]
        [Route("searchProgram")]
        public async Task<IEnumerable<ProgramDTO>> SearchProgram(string user_id, string query)
        {
            var programSearched = new List<ProgramDTO>();
            try
            {
                if (Request.Headers.TryGetValue("access_token", out var access_token) && await ValidateAccessToken(user_id, access_token))
                {
                    using (var db = _postgresContext)
                    {
                        programSearched = db.PublicPrograms.Where(program =>
                            (!program.Private || program.Private && program.Users.Any(x => x.UserId == user_id))
                            && (program.Content.Name.Contains(query) || program.Content.Author.Contains(query)))
                            .Select(program => new ProgramDTO { Id = program.ProgramId, Content = program.Content })
                            .ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                programSearched = new List<ProgramDTO>();
            }

            return programSearched;
        }
        #endregion GET

        #region POST
        [HttpPost]
        [Route("saveLocalProgram")]
        public async Task<bool> SaveLocalProgram(string user_id, ProgramDTO program)
        {
            try
            {
                if (Request.Headers.TryGetValue("access_token", out var access_token) && await ValidateAccessToken(user_id, access_token))
                {
                    using (var db = _postgresContext)
                    {
                        var user = db.Users.FirstOrDefault(user => user.UserId == user_id);
                        if (user != null && user.CanAddProgram())
                        {
                            db.LocalPrograms.Add(new LocalProgramDAO
                            {
                                UserId = user_id,
                                ProgramId = program.Id,
                                Content = program.Content
                            });
                            return db.SaveChanges() == 1;
                        }
                        else
                        {
                            _logger.LogInformation("User cannot add a program or does not exist");
                            return false;
                        }
                    }
                }
                else
                {
                    _logger.LogWarning("User not valid");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        [HttpPost]
        [Route("savePublicProgram")]
        public async Task<bool> SavePublicProgram(string user_id, ProgramDTO program)
        {
            //TODO: check if the user saving in public is the author and has right to save publicaly
            try
            {
                if (Request.Headers.TryGetValue("access_token", out var access_token) && await ValidateAccessToken(user_id, access_token))
                {
                    using (var db = _postgresContext)
                    {
                        var user = db.Users.FirstOrDefault(user => user.UserId == user_id);
                        if (user != null && user.CanAddProgram())
                        {
                            db.LocalPrograms.Add(new LocalProgramDAO
                            {
                                UserId = user_id,
                                ProgramId = program.Id,
                                Content = program.Content
                            });
                            return db.SaveChanges() == 1;
                        }
                        else
                        {
                            _logger.LogInformation("User cannot add a program or does not exist");
                            return false;
                        }
                    }
                }
                else
                {
                    _logger.LogWarning("User not valid");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }
        #endregion POST

        #region DELETE
        [HttpDelete]
        [Route("deleteLocalProgram")]
        public async Task<bool> DeleteLocalProgram(string user_id, int id)
        {
            try
            {
                if (Request.Headers.TryGetValue("access_token", out var access_token) && await ValidateAccessToken(user_id, access_token))
                {
                    using (var db = _postgresContext)
                    {
                        var programFound = db.LocalPrograms.FirstOrDefault(prog => prog.UserId == user_id && prog.Id == id);
                        if (programFound != null)
                        {
                            db.LocalPrograms.Remove(programFound);
                            return db.SaveChanges() == 1;
                        }
                        else
                        {
                            _logger.LogInformation("User or program does not exist");
                            return false;
                        }
                    }
                }
                else
                {
                    _logger.LogWarning("User not valid");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        [HttpDelete]
        [Route("deletePublicProgram")]
        public async Task<bool> DeletePublicProgram(string user_id, int id)
        {
            try
            {
                if (Request.Headers.TryGetValue("access_token", out var access_token) && await ValidateAccessToken(user_id, access_token))
                {
                    using (var db = _postgresContext)
                    {
                        var programFound = db.PublicPrograms.FirstOrDefault(prog => prog.Content.Author == user_id && prog.ProgramId == id);
                        if (programFound != null)
                        {
                            db.PublicPrograms.Remove(programFound);
                            return db.SaveChanges() == 1;
                        }
                        else
                        {
                            _logger.LogInformation("User does not exist");
                            return false;
                        }
                    }
                }
                else
                {
                    _logger.LogWarning("User not valid");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }
        #endregion DELETE


    }
}
