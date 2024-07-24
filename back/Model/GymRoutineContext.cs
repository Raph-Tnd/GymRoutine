using back.Model.DAO;
using Microsoft.EntityFrameworkCore;

namespace back.Model;

public partial class GymRoutineContext : DbContext
{
    public GymRoutineContext()
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();
        _configuration = configuration;
    }

    public GymRoutineContext(DbContextOptions<GymRoutineContext> options)
        : base(options)
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();
        _configuration = configuration;
    }

    public readonly IConfiguration _configuration;
    public virtual DbSet<LocalProgramDAO> LocalPrograms { get; set; }

    public virtual DbSet<PublicProgramDAO> PublicPrograms { get; set; }

    public virtual DbSet<UserDAO> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Postgres"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LocalProgramDAO>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("localprogram_pkey");

            entity.ToTable("localprogram");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.OwnsOne(e => e.Content, content =>
            {
                content.ToJson();
                content.OwnsMany(e => e.Sessions, sessions =>
                {
                    sessions.ToJson();
                    sessions.OwnsMany(e => e.Exercises, exercises =>
                    {
                        exercises.ToJson();
                        exercises.OwnsMany(e => e.Metrics, metrics =>
                        {
                            metrics.ToJson();
                        });
                    });
                });
            });
            entity.Property(e => e.ProgramId).HasColumnName("program_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Program).WithMany(p => p.LocalPrograms)
                .HasForeignKey(d => d.ProgramId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("localprogram_program_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.LocalPrograms)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("localprogram_user_id_fkey");
        });

        modelBuilder.Entity<PublicProgramDAO>(entity =>
        {
            entity.HasKey(e => e.ProgramId).HasName("publicprogram_pkey");

            entity.ToTable("publicprogram");

            entity.Property(e => e.ProgramId).HasColumnName("program_id");
            entity.Property(e => e.Content)
                .HasColumnType("jsonb")
                .HasColumnName("content");
            entity.Property(e => e.Private).HasColumnName("private");

            entity.HasMany(d => d.Users).WithMany(p => p.PublicPrograms)
                .UsingEntity<Dictionary<string, object>>(
                    "Privateprogramaccess",
                    r => r.HasOne<UserDAO>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("privateprogramaccess_user_id_fkey"),
                    l => l.HasOne<PublicProgramDAO>().WithMany()
                        .HasForeignKey("ProgramId")
                        .HasConstraintName("privateprogramaccess_program_id_fkey"),
                    j =>
                    {
                        j.HasKey("ProgramId", "UserId").HasName("privateprogramaccess_pkey");
                        j.ToTable("privateprogramaccess");
                        j.IndexerProperty<int>("ProgramId").HasColumnName("program_id");
                        j.IndexerProperty<string>("UserId").HasColumnName("user_id");
                    });
        });

        modelBuilder.Entity<UserDAO>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("user_pkey");

            entity.ToTable("user");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.UserType).HasColumnName("user_type");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
