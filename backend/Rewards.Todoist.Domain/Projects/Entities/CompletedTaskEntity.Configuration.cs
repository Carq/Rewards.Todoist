using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Rewards.Todoist.Domain.Storage;

namespace Rewards.Todoist.Domain.Projects.Entities;

public class CompletedTaskEntityConfiguration : IEntityTypeConfiguration<CompletedTaskEntity>
{
    public void Configure(EntityTypeBuilder<CompletedTaskEntity> builder)
    {
        builder.ToTable("CompletedTasks");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).HasMaxLength(64).IsRequired();
        builder.Property(x => x.Name).HasMaxLength(StorageConst.ShortNameLength).IsRequired();
        builder.Property(x => x.Labels).HasMaxLength(StorageConst.ShortDescriptionLength).IsRequired();
        builder.Property(x => x.ProjectId).IsRequired();
        builder.Property(x => x.CompletedAt).HasColumnType("datetime").HasConversion(x => x, x => DateTime.SpecifyKind(x, DateTimeKind.Utc));
        builder.HasOne(x => x.CompletedBy).WithMany().IsRequired();
    }
}
