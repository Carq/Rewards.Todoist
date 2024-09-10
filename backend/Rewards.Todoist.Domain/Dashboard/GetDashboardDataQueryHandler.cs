using MediatR;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.UserActivity.Entities;
using Rewards.Todoist.Domain.UserEvents.Entities;
using Rewards.Todoist.Domain.UserEvents.Repository;
using Rewards.Todoist.Domain.Utils;
using System.Linq;

namespace Rewards.Todoist.Domain.Dashboard;

public class GetDashboardDataQueryHandler(UserActivityRepository UserActivityRepository, IClock Clock) 
    : IRequestHandler<GetDashboardDataQuery, GetDashboardDataResult>
{

    public async Task<GetDashboardDataResult> Handle(GetDashboardDataQuery request, CancellationToken cancellationToken)
    {
        var userActivityLogs = await UserActivityRepository.GetUserActivityLogs(cancellationToken);
        var yesterday = Clock.Now.AddDays(-1).Date;


        return new GetDashboardDataResult(
            userActivityLogs.Select(x =>
            new UserDashboardDataDto(
                new UserInfoDto(x.User.Id, x.User.Name),
                new UserStatsDto(x.GetExp(), x.GetGold()),
               MapToUserExperianceOverview(x.Activities.Where(x => x.Type == ActivityType.TaskCompleted)),
                x.Activities
                    .Where(y => y.OccurredOn >= yesterday)
                    .OrderByDescending(y => y.OccurredOn)
                    .Select(y => 
                        new UserActivityRecordDto(y.Id, y.Name, y.ActivityArea, y.Tags, y.OccurredOn)).ToArray()))
            .ToArray());
    }

    private UserExperianceOverview MapToUserExperianceOverview(IEnumerable<ActivityLogRecord> activityLogRecords)
    {
        var total = MapToExperianceSummary(activityLogRecords);
        var today = MapToExperianceSummary(activityLogRecords.Where(today => today.OccurredOn.Date == Clock.Now.Date));
        var yesterday = MapToExperianceSummary(activityLogRecords.Where(today => today.OccurredOn.Date == Clock.Now.Date.AddDays(-1).Date));
        var lastWeek = MapToExperianceSummary(activityLogRecords.Where(week => week.OccurredOn.Date >= Clock.Now.AddDays(-7).Date));
        var currentMonth = MapToExperianceSummary(activityLogRecords.Where(month => month.OccurredOn.Month == Clock.Now.Month));
        var lastMonth = MapToExperianceSummary(activityLogRecords.Where(month => month.OccurredOn.Month == Clock.Now.AddMonths(-1).Month));

        return new UserExperianceOverview(total, today, yesterday, lastWeek, currentMonth, lastMonth);
    }

    private ExperianceSummary MapToExperianceSummary(IEnumerable<ActivityLogRecord> activityLogRecords)
    {
        return new ExperianceSummary(activityLogRecords.Sum(x => x.ExpImpact), activityLogRecords.Count());
    }
}