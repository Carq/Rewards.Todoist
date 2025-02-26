using Rewards.Todoist.Api.Configuration;
using Rewards.Todoist.Api.ExceptionHandling;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddApiModule(builder.Configuration);
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

var app = builder.Build();
app.UseExceptionHandler(options => { });

await app
    .UseApiModule(builder.Configuration)
    .RunAsync();
