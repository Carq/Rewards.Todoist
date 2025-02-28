import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  LinearProgress,
  Avatar,
  Alert,
  Divider,
  Tooltip,
  Fade,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import BlurredText from "../../componets/BlurredText";
import { blue, green, yellow, grey } from "@mui/material/colors";
import { getMotivationMessage } from "../../utils/getMotivationMessage";

const PersonalProfile = ({ user, stats }) => {
  const [progress, setProgress] = useState(0);
  const [animateStats, setAnimateStats] = useState(false);

  const isCarq = user === "Carq";
  const avatarColor = isCarq ? blue[500] : green[500];
  const avatarIcon = isCarq ? <FitnessCenterIcon /> : <LocalFloristIcon />;

  const calculateLevel = (experience) => {
    let level = 1;
    let expForNextLevel = 50;
    let totalExp = experience;

    while (experience >= expForNextLevel) {
      experience -= expForNextLevel;
      level++;
      expForNextLevel = Math.floor(expForNextLevel * 1.05);
    }

    return {
      level,
      expForNextLevel,
      expLeft: expForNextLevel - experience,
      currentExp: experience,
      totalExp,
    };
  };

  const { level, expForNextLevel, expLeft, currentExp } = calculateLevel(
    stats.experience
  );
  const targetProgress = ((expForNextLevel - expLeft) / expForNextLevel) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetProgress);
    }, 250);

    setAnimateStats(true);

    return () => clearTimeout(timer);
  }, [targetProgress]);

  const progressThresholdForDisplayingLevelUp = 10;
  const showLevelUpAlert =
    targetProgress <= progressThresholdForDisplayingLevelUp;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        background: `linear-gradient(145deg, ${grey[100]}, ${grey[50]})`,
        boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Fade in={showLevelUpAlert} timeout={800}>
          <Box sx={{ mb: 2, display: showLevelUpAlert ? "block" : "none" }}>
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
              {getMotivationMessage()} 🎉
            </Alert>
          </Box>
        </Fade>

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

        <Divider sx={{ my: 2, opacity: 0.7 }} />

        <Fade in={animateStats} timeout={800}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Tooltip title="Obecny poziom" arrow placement="top">
              <Stack
                alignItems="center"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: `linear-gradient(145deg, ${blue[50]}, ${blue[100]})`,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  minWidth: 80,
                }}
              >
                <Typography variant="h5" sx={{ color: blue[700] }}>
                  🕹️
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: blue[800] }}
                >
                  {level}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "medium", color: blue[600] }}
                >
                  Poziom
                </Typography>
              </Stack>
            </Tooltip>

            <Tooltip title="Dostępne złoto" arrow placement="top">
              <Stack
                alignItems="center"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: `linear-gradient(145deg, ${yellow[50]}, ${yellow[100]})`,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  minWidth: 80,
                }}
              >
                <Typography variant="h5" sx={{ color: yellow[800] }}>
                  💛
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: yellow[900] }}
                >
                  {stats.gold}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "medium", color: yellow[800] }}
                >
                  Złoto
                </Typography>
              </Stack>
            </Tooltip>
          </Stack>
        </Fade>

        <Box
          sx={{
            mt: 3,
            px: 1,
            position: "relative",
          }}
        >
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

          <Box
            sx={{
              position: "relative",
              height: 8,
              borderRadius: 4,
              backgroundColor: grey[200],
              overflow: "hidden",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: `${progress}%`,
                height: "100%",
                background: `linear-gradient(to right, ${blue[600]}, ${blue[400]})`,
                borderRadius: 4,
                transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 0.75,
            }}
          >
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
      </CardContent>
    </Card>
  );
};

PersonalProfile.propTypes = {
  user: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    experience: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }).isRequired,
};

export default PersonalProfile;
