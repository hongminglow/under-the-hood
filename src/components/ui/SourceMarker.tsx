import { cn } from "../../utils/utils";

interface SourceMarkerProps {
  spec?: string;
  version?: string;
  year?: number;
  vendor?: string;
  className?: string;
}

export function SourceMarker({ spec, version, year, vendor, className }: SourceMarkerProps) {
  const label = spec ?? version ?? vendor ?? (year !== undefined ? `as of ${year}` : "");

  if (!label) return null;

  return (
    <span
      className={cn(
        "inline-block px-1.5 py-0.5 rounded border font-mono text-[11px] font-normal tracking-tight align-middle",
        "bg-slate-500/10 text-slate-400 border-slate-500/20",
        className,
      )}
    >
      {label}
    </span>
  );
}
