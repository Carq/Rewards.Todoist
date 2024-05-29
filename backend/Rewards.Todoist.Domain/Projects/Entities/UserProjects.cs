namespace Rewards.Todoist.Domain.Projects.Entities;

public class UserProjects
{
    private static IDictionary<string, UserProjects> _projectsPerUser = new Dictionary<string, UserProjects>
    {
        { "9238519", new UserProjects("9238519", ["2267098251", "2326686968", "2234519083", "2268068217"]) },
        { "33983343", new UserProjects("33983343", ["2267098250", "2326686976", "2266575265", "2268068244"]) },
    };

    public static string[] GetProjects(string userId)
    {
        return _projectsPerUser.TryGetValue(userId, out var userProjects) ? userProjects.ProjectIds : Array.Empty<string>();
    }

    public UserProjects(string userId, string[] projectIds)
    {
        UserId = userId;
        ProjectIds = projectIds;
    }

    public string UserId { get; private set; }

    public string[] ProjectIds { get; private set; }
}
