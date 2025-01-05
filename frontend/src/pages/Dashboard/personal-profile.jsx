import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { blue, green } from "@mui/material/colors";
import BlurredText from "../../componets/BlurredText";

const PersonalProfile = ({ user, stats }) => {
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
            <Typography variant="caption">Level</Typography>
          </Stack>

          <Stack alignItems="center">
            <Typography variant="h5">🔷</Typography>
            <Typography variant="h5">{stats.experience}</Typography>
            <Typography variant="caption">Exp</Typography>
          </Stack>

          <Stack alignItems="center">
            <Typography variant="h5">💛</Typography>
            <Typography variant="h5">{stats.gold}</Typography>
            <Typography variant="caption">Złoto</Typography>
          </Stack>
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
