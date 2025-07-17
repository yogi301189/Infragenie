// src/components/ChatSection.jsx
import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatSection({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto px-4 py-3 h-[60vh] max-h-[calc(100vh-250px)] rounded-lg bg-zinc-900 border border-zinc-700">
      {messages.map((msg, index) => (
        <ChatMessage
    key={index}
    role={msg.role}
    text={msg.text}
    isLast={index === messages.length - 1}
  />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
