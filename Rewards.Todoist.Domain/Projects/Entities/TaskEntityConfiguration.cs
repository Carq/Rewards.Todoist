using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Rewards.Todoist.Domain.Storage;

namespace Rewards.Todoist.Domain.Projects.Entities;

public class TaskEntityConfiguration : IEntityTypeConfiguration<TaskEntity>
{
    public void Configure(EntityTypeBuilder<TaskEntity> builder)
    {
        builder.ToTable("Tasks");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(StorageConst.ShortNameLength).IsRequired();
        builder.Property(x => x.Labels).HasMaxLength(StorageConst.ShortDescriptionLength).IsRequired();
        builder.Property(x => x.ProjectId).IsRequired();
    }
}
