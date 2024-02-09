using Microsoft.OpenApi.Models;
using Rewards.Todoist.Domain.Todoist.Configuration;

namespace Rewards.Todoist.Api.Configuration;

public static class ApiModule
{
    public static IServiceCollection AddApiModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddCors(configuration);
        services.AddControllers();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            c.EnableAnnotations();
        });

        services.AddSingleton(configuration);
        services.AddTodoistModule();
        return services;
    }

    public static WebApplication UseApiModule(this WebApplication app, IConfiguration configuration)
    {
        app.UseRouting();
        app.UseDefaultCors();
        app.UseEndpoints(endpoints => endpoints.MapControllers());

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
        }

        app.UseHttpsRedirection();


        return app;
    }
}
