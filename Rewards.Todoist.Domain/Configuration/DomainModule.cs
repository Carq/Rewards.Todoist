using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rewards.Todoist.Domain.Todoist.Configuration;

namespace Rewards.Todoist.Domain.Configuration;

public static class DomainModule
{
    public static IServiceCollection AddDomainModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddTodoistModule();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DomainModule).Assembly));
        return services;
    }
}
