using MediatR;

namespace Rewards.Todoist.Domain.Projects.Queries;

public record GetCompletedTasksForLastWeekQuery() : IRequest<CompletedTasksResult>;

public record CompletedTasksResult(IEnumerable<UserCompletedTasks> UserCompletedTasks);

public record UserCompletedTasks(string UserName, IEnumerable<CompletedTask> CompletedTasks);

public record CompletedTask(long Id, string Name, string ProjectName, string[] Labels, DateTimeOffset CompletedDate);
