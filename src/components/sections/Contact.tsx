"use client";

import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { profile } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mono-label text-xs text-accent-2">06 · Contact</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build something
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Open to full-stack and frontend roles, internships, and
            interesting collaborations. Reach out directly or use the form.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal delay={0.1} className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              data-cursor="hover"
              className="glass-panel flex items-center justify-between rounded-2xl p-5 transition-colors hover:border-accent"
            >
              <span className="flex items-center gap-3">
                <Mail size={18} className="text-accent" />
                <span className="text-sm">{profile.email}</span>
              </span>
              <ArrowUpRight size={16} className="text-muted" />
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="glass-panel flex items-center justify-between rounded-2xl p-5 transition-colors hover:border-accent"
            >
              <span className="flex items-center gap-3">
                <Linkedin size={18} className="text-accent" />
                <span className="text-sm">linkedin.com/in/shreya-chauhan-1026b9278</span>
              </span>
              <ArrowUpRight size={16} className="text-muted" />
            </a>

            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="glass-panel flex items-center justify-between rounded-2xl p-5 transition-colors hover:border-accent"
            >
              <span className="flex items-center gap-3">
                <Github size={18} className="text-accent" />
                <span className="text-sm">github.com/Shreya-singh22</span>
              </span>
              <ArrowUpRight size={16} className="text-muted" />
            </a>
          </Reveal>

          <Reveal delay={0.16}>
            <form
              onSubmit={handleSubmit}
              className="glass-panel glow-ring space-y-4 rounded-2xl p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mono-label text-xs text-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                    className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mono-label text-xs text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange("email")}
                    className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mono-label text-xs text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  placeholder="What are you building?"
                />
              </div>

              <MagneticButton
                type="submit"
                className="w-full bg-foreground text-background hover:opacity-90"
              >
                <span className="flex items-center justify-center gap-2">
                  Send message <Send size={15} />
                </span>
              </MagneticButton>
              <p className="text-center text-xs text-muted">
                Opens your email client with the message pre-filled.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
