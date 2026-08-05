import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p className="mono-label text-xs">
          © {year} {profile.name}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="hover"
            aria-label="Email"
            className="transition-colors hover:text-accent"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="text-xs">
          Built with Next.js, Tailwind CSS &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
}
