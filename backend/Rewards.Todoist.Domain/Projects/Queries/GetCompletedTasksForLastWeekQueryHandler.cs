using MediatR;
using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Todoist.Contract;
using Rewards.Todoist.Domain.Users.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Projects.Queries;

public class GetCompletedTasksForLastWeekQueryHandler : IRequestHandler<GetCompletedTasksForLastWeekQuery, CompletedTasksResult>
{
    private readonly IUserRepository _userRepository;

    private readonly IClock _clock;

    private readonly DomainContext _context;

    public GetCompletedTasksForLastWeekQueryHandler(IClock clock, IUserRepository userRepository, DomainContext context)
    {
        _clock = clock;
        _userRepository = userRepository;
        _context = context;
    }

    public async Task<CompletedTasksResult> Handle(GetCompletedTasksForLastWeekQuery request, CancellationToken cancellationToken)
    {
        var since = _clock.Now.AddDays(-7).DateTime;
        var users = await _userRepository.GetUsers(cancellationToken);

        var completedTasks = await _context.CompletedTasks
             .Where(x => x.CompletedAt >= since)
             .ToListAsync();

        var taskByUsers = completedTasks
                           .OrderByDescending(x => x.CompletedAt)
                           .GroupBy(x => x.CompletedBy.Id)
                           .Select(x => new UserCompletedTasks(
                               users.GetUserName(x.Key),
                               x.Select(MapToCompleteTask()))).ToList();

        return new CompletedTasksResult(taskByUsers);
    }

    private static Func<CompletedTaskEntity, CompletedTaskV1> MapToCompleteTask()
    {
        return x => new CompletedTaskV1(
                        x.Id,
                        x.Name,
                        Projects.GetProjectName(x.ProjectId),
                        x.Labels.Split(','),
                        x.CompletedAt);
    }
}
