import React, { useState, useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";

export default function ChatMessage({ role, text, isLast }) {
  const [expanded, setExpanded] = useState(isLast); // only expand the last by default

  const isLong = text.length > 300; // tweak length threshold as needed
  const shouldCollapse = !expanded && isLong;

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-gray-100'}`}>
        <div>
          {shouldCollapse ? `${text.slice(0, 300)}...` : text}
        </div>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-400 mt-2 hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}

