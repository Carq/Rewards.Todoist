import {
  Paper,
  Stack,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ListOfLatestActivities from "./overview-latest-completed-tasks";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useState } from "react";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ListOfTasks = ({ listOfTasks, isLoading, isReloading }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Item onClick={handleClickOpen}>
            <ListOfLatestActivities
              title={"Zadania na dziś"}
              activities={listOfTasks}
            />
            {isReloading && <LinearProgress />}
          </Item>
        </Stack>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>{/* Add content here if needed */}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Button 1
          </Button>
          <Button onClick={handleClose} color="primary">
            Button 2
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

ListOfTasks.propTypes = {
  listOfTasks: PropTypes.array,
  isLoading: PropTypes.bool,
  isReloading: PropTypes.bool,
};

export default ListOfTasks;
