import { cn } from "../../utils/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  title,
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/40 overflow-hidden bg-[#0a1a11] my-8 shadow-2xl",
        className,
      )}
    >
      {title && (
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/20 bg-secondary/10">
          <span className="text-[10px] font-black font-mono text-muted-foreground/60 uppercase tracking-widest leading-none">
            {language}
          </span>
          <span className="text-[10px] font-bold text-primary/60 truncate max-w-[200px]">
            {title}
          </span>
        </div>
      )}
      <div className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-foreground/90 selection:bg-primary/40 scrollbar-thin scrollbar-thumb-border">
        <pre>
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
