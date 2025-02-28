import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, Stack, Box, Fade, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import styled from "@emotion/styled";
import { themeColors } from "../../theme";

import ListOfLatestActivities from "./overview-latest-completed-tasks";
import SummaryOfXP from "./summary-of-xp";
import PersonalProfile from "./personal-profile";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";

// Style constants for consistent theming
const styles = {
  container: {
    borderRadius: 3,
    background: themeColors.background.gradient,
    boxShadow: "0 10px 30px rgba(0,0,0,0.03), 0 1px 8px rgba(0,0,0,0.02)",
    position: "relative",
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "100%",
      backgroundImage: `
        radial-gradient(at 20% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
        radial-gradient(at 80% 90%, rgba(240, 240, 240, 0.2) 0%, transparent 30%)
      `,
      pointerEvents: "none",
    },
  },
  sectionWrapper: {
    transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
    position: "relative",
    zIndex: 1,
  },
};

// Styled component for section wrapper
const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

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
      <Paper elevation={0} sx={styles.container}>
        <LoadingSkeleton
          itemCount={4}
          heightMultipliers={[1, 1.13, 1.27, 1.27]}
        />
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={styles.container}>
      <Fade in={animateSections} timeout={800}>
        <Stack>
          {/* User profile section */}
          <SectionWrapper>
            <PersonalProfile user={user} stats={stats} />
          </SectionWrapper>

          {/* Recent completed tasks section */}
          <SectionWrapper>
            <ListOfLatestActivities
              title={"Ostatnie ukończone zadania"}
              activities={recentCompletedTasks}
            />
          </SectionWrapper>

          {/* Experience summary section */}
          <SectionWrapper>
            <SummaryOfXP experianceOverview={experianceOverview} />
          </SectionWrapper>

          {/* Recent rewards section */}
          <SectionWrapper>
            <ListOfLatestActivities
              title={"Ostatnie nagrody"}
              activities={recentClaimedRewards}
            />
          </SectionWrapper>
        </Stack>
      </Fade>
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
};

export default PersonalOverview;
