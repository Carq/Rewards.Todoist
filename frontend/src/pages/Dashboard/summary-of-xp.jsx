import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid, Fade, Chip } from "@mui/material";
import { blue, green, red, yellow, grey, purple } from "@mui/material/colors";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TodayIcon from "@mui/icons-material/Today";

// Style constants for consistent theming
const styles = {
  statBox: {
    p: 1.5,
    borderRadius: 2,
    background: `linear-gradient(145deg, ${grey[50]}, ${grey[100]})`,
    border: `1px solid ${grey[200]}`,
    transition: "all 0.2s ease",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
      boxShadow: "0 5px 10px rgba(0,0,0,0.05)",
      transform: "translateY(-2px)",
    },
  },
  icon: {
    borderRadius: "50%",
    p: 0.8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    fontSize: "1.2rem",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    my: 1,
  },
  weekContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 1.5,
    borderRadius: 2,
    background: `linear-gradient(145deg, ${blue[50]}, ${blue[100]})`,
    border: `1px solid ${blue[200]}`,
    mb: 2,
  },
  trendIcon: {
    fontSize: "0.9rem",
    ml: 0.5,
    verticalAlign: "middle",
  },
};

/**
 * Get day name from date string
 */
const getDayName = (dateStr) => {
  const days = ["Nd", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];
  return days[new Date(dateStr).getDay()];
};

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
    if (!experianceOverview) return;

    const dates = Object.keys(experianceOverview).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    // Function to get week number
    const getWeekNumber = (date) => {
      const d = new Date(date);
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    };

    const currentWeekNumber = getWeekNumber(new Date());
    const previousWeekNumber = currentWeekNumber - 1;

    // Get dates for current and previous week
    const currentWeekDates = dates.filter(
      (date) => getWeekNumber(date) === currentWeekNumber
    );
    const previousWeekDates = dates.filter(
      (date) => getWeekNumber(date) === previousWeekNumber
    );

    // Calculate XP totals
    const currentWeekXP = currentWeekDates.reduce(
      (sum, date) => sum + experianceOverview[date].totalExperience,
      0
    );

    const previousWeekXP = previousWeekDates.reduce(
      (sum, date) => sum + experianceOverview[date].totalExperience,
      0
    );

    // Calculate active days (days with XP > 0)
    const currentWeekActiveDays = currentWeekDates.filter(
      (date) => experianceOverview[date].totalExperience > 0
    ).length;

    const previousWeekActiveDays = previousWeekDates.filter(
      (date) => experianceOverview[date].totalExperience > 0
    ).length;

    // Get current day of week (0-6, 0 = Sunday)
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysPassedThisWeek =
      currentDayOfWeek === 0 ? 1 : currentDayOfWeek + 1;

    // Calculate week completion percentage
    const weekCompletion = Math.min(
      100,
      Math.round((currentWeekActiveDays / daysPassedThisWeek) * 100)
    );

    // Calculate percent change from previous week
    const percentChange =
      previousWeekXP === 0
        ? 100
        : Math.round(((currentWeekXP - previousWeekXP) / previousWeekXP) * 100);

    // Find best day
    let bestDay = { name: "", xp: 0, date: "" };
    dates.forEach((date) => {
      const xp = experianceOverview[date].totalExperience;
      if (xp > bestDay.xp) {
        bestDay = {
          name: getDayName(date),
          xp: xp,
          date: date,
        };
      }
    });

    // Calculate streak (consecutive days with XP)
    let streak = 0;
    const sortedDates = [...dates].sort((a, b) => new Date(b) - new Date(a)); // Newest first

    const todayStr = new Date().toISOString().split("T")[0];
    const todayDate = new Date(todayStr);

    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      const prevDate = i > 0 ? new Date(sortedDates[i - 1]) : todayDate;

      const dayDiff = Math.floor(
        (prevDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      if (
        (i === 0 && experianceOverview[sortedDates[i]].totalExperience > 0) ||
        (dayDiff === 1 &&
          experianceOverview[sortedDates[i]].totalExperience > 0)
      ) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    // Calculate total XP
    const totalXP = dates.reduce(
      (sum, date) => sum + experianceOverview[date].totalExperience,
      0
    );

    // Calculate today's XP
    const todayXP = experianceOverview[todayStr]
      ? experianceOverview[todayStr].totalExperience
      : 0;

    // Calculate average daily XP (from all days with data)
    const daysWithXP = dates.filter(
      (date) => experianceOverview[date].totalExperience > 0
    ).length;

    const avgDailyXP =
      daysWithXP > 0 ? Math.round((totalXP / daysWithXP) * 10) / 10 : 0;

    // Calculate how today compares to average (as a percentage)
    const comparedToAvg =
      avgDailyXP > 0 ? Math.round((todayXP / avgDailyXP) * 100) : 0;

    // Update state with calculated statistics
    setStats({
      currentWeek: {
        xp: currentWeekXP,
        avg: currentWeekDates.length
          ? +(currentWeekXP / currentWeekDates.length).toFixed(1)
          : 0,
        daysActive: currentWeekActiveDays,
        totalDays: daysPassedThisWeek,
      },
      previousWeek: {
        xp: previousWeekXP,
        avg: previousWeekDates.length
          ? +(previousWeekXP / previousWeekDates.length).toFixed(1)
          : 0,
        daysActive: previousWeekActiveDays,
        totalDays: 7,
      },
      percentChange,
      bestDay,
      streak,
      total: totalXP,
      weekCompletion,
      today: {
        xp: todayXP,
        date: todayStr,
        comparedToAvg,
      },
    });

    // Trigger animation
    setTimeout(() => setAnimateIn(true), 100);
  }, [experianceOverview]);

  // Get trend icon based on percent change
  const getTrendIcon = (value) => {
    if (value > 0) {
      return <TrendingUpIcon sx={{ ...styles.trendIcon, color: green[500] }} />;
    } else if (value < 0) {
      return <TrendingDownIcon sx={{ ...styles.trendIcon, color: red[500] }} />;
    }
    return <TrendingFlatIcon sx={{ ...styles.trendIcon, color: grey[500] }} />;
  };

  return (
    <Fade in={animateIn} timeout={800}>
      <Box>
        {/* Weekly summary */}
        <Box sx={styles.weekContainer}>
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
            <Box sx={styles.statBox}>
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
                    ...styles.icon,
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
            <Box sx={styles.statBox}>
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
                    ...styles.icon,
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
            <Box sx={styles.statBox}>
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
                    ...styles.icon,
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
