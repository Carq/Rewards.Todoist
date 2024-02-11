namespace Rewards.Todoist.Domain.Users;

public static class Users
{
    private static readonly IDictionary<string, string> _users = new Dictionary<string, string>
    {
        { "33983343", "Martyna" },
        { "9238519", "Łukasz" }
    };

    public static string GetUserName(string initiatorId)
    {
        return _users.TryGetValue(initiatorId, out var userName) ? userName : "Unknown";
    }
}
