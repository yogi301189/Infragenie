import React from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "./components/ui/container";
import { Link, animateScroll as scroll } from "react-scroll";
import WhyChoose from "./components/WhyChoose";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a12] text-white scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border-b border-slate-800">
        <Container className="flex items-center justify-between py-4">
          <button
            onClick={() => scroll.scrollToTop()}
            className="flex items-center gap-2 text-lg font-semibold cursor-pointer"
          >
            <img src="/logo.svg" alt="logo" className="h-8 w-8" /> Infragenie
          </button>
          <nav className="hidden md:flex items-center gap-6 text-slate-300">
            <Link
              to="features"
              smooth={true}
              duration={500}
              offset={-60}
              className="hover:text-white transition cursor-pointer"
            >
              Features
            </Link>
            <a href="/docs" className="hover:text-white transition">
              Docs
            </a>
            <a
              href="https://github.com/yogi301189/infragenie"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-white transition"
            >
              GitHub
            </a>
          </nav>
          <Button asChild className="ml-4 hidden md:inline-flex">
            <Link
              to="get-started"
              smooth={true}
              duration={500}
              offset={-60}
              className="gap-2 cursor-pointer"
            >
              Try it Now
            </Link>
          </Button>
        </Container>
      </header>

      {/* Hero Section */}
      <section id="hero" className="flex-1 py-24 md:py-32">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6 max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              Ship Infrastructure
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">
                10× Faster
              </span>
              <br /> with AI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-slate-400"
            >
              Infragenie turns natural language prompts into production-grade Kubernetes, Terraform & Docker code.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="get-started"
                smooth={true}
                duration={500}
                offset={-60}
                className="cursor-pointer"
              >
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Try the Demo
                </Button>
              </Link>
              <a
                href="https://github.com/yogi301189/infragenie"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="border-slate-600 text-white">
                  See in Action
                </Button>
              </a>
            </div>
          </div>

          {/* Right - Code Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Card className="bg-[#0f0f1a] border border-slate-700 p-5 rounded-xl shadow-xl">
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

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Infragenie?
          </h2>
          {/* Feature cards go here */}
          {/* You can loop and add animations like your earlier version */}
         <WhyChoose />
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
{/* Testimonials */}
<section className="py-20 bg-slate-800 border-t border-slate-700 text-center">
  <Container>
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold mb-10 text-white"
    >
      Loved by 100+ DevOps Engineers
    </motion.h2>
    <motion.blockquote
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-lg text-slate-300 italic"
    >
      “InfraGenie saves me hours every deployment. Just type the intent and it does the heavy lifting.”
      <footer className="mt-4 text-sm not-italic text-slate-400">— Priya K, Senior SRE @ TechNova</footer>
    </motion.blockquote>
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
