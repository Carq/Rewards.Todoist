using MediatR;
using Rewards.Todoist.Domain.Common.Exceptions;
using Rewards.Todoist.Domain.Projects.Mappers;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Users.Repository;

namespace Rewards.Todoist.Domain.Projects.DomainEvents;

public class TaskHasBeenCompletedEventHandler : INotificationHandler<TaskHasBeenCompletedEvent>
{
    private readonly IUserRepository _userRepository;

    private readonly ITodoistService _todoistService;

    private readonly DomainContext _context;

    public TaskHasBeenCompletedEventHandler(IUserRepository userRepository, ITodoistService todoistService, DomainContext context)
    {
        _userRepository = userRepository;
        _todoistService = todoistService;
        _context = context;
    }

    public async Task Handle(TaskHasBeenCompletedEvent request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserById(request.UserId, cancellationToken);
        if (user == null)
        {
            throw new EntityNotFoundException("User", request.UserId);
        }

        var completedTasks = await _todoistService.GetTasks([request.TaskId], user.TodoistAccessToken);
        if (completedTasks == null || completedTasks.Results.Length == 0)
        {
            return;
        }

        return;
        await _context.CompletedTasks.AddAsync(TodoistToEntityMapper.MapToCompleteTask(completedTasks.Results[0].Id, completedTasks.Results[0], user));
        await _context.SaveChangesAsync(cancellationToken);
    }
}
