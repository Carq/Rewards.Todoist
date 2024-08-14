using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Rewards.Queries;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.RewardsEndpoints;

public class GetAvailableRewardsEndpoint : EndpointBaseAsync.WithoutRequest.WithResult<GetAvailableRewardsResult>
{
    private readonly IMediator _mediator;

    public GetAvailableRewardsEndpoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/rewards/available")]
    [SwaggerOperation(
     Summary = "Get available rewards",
     OperationId = "GetAvailableRewards",
     Tags = ["Rewards"])]
    public override async Task<GetAvailableRewardsResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        return await _mediator.Send(new GetAvailableRewardsQuery(), cancellationToken);
    }
}
