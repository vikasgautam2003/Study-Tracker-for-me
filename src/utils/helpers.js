export function getDateKey(date) {
  const local = new Date(date);
  const year = local.getFullYear();
  const month = String(local.getMonth() + 1).padStart(2, "0");
  const day = String(local.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}




export function calculateStreak(history) {
  const keys = Object.keys(history).sort(); 
  if (keys.length === 0) return 0;

  let streak = 0;
  let prevDate = null;

  for (const dateKey of keys) {
    const records = history[dateKey];
    const hasCompleted = Object.values(records).some((v) => v === true || v === "true");
    if (!hasCompleted) continue;

    const currentDate = new Date(dateKey);
    if (prevDate) {
      const diff = (currentDate - prevDate) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else {
        streak = 1;
      }
    } else {
      streak = 1;
    }
    prevDate = currentDate;
  }

  return streak;
}
