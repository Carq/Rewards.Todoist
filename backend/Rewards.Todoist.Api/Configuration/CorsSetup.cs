namespace Rewards.Todoist.Api.Configuration;

public static class CorsSetup
{
    public static void AddCors(this IServiceCollection services, IConfiguration configuration)
    {
        var corsConfig = new CorsConfig(configuration);
        if (string.IsNullOrWhiteSpace(corsConfig.Name))
        {
            return;
        }

        services.AddCors(
            options => options.AddDefaultPolicy(
                corsBuilder =>
                {
                    var builder = corsBuilder
                        .WithOrigins(corsConfig.AllowedOrigins)
                        .WithHeaders(corsConfig.AllowedHeaders)
                        .WithMethods(corsConfig.AllowedMethods)
                        .WithExposedHeaders(corsConfig.ExposedHeaders);

                    if (corsConfig.AllowCredentials)
                    {
                        builder.AllowCredentials();
                    }
                    else
                    {
                        builder.DisallowCredentials();
                    }

                    builder.Build();
                }));
    }

    public static void UseDefaultCors(this IApplicationBuilder app)
    {
        app.UseCors();
    }
}

public record class CorsConfig
{
    public string Name { get; init; } = string.Empty;
    public string[] AllowedOrigins { get; init; } = Array.Empty<string>();
    public string[] AllowedHeaders { get; init; } = Array.Empty<string>();
    public string[] AllowedMethods { get; init; } = Array.Empty<string>();
    public string[] ExposedHeaders { get; init; } = Array.Empty<string>();
    public bool AllowCredentials { get; init; }

    public CorsConfig(IConfiguration configuration)
    {
        Name = configuration.GetValue<string>("Cors:Name") ?? string.Empty;
        AllowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
        AllowedHeaders = configuration.GetSection("Cors:AllowedHeaders").Get<string[]>() ?? Array.Empty<string>();
        AllowedMethods = configuration.GetSection("Cors:AllowedMethods").Get<string[]>() ?? Array.Empty<string>();
        ExposedHeaders = configuration.GetSection("Cors:ExposedHeaders").Get<string[]>() ?? Array.Empty<string>();
        AllowCredentials = configuration.GetValue<bool>("Cors:AllowCredentials");
    }
}

