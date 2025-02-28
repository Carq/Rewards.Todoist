import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Stack,
  Box,
  Fade,
  LinearProgress,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { config } from "../../config";
import ListOfLatestActivities from "./overview-latest-completed-tasks";
import TasksCompleteMessage from "./tasks-complete-message";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import TaskCompletionDialog from "../../components/dialogs/TaskCompletionDialog";

// Style constants for consistent theming - matching personal-profile
const styles = {
  container: {
    borderRadius: 3,
    background: `linear-gradient(145deg, ${grey[100]}, ${grey[50]})`,
    boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
    overflow: "visible",
    position: "relative",
  },
  card: {
    borderRadius: 3,
    background: "transparent",
    boxShadow: "none",
    overflow: "visible",
  },
  header: {
    mb: 2,
    pb: 1,
    borderBottom: `1px solid ${grey[200]}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressContainer: {
    position: "relative",
    height: 4,
    marginTop: -4,
    zIndex: 2,
  },
  progressBar: {
    height: 4,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    background: `linear-gradient(to right, ${blue[600]}, ${blue[400]})`,
  },
};

/**
 * Main ListOfTasks component
 */
const ListOfTasks = ({ listOfTasks, isLoading, isReloading, refetchTasks }) => {
  // State management
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [animateSections, setAnimateSections] = useState(false);

  // Dialog handlers
  const handleClickOpen = (task) => {
    if (isLoading || isReloading) return;
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  // Task completion mutation
  const completeTask = useMutation({
    mutationFn: (claimRewardDto) => {
      return axios.post(`${config.apiUrl}tasks/complete`, claimRewardDto, {
        headers: {
          Authorization: `${localStorage.getItem("AuthToken")}`,
        },
      });
    },
  });

  // Effects
  useEffect(() => {
    // Handle successful completion
    if (completeTask.isSuccess) {
      handleClose();
      if (refetchTasks) {
        refetchTasks();
      }
    }
  }, [completeTask.isSuccess, refetchTasks]);

  useEffect(() => {
    // Animate sections with a slight delay after loading
    if (!isLoading) {
      const timer = setTimeout(() => {
        setAnimateSections(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Render loading skeleton
  if (isLoading) {
    return (
      <Paper elevation={1} sx={styles.container}>
        <LoadingSkeleton itemCount={1} />
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={styles.container}>
      <Card variant="outlined" sx={styles.card}>
        <CardContent sx={{ p: 3 }}>
          <Fade in={animateSections} timeout={800}>
            <Stack>
              {/* Header section with title */}
              <Box sx={styles.header}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: grey[800],
                    fontSize: "1.1rem",
                  }}
                >
                  Zadania na dziś
                </Typography>
              </Box>

              {/* Task list or completion message */}
              <Box>
                {listOfTasks && listOfTasks.length > 0 ? (
                  <ListOfLatestActivities
                    hideTitle={true}
                    activities={listOfTasks}
                    onItemClick={handleClickOpen}
                    disabled={isLoading || isReloading}
                    sx={{ mt: 0 }}
                  />
                ) : (
                  <TasksCompleteMessage />
                )}
              </Box>
            </Stack>
          </Fade>
        </CardContent>
      </Card>

      {/* Reloading indicator */}
      {isReloading && (
        <Fade in={isReloading} timeout={300}>
          <Box sx={styles.progressContainer}>
            <LinearProgress sx={styles.progressBar} />
          </Box>
        </Fade>
      )}

      {/* Task completion dialog - extracted to a separate component */}
      <TaskCompletionDialog
        open={open}
        onClose={handleClose}
        selectedTask={selectedTask}
        onComplete={completeTask.mutate}
        isLoading={completeTask.isPending}
        isError={completeTask.isError}
      />
    </Paper>
  );
};

// PropTypes validation
ListOfTasks.propTypes = {
  listOfTasks: PropTypes.array,
  isLoading: PropTypes.bool,
  isReloading: PropTypes.bool,
  refetchTasks: PropTypes.func,
};

export default ListOfTasks;
