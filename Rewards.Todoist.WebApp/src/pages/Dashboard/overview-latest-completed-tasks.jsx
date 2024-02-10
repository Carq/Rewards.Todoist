import {
  Card,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";

function OverviewLatestCompletedTasks({ title, completedTasks }) {
  return (
    <Card>
      <CardHeader title={title}></CardHeader>
      <List>
        {completedTasks?.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.name + " - " + task.projectName}
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

OverviewLatestCompletedTasks.protoTypes = {
  title: PropTypes.string.isRequired,
  completedTasks: PropTypes.array.isRequired,
};

export default OverviewLatestCompletedTasks;
