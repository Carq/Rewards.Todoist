namespace Rewards.Todoist.Domain.Todoist.Contract;

public record ProjectDto(string Id,
                      string Name,
                      int CommentCount,
                      int Order,
                      string Color,
                      bool IsShared,
                      bool IsFavorite,
                      string? ParentId,
                      bool IsInboxProject,
                      bool IsTeamInbox,
                      string ViewStyle,
                      string Url);
