import type { Metadata } from "next";
import { CommandList } from "@/components/command-list";
import { site, version } from "@/content/aello";

export const metadata: Metadata = { title: "Commands" };

const h2 = "mt-10 mb-3 text-sm/5 font-semibold tracking-[0.04em]";
const indent = "md:pl-18";

// A man page: header, NAME, SYNOPSIS, then the commands.
export default function CommandsPage() {
  const name = site.tagline.replace(/\.$/, "").replace(/^I/, "i");
  return (
    <>
      <div className="flex justify-between gap-4 border-b py-4 font-mono text-[13px]/5 text-muted-foreground">
        <span>AELLO(1)</span>
        <span className="max-sm:hidden">aello {version}</span>
        <span>AELLO(1)</span>
      </div>
      <h2 className={h2}>NAME</h2>
      <p className={`${indent} max-w-[68ch]`}>aello - {name}</p>
      <h2 className={h2}>SYNOPSIS</h2>
      <div className={`${indent} font-mono text-sm/[22px]`}>
        <div>aello</div>
        <div>
          aello <span className="text-muted-foreground">&lt;command&gt; [options]</span>
        </div>
      </div>
      <p className={`${indent} mt-3 max-w-[68ch]`}>
        With no arguments aello opens the TUI. Every command below also prints its own help with{" "}
        <code className="bg-muted px-[0.25em] text-[0.9em] whitespace-nowrap">--help</code>.
      </p>
      <h2 className={h2}>COMMANDS</h2>
      <div className={indent}>
        <CommandList />
      </div>
    </>
  );
}
