
namespace Rewards.Todoist.Domain.Todoist.Configuration;

public class TodoistSettings
{
    public TodoistSettings(string baseUrl, string bearerToken)
    {
        BaseUrl = baseUrl ?? throw new ArgumentNullException(nameof(baseUrl));
        BearerToken = bearerToken ?? throw new ArgumentNullException(nameof(bearerToken));
    }

    public string BaseUrl { get; }

    public string BearerToken { get; }
}
