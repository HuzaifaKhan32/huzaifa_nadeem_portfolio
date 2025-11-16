"use client";
import { useEffect, useState } from "react";
import { Bot } from "lucide-react";
import React from "react";
import MobileChatWindow from "./MobileChatWindow";
import { AnimatePresence } from "framer-motion";
import LargeScreenWindow from "./LargeScreenWindow";
import { useMediaQuery } from "@/app/hooks/use-media-query";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
};

function ChatIcon() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (messages.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages([
          {
            id: String(Date.now()),
            text: "Hi, I am your AI assistant. Ask me anything about Huzaifa Nadeem.",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        setIsLoading(false);
      }, 1500);
    }
  }, [messages.length]);

  const handleSendMessage = async (prompt: string) => {
    const userInput: Message = {
      id: String(Date.now()),
      text: prompt,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userInput]);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        // FIX 2: Added headers for sending JSON
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput.text }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      const data = await response.json();
      const botMessage: Message = {
        id: String(Date.now()),
        text:
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't process that request.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: String(Date.now()),
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };
  
  // FIX 1: Corrected the props object with a real function and commas
  const chatProps = {
    closeWindow: () => setIsOpen(false),
    messages,
    isLoading,
    handleSendMessage,
  };

  return (
    <>
      <button
        className="flex justify-center items-center w-14 h-14 bg-primary hover:bg-[#4321f0] cursor-pointer rounded-full fixed bottom-7 right-7 z-[99]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot size={36} className="text-white"/>
      </button>
      <AnimatePresence mode="wait">
        {isOpen &&
          (isDesktop ? (
            <LargeScreenWindow key="desktop-chat" {...chatProps} />
          ) : (
            <MobileChatWindow key="mobile-chat" {...chatProps} />
          ))}
      </AnimatePresence>
    </>
  );
}

export default ChatIcon;