using MediatR;

namespace Rewards.Todoist.Domain.Dashboard;

public record GetDashboardDataQuery : IRequest<GetDashboardDataResult>;

public record GetDashboardDataResult(UserDashboardDataDto[] Users);

public record UserDashboardDataDto(UserInfoDto Info, UserStatsDto Stats, UserExperianceOverview Overview, UserActivityRecordDto[] Activities);

public record UserStatsDto(int Experience, int Gold);

public record UserInfoDto(long Id, string Name);

public record UserActivityRecordDto(long Id, string Name, string ActivityArea, string[] Tags, DateTime OccurredOn);

public record UserExperianceOverview(
    ExperianceSummary Total,
    ExperianceSummary Today,
    ExperianceSummary Yesterday,
    ExperianceSummary LastWeek,
    ExperianceSummary CurrentMonth,
    ExperianceSummary LastMonth);

public record ExperianceSummary(int TotalExperience, int TotalTasksCompleted);
