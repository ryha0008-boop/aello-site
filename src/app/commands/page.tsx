import type { Metadata } from "next";
import { Code } from "@/components/code";
import { Reveal } from "@/components/reveal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { commands } from "@/content/aello";

export const metadata: Metadata = { title: "Commands" };

export default function CommandsPage() {
  return (
    <section className="py-12">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight">Commands</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          The {commands.length} subcommands of the aello binary, as printed by aello --help.
          aello with no arguments opens the TUI.
        </p>
        <Code className="mt-6 max-w-3xl">{"aello --help\naello <command> --help"}</Code>
      </Reveal>
      <Reveal className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Command</TableHead>
              <TableHead>What it does</TableHead>
              <TableHead className="hidden md:table-cell">Usage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commands.map((c) => (
              <TableRow key={c.name}>
                <TableCell className="font-mono font-medium">{c.name}</TableCell>
                <TableCell className="whitespace-normal">
                  {c.summary}
                  <code className="mt-1 block font-mono text-xs text-muted-foreground md:hidden">
                    {c.usage}
                  </code>
                </TableCell>
                <TableCell className="hidden whitespace-normal font-mono text-xs text-muted-foreground md:table-cell">
                  {c.usage}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Reveal>
    </section>
  );
}
