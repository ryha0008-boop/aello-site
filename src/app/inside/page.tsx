import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "@/components/code";
import { Reveal } from "@/components/reveal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { envSettings, hooks, skills, statusLine } from "@/content/aello";

export const metadata: Metadata = { title: "Inside an env" };

export default function InsidePage() {
  return (
    <>
      <section className="py-12">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight">Inside an env</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            What aello run writes into .claude-env-&lt;name&gt;/ and sets for the launched Claude.
            Hooks and skills are rewritten on every run; persona and memory are never clobbered.
          </p>
        </Reveal>
      </section>

      <section className="pb-12">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">Seven hooks</h2>
        </Reveal>
        <Reveal className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead className="hidden sm:table-cell">Script</TableHead>
                <TableHead>What it does</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hooks.map((h) => (
                <TableRow key={h.script}>
                  <TableCell className="align-top">
                    <div className="font-medium">{h.event}</div>
                    {h.matcher ? (
                      <div className="font-mono text-xs text-muted-foreground">{h.matcher}</div>
                    ) : null}
                  </TableCell>
                  <TableCell className="hidden align-top font-mono text-xs sm:table-cell">
                    {h.script}
                  </TableCell>
                  <TableCell className="whitespace-normal align-top text-muted-foreground">
                    {h.does}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Reveal>
      </section>

      <section className="pb-12">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">Four skills</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-mono">{s.name}</CardTitle>
                  <CardDescription>Run by {s.who}.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>{s.does}</p>
                  <Badge variant="secondary">{s.model}</Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-12">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">Status line</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Two lines under the prompt, rendered by aello statusline from what Claude Code pipes in.
          </p>
          <Code className="mt-6">{statusLine.sample.join("\n")}</Code>
          <ul className="mt-4 max-w-3xl space-y-1 text-sm text-muted-foreground">
            {statusLine.legend.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="pb-12">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">Settings and environment</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Reconciled into settings.json, or set on the claude process at launch.
          </p>
          <ul className="mt-6 grid gap-2 font-mono text-sm sm:grid-cols-2">
            {envSettings.map((s) => (
              <li key={s} className="rounded-md border px-3 py-2">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
