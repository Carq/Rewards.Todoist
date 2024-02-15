import {
  Card,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";

import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";

function ListOfLatestCompletedTasks({ title, completedTasks }) {
  return (
    <Card>
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
              primary={task.name}
              secondary={
                new Date(task.completedDate).toLocaleTimeString("pl-PL") +
                "," +
                new Date(task.completedDate).toLocaleDateString("pl-PL")
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
