using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Flurl.Http;

namespace Rewards.Todoist.Api.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger,
        IHostEnvironment environment)
    {
        _next = next;
        _logger = logger;
        _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/problem+json";

        var statusCode = GetStatusCode(exception);
        context.Response.StatusCode = statusCode;

        var problemDetails = new ProblemDetails
        {
            Status = statusCode,
            Title = GetTitle(exception),
            Detail = GetDetail(exception),
            Instance = context.Request.Path
        };

        if (exception is FlurlHttpException flurlEx && flurlEx.StatusCode.HasValue)
        {
            problemDetails.Extensions["responseBody"] = flurlEx.GetResponseStringAsync().GetAwaiter().GetResult();
        }

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var json = JsonSerializer.Serialize(problemDetails, options);

        return context.Response.WriteAsync(json);
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
