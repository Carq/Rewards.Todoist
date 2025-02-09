using Microsoft.AspNetCore.Http;
using Rewards.Todoist.Domain.Configuration;

namespace Rewards.Todoist.Domain.Utils;

public class AuthContext
{
    public AuthContext(HttpContext httpContext, DomainSettings domainSettings)
    {
        var authToken = httpContext.Request.Headers["Authorization"].FirstOrDefault();

        if (string.IsNullOrEmpty(domainSettings.AuthToken))
        {
            IsAuthorized = true;
        }
        else
        {
            IsAuthorized = authToken == domainSettings.AuthToken;
        }
    }

    public bool IsAuthorized { get; }

    public bool IsNotAuthorized => !IsAuthorized;
}
