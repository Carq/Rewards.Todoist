using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Todoist;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.Endpoints;

public class GetCompletedTasksTodayEndpoint : EndpointBaseAsync.WithoutRequest.WithResult<object>
{
    private readonly ITodoistService _todoistService;

    public GetCompletedTasksTodayEndpoint(ITodoistService todoistService)
    {
        _todoistService = todoistService;
    }

    [HttpGet("/project/completed-tasks/today")]
    [SwaggerOperation(
       Summary = "Get completed tasks for today",    
       OperationId = "GetCompletedTasks",
       Tags = new[] { "Project", "Tasks" })]
    public override async Task<object> HandleAsync(CancellationToken cancellationToken = default)
    {
        return await _todoistService.GetCompletedTasksAsync("2267098251", DateOnly.FromDateTime(DateTimeOffset.UtcNow.Date));
    }
}
