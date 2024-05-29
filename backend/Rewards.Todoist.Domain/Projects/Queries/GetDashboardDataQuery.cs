using MediatR;

namespace Rewards.Todoist.Domain.Projects.Queries;

public record GetDashboardDataQuery : IRequest<GetDashboardDataResult>;

public record GetDashboardDataResult(IEnumerable<UserDashboardData> UsersDashboardData);

public record UserDashboardData(string UserName, UserExperianceOverview ExperianceOverview, IEnumerable<CompletedTask> CompletedTasks);

public record CompletedTask(long Id, string Name, string ProjectName, string[] Labels, DateTimeOffset CompletedDate);

public record UserExperianceOverview(
    ExperianceSummary Total,
    ExperianceSummary Today,
    ExperianceSummary LastWeek,
    ExperianceSummary CurrentMonth,
    ExperianceSummary LastMonth);

public record ExperianceSummary(int TotalExperience, int TotalTasksCompleted);