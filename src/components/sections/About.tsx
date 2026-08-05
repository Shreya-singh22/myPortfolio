import { GraduationCap, Languages } from "lucide-react";
import { profile, education } from "@/data/content";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mono-label text-xs text-accent-2">01 · About</p>
        </Reveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {profile.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08} className="mb-5 last:mb-0">
                <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                  {i === 0 ? (
                    <>
                      <span className="font-display text-2xl font-semibold sm:text-3xl">
                        I&apos;m a CS undergrad{" "}
                      </span>
                      who ships real, deployed full-stack products — not tutorial
                      clones sitting in a repo. Every project below is live, has
                      real users, and taught me something a course never could.
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="space-y-6">
            <Reveal delay={0.1} className="glass-panel rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2 text-accent">
                <GraduationCap size={18} />
                <h3 className="mono-label text-xs">Education</h3>
              </div>
              <ul className="space-y-4">
                {education.map((item) => (
                  <li key={item.institution + item.degree}>
                    <p className="text-sm font-medium text-foreground">
                      {item.degree}
                    </p>
                    <p className="text-sm text-muted">{item.institution}</p>
                    <p className="mt-1 text-xs text-muted">
                      {[item.period, item.detail].filter(Boolean).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18} className="glass-panel rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2 text-accent">
                <Languages size={18} />
                <h3 className="mono-label text-xs">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.languagesSpoken.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full border border-border px-3 py-1 text-sm text-foreground/90"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
