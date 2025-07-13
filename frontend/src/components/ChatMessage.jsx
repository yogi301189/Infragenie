import React from "react";
import { Bot, User } from "lucide-react";

export default function ChatMessage({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-slate-800 text-slate-100 rounded-bl-none"
        }`}
      >
        <div className="flex items-center gap-2">
          {isUser ? <User size={14} /> : <Bot size={14} />}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}
