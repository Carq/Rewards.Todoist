using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Configuration;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Rewards.Entities;
using Rewards.Todoist.Domain.Users;

namespace Rewards.Todoist.Domain.Storage;

public class DomainContext : DbContext
{
    private readonly DomainSettings _settings;

    public DomainContext(DomainSettings settings)
    {
        _settings = settings;
    }

    public DbSet<CompletedTaskEntity> CompletedTasks { get; set; }

    public DbSet<RewardEntity> Rewards { get; set; }

    public DbSet<User> Users { get; set; }

    //protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite($"Data Source=/home/site/wwwroot/App_Data/Rewards.db");
    protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite(_settings.DbConnectionString);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DomainContext).Assembly);
    }
}
