namespace Rewards.Todoist.Domain.Todoist.Contract;

public record ActivityResponse(EventDto[] Events, int Count);

public record EventDto(string ObjectId, string EventType, string InitiatorId, string ParentProjectId, DateTimeOffset EventDate, EventExtraData ExtraData);

public record EventExtraData(string Content);

