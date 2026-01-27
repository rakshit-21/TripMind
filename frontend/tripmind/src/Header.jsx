import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Star, Download, Globe } from 'lucide-react';

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gray-800/50 backdrop-blur-md shadow-lg border-b border-gray-700/50 relative z-10"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg"
          >
            <Plane className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              TravelGenie AI
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </h1>
            <p className="text-xs text-gray-400">Your Personal Travel Planner</p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5 text-gray-300" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <Globe className="w-5 h-5 text-gray-300" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}