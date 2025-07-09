import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Server, Settings, Github, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "./components/ui/container";


/**
 * Full‑featured landing page for Infragenie – AI‑powered DevOps toolkit
 * Uses TailwindCSS, shadcn/ui components, lucide‑react icons, framer‑motion for subtle fade/slide animations.
 */

const features = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "Instant YAML & TF",
    desc: "Generate Kubernetes, Terraform, Docker & more in seconds.",
  },
  {
    icon: <Server className="h-8 w-8" />,
    title: "One‑click Deploy",
    desc: "Push to cluster or cloud right from the UI (coming soon).",
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "Best‑practice Linting",
    desc: "Built‑in validation & security checks for every manifest.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border-b border-slate-800">
        <Container className="flex items-center justify-between py-4">
          <a href="#hero" className="flex items-center gap-2 text-lg font-semibold">
            <img src="/logo.svg" alt="logo" className="h-8 w-8" /> Infragenie
          </a>
          <nav className="hidden md:flex items-center gap-6 text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="/docs" className="hover:text-white transition">Docs</a>
            <a href="https://github.com/yogi301189/infragenie" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition"><Github className="h-4 w-4"/> GitHub</a>
          </nav>
          <Button asChild className="ml-4 hidden md:inline-flex">
            <a href="#get-started" className="gap-2">Get Started <ArrowRight className="h-4 w-4"/></a>
          </Button>
        </Container>
      </header>

      {/* Hero Section */}
      <section id="hero" className="flex-1 flex items-center py-24 md:py-32">
        <Container className="text-center max-w-3xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Ship Infrastructure <span className="text-emerald-400">10× Faster</span> with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl text-slate-300"
          >
            Infragenie turns plain‑English prompts into production‑ready Kubernetes, Terraform & Docker code that passes best‑practice checks.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <a href="#get-started">Try the Demo</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/yogi301189/infragenie" target="_blank" rel="noreferrer" className="gap-2"><Github className="h-4 w-4"/> Star on GitHub</a>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 bg-slate-800/40 border-t border-slate-700">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Infragenie?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="bg-slate-900 border-slate-700 h-full">
                  <CardHeader className="flex items-center gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-2xl">
                      {icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-white">
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300 text-sm leading-relaxed">
                    {desc}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call‑to‑Action */}
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
