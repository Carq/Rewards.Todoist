using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.UserEvents.Entities;
using System.Linq;

namespace Rewards.Todoist.Domain.UserEvents.Repository;

public class UserHistoryRepository
{
    private readonly DomainContext _dbContext;

    public UserHistoryRepository(DomainContext dbContext)
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
}
