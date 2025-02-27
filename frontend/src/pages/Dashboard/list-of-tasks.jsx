import {
  Paper,
  Stack,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { config } from "../../config";
import ListOfLatestActivities from "./overview-latest-completed-tasks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import axios from "axios";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ListOfTasks = ({ listOfTasks, isLoading, isReloading, refetchTasks }) => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClickOpen = (task) => {
    // Don't open dialog if data is loading or reloading
    if (isLoading || isReloading) return;

    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const completeTask = useMutation({
    mutationFn: (claimRewardDto) => {
      return axios.post(`${config.apiUrl}tasks/complete`, claimRewardDto, {
        headers: {
          Authorization: `${localStorage.getItem("AuthToken")}`,
        },
      });
    },
  });

  useEffect(() => {
    if (completeTask.isSuccess) {
      handleClose();
      if (refetchTasks) {
        refetchTasks();
      }
    }
  }, [completeTask.isSuccess, refetchTasks]);

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
              onItemClick={handleClickOpen}
              disabled={isLoading || isReloading}
            />
            {isReloading && <LinearProgress />}
          </Item>
        </Stack>
      )}
      <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedTask && <Typography>{selectedTask.name}</Typography>}
        </DialogTitle>
        <DialogContent>Kto go ukończył?</DialogContent>
        <DialogActions>
          <Button
            size="medium"
            variant="contained"
            startIcon={<CheckCircleIcon />}
            disabled={completeTask.isPending || completeTask.isError}
            onClick={() =>
              completeTask.mutate({
                taskId: selectedTask.idForUsers.find(
                  (idForUser) => idForUser.userId === 9238519
                ).taskId,
                userId: 9238519,
              })
            }
          >
            Carq
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            disabled={completeTask.isPending || completeTask.isError}
            onClick={() =>
              completeTask.mutate({
                taskId: selectedTask.idForUsers.find(
                  (idForUser) => idForUser.userId === 33983343
                ).taskId,
                userId: 33983343,
              })
            }
          >
            Martyna
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
  refetchTasks: PropTypes.func,
};

export default ListOfTasks;
