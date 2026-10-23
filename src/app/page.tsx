import Link from "next/link";
import type { ReactNode } from "react";
import { Code } from "@/components/code";
import { CopyButton } from "@/components/copy-button";
import { Eyebrow, Rows, SecHead, Since, Status, StatusLineOne, StatusLineTwo } from "@/components/term";
import { commands, groups, roles, site } from "@/content/aello";

const link = "underline decoration-1 underline-offset-3";

export default function Home() {
  return (
    <>
      <div className="mb-16 grid gap-10 border-b pt-12 pb-16 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:items-start xl:gap-14 xl:pt-18 xl:pb-20">
        <div>
          <Eyebrow>a Rust CLI for Claude Code</Eyebrow>
          <h1 className="mt-2 mb-4 text-display font-semibold md:text-[2.5rem]">{site.name}</h1>
          <p className="mb-4 max-w-[30ch] text-lead md:text-[1.25rem]">{site.tagline}</p>
          <p className="max-w-[68ch]">{site.summary}</p>
          <div className="mt-7">
            <Eyebrow className="mb-1.5 flex justify-between">
              <span>install</span>
              <CopyButton text={site.install} />
            </Eyebrow>
            <Code>{site.install}</Code>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm font-medium">
            <Link href="/commands/" className={link}>
              {commands.length} commands
            </Link>
            <Link href="/roles/" className={link}>
              {roles.length} roles
            </Link>
            <Link href="/inside/" className={link}>
              inside an env
            </Link>
            <a href={site.repo} className={link}>
              source
            </a>
          </div>
        </div>
        <div>
          <div
            role="img"
            aria-label="A tmux window with two aello envs side by side, each with its two-line status line, and a window list where one window waits for you."
            className="border bg-pane font-mono text-pane-foreground"
          >
            <div className="grid sm:grid-cols-2">
              <TmuxPane name="coder" active command="aello run coder">
                <StatusLineOne />
                <StatusLineTwo me="coder" parts={["<- aello3dev note"]} />
              </TmuxPane>
              <TmuxPane name="aello3dev" command="aello note SysAdmin < note.md">
                <StatusLineOne model="Fable 5.1" ctx={74} />
                <StatusLineTwo />
              </TmuxPane>
            </div>
            <div className="flex flex-wrap gap-x-1 bg-primary px-1 text-xs/[22px] text-primary-foreground">
              <span className="bg-primary-foreground px-1.5 text-primary">0:aello-site</span>
              <span className="px-1.5">1:web</span>
              <span className="bg-warning px-1.5 text-warning-foreground">2:api</span>
            </div>
          </div>
          <p className="mt-2.5 max-w-[68ch] text-sm text-muted-foreground">
            Two envs in one repo, each with its own config, its own status line and its own commits. The api
            window rang the bell: a pane there waits for you.
          </p>
        </div>
      </div>

      <div className="grid gap-14">
        {groups.map((g) => (
          <section key={g.slug} id={g.slug}>
            <SecHead title={g.title} note={`${g.features.length} features`} big />
            <p className="-mt-1 mb-6 max-w-[68ch] text-muted-foreground">{g.lead}</p>
            <Rows
              rows={g.features.map((f) => ({
                key: f.title,
                name: (
                  <>
                    {f.title}
                    {f.since ? <Since>since {f.since}</Since> : null}
                  </>
                ),
                text: f.body,
              }))}
            />
          </section>
        ))}
      </div>
    </>
  );
}

// One pane of the tmux window: its title, a prompt, and its own status line.
function TmuxPane({
  name,
  active = false,
  command,
  children,
}: {
  name: string;
  active?: boolean;
  command: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-55 flex-col px-3 pb-2.5 not-first:border-t sm:not-first:border-t-0 sm:not-first:border-l">
      <div
        className={`-mx-3 mb-2.5 border-b px-3 text-xs/6 ${active ? "border-primary text-primary" : "text-muted-foreground"}`}
      >
        {name}
      </div>
      <pre className="m-0 mb-auto text-[13px]/5 whitespace-pre-wrap wrap-anywhere">
        ~/project $ {command}
        {active ? (
          <span className="ml-[0.15em] inline-block h-[1.15em] w-[0.6em] animate-blink bg-foreground align-[-0.2em]" />
        ) : null}
      </pre>
      <div className="mt-4 border-t border-dashed pt-2">
        <Status>{children}</Status>
      </div>
    </div>
  );
}
