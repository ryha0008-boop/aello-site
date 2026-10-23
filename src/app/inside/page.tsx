import type { Metadata } from "next";
import { PageHead, Pane, Rows, SecHead, Since, Status, StatusLineOne, StatusLineTwo } from "@/components/term";
import { envDir, envSettings, groups, hooks, skills, statusLine } from "@/content/aello";

export const metadata: Metadata = { title: "Inside an env" };

const states = [
  { label: "under 70%", line: {} },
  { label: "from 70%", line: { ctx: 74 } },
  { label: "from 90%", line: { ctx: 74, h5: 93, cold: true } },
];

export default function InsidePage() {
  return (
    <>
      <PageHead eyebrow="ls -a .claude-env-coder" title="Inside an env">
        <p className="m-0 max-w-[68ch] text-lead md:text-[1.25rem]">{groups.find((g) => g.slug === "env")?.lead}</p>
      </PageHead>

      <section>
        <SecHead title="The env dir" />
        <Pane title="~/project">
          <div className="font-mono text-sm/6">
            {envDir.map((e) => (
              <div key={e.path} className="grid gap-x-6 sm:grid-cols-[28ch_minmax(0,1fr)]">
                <span className="whitespace-pre">{e.path}</span>
                <span className="text-[13px] text-muted-foreground max-sm:mb-1.5 max-sm:pl-[2ch]">{e.note}</span>
              </div>
            ))}
          </div>
        </Pane>
      </section>

      <section className="mt-16">
        <SecHead title="What every launch sets" note="settings.json and the environment" />
        <Pane title="settings.json">
          <ul className="m-0 list-none p-0 font-mono text-[13px]/[22px]">
            {envSettings.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Pane>
      </section>

      <section className="mt-16">
        <SecHead title="Seven hooks, in the order a session meets them" />
        <Rows
          rows={hooks.map((h) => ({
            key: h.script,
            name: (
              <>
                <span className="block">{h.event}</span>
                {h.matcher ? (
                  <span className="block text-xs/[18px] font-normal text-muted-foreground wrap-anywhere">
                    {h.matcher.replace(/\|/g, " | ")}
                  </span>
                ) : null}
              </>
            ),
            text: (
              <>
                <span className="block font-mono text-[13px]/[22px] text-muted-foreground">{h.script}</span>
                {h.does}
              </>
            ),
          }))}
        />
      </section>

      <section className="mt-16">
        <SecHead title="Four skills" note="an .aello-keep file keeps your own version" />
        <Rows
          rows={skills.map((s) => ({
            key: s.name,
            name: (
              <>
                {s.name}
                <Since>{s.model}</Since>
              </>
            ),
            text: (
              <>
                <span className="text-muted-foreground">run by {s.who}.</span> {s.does}
              </>
            ),
          }))}
        />
      </section>

      <section className="mt-16">
        <SecHead title="The status line" note="two lines under the prompt" />
        <Pane title="aello3dev" current>
          <Status big>
            <StatusLineOne />
            <StatusLineTwo />
          </Status>
        </Pane>
        <div className="mt-6 grid gap-3">
          {states.map((s) => (
            <div key={s.label} className="grid gap-x-6 gap-y-1 md:grid-cols-[14ch_minmax(0,1fr)]">
              <span className="font-mono text-xs/[18px] text-muted-foreground">{s.label}</span>
              <Status>
                <StatusLineOne {...s.line} />
              </Status>
            </div>
          ))}
        </div>
        <ul className="mt-6 list-none p-0">
          {statusLine.legend.map((l) => (
            <li key={l} className="mb-2 max-w-[68ch]">
              {l}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
