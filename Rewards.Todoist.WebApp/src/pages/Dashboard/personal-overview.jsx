import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import ListOfLatestCompletedTasks from "./overview-latest-completed-tasks";
import PropTypes from "prop-types";
import SummaryOfCompletedTasks from "./summary-of-completed-tasks";

import styled from "@emotion/styled";

const Container = styled.div`
  min-width: 360px;
`;

const PersonalOverview = ({ user, completedTasks }) => {
  let completedTasksByUser = completedTasks.filter(
    (x) => new Date(x.completedDate) > new Date() - 24 * 60 * 60 * 1000
  );

  return (
    <Container>
      <Stack spacing={1}>
        <Card>
          <CardContent>
            <Stack direction="row" spacing={2}>
              <Typography variant="h4">{user}</Typography>
              <Avatar>{user[0]}</Avatar>
            </Stack>
          </CardContent>
        </Card>
        <SummaryOfCompletedTasks tasks={completedTasks} />
        <ListOfLatestCompletedTasks
          title={"Ukończone w ostatnich 24h"}
          completedTasks={completedTasksByUser}
        />
      </Stack>
    </Container>
  );
};

PersonalOverview.protoTypes = {
  user: PropTypes.string.isRequired,
  completedTasks: PropTypes.array.isRequired,
};

export default PersonalOverview;
