using System.Text.Json.Serialization;

namespace Rewards.Todoist.Domain.Todoist.Contract;

public record TaskDetailsDto(
    [property: JsonPropertyName("id")] string Id,
    [property: JsonPropertyName("content")] string Content,
    [property: JsonPropertyName("labels")] string[] Labels,
    [property: JsonPropertyName("project_id")] string ProjectId,
    [property: JsonPropertyName("user_id")] string? UserId = null);

public record TasksFilterResponse(
    [property: JsonPropertyName("results")] TaskDetailsDto[] Results,
    [property: JsonPropertyName("next_cursor")] string? NextCursor = null);
