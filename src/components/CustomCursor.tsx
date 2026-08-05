"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  // Always starts false so the client's pre-hydration render matches the
  // server-rendered (window-less) output; the real value is only knowable
  // after mount, so it's set from an effect rather than a lazy initializer.
  const [canHover, setCanHover] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const enabled = canHover && !prefersReducedMotion;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest("[data-cursor='hover']")));
    };

    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          width: hovering ? 48 : 16,
          height: hovering ? 48 : 16,
          x: hovering ? -24 : -8,
          y: hovering ? -24 : -8,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
        className="rounded-full bg-white"
      />
    </motion.div>
  );
}
