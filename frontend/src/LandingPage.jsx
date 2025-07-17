import { useAuth } from "./context/AuthContext"; 
import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "./components/ui/container";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import WhyChoose from "./components/WhyChoose";
import AwsCard from "./components/AwsCard";
import PromptForm from "./PromptForm";
import HowToInstallCard from "./components/HowToInstallCard";
import SeeInActionModal from "./components/SeeInActionModal";
import ErrorCheckCard from "./components/ErrorCheckCard";
import { Link as RouterLink } from "react-router-dom";

export default function LandingPage() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a12] text-white scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border-b border-slate-800">
        <Container className="flex items-center justify-between py-4">
          <button
            onClick={() => scroll.scrollToTop()}
            className="flex items-center gap-2 text-lg font-semibold cursor-pointer"
          >
            <img src="/logo.svg" alt="logo" className="h-12 w-12" /> 
            <span className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text"></span>
                     </button>
          <nav className="hidden md:flex items-center gap-6 text-slate-300">
            <a href="/features" className="hover:text-white transition">
              Features
            </a>
            <a href="/docs" className="hover:text-white transition">
              Docs
            </a>
            <a
              href="/docs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-white transition"
            >
              GitHub (Only for premium users)
            </a>
          </nav>

          {user ? (
            <div className="relative">
              <button
                className="text-white hover:text-indigo-400"
                onClick={() => setShowMenu(!showMenu)}
              >
                👤 Welcome {user.email.split("@")[0]} ▼
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 bg-slate-800 shadow-lg rounded-md p-2 z-50">
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                    className="text-red-400 hover:text-red-300 text-sm px-4 py-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button asChild className="ml-4 hidden md:inline-flex">
              <RouterLink to="/login" className="gap-2 cursor-pointer">
                Signup / Signin
              </RouterLink>
            </Button>
          )}
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
              <ScrollLink
                to="how-to-install"
                smooth={true}
                duration={500}
                offset={-60}
                className="cursor-pointer"
              >
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Try the Demo
                </Button>
              </ScrollLink>
              <Button onClick={() => setShowModal(true)}>See in Action</Button>
              <SeeInActionModal open={showModal} onClose={() => setShowModal(false)} />
            </div>
          </div>
          {/* Prompt Form Section */}
          <section id="prompt" className="py-16 md:py-24 bg-[#0f0f1a] border-y border-slate-800">
            <Container>
              <PromptForm />
            </Container>
          </section>

          {/* Right - Code Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          ></motion.div>
        </Container>
      </section>

      <section id="ErrorCheckCard" className="py-12 px-4 sm:px-6 lg:px-12 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            <ErrorCheckCard />
          </h2>
        </div>
      </section>

      <section id="how-to-install" className="py-12 px-4 sm:px-6 lg:px-12 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Get Started Quickly</h2>
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
            <AwsCard />
            <HowToInstallCard />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Infragenie?
          </h2>
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
            <footer className="mt-4 text-sm not-italic text-slate-400">— MohanPrasad, Senior SRE @ Capgemini</footer>
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
