using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Projects.Queries;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.TasksEndpoints;

public class CompletedTasks : EndpointBaseAsync
                                .WithRequest<CompletedTasksRequest>
                                .WithResult<CompletedTasksResult>
{
    private readonly IMediator _mediator;

    public CompletedTasks(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/project/completed-tasks")]
    [SwaggerOperation(
       Summary = "Get completed tasks",
       OperationId = "GetCompletedTasks",
       Tags = new[] { "Project", "Tasks" })]
    public override async Task<CompletedTasksResult> HandleAsync([FromQuery] CompletedTasksRequest request, CancellationToken cancellationToken = default)
    {
   
        return await _mediator.Send(new GetCompletedTasksForLastWeekQuery(), cancellationToken);
    }
}

public record CompletedTasksRequest([FromQuery] int? Recent);
