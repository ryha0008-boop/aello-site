import type { Metadata } from "next";
import { PageHead, Rows, SecHead } from "@/components/term";
import { groups, roles, syncSteps, type Role } from "@/content/aello";

export const metadata: Metadata = { title: "Roles and sync" };

// Rows in the order a reader decides: does it push, what does /sync do, what does it own, what does it write.
const attrs: (keyof Role)[] = ["pushes", "sync", "owns", "scaffolds"];
const intro = groups.flatMap((g) => g.features).find((f) => f.title === "Four roles")?.body;

export default function RolesPage() {
  return (
    <>
      <PageHead eyebrow="aello add <name> --role maintainer|contributor|local|standalone" title="Four roles">
        <p className="mb-4 max-w-[68ch] text-lead md:text-[1.25rem]">{intro}</p>
        <p className="m-0 max-w-[68ch] text-muted-foreground">
          A role decides what an env writes into the repo, what /sync does, and whether anything leaves the machine.
        </p>
      </PageHead>

      {/* A label column and the four roles as columns from lg; below that each role is its own block with its own labels. */}
      <div className="grid gap-6 md:max-lg:grid-cols-2 lg:grid-cols-[11ch_repeat(4,minmax(0,1fr))] lg:grid-rows-[auto_repeat(4,auto)] lg:gap-0 lg:border">
        <div
          aria-hidden="true"
          className="hidden font-mono text-xs/[18px] text-muted-foreground lg:row-span-5 lg:grid lg:grid-rows-subgrid"
        >
          {["", ...attrs].map((a) => (
            <div key={a} className="border-b pt-3 pr-3 pb-2.5 pl-3.5 last:border-b-0">
              {a || "\u00a0"}
            </div>
          ))}
        </div>
        {roles.map((r) => (
          <section
            key={r.name}
            id={r.name}
            className="group scroll-mt-18 border bg-card lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:border-0 lg:border-l"
          >
            <h2 className="border-b px-3.5 py-2.5 text-base/6 font-semibold group-target:bg-primary group-target:text-primary-foreground">
              {r.name}
            </h2>
            <dl className="m-0 lg:row-span-4 lg:grid lg:grid-rows-subgrid">
              {attrs.map((a) => (
                <div key={a} className="border-b px-3.5 py-2.5 last:border-b-0">
                  <dt className="text-xs/[18px] text-muted-foreground lg:sr-only">{a}</dt>
                  <dd className={`mt-0.5 text-[15px]/[23px] lg:mt-0 ${a === "pushes" ? "font-medium" : ""}`}>{r[a]}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <section className="mt-16">
        <SecHead title="What /sync does, in order" note={`${syncSteps.length} steps`} />
        <Rows rows={syncSteps.map((s) => ({ key: s.title, name: s.title, text: s.body }))} />
      </section>
    </>
  );
}
