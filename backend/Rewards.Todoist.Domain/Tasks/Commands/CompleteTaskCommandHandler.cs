using MediatR;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Users.Repository;
using Rewards.Todoist.Domain.Utils;

namespace Rewards.Todoist.Domain.Tasks.Commands;

public class CompleteTaskCommandHandler : IRequestHandler<CompleteTaskCommand>
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

    public async Task Handle(CompleteTaskCommand request, CancellationToken cancellationToken)
    {
        if (_authContext.IsNotAuthorized)
        {
            throw new UnauthorizedAccessException();
        }

        var user = await _userRepository.GetUserById(request.UserId, cancellationToken);
        if (user == null)
        {
            throw new KeyNotFoundException();
        }

        await _todoistService.CompleteTaskAsync(request.TaskId, user.TodoistAccessToken);
    }
}
