using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Rewards.Entities;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.UserActivity.Entities;
using Rewards.Todoist.Domain.UserEvents.Entities;

namespace Rewards.Todoist.Domain.UserEvents.Repository;

public class UserActivityRepository
{
    private readonly DomainContext _dbContext;

    public UserActivityRepository(DomainContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserActivityLog> GetUserActivityLog(long UserId, DateTime sinceDate, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.FirstAsync(x => x.Id == UserId) ?? throw new ArgumentException($"User with id {UserId} not found");
        var allCompletedTasks = await _dbContext
                                        .CompletedTasks
                                        .Include(x => x.CompletedBy)
                                        .Where(x => !string.IsNullOrEmpty(x.Labels) && x.CompletedAt >= sinceDate)
                                        .ToArrayAsync(cancellationToken);

        allCompletedTasks = allCompletedTasks.Where(x => x.CompletedBy.Id == UserId).ToArray();
        var sinceDateOnly = DateOnly.FromDateTime(sinceDate.Date).AddMonths(1);
        var allRewards = await _dbContext
                                .ClaimedRewards
                                .Where(x =>x.ClaimedBy.Id == UserId && x.ClaimedOn >= sinceDateOnly)
                                .ToArrayAsync(cancellationToken);
        
        return new UserActivityLog(user, GetActivityLogRecords(user.Id, allCompletedTasks.Where(x => x.CompletedBy.Id == UserId).ToArray(), allRewards));
    }

    public async Task<UserActivityLog[]> GetUserActivityLogs(DateTime sinceDate, CancellationToken cancellationToken)
    {
        var users = await _dbContext.Users.ToListAsync(cancellationToken);
        var allCompletedTasks = 
            await _dbContext
                .CompletedTasks
                .Include(x => x.CompletedBy)
                .Where(x => !string.IsNullOrEmpty(x.Labels) && x.CompletedAt >= sinceDate)
                .ToArrayAsync(cancellationToken);

        var sinceDateOnly = DateOnly.FromDateTime(sinceDate.Date).AddMonths(1);

        var allRewards = await _dbContext
                                    .ClaimedRewards
                                    .Where(x => x.ClaimedOn >= sinceDateOnly)
                                    .ToArrayAsync(cancellationToken);

        return users
            .Select(y => 
                new UserActivityLog(y, GetActivityLogRecords(y.Id, allCompletedTasks, allRewards)))
            .ToArray();
    }

    private ActivityLogRecord[] GetActivityLogRecords(long userId, CompletedTaskEntity[] completedTasks, ClaimedReward[] claimedRewards)
    {
        var completedTaskRecords = completedTasks
            .Where(x => x.CompletedBy.Id == userId)
            .Select(x => new ActivityLogRecord(x.Id, x.Name, x.GetProjectName(), x.GetExperience(), 0, x.GetLabels(), ActivityType.TaskCompleted, x.CompletedAt)).ToArray();
        
        var claimedRewardRecords = claimedRewards
            .Where(x => x.ClaimedBy.Id == userId)
            .Select(x => new ActivityLogRecord(x.Id, x.Name, "Reward", 0, x.PaidGold, [$"Gold{x.PaidGold}"], ActivityType.RewardClaimed, x.ClaimedOn.ToDateTime(TimeOnly.MinValue))).ToArray();

        return completedTaskRecords.Concat(claimedRewardRecords).ToArray();
    }
}
