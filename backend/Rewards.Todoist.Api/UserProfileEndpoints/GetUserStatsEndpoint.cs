using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.UserStats.Repository;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.UserProfileEndpoints;

public class GetUserStatsEndpoint : EndpointBaseAsync.WithoutRequest.WithResult<GetUserStatsResult>
{
    private readonly UserHistoryRepository _repository;

    public GetUserStatsEndpoint(UserHistoryRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("/users/stats")]
    [SwaggerOperation(
      Summary = "Get users stats",
      OperationId = "GetUsersStats",
      Tags = ["User", "Stats"])]
    public override async Task<GetUserStatsResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        var userHistories = await _repository.GetUserHistories(cancellationToken);

        return new GetUserStatsResult(
            userHistories
            .Select(x => new UserStats(x.Id, x.Name, x.GetExp(), x.GetGold()))
            .ToArray());
    }
}