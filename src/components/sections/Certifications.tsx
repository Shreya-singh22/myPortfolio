import { Award } from "lucide-react";
import { certifications } from "@/data/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mono-label text-xs text-accent-2">05 · Certifications</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Keeping the fundamentals sharp
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <RevealItem key={cert.name}>
              <div className="glass-panel flex h-full items-start gap-4 rounded-2xl p-5 transition-colors hover:border-accent/50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-white">
                  <Award size={17} />
                </span>
                <div>
                  <p className="font-medium leading-snug text-foreground">
                    {cert.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
