const TASKS_KEY = "studyTasks";
const HISTORY_KEY = "studyHistory";

export function loadTasks() {
  if (typeof window === "undefined") return [];
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function loadHistory() {
  if (typeof window === "undefined") return {};
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : {};
}

export function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
