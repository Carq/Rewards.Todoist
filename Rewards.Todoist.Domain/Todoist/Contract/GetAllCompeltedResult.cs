namespace Rewards.Todoist.Domain.Todoist.Contract;

public record GetAllCompeltedResult(ItemDto[] Items);

public record ItemDto(string TaskId, string Content, string ProjectId, string UserId, DateTimeOffset CompletedAt, ItemObject ItemObject);

public record ItemObject(string Content, string[] Labels);