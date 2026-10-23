import type { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { roles, syncSteps } from "@/content/aello";

export const metadata: Metadata = { title: "Roles and sync" };

export default function RolesPage() {
  return (
    <>
      <section className="py-12">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight">Roles</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            The role decides what the first run scaffolds into the project and what /sync does.
            Change it any time with aello edit; the env picks it up on its next run.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {roles.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-mono">{r.name}</CardTitle>
                  <CardDescription>Owns {r.owns}.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Scaffolds when absent</div>
                    <div className="text-muted-foreground">{r.scaffolds}</div>
                  </div>
                  <div>
                    <div className="font-medium">/sync</div>
                    <div className="text-muted-foreground">{r.sync}</div>
                  </div>
                  <div>
                    <div className="font-medium">Pushes</div>
                    <div className="text-muted-foreground">{r.pushes}</div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-8">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">What /sync does, step by step</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            The maintainer&apos;s version. A contributor skips the docs beyond the CHANGELOG and the
            deploy; a local role skips fetch, pull and push.
          </p>
        </Reveal>
        <Reveal className="mt-6">
          <Accordion className="w-full">
            {syncSteps.map((s, i) => (
              <AccordionItem key={s.title} value={s.title}>
                <AccordionTrigger>
                  <span className="font-mono text-muted-foreground">{i + 1}.</span>
                  <span className="ml-3">{s.title}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{s.body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </>
  );
}
