namespace Rewards.Todoist.Domain.Configuration;

public class DomainSettings
{
    public DomainSettings(string dbConnectionString, string? authToken)
    {
        DbConnectionString = dbConnectionString ?? throw new ArgumentNullException(nameof(dbConnectionString));
        AuthToken = authToken;
    }

    public static DateTime StartDate { get; set; } = new DateTime(2025, 1, 1);

    public string DbConnectionString { get; }

    public string? AuthToken { get; }
}
