// "use client";
// import { getDateKey, getTodayKey } from "@/utils/helpers";

// export default function Calendar({ tasks, history, displayedDate, setDisplayedDate }) {
//   const todayKey = getTodayKey();
//   const month = displayedDate.getMonth();
//   const year = displayedDate.getFullYear();

//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const firstDay = new Date(year, month, 1).getDay();

//   const handleMonthChange = (offset) => {
//     const newDate = new Date(displayedDate);
//     newDate.setMonth(displayedDate.getMonth() + offset);
//     setDisplayedDate(newDate);
//   };

//   const renderDays = () => {
//     const days = [];
//     for (let i = 0; i < firstDay; i++) days.push(<div key={`e${i}`} className="calendar-day empty"></div>);
//     for (let d = 1; d <= daysInMonth; d++) {
//       const dateKey = getDateKey(new Date(year, month, d));
//       const dayHistory = history[dateKey] || {};
//       const success = tasks.length && tasks.every((t) => dayHistory[t.id]);
//       const isPast = dateKey < todayKey;
//       let classes = "calendar-day";
//       let icon = "";

//       if (isPast) {
//         classes += success ? " success" : " failure";
//         icon = success ? "fa-crown text-yellow-400" : "fa-thumbs-down text-red-300";
//       } else if (dateKey === todayKey) {
//         classes += success ? " today-success" : " today";
//         icon = success ? "fa-crown text-green-400" : "";
//       }

//       days.push(
//         <div key={d} className={classes}>
//           {d} {icon && <i className={`fas ${icon} calendar-icon`}></i>}
//         </div>
//       );
//     }
//     return days;
//   };

//   return (
//     <div className="solid-card p-5 rounded-2xl">
//       <div className="flex justify-between mb-4 items-center">
//         <button onClick={() => handleMonthChange(-1)} className="text-gray-400 hover:text-white">
//           <i className="fas fa-chevron-left"></i>
//         </button>
//         <h2 className="text-xl font-bold">{displayedDate.toLocaleString("en-US", { month: "long", year: "numeric" })}</h2>
//         <button onClick={() => handleMonthChange(1)} className="text-gray-400 hover:text-white">
//           <i className="fas fa-chevron-right"></i>
//         </button>
//       </div>

//       <div className="grid grid-cols-7 text-xs text-gray-400 mb-3 uppercase">
//         <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
//       </div>
//       <div className="grid grid-cols-7 gap-1 sm:gap-2">{renderDays()}</div>
//     </div>
//   );
// }








"use client";
import { getDateKey, getTodayKey } from "@/utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

export default function Calendar({ tasks, history, displayedDate, setDisplayedDate }) {
  const todayKey = getTodayKey();
  const month = displayedDate.getMonth();
  const year = displayedDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handleMonthChange = (offset) => {
    const newDate = new Date(displayedDate);
    newDate.setMonth(displayedDate.getMonth() + offset);
    setDisplayedDate(newDate);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`e${i}`} className="calendar-day empty" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const dateKey = getDateKey(dateObj);
      const dayHistory = history[dateKey] || {};
      const success =
        tasks.length > 0 &&
        tasks.every(
          (t) =>
            dayHistory[String(t.id)] === true ||
            dayHistory[String(t.id)] === "true"
        );

      const isToday = dateKey === todayKey;
      const isPastOrToday = new Date(dateKey) <= new Date(todayKey);

      let emoji = "";
      let emojiColor = "";
      let classes = "calendar-day group";

      if (isPastOrToday && success) {
        emoji = "👑";
        emojiColor = isToday ? "text-green-400" : "text-yellow-300";
        classes += isToday ? " today-success" : " success";
      } else if (isPastOrToday && !success) {
        emoji = "👎";
        emojiColor = "text-red-400";
        classes += " failure";
      } else if (isToday && !success) {
        emoji = "🎯";
        emojiColor = "text-blue-400";
        classes += " today";
      }

      days.push(
        <motion.div
          key={d}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className={classes}
        >
          <span
            className={`text-sm sm:text-base font-semibold ${
              isToday ? "text-blue-300" : "text-gray-200"
            }`}
          >
            {d}
          </span>
          {emoji && (
            <motion.span
              className={`mt-1 text-lg sm:text-xl ${emojiColor}`}
              initial={{ opacity: 0, y: 4, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {emoji}
            </motion.span>
          )}
        </motion.div>
      );
    }

    return days;
  };

  return (
    <motion.div
      key={month}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative solid-card p-4 sm:p-6 rounded-2xl shadow-2xl border border-gray-700/40
                 bg-gradient-to-br from-[#0e121a]/95 via-[#0a0e17]/90 to-[#070a0f]/95
                 backdrop-blur-xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none"></div>

      <div className="flex justify-between items-center mb-5 relative z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => handleMonthChange(-1)}
          className="text-gray-400 hover:text-white bg-gray-800/50 p-2 rounded-full hover:bg-gray-700/70 transition"
        >
          ←
        </motion.button>

        <motion.h2
          key={month}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg sm:text-xl font-bold text-white tracking-wide text-center"
        >
          {displayedDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => handleMonthChange(1)}
          className="text-gray-400 hover:text-white bg-gray-800/50 p-2 rounded-full hover:bg-gray-700/70 transition"
        >
          →
        </motion.button>
      </div>

      <div className="grid grid-cols-7 text-[0.7rem] sm:text-[0.8rem] text-gray-400 mb-3 uppercase tracking-wider text-center">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-[0.35rem] sm:gap-2 mt-4 auto-rows-[minmax(60px,1fr)] sm:auto-rows-[minmax(90px,1fr)] md:auto-rows-[minmax(100px,1fr)] relative z-10">
        <AnimatePresence>{renderDays()}</AnimatePresence>
      </div>
    </motion.div>
  );
}
