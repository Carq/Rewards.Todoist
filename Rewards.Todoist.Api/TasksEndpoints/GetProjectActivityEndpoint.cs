using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Todoist;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.Endpoints;

public class GetProjectActivityEndpoint : EndpointBaseAsync.WithoutRequest.WithResult<object>
{
    private readonly ITodoistService _todoistService;

    public GetProjectActivityEndpoint(ITodoistService todoistService)
    {
        _todoistService = todoistService;
    }

    [HttpGet("/project/activity")]
    [SwaggerOperation(
        Summary = "Get project activity",
        OperationId = "GetProjectActivity",
        Tags = new[] { "Project" })]
    public override async Task<object> HandleAsync(CancellationToken cancellationToken = default)
    {
        var activityLog = await _todoistService.GetActivityAsync("2267098251");
        return activityLog;
    }
}
