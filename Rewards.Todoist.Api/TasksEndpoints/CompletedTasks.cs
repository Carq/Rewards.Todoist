using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Api.Infrastructure.Responses;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.TasksEndpoints;

public class CompletedTasks : EndpointBaseAsync
                                .WithRequest<CompletedTasksRequest>
                                .WithResult<CompletedTasksResult>
{
    private readonly ITodoistService _todoistService;

    public CompletedTasks(ITodoistService todoistService)
    {
        _todoistService = todoistService;
    }

    [HttpGet("/project/completed-tasks")]
    [SwaggerOperation(
       Summary = "Get completed tasks",    
       OperationId = "GetCompletedTasks",
       Tags = new[] { "Project", "Tasks" })]
    public override async Task<CompletedTasksResult> HandleAsync([FromQuery] CompletedTasksRequest request, CancellationToken cancellationToken = default)
    {
        var activityLogs = await _todoistService.GetCompletedTasksAsync("2267098251", request.Recent ?? 10);
        return new CompletedTasksResult(activityLogs.Events.Select(x => new CompletedTask(x.Id, x.ExtraData.Content, GetInitiatorId(x.InitiatorId), x.EventDate)));
    }

    private static string GetInitiatorId(string x)
    {
        return x switch
        {
            "33983343" => "Martyna",
            "9238519" => "Łukasz",
            _ => "Unknown"
        };
    }
}


public record CompletedTasksRequest([FromQuery] int? Recent);

public record CompletedTasksResult(IEnumerable<CompletedTask> Data);

public record CompletedTask(long Id, string Name, string WhoCompleted, DateTimeOffset CompletedDate);