// "use client";
// import { useMemo } from "react";
// import { getTodayKey, getDateKey } from "@/utils/helpers";

// function getStartOfWeek(date) {
//   const d = new Date(date);
//   const day = d.getDay();
//   const diff = d.getDate() - day;
//   return new Date(d.setDate(diff));
// }

// export default function StatsPanel({ tasks, history }) {
//   const today = new Date();
//   const todayKey = getTodayKey();
//   const startOfWeek = getStartOfWeek(today);
//   const startOfWeekKey = getDateKey(startOfWeek);

//   const stats = useMemo(() => {
//     let totalBacklog = 0;
//     let weekBacklog = 0;
//     let todayCompleted = 0;
//     let todayTotal = 0;

//     const todayHistory = history[todayKey] || {};
//     tasks.forEach((t) => {
//       todayTotal += t.duration;
//       if (todayHistory[t.id]) todayCompleted += t.duration;
//     });

//     Object.keys(history).forEach((dateKey) => {
//       if (dateKey < todayKey) {
//         const dayHistory = history[dateKey];
//         tasks.forEach((t) => {
//           if (!dayHistory[t.id]) {
//             totalBacklog += t.duration;
//             if (dateKey >= startOfWeekKey) weekBacklog += t.duration;
//           }
//         });
//       }
//     });

//     return { todayCompleted, todayTotal, weekBacklog, totalBacklog };
//   }, [tasks, history]);

//   const pct = stats.todayTotal > 0 ? (stats.todayCompleted / stats.todayTotal) * 100 : 0;

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {/* Today */}
//         <div className="solid-card p-4 rounded-2xl shadow-lg">
//           <div className="flex items-center justify-between text-blue-300 mb-2">
//             <h3 className="text-sm font-semibold uppercase">Today</h3>
//             <i className="fas fa-bullseye"></i>
//           </div>
//           <p className="text-3xl font-bold my-1 text-white">
//             {stats.todayCompleted} / {stats.todayTotal}
//           </p>
//           <div className="w-full bg-gray-700/60 rounded-full h-2">
//             <div
//               className="bg-blue-500 h-2 rounded-full"
//               style={{ width: `${pct}%`, transition: "width 0.5s ease" }}
//             ></div>
//           </div>
//         </div>

//         {/* This Week */}
//         <div className="solid-card p-4 rounded-2xl shadow-lg">
//           <div className="flex items-center justify-between text-yellow-300 mb-2">
//             <h3 className="text-sm font-semibold uppercase">This Week</h3>
//             <i className="fas fa-calendar-week"></i>
//           </div>
//           <div className="text-center">
//             <p className="text-3xl font-bold text-white">{stats.weekBacklog}</p>
//             <p className="text-xs text-gray-400">Backlog Hrs</p>
//           </div>
//         </div>

//         {/* Total */}
//         <div className="solid-card p-4 rounded-2xl shadow-lg">
//           <div className="flex items-center justify-between text-red-300 mb-2">
//             <h3 className="text-sm font-semibold uppercase">Total</h3>
//             <i className="fas fa-fire"></i>
//           </div>
//           <div className="text-center">
//             <p className="text-3xl font-bold text-white">{stats.totalBacklog}</p>
//             <p className="text-xs text-gray-400">Backlog Hrs</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { getTodayKey, getDateKey } from "@/utils/helpers";

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

export default function StatsPanel({ tasks, history }) {
  const today = new Date();
  const todayKey = getTodayKey();
  const startOfWeek = getStartOfWeek(today);
  const startOfWeekKey = getDateKey(startOfWeek);

  const stats = useMemo(() => {
    let totalBacklog = 0;
    let weekBacklog = 0;
    let todayCompleted = 0;
    let todayTotal = 0;

    const todayHistory = history[todayKey] || {};
    tasks.forEach((t) => {
      todayTotal += t.duration;
      if (todayHistory[t.id]) todayCompleted += t.duration;
    });

    Object.keys(history).forEach((dateKey) => {
      if (dateKey < todayKey) {
        const dayHistory = history[dateKey];
        tasks.forEach((t) => {
          if (!dayHistory[t.id]) {
            totalBacklog += t.duration;
            if (dateKey >= startOfWeekKey) weekBacklog += t.duration;
          }
        });
      }
    });

    return { todayCompleted, todayTotal, weekBacklog, totalBacklog };
  }, [tasks, history]);

  const pct = stats.todayTotal > 0 ? (stats.todayCompleted / stats.todayTotal) * 100 : 0;

  const panels = [
    {
      title: "Today",
      icon: "fa-bullseye",
      color: "blue",
      value: `${stats.todayCompleted} / ${stats.todayTotal}`,
      extra: (
        <div className="w-full bg-gray-800/50 rounded-full h-2 mt-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          ></motion.div>
        </div>
      ),
    },
    {
      title: "This Week",
      icon: "fa-calendar-week",
      color: "yellow",
      value: stats.weekBacklog,
      extra: <p className="text-xs text-gray-400 mt-1">Backlog Hrs</p>,
    },
    {
      title: "Total",
      icon: "fa-fire",
      color: "red",
      value: stats.totalBacklog,
      extra: <p className="text-xs text-gray-400 mt-1">Backlog Hrs</p>,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-5"
    >
      {panels.map((panel, i) => (
        <motion.div
          key={panel.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
          className={`relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-[#0f141f]/90 via-[#0a0e17]/85 to-[#090c13]/90 
                      border border-${panel.color}-500/20 shadow-lg backdrop-blur-xl hover:scale-[1.02] transition-transform duration-200`}
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 opacity-60"></div>
          <div className="flex items-center justify-between mb-3 text-gray-300">
            <h3
              className={`text-sm font-semibold uppercase tracking-wide text-${panel.color}-300`}
            >
              {panel.title}
            </h3>
            <i className={`fas ${panel.icon} text-${panel.color}-300 text-lg`}></i>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.08)]">
              {panel.value}
            </p>
            {panel.extra}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700/40 to-transparent"></div>
        </motion.div>
      ))}
    </motion.div>
  );
}
