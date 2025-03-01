using MediatR;
using Rewards.Todoist.Domain.Users.Repository;

namespace Rewards.Todoist.Domain.Projects.Commands;

public class SyncCompletedTaskCommandHandler : IRequestHandler<SyncCompletedTaskCommand>
{
    private readonly IUserRepository _userRepository;

    public SyncCompletedTaskCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task Handle(SyncCompletedTaskCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserById(request.UserId, cancellationToken);
        if (user == null)
        {
            throw new Exception($"User with ID {request.UserId} does not exist.");
        }
    }
}
