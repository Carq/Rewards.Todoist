import {
  Card,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import PropTypes from "prop-types";

function OverviewLatestCompletedTasks({ events }) {
  return (
    <Card>
      <CardHeader title="Ostatnio zakończone zadania"></CardHeader>
      <List>
        {events.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.extraData.content}
              secondary={new Date(task.eventDate).toLocaleString("pl-PL")}
            />
          </ListItem>
        ))}
      </List>
      <CardActions></CardActions>
    </Card>
  );
}

OverviewLatestCompletedTasks.protoTypes = {
  events: PropTypes.array.isRequired,
};

export default OverviewLatestCompletedTasks;
