using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Common;
using Rewards.Todoist.Domain.Storage;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.RewardsEndpoints;

public class GetAvailableRewardsEndpoint : EndpointBaseAsync.WithoutRequest.WithResult<GetAvailableRewardsResult>
{
    private readonly DomainContext _context;

    private readonly AuthContext _authContext;

    public GetAvailableRewardsEndpoint(DomainContext context, AuthContext authContext)
    {
        _context = context;
        _authContext = authContext;
    }

    [HttpGet("/rewards/available")]
    [SwaggerOperation(
     Summary = "Get available rewards",
     OperationId = "GetAvailableRewards",
     Tags = ["Rewards"])]
    public override async Task<GetAvailableRewardsResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        var rewards = await _context.Rewards.ToListAsync();

        return new GetAvailableRewardsResult(rewards.Select(x => new RewardDto(x.Id, _authContext.HideSensitiveData(x.Name), x.RequiredGold)).OrderBy(x => x.Id).ToArray());
    }
}

public record GetAvailableRewardsResult(RewardDto[] Rewards);

public record RewardDto(int Id, string Name, int RequiredGold);
