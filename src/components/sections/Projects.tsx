"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mono-label text-xs text-accent-2">03 · Projects</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Shipped, not just built
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Every project here is deployed and usable right now — these are
            screenshots of the actual running apps. Click a card for the full
            story: problem, impact, and links.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} onOpen={() => setActive(project)} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
