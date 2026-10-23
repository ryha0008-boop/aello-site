import type { ReactNode } from "react";
import { Reveal, RevealRow } from "@/components/reveal";
import { statusLine } from "@/content/aello";

// The terminal surfaces the pages are built from: panes, man-page rows and the
// status line, all square, mono for structure and sans for sentences.

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`font-mono text-[13px]/5 text-muted-foreground ${className}`}>{children}</div>;
}

export function PageHead({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="mb-12 border-b pt-12 pb-8">
      <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
      <h1 className="mb-3 text-title font-semibold md:text-[1.75rem]">{title}</h1>
      {children}
    </div>
  );
}

export function SecHead({ title, note, big = false }: { title: string; note?: string; big?: boolean }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h2 className={big ? "text-title font-semibold md:text-[1.75rem]" : "text-heading font-semibold md:text-[1.25rem]"}>
        {title}
      </h2>
      {note ? <span className="font-mono text-[13px]/5 text-muted-foreground">{note}</span> : null}
    </div>
  );
}

// A bordered box whose title sits on its top border, as tmux draws pane titles.
export function Pane({ title, current = false, children }: { title: string; current?: boolean; children: ReactNode }) {
  return (
    <div className={`relative border bg-pane px-4 pt-5 pb-4 text-pane-foreground ${current ? "border-primary" : ""}`}>
      <span
        className={`absolute -top-2.5 left-3 bg-background px-1.5 font-mono text-[13px]/5 font-medium ${current ? "text-primary" : "text-muted-foreground"}`}
      >
        {title}
      </span>
      {children}
    </div>
  );
}

// Definition rows with a fixed name column, like a man page's tagged paragraphs.
// They print in as they first scroll into view.
export function Rows({ rows }: { rows: { key: string; name: ReactNode; text: ReactNode }[] }) {
  return (
    <Reveal as="dl" className="m-0 border-t">
      {rows.map((r, i) => (
        <RevealRow key={r.key} i={i} className="grid gap-x-6 gap-y-1 border-b py-3.5 md:grid-cols-[22ch_minmax(0,1fr)]">
          <dt className="text-[15px]/6 font-medium">{r.name}</dt>
          <dd className="m-0 max-w-[68ch] text-[15px]/6">{r.text}</dd>
        </RevealRow>
      ))}
    </Reveal>
  );
}

export function Since({ children }: { children: ReactNode }) {
  return <span className="block text-xs/[18px] font-normal text-muted-foreground">{children}</span>;
}

// The status line, one span per segment so a narrow pane wraps between
// segments, never inside one. Built from aello's own sample; a state only
// swaps the numbers, and the tint follows aello's: amber from 70, red from 90.
const [sampleOne, sampleTwo] = statusLine.sample;

function tint(seg: string) {
  const pct = Number(/(\d+)%/.exec(seg)?.[1] ?? 0);
  if (pct >= 90) return "text-destructive";
  if (pct >= 70 || seg === "cache cold") return "text-warning";
  return "";
}

function StatusRow({ segs, sep = true }: { segs: string[]; sep?: boolean }) {
  return (
    <div className="flex flex-wrap gap-x-[0.6em]">
      {segs.map((s, i) => (
        <span key={i} className="contents">
          {sep && i > 0 ? <span className="text-muted-foreground">·</span> : null}
          <span className={`whitespace-pre ${tint(s)}`}>{s}</span>
        </span>
      ))}
    </div>
  );
}

export type LineOne = { model?: string; ctx?: number; h5?: number; cold?: boolean };

export function StatusLineOne({ model, ctx, h5, cold = false }: LineOne) {
  const segs = sampleOne.split(" · ").map((s, i) => {
    if (i === 0 && model) return model;
    if (s.startsWith("ctx ") && ctx !== undefined) return s.replace(/\d+%/, `${ctx}%`);
    if (s.startsWith("5h ") && h5 !== undefined) return s.replace(/\d+%/, `${h5}%`);
    return s;
  });
  return <StatusRow segs={cold ? [...segs, "cache cold"] : segs} />;
}

// Line two: the env's name, then what it sent, then what it received.
const [, sampleMe, sampleSent, sampleGot] = /^(\S+) (.*?)\s{2,}(.*)$/.exec(sampleTwo) ?? ["", sampleTwo, "", ""];

// A part's own " · " becomes a segment of its own, so a narrow pane wraps there.
export function StatusLineTwo({ me = sampleMe, parts = [sampleSent, `  ${sampleGot}`] }: { me?: string; parts?: string[] }) {
  return <StatusRow segs={[me, ...parts.flatMap((p) => p.split(" · ").flatMap((s, i) => (i ? ["·", s] : [s])))]} sep={false} />;
}

export function Status({ big = false, children }: { big?: boolean; children: ReactNode }) {
  return (
    <div className={`font-mono ${big ? "text-sm/[22px] md:text-[15px]/6" : "text-status"}`}>{children}</div>
  );
}
