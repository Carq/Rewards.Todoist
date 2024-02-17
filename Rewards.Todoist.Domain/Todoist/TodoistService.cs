using Flurl.Http;
using Flurl.Util;
using Rewards.Todoist.Domain.Todoist.Contract;

namespace Rewards.Todoist.Domain.Todoist;

public class TodoistService : ITodoistService
{
    private readonly IFlurlClient _httpClient;

    public TodoistService(IFlurlClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ProjectDto[]> GetSharedProjectsAsync()
    {
        var response = await _httpClient
            .Request("rest/v2/projects")
            .GetJsonAsync<ProjectDto[]>();

        return response.Where(x => x.IsShared).ToArray();
    }

    public async Task<ActivityResponse> GetActivityAsync(string projectId)
    {
        var response = await _httpClient
            .Request("sync/v1/activity/get")
            .SetQueryParam("parent_project_id", projectId)
            .GetJsonAsync<ActivityResponse>();

        return response;
    }

    public async Task<GetAllCompeltedResult> GetCompletedTasksAsync(string projectId, int limit, DateTimeOffset since)
    {
        string sinceString = since.ToInvariantString();
        string formattedSince = since.ToString("yyyy-M-dTH:mm:ss");

        return await _httpClient
            .Request("sync/v9/completed/get_all")
            .SetQueryParam("project_id", projectId)
            .SetQueryParam("since", formattedSince)
            .SetQueryParam("limit", limit)
            .SetQueryParam("annotate_items", true)
            .GetJsonAsync<GetAllCompeltedResult>();
    }

    public async Task<TaskDetailsDto[]> GetTasksDetailsAsync(string[] taskIds)
    {
        if (taskIds.Length == 0)
        {
            return Array.Empty<TaskDetailsDto>();
        }

        return await _httpClient
            .Request("rest/v2/tasks")
            .SetQueryParam("ids", string.Join(',', taskIds))
            .GetJsonAsync<TaskDetailsDto[]>();
    }
}
