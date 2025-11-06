// "use client";
// import { useEffect, useState } from "react";
// import { QUOTES } from "@/utils/quotes";

// export default function MotivationModal({ onClose }) {
//   const [quote, setQuote] = useState(null);

//   useEffect(() => {
//     const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
//     setQuote(q);
//     const timer = setTimeout(onClose, 4000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   if (!quote) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
//       <div className="motivation-content relative max-w-md w-[92%] md:w-[520px] px-6 py-6">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-5 text-gray-400 hover:text-gray-100"
//         >
//           <i className="fas fa-times"></i>
//         </button>
//         <p className="text-xl md:text-2xl font-semibold text-white neon-text text-center mb-2">
//           "{quote.quote}"
//         </p>
//         <p className="text-sm text-blue-300 text-center">— {quote.author}</p>
//       </div>
//     </div>
//   );
// }





// "use client";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { QUOTES } from "@/utils/quotes";

// export default function MotivationModal({ onClose }) {
//   const [quote, setQuote] = useState(null);

//   useEffect(() => {
//     const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
//     setQuote(q);
//     const timer = setTimeout(onClose, 4000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   if (!quote) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         key="motivation-backdrop"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.3 }}
//         className="fixed inset-0 bg-black/70 backdrop-blur-md z-[80] flex items-center justify-center"
//         onClick={onClose}
//       >
//         <motion.div
//           key="motivation-content"
//           initial={{ opacity: 0, scale: 0.9, y: 15 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.9, y: 10 }}
//           transition={{ duration: 0.25, ease: 'easeOut' }}
//           onClick={(e) => e.stopPropagation()}
//           className="relative max-w-md w-[90%] md:w-[520px] px-8 py-7 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
//                      bg-gradient-to-br from-[#0c1220]/95 via-[#0b1321]/85 to-[#0a101a]/90 border border-blue-500/20
//                      backdrop-blur-2xl text-center"
//         >
//           <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 opacity-60 rounded-t-2xl"></div>

//           <button
//             onClick={onClose}
//             className="absolute top-4 right-5 text-gray-400 hover:text-gray-200 transition-colors"
//           >
//             <i className="fas fa-times text-lg"></i>
//           </button>

//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1, duration: 0.3 }}
//             className="text-xl md:text-2xl font-semibold text-white neon-text leading-snug"
//           >
//             “{quote.quote}”
//           </motion.p>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.4 }}
//             className="text-sm text-blue-300 mt-3 font-medium tracking-wide"
//           >
//             — {quote.author}
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, width: 0 }}
//             animate={{ opacity: 1, width: "60%" }}
//             transition={{ delay: 0.6, duration: 1 }}
//             className="mx-auto mt-4 h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 rounded-full"
//           ></motion.div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }





"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function MotivationModal({ onClose }) {
  const [index, setIndex] = useState(0);
  const messages = [
    "You showed up today — that’s where most people stop.",
    "You’re now 1% ahead of who you were yesterday.",
    "Every small step is rewriting the story of your life.",
    "This discipline you feel right now — it’s your future self thanking you.",
    "Remember this feeling. You built it. You earned it.",
    "You’re not chasing perfection — you’re chasing growth. And you’re winning.",
  ];

  useEffect(() => {
    // ✨ gentle confetti + sound
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.7 },
      colors: ["#60a5fa", "#a78bfa", "#fbbf24", "#34d399"],
    });
    const audio = new Audio("/sounds/soft_chime.mp3");
    audio.volume = 0.10;
    audio.play().catch(() => {});

    // ⏳ slideshow flow
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 3000);

    const timer = setTimeout(onClose, messages.length * 3000 + 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="motivation-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        onClick={onClose}
        className="fixed inset-0 bg-gradient-to-b from-black/90 via-[#0a0d13]/95 to-black/90
                   backdrop-blur-md flex items-center justify-center z-[999]"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative max-w-2xl w-[90%] px-8 py-12 text-center rounded-3xl
                     bg-gradient-to-b from-[#0d1321]/95 via-[#0f172a]/90 to-[#0a101a]/95
                     border border-blue-400/20 shadow-[0_0_40px_rgba(59,130,246,0.3)]
                     text-white overflow-hidden"
        >
          {/* ethereal glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.25),transparent_80%)]"></div>

          {/* floating aura ring */}
          <motion.div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 border-[1.5px] rounded-full border-blue-400/40"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />

          {/* header text */}
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold mb-10 text-blue-300 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]"
          >
            Becoming. Stronger. Every. Day.
          </motion.h2>

          {/* slideshow quote section */}
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-xl sm:text-2xl font-semibold text-gray-100 italic leading-relaxed"
            >
              “{messages[index]}”
            </motion.p>
          </AnimatePresence>

          {/* glowing progress bar */}
          <motion.div
            key={`bar-${index}`}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, ease: "easeOut" }}
            className="mt-10 h-[3px] bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          ></motion.div>

          {/* gentle flare at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-blue-500/10 to-transparent blur-[50px]"></div>

          {/* floating emojis for emotional pulse */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl select-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, -80 - Math.random() * 60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {["🌙", "✨", "🔥", "💫", "🌻"][Math.floor(Math.random() * 5)]}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
