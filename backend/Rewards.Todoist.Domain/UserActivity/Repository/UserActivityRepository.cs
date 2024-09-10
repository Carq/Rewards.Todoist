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

    public async Task<UserHistoryEntity[]> GetUserHistories(CancellationToken cancellationToken)
    {
        var allCompletedTasks = await _dbContext.CompletedTasks.Include(x => x.CompletedBy).ToListAsync(cancellationToken);
        var allRewards = await _dbContext.ClaimedRewards.ToListAsync(cancellationToken);

        return allCompletedTasks
            .GroupBy(x => x.CompletedBy.Id)
            .Select(y => new UserHistoryEntity(
                y.Key,
                y.First().CompletedBy.Name,
                y.ToArray(),
                allRewards.Where(x => x.ClaimedBy.Id == y.Key).ToArray()))
            .ToArray();
    }

    public async Task<UserActivityLog[]> GetUserActivityLogs(CancellationToken cancellationToken)
    {
        var users = await _dbContext.Users.ToListAsync(cancellationToken);
        var allCompletedTasks = await _dbContext.CompletedTasks.Include(x => x.CompletedBy).ToArrayAsync(cancellationToken);
        var allRewards = await _dbContext.ClaimedRewards.ToArrayAsync(cancellationToken);

        return users
            .Select(y => 
                new UserActivityLog(y, GetActivityLogRecords(y.Id, allCompletedTasks, allRewards)))
            .ToArray();
    }

    private ActivityLogRecord[] GetActivityLogRecords(long userId, CompletedTaskEntity[] completedTasks, ClaimedReward[] claimedRewards)
    {
        var completedTaskRecords = completedTasks
            .Where(x => x.CompletedBy.Id == userId)
            .Select(x => new ActivityLogRecord(x.Name, x.GetExperience(), 0, ActivityType.TaskCompleted, x.CompletedAt)).ToArray();
        
        var claimedRewardRecords = claimedRewards
            .Where(x => x.ClaimedBy.Id == userId)
            .Select(x => new ActivityLogRecord(x.Name, 0, x.PaidGold, ActivityType.RewardClaimed, x.ClaimedOn)).ToArray();

        return completedTaskRecords.Concat(claimedRewardRecords).ToArray();
    }
}
