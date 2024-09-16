using MediatR;
using Rewards.Todoist.Domain.Rewards.Repositories;

namespace Rewards.Todoist.Domain.Rewards.Commands;

public class ClaimRewardCommandHandler(RewardsRepository RewardsRepository) : IRequestHandler<ClaimRewardCommand>
{
    public async Task Handle(ClaimRewardCommand request, CancellationToken cancellationToken)
    {
        var reward = await RewardsRepository.GetReward(request.RewardId, cancellationToken);
        var claimer = await RewardsRepository.GetClaimer(request.UserId, cancellationToken);

        claimer.ClaimReward(reward, request.ClaimedOn);

        await RewardsRepository.Save(claimer, cancellationToken);
    }
}
