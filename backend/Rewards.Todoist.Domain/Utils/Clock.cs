namespace Rewards.Todoist.Domain.Utils;

public class Clock : IClock
{
    public DateTimeOffset Now => DateTimeOffset.Now;
}
