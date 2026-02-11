namespace Rewards.Todoist.Domain.Projects;

public static class Projects
{
    private static IDictionary<string, string> _projects = new Dictionary<string, string>
    {
        { "6FQF97Wf63pvv925", "Dzieci 👶" },
        { "2267098250", "Dzieci 👶" },
        { "6RMV9838jqjhwcGX", "Wykończenie domu" },
        { "2326686976", "Wykończenie domu" },
        { "6CrfmMhm59gPGM7f", "Dom 🏡" },
        { "2234519083", "Dom 🏡" },
        { "6FWfVwH3fWPRCjpQ", "Życie ♥" },
        { "2268068244", "Życie ♥" },
    };

    public static string GetExtraTasksSectionName() => "/Dodatkowe zadania";

    public static string[] GetAllProjectIds() => _projects.Keys.ToArray();

    public static string GetProjectName(string projectId)
    {
        return _projects.TryGetValue(projectId, out var projectName) ? projectName : "Unknown";
    }
}
