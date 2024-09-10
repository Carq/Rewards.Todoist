using Rewards.Todoist.Domain.UserEvents.Entities;

namespace Rewards.Todoist.Domain.UserActivity.Entities;

public record ActivityLogRecord(string Name, int ExpImpact, int GoldImpact, ActivityType Type, DateTime OccurredAt);
