namespace Rewards.Todoist.Domain.Rewards.Entities;

public static class RewardEntitySeedData
{
    public static readonly RewardEntity[] Initial = [
        new RewardEntity(1, "Masaż - 10 minut", 2),
        new RewardEntity(2, "Masaż - 20 minut", 5),
        new RewardEntity(3, "Czas dla siebie - 1h", 6),
        new RewardEntity(4, "Czas dla siebie - 2h", 14)
    ];
}
