import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`px-4 py-2 rounded bg-slate-800 text-white border border-slate-600 ${className}`}
      {...props}
    />
  );
}
