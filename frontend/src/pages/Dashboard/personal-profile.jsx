import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { blue, green } from "@mui/material/colors";
import BlurredText from "../../componets/BlurredText";

const PersonalProfile = ({ user, stats }) => {
  const [progress, setProgress] = useState(0);

  var avatarColor = user == "Carq" ? blue[500] : green[500];
  var avatarIcon =
    user == "Carq" ? <FitnessCenterIcon /> : <LocalFloristIcon />;

  const calculateLevel = (experience) => {
    let level = 1;
    let expForNextLevel = 50;

    while (experience >= expForNextLevel) {
      experience -= expForNextLevel;
      level++;
      expForNextLevel = Math.floor(expForNextLevel * 1.05);
    }

    return { level, expForNextLevel, expLeft: expForNextLevel - experience };
  };

  const { level, expForNextLevel, expLeft } = calculateLevel(stats.experience);
  const targetProgress = ((expForNextLevel - expLeft) / expForNextLevel) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetProgress);
    }, 250);
    return () => clearTimeout(timer);
  }, [targetProgress]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack justifyContent="center" direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: avatarColor }}>{avatarIcon}</Avatar>
          <Typography variant="h4">
            <BlurredText>{user}</BlurredText>
          </Typography>
        </Stack>
        <Stack
          mt={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Stack alignItems="center">
            <Typography variant="h5">🕹️</Typography>
            <Typography variant="h5">{level}</Typography>
            <Typography variant="caption">Poziom</Typography>
          </Stack>

          <Stack alignItems="center">
            <Typography variant="h5">💛</Typography>
            <Typography variant="h5">{stats.gold}</Typography>
            <Typography variant="caption">Złoto</Typography>
          </Stack>
        </Stack>
        <Stack mt={3} spacing={1}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >{`${expLeft}/${expForNextLevel}`}</Typography>
            </Box>
          </Box>
        </Stack>
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
