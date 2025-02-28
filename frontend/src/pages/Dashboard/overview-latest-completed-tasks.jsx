import {
  Card,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";

import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";
import { howLongAgo } from "../../utils/date-utils";
import BlurredText from "../../componets/BlurredText";
import LabelTag from "../../components/LabelTag";

function ListOfLatestActivities({
  title,
  activities,
  onItemClick = () => {},
  disabled = false,
}) {
  const isClickable = onItemClick !== (() => {});

  return (
    <Card variant="outlined">
      <CardHeader title={title}></CardHeader>
      <List dense>
        {activities.map((activity) => (
          <ListItem
            key={activity.id}
            disablePadding
            disabled={disabled}
            sx={{ opacity: disabled ? 0.7 : 1 }}
          >
            {isClickable ? (
              <ListItemButton
                onClick={() => onItemClick(activity)}
                disabled={disabled}
              >
                <ListItemContents activity={activity} />
              </ListItemButton>
            ) : (
              <ListItemContents activity={activity} />
            )}
          </ListItem>
        ))}
      </List>
      <CardActions></CardActions>
    </Card>
  );
}

function ListItemContents({ activity }) {
  return (
    <>
      <ListItemIcon>
        <Avatar
          sx={{
            bgcolor: getAvatarBgColor(activity.activityArea),
            color: "text.primary",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            fontSize: "1.1rem",
            width: 36,
            height: 36,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
            },
          }}
        >
          {MapProjectNameToIcon(activity.activityArea, activity.name)}
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body1">
            <BlurredText>{activity.name}</BlurredText>
          </Typography>
        }
        secondary={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Stack direction="row" spacing={0.8}>
              {activity.tags.map((label) => (
                <LabelTag
                  key={label}
                  label={label}
                  color={MapTagToColor(label)}
                />
              ))}
            </Stack>
            {activity.occurredOn && (
              <Typography variant="caption" sx={{ ml: "auto" }}>
                {howLongAgo(new Date(activity.occurredOn), new Date())}
              </Typography>
            )}
          </Stack>
        }
      />
    </>
  );
}

ListItemContents.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // Accept both number and string
    name: PropTypes.string.isRequired,
    activityArea: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    occurredOn: PropTypes.string,
  }).isRequired,
};

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

function getAvatarBgColor(activityArea) {
  switch (activityArea) {
    case "Dom 🏡":
      return "rgba(139, 195, 74, 0.15)";
    case "Dzieci 👶":
      return "rgba(33, 150, 243, 0.15)";
    case "Wykończenie domu":
      return "rgba(255, 152, 0, 0.15)";
    case "Życie ♥":
      return "rgba(233, 30, 99, 0.15)";
    case "Reward":
      return "rgba(255, 196, 0, 0.15)";
    default:
      return grey[100];
  }
}

ListOfLatestActivities.propTypes = {
  title: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      activityArea: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      occurredOn: PropTypes.string,
    })
  ).isRequired,
  onItemClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ListOfLatestActivities;
