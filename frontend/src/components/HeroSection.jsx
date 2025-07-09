import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-slate-900 text-white px-6 py-20 md:flex md:items-center md:justify-between max-w-7xl mx-auto">
      {/* Left: Text Content */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Your <span className="text-blue-500">AI-Powered</span> DevOps Toolkit
        </h1>
        <p className="text-lg text-slate-300">
          Automate, troubleshoot, and optimize your cloud workflows with a single prompt.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">
            Try it Now
          </button>
          <button className="border border-slate-500 px-6 py-3 rounded-xl hover:bg-slate-800">
            See in Action
          </button>
        </div>
      </div>

      {/* Right: Image or Animation */}
      <div className="md:w-1/2 mt-10 md:mt-0">
        <img
          src="/hero-terminal.png" // replace with Lottie or GIF later
          alt="InfraGenie terminal demo"
          className="w-full max-w-md mx-auto rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;
