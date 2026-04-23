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
        "rounded-2xl border border-white/5 overflow-hidden bg-black/40 my-8 shadow-2xl",
        className,
      )}
    >
      {title && (
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/5 bg-white/5">
          <span className="text-[10px] font-black font-mono text-white/40 uppercase tracking-widest leading-none">
            {language}
          </span>
          <span className="text-[10px] font-bold text-white/60 truncate max-w-[200px]">
            {title}
          </span>
        </div>
      )}
      <div className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-white/90 selection:bg-white/20 scrollbar-thin scrollbar-thumb-white/10">
        <pre>
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
