using MediatR;
using Rewards.Todoist.Domain.Common;
using Rewards.Todoist.Domain.Projects.Cache;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;
using Rewards.Todoist.Domain.Users.Repository;

namespace Rewards.Todoist.Domain.Projects.Queries;

public class GetExtraTasksQueryHandler : IRequestHandler<GetExtraTasksQuery, GetExtraTasksQueryResult>
{
    private readonly ITodoistService _todoistService;

    private readonly IUserRepository _userRepository;

    private readonly AuthContext _authContext;

    public GetExtraTasksQueryHandler(ITodoistService todoistService, IUserRepository userRepository, AuthContext authContext)
    {
        _todoistService = todoistService;
        _userRepository = userRepository;
        _authContext = authContext;
    }

    public async Task<GetExtraTasksQueryResult> Handle(GetExtraTasksQuery request, CancellationToken cancellationToken)
    {
        if (_authContext.IsNotAuthorized)
        {
            return new GetExtraTasksQueryResult([]);
        }

        var users = await _userRepository.GetUsers(cancellationToken);
      
            var tasks = new List<TaskDetailsDto>();
            foreach (var user in users.All())
        {
            tasks.AddRange(
                (await _todoistService
                .GetActiveTasksByFilter(user.TodoistAccessToken, $"{Projects.GetExtraTasksSectionName()} & date before: +3 months"))
                .Select(x => x with { UserId = user.Id }));
        }

        return new GetExtraTasksQueryResult(
            tasks
            .Where(x => Projects.GetAllProjectIds().Contains(x.ProjectId))
            .GroupBy(x => x.Content)
            .Select(x => new Task(
                x.First().Id,
                x.First().Content,
                Projects.GetProjectName(x.First().ProjectId),
                x.First().Labels,
                x.Select(y => new IdForUser(y.UserId!.Value, y.Id)).ToArray()))
            .DistinctBy(x => x.Name)
            .OrderByDescending(x => x.Tags.FirstOrDefault())
            .ToArray());
    }
}
