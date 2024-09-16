using Rewards.Todoist.Domain.Rewards.Entities;
using Rewards.Todoist.Domain.Users;

namespace Rewards.Todoist.Domain.UserActivity.Entities;

public class UserActivityLog : IUserGold
{
    public UserActivityLog(User user, IList<ActivityLogRecord> activities)
    {
        User = user ?? throw new ArgumentNullException(nameof(user));
        Activities.AddRange(activities);
    }

    public User User { get; }

    public List<ActivityLogRecord> Activities { get; } = [];

    public int GetExp()
    {
        return Activities.Sum(x => x.ExpImpact);
    }

    public int GetGold()
    {
        return GetGoldFromCompletedTasks() - GetGoldFromClaimedRewards();
    }

    private int GetGoldFromCompletedTasks()
    {
        return (int)Math.Floor(Activities.Sum(x => x.ExpImpact) / 10m);
    }

    private int GetGoldFromClaimedRewards()
    {
        return Activities.Sum(x => x.GoldImpact);
    }
}
