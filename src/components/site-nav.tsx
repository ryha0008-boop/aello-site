import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { version } from "@/content/aello";

const links = [
  { href: "/", label: "Features" },
  { href: "/commands/", label: "Commands" },
  { href: "/roles/", label: "Roles" },
  { href: "/inside/", label: "Inside an env" },
];

export function SiteNav() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="font-mono text-base font-semibold">
          aello
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">{version}</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground">
        aello {version}. Content compiled from the
        binary&apos;s own help, hooks, skills and status line.
      </div>
    </footer>
  );
}
