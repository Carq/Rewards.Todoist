using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Rewards.Todoist.Domain.Storage;

namespace Rewards.Todoist.Domain.Users;

internal class UserEntityConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(StorageConst.ShortNameLength).IsRequired();
        builder.Property(x => x.TodoistAccessToken).HasMaxLength(StorageConst.ShortNameLength).IsRequired();
    }
}