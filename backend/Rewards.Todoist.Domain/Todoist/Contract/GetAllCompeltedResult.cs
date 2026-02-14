using System.Numerics;
using System.Text.Json.Serialization;

namespace Rewards.Todoist.Domain.Todoist.Contract;

public record GetActivityLogsResponse(
    [property: JsonPropertyName("next_cursor")] string? NextCursor,
    [property: JsonPropertyName("results")] ActivityResultDto[] Results);

public record ActivityResultDto(
    [property: JsonPropertyName("id"), JsonConverter(typeof(LargeNumberToStringConverter))] string Id,
    [property: JsonPropertyName("event_date")] DateTimeOffset EventDate,
    [property: JsonPropertyName("event_type")] string EventType,
    [property: JsonPropertyName("extra_data")] ExtraDataDto ExtraData,
    [property: JsonPropertyName("extra_data_id")] string? ExtraDataId,
    [property: JsonPropertyName("initiator_id")] string InitiatorId,
    [property: JsonPropertyName("object_id")] string ObjectId,
    [property: JsonPropertyName("object_type")] string ObjectType,
    [property: JsonPropertyName("parent_item_id")] string? ParentItemId,
    [property: JsonPropertyName("parent_project_id")] string ParentProjectId,
    [property: JsonPropertyName("source")] string Source);

public record ExtraDataDto(
    [property: JsonPropertyName("client")] string Client,
    [property: JsonPropertyName("content")] string Content,
    [property: JsonPropertyName("due_date")] string? DueDate,
    [property: JsonPropertyName("is_recurring")] bool IsRecurring,
    [property: JsonPropertyName("note_count")] int NoteCount);