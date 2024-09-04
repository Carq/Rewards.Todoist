using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Rewards.Todoist.Domain.Storage;

namespace Rewards.Todoist.Domain.Rewards.Entities;

public class ClaimedRewardConfiguration : IEntityTypeConfiguration<ClaimedReward>
{
    public void Configure(EntityTypeBuilder<ClaimedReward> builder)
    {
        builder.ToTable("ClaimedRewards");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(StorageConst.ShortNameLength).IsRequired();
        builder.Property(x => x.PaidGold).IsRequired();
        builder.Property(x => x.ClaimedOn).IsRequired().HasColumnType("datetime");
        builder.HasOne(x => x.ClaimedBy).WithMany().IsRequired();
    }
}
