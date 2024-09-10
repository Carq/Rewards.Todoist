using MediatR;

namespace Rewards.Todoist.Domain.Dashboard;

public record GetDashboardDataQuery : IRequest<GetDashboardDataResult>;

public record GetDashboardDataResult(UserDashboardData[] Users);

public record UserDashboardData(UserInfo Info, UserStats Stats);

public record UserStats(int Experience, int Gold);

public record UserInfo(long Id, string Name);
