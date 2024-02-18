namespace Rewards.Todoist.Domain.Users;

public class Users
{
    private readonly IDictionary<string, User> _users = new Dictionary<string, User>();

    public Users(IEnumerable<User> users)
    {
        foreach (var user in users)
        {
            _users.Add(user.Id.ToString(), user);
        }
    }   

    public string GetUserName(string id)
    {
        return _users.TryGetValue(id, out var user) ? user.Name : "Unknown";
    }

    public IEnumerable<User> All() => _users.Values;
}
