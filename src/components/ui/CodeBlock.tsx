import { cn } from "../../utils/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  theme?: "default" | "slate" | "amber" | "emerald" | "rose";
}

const themeStyles = {
  default: {
    container: "bg-slate-900/80 border-white/10",
    header: "bg-white/10 border-white/10",
    lang: "text-white/70",
    title: "text-white/90",
    body: "text-white selection:bg-white/30 scrollbar-thumb-white/20",
  },
  slate: {
    container: "bg-slate-950/50 border-slate-800/50",
    header: "bg-slate-900/50 border-slate-800/50",
    lang: "text-slate-500",
    title: "text-slate-300",
    body: "text-slate-200 selection:bg-slate-700/50 scrollbar-thumb-slate-700",
  },
  amber: {
    container: "bg-amber-950/30 border-amber-900/50",
    header: "bg-amber-900/20 border-amber-900/50",
    lang: "text-amber-500/70",
    title: "text-amber-200/90",
    body: "text-amber-100/90 selection:bg-amber-700/40 scrollbar-thumb-amber-900/50",
  },
  emerald: {
    container: "bg-emerald-950/30 border-emerald-900/50",
    header: "bg-emerald-900/20 border-emerald-900/50",
    lang: "text-emerald-500/70",
    title: "text-emerald-200/90",
    body: "text-emerald-100/90 selection:bg-emerald-700/40 scrollbar-thumb-emerald-900/50",
  },
  rose: {
    container: "bg-rose-950/30 border-rose-900/50",
    header: "bg-rose-900/20 border-rose-900/50",
    lang: "text-rose-500/70",
    title: "text-rose-200/90",
    body: "text-rose-100/90 selection:bg-rose-700/40 scrollbar-thumb-rose-900/50",
  },
};

export function CodeBlock({
  code,
  language = "typescript",
  title,
  className,
  theme = "default",
}: CodeBlockProps) {
  const styles = themeStyles[theme] || themeStyles.default;

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden my-8 shadow-2xl",
        styles.container,
        className,
      )}
    >
      {title && (
        <div className={cn("flex items-center justify-between px-5 py-2.5 border-b", styles.header)}>
          <span className={cn("text-[10px] font-black font-mono uppercase tracking-widest leading-none", styles.lang)}>
            {language}
          </span>
          <span className={cn("text-[10px] font-bold truncate max-w-[200px]", styles.title)}>
            {title}
          </span>
        </div>
      )}
      <div className={cn("p-6 overflow-x-auto text-[13px] font-mono leading-relaxed scrollbar-thin", styles.body)}>
        <pre>
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
