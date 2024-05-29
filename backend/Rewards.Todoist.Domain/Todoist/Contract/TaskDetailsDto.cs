namespace Rewards.Todoist.Domain.Todoist.Contract;

public record TaskDetailsDto(string Id, string Content, string[] Labels, string ProjectId);
