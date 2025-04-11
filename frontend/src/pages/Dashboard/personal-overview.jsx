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

import ListOfLatestActivities from "./overview-latest-completed-tasks";
import SummaryOfXP from "./summary-of-xp";
import PersonalProfile from "./personal-profile";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";

// Style constants for consistent theming
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
  sectionWrapper: {
    mb: 3,
    "&:last-child": {
      mb: 0,
    },
  },
};

/**
 * Main PersonalOverview component
 */
const PersonalOverview = ({
  user,
  stats,
  recentCompletedTasks,
  recentClaimedRewards,
  experianceOverview,
  isLoading,
  isReloading,
}) => {
  const [animateSections, setAnimateSections] = useState(false);

  // Animate sections with a slight delay after loading
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setAnimateSections(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <Paper elevation={1} sx={styles.container}>
        <LoadingSkeleton
          itemCount={4}
          heightMultipliers={[1, 1.13, 1.27, 1.27]}
        />
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={styles.container}>
      <Card variant="outlined" sx={styles.card}>
        <CardContent sx={{ p: 3 }}>
          <Fade in={animateSections} timeout={800}>
            <Stack>
              <Box sx={styles.sectionWrapper}>
                <PersonalProfile user={user} stats={stats} />
              </Box>

              <Box sx={styles.sectionWrapper}>
                <Box sx={styles.header}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: grey[800],
                      fontSize: "1.1rem",
                    }}
                  >
                    Statystyka XP
                  </Typography>
                </Box>
                <SummaryOfXP experianceOverview={experianceOverview} />
              </Box>

              <Box sx={styles.sectionWrapper}>
                <Box sx={styles.header}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: grey[800],
                      fontSize: "1.1rem",
                    }}
                  >
                    Ostatnie ukończone zadania
                  </Typography>
                </Box>
                <ListOfLatestActivities
                  hideTitle={true}
                  activities={recentCompletedTasks}
                  groupBy="date"
                />
              </Box>

              <Box sx={styles.sectionWrapper}>
                <Box sx={styles.header}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: grey[800],
                      fontSize: "1.1rem",
                    }}
                  >
                    Ostatnie nagrody
                  </Typography>
                </Box>
                <ListOfLatestActivities
                  hideTitle={true}
                  activities={recentClaimedRewards}
                />
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
    </Paper>
  );
};

// PropTypes validation
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
  isReloading: PropTypes.bool,
};

export default PersonalOverview;
