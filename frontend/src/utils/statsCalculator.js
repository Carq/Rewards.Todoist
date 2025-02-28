import { getDayName, getWeekNumber } from "./dateUtils";

/**
 * Calculate XP statistics from experience data
 * @param {Object} experienceOverview - Experience data keyed by dates
 * @returns {Object} Calculated statistics
 */
export const calculateXpStats = (experienceOverview) => {
  if (!experienceOverview) return null;

  const dates = Object.keys(experienceOverview).sort(
    (a, b) => new Date(a) - new Date(b)
  );

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
    (sum, date) => sum + experienceOverview[date].totalExperience,
    0
  );

  const previousWeekXP = previousWeekDates.reduce(
    (sum, date) => sum + experienceOverview[date].totalExperience,
    0
  );

  // Calculate active days (days with XP > 0)
  const currentWeekActiveDays = currentWeekDates.filter(
    (date) => experienceOverview[date].totalExperience > 0
  ).length;

  const previousWeekActiveDays = previousWeekDates.filter(
    (date) => experienceOverview[date].totalExperience > 0
  ).length;

  // Get current day of week (0-6, 0 = Sunday)
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const daysPassedThisWeek = currentDayOfWeek === 0 ? 1 : currentDayOfWeek + 1;

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
    const xp = experienceOverview[date].totalExperience;
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
      (i === 0 && experienceOverview[sortedDates[i]].totalExperience > 0) ||
      (dayDiff === 1 && experienceOverview[sortedDates[i]].totalExperience > 0)
    ) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  // Calculate total XP
  const totalXP = dates.reduce(
    (sum, date) => sum + experienceOverview[date].totalExperience,
    0
  );

  // Calculate today's XP
  const todayXP = experienceOverview[todayStr]
    ? experienceOverview[todayStr].totalExperience
    : 0;

  // Calculate average daily XP (from all days with data)
  const daysWithXP = dates.filter(
    (date) => experienceOverview[date].totalExperience > 0
  ).length;

  const avgDailyXP =
    daysWithXP > 0 ? Math.round((totalXP / daysWithXP) * 10) / 10 : 0;

  // Calculate how today compares to average (as a percentage)
  const comparedToAvg =
    avgDailyXP > 0 ? Math.round((todayXP / avgDailyXP) * 100) : 0;

  return {
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
  };
};
