using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Todoist.Contract;
using Rewards.Todoist.Domain.Users;

namespace Rewards.Todoist.Domain.Projects.Mappers;

public class TodoistToEntityMapper
{
    public static CompletedTaskEntity MapToCompleteTask(ItemDto itemDto, User user)
    {
        return new CompletedTaskEntity(
                        long.Parse(itemDto.Id),
                        itemDto.ItemObject.Content,
                        string.Join(',', itemDto.ItemObject.Labels),
                        itemDto.ProjectId,
                        itemDto.CompletedAt.DateTime,
                        user);
    }
}
