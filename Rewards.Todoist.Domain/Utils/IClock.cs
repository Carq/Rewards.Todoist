namespace Rewards.Todoist.Domain.Utils;

public interface IClock
{
    DateTimeOffset Now { get; }
}
