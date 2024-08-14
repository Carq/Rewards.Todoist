using MediatR;
using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Storage;

namespace Rewards.Todoist.Domain.Rewards.Queries;

public class GetAvailableRewardsQueryHandler : IRequestHandler<GetAvailableRewardsQuery, GetAvailableRewardsResult>
{
    private readonly DomainContext _context;

    public GetAvailableRewardsQueryHandler(DomainContext context)
    {
        _context = context;
    }

    public async Task<GetAvailableRewardsResult> Handle(GetAvailableRewardsQuery request, CancellationToken cancellationToken)
    {
        var rewards = await _context.Rewards.ToListAsync();

        return new GetAvailableRewardsResult(rewards.Select(x => new RewardDto(x.Id, x.Name, x.RequiredGold)).OrderBy(x => x.Id).ToArray());
    }
}
