namespace back.Model.DAO;

public partial class PublicProgramDAO
{
    public int ProgramId { get; set; }

    public ProgramModel Content { get; set; } = null!;

    public bool Private { get; set; }

    public virtual ICollection<LocalProgramDAO> LocalPrograms { get; set; } = new List<LocalProgramDAO>();

    public virtual ICollection<UserDAO> Users { get; set; } = new List<UserDAO>();
}
