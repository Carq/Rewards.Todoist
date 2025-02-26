using System.Net;
using System.Text.Json;
using Flurl.Http;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Rewards.Todoist.Api.ExceptionHandling;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    private readonly IHostEnvironment _environment;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger, IHostEnvironment environment)
    {
        _logger = logger;
        _environment = environment;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "An unhandled exception occurred");

        httpContext.Response.ContentType = "application/problem+json";

        var statusCode = GetStatusCode(exception);
        httpContext.Response.StatusCode = statusCode;

        var problemDetails = new ProblemDetails
        {
            Status = statusCode,
            Title = GetTitle(exception),
            Detail = GetDetail(exception),
            Instance = httpContext.Request.Path
        };

        if (exception is FlurlHttpException flurlEx && flurlEx.StatusCode.HasValue)
        {
            try
            {
                problemDetails.Extensions["responseBody"] = await flurlEx.GetResponseStringAsync();
            }
            catch
            {
                // Ignore errors trying to read the response body
            }
        }

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var json = JsonSerializer.Serialize(problemDetails, options);
        await httpContext.Response.WriteAsync(json, cancellationToken);

        return true;
    }

    private string GetDetail(Exception exception)
    {
        if (exception is FlurlHttpException flurlEx)
        {
            var detail = $"HTTP request failed: {flurlEx.Message}";
            if (flurlEx.InnerException != null)
            {
                detail += $" - {flurlEx.InnerException.Message}";
            }
            return detail;
        }

        return _environment.IsDevelopment() ? exception.ToString() : exception.Message;
    }

    private static int GetStatusCode(Exception exception)
    {
        return exception switch
        {
            FlurlHttpException flurlEx => flurlEx.StatusCode ?? (int)HttpStatusCode.InternalServerError,
            ArgumentException => (int)HttpStatusCode.BadRequest,
            InvalidOperationException => (int)HttpStatusCode.BadRequest,
            UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
            KeyNotFoundException => (int)HttpStatusCode.NotFound,
            _ => (int)HttpStatusCode.InternalServerError
        };
    }

    private static string GetTitle(Exception exception)
    {
        return exception switch
        {
            FlurlHttpException flurlEx => GetFlurlExceptionTitle(flurlEx),
            ArgumentException => "Bad Request",
            InvalidOperationException => "Invalid Operation",
            UnauthorizedAccessException => "Unauthorized",
            KeyNotFoundException => "Not Found",
            _ => "Server Error"
        };
    }

    private static string GetFlurlExceptionTitle(FlurlHttpException exception)
    {
        return exception.StatusCode switch
        {
            400 => "Bad Request from External Service",
            401 => "Unauthorized by External Service",
            403 => "Forbidden by External Service",
            404 => "Resource Not Found on External Service",
            429 => "External Service Rate Limit Exceeded",
            500 => "External Service Error",
            503 => "External Service Unavailable",
            _ => $"External Service Error ({exception.StatusCode})"
        };
    }
}
