using MediatR;
using Rewards.Todoist.Domain.UserEvents.Repository;

namespace Rewards.Todoist.Domain.Dashboard;

public class GetDashboardDataQueryHandler(UserActivityRepository UserActivityRepository) 
    : IRequestHandler<GetDashboardDataQuery, GetDashboardDataResult>
{

    public async Task<GetDashboardDataResult> Handle(GetDashboardDataQuery request, CancellationToken cancellationToken)
    {
        var userActivityLogs = await UserActivityRepository.GetUserActivityLogs(cancellationToken);

        return new GetDashboardDataResult(
            userActivityLogs.Select(x =>
            new UserDashboardData(
                new UserInfo(x.User.Id, x.User.Name),
                new UserStats(x.GetExp(), x.GetGold()))).
                ToArray());
    }
}