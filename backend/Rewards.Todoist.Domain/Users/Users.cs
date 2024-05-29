namespace Rewards.Todoist.Domain.Users;

public class Users
{
    private readonly IDictionary<long, User> _users = new Dictionary<long, User>();

    public Users(IEnumerable<User> users)
    {
        foreach (var user in users)
        {
            _users.Add(user.Id, user);
        }
    }   

    public string GetUserName(long id)
    {
        return _users.TryGetValue(id, out var user) ? user.Name : "Unknown";
    }

    public IEnumerable<User> All() => _users.Values;
}
