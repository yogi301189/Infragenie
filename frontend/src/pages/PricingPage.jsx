// src/pages/PricingPage.jsx

import React from "react";

export default function PricingPage() {
  return (
    <div className="bg-[#0f0f1a] text-white min-h-screen">
      {/* Header */}
      <header className="py-12 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h1>
        <p className="text-slate-400 text-lg">
          Simple, transparent pricing. Start free and upgrade anytime.
        </p>
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
        <div className="rounded-2xl border border-blue-500 p-8 bg-[#1e1e2e] shadow-xl scale-105 flex flex-col">
          <h3 className="text-2xl font-semibold mb-4">Pro</h3>
          <p className="text-4xl font-bold mb-6">
            $19<span className="text-lg text-slate-400">/mo</span>
          </p>
          <ul className="text-left space-y-3 mb-8 text-slate-300 flex-1">
            <li>✔ Unlimited prompts</li>
            <li>✔ AWS CLI generator</li>
            <li>✔ Download YAML / Terraform / Dockerfile</li>
            <li>✔ Priority API speed</li>
            <li>✔ Early feature access</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700">
            Upgrade Now
          </button>
        </div>
      </main>
    </div>
  );
}
