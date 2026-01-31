import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatInput({ input, setInput, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      if (input.trim()) {
        onSend();
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ borderColor: "rgba(168, 85, 247, 0.5)" }}
        className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700/50 p-2 transition-colors"
      >
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}   
            placeholder="Describe your dream trip..."
            className="flex-1 resize-none border-0 outline-none px-3 py-2 text-sm max-h-32 rounded-lg bg-transparent text-gray-100 placeholder-gray-500"
            rows="1"
            style={{ minHeight: "40px" }}
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSend}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-gray-600 text-center mt-2"
      >
        ✨ Powered by AI • Your data is secure 🔒
      </motion.p>
    </>
  );
}
