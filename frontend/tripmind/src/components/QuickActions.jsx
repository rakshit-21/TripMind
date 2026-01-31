import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Sparkles, DollarSign } from "lucide-react";

export default function QuickActions({ onActionClick }) {
  const quickActions = [
    { icon: MapPin, label: "Beach Vacation", gradient: "from-blue-500 to-cyan-500" },
    { icon: Calendar, label: "Weekend Trip", gradient: "from-purple-500 to-pink-500" },
    { icon: Sparkles, label: "Adventure", gradient: "from-orange-500 to-red-500" },
    { icon: DollarSign, label: "Budget Travel", gradient: "from-green-500 to-emerald-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mb-4"
    >
      {/* ❌ p removed → ✅ div used */}
      <div className="text-xs text-gray-500 mb-3 text-center flex items-center justify-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3" />
        </motion.div>

        <span>Quick start:</span>

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3" />
        </motion.div>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        {quickActions.map((action, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              onActionClick(`Plan a ${action.label.toLowerCase()} for me`)
            }
            className={`group flex items-center gap-2 px-5 py-3 bg-gradient-to-r ${action.gradient} rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm text-white font-medium`}
          >
            <motion.div
              whileHover={{ rotate: 12 }}
              transition={{ duration: 0.2 }}
            >
              <action.icon className="w-4 h-4" />
            </motion.div>
            {action.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
