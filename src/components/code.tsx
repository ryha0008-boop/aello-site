// A command or a status line, as the terminal would show it.
export function Code({ children, className = "" }: { children: string; className?: string }) {
  return (
    <pre
      className={`overflow-x-auto rounded-lg border bg-muted px-4 py-3 font-mono text-sm leading-relaxed ${className}`}
    >
      {children}
    </pre>
  );
}
