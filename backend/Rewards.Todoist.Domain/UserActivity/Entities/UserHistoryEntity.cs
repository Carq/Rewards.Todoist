using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Rewards.Entities;

namespace Rewards.Todoist.Domain.UserEvents.Entities;

public class UserHistoryEntity
{
    public UserHistoryEntity(long id, string name, CompletedTaskEntity[] completedTasks, ClaimedReward[] claimedRewards)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        CompletedTasks = completedTasks ?? [];
        ClaimedRewards = claimedRewards ?? [];
    }

    public long Id { get; private set; }

    public string Name { get; private set; }

    public CompletedTaskEntity[] CompletedTasks { get; }

    public ClaimedReward[] ClaimedRewards{ get; }

    public int GetExp()
    {
        return CompletedTasks.Sum(x => x.GetExperience());
    }

    public int GetGold()
    {
        return GetGoldFromCompletedTasks() - GetGoldFromClaimedRewards();
    }

    private int GetGoldFromCompletedTasks()
    {
        return (int)Math.Floor(CompletedTasks.Sum(x => x.GetExperience()) / 10m);
    }

    private int GetGoldFromClaimedRewards()
    {
        return ClaimedRewards.Sum(x => x.PaidGold);
    }
}
