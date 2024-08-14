
namespace Rewards.Todoist.Domain.Rewards.Entities;

public class RewardEntity
{
    public RewardEntity(int id, string name, int requiredGold)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        RequiredGold = requiredGold;
    }

    public int Id { get; private set; }

    public string Name { get; private set; }

    public int RequiredGold { get; private set; }
}
