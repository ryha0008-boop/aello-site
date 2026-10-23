"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="cursor-pointer border px-2 font-mono text-[13px]/5 font-medium text-foreground hover:bg-accent"
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}
