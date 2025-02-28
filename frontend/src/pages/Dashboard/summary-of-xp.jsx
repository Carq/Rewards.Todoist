import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid, Fade } from "@mui/material";
import { green, grey, blue, purple, yellow } from "@mui/material/colors";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TodayIcon from "@mui/icons-material/Today";
import { summaryStyles } from "../../styles/summaryStyles";
import { calculateXpStats } from "../../utils/statsCalculator";

/**
 * Main SummaryOfXP component
 */
const SummaryOfXP = ({ experianceOverview }) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [stats, setStats] = useState({
    currentWeek: { xp: 0, avg: 0, daysActive: 0, totalDays: 0 },
    previousWeek: { xp: 0, avg: 0, daysActive: 0, totalDays: 0 },
    percentChange: 0,
    bestDay: { name: "", xp: 0, date: "" },
    streak: 0,
    total: 0,
    weekCompletion: 0,
    today: { xp: 0, date: "", comparedToAvg: 0 },
  });

  // Calculate statistics from data
  useEffect(() => {
    const calculatedStats = calculateXpStats(experianceOverview);
    if (calculatedStats) {
      setStats(calculatedStats);

      // Trigger animation
      setTimeout(() => setAnimateIn(true), 100);
    }
  }, [experianceOverview]);

  return (
    <Fade in={animateIn} timeout={800}>
      <Box>
        {/* Weekly summary */}
        <Box sx={summaryStyles.weekContainer}>
          <Box>
            <Typography variant="body2" color={blue[800]} fontWeight={500}>
              Ten tydzień
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: blue[900], mt: 0.5 }}
            >
              {stats.currentWeek.xp} XP
            </Typography>
            <Typography variant="caption" color={blue[700]}>
              {stats.currentWeek.xp > stats.previousWeek.xp ? "+" : ""}
              {stats.currentWeek.xp - stats.previousWeek.xp} XP vs zeszły
              tydzień
            </Typography>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" color={blue[800]} fontWeight={500}>
              Poprzedni tydzień
            </Typography>
            <Typography variant="h6" sx={{ color: blue[700], mt: 0.5 }}>
              {stats.previousWeek.xp} XP
            </Typography>
            <Typography variant="caption" color={blue[700]}>
              Śr. {stats.previousWeek.avg} XP/dzień
            </Typography>
          </Box>
        </Box>

        {/* Statistics grid - now with 3 panels */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Today's XP */}
          <Grid item xs={12} sm={4}>
            <Box sx={summaryStyles.statBox}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body2" color={grey[700]} fontWeight={500}>
                  Dzisiaj
                </Typography>
                <Box
                  sx={{
                    ...summaryStyles.icon,
                    bgcolor: purple[50],
                  }}
                >
                  <TodayIcon sx={{ fontSize: "1rem", color: purple[600] }} />
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: stats.today.xp > 0 ? purple[700] : grey[600],
                  }}
                >
                  {stats.today.xp}
                </Typography>
                <Typography variant="caption" color={grey[600]}>
                  {stats.today.xp > 0
                    ? `${stats.today.comparedToAvg}% średniej`
                    : "Czeka na zdobycie"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Best day */}
          <Grid item xs={6} sm={4}>
            <Box sx={summaryStyles.statBox}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body2" color={grey[700]} fontWeight={500}>
                  Najlepszy dzień
                </Typography>
                <Box
                  sx={{
                    ...summaryStyles.icon,
                    bgcolor: yellow[50],
                  }}
                >
                  <EmojiEventsIcon
                    sx={{ fontSize: "1rem", color: yellow[700] }}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {stats.bestDay.xp}
                </Typography>
                <Typography variant="caption" color={grey[600]}>
                  {stats.bestDay.name}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Daily average */}
          <Grid item xs={6} sm={4}>
            <Box sx={summaryStyles.statBox}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body2" color={grey[700]} fontWeight={500}>
                  Średnia dzienna
                </Typography>
                <Box
                  sx={{
                    ...summaryStyles.icon,
                    bgcolor: green[50],
                  }}
                >
                  <CalendarMonthIcon
                    sx={{ fontSize: "1rem", color: green[500] }}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {stats.currentWeek.avg}
                </Typography>
                <Typography variant="caption" color={grey[600]}>
                  XP / dzień
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

SummaryOfXP.propTypes = {
  experianceOverview: PropTypes.object.isRequired,
};

export default SummaryOfXP;
