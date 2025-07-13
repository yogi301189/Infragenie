import React from "react";
import { Bot, User } from "lucide-react"; // Optional icons

export default function ChatMessage({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-slate-800 text-slate-100 rounded-bl-none"
        }`}
      >
        <div className="flex items-start gap-2">
          {!isUser && <Bot size={14} className="mt-[2px] text-slate-400" />}
          {isUser && <User size={14} className="mt-[2px] text-indigo-300" />}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}
