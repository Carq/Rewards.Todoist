import {
  Avatar,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ListOfLatestCompletedTasks from "./overview-latest-completed-tasks";
import PropTypes from "prop-types";
import SummaryOfXP from "./summary-of-xp";

import styled from "@emotion/styled";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const PersonalOverview = ({ user, completedTasks, experianceOverview }) => {
  return (
    <Paper elevation={0}>
      <Stack>
        <Item>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Typography variant="h4">{user}</Typography>
                <Avatar>{user[0]}</Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Item>
        <Item>
          <SummaryOfXP experianceOverview={experianceOverview} />
        </Item>
        <Item>
          <ListOfLatestCompletedTasks
            title={"Ukończone w ostatnich 24h"}
            completedTasks={completedTasks}
          />
        </Item>
      </Stack>
    </Paper>
  );
};

PersonalOverview.protoTypes = {
  user: PropTypes.string.isRequired,
  completedTasks: PropTypes.array.isRequired,
};

export default PersonalOverview;
