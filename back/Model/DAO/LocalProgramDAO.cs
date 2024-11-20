using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back.Model.DAO;

public partial class LocalProgramDAO
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string UserId { get; set; } = null!;

    public int? ProgramId { get; set; }

    [JsonPropertyName("content")]
    public ProgramModel Content { get; set; } = null!;

    public virtual PublicProgramDAO? Program { get; set; }

    public virtual UserDAO User { get; set; } = null!;
}
