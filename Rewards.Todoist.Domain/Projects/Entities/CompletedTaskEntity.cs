using Rewards.Todoist.Domain.Users;

namespace Rewards.Todoist.Domain.Projects.Entities;

public class CompletedTaskEntity
{
    public CompletedTaskEntity(long id, string name, string labels, string projectId, DateTime completedAt, User completedBy) :
        this(id, name, labels, projectId, completedAt)
    {
        CompletedBy = completedBy ?? throw new ArgumentNullException(nameof(completedBy));
    }

    private CompletedTaskEntity(long id, string name, string labels, string projectId, DateTime completedAt)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Labels = labels ?? throw new ArgumentNullException(nameof(labels));
        ProjectId = projectId;
        CompletedAt = completedAt;
    }

    public long Id { get; private set; }

    public string Name { get; private set; }

    public string Labels { get; private set; }

    public string ProjectId { get; private set; }

    public DateTime CompletedAt { get; private set; }

    public User CompletedBy { get; private set; }
}
