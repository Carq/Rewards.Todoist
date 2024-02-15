using MediatR;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Projects.Storage;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;

namespace Rewards.Todoist.Domain.Projects.Queries;

public class GetCompletedTasksForLastWeekQueryHandler : IRequestHandler<GetCompletedTasksForLastWeekQuery, CompletedTasksResult>
{
    private readonly ITodoistService _todoistService;

    private readonly ProjectContext _projectContext;

    public GetCompletedTasksForLastWeekQueryHandler(ITodoistService todoistService, ProjectContext projectContext)
    {
        _todoistService = todoistService;
        _projectContext = projectContext;
    }

    public async Task<CompletedTasksResult> Handle(GetCompletedTasksForLastWeekQuery request, CancellationToken cancellationToken)
    {
        var allProjectIds = Projects.GetAllProjectIds();

        var events = new List<EventDto>();
        foreach (var projectId in allProjectIds)
        {
            events.AddRange(await GetCompletedTasksForProject(projectId));
        }

        await SyncTasks(events);

        return new CompletedTasksResult(
                            events
                            .OrderByDescending(x => x.EventDate)
                            .GroupBy(x => x.InitiatorId)
                            .Select(x => new UserCompletedTasks(
                                Users.Users.GetUserName(x.Key),
                                x.Select(MapToCompleteTask()))));
    }

    private async Task SyncTasks(List<EventDto> events)
    {
        var savedTaskIds = _projectContext.Tasks.Where(x => events.Select(y => long.Parse(y.ObjectId)).Contains(x.Id)).Select(x => x.Id.ToString()).ToList();
        var taskToSave = events.Select(x => x.ObjectId).Distinct().ExceptBy(savedTaskIds, x => x).ToArray();

        var tasks = (await _todoistService.GetTasksDetailsAsync(taskToSave));

        var temp = tasks.Select(x => 
                                new TaskEntity(
                                    long.Parse(x.Id),
                                    x.Content,
                                    string.Join(',', x.Labels),
                                    x.ProjectId));
       
       await _projectContext.Tasks.AddRangeAsync(temp);
       await _projectContext.SaveChangesAsync();
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
                        long.Parse(x.ObjectId),
                        x.ExtraData.Content,
                        Projects.GetProjectName(x.ParentProjectId),
                        x.EventDate);
    }
}
