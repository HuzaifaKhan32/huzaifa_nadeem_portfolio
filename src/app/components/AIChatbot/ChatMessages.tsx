"use client";
import { ChevronDown, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import TypingIndicator from "./TypingIndicator";
import ChatSkeleton from "./ChatSkeleton";
import { motion, AnimatePresence } from "framer-motion"; // Use AnimatePresence for better animations

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
};

interface ChatMessagesProps {
  closeWindow: () => void;
  messages: Message[];
  isLoading: boolean;
  handleSendMessage: (prompt: string) => Promise<void>;
}

function ChatMessages({
  closeWindow,
  messages,
  isLoading,
  handleSendMessage,
}: ChatMessagesProps) {
  const [message, setMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  // Renamed the ref to be more descriptive
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = message.trim();
    if (!prompt) return;

    setMessage("");
    setIsTyping(true);
    await handleSendMessage(prompt);
    setIsTyping(false);
  };

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between flex-1 z-50 relative">
      {/* Chat Header */}
      <div className="relative flex justify-between items-center px-5 py-4 md:py-3 bg-[#6b46c1] ">
        <div className="flex flex-col text-white">
          <h2 className="font-bold text-xl">AI Assistant</h2>
          <span className="tracking-wide text-xs">Ask me about Huzaifa</span>
        </div>
        <ChevronDown
          onClick={closeWindow}
          className="text-white p-2 rounded-full w-10 h-10 hover:bg-[#261386] active:bg-[#261386] hoverEffect cursor-pointer"
        />
      </div>
      {/* Chat Messages */}
      <div className="px-4 pt-10 md:pt-5 flex-1 space-y-4 h-full w-full overflow-y-auto no-scrollbar">
        {isLoading ? (
          <ChatSkeleton />
        ) : (
          <>
            <AnimatePresence>
              {messages?.map((msg) => (
                <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex ${ msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p className={`${msg.sender === "user" ? "bg-[#6b46c1] rounded-tr-none" : "dark:bg-black bg-[#333333] dark:border border-[#3b4dc2] rounded-tl-none"} rounded-xl max-w-[75%] px-4 py-2 text-white`}>
                    {msg.text}
                    {msg.timestamp && (
                      <div className="text-xs opacity-60 mt-1">{msg.timestamp}</div>
                    )}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && <TypingIndicator />}
            <div ref={scrollRef} />
          </>
        )}
      </div>

      {/* Chat Footer */}
      <div className="w-full p-4 md:px-2 border-t mt-2">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 items-center">
            <TextareaAutosize
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleEnterKey}
              placeholder="Ask me about Huzaifa&apos;s work..."
              className="flex-1 bg-input dark:text-white border border-[#3b4dc2] focus:ring-[#35439A]/70 focus:ring-2 dark:bg-black bg-transparent rounded-lg px-2 py-2 outline-none resize-none no-scrollbar"
              maxRows={3}
            />
            <button
              type="submit"
              // FIX 4: Removed the redundant onClick handler
              disabled={!message.trim() || isTyping}
              className="bg-[#6b46c1] hover:bg-[#6b46c1]/90 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer disabled:opacity-70"
            >
              <Send className="w-6 h-6 text-white"/>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatMessages;