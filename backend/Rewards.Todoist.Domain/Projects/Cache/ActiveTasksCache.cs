using Rewards.Todoist.Domain.Common.Cache;
using Rewards.Todoist.Domain.Todoist.Contract;

namespace Rewards.Todoist.Domain.Projects.Cache;

public class ActiveTasksCache
{
    private readonly ICache _cache;

    private const string CacheKeyPrefix = "ActiveTasksForToday";

    public ActiveTasksCache(ICache cache)
    {
        _cache = cache;
    }

    public async Task<TaskDetailsDto[]> GetActiveTasksForToday(Func<Task<TaskDetailsDto[]>> valueFactory)
    {
        return await _cache.GetOrAddAsync(CacheKeyPrefix, valueFactory);
    }

    public void ClearCache()
    {
        _cache.Remove(CacheKeyPrefix);
    }
}
