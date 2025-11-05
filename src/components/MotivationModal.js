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





"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUOTES } from "@/utils/quotes";

export default function MotivationModal({ onClose }) {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(q);
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!quote) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="motivation-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[80] flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          key="motivation-content"
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-md w-[90%] md:w-[520px] px-8 py-7 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                     bg-gradient-to-br from-[#0c1220]/95 via-[#0b1321]/85 to-[#0a101a]/90 border border-blue-500/20
                     backdrop-blur-2xl text-center"
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 opacity-60 rounded-t-2xl"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <i className="fas fa-times text-lg"></i>
          </button>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-xl md:text-2xl font-semibold text-white neon-text leading-snug"
          >
            “{quote.quote}”
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm text-blue-300 mt-3 font-medium tracking-wide"
          >
            — {quote.author}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "60%" }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mx-auto mt-4 h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 rounded-full"
          ></motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
