import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "@/components/code";
import { Reveal } from "@/components/reveal";
import { groups, site, version } from "@/content/aello";

export default function Home() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Reveal>
          <Badge variant="outline" className="font-mono">
            {version}
          </Badge>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{site.summary}</p>
          <Code className="mt-8 max-w-3xl">{site.install}</Code>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button render={<Link href="/commands/" />}>Commands</Button>
            <Button variant="outline" render={<Link href="/roles/" />}>
              Roles and sync
            </Button>
            <Button variant="outline" render={<Link href="/inside/" />}>
              Inside an env
            </Button>
          </div>
        </Reveal>
      </section>

      <div id="features" className="space-y-20">
        {groups.map((g) => (
          <section key={g.slug} id={g.slug}>
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight">{g.title}</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">{g.lead}</p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.features.map((f, i) => (
                <Reveal key={f.title} delay={Math.min(i, 5) * 0.05}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {f.title}
                        {f.since ? (
                          <Badge variant="secondary" className="font-mono text-xs">
                            {f.since}
                          </Badge>
                        ) : null}
                      </CardTitle>
                      <CardDescription className="sr-only">{f.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.body}
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
