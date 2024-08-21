namespace Rewards.Todoist.Api.UserProfileEndpoints;

public record GetUserStatsResult(UserStats[] UsersStats);

public record UserStats(long Id, string Name, int Experience, int Gold);