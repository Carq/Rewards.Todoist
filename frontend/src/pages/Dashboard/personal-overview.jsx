import { Paper, Stack, Skeleton } from "@mui/material";
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
  isLoading,
}) => {
  var loadingSkeleton = (
    <Stack spacing={2}>
      <Item>
        <Skeleton variant="rounded" width="100%" height={220} />
      </Item>
      <Item>
        <Skeleton variant="rounded" width="100%" height={250} />
      </Item>
      <Item>
        <Skeleton variant="rounded" width="100%" height={280} />
      </Item>
      <Item>
        <Skeleton variant="rounded" width="100%" height={280} />
      </Item>
    </Stack>
  );

  return (
    <Paper elevation={0}>
      {isLoading ? (
        loadingSkeleton
      ) : (
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
      )}
    </Paper>
  );
};

PersonalOverview.propTypes = {
  user: PropTypes.string,
  stats: PropTypes.shape({
    experience: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }),
  recentCompletedTasks: PropTypes.array,
  recentClaimedRewards: PropTypes.array,
  experianceOverview: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default PersonalOverview;
