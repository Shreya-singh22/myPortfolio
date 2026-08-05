"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

type TextScrambleProps = {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
};

export function TextScramble({ text, className, duration = 900, delay = 0 }: TextScrambleProps) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState("");
  const frame = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    frame.current = 0;
    const totalFrames = Math.ceil((duration / 1000) * 60);

    const tick = () => {
      const progress = frame.current / totalFrames;
      const revealCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealCount) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);
      frame.current += 1;

      if (frame.current <= totalFrames) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    const startTimeout = setTimeout(() => {
      rafId.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, prefersReducedMotion]);

  return (
    <span className={className} aria-label={text}>
      {prefersReducedMotion ? text : display || " "}
    </span>
  );
}
