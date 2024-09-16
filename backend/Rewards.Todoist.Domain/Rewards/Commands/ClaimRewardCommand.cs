using MediatR;

namespace Rewards.Todoist.Domain.Rewards.Commands;

public record ClaimRewardCommand(long UserId, int RewardId, DateOnly ClaimedOn) : IRequest;
