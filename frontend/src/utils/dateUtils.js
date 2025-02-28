/**
 * Get day name from date string
 */
export const getDayName = (dateStr) => {
  const days = ["Nd", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];
  return days[new Date(dateStr).getDay()];
};

/**
 * Get week number for a given date
 */
export const getWeekNumber = (date) => {
  const d = new Date(date);
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

/**
 * Get today's date as string in 'YYYY-MM-DD' format
 * @returns {string} Today's date as string
 */
export const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};

/**
 * Get days passed in the current week
 * @returns {number} Number of days passed in current week (1-7)
 */
export const getDaysPassedThisWeek = () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  return currentDayOfWeek === 0 ? 1 : currentDayOfWeek + 1;
};
