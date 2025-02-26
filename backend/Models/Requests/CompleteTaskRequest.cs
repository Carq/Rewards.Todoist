namespace Rewards.Todoist.Models.Requests
{
    public class CompleteTaskRequest
    {
        public string UserId { get; set; }
        public string TaskId { get; set; }
    }
}
