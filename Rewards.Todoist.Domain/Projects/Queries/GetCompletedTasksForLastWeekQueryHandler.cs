using MediatR;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;

namespace Rewards.Todoist.Domain.Projects.Queries;

public class GetCompletedTasksForLastWeekQueryHandler : IRequestHandler<GetCompletedTasksForLastWeekQuery, CompletedTasksResult>
{
    private readonly ITodoistService _todoistService;

    public GetCompletedTasksForLastWeekQueryHandler(ITodoistService todoistService)
    {
        _todoistService = todoistService;
    }

    public async Task<CompletedTasksResult> Handle(GetCompletedTasksForLastWeekQuery request, CancellationToken cancellationToken)
    {
        var allProjectIds = Projects.GetAllProjectIds();

        var events = new List<EventDto>();
        foreach (var projectId in allProjectIds)
        {
            events.AddRange(await GetCompletedTasksForProject(projectId));
        }

        return new CompletedTasksResult(
                            events
                            .OrderByDescending(x => x.EventDate)
                            .GroupBy(x => x.InitiatorId)
                            .Select(x => new UserCompletedTasks(
                                Users.Users.GetUserName(x.Key),
                                x.Select(MapToCompleteTask()))));
    }

    private async Task<EventDto[]> GetCompletedTasksForProject(string projectId)
    {
        var activityLogs = await _todoistService.GetCompletedTasksAsync(projectId, 100);
        return activityLogs.Events;
    }

    private static Func<EventDto, CompletedTask> MapToCompleteTask()
    {
        return x =>
            new CompletedTask(
                        x.Id,
                        x.ExtraData.Content,
                        Projects.GetProjectName(x.ParentProjectId),
                        x.EventDate);
    }
}
