using MediatR;
using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Projects.Mappers;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.Todoist;
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
        var todayDate = _clock.Now.UtcDateTime.Date;
        var todaysCompletedTasks = await _context.CompletedTasks.Where(x => x.CompletedAt >= todayDate).Select(x => x.Id).ToListAsync(cancellationToken);

        var users = await _userRepository.GetUsers(cancellationToken);
        var completedTasksToSync = new List<CompletedTaskEntity>();
        foreach (var user in users.All())
        {
            completedTasksToSync.AddRange(await GetCompletedTasksForProject(user, Projects.GetMainProjectId(), todayDate));
        }

        completedTasksToSync = completedTasksToSync.ExceptBy(todaysCompletedTasks, x => x.Id).ToList();
        if (completedTasksToSync.Count == 0)
        {
            return;
        }

        await _context.CompletedTasks.AddRangeAsync(completedTasksToSync);
        await _context.SaveChangesAsync(cancellationToken);
    }

    private async Task<CompletedTaskEntity[]> GetCompletedTasksForProject(User user, string projectId, DateTimeOffset since)
    {
        var activityLogs = await _todoistService.GetActivityLogsAsync(projectId, user.Id.ToString(), 100, since, user.TodoistAccessToken);
        if (activityLogs.Results.Length == 0)
        {
            return Array.Empty<CompletedTaskEntity>();
        }

        var tasks = await _todoistService.GetTasks(activityLogs.Results.Select(x => x.ObjectId).ToList(), user.TodoistAccessToken);
        return tasks.Results.Select(x => TodoistToEntityMapper.MapToCompleteTask(activityLogs.Results.First(y => y.ObjectId == x.Id).Id, x, user)).ToArray();
    }
}
