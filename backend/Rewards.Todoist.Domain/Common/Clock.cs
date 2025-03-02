using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Common;

public class Clock : IClock
{
    public DateTimeOffset Now => DateTimeOffset.Now;
}
