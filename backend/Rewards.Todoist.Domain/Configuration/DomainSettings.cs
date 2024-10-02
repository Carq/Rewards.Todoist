namespace Rewards.Todoist.Domain.Configuration;

public class DomainSettings
{
    public DomainSettings(string dbConnectionString, string? authToken)
    {
        DbConnectionString = dbConnectionString ?? throw new ArgumentNullException(nameof(dbConnectionString));
        AuthToken = authToken;
    }

    public string DbConnectionString { get; }

    public string? AuthToken { get; }
}
