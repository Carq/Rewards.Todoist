import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import ListOfLatestCompletedTasks from "./overview-latest-completed-tasks";
import PropTypes from "prop-types";
import SummaryOfXP from "./summary-of-xp";

import styled from "@emotion/styled";

const Container = styled.div`
  min-width: 460px;
`;

const PersonalOverview = ({ user, completedTasks, experianceOverview }) => {
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
        <SummaryOfXP experianceOverview={experianceOverview} />
        <ListOfLatestCompletedTasks
          title={"Ukończone w ostatnich 24h"}
          completedTasks={completedTasks}
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
