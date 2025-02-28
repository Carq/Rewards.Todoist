/**
 * Calculates the level and experience points based on total experience
 * @param {number} experience - Total experience points
 * @returns {object} Level information including current level, XP needed for next level, etc.
 */
export const calculateLevelInfo = (experience) => {
  let level = 1;
  let expForNextLevel = 50;
  let totalExp = experience;
  let expAccumulated = 0;

  while (experience >= expForNextLevel) {
    experience -= expForNextLevel;
    expAccumulated += expForNextLevel;
    level++;
    expForNextLevel = Math.floor(expForNextLevel * 1.05);
  }

  return {
    level,
    expForNextLevel,
    expLeft: expForNextLevel - experience,
    currentExp: experience,
    totalExp,
    expAccumulated,
    progressPercentage:
      ((expForNextLevel - (expForNextLevel - experience)) / expForNextLevel) *
      100,
  };
};
