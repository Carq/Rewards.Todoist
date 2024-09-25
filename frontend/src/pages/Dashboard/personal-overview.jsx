import { Paper, Stack } from "@mui/material";
import ListOfLatestActivities from "./overview-latest-completed-tasks";
import PropTypes from "prop-types";
import SummaryOfXP from "./summary-of-xp";

import styled from "@emotion/styled";
import PersonalProfile from "./personal-profile";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const PersonalOverview = ({
  user,
  stats,
  recentCompletedTasks,
  recentClaimedRewards,
  experianceOverview,
}) => {
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
          <ListOfLatestActivities
            title={"Ostatnie ukończone zadania"}
            activities={recentCompletedTasks}
          />
        </Item>
        <Item>
          <ListOfLatestActivities
            title={"Ostatnie nagrody"}
            activities={recentClaimedRewards}
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
  recentCompletedTasks: PropTypes.array.isRequired,
  recentClaimedRewards: PropTypes.array.isRequired,
  experianceOverview: PropTypes.object.isRequired,
};

export default PersonalOverview;
