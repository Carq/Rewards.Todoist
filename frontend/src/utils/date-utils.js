export function howLongAgo(date1, date2) {
  const diffInSeconds = Math.abs(date2 - date1) / 1000;
  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes <= 1) return `minutę temu`;
  if (diffInMinutes < 60) return `${diffInMinutes} minut temu`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return `godzinę temu`;
  return `${diffInHours} godziny temu`;
}
