namespace Rewards.Todoist.Api.Infrastructure.Responses;

public interface IListResponse<TItem>
{
    IEnumerable<TItem> Data { get; }
}