namespace back.Model.DAO;

public partial class UserDAO
{
    public string UserId { get; set; } = null!;

    public string UserType { get; set; } = null!;

    public virtual ICollection<LocalProgramDAO> LocalPrograms { get; set; } = new List<LocalProgramDAO>();

    public virtual ICollection<PublicProgramDAO> PublicPrograms { get; set; } = new List<PublicProgramDAO>();
    public bool CanAddProgram()
    {
        switch (UserType)
        {
            case "free":
                return PublicPrograms.Count < 2;
            case "premium":
                return PublicPrograms.Count < 5;
            case "coach":
                return true;
            default: return false;
        }
    }
}
