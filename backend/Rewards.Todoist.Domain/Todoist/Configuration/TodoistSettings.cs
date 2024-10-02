
namespace Rewards.Todoist.Domain.Todoist.Configuration;

public class TodoistSettings
{
    public TodoistSettings(string? baseUrl)
    {
        BaseUrl = baseUrl ?? throw new ArgumentNullException(nameof(baseUrl));
    }

    public string BaseUrl { get; }
}
