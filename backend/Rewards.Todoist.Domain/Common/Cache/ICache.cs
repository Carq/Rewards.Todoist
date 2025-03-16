namespace Rewards.Todoist.Domain.Common.Cache;

public interface ICache
{
    Task<T> GetOrAddAsync<T>(string key, Func<Task<T>> valueFactory);


}