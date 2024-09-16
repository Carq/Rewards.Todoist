using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Rewards.Commands;

namespace Rewards.Todoist.Api.RewardsEndpoints;

public class ClaimRewardEndpoint : EndpointBaseAsync
                                    .WithRequest<ClaimRewardCommand>
                                    .WithoutResult
{
    private readonly IMediator _mediator;

    public ClaimRewardEndpoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("/rewards/claim")]
    public override async Task HandleAsync(ClaimRewardCommand request, CancellationToken cancellationToken = default)
    {
        await _mediator.Send(request, cancellationToken);
    }
}

