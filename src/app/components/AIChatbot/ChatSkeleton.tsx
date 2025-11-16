import React from 'react';
import MessageSkeleton from './MessageSkeleton';

function ChatSkeleton() {
  return (
    <div className="px-4 pt-10 flex-1 space-y-6 h-full w-full">
      <MessageSkeleton />
      <MessageSkeleton isUser={true} />
      <MessageSkeleton />
    </div>
  );
}

export default ChatSkeleton;