using Rewards.Todoist.Domain.Users;

namespace Rewards.Todoist.Domain.Rewards.Entities;

public class Claimer
{
    public Claimer(User user, IUserGold userGold, ClaimedReward[]? claimedRewards)
    {
        User = user;
        UserGold = userGold;
        ClaimedRewards.AddRange(claimedRewards ?? []);
    }

    public User User { get; }

    public IUserGold UserGold { get; }

    public List<ClaimedReward> ClaimedRewards { get; } = [];

    public void ClaimReward(RewardEntity reward, DateOnly claimedOn)
    {
        if (ClaimedRewards.Any(x => x.ClaimedOn == claimedOn && x.Name == reward.Name))
        {
            throw new InvalidOperationException("User has already claimed a reward on this date.");
        }

        if (reward.RequiredGold > UserGold.GetGold())
        { 
            throw new InvalidOperationException("User does not have enough gold to claim this reward.");
        }

        ClaimedRewards.Add(new ClaimedReward(reward.Name, reward.RequiredGold, User, claimedOn));
    }
}
