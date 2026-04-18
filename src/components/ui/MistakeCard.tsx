import React from "react";
import { cn } from "../../utils/utils";

interface MistakeCardProps {
  number: number;
  title: string;
  problem: string | React.ReactNode;
  solution: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function MistakeCard({
  number,
  title,
  problem,
  solution,
  children,
  className,
}: MistakeCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border/60 bg-[#02120a]/40 backdrop-blur-md p-6 shadow-2xl transition-all mb-4",
        className,
      )}
    >
      {/* Title with inline number badge */}
      <h4 className="text-base font-bold text-foreground mb-3 flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-900/80 border border-red-700/50 text-xs font-bold text-red-100 shadow-md flex-shrink-0">
          {number}
        </span>
        {title}
      </h4>

      {/* Problem */}
      <div className="mb-4 pl-4 border-l-2 border-red-800/50">
        <p className="text-sm text-white/90">
          <strong className="text-red-400">Problem:</strong>
          <span className="ml-2">{problem}</span>
        </p>
      </div>

      {/* Additional Content (code examples, etc.) */}
      {children && <div className="mb-4">{children}</div>}

      {/* Solution */}
      <div className="pl-4 border-l-2 border-green-800/50">
        <p className="text-sm text-white/90">
          <strong className="text-green-400">Solution:</strong>
          <span className="ml-2">
            {typeof solution === "string" ? solution : solution}
          </span>
        </p>
      </div>
    </div>
  );
}
