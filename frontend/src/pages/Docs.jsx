// src/pages/Docs.jsx
import React from "react";
import { Button } from "../components/ui/button";
import { Container } from "../components/ui/container";
import { Link } from "react-router-dom";
import ErrorCheckCard from "../components/ErrorCheckCard"; // ✅ Import

export default function Docs() {
  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border-b border-slate-800">
        <Container className="flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2 text-lg font-semibold">
            <img src="/logo.svg" alt="logo" className="h-8 w-8" /> Infragenie
          </a>
          <nav className="hidden md:flex items-center gap-6 text-slate-300">
            <a href="/#features" className="hover:text-white transition">Features</a>
            <a href="/docs" className="text-white border-b border-white">Docs</a>
            <a href="https://github.com/yogi301189/infragenie" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          </nav>
          <Button asChild className="ml-4 hidden md:inline-flex">
            <a href="/#prompt-section">Try it Now</a>
          </Button>
        </Container>
      </header>

      <main className="py-20">
        <Container className="space-y-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-white">Documentation</h1>
          <p className="text-slate-400">
            This section provides guidelines on how to use InfraGenie. Start by entering a prompt like:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>“Create an NGINX Deployment with 3 replicas”</li>
            <li>“Generate a Terraform script to create an S3 bucket”</li>
            <li>“Build a Dockerfile for a Flask app”</li>
          </ul>

          <div>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">Features</h2>
            <p className="text-slate-400 mb-4">The AI can generate:</p>
            <ul className="list-inside list-check text-slate-300">
              <li>Kubernetes YAML</li>
              <li>Terraform Scripts</li>
              <li>Dockerfiles</li>
              <li>AWS CLI commands</li>
            </ul>
          </div>

          <Button size="lg">
            <a href="/#prompt-section">Try it Now</a>
          </Button>

          {/* ✅ Embed the Error Checker */}
          <div className="pt-16 border-t border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">🛠 Try Error Check</h2>
            <ErrorCheckCard />
          </div>
        </Container>
      </main>

      <footer className="border-t border-slate-700 py-8 bg-slate-900 text-slate-400 text-center text-sm">
        <Container>
          <p>© {new Date().getFullYear()} Infragenie. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}
