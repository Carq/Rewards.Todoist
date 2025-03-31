using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Configuration;
using Rewards.Todoist.Domain.Rewards.Entities;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.UserEvents.Repository;

namespace Rewards.Todoist.Domain.Rewards.Repositories;

public class RewardsRepository(DomainContext Context, UserActivityRepository UserActivityRepository)
{
    public async Task<RewardEntity> GetReward(int rewardId, CancellationToken cancellationToken)
    {
        return (await Context.Rewards.FindAsync(rewardId, cancellationToken)) ?? throw new ArgumentException($"Reward with id {rewardId} not found");
    }

    public async Task<Claimer> GetClaimer(long userId, CancellationToken cancellationToken)
    {
        var userActivityLog = await UserActivityRepository.GetUserActivityLog(userId, DomainSettings.StartDate, cancellationToken);
        var sinceDay = DateOnly.FromDateTime(DomainSettings.StartDate.Date).AddMonths(1);
        var claimedRewards = await Context.ClaimedRewards.Where(x => x.ClaimedBy.Id == userId && x.ClaimedOn >= sinceDay).ToArrayAsync(cancellationToken);
        return new Claimer(userActivityLog.User, userActivityLog, claimedRewards);
    }

    internal async Task Save(Claimer claimer, CancellationToken cancellationToken)
    {
        await Context.ClaimedRewards.AddRangeAsync(claimer.ClaimedRewards.Where(x => x.Id == 0), cancellationToken);
        await Context.SaveChangesAsync(cancellationToken);
    }
}
