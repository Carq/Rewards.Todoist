# Rewards.Todoist

## Storage

All below commands have to be run in `backend` folder.

### Add Migration

```powershell
dotnet ef migrations add <<migrationName>> -s Rewards.Todoist.Api -p Rewards.Todoist.Domain -c DomainContext -o "Storage/Migrations"
```

### Apply migration

```powershell
dotnet ef database update -s Rewards.Todoist.Api -p Rewards.Todoist.Domain -c DomainContext
```
