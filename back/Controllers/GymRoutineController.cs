using back.Model;
using back.Model.DAO;
using back.Model.DTO;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GymRoutineController : ControllerBase
    {
        private GymRoutineContext _postgresContext;
        private readonly ILogger<GymRoutineController> _logger;

        public GymRoutineController(ILogger<GymRoutineController> logger)
        {
            _postgresContext = new GymRoutineContext();
            _logger = logger;
        }


        #region GET
        [HttpGet]
        [Route("programSaved")]
        public IEnumerable<ProgramDTO> ProgramSaved(string user_id)
        {
            List<ProgramDTO> programSaved;
            try
            {
                using (var db = _postgresContext)
                {
                    programSaved = db.LocalPrograms.Where(program => program.UserId == user_id).Select(program => new ProgramDTO { Id = program.Id, Content = program.Content }).ToList();
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
        public IEnumerable<ProgramDTO> SearchProgram(string user_id, string query)
        {
            List<ProgramDTO> programSearched;
            try
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
        public bool SaveLocalProgram(string user_id, ProgramDTO program)
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        [HttpPost]
        [Route("savePublicProgram")]
        public bool SavePublicProgram(string user_id, ProgramDTO program)
        {
            //TODO: check if the user saving in public is the author and has right to save publicaly
            try
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
        public bool DeleteLocalProgram(string user_id, int id)
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        [HttpDelete]
        [Route("deletePublicProgram")]
        public bool DeletePublicProgram(string user_id, int id)
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }
        #endregion DELETE


    }
}
