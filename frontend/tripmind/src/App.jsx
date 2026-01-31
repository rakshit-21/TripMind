import React, { useState } from "react";
import Header from "./components/Header";
import BackgroundEffects from "./components/BackgroundEffects";
import MessageList from "./components/MessageList";
import QuickActions from "./components/QuickActions";
import ChatInput from "./components/ChatInput";
import { generateItinerary } from "./api/generateItinerary";

export default function TravelChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI travel assistant. Tell me about your dream trip — where would you like to go, when, and what's your budget?",
      timestamp: new Date().toISOString(), // ✅ FIX
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(), // ✅ FIX
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const itinerary = await generateItinerary(input);

      const assistantMessage = {
        role: "assistant",
        content: formatItinerary(itinerary),
        timestamp: new Date().toISOString(), // ✅ FIX
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Sorry, I couldn’t generate the itinerary. Please try again.",
          timestamp: new Date().toISOString(), // ✅ FIX
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (text) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <BackgroundEffects />
      <Header />

      <div className="flex-1 overflow-hidden max-w-6xl w-full mx-auto px-4 relative z-10">
        <div className="h-full flex flex-col py-6">
          <MessageList messages={messages} isTyping={isTyping} />

          {messages.length <= 2 && (
            <QuickActions onActionClick={handleQuickAction} />
          )}

          <ChatInput
            input={input}
            setInput={setInput}
            onSend={handleSend}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}

function formatItinerary(data) {
  if (!data || !data.days) {
    return "⚠️ Invalid itinerary received from server.";
  }

  let output = `📍 ${data.destination}\n`;
  output += `🗓️ ${data.total_days} Days\n\n`;

  data.days.forEach((day) => {
    output += `Day ${day.day} – ${day.title}\n`;
    day.activities.forEach((act) => {
      output += `• ${act.time} — ${act.title}\n`;
      output += `  ${act.description}\n`;
    });
    output += "\n";
  });

  return output.trim();
}
