using Flurl.Http;
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

    public async Task<GetAllCompeltedResult> GetCompletedTasksAsync(string? projectId, int limit, DateTimeOffset? since, string userAccessToken)
    {
        var formattedSince = since?.ToString("yyyy-MM-ddTHH:mm:ss");

        return await _httpClient
            .Request("sync/v9/completed/get_all")
            .WithOAuthBearerToken(userAccessToken)
            .SetQueryParam("project_id", projectId)
            .SetQueryParam("since", formattedSince)
            .SetQueryParam("limit", limit)
            .SetQueryParam("annotate_items", true)
            .GetJsonAsync<GetAllCompeltedResult>();
    }

    public async Task<TaskDetailsDto[]> GetActiveTasksForToday(string userAccessToken)
    {
        return await _httpClient
             .Request("rest/v2/tasks")
             .WithOAuthBearerToken(userAccessToken)
             .SetQueryParam("filter", "date before: tomorrow")
             .GetJsonAsync<TaskDetailsDto[]>();
    }

    public async Task<TaskDetailsDto[]> GetActiveTasksByFilter(string userAccessToken, string filter)
    {
        return await _httpClient
             .Request("rest/v2/tasks")
             .WithOAuthBearerToken(userAccessToken)
             .SetQueryParam("filter", filter)
             .GetJsonAsync<TaskDetailsDto[]>();
    }

    public async Task<TaskDetailsDto[]> GetActiveTasksForTodayAndTomorrow(string userAccessToken)
    {
        return await _httpClient
            .Request("rest/v2/tasks")
            .WithOAuthBearerToken(userAccessToken)
            .SetQueryParam("filter", "date before: +2 days")
            .GetJsonAsync<TaskDetailsDto[]>();
    }

    public async Task<TaskDetailsDto> GetActiveTask(string taskId, string userAccessToken)
    {
        return await _httpClient
            .Request($"rest/v2/tasks/{taskId}")
            .WithOAuthBearerToken(userAccessToken)
            .GetJsonAsync<TaskDetailsDto>();
    }

    public async Task CompleteTaskAsync(string taskId, string userAccessToken)
    {
        await _httpClient
            .Request($"rest/v2/tasks/{taskId}/close")
            .WithOAuthBearerToken(userAccessToken)
            .PostAsync();
    }
}
