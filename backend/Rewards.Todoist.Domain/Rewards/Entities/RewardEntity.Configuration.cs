using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Storage;

namespace Rewards.Todoist.Domain.Rewards.Entities;

public class RewardEntityConfiguration : IEntityTypeConfiguration<RewardEntity>
{
    public void Configure(EntityTypeBuilder<RewardEntity> builder)
    {
        builder.ToTable("Rewards");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(StorageConst.ShortNameLength).IsRequired();
        builder.Property(x => x.RequiredGold).IsRequired();
        builder.HasData(RewardEntitySeedData.Initial);
    }
}
