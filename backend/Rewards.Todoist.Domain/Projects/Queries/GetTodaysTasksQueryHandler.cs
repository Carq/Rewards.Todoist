using MediatR;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;
using Rewards.Todoist.Domain.Users.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Projects.Queries;

internal class GetTodaysTasksQueryHandler : IRequestHandler<GetTodaysTasksQuery, GetTodaysTasksQueryResult>
{
    private readonly ITodoistService _todoistService;

    private readonly IUserRepository _userRepository;

    private readonly AuthContext _authContext;

    public GetTodaysTasksQueryHandler(ITodoistService todoistService, IUserRepository userRepository, AuthContext authContext)
    {
        _todoistService = todoistService;
        _userRepository = userRepository;
        _authContext = authContext;
    }

    public async Task<GetTodaysTasksQueryResult> Handle(GetTodaysTasksQuery request, CancellationToken cancellationToken)
    {
        if (_authContext.IsNotAuthorized)
        {
            return new GetTodaysTasksQueryResult([]);
        }

        var users = await _userRepository.GetUsers(cancellationToken);
        var tasks = new List<TaskDetailsDto>();

        foreach (var user in users.All())
        {
             tasks.AddRange(await _todoistService.GetActiveTasksForToday(user.TodoistAccessToken));
        }

        return new GetTodaysTasksQueryResult(
            tasks
            .Where(x => Projects.GetAllProjectIds().Contains(x.ProjectId))
            .Select(x => new Task(x.Id, x.Content))
            .DistinctBy(x => x.Name)
            .ToArray());
    }
}
