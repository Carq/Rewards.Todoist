
namespace Rewards.Todoist.Domain.Projects.Entities;

public class TaskEntity
{
    public TaskEntity(long id, string name, string labels, string projectId)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Labels = labels ?? throw new ArgumentNullException(nameof(labels));
        ProjectId = projectId;
    }

    public long Id { get; private set; }

    public string Name { get; private set; }

    public string Labels { get; private set; }

    public string ProjectId { get; private set; }
}
