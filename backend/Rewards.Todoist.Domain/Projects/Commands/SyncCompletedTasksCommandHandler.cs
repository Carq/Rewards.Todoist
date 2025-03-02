using MediatR;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Projects.Mappers;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;
using Rewards.Todoist.Domain.Users;
using Rewards.Todoist.Domain.Users.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Projects.Commands;

public class SyncCompletedTasksCommandHandler : IRequestHandler<SyncCompletedTasksCommand>
{
    private readonly ITodoistService _todoistService;

    private readonly IUserRepository _userRepository;

    private readonly IClock _clock;

    private readonly DomainContext _context;

    public SyncCompletedTasksCommandHandler(ITodoistService todoistService, IUserRepository userRepository, IClock clock, DomainContext context)
    {
        _todoistService = todoistService;
        _userRepository = userRepository;
        _clock = clock;
        _context = context;
    }

    public async Task Handle(SyncCompletedTasksCommand request, CancellationToken cancellationToken)
    {
        var since = _context.CompletedTasks.Max(x => x.CompletedAt).AddMinutes(1);
        if (since.AddHours(1) > _clock.Now.UtcDateTime)
        {
            return;
        }

        var users = await _userRepository.GetUsers(cancellationToken);

        var completedTasksToSync = new List<CompletedTaskEntity>();
        foreach (var user in users.All())
        {
            foreach (var projectId in UserProjects.GetProjects(user.Id.ToString()))
            {
                completedTasksToSync.AddRange(await GetCompletedTasksForProject(user, projectId, since));
            }
        }

        completedTasksToSync = completedTasksToSync.Where(x => x.CompletedAt >= since).ToList();
        if (completedTasksToSync.Count == 0)
        {
            return;
        }

        await _context.CompletedTasks.AddRangeAsync(completedTasksToSync);
        await _context.SaveChangesAsync(cancellationToken);
    }

    private async Task<CompletedTaskEntity[]> GetCompletedTasksForProject(User user, string projectId, DateTimeOffset since)
    {
        var completedTasks = await _todoistService.GetCompletedTasksAsync(projectId, 100, since, user.TodoistAccessToken);
        return completedTasks.Items.Select(x => TodoistToEntityMapper.MapToCompleteTask(x, user)).ToArray();
    }

    
}
