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
        CompletedBy = null!; // Initialize with a non-null value to satisfy the compiler
    }

    public long Id { get; private set; }

    public string Name { get; private set; }

    public string Labels { get; private set; }

    public string ProjectId { get; private set; }

    public DateTime CompletedAt { get; private set; }

    public User CompletedBy { get; private set; }

    public string[] GetLabels()
    {
        if (string.IsNullOrWhiteSpace(Labels))
        {
            return Array.Empty<string>();
        }

        return Labels.Split(',');
    }

    public int GetExperience()
    {
        var labels = GetLabels();
        if (labels.Length == 0)
        {
            return 0;
        }

        var experienceLabel = labels.Where(x => x.StartsWith("XP")).FirstOrDefault()?.Remove(0, 2);
        if (experienceLabel == null)
        {
            return 0;
        }

        return int.TryParse(experienceLabel, out var exp) ? exp : 0;
    }

    public string GetProjectName() => Projects.GetProjectName(ProjectId);
}
