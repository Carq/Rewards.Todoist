using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Tasks.Commands;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.TasksEndpoints;

public record CompleteTaskRequest
{
    public long UserId { get; init; }
    public string TaskId { get; init; } = string.Empty;
}

public record CompleteTaskResponse
{
    public bool Success { get; init; }
    public string Message { get; init; } = string.Empty;
}

public class CompleteTaskEndpoint : EndpointBaseAsync
    .WithRequest<CompleteTaskRequest>
    .WithActionResult<CompleteTaskResponse>
{
    private readonly IMediator _mediator;

    public CompleteTaskEndpoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("/tasks/complete")]
    [SwaggerOperation(
        Summary = "Complete a task in Todoist",
        Description = "Completes a specified task in the user's Todoist account",
        OperationId = "CompleteTask",
        Tags = ["Tasks"])]
    public override async Task<ActionResult<CompleteTaskResponse>> HandleAsync(
        CompleteTaskRequest request,
        CancellationToken cancellationToken = default)
    {
        if (!IsValidRequest(request, out var errorResponse))
        {
            return BadRequest(errorResponse);
        }

        var command = new CompleteTaskCommand
        {
            UserId = request.UserId,
            TaskId = request.TaskId
        };

        // Send command without expecting a boolean return
        await _mediator.Send(command, cancellationToken);

        // If no exception was thrown, the operation is considered successful
        return Ok(new CompleteTaskResponse { Success = true, Message = "Task completed successfully" });
    }

    private static bool IsValidRequest(CompleteTaskRequest request, out CompleteTaskResponse errorResponse)
    {
        if (request.UserId <= 0)
        {
            errorResponse = new CompleteTaskResponse
            {
                Success = false,
                Message = "A valid user ID is required."
            };
            return false;
        }

        if (string.IsNullOrWhiteSpace(request.TaskId))
        {
            errorResponse = new CompleteTaskResponse
            {
                Success = false,
                Message = "A valid task ID is required."
            };
            return false;
        }

        errorResponse = null!;
        return true;
    }
}
