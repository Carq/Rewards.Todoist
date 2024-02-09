import {
  Card,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function OverviewLatestCompletedTasks() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["latestCompletedTasks"],
    queryFn: () =>
      fetch("https://localhost:7021/project/activity").then((res) =>
        res.json()
      ),
  });

  return (
    <Card>
      <CardHeader title="Ostatnio zakończone zadania"></CardHeader>
      <List>
        {isPending ? (
          <ListItem>
            <ListItemText primary="Ładowanie..." />
          </ListItem>
        ) : error ? (
          <ListItem>
            <ListItemText primary="Wystąpił błąd" secondary={error.message} />
          </ListItem>
        ) : (
          data.events.map((task) => (
            <ListItem key={task.id}>
              <ListItemText
                primary={task.extraData.content}
                secondary={task.eventDate}
              />
            </ListItem>
          ))
        )}
      </List>
      <CardActions></CardActions>
    </Card>
  );
}
