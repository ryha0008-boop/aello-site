// A command as the terminal would show it: a square pane, wrapped, never scrolled sideways.
export function Code({ children, className = "", id }: { children: string; className?: string; id?: string }) {
  return (
    <pre
      id={id}
      className={`m-0 border bg-pane px-3.5 py-3 font-mono text-[13px]/5 whitespace-pre-wrap text-pane-foreground wrap-anywhere ${className}`}
    >
      {children}
    </pre>
  );
}
