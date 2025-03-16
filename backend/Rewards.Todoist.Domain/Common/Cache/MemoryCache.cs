using Microsoft.Extensions.Caching.Memory;

namespace Rewards.Todoist.Domain.Common.Cache;

public class MemoryCache : ICache
{
    private readonly IMemoryCache _cache;

    private static readonly TimeSpan CacheExpirationTime = TimeSpan.FromMinutes(20);

    public MemoryCache(IMemoryCache cache)
    {
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
    }

    public async Task<T> GetOrAddAsync<T>(string key, Func<Task<T>> valueFactory)
    {
        return (await _cache.GetOrCreateAsync(key, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = CacheExpirationTime;
            return await valueFactory();
        }))!;
    }
}
