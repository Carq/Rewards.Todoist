using MediatR;

namespace Rewards.Todoist.Domain.Tasks.Commands;

public class CompleteTaskCommand : IRequest<bool>
{
    public long UserId { get; set; }

    public string TaskId { get; set; }
}
