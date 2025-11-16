import React from "react";
import TopBackground from "../Hero/TopBackground";
import ChatMessages from "./ChatMessages";
import { motion } from "framer-motion";

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

function MobileChatWindow({
  closeWindow,
  messages,
  isLoading,
  handleSendMessage,
}: ChatMessagesProps) {
  return (
    <div
      key="chat-modal-container"
      className="h-full w-full fixed dark:bg-black bg-white top-0 left-0 z-[200] overflow-hidden"
    >
      <TopBackground />
      <motion.div
        initial={{y: 250, x: 200, scale: 0}}
        animate={{y: 0, x: 0, scale: 1}}
        exit={{y: 250, x: 200, scale: 0}} 
        transition={{ duration: 0.4, ease: [0.36, 0.66, 0.04, 1] }} // A smoother ease
        className="w-full h-full flex justify-between flex-col relative"
      >
        <ChatMessages closeWindow={closeWindow}
          messages={messages}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage} />
      </motion.div>
    </div>
  );
}

export default MobileChatWindow;
