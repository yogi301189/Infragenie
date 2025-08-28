import React, { useState } from "react";

export default function PricingPage() {
  const [billing, setBilling] = useState("monthly"); // monthly | yearly

  return (
    <div className="bg-[#0f0f1a] text-white min-h-screen">
      {/* Header */}
      <header className="py-12 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h1>
        <p className="text-slate-400 text-lg">
          Simple, transparent pricing. Save more with yearly plans.
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 flex justify-center">
          <div className="bg-[#161622] p-1 rounded-xl flex space-x-2">
            <button
              className={`px-6 py-2 rounded-lg ${
                billing === "monthly"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-lg ${
                billing === "yearly"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              onClick={() => setBilling("yearly")}
            >
              Yearly <span className="ml-1 text-green-400">-20%</span>
            </button>
          </div>
        </div>
      </header>

      {/* Pricing Cards */}
      <main className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Free Plan */}
        <div className="rounded-2xl border border-slate-700 p-8 bg-[#161622] flex flex-col">
          <h3 className="text-2xl font-semibold mb-4">Free</h3>
          <p className="text-4xl font-bold mb-6">
            $0<span className="text-lg text-slate-400">/mo</span>
          </p>
          <ul className="text-left space-y-3 mb-8 text-slate-300 flex-1">
            <li>✔ 20 prompts / month</li>
            <li>✔ Kubernetes, Terraform, Dockerfile</li>
            <li>✖ AWS CLI generator</li>
            <li>✖ Downloads</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700">
            Start Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-2xl border border-blue-500 p-8 bg-[#1e1e2e] shadow-xl scale-105 flex flex-col relative">
          {/* Recommended Badge */}
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow-lg">
            Recommended
          </span>

          <h3 className="text-2xl font-semibold mb-4">Pro</h3>
          <p className="text-4xl font-bold mb-6">
            {billing === "monthly" ? "$19" : "$180"}
            <span className="text-lg text-slate-400">
              {billing === "monthly" ? "/mo" : "/yr"}
            </span>
          </p>
          <ul className="text-left space-y-3 mb-8 text-slate-300 flex-1">
            <li>✔ Unlimited prompts</li>
            <li>✔ AWS CLI generator</li>
            <li>✔ Download YAML / Terraform / Dockerfile</li>
            <li>✔ Priority API speed</li>
            <li>✔ Early feature access</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700">
            {billing === "monthly" ? "Upgrade Now" : "Go Yearly & Save 20%"}
          </button>
        </div>
      </main>
    </div>
  );
}
