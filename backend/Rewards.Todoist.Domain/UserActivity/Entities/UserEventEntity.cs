using Rewards.Todoist.Domain.Users;

namespace Rewards.Todoist.Domain.UserEvents.Entities;

public class UserEventEntity
{
    public UserEventEntity(int id, string name, int expImpact, int goldImpact, ActivityType type, DateTime occurredAt, User occurredFor)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        ExpImpact = expImpact;
        GoldImpact = goldImpact;
        Type = type;
        OccurredAt = occurredAt;
        OccurredFor = occurredFor ?? throw new ArgumentNullException(nameof(occurredFor));
    }

    public int Id { get; private set; }

    public string Name { get; private set; }

    public int ExpImpact { get; private set; }

    public int GoldImpact { get; private set; }

    public ActivityType Type { get; private set; }

    public DateTime OccurredAt { get; private set; }

    public User OccurredFor { get; private set; }
}
