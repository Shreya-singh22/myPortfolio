"use client";

import { useReducedMotion } from "framer-motion";
import { Fragment } from "react";

export function Marquee({ items, speed = 34 }: { items: string[]; speed?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border py-4">
      <div
        className="flex w-max gap-8 whitespace-nowrap"
        style={
          prefersReducedMotion
            ? undefined
            : {
                animation: `marquee ${speed}s linear infinite`,
              }
        }
      >
        {track.map((item, i) => (
          <Fragment key={`${item}-${i}`}>
            <span className="font-display text-2xl font-medium text-muted/70 sm:text-3xl">
              {item}
            </span>
            <span className="font-display text-2xl text-accent sm:text-3xl">·</span>
          </Fragment>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
