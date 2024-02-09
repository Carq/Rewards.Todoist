import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import OverviewLatestCompletedTasks from "./pages/Overview/overview-latest-completed-tasks";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <OverviewLatestCompletedTasks />
      </Box>
    </Container>
  );
}
