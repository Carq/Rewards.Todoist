using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.UserStats.Entities;

namespace Rewards.Todoist.Domain.UserStats.Repository;

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

        return allCompletedTasks
            .GroupBy(x => x.CompletedBy.Id)
            .Select(y => new UserHistoryEntity(y.Key, y.First().CompletedBy.Name, y.ToArray()))
            .ToArray();
    }
}
