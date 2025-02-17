import { Paper, Stack, Skeleton } from "@mui/material";
import ListOfLatestActivities from "./overview-latest-completed-tasks";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ListOfTasks = ({ listOfTasks, isLoading, isReloading }) => {
  var loadingSkeleton = (
    <Stack spacing={2}>
      <Item>
        <Skeleton variant="rounded" width="100%" height={220} />
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
            <ListOfLatestActivities
              title={"Zadania na dziś"}
              activities={listOfTasks}
            />
            {isReloading && <LinearProgress />}
          </Item>
        </Stack>
      )}
    </Paper>
  );
};

ListOfTasks.propTypes = {
  listOfTasks: PropTypes.array,
  isLoading: PropTypes.bool,
  isReloading: PropTypes.bool,
};

export default ListOfTasks;
