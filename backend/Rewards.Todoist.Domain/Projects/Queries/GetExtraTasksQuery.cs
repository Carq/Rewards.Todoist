using MediatR;

namespace Rewards.Todoist.Domain.Projects.Queries;

public record GetExtraTasksQuery : IRequest<GetExtraTasksQueryResult>;

public record GetExtraTasksQueryResult(Task[] Tasks);
