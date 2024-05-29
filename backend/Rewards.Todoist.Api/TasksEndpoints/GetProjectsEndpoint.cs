using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Rewards.Todoist.Domain.Todoist;
using Swashbuckle.AspNetCore.Annotations;

namespace Rewards.Todoist.Api.Endpoints;

public class GetProjectsEndpoint : EndpointBaseAsync.WithoutRequest.WithResult<ProjectList>
{
    private readonly ITodoistService _todoistService;

    public GetProjectsEndpoint(ITodoistService todoistService)
    {
        _todoistService = todoistService;
    }

    [HttpGet("/projects")]
    [SwaggerOperation(
        Summary = "Get all shared projects",
        OperationId = "GetAllSharedProjects",
        Tags = new[] { "Project" })]
    public override async Task<ProjectList> HandleAsync(CancellationToken cancellationToken = default)
    {
        var projects = await _todoistService.GetSharedProjectsAsync();
        return new ProjectList(projects.Select(x => new Project(x.Id, x.Name, x.Url)).ToArray());
    }
}
