﻿using Rewards.Todoist.Domain.Todoist.Contract;

namespace Rewards.Todoist.Domain.Todoist;

public interface ITodoistService
{
    Task<ProjectDto[]> GetSharedProjectsAsync();

    Task<ActivityResponse> GetActivityAsync(string projectId);

    Task<GetAllCompeltedResult> GetCompletedTasksAsync(string projectId, int limit, DateTimeOffset since, string userAccessToken);

    Task<TaskDetailsDto[]> GetActiveTasksForToday(string userAccessToken);
}