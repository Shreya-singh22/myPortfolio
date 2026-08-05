"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { profile } from "@/data/content";
import { TextScramble } from "@/components/TextScramble";
import { MagneticButton } from "@/components/MagneticButton";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
});

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 sm:opacity-90">
          <HeroScene />
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.18), transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mono-label mb-6 flex items-center gap-2 text-xs text-accent-2"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-2" />
          Available for opportunities
        </motion.p>

        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
          <TextScramble text={profile.name} duration={1000} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl"
        >
          <p className="text-xl text-foreground/90 sm:text-2xl">
            <span className="text-gradient font-medium">{profile.role}</span>
            {" · "}
            {profile.tagline}
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted sm:text-base">
            CS undergrad who ships real, deployed full-stack products — see them
            live below, not just linked on GitHub.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="bg-foreground text-background hover:opacity-90"
          >
            <span className="flex items-center gap-2">
              View Projects <ArrowUpRight size={16} />
            </span>
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="glow-ring glass-panel hover:border-accent"
          >
            Contact Me
          </MagneticButton>

          <MagneticButton
            href={profile.resumeHref}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-foreground"
          >
            <span className="flex items-center gap-2">
              Résumé <FileDown size={15} />
            </span>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        data-cursor="hover"
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
