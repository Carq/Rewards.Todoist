using MediatR;

namespace Rewards.Todoist.Domain.Projects.Queries;

public record GetDashboardDataQuery : IRequest<GetDashboardDataResult>;

public record GetDashboardDataResult(IEnumerable<UserDashboardData> UsersDashboardData);

public record UserDashboardData(string UserName, IEnumerable<CompletedTask> CompletedTasks);

public record CompletedTask(long Id, string Name, string ProjectName, string[] Labels, DateTimeOffset CompletedDate);
