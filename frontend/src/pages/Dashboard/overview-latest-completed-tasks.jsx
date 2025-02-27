import {
  Card,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";
import { howLongAgo } from "../../utils/date-utils";
import BlurredText from "../../componets/BlurredText";

function ListOfLatestActivities({
  title,
  activities,
  onItemClick,
  disabled = false,
}) {
  return (
    <Card variant="outlined">
      <CardHeader title={title}></CardHeader>
      <List dense>
        {activities.map((activity) => (
          <ListItem
            key={activity.id}
            onClick={disabled ? undefined : () => onItemClick(activity)}
            disabled={disabled}
            sx={{
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.7 : 1,
            }}
            button
          >
            <ListItemIcon>
              <Avatar sx={{ bgcolor: grey[100] }}>
                {MapProjectNameToIcon(activity.activityArea, activity.name)}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" spacing={1}>
                  <Typography variant="body1">
                    <BlurredText>{activity.name}</BlurredText>
                  </Typography>

                  {activity.tags.map((label) => (
                    <Chip
                      key={label}
                      label={label}
                      color={MapTagToColor(label)}
                      size="small"
                    />
                  ))}
                </Stack>
              }
              secondary={
                activity.occurredOn && (
                  <Typography variant="caption">
                    {howLongAgo(new Date(activity.occurredOn), new Date())}
                  </Typography>
                )
              }
            />
          </ListItem>
        ))}
      </List>
      <CardActions></CardActions>
    </Card>
  );
}

function MapProjectNameToIcon(projectName, activityName) {
  switch (projectName) {
    case "Dom 🏡":
      return "🏡";
    case "Dzieci 👶":
      return "👶";
    case "Wykończenie domu":
      return "🔨";
    case "Życie ♥":
      return "💖";
    case "Reward":
      return MapRewardNameToIcon(activityName);
    default:
      return "❓";
  }
}

function MapRewardNameToIcon(rewardName) {
  switch (rewardName) {
    case "Słodycze":
      return "🍬";
    case "Słone przekąski":
      return "🍿";
    case "Czas dla siebie - 1h":
    case "Czas dla siebie - 2h":
      return "🕒";
    default:
      return "🎁";
  }
}

function MapTagToColor(tag) {
  if (tag.startsWith("XP")) {
    return "primary";
  } else if (tag.startsWith("Gold")) {
    return "gold";
  } else {
    return "default";
  }
}

ListOfLatestActivities.propTypes = {
  title: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      activityArea: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      occurredOn: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ListOfLatestActivities;
