import React from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "./components/ui/container";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a12] text-white scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border-b border-slate-800">
        <Container className="flex items-center justify-between py-4">
          <a href="#hero" className="flex items-center gap-2 text-lg font-semibold">
            <img src="/logo.svg" alt="logo" className="h-8 w-8" /> Infragenie
          </a>
          <nav className="hidden md:flex items-center gap-6 text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="/docs" className="hover:text-white transition">Docs</a>
            <a href="https://github.com/yogi301189/infragenie" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition">GitHub</a>
          </nav>
          <Button asChild className="ml-4 hidden md:inline-flex">
            <a href="#get-started" className="gap-2">Try it Now</a>
          </Button>
        </Container>
      </header>

      {/* Hero Section */}
      <section id="hero" className="flex-1 py-24 md:py-32">
        <Container className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold"
            >
              Your AI-Powered <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                DevOps Toolkit
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-slate-400 max-w-lg"
            >
              Automate, troubleshoot, and optimize your cloud workflows with a single prompt.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Try it Now</Button>
              <Button variant="outline" className="border-slate-600 text-white">See in Action</Button>
            </div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Card className="bg-[#0f0f1a] border border-slate-700 p-4">
              <div className="flex items-center gap-3 mb-4">
                <img src="/icons/aws-icon.svg" alt="aws" className="h-6 w-6" />
                <p className="text-white font-medium">Create an S3 bucket</p>
              </div>
              <div className="flex gap-6 mb-2 text-sm border-b border-slate-700 pb-1">
                <span className="text-indigo-400 border-b-2 border-indigo-400">Commands</span>
                <span className="text-slate-500">Explanation</span>
                <span className="text-slate-500">Logs</span>
              </div>
              <CardContent className="bg-[#161622] text-slate-300 text-sm font-mono p-4 rounded-md relative">
                aws s3api create-bucket --bucket my-bucket --region us-east-1
                <button className="absolute top-3 right-3 text-slate-400 hover:text-white">
                  <Copy size={16} />
                </button>
              </CardContent>
              <div className="flex justify-center gap-4 mt-6">
                <img src="/icons/k8s.svg" className="h-6" alt="k8s" />
                <img src="/icons/docker.svg" className="h-6" alt="docker" />
                <img src="/icons/azure.svg" className="h-6" alt="azure" />
              </div>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section id="get-started" className="py-24 md:py-32 text-center">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to automate your infra?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Start generating secure, production‑ready manifests in seconds.
          </p>
          <Button size="lg" className="text-lg px-8 py-6">Get Started Now</Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 bg-slate-900 text-slate-400 text-center text-sm">
        <Container>
          <p>© {new Date().getFullYear()} Infragenie. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}
