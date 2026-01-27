import React from 'react';
import { motion } from 'framer-motion';

export default function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-gray-700/50">
        <div className="flex gap-1">
          <motion.div
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-purple-500 rounded-full"
          />
          <motion.div
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.6,
              delay: 0.15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
          <motion.div
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.6,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-cyan-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
