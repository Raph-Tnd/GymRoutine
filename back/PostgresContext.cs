using back.Model;
using Microsoft.EntityFrameworkCore;

namespace back;

public partial class PostgresContext : DbContext
{
    public PostgresContext()
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();
        this._configuration = configuration;
    }

    public PostgresContext(DbContextOptions<PostgresContext> options)
        : base(options)
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();
        this._configuration = configuration;
        this._configuration = configuration;
    }

    public virtual DbSet<Program> Programs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    private readonly IConfiguration _configuration;
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Postgres"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Program>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("program_pkey");

            entity.ToTable("program");

            entity.Property(e => e.Id)
                .HasColumnType("character varying")
                .HasColumnName("id");
            entity.Property(e => e.Author)
                .HasColumnType("character varying")
                .HasColumnName("author");
            entity.Property(e => e.Content)
                .HasColumnType("json")
                .HasColumnName("content");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");

            entity.HasOne(d => d.AuthorNavigation).WithMany(p => p.Programs)
                .HasForeignKey(d => d.Author)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("program_author_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("user_pkey");

            entity.ToTable("user");

            entity.Property(e => e.Id)
                .HasColumnType("character varying")
                .HasColumnName("id");
            entity.Property(e => e.Usertype)
                .HasColumnType("character varying")
                .HasColumnName("usertype");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
