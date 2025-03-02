using MediatR;
using Rewards.Todoist.Domain.Common;
using Rewards.Todoist.Domain.Projects.Commands;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Users.Repository;
using System.Diagnostics;

namespace Rewards.Todoist.Domain.Tasks.Commands;

public class CompleteTaskCommandHandler : IRequestHandler<CompleteTaskCommand>
{
    private readonly ITodoistService _todoistService;

    private readonly IUserRepository _userRepository;

    private readonly AuthContext _authContext;

    private readonly IMediator _mediator;

    public CompleteTaskCommandHandler(
        ITodoistService todoistService,
        IUserRepository userRepository,
        AuthContext authContext,
        IMediator mediator)
    {
        _todoistService = todoistService;
        _userRepository = userRepository;
        _authContext = authContext;
        _mediator = mediator;
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

        if (Debugger.IsAttached)
        {
            await Task.Delay(1000);
        }
        else
        {
            await _todoistService.CompleteTaskAsync(request.TaskId, user.TodoistAccessToken);
        }

        await _mediator.Publish(new TaskHasBeenCompletedEvent(request.UserId, request.TaskId));
    }
}
