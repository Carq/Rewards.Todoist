using MediatR;
using Rewards.Todoist.Domain.UserEvents.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Dashboard;

public class GetDashboardDataQueryHandler(UserActivityRepository UserActivityRepository, IClock Clock) 
    : IRequestHandler<GetDashboardDataQuery, GetDashboardDataResult>
{

    public async Task<GetDashboardDataResult> Handle(GetDashboardDataQuery request, CancellationToken cancellationToken)
    {
        var userActivityLogs = await UserActivityRepository.GetUserActivityLogs(cancellationToken);
        var yesterday = Clock.Now.AddDays(-1).Date;


        return new GetDashboardDataResult(
            userActivityLogs.Select(x =>
            new UserDashboardDataDto(
                new UserInfoDto(x.User.Id, x.User.Name),
                new UserStatsDto(x.GetExp(), x.GetGold()),
                x.Activities
                    .Where(y => y.OccurredOn >= yesterday)
                    .Select(y => 
                        new UserActivityRecordDto(y.Id, y.Name, y.ActivityArea, y.Tags, y.OccurredOn)).ToArray()))
            .ToArray());
    }
}