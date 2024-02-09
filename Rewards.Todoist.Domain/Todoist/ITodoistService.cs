using Rewards.Todoist.Domain.Todoist.Contract;

namespace Rewards.Todoist.Domain.Todoist;

public interface ITodoistService
{
    Task<ProjectDto[]> GetSharedProjectsAsync();

    Task<ActivityResponse> GetActivityAsync(string projectId);

    Task<ActivityResponse> GetCompletedTasksAsync(string projectId, int recent);
}