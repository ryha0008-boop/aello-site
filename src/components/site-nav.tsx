"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { version } from "@/content/aello";

// The tmux status bar is the nav: pages are windows, the current one in reverse video.
const windows = [
  { href: "/", label: "0:features" },
  { href: "/commands/", label: "1:commands" },
  { href: "/roles/", label: "2:roles" },
  { href: "/inside/", label: "3:inside" },
];

const trim = (p: string) => p.replace(/\/+$/, "") || "/";

export function SiteNav() {
  const current = trim(usePathname());
  return (
    <header className="sticky top-0 z-10 bg-primary font-mono text-[13px]/7 text-primary-foreground">
      <div className="mx-auto flex max-w-site flex-wrap items-center gap-x-5 px-4 md:px-8">
        <Link href="/" className="font-semibold">
          aello
        </Link>
        <nav aria-label="Pages" className="flex flex-wrap gap-x-1 max-sm:order-3 max-sm:-mx-2 max-sm:w-full">
          {windows.map((w) => (
            <Link
              key={w.href}
              href={w.href}
              aria-current={trim(w.href) === current ? "page" : undefined}
              className="px-2 hover:underline aria-[current=page]:bg-primary-foreground aria-[current=page]:text-primary"
            >
              {w.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex gap-4">
          <span className="max-sm:hidden">{version}</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-site px-4 pt-5 pb-7 text-sm text-muted-foreground md:px-8">
        aello {version}. Content compiled from the
        binary&apos;s own help, hooks, skills and status line.
      </div>
    </footer>
  );
}
