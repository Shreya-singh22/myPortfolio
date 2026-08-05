"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

const allSkills = Array.from(new Set(skills.flatMap((s) => s.items)));

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mono-label text-xs text-accent-2">02 · Skills</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Tools I reach for
          </h2>
        </Reveal>
      </div>

      <div className="my-14">
        <Marquee items={allSkills} />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <RevealItem key={group.category}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-panel h-full rounded-2xl p-6 transition-colors hover:border-accent/50"
              >
                <h3 className="mono-label mb-4 text-xs text-muted">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-accent hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
