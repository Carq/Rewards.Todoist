using MediatR;

namespace Rewards.Todoist.Domain.Projects.DomainEvents;

public record TaskHasBeenCompletedEvent(long UserId, string TaskId) : INotification;
