using MediatR;
using Rewards.Todoist.Domain.Common;
using Rewards.Todoist.Domain.Projects.Cache;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;
using Rewards.Todoist.Domain.Users.Repository;

namespace Rewards.Todoist.Domain.Projects.Queries;

internal class GetTodaysTasksQueryHandler : IRequestHandler<GetTodaysTasksQuery, GetTodaysTasksQueryResult>
{
    private readonly ITodoistService _todoistService;

    private readonly ActiveTasksCache _activeTasksCache;

    private readonly IUserRepository _userRepository;

    private readonly AuthContext _authContext;

    public GetTodaysTasksQueryHandler(ITodoistService todoistService, IUserRepository userRepository, AuthContext authContext, ActiveTasksCache activeTasksCache)
    {
        _todoistService = todoistService;
        _userRepository = userRepository;
        _authContext = authContext;
        _activeTasksCache = activeTasksCache;
    }

    public async Task<GetTodaysTasksQueryResult> Handle(GetTodaysTasksQuery request, CancellationToken cancellationToken)
    {
        if (_authContext.IsNotAuthorized)
        {
            return new GetTodaysTasksQueryResult([]);
        }

        var users = await _userRepository.GetUsers(cancellationToken);
        var tasks = await _activeTasksCache.GetActiveTasksForToday(async () =>
        {
            var tasks = new List<TaskDetailsDto>();
            foreach (var user in users.All())
            {
                tasks.AddRange((await _todoistService.GetActiveTasksForToday(user.TodoistAccessToken)).Select(x => x with { UserId = user.Id.ToString() }));
            }
            return tasks.ToArray();
        });

        return new GetTodaysTasksQueryResult(
            tasks
            .Where(x => Projects.GetAllProjectIds().Contains(x.ProjectId))
            .GroupBy(x => x.Content)
            .Select(x => new Task(
                x.First().Id,
                x.First().Content,
                Projects.GetProjectName(x.First().ProjectId),
                x.First().Labels,
                x.Select(y => new IdForUser(long.Parse(y.UserId!), y.Id)).ToArray()))
            .DistinctBy(x => x.Name)
            .OrderByDescending(x => x.Tags.FirstOrDefault())
            .ToArray());
    }
}
