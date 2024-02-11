import { Avatar, Card, Stack } from "@mui/material";
import ListOfLatestCompletedTasks from "./overview-latest-completed-tasks";
import PropTypes from "prop-types";

const PersonalOverview = ({ user, completedTasks }) => {
  let completedTasksByUser = completedTasks.filter(
    (x) => new Date(x.completedDate) > new Date() - 24 * 60 * 60 * 1000
  );

  return (
    <Stack spacing={1}>
      <Card>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
          direction="row"
        >
          <h1>{user}</h1>
          <Avatar>{user[0]}</Avatar>
        </Stack>
      </Card>
      <ListOfLatestCompletedTasks
        title={"Ukończone w ostatnich 24h"}
        completedTasks={completedTasksByUser}
      />
    </Stack>
  );
};

PersonalOverview.protoTypes = {
  user: PropTypes.string.isRequired,
  completedTasks: PropTypes.array.isRequired,
};

export default PersonalOverview;
