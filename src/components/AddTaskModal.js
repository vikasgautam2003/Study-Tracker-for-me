// "use client";
// import { useState } from "react";

// export default function AddTaskModal({ onClose, onSave, task = null }) {
//   const [form, setForm] = useState(
//     task || { id: "", name: "", duration: 1, priority: 1 }
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({
//       ...form,
//       id: form.id || String(Date.now()),
//       duration: parseFloat(form.duration),
//       priority: parseInt(form.priority),
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
//       <div className="solid-card w-full max-w-md p-6 rounded-2xl shadow-2xl">
//         <h2 className="text-2xl font-bold mb-4 text-white">
//           {form.id ? "Edit Task" : "Add Task"}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm mb-1 text-gray-300">Task Name</label>
//             <input
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//               className="w-full bg-gray-800/70 text-white border border-gray-700 rounded-lg px-3 py-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm mb-1 text-gray-300">Duration (hours)</label>
//             <input
//               type="number"
//               step="0.5"
//               min="0"
//               value={form.duration}
//               onChange={(e) => setForm({ ...form, duration: e.target.value })}
//               required
//               className="w-full bg-gray-800/70 text-white border border-gray-700 rounded-lg px-3 py-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm mb-1 text-gray-300">Priority (lower = first)</label>
//             <input
//               type="number"
//               step="1"
//               min="1"
//               value={form.priority}
//               onChange={(e) => setForm({ ...form, priority: e.target.value })}
//               required
//               className="w-full bg-gray-800/70 text-white border border-gray-700 rounded-lg px-3 py-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddTaskModal({ onClose, onSave, task = null }) {
  const [form, setForm] = useState(
    task || { id: "", name: "", duration: 1, priority: 1 }
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      id: form.id || String(Date.now()),
      duration: parseFloat(form.duration),
      priority: parseInt(form.priority),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md solid-card p-6 rounded-2xl shadow-2xl border border-gray-700/40
                     bg-gradient-to-br from-[#10151f]/90 via-[#0f1520]/80 to-[#0a0d14]/80
                     backdrop-blur-xl text-gray-100"
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 opacity-60 rounded-t-2xl"></div>

          <div className="flex items-start justify-between mb-5">
            <h2 className="text-2xl font-bold text-white tracking-tight neon-text">
              {form.id ? "Edit Task" : "Add New Task"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-gray-800/40"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Task Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. System Design Revision"
                required
                className="w-full rounded-lg px-3 py-2.5 bg-gray-900/60 border border-gray-700/70 text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none
                           placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Duration (hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                required
                className="w-full rounded-lg px-3 py-2.5 bg-gray-900/60 border border-gray-700/70 text-white
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Priority (lower = first)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                required
                className="w-full rounded-lg px-3 py-2.5 bg-gray-900/60 border border-gray-700/70 text-white
                           focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm
                           bg-gray-700/70 hover:bg-gray-600 text-gray-100 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg font-semibold text-sm text-white
                           bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700
                           hover:from-blue-500 hover:to-indigo-600 shadow-md shadow-blue-900/40
                           transition duration-200 transform hover:scale-[1.03]"
              >
                <i className="fas fa-check mr-1.5"></i> Save Task
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
