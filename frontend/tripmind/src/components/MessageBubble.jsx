import React from "react";
import { motion } from "framer-motion";
import TypingText from "./TypingText";

export default function MessageBubble({ message, index }) {
  const { role, content, timestamp } = message;
  const isAssistant = role === "assistant";

  const timeString = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`max-w-2xl rounded-2xl px-4 py-3 ${
          isAssistant
            ? "bg-gray-800/80 backdrop-blur-sm text-gray-100 shadow-lg border border-gray-700/50"
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20"
        }`}
      >
        {/* MESSAGE CONTENT */}
        {isAssistant ? (
          <TypingText text={content} />
        ) : (
          <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {content}
          </pre>
        )}

        {/* TIMESTAMP */}
        <span
          className={`text-xs mt-1 block ${
            isAssistant ? "text-gray-500" : "text-blue-200"
          }`}
        >
          {timeString}
        </span>
      </motion.div>
    </motion.div>
  );
}
