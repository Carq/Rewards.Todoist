namespace Rewards.Todoist.Domain.Configuration;

public class DomainSettings
{
    public DomainSettings(string dbConnectionString)
    {
        DbConnectionString = dbConnectionString ?? throw new ArgumentNullException(nameof(dbConnectionString));
    }

    public string DbConnectionString { get; }
}
