import React from "react";
import ChatMessages from "./ChatMessages";
import { motion } from "framer-motion";
import Image from "next/image";

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
function LargeScreenWindow({
  closeWindow,
  messages,
  isLoading,
  handleSendMessage,
}: ChatMessagesProps) {
  return (
    <div className="h-[75%] w-[30%] fixed right-4 rounded-xl z-[200] bottom-[100px] overflow-hidden">
      <motion.div
        key="chat-modal"
        initial={{ y: 300, x: 180, scale: 0 }}
        animate={{ y: 0, x: 0, scale: 1 }}
        exit={{ y: 300, x: 180, scale: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full h-full flex justify-between flex-col relative dark:bg-black bg-white"
      >
        <Image
        src={
          "/top_bg_dark.svg"
        }
        alt="grid bg"
        width={400}
        height={400}
        className="hidden dark:block absolute top-0 left-0 w-full h-full object-cover z-0"
      />
        <Image
        src={
          "/top_bg_light.svg"
        }
        alt="grid bg"
        width={400}
        height={400}
        className="block dark:hidden absolute top-0 left-0 w-full h-full object-cover z-0"
      />
        <ChatMessages
          closeWindow={closeWindow}
          messages={messages}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
        />
      </motion.div>
    </div>
  );
}

export default LargeScreenWindow;
