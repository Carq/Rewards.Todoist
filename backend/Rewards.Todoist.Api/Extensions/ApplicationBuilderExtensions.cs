using Rewards.Todoist.Api.Middlewares;

namespace Rewards.Todoist.Api.Extensions;

public static class ApplicationBuilderExtensions
{
    /// <summary>
    /// Adds global exception handling middleware to the application pipeline
    /// </summary>
    public static IApplicationBuilder UseGlobalExceptionHandler(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ExceptionMiddleware>();
    }
}
