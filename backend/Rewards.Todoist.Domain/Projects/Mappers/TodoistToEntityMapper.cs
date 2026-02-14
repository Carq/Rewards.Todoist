using Rewards.Todoist.Domain.Projects.Entities;
using Rewards.Todoist.Domain.Todoist.Contract;
using Rewards.Todoist.Domain.Users;

namespace Rewards.Todoist.Domain.Projects.Mappers;

public class TodoistToEntityMapper
{
    public static CompletedTaskEntity MapToCompleteTask(string id, TaskDetailsDto taskDto, User user)
    {
        return new CompletedTaskEntity(
                        id,
                        taskDto.Content,
                        string.Join(',', taskDto.Labels),
                        taskDto.ProjectId,
                        taskDto.UpdatedAt,
                        user);
    }
}
