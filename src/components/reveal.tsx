"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Output prints, it does not glide: each row goes from transparent to opaque as
// the block first scrolls into view, 30ms apart, capped at ten rows, once.
// Nothing translates or scales. Reduced-motion users see it in place: the
// prerendered rows start transparent, so a CSS !important rule shows them.
const row: Variants = {
  hidden: { opacity: 0 },
  shown: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.12, ease: "linear", delay: Math.min(i, 10) * 0.03 },
  }),
};

export function Reveal({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  as?: "div" | "dl";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Tag = as === "dl" ? motion.dl : motion.div;
  return (
    <Tag
      className={`motion-reduce:*:opacity-100! ${className ?? ""}`}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
    >
      {children}
    </Tag>
  );
}

export function RevealRow({ children, i, className }: { children: ReactNode; i: number; className?: string }) {
  return (
    <motion.div className={className} variants={row} custom={i}>
      {children}
    </motion.div>
  );
}
