using MediatR;
using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.Users;
using Rewards.Todoist.Domain.Users.Repository;
using Rewards.Todoist.Domain.Utils;
using System.Linq;

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
        var yesterday = _clock.Now.AddDays(-1).Date;

        var taskByUsers = completedTasks
                           .OrderByDescending(x => x.CompletedAt)
                           .GroupBy(x => x.CompletedBy.Name)
                           .ToDictionary(x => x.Key, x => x);


        return new GetDashboardDataResult(
            taskByUsers.Select(x => 
            new UserDashboardData(
                x.Key,
                MapToUserExperianceOverview(x.Value),
                x.Value.Where(x => x.CompletedAt >= yesterday).Select(y => MapToCompleteTask(y)))));
    }

    private UserExperianceOverview MapToUserExperianceOverview(IEnumerable<CompletedTaskEntity> completedTasks)
    {
        var total = MapToExperianceSummary(completedTasks);
        var today = MapToExperianceSummary(completedTasks.Where(today => today.CompletedAt.Date == _clock.Now.Date));
        var lastWeek = MapToExperianceSummary(completedTasks.Where(week => week.CompletedAt.Date >= _clock.Now.AddDays(-7).Date));
        var currentMonth = MapToExperianceSummary(completedTasks.Where(month => month.CompletedAt.Month == _clock.Now.Month));
        var lastMonth = MapToExperianceSummary(completedTasks.Where(month => month.CompletedAt.Month == _clock.Now.AddMonths(-1).Month));

        return new UserExperianceOverview(total, today, lastWeek, currentMonth, lastMonth);
    }

    private ExperianceSummary MapToExperianceSummary(IEnumerable<CompletedTaskEntity> completedTasks)
    {
        return new ExperianceSummary(completedTasks.Count(), completedTasks.Sum(x => x.GetExperience()));
    }

    private static CompletedTask MapToCompleteTask(CompletedTaskEntity entity)
    {
        return new CompletedTask(
                        entity.Id,
                        entity.Name,
                        Projects.GetProjectName(entity.ProjectId),
                        entity.GetLabels(),
                        entity.CompletedAt);
    }

}   
