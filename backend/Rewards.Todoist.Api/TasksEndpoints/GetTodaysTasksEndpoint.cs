using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Projects.Queries;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.TasksEndpoints;

public class GetTodaysTasks : EndpointBaseAsync.WithoutRequest.WithResult<GetTodaysTasksQueryResult>
{
    private readonly IMediator _mediator;

    public GetTodaysTasks(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/projects/active-tasks")]
    [SwaggerOperation(
        Summary = "Get active tasks for today",
        OperationId = "GetActiveTasks",
        Tags = new[] { "Project", "Tasks" })]
    public override async Task<GetTodaysTasksQueryResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        return await _mediator.Send(new GetTodaysTasksQuery(), cancellationToken);
    }
}
