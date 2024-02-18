using MediatR;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;
using Rewards.Todoist.Domain.Users.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Projects.Queries;

public class GetCompletedTasksForLastWeekQueryHandler : IRequestHandler<GetCompletedTasksForLastWeekQuery, CompletedTasksResult>
{
    private readonly ITodoistService _todoistService;

    private readonly IUserRepository _userRepository;

    private readonly IClock _clock;

    public GetCompletedTasksForLastWeekQueryHandler(ITodoistService todoistService, IClock clock, IUserRepository userRepository)
    {
        _todoistService = todoistService;
        _clock = clock;
        _userRepository = userRepository;
    }

    public async Task<CompletedTasksResult> Handle(GetCompletedTasksForLastWeekQuery request, CancellationToken cancellationToken)
    {
        var since = _clock.Now.AddDays(-7);
        var users = await _userRepository.GetUsers(cancellationToken);


        var items = new List<ItemDto>();
        foreach (var user in users.All())
        {
            foreach (var projectId in UserProjects.GetProjects(user.Id.ToString()))
            {
                items.AddRange(await GetCompletedTasksForProject(projectId, since, user.TodoistAccessToken));
            }
        }

        var taskByUsers = items
                           .OrderByDescending(x => x.CompletedAt)
                           .GroupBy(x => x.UserId)
                           .Select(x => new UserCompletedTasks(
                              users.GetUserName(x.Key),
                               x.Select(MapToCompleteTask()))).ToList();

        return new CompletedTasksResult(taskByUsers);
    }

    private async Task<ItemDto[]> GetCompletedTasksForProject(string projectId, DateTimeOffset since, string userAccessToken)
    {
        var completedTasks = await _todoistService.GetCompletedTasksAsync(projectId, 100, since, userAccessToken);
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
