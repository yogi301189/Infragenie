// SeeInActionModal.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const samplePrompt = "Generate a Kubernetes deployment for nginx";
const sampleCode = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80`;

const sampleExplanation = "This deployment defines 3 replicas of an nginx container, each listening on port 80. Useful for load balancing and high availability.";

export default function SeeInActionModal({ open, onClose }) {
  const [typedPrompt, setTypedPrompt] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (open) {
      setTypedPrompt("");
      setShowLoading(false);
      setShowResult(false);

      let i = 0;
      const typingInterval = setInterval(() => {
        setTypedPrompt(samplePrompt.slice(0, i + 1));
        i++;
        if (i === samplePrompt.length) {
          clearInterval(typingInterval);
          setTimeout(() => setShowLoading(true), 500);
          setTimeout(() => setShowResult(true), 2000);
        }
      }, 50);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-black border border-white/10 rounded-2xl shadow-xl max-w-2xl w-full relative p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">🚀 See In Action</h2>

        <div className="bg-slate-900 p-4 rounded-md border border-white/10 mb-4">
          <p className="text-sm text-slate-400">Prompt:</p>
          <pre className="whitespace-pre-wrap text-base text-green-300 font-mono">{typedPrompt}</pre>
        </div>

        {showLoading && !showResult && (
          <div className="text-center text-sm text-slate-400 animate-pulse mb-4">Generating response...</div>
        )}

        {showResult && (
          <>
            <div className="bg-slate-900 p-4 rounded-md border border-white/10 mb-4">
              <p className="text-sm text-slate-400 mb-1">Code:</p>
              <pre className="whitespace-pre-wrap text-sm text-blue-300 font-mono">{sampleCode}</pre>
            </div>
            <div className="bg-slate-900 p-4 rounded-md border border-white/10">
              <p className="text-sm text-slate-400 mb-1">Explanation:</p>
              <p className="text-sm text-slate-300 leading-relaxed">{sampleExplanation}</p>
            </div>
          </>
        )}

        <div className="text-center mt-6">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
