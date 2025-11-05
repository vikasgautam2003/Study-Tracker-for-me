"use client";
import { motion } from "framer-motion";

export default function QuoteCard({ quote, author }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mb-10 text-center max-w-3xl mx-auto p-6 rounded-2xl shadow-lg border border-gray-700/40
                 bg-gradient-to-br from-[#0d121d]/90 via-[#0b101a]/85 to-[#0a0d14]/90 backdrop-blur-xl"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 opacity-60 rounded-t-2xl"></div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-lg md:text-xl font-medium text-gray-200 italic leading-relaxed neon-text"
      >
        “{quote}”
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-sm text-blue-300 mt-3 font-medium tracking-wide"
      >
        — {author}
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "50%" }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mx-auto mt-4 h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 rounded-full"
      ></motion.div>
    </motion.div>
  );
}
