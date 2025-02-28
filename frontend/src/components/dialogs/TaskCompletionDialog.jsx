import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";
import { blue, green } from "@mui/material/colors";

/**
 * Dialog for confirming task completion
 */
const TaskCompletionDialog = ({
  open,
  onClose,
  selectedTask,
  onComplete,
  isLoading,
  isError,
}) => {
  if (!selectedTask) return null;

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>{selectedTask.name}</DialogTitle>
      <DialogContent sx={{ pb: 1 }}>Kto go ukończył?</DialogContent>

      <DialogActions sx={{ justifyContent: "center", px: 2, pb: 3 }}>
        <Button
          size="medium"
          variant="contained"
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <CheckCircleIcon />
            )
          }
          disabled={isLoading || isError}
          onClick={() =>
            onComplete({
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
            background: `linear-gradient(145deg, ${blue[600]}, ${blue[500]})`,
            boxShadow: `0 4px 10px ${blue[200]}`,
            "&:hover": {
              background: `linear-gradient(145deg, ${blue[500]}, ${blue[400]})`,
            },
          }}
        >
          Carq
        </Button>

        <Button
          size="medium"
          variant="contained"
          color="success"
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <CheckCircleIcon />
            )
          }
          disabled={isLoading || isError}
          onClick={() =>
            onComplete({
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
            background: `linear-gradient(145deg, ${green[600]}, ${green[500]})`,
            boxShadow: `0 4px 10px ${green[200]}`,
            "&:hover": {
              background: `linear-gradient(145deg, ${green[500]}, ${green[400]})`,
            },
          }}
        >
          Martyna
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TaskCompletionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedTask: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default TaskCompletionDialog;
