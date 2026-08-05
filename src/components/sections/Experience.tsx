import { Briefcase, Users } from "lucide-react";
import { experience } from "@/data/content";
import { Reveal } from "@/components/Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="mono-label text-xs text-accent-2">04 · Experience</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Where I&apos;ve worked
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-border to-transparent sm:left-[19px]" />

          <ol className="space-y-10">
            {experience.map((item, i) => (
              <Reveal key={item.organization + item.role} delay={i * 0.05} as="li">
                <div className="relative flex gap-6 pl-10 sm:pl-12">
                  <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background-elevated text-accent sm:h-10 sm:w-10">
                    {item.kind === "work" ? (
                      <Briefcase size={15} />
                    ) : (
                      <Users size={15} />
                    )}
                  </span>

                  <div className="glass-panel flex-1 rounded-2xl p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold">
                        {item.role}
                      </h3>
                      <span className="mono-label text-xs text-muted">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-accent-2">
                      {item.organization}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 text-sm text-foreground/80"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
