// src/LandingPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Container } from "./components/ui/container";
import ErrorCheckCard from "./components/ErrorCheckCard";
import HowToInstall from "./components/HowToInstallCard";
import Features from "./pages/Features";
import PromptForm from "./components/PromptForm";
import { Menu, X } from "lucide-react";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#0a0a12] text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#0a0a12]/80 backdrop-blur-lg z-50 border-b border-slate-800">
        <Container className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="text-xl font-bold tracking-wide">
            Infra<span className="text-green-400">Genie</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="hover:text-green-400 transition">Features</a>
            <a href="#docs" className="hover:text-green-400 transition">Docs</a>
            <Button
              className="rounded-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white px-5 py-2 shadow-md hover:opacity-90"
            >
              Signup / Signin
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0f0f1a] border-t border-slate-800">
            <div className="flex flex-col p-4 space-y-4">
              <a href="#features" className="hover:text-green-400">Features</a>
              <a href="#docs" className="hover:text-green-400">Docs</a>
              <Button className="rounded-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white px-5 py-2 shadow-md">
                Signup / Signin
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Automate Cloud Infra with{" "}
              <span className="text-green-400">AI Power</span>
            </h1>
            <p className="text-lg text-slate-300 mb-6">
              Generate Kubernetes, Terraform, Dockerfiles, and AWS CLI commands instantly.
              InfraGenie saves hours of DevOps work with one prompt.
            </p>
            <div className="flex space-x-4">
              <Button className="rounded-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 shadow-lg hover:opacity-90">
                See in Action
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border border-green-400 text-green-400 hover:bg-green-400/10 px-6 py-3"
              >
                Docs
              </Button>
            </div>
          </div>

          {/* Right - Mock Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#0f0f1a] border border-slate-700 rounded-xl shadow-lg p-6 font-mono text-sm text-green-300"
          >
            <p className="text-slate-400 mb-2"># Terraform Example</p>
            <pre>{`resource "aws_s3_bucket" "example" {
  bucket = "my-ai-bucket"
  acl    = "private"
}`}</pre>
          </motion.div>
        </Container>
      </section>

      {/* Error Check Section */}
      <ErrorCheckCard />

      {/* How to Install Section */}
      <HowToInstall />

      {/* Features */}
      <section id="features">
        <Features />
      </section>

      {/* Playground Section */}
      <section id="playground" className="py-20 bg-[#0f0f1a] border-t border-slate-800">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">⚡ Try InfraGenie</h2>
          <p className="text-slate-400 mb-6 text-center">
            Enter a prompt and generate infra code instantly.
          </p>
          <PromptForm />
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Loved by DevOps Teams</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "InfraGenie saved me hours setting up Kubernetes configs.",
                author: "DevOps Engineer",
              },
              {
                quote: "As a Cloud Architect, I use it daily for Terraform and AWS CLI generation.",
                author: "Cloud Architect",
              },
              {
                quote: "Perfect tool for our startup — accelerated deployments massively.",
                author: "Startup Founder",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-[#0f0f1a] p-6 rounded-xl border border-slate-700 shadow-md"
              >
                <p className="italic text-slate-300 mb-4">“{t.quote}”</p>
                <p className="text-green-400 font-semibold">{t.author}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-blue-500/10 border-t border-slate-800">
        <Container className="text-center">
          <h2 className="text-4xl font-bold mb-6">🚀 Get Started with InfraGenie</h2>
          <p className="text-slate-400 mb-8">
            Boost your DevOps workflow with AI-powered infra generation.
          </p>
          <Button className="rounded-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 shadow-lg hover:opacity-90">
            Signup Now
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0a0a12] border-t border-slate-800">
        <Container className="flex flex-col md:flex-row justify-between items-center text-slate-400">
          <p>© {new Date().getFullYear()} InfraGenie. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#features" className="hover:text-green-400">Features</a>
            <a href="#docs" className="hover:text-green-400">Docs</a>
            <a href="https://github.com" className="hover:text-green-400">GitHub</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
