using Rewards.Todoist.Api.Configuration;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddApiModule(builder.Configuration);

await builder
    .Build()
    .UseApiModule(builder.Configuration)
    .RunAsync();
 