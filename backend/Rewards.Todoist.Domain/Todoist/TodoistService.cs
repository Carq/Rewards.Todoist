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

    public async Task<GetActivityLogsResponse> GetActivityLogsAsync(string? projectId, string userId, int limit, DateTimeOffset? since, string userAccessToken)
    {
        var formattedSince = since?.ToString("yyyy-MM-ddTHH:mm:ss");

        return await _httpClient
            .Request("api/v1/activities?")
            .WithOAuthBearerToken(userAccessToken)
            .SetQueryParam("parent_project_id", projectId)
            .SetQueryParam("initiator_id", userId)
            .SetQueryParam("date_from", formattedSince)
            .SetQueryParam("limit", limit)
            .SetQueryParam("event_type", "completed")
            .GetJsonAsync<GetActivityLogsResponse>();
    }

    public async Task<TaskDetailsDto[]> GetActiveTasksForToday(string userAccessToken)
    {
        var response = await _httpClient
             .Request("api/v1/tasks/filter")
             .WithOAuthBearerToken(userAccessToken)
             .SetQueryParam("query", "date before: tomorrow")
             .GetJsonAsync<TasksFilterResponse>();

        return response.Results;
    }

    public async Task<TaskDetailsDto[]> GetActiveTasksByFilter(string userAccessToken, string filter)
    {
        var response = await _httpClient
             .Request("api/v1/tasks/filter")
             .WithOAuthBearerToken(userAccessToken)
             .SetQueryParam("query", filter)
             .GetJsonAsync<TasksFilterResponse>();

        return response.Results;
    }

    public async Task<TaskDetailsDto[]> GetActiveTasksForTodayAndTomorrow(string userAccessToken)
    {
        var response = await _httpClient
            .Request("api/v1/tasks/filter")
            .WithOAuthBearerToken(userAccessToken)
            .SetQueryParam("query", "date before: +2 days")
            .GetJsonAsync<TasksFilterResponse>();

        return response.Results;
    }

    public async Task<TaskDetailsDto> GetActiveTask(string taskId, string userAccessToken)
    {
        return await _httpClient
            .Request($"rest/v2/tasks/{taskId}")
            .WithOAuthBearerToken(userAccessToken)
            .GetJsonAsync<TaskDetailsDto>();
    }

    public async Task<TasksFilterResponse> GetTasks(IList<string> taskIds, string userAccessToken)
    {
        var ids = string.Join(",", taskIds);

        return await _httpClient
            .Request("api/v1/tasks")
            .WithOAuthBearerToken(userAccessToken)
            .SetQueryParam("ids", string.Join(',', ids))
            .GetJsonAsync<TasksFilterResponse>();
    }

    public async Task CompleteTaskAsync(string taskId, string userAccessToken)
    {
        await _httpClient
            .Request($"api/v1/tasks/{taskId}/close")
            .WithOAuthBearerToken(userAccessToken)
            .PostAsync();
    }
}
