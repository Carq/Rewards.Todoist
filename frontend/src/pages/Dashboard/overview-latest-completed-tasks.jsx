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

function ListOfLatestCompletedTasks({ title, activities }) {
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
                  <Typography variant="body1">{activity.name}</Typography>

                  {activity.tags.map((label) => (
                    <Chip
                      key={label}
                      label={label}
                      color="primary"
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
    default:
      return "❓";
  }
}

ListOfLatestCompletedTasks.protoTypes = {
  title: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired,
};

export default ListOfLatestCompletedTasks;
