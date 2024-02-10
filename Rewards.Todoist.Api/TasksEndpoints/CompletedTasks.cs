using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Projects;
using Rewards.Todoist.Domain.Todoist;
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
        var allProjectIds = Projects.GetAllProjectIds();

        var completedTasks = new List<CompletedTask>();
        foreach (var projectId in allProjectIds)
        {
            completedTasks.AddRange(await GetCompletedTasksForProject(projectId, request.Recent));
        }

        return new CompletedTasksResult(completedTasks.OrderByDescending(x => x.CompletedDate));
    }

    private async Task<CompletedTask[]> GetCompletedTasksForProject(string projectId, int? limit)
    {
        var activityLogs = await _todoistService.GetCompletedTasksAsync(projectId, limit ?? 10);
        return activityLogs.Events.Select(MapToCompleteTask()).ToArray();
    }

    private static Func<Domain.Todoist.Contract.EventDto, CompletedTask> MapToCompleteTask()
    {
        return x =>
            new CompletedTask(
                        x.Id,
                        x.ExtraData.Content,
                        GetInitiatorName(x.InitiatorId),
                        Projects.GetProjectName(x.ParentProjectId),
                        x.EventDate);
    }

    private static string GetInitiatorName(string initiatorId)
    {
        return initiatorId switch
        {
            "33983343" => "Martyna",
            "9238519" => "Łukasz",
            _ => "Unknown"
        };
    }
}


public record CompletedTasksRequest([FromQuery] int? Recent);

public record CompletedTasksResult(IEnumerable<CompletedTask> Data);

public record CompletedTask(long Id, string Name, string WhoCompleted, string ProjectName, DateTimeOffset CompletedDate);