import React from "react";

export default function SkeletonBlock({ lines = 5 }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, idx) => (
        <div key={idx} className="h-4 bg-slate-700 rounded w-full" />
      ))}
    </div>
  );
}
