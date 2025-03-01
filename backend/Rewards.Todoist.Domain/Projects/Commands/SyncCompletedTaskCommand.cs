using MediatR;

namespace Rewards.Todoist.Domain.Projects.Commands;

public record SyncCompletedTaskCommand(long UserId, string TaskId) : IRequest;
