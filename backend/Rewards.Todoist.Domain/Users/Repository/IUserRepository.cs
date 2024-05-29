namespace Rewards.Todoist.Domain.Users.Repository;

public interface IUserRepository
{
    Task<Users> GetUsers(CancellationToken cancellationToken);
}