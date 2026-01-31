import React from "react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -6 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start mt-2"
    >
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-gray-700/50 max-w-xs">
        
        {/* Text + Cursor */}
        <div className="flex items-center gap-1 text-sm text-gray-300 mb-2">
          <span>TripMind is typing</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="font-bold"
          >
            |
          </motion.span>
        </div>

        {/* Dots */}
        <div className="flex gap-1">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.div
              key={i}
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 0.6,
                delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className={`w-2 h-2 rounded-full ${
                i === 0
                  ? "bg-purple-500"
                  : i === 1
                  ? "bg-blue-500"
                  : "bg-cyan-500"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
