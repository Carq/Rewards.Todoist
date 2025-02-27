using MediatR;

namespace Rewards.Todoist.Domain.Tasks.Commands;

public record CompleteTaskCommand(long UserId, string TaskId) : IRequest;