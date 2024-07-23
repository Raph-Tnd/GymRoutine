namespace back.Model
{
    public class ProgramModel
    {
        public string Name { get; set; }
        public string Author { get; set; }
        public List<SessionModel> Sessions { get; set; }
    }
}
