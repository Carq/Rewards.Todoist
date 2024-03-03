using MediatR;
using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.Users;
using Rewards.Todoist.Domain.Users.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Projects.Queries;

public class GetDashboardDataQueryHandler : IRequestHandler<GetDashboardDataQuery, GetDashboardDataResult>
{
    private readonly IUserRepository _userRepository;

    private readonly IClock _clock;

    private readonly DomainContext _context;

    public GetDashboardDataQueryHandler(IClock clock, IUserRepository userRepository, DomainContext context)
    {
        _clock = clock;
        _userRepository = userRepository;
        _context = context;
    }

    public async Task<GetDashboardDataResult> Handle(GetDashboardDataQuery request, CancellationToken cancellationToken)
    {
        var completedTasks = await _context.CompletedTasks.Include(x => x.CompletedBy).ToListAsync();

        var taskByUsers = completedTasks
                           .OrderByDescending(x => x.CompletedAt)
                           .GroupBy(x => x.CompletedBy.Name)
                           .ToDictionary(x => x.Key, x => x.Select(MapToCompleteTask()));


        return new GetDashboardDataResult(taskByUsers.Select(x => new UserDashboardData(x.Key, x.Value)));
    }

    private static Func<CompletedTaskEntity, CompletedTask> MapToCompleteTask()
    {
        return x => new CompletedTask(
                        x.Id,
                        x.Name,
                        Projects.GetProjectName(x.ProjectId),
                        string.IsNullOrWhiteSpace(x.Labels) ? [] : x.Labels.Split(','),
                        x.CompletedAt);
    }

}   
