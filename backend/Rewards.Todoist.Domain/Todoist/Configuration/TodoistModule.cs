using Flurl.Http;
using Flurl.Http.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

namespace Rewards.Todoist.Domain.Todoist.Configuration;

public static class TodoistModule
{
    public static IServiceCollection AddTodoistModule(this IServiceCollection services)
    {
        services.AddTodoistHttpClient();
        return services;
    }

    private static void AddTodoistHttpClient(this IServiceCollection services)
    {
        services.AddSingleton(x =>
        {
            var configuration = x.GetRequiredService<IConfiguration>()!;
            return new TodoistSettings(configuration["TodoistService:BaseUrl"]);

        });

        services.AddSingleton(provider =>
                new FlurlClientCache()
                .Add(
                    "TodoistClient",
                    provider.GetRequiredService<TodoistSettings>().BaseUrl,
                    builder =>
                    {
                        builder
                        .WithSettings(settings =>
                        {
                            settings.JsonSerializer = new DefaultJsonSerializer(new JsonSerializerOptions
                            {
                                PropertyNameCaseInsensitive = false,
                                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
                            });
                        });
                    }));

        services.AddScoped<ITodoistService, TodoistService>(
            provider => new TodoistService(provider.GetRequiredService<IFlurlClientCache>().Get("TodoistClient")));
    }
}
