namespace Rewards.Todoist.Domain.Todoist.Contract;

public record ActivityResponse(EventDto[] Events, int Count);

public record EventDto(long Id, string EventType, string InitiatorId, string ParentProjectId, DateTimeOffset EventDate, EventExtraData ExtraData);

public record EventExtraData(string Content);

