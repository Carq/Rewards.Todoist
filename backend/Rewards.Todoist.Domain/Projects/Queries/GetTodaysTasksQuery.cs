using MediatR;

namespace Rewards.Todoist.Domain.Projects.Queries;

public record GetTodaysTasksQuery : IRequest<GetTodaysTasksQueryResult>;

public record GetTodaysTasksQueryResult(Task[] Tasks);

public record Task(string Id, string Name, string ActivityArea, string[] Tags, IdForUser[] IdForUsers);

public record IdForUser(long UserId, string TaskId);

