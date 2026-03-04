import React from "react";
import { cn } from "../../utils/utils";
import { Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, description, children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-[#02120a]/40 backdrop-blur-md p-6 shadow-2xl transition-all hover:bg-[#02120a]/60 hover:border-primary/30 group mb-8",
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-4 space-y-1">
          {title && (
            <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="text-foreground/80 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  );
}

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

export function Highlight({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "warning" | "info";
}) {
  const variants = {
    primary: "bg-primary/10 text-primary-300 border-primary/20",
    warning: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    info: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  };

  return (
    <span
      className={cn(
        "px-1.5 py-0.5 rounded-md border text-[13px] font-bold tracking-tight",
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}

export function Callout({
  children,
  type = "info",
  title,
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "tip";
  title?: string;
}) {
  const styles = {
    info: {
      icon: Info,
      color: "text-blue-400",
      bg: "bg-blue-400/5",
      border: "border-blue-400/20",
      label: "Note",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-amber-400",
      bg: "bg-amber-400/5",
      border: "border-amber-400/20",
      label: "Caution",
    },
    success: {
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/5",
      border: "border-emerald-400/20",
      label: "Requirement",
    },
    tip: {
      icon: Lightbulb,
      color: "text-primary",
      bg: "bg-primary/5",
      border: "border-primary/20",
      label: "Tip",
    },
  };

  const config = styles[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "p-5 rounded-2xl border flex gap-4 my-8",
        config.bg,
        config.border,
      )}
    >
      <Icon className={cn("shrink-0", config.color)} size={20} />
      <div className="space-y-1">
        <p
          className={cn(
            "text-xs font-black uppercase tracking-[0.2em]",
            config.color,
          )}
        >
          {title || config.label}
        </p>
        <div className="text-foreground/80 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Step({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 group mb-6 last:mb-0">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-secondary/30 border border-border/40 flex items-center justify-center text-xs font-bold text-primary shrink-0 transition-all group-hover:border-primary/40 group-hover:bg-primary/10">
          {index}
        </div>
        <div className="w-px flex-1 bg-border/20 my-2 group-last:hidden" />
      </div>
      <div className="pt-1.5 pb-2 text-sm text-foreground/80 leading-relaxed font-semibold">
        {children}
      </div>
    </div>
  );
}

export function Grid({
  children,
  cols = 2,
  gap = 6,
}: {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
}) {
  const gridCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-4",
    }[cols] || "grid-cols-2";

  return (
    <div className={cn("grid gap-6 mb-8", gridCols, `gap-${gap}`)}>
      {children}
    </div>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="rounded-2xl border border-border/40 overflow-hidden my-8 shadow-xl bg-[#02120a]/20">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-secondary/20 border-b border-border/40">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary/70"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/20">
          {rows.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-primary/5 transition-colors duration-200"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-6 py-4 text-foreground/70 font-medium"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
