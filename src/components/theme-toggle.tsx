"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

// The inline script in layout.tsx sets the .dark class before paint; this
// button flips it and remembers the choice per browser. The class on <html>
// is the source of truth, read through a store so the server render (no
// document) and the client agree without a flash or a hydration mismatch.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const dark = useSyncExternalStore<boolean | null>(subscribe, isDark, () => null);

  function toggle() {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} aria-label="Toggle dark mode">
      {dark === null ? "Theme" : dark ? "Light" : "Dark"}
    </Button>
  );
}
