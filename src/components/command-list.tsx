"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { commandGroups, commands } from "@/content/aello";

// A usage line: flags in green, brackets and pipes muted, and a line break
// allowed only after a pipe or between words, never inside a flag.
function Usage({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((t, i) => {
        if (/^\s+$/.test(t)) return t;
        if (t === "aello") return <span key={i} className="whitespace-nowrap text-muted-foreground">{t}</span>;
        return (
          <span key={i} className="whitespace-nowrap">
            {t.split(/(--?[a-z][\w-]*|[[\]|])/).map((p, j) =>
              /^--?[a-z]/.test(p) ? (
                <span key={j} className="text-primary">{p}</span>
              ) : p === "|" ? (
                <Fragment key={j}>
                  <span className="text-muted-foreground">|</span>
                  <wbr />
                </Fragment>
              ) : p === "[" || p === "]" ? (
                <span key={j} className="text-muted-foreground">{p}</span>
              ) : (
                p
              ),
            )}
          </span>
        );
      })}
    </>
  );
}

const byName = new Map(commands.map((c) => [c.name, c]));
const haystack = (name: string) => {
  const c = byName.get(name)!;
  return `${c.name} ${c.summary} ${c.usage}`.toLowerCase();
};

export function CommandList() {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const v = q.trim().toLowerCase();
  const hit = (name: string) => !v || haystack(name).includes(v);
  const shown = commands.filter((c) => hit(c.name)).length;

  // `/` focuses the filter from anywhere on the page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement !== input.current) {
        e.preventDefault();
        input.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const meta = "font-mono text-[13px]/5 text-muted-foreground";
  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <label htmlFor="q" className="font-mono text-[13px]/5 font-medium">
          filter
        </label>
        <input
          id="q"
          ref={input}
          type="search"
          placeholder="run, --role, mirror"
          autoComplete="off"
          spellCheck={false}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setQ("");
              e.currentTarget.blur();
            }
          }}
          className="w-[min(100%,28ch)] border border-input bg-card px-2.5 py-2 font-mono text-sm/5 text-foreground focus-visible:-outline-offset-1 focus-visible:border-ring"
        />
        <span className={meta}>{v ? `${shown} of ${commands.length}` : `${commands.length} commands`}</span>
        <span className={meta}>press / to filter</span>
      </div>
      <div>
        {commandGroups.map((g, gi) => (
          <div key={g.label} hidden={!g.commands.some(hit)}>
            <div className={`${gi === 0 ? "" : "mt-7"} font-mono text-xs/5 text-muted-foreground`}>{g.label}</div>
            <div className="border-t">
              {g.commands.map((name) => {
                const c = byName.get(name)!;
                return (
                  <div
                    key={name}
                    id={name}
                    hidden={!hit(name)}
                    className="grid scroll-mt-18 gap-x-6 gap-y-0.5 border-b py-3 hover:bg-accent hover:shadow-[-8px_0_var(--accent),8px_0_var(--accent)] target:bg-accent target:shadow-[-8px_0_var(--accent),8px_0_var(--accent)] md:grid-cols-[14ch_minmax(0,1fr)]"
                  >
                    <a href={`#${name}`} className="font-mono text-[15px]/6 font-semibold hover:underline md:row-span-2">
                      {name}
                    </a>
                    <div className="text-[15px]/6">{c.summary}</div>
                    <div className="mt-1 font-mono text-[13px]/5">
                      <Usage text={c.usage} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div hidden={shown > 0} className="py-4 font-mono text-sm/5 text-muted-foreground">
          No command matches. Clear the filter to see all {commands.length}.
        </div>
      </div>
    </>
  );
}
