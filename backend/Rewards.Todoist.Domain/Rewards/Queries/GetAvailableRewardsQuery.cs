using MediatR;

namespace Rewards.Todoist.Domain.Rewards.Queries;

public record GetAvailableRewardsQuery : IRequest<GetAvailableRewardsResult>;

public record GetAvailableRewardsResult(RewardDto[] Rewards);

public record RewardDto(int Id, string Name, int RequiredGold);
