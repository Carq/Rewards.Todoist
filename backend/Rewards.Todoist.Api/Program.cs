using Rewards.Todoist.Api.Configuration;
using Rewards.Todoist.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddApiModule(builder.Configuration);

var app = builder.Build();
app.UseGlobalExceptionHandler();

await app
    .UseApiModule(builder.Configuration)
    .RunAsync();
