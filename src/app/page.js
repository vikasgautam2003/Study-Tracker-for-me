"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import QuoteCard from "@/components/QuoteCard";
import Calendar from "@/components/Calendar";
import TaskList from "@/components/TaskList";
import StatsPanel from "@/components/StatsPanel";
import AddTaskModal from "@/components/AddTaskModal";
import MotivationModal from "@/components/MotivationModal";
import { loadTasks, saveTasks, loadHistory, saveHistory } from "@/utils/storage";
import { DEFAULT_TASKS, QUOTES } from "@/utils/quotes";
import { getTodayKey } from "@/utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState({});
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    const t = loadTasks() || DEFAULT_TASKS;
    const h = loadHistory();
    setTasks(t);
    setHistory(h);
    const randomQ = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(randomQ);
  }, []);

  const handleSaveTask = (newTask) => {
    const updated = [...tasks];
    const idx = updated.findIndex((t) => t.id === newTask.id);
    if (idx >= 0) updated[idx] = newTask;
    else updated.push(newTask);
    setTasks(updated);
    saveTasks(updated);
  };

  const handleToggleTask = (id, checked) => {
    const key = getTodayKey();
    const newDayHistory = { ...(history[key] || {}), [id]: checked };
    const updatedHistory = { ...history, [key]: newDayHistory };
    saveHistory(updatedHistory);
    setHistory(updatedHistory);
    if (checked) setShowMotivation(true);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0a0c10] via-[#0c111a] to-[#0b0d12] text-gray-200 antialiased selection:bg-blue-600/30 selection:text-white">
      {/* Glowing background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-indigo-700/25 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Desktop: 2-column layout */}
        <div className="hidden lg:grid grid-cols-2 gap-12 items-start">
          {/* LEFT: Calendar */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <Calendar
                tasks={tasks}
                history={history}
                displayedDate={displayedDate}
                setDisplayedDate={setDisplayedDate}
              />
            </div>
          </div>

          {/* RIGHT: Header, Quote, Tasks, Stats */}
          <div className="flex flex-col space-y-8">
            <Header />
            <QuoteCard quote={quote.quote} author={quote.author} />

            <TaskList
              tasks={tasks}
              history={history}
              onToggle={handleToggleTask}
              onEdit={() => setShowAddModal(true)}
            />

            <button
              onClick={() => setShowAddModal(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 
                         hover:from-blue-600 hover:to-indigo-700 text-white font-semibold 
                         py-3 px-6 rounded-xl shadow-lg shadow-blue-900/20 
                         transition duration-200 transform hover:scale-[1.03]"
            >
              <i className="fas fa-plus mr-2"></i>Add New Task
            </button>

            <button
              onClick={() => setShowStatsModal(true)}
              className="w-full bg-gray-800/80 border border-gray-700 text-gray-300 text-sm font-medium py-2 px-4 rounded-lg 
                         flex items-center justify-center gap-2 hover:bg-gray-700/60 transition"
            >
              <i className="fas fa-chart-bar text-blue-400"></i>
              View Stats
            </button>
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="lg:hidden flex flex-col space-y-8">
          <Header />
          <QuoteCard quote={quote.quote} author={quote.author} />
          <Calendar
            tasks={tasks}
            history={history}
            displayedDate={displayedDate}
            setDisplayedDate={setDisplayedDate}
          />

          {/* Add Task below calendar */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 
                       hover:from-blue-600 hover:to-indigo-700 text-white font-semibold 
                       py-3 px-6 rounded-xl shadow-lg shadow-blue-900/20 
                       transition duration-200 transform hover:scale-[1.03]"
          >
            <i className="fas fa-plus mr-2"></i>Add New Task
          </button>

          <TaskList
            tasks={tasks}
            history={history}
            onToggle={handleToggleTask}
            onEdit={() => setShowAddModal(true)}
          />

          {/* Stats in popup button */}
          <button
            onClick={() => setShowStatsModal(true)}
            className="bg-gray-800/80 border border-gray-700 text-gray-300 text-sm font-medium py-2 px-4 rounded-lg 
                       flex items-center justify-center gap-2 hover:bg-gray-700/60 transition"
          >
            <i className="fas fa-chart-line text-blue-400"></i>
            View Stats
          </button>
        </div>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="w-full max-w-md bg-gray-900/90 rounded-2xl p-6 shadow-2xl border border-gray-700/40 relative"
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-5 text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
              <AddTaskModal
                onClose={() => setShowAddModal(false)}
                onSave={handleSaveTask}
              />
            </motion.div>
          </motion.div>
        )}

        {showStatsModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStatsModal(false)}
          >
            <motion.div
              className="w-full max-w-md bg-gray-900/90 rounded-2xl p-6 shadow-2xl border border-gray-700/40 relative"
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowStatsModal(false)}
                className="absolute top-4 right-5 text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-chart-line text-blue-400"></i> Study Stats
              </h2>
              <StatsPanel tasks={tasks} history={history} />
            </motion.div>
          </motion.div>
        )}

        {showMotivation && (
          <MotivationModal onClose={() => setShowMotivation(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
