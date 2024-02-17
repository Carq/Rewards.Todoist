using MediatR;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Projects.Storage;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Projects.Queries;

public class GetCompletedTasksForLastWeekQueryHandler : IRequestHandler<GetCompletedTasksForLastWeekQuery, CompletedTasksResult>
{
    private readonly ITodoistService _todoistService;

    private readonly IClock _clock;

    public GetCompletedTasksForLastWeekQueryHandler(ITodoistService todoistService, IClock clock)
    {
        _todoistService = todoistService;
        _clock = clock;
    }

    public async Task<CompletedTasksResult> Handle(GetCompletedTasksForLastWeekQuery request, CancellationToken cancellationToken)
    {
        var allProjectIds = Projects.GetAllProjectIds();
        var since = _clock.Now.AddDays(-7);


        var items = new List<ItemDto>();
        foreach (var projectId in allProjectIds)
        {
            items.AddRange(await GetCompletedTasksForProject(projectId, since));
        }

        var taskByUsers = items
                           .OrderByDescending(x => x.CompletedAt)
                           .GroupBy(x => x.UserId)
                           .Select(x => new UserCompletedTasks(
                               Users.Users.GetUserName(x.Key),
                               x.Select(MapToCompleteTask()))).ToList();

        taskByUsers.Add(new UserCompletedTasks("Martyna", Array.Empty<CompletedTask>()));

        return new CompletedTasksResult(taskByUsers);
    }

    private async Task<ItemDto[]> GetCompletedTasksForProject(string projectId, DateTimeOffset since)
    {
        var completedTasks = await _todoistService.GetCompletedTasksAsync(projectId, 100, since);
        return completedTasks.Items;
    }

    private static Func<ItemDto, CompletedTask> MapToCompleteTask()
    {
        return x => new CompletedTask(
                        long.Parse(x.TaskId),
                        x.Content,
                        Projects.GetProjectName(x.ProjectId),
                        x.ItemObject.Labels,
                        x.CompletedAt);
    }
}
