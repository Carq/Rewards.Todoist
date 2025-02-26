using MediatR;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Users.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Tasks.Commands;

public class CompleteTaskCommandHandler : IRequestHandler<CompleteTaskCommand, bool>
{
    private readonly ITodoistService _todoistService;

    private readonly IUserRepository _userRepository;

    private readonly AuthContext _authContext;

    public CompleteTaskCommandHandler(
        ITodoistService todoistService,
        IUserRepository userRepository,
        AuthContext authContext)
    {
        _todoistService = todoistService;
        _userRepository = userRepository;
        _authContext = authContext;
    }

    public async Task<bool> Handle(CompleteTaskCommand request, CancellationToken cancellationToken)
    {
        if (_authContext.IsNotAuthorized)
        {
            return false;
        }

        var user = await _userRepository.GetUserById(request.UserId, cancellationToken);
        if (user == null)
        {
            return false;
        }

        return await _todoistService.CompleteTaskAsync(request.TaskId, user.TodoistAccessToken);
    }
}
