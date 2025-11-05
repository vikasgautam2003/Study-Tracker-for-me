// "use client";
// import { useEffect, useState } from "react";
// import { getTodayKey } from "@/utils/helpers";

// export default function TaskList({ tasks, history, onToggle, onEdit }) {
//   const todayKey = getTodayKey();
//   const todayHistory = history[todayKey] || {};
//   const [sortedTasks, setSortedTasks] = useState([]);

//   useEffect(() => {
//     setSortedTasks([...tasks].sort((a, b) => a.priority - b.priority));
//   }, [tasks]);

//   if (sortedTasks.length === 0) {
//     return (
//       <div className="solid-card p-6 rounded-2xl text-center text-gray-400">
//         No tasks added. Click “Add New Task” to get started.
//       </div>
//     );
//   }

//   return (
//     <div className="solid-card p-5 rounded-2xl shadow-xl">
//       <h2 className="text-2xl font-bold mb-4 text-white">Today's Tasks</h2>
//       <ul className="space-y-3">
//         {sortedTasks.map((task) => {
//           const isChecked = !!todayHistory[task.id];
//           return (
//             <li
//               key={task.id}
//               className="solid-card p-4 rounded-xl shadow-md flex items-center justify-between border border-gray-700/40 task-item"
//             >
//               <div className="flex items-center">
//                 <input
//                   id={task.id}
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={(e) => onToggle(task.id, e.target.checked)}
//                   className="task-checkbox h-5 w-5 bg-gray-800 border-gray-600 focus:ring-blue-500"
//                 />
//                 <label htmlFor={task.id} className="ml-4 cursor-pointer select-none">
//                   <span className="task-name font-medium text-lg text-white">{task.name}</span>
//                   <span className="block text-sm text-gray-400">
//                     {task.duration} {task.duration === 1 ? "hr" : "hrs"}
//                   </span>
//                 </label>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => onEdit(task)}
//                   className="text-gray-500 hover:text-blue-400 transition duration-200 p-1"
//                 >
//                   <i className="fas fa-pencil-alt"></i>
//                 </button>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }




"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTodayKey } from "@/utils/helpers";

export default function TaskList({ tasks, history, onToggle, onEdit }) {
  const todayKey = getTodayKey();
  const todayHistory = history[todayKey] || {};
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    setSortedTasks([...tasks].sort((a, b) => a.priority - b.priority));
  }, [tasks]);

  if (sortedTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="solid-card p-8 rounded-2xl text-center text-gray-400 bg-gradient-to-br from-[#0e121b]/90 via-[#0b0f18]/80 to-[#080b12]/90 backdrop-blur-lg border border-gray-700/50 shadow-lg"
      >
        No tasks added. <span className="text-blue-400 font-semibold">Click “Add New Task”</span> to begin crushing your goals.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative solid-card p-6 rounded-2xl shadow-xl border border-gray-700/40 bg-gradient-to-br from-[#0d121d]/90 via-[#0b101a]/85 to-[#0a0d14]/90 backdrop-blur-xl"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 opacity-60 rounded-t-2xl"></div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-extrabold text-white tracking-tight neon-text">Today's Tasks</h2>
        <i className="fas fa-list-check text-blue-400 text-xl"></i>
      </div>

      <ul className="space-y-3">
        <AnimatePresence>
          {sortedTasks.map((task, index) => {
            const isChecked = !!todayHistory[task.id];
            return (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`group p-4 rounded-xl flex items-center justify-between 
                            border border-gray-700/40 shadow-md transition-all duration-200
                            bg-gradient-to-br from-[#101621]/90 via-[#0c111b]/80 to-[#0a0d14]/90
                            hover:border-blue-400/40 hover:shadow-[0_0_12px_rgba(59,130,246,0.25)]
                            ${isChecked ? "opacity-70" : "opacity-100"}`}
              >
                <div className="flex items-center">
                  <motion.input
                    id={task.id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => onToggle(task.id, e.target.checked)}
                    whileTap={{ scale: 0.8 }}
                    className={`h-5 w-5 cursor-pointer rounded-full border-2 transition-all duration-200 
                               ${isChecked ? "bg-green-500 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-800 border-gray-600"}`}
                  />
                  <label htmlFor={task.id} className="ml-4 cursor-pointer select-none">
                    <span
                      className={`task-name font-semibold text-lg transition-colors duration-200 ${
                        isChecked ? "text-gray-400 line-through" : "text-white"
                      }`}
                    >
                      {task.name}
                    </span>
                    <span className="block text-sm text-gray-400">
                      {task.duration} {task.duration === 1 ? "hr" : "hrs"}
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => onEdit(task)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-500 hover:text-blue-400 transition-colors duration-200"
                  >
                    <i className="fas fa-pen"></i>
                  </motion.button>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
