namespace Rewards.Todoist.Api.Endpoints;

public record ProjectList(Project[] Projects);

public record Project(string Id, string Name, string Url);