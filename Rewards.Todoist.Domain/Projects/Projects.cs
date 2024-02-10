namespace Rewards.Todoist.Domain.Projects;

public static class Projects
{
    private static IDictionary<string, string> _projects = new Dictionary<string, string>
    {
        { "2267098251", "Dzieci 👶" },
        { "2268067878", "Zdrowie 🍏" },
        { "2326686968", "Wykończenie domu" },
        { "2234519083", "Dom 🏡" }
    };

    public static string[] GetAllProjectIds() => _projects.Keys.ToArray();

    public static string GetProjectName(string projectId)
    {
        return _projects.TryGetValue(projectId, out var projectName) ? projectName : "Unknown";
    }
}
