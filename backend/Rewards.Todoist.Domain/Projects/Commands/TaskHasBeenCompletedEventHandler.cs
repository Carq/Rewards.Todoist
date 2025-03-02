using MediatR;
using Rewards.Todoist.Domain.Common.Exceptions;
using Rewards.Todoist.Domain.Projects.Mappers;
using Rewards.Todoist.Domain.Storage;
using Rewards.Todoist.Domain.Todoist;
using Rewards.Todoist.Domain.Users.Repository;

namespace Rewards.Todoist.Domain.Projects.Commands;

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

        var completedTasks = await _todoistService.GetCompletedTasksAsync(null, 5, null, user.TodoistAccessToken);
        var completedTask = completedTasks.Items.SingleOrDefault(x => x.TaskId == request.TaskId);
        if (completedTask == null)
        {
            return;
        }

        await _context.CompletedTasks.AddAsync(TodoistToEntityMapper.MapToCompleteTask(completedTask, user));
        await _context.SaveChangesAsync(cancellationToken);
    }
}
