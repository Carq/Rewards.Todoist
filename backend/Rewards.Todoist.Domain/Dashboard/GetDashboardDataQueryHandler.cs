﻿using MediatR;
using Rewards.Todoist.Domain.UserActivity.Entities;
using Rewards.Todoist.Domain.UserEvents.Entities;
using Rewards.Todoist.Domain.UserEvents.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Dashboard;

public class GetDashboardDataQueryHandler(UserActivityRepository UserActivityRepository, IClock Clock, AuthContext AuthContext) 
    : IRequestHandler<GetDashboardDataQuery, GetDashboardDataResult>
{
    public async Task<GetDashboardDataResult> Handle(GetDashboardDataQuery request, CancellationToken cancellationToken)
    {
        var userActivityLogs = await UserActivityRepository.GetUserActivityLogs(cancellationToken);
        var yesterday = Clock.Now.AddDays(-1).Date;
        return new GetDashboardDataResult(
            userActivityLogs.Select(x =>
            new UserDashboardDataDto(
                new UserInfoDto(x.User.Id, HideSensitiveData(x.User.Name)),
                new UserStatsDto(x.GetExp(), x.GetGold()),
               MapToUserExperianceOverview(x.Activities.Where(x => x.Type == ActivityType.TaskCompleted)),
               GetRecentCompletedTasks(x),
               GetRecentClaimedRewards(x)))
            .ToArray());
    }

    private UserActivityRecordDto[] GetRecentCompletedTasks(UserActivityLog x)
    {
        return x.Activities
                    .Where(x => x.Type == ActivityType.TaskCompleted)
                    .OrderByDescending(y => y.OccurredOn)
                    .Take(5)
                    .Select(y => new UserActivityRecordDto(y.Id, HideSensitiveData(y.Name), y.ActivityArea, y.Tags, y.OccurredOn)).ToArray();
    }

    private UserActivityRecordDto[] GetRecentClaimedRewards(UserActivityLog x)
    {
        return x.Activities
                    .Where(x => x.Type == ActivityType.RewardClaimed)
                    .OrderByDescending(y => y.OccurredOn)
                    .Take(5)
                    .Select(y => new UserActivityRecordDto(y.Id, HideSensitiveData(y.Name), y.ActivityArea, HideSensitiveData(y.Tags), y.OccurredOn)).ToArray();
    }

    private IDictionary<DateOnly, ExperianceSummary> MapToUserExperianceOverview(IEnumerable<ActivityLogRecord> activityLogRecords)
    {
        var startDate = Clock.Now.AddDays(-5).Date;
        var endDate = Clock.Now.Date;
        var dateRange = Enumerable.Range(0, (int)(endDate - startDate).TotalDays + 1)
                                  .Select(offset => startDate.AddDays(offset));

        var experianceOverview = dateRange.ToDictionary(date => DateOnly.FromDateTime(date), _ => new ExperianceSummary(0, 0));

        foreach (var activityLogRecord in activityLogRecords)
        {
            var occurredOnDate = DateOnly.FromDateTime(activityLogRecord.OccurredOn.Date);
            if (experianceOverview.ContainsKey(occurredOnDate))
            {
                var summary = experianceOverview[occurredOnDate];
                experianceOverview[occurredOnDate] = summary with
                {
                    TotalExperience = summary.TotalExperience + activityLogRecord.ExpImpact,
                    TotalTasksCompleted = summary.TotalTasksCompleted + 1
                };
            }
        }

        return experianceOverview;
    }

    private ExperianceSummary MapToExperianceSummary(IEnumerable<ActivityLogRecord> activityLogRecords)
    {
        return new ExperianceSummary(activityLogRecords.Sum(x => x.ExpImpact), activityLogRecords.Count());
    }
    
    private string HideSensitiveData(string data)
    {
        if (AuthContext.IsAuthorized)
        {
            return data;
        }

        return new string('˟', Math.Min(data.Length, 20));
        
    }

    

    private string[] HideSensitiveData(string[] data)
    {
        if (AuthContext.IsAuthorized)
        {
            return data;
        }

        return data.Select(x => new string(x.Where(c => !char.IsDigit(c)).ToArray())).ToArray();
    }
}