using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rewards.Todoist.Domain.Projects.Storage;
using Rewards.Todoist.Domain.Todoist.Configuration;

namespace Rewards.Todoist.Domain.Configuration;

public static class DomainModule
{
    public static IServiceCollection AddDomainModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddTodoistModule();
        services.AddStorage();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DomainModule).Assembly));
        return services;
    }

    public static IServiceCollection AddStorage(this IServiceCollection services)
    {
        services.AddScoped<ProjectContext>();
        return services;
    }
}
