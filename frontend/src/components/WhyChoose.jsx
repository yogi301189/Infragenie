import React from "react";
import { Zap, Brain, Terminal } from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-indigo-400" />,
      title: "Instant Infra Commands",
      description:
        "Generate one-liner infrastructure commands instantly for AWS, Kubernetes, and Terraform — no clutter, just code.",
    },
    {
      icon: <Brain className="w-6 h-6 text-indigo-400" />,
      title: "Powered by GPT-4",
      description:
        "Harness the precision and intelligence of OpenAI's GPT-4 to generate reliable and production-friendly infra snippets.",
    },
    {
      icon: <Terminal className="w-6 h-6 text-indigo-400" />,
      title: "Built for Cloud Engineers",
      description:
        "InfraGenie is minimal, fast, and tailored to DevOps professionals who value speed, clarity, and performance.",
    },
  ];

  return (
    <section id="why-choose" className="py-20 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose InfraGenie?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
