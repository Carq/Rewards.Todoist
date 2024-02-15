using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Projects.Entities;

namespace Rewards.Todoist.Domain.Projects.Storage;

public class ProjectContext : DbContext
{
    private readonly string _dbPath; 

    public ProjectContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        _dbPath = Path.Join(path, "Rewards.db");
    }

    public DbSet<TaskEntity> Tasks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite($"Data Source={_dbPath}");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProjectContext).Assembly);
    }
}
