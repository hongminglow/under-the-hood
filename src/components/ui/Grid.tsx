import React from "react";
import { cn } from "../../utils/utils";

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
