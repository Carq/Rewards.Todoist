import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Stack,
  Box,
  Avatar,
  Alert,
  Divider,
  Tooltip,
  Fade,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import BlurredText from "../../componets/BlurredText";
import { blue, brown, yellow, grey, green } from "@mui/material/colors";
import { getMotivationMessage } from "../../utils/getMotivationMessage";
import { calculateLevelInfo } from "../../utils/levelUtils";
import { profileStyles } from "../../styles/profileStyles";

/**
 * Avatar section component
 */
const UserAvatar = ({ user, avatarColor, avatarIcon }) => (
  <Stack justifyContent="center" direction="row" spacing={2} mb={3}>
    <Avatar
      sx={{
        bgcolor: avatarColor,
        width: 56,
        height: 56,
        boxShadow: `0 0 0 4px rgba(255,255,255,0.8), 0 0 0 6px ${avatarColor}30`,
      }}
    >
      {avatarIcon}
    </Avatar>
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        background: `linear-gradient(45deg, ${blue[700]}, ${blue[500]})`,
        backgroundClip: "text",
        textFillColor: "transparent",
        display: "flex",
        alignItems: "center",
      }}
    >
      <BlurredText>{user}</BlurredText>
    </Typography>
  </Stack>
);

/**
 * Common stat panel component
 */
const StatPanel = ({ title, value, icon, tooltipText, color }) => (
  <Tooltip title={tooltipText} arrow placement="top">
    <Stack
      alignItems="center"
      sx={profileStyles.statsPanel(color[100], color[50])}
    >
      <Typography variant="h5" sx={{ color: color[700] }}>
        {icon}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: color[800] }}>
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{ fontWeight: "medium", color: color[600] }}
      >
        {title}
      </Typography>
    </Stack>
  </Tooltip>
);

StatPanel.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  tooltipText: PropTypes.string.isRequired,
  color: PropTypes.object.isRequired,
};

/**
 * Stats panels component
 */
const StatsPanels = ({ level, gold, stats }) => {
  // Calculate XP needed for next gold (each gold is 10XP)
  const currentXP = stats.experience;
  const xpForNextGold = 10 - (currentXP % 10);

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{ mb: 3 }}
    >
      <StatPanel
        title="Poziom"
        value={level}
        icon="🕹️"
        tooltipText="Obecny poziom"
        color={blue}
      />
      <StatPanel
        title="Złoto"
        value={gold}
        icon="🪙"
        tooltipText="Twoje obecne złoto"
        color={yellow}
      />
      <StatPanel
        title={xpForNextGold === 10 ? "Komplet XP" : "XP do złota"}
        value={xpForNextGold === 10 ? 10 : xpForNextGold}
        icon="🤎"
        tooltipText={
          xpForNextGold === 10
            ? "Właśnie zdobyłeś nowe złoto!"
            : `Potrzebujesz ${xpForNextGold} XP do kolejnego złota`
        }
        color={brown}
      />
    </Stack>
  );
};

/**
 * Experience progress bar component
 */
const ExperienceProgressBar = ({ levelInfo, progress }) => {
  const { level, currentExp, expForNextLevel, expLeft } = levelInfo;

  return (
    <Box sx={{ mt: 3, px: 1, position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1.5,
          alignItems: "flex-end",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 500,
            color: grey[800],
            fontSize: "0.9rem",
          }}
        >
          Poziom {level} → {level + 1}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: blue[700],
            fontWeight: 600,
            fontSize: "0.85rem",
          }}
        >
          {currentExp}/{expForNextLevel} XP
        </Typography>
      </Box>

      <Box sx={profileStyles.progressBar.container}>
        <Box
          sx={{ ...profileStyles.progressBar.fill, width: `${progress}%` }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.75 }}>
        <Typography
          variant="caption"
          sx={{
            color: grey[600],
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Box
            component="span"
            sx={{
              color: blue[500],
              fontWeight: 700,
            }}
          >
            {expLeft} XP
          </Box>
          do kolejnego poziomu
        </Typography>
      </Box>
    </Box>
  );
};

/**
 * Level up alert component
 */
const LevelUpAlert = ({ visible, message }) => (
  <Fade in={visible} timeout={800}>
    <Box sx={{ mb: 2, display: visible ? "block" : "none" }}>
      <Alert
        severity="success"
        variant="filled"
        sx={{
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%": { opacity: 0.9 },
            "50%": { opacity: 1 },
            "100%": { opacity: 0.9 },
          },
        }}
      >
        {message} 🎉
      </Alert>
    </Box>
  </Fade>
);

/**
 * Main PersonalProfile component
 */
const PersonalProfile = ({ user, stats }) => {
  // State management
  const [progress, setProgress] = useState(0);
  const [animateStats, setAnimateStats] = useState(false);

  // User appearance settings
  const isCarq = user === "Carq";
  const avatarColor = isCarq ? blue[500] : green[500];
  const avatarIcon = isCarq ? <FitnessCenterIcon /> : <LocalFloristIcon />;

  // Calculate level information from experience
  const levelInfo = calculateLevelInfo(stats.experience);
  const { progressPercentage } = levelInfo;

  // Constants
  const LEVEL_UP_THRESHOLD = 10;
  const showLevelUpAlert = progressPercentage <= LEVEL_UP_THRESHOLD;

  // Effects
  useEffect(() => {
    // Animate progress bar with a slight delay
    const timer = setTimeout(() => {
      setProgress(progressPercentage);
    }, 250);

    // Trigger stats animation
    setAnimateStats(true);

    return () => clearTimeout(timer);
  }, [progressPercentage]);

  return (
    <>
      {/* Level up notification */}
      <LevelUpAlert
        visible={showLevelUpAlert}
        message={getMotivationMessage()}
      />

      {/* User avatar and name */}
      <UserAvatar
        user={user}
        avatarColor={avatarColor}
        avatarIcon={avatarIcon}
      />

      <Divider sx={{ my: 2, opacity: 0.7 }} />

      {/* Stats panels (level and gold) */}
      <Fade in={animateStats} timeout={800}>
        <div>
          {/* Wrapper div needed for Fade to work with custom components */}
          <StatsPanels
            level={levelInfo.level}
            gold={stats.gold}
            stats={stats}
          />
        </div>
      </Fade>

      {/* Experience progress bar */}
      <ExperienceProgressBar levelInfo={levelInfo} progress={progress} />
    </>
  );
};

// PropTypes validation
PersonalProfile.propTypes = {
  user: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    experience: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }).isRequired,
};

export default PersonalProfile;
