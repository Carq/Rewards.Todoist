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

function ListOfLatestCompletedTasks({ title, completedTasks }) {
  return (
    <Card variant="outlined">
      <CardHeader title={title}></CardHeader>
      <List dense>
        {completedTasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: grey[100] }}>
                {MapProjectNameToIcon(task.projectName)}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" spacing={1}>
                  <Typography>{task.name}</Typography>
                  {task.labels.map((label) => (
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
                <>{howLongAgo(new Date(task.completedDate), new Date())}</>
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
  completedTasks: PropTypes.array.isRequired,
};

export default ListOfLatestCompletedTasks;
