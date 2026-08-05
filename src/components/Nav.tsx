"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, profile } from "@/data/content";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          data-cursor="hover"
          className={cn(
            "rounded-full px-4 py-2 font-display text-sm font-semibold tracking-tight transition-all",
            scrolled ? "glass-panel" : ""
          )}
        >
          {profile.initials}
          <span className="mono-label ml-2 hidden text-[10px] text-muted sm:inline">
            /portfolio
          </span>
        </a>

        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all md:flex",
            scrolled ? "glass-panel" : ""
          )}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className="group relative px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            data-cursor="hover"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-glass md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <nav className="glass-panel mx-6 mt-3 flex flex-col rounded-2xl p-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
