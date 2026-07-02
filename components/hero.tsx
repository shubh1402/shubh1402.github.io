"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { ParticleBackground } from "@/components/particle-background";
import { TypingRole } from "@/components/typing-role";
import { profile } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden px-6">
      <ParticleBackground />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-bg/40 to-bg" />

      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-electric glow-dot" />
          Building intelligent systems
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-gradient text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
        >
          I build AI systems that
          <br />
          automate real-world work.
        </motion.h1>

        <motion.div custom={2} initial="hidden" animate="show" variants={fadeUp} className="mt-6">
          <TypingRole roles={profile.roles} />
        </motion.div>

        <motion.p
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted"
        >
          I started in network operations, watching dashboards and logs all day.
          Now I build the automation, ML pipelines, and AI systems that replace
          that manual watching — end to end, deployed, and documented.
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-electric px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            Explore My AI Lab
            <ArrowRight size={15} />
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener"
            className="glass glass-hover inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-ink"
          >
            <Github size={15} />
            View Live Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}
