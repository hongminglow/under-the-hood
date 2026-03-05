import React from "react";

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
