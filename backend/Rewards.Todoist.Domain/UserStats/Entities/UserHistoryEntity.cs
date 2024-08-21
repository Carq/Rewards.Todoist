using Rewards.Todoist.Domain.Projects.Entities;

namespace Rewards.Todoist.Domain.UserStats.Entities;

public class UserHistoryEntity
{
    public UserHistoryEntity(long id, string name, CompletedTaskEntity[] completedTasks)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        CompletedTasks = completedTasks ?? [];
    }

    public long Id { get; private set; }

    public string Name { get; private set; }

    public CompletedTaskEntity[] CompletedTasks { get; }

    public int GetExp()
    {
        return CompletedTasks.Sum(x => x.GetExperience());
    }

    public int GetGold()
    {
        return (int)Math.Floor(CompletedTasks.Sum(x => x.GetExperience()) / 10m);
    }
}
