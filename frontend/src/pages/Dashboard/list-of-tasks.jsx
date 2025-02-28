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
import { config } from "../../config";
import ListOfLatestActivities from "./overview-latest-completed-tasks";
import TasksCompleteMessage from "./tasks-complete-message";
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
    <Paper elevation={1}>
      {isLoading ? (
        loadingSkeleton
      ) : (
        <Stack>
          <Item>
            {listOfTasks && listOfTasks.length > 0 ? (
              <>
                <ListOfLatestActivities
                  title={"Zadania na dziś"}
                  activities={listOfTasks}
                  onItemClick={handleClickOpen}
                  disabled={isLoading || isReloading}
                />
                {isReloading && <LinearProgress />}
              </>
            ) : (
              <TasksCompleteMessage />
            )}
          </Item>
        </Stack>
      )}
      <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>{selectedTask && selectedTask.name}</DialogTitle>
        <DialogContent>Kto go ukończył?</DialogContent>
        <DialogActions sx={{ justifyContent: "center", px: 2, pb: 2 }}>
          <Button
            size="medium"
            variant="contained"
            startIcon={<CheckCircleIcon />}
            loading={completeTask.isPending}
            loadingPosition="start"
            disabled={completeTask.isPending || completeTask.isError}
            onClick={() =>
              completeTask.mutate({
                taskId: selectedTask.idForUsers.find(
                  (idForUser) => idForUser.userId === 9238519
                ).taskId,
                userId: 9238519,
              })
            }
            sx={{
              flex: 1,
              maxWidth: 140,
              minWidth: 120,
              mx: 1,
            }}
          >
            Carq
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            loading={completeTask.isPending}
            loadingPosition="start"
            disabled={completeTask.isPending || completeTask.isError}
            onClick={() =>
              completeTask.mutate({
                taskId: selectedTask.idForUsers.find(
                  (idForUser) => idForUser.userId === 33983343
                ).taskId,
                userId: 33983343,
              })
            }
            sx={{
              flex: 1,
              maxWidth: 140,
              minWidth: 120,
              mx: 1,
            }}
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
