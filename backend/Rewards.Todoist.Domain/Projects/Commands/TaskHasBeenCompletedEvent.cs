using MediatR;

namespace Rewards.Todoist.Domain.Projects.Commands;

public record TaskHasBeenCompletedEvent(long UserId, string TaskId) : INotification;
