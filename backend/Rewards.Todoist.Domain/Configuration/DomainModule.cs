using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.Todoist.Configuration;
using Rewards.Todoist.Domain.Users.Repository;
using Rewards.Todoist.Domain.UserStats.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Configuration;

public static class DomainModule
{
    public static IServiceCollection AddDomainModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddTodoistModule();
        services.AddStorage();
        services.AddUtils();
        services.AddUserModule();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DomainModule).Assembly));
        return services;
    }

    public static IServiceCollection AddStorage(this IServiceCollection services)
    {
        services.AddSingleton(x =>
        {
            var configuration = x.GetRequiredService<IConfiguration>()!;
            return new DomainSettings(configuration.GetConnectionString("DomainDb")
                ?? throw new ArgumentException("Missing ConnectionString for DomainDb"));
        });

        services.AddScoped<DomainContext>();
        return services;
    }

    public static IServiceCollection AddUserModule(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<UserHistoryRepository>();
        return services;
    }

    public static IServiceCollection AddUtils(this IServiceCollection services)
    {
        services.AddScoped<IClock, Clock>();
        return services;
    }
}
