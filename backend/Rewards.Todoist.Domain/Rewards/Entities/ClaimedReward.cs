using Rewards.Todoist.Domain.Users;

namespace Rewards.Todoist.Domain.Rewards.Entities;

public class ClaimedReward
{
    public ClaimedReward(int id, string name, int paidGold, User claimedBy, DateTime claimedOn)
        : this(id, name, paidGold, claimedOn)
    {
        ClaimedBy = claimedBy ?? throw new ArgumentNullException(nameof(claimedBy));
    }

    private ClaimedReward(int id, string name, int paidGold, DateTime claimedOn)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        PaidGold = ValidadatePaidGold(paidGold);
        ClaimedOn = claimedOn;
    }

    public int Id { get; private set; }

    public string Name { get; private set; }

    public int PaidGold { get; private set; }

    public User ClaimedBy { get; private set; }
    
    public DateTime ClaimedOn { get; private set; }

    private int ValidadatePaidGold(int gold)
    {
        if (gold < 0)
        {
            throw new ArgumentException("Paid Gold cannot be less than 0");
        }

        return gold;
    }
}
