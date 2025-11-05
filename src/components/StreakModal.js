"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function StreakModal({ streak, onClose }) {
  return (
    <AnimatePresence>
      {streak > 0 && (
        <motion.div
          key="streak-modal"
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={onClose}
        >
          {/* 🔥 Glowing radial background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-700/20 via-red-600/15 to-transparent blur-[120px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />

          {/* ⚡ Energy pulse ring */}
          <motion.div
            className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full border-4 border-orange-500/40"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* 🎉 Main Card */}
          <motion.div
            initial={{ scale: 0.6, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 8 }}
            className="relative bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-950/90
                       px-8 sm:px-12 py-8 sm:py-10 rounded-3xl shadow-2xl border border-orange-400/40 
                       text-center max-w-md mx-4 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.7, rotate: -10 }}
              animate={{ scale: [1.2, 1], rotate: [10, 0] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl sm:text-6xl mb-3"
            >
              🔥
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-300 mb-3 drop-shadow-[0_0_15px_rgba(255,140,0,0.4)]">
              Day {streak} Study Streak!
            </h2>

            <p className="text-gray-300 text-sm sm:text-base italic mb-4">
              “One step closer to mastery — consistency beats motivation!”
            </p>

            {/* Glow bar */}
            <motion.div
              className="h-[3px] w-full bg-gradient-to-r from-orange-400 via-yellow-300 to-red-400 rounded-full mb-5 shadow-[0_0_20px_rgba(255,200,0,0.4)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold
                         shadow-lg hover:shadow-orange-500/40 transition-all"
            >
              Keep the fire going 🚀
            </motion.button>
          </motion.div>

          {/* 🎊 Floating confetti emojis */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl sm:text-3xl select-none"
              initial={{
                x: Math.random() * window.innerWidth - window.innerWidth / 2,
                y: -50,
                opacity: 1,
                rotate: Math.random() * 180,
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                rotate: [0, Math.random() * 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                delay: Math.random() * 1,
                repeat: Infinity,
              }}
            >
              {["🔥", "📚", "💪", "✨", "🚀"][Math.floor(Math.random() * 5)]}
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
