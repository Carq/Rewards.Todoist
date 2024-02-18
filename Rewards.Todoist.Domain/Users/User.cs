namespace Rewards.Todoist.Domain.Users;

public class User
{
    public User(long id, string name, string todoistAccessToken)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        TodoistAccessToken = todoistAccessToken ?? throw new ArgumentNullException(nameof(todoistAccessToken));
    }

    public long Id { get; private set; }

    public string Name { get; private set; }

    public string TodoistAccessToken { get; private set; }
}
