"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "@/data/content";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            layoutId={`card-${project.slug}`}
            className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-background-elevated"
          >
            <button
              type="button"
              onClick={onClose}
              data-cursor="hover"
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 border-b border-border bg-background/60 px-5 py-3">
              <div className="flex gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: project.accent[0], opacity: 0.6 }}
                />
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: project.accent[1], opacity: 0.6 }}
                />
                <span className="h-2.5 w-2.5 rounded-full border border-border" />
              </div>
              <span className="mono-label truncate text-[10px] text-muted">
                {project.domain}
              </span>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
              <Image
                src={project.image}
                alt={`${project.name} interface screenshot`}
                fill
                sizes="(min-width: 640px) 640px, 100vw"
                className="object-cover object-top"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(to top, var(--background-elevated) 0%, transparent 35%)`,
                }}
              />
            </div>

            <div className="p-8 pt-6">
              <p className="mono-label text-xs" style={{ color: project.accent[0] }}>
                Case Study
              </p>
              <h3
                id="project-modal-title"
                className="mt-3 font-display text-3xl font-semibold sm:text-4xl"
              >
                {project.name}
              </h3>

              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                {project.description}
              </p>

              {project.impact && (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.impact.map((stat) => (
                    <div
                      key={stat}
                      className="rounded-xl border border-border p-4 text-center"
                    >
                      <p
                        className="font-display text-lg font-semibold"
                        style={{ color: project.accent[0] }}
                      >
                        {stat}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-l-2 pl-2 font-mono text-xs lowercase tracking-tight text-muted"
                    style={{ borderColor: project.accent[0] }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.liveHref}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Live demo <ArrowUpRight size={15} />
                </a>
                <a
                  href={project.githubHref}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
                >
                  <Github size={15} /> Source code
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
