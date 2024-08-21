
namespace Rewards.Todoist.Domain.Rewards.Entities;

public class RewardEntity
{
    public RewardEntity(int id, string name, int requiredGold)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        RequiredGold = ValidadateRequiredGold(requiredGold);
    }

    public int Id { get; private set; }

    public string Name { get; private set; }

    public int RequiredGold { get; private set; }

    private int ValidadateRequiredGold(int requiredGold)
    {
        if (requiredGold < 1)
        {
            throw new ArgumentException("Required Gold has to be greater than 0");
        }

        return requiredGold;
    }
}
