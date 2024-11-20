using back.Model;
using back.Model.DAO;
using back.Model.DTO;
using log4net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;

namespace back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GymRoutineController : ControllerBase
    {
        private GymRoutineContext _postgresContext;
        private static readonly ILog _logger = LogManager.GetLogger(typeof(GymRoutineController));
        private static readonly HttpClient _httpClient = new HttpClient();

        public GymRoutineController(ILogger<GymRoutineController> logger)
        {
            _postgresContext = new GymRoutineContext();
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
                _logger.Error(ex.Message);
                return false;
            }
        }


        #region GET
        [HttpGet]
        [Route("connectionToken")]
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

                _logger.Info("Query to google");
                var content = new FormUrlEncodedContent(values);
                var response = await _httpClient.PostAsync("https://oauth2.googleapis.com/token", content);
                var responseString = await response.Content.ReadAsStringAsync();
                var tokenResponse = JsonSerializer.Deserialize<GoogleTokenResponseDTO>(responseString);

                var result = new
                {
                    AccessToken = tokenResponse.access_token,
                    RefreshToken = tokenResponse.refresh_token,
                    ExpiresIn = tokenResponse.expires_in,
                    IdToken = tokenResponse.id_token,
                };

                _logger.Info("Looking in database");
                //If the user is new, add it to the database
                var email = new JwtSecurityToken(tokenResponse.id_token).Claims.First(c => c.Type == "email").Value;
                try
                {
                    using (var db = _postgresContext)
                    {
                        _logger.Debug("Connected to database");
                        if (!db.Users.Any(user => user.UserId == email))
                        {
                            _logger.Debug("Adding user");
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
                    _logger.Error(ex);
                    return StatusCode(500);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                return BadRequest($"Error exchanging code for token: {ex.Message}");
            }


        }


        [HttpGet]
        [Route("programSaved")]
        public async Task<IActionResult> ProgramSaved(string user_id)
        {
            var programSaved = new List<ProgramDTO>();
            try
            {
                if (Request.Headers.TryGetValue("access_token", out var access_token) && await ValidateAccessToken(user_id, access_token))
                {
                    using (var db = _postgresContext)
                    {
                        programSaved = db.LocalPrograms.Where(program => program.UserId == user_id).AsNoTracking().Select(program => new ProgramDTO { Id = program.Id, Content = program.Content }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.Message);
                return StatusCode(500);
            }
            return Ok(programSaved);
        }

        [HttpGet]
        [Route("searchProgram")]
        public async Task<IActionResult> SearchProgram(string user_id, string query)
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
                _logger.Error(ex.Message);
                return StatusCode(500);

            }

            return Ok(programSearched);
        }
        #endregion GET

        #region POST
        [HttpPost]
        [Route("saveLocalProgram")]
        public async Task<IActionResult> SaveLocalProgram(string user_id, ProgramDTO program)
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
                            return Ok(db.SaveChanges() == 1);
                        }
                        else
                        {
                            _logger.Info("User cannot add a program or does not exist");
                            return BadRequest();
                        }
                    }
                }
                else
                {
                    _logger.Warn("User not valid");
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Route("savePublicProgram")]
        public async Task<IActionResult> SavePublicProgram(string user_id, ProgramDTO program)
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
                            return Ok(db.SaveChanges() == 1);
                        }
                        else
                        {
                            _logger.Info("User cannot add a program or does not exist");
                            return BadRequest();
                        }
                    }
                }
                else
                {
                    _logger.Warn("User not valid");
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.Message);
                return BadRequest();
            }
        }
        #endregion POST

        #region DELETE
        [HttpDelete]
        [Route("deleteLocalProgram")]
        public async Task<IActionResult> DeleteLocalProgram(string user_id, int id)
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
                            return Ok(db.SaveChanges() == 1);
                        }
                        else
                        {
                            _logger.Info("User or program does not exist");
                            return BadRequest();
                        }
                    }
                }
                else
                {
                    _logger.Warn("User not valid");
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpDelete]
        [Route("deletePublicProgram")]
        public async Task<IActionResult> DeletePublicProgram(string user_id, int id)
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
                            return Ok(db.SaveChanges() == 1);
                        }
                        else
                        {
                            _logger.Info("User does not exist");
                            return BadRequest();
                        }
                    }
                }
                else
                {
                    _logger.Warn("User not valid");
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.Message);
                return StatusCode(500);
            }
        }
        #endregion DELETE


    }
}
