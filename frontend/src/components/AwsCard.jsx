// components/AwsCard.jsx
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Copy } from "lucide-react";

export default function AwsCard({ prompt, command, explanation, logs }) {
  const [activeTab, setActiveTab] = useState("command");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderContent = () => {
    if (activeTab === "command") return command;
    if (activeTab === "explanation") return explanation;
    if (activeTab === "logs") return logs || "Logs will appear here.";
  };

  return (
    <Card className="bg-[#0f0f1a] border border-slate-700 p-5 rounded-xl shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <img src="/icons/aws-icon.svg" alt="aws" className="h-6 w-6" />
        <p className="text-white font-medium">{prompt}</p>
      </div>
      <div className="flex gap-6 mb-2 text-sm border-b border-slate-700 pb-1">
        {["command", "explanation", "logs"].map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize cursor-pointer ${
              activeTab === tab
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-slate-500"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>
      <CardContent className="bg-[#161622] text-slate-300 text-sm font-mono p-4 rounded-md relative">
        <pre className="whitespace-pre-wrap">{renderContent()}</pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
        >
          <Copy size={16} />
        </button>
        {copied && (
          <span className="absolute top-3 right-10 text-xs text-green-400">
            Copied!
          </span>
        )}
      </CardContent>
      <div className="flex justify-center gap-4 mt-6">
        <img src="/icons/k8s.svg" className="h-6" alt="k8s" />
        <img src="/icons/docker.svg" className="h-6" alt="docker" />
        <img src="/icons/azure.svg" className="h-6" alt="azure" />
      </div>
    </Card>
  );
}
