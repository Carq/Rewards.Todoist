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

function ListOfLatestActivities({ title, activities }) {
  return (
    <Card variant="outlined">
      <CardHeader title={title}></CardHeader>
      <List dense>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: grey[100] }}>
                {MapProjectNameToIcon(activity.activityArea)}
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
                <Typography variant="caption">
                  {howLongAgo(new Date(activity.occurredOn), new Date())}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <CardActions></CardActions>
    </Card>
  );
}

function MapProjectNameToIcon(projectName) {
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
      return "🎁";
    default:
      return "❓";
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
};

export default ListOfLatestActivities;
