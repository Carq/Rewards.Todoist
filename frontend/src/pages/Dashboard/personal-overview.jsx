import { Paper, Stack } from "@mui/material";
import ListOfLatestCompletedTasks from "./overview-latest-completed-tasks";
import PropTypes from "prop-types";
import SummaryOfXP from "./summary-of-xp";

import styled from "@emotion/styled";
import PersonalProfile from "./personal-profile";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const PersonalOverview = ({ user, stats, activities, experianceOverview }) => {
  return (
    <Paper elevation={0}>
      <Stack>
        <Item>
          <PersonalProfile user={user} stats={stats} />
        </Item>
        <Item>
          <SummaryOfXP experianceOverview={experianceOverview} />
        </Item>
        <Item>
          <ListOfLatestCompletedTasks
            title={"Ukończone od wczoraj"}
            activities={activities}
          />
        </Item>
      </Stack>
    </Paper>
  );
};

PersonalOverview.propTypes = {
  user: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    experience: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }).isRequired,
  activities: PropTypes.array.isRequired,
  experianceOverview: PropTypes.object.isRequired,
};

export default PersonalOverview;
