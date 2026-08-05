"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef } from "react";
import type { Project } from "@/data/content";

function BrowserChrome({ domain, accent }: { domain: string; accent: [string, string] }) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-border bg-background-elevated/80 px-4 py-2.5">
      <div className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent[0], opacity: 0.6 }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent[1], opacity: 0.6 }} />
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
      </div>
      <span className="mono-label min-w-0 truncate text-[10px] text-muted">{domain}</span>
    </div>
  );
}

function Tag({ tag, accent }: { tag: string; accent: string }) {
  return (
    <span
      className="border-l-2 pl-2 font-mono text-[11px] lowercase tracking-tight text-muted"
      style={{ borderColor: accent }}
    >
      {tag}
    </span>
  );
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 250, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 250, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
      layoutId={`card-${project.slug}`}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1000,
      }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-background-elevated text-left transition-shadow duration-300"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${project.accent[0]}55, ${project.accent[1]}55)`,
          padding: 1,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative flex flex-col">
        <BrowserChrome domain={project.domain} accent={project.accent} />
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-background">
          <Image
            src={project.image}
            alt={`${project.name} interface screenshot`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `linear-gradient(to top, ${project.accent[0]}22, transparent 60%)`,
            }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">{project.name}</h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ color: project.accent[0] }}
          />
        </div>

        <p className="mt-2 flex-1 text-sm text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} tag={tag} accent={project.accent[0]} />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Github size={13} /> View code
          </span>
          <span className="flex items-center gap-1.5">
            <ArrowUpRight size={13} /> Live demo
          </span>
        </div>
      </div>
    </motion.button>
  );
}
