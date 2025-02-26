using MediatR;

namespace Rewards.Todoist.Domain.Tasks.Commands;

public record CompleteTaskCommand : IRequest
{
    public long UserId { get; set; }

    public string TaskId { get; set; }
}
