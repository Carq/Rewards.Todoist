using Microsoft.EntityFrameworkCore;
using Rewards.Todoist.Domain.Storage;

namespace Rewards.Todoist.Domain.Users.Repository;

public class UserRepository : IUserRepository
{
    private readonly DomainContext _domainContext;

    public UserRepository(DomainContext domainContext)
    {
        _domainContext = domainContext;
    }

    public async Task<Users> GetUsers(CancellationToken cancellationToken)
    {
        return new Users(await _domainContext.Users.ToArrayAsync(cancellationToken));
    }

    public async Task<User?> GetUserById(long userId, CancellationToken cancellationToken)
    {
        return await _domainContext.Users
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
    }
}
