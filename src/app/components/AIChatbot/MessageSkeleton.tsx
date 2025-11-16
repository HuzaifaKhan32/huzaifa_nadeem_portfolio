import React from 'react';

function MessageSkeleton({ isUser = false }) {
  const alignment = isUser ? 'items-end' : 'items-start';
  const bubbleColor = isUser ? 'bg-[#3e51ce]/50' : 'bg-black/50';

  return (
    <div className={`flex flex-col w-full animate-pulse ${alignment}`}>
      <div className={`w-3/4 md:w-1/2 rounded-lg p-3 ${bubbleColor}`}>
        <div className={`h-4 ${isUser ? "bg-[#3e51ce]" : "bg-black"} rounded w-5/6 mb-2`}></div>
        <div className={`h-4 ${isUser ? "bg-[#3e51ce]" : "bg-black"} rounded w-full`}></div>
      </div>
    </div>
  );
}

export default MessageSkeleton;