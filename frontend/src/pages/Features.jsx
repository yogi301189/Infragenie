// src/pages/Features.jsx
import React from "react";
import { Container } from "../components/ui/container";
import { CheckCircle } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "🚀 AI-Powered Infrastructure Generation",
      description:
        "Generate production-ready Kubernetes YAMLs, Terraform scripts, Dockerfiles, and AWS CLI commands with a single prompt.",
    },
    {
      title: "🧠 Chat + Command Modes",
      description:
        "Use Command mode for precise code + explanations or Chat mode to interact naturally with an AI DevOps assistant.",
    },
    {
      title: "🛠 Error Check & Correction",
      description:
        "Paste broken YAML, HCL, Dockerfile, or Python and get AI-corrected code with inline explanations.",
    },
    {
      title: "⚡ Instant UI Feedback",
      description:
        "Tabbed interface for Code and Explanation with one-click Copy & Download. Built with Tailwind, React, FastAPI, and OpenAI.",
    },
    {
      title: "🔒 Secure & Fast",
      description:
        "FastAPI + OpenAI backend, hosted on Render. Frontend deployed on Vercel for blazing-fast performance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      <Container className="py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">🚀 Features</h1>
        <div className="space-y-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-[#0f0f1a] p-6 rounded-xl border border-slate-700 shadow-md"
            >
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-green-400" />
                {feature.title}
              </h2>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
