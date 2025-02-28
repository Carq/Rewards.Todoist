import { Paper, Typography, Box } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const TasksCompleteMessage = () => {
  return (
    <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <EmojiEventsIcon color="success" sx={{ fontSize: 60 }} />
        <Typography variant="h5" color="success.main" gutterBottom>
          Gratulacje!
        </Typography>
        <Typography variant="body1">
          Wszystkie zadania na dziś zostały wykonane.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Możesz odetchnąć i cieszyć się resztą dnia!
        </Typography>
      </Box>
    </Paper>
  );
};

export default TasksCompleteMessage;
