namespace back.Model;

public partial class Program
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Author { get; set; } = null!;

    public string Content { get; set; } = null!;

    public virtual User AuthorNavigation { get; set; } = null!;
}
