"use client";
import { motion } from "framer-motion";

export default function Header() {
  const today = new Date();
  const formatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative text-center mb-12 select-none"
    >
      <div className="absolute inset-x-0 -top-8 flex justify-center">
        <div className="w-32 h-32 bg-blue-500/20 blur-[100px] rounded-full"></div>
      </div>
      <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight neon-text drop-shadow-[0_0_25px_rgba(59,130,246,0.25)]">
        Daily Study Tracker
      </h1>
      <p className="mt-3 text-lg md:text-xl text-gray-400 font-medium">
        {formatted}
      </p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "6rem" }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-4 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.4)]"
      ></motion.div>
    </motion.header>
  );
}
