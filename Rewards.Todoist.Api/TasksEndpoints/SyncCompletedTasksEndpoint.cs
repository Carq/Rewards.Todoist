using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Projects.Commands;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.TasksEndpoints;

public class SyncCompletedTasksEndpoint : EndpointBaseAsync.WithoutRequest.WithoutResult
{
    private readonly IMediator _mediator;

    public SyncCompletedTasksEndpoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/tasks/sync-completed")]
    [SwaggerOperation(
               Summary = "Sync completed tasks",
               OperationId = "SyncCompletedTasks",
               Tags = ["Tasks"])]
    public override async Task HandleAsync(CancellationToken cancellationToken = default)
    {
        await _mediator.Send(new SyncCompletedTasksCommand(), cancellationToken);
    }
}
