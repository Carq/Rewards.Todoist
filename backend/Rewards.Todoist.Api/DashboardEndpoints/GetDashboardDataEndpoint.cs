using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Dashboard;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.DashboardEndpoints;

public class GetDashboardDataEndpoint : EndpointBaseAsync.WithoutRequest.WithResult<GetDashboardDataResult>
{
    private readonly IMediator _mediator;

    public GetDashboardDataEndpoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/dashboard-v2")]
    [SwaggerOperation(
      Summary = "Get completed tasks",
      OperationId = "GetDashboard",
      Tags = new[] { "Dashboard", "Users" })]
    public override async Task<GetDashboardDataResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        return await _mediator.Send(new GetDashboardDataQuery(), cancellationToken);
    }
}

