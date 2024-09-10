﻿using Rewards.Todoist.Domain.UserEvents.Entities;

namespace Rewards.Todoist.Domain.UserActivity.Entities;

public record ActivityLogRecord(long Id, string Name, string ActivityArea, int ExpImpact, int GoldImpact, string[] Tags, ActivityType Type, DateTime OccurredOn);
