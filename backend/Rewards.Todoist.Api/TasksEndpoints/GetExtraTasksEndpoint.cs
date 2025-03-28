using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Projects.Queries;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.TasksEndpoints;

public class GetExtraTasksEndpoint : EndpointBaseAsync.WithoutRequest.WithResult<GetExtraTasksQueryResult>
{
    private readonly IMediator _mediator;

    public GetExtraTasksEndpoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/projects/extra-tasks")]
    [SwaggerOperation(
        Summary = "Get extra tasks ",
        OperationId = "GetExtraTasks",
        Tags = new[] { "Project", "Tasks" })]
    public override async Task<GetExtraTasksQueryResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        return await _mediator.Send(new GetExtraTasksQuery(), cancellationToken);
    }
}
