using Rewards.Todoist.Domain.Users;

namespace Rewards.Todoist.Domain.Rewards.Entities;

public class Claimer
{
    public Claimer(User user, IUserGold userGold)
    {
        User = user;
        UserGold = userGold;
    }

    public User User { get; }

    public IUserGold UserGold { get; }

    public IList<ClaimedReward> ClaimedRewards { get; } = [];

    public void ClaimReward(RewardEntity reward, DateOnly claimedOn)
    {
        if (reward.RequiredGold > UserGold.GetGold())
        { 
            throw new InvalidOperationException("User does not have enough gold to claim this reward.");
        }

        ClaimedRewards.Add(new ClaimedReward(reward.Id, reward.Name, reward.RequiredGold, User, claimedOn));
    }
}
