import React from 'react';
import { motion } from 'framer-motion';

export default function MessageBubble({ message, index }) {
  const { role, content, timestamp } = message;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`max-w-2xl rounded-2xl px-4 py-3 ${
          role === 'user'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20'
            : 'bg-gray-800/80 backdrop-blur-sm text-gray-100 shadow-lg border border-gray-700/50'
        }`}
      >
        <p className="text-sm leading-relaxed">{content}</p>
        <span className={`text-xs mt-1 block ${
          role === 'user' ? 'text-blue-200' : 'text-gray-500'
        }`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </motion.div>
    </motion.div>
  );
}

