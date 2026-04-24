import { cn } from "../../utils/utils";

type TableTheme =
  | "default"
  | "slate"
  | "amber"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "rose";

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  highlightedRows?: number[];
  theme?: TableTheme;
}

const themeStyles: Record<
  TableTheme,
  {
    container: string;
    headRow: string;
    headCell: string;
    body: string;
    row: string;
    highlightedRow: string;
    cell: string;
    highlightedCell: string;
  }
> = {
  default: {
    container: "border-border/40 bg-[#02120a]/20",
    headRow: "bg-secondary/20 border-border/40",
    headCell: "text-primary/70",
    body: "divide-border/20",
    row: "hover:bg-primary/5",
    highlightedRow: "bg-primary/20 hover:bg-primary/30",
    cell: "text-foreground/70",
    highlightedCell: "text-primary italic font-bold",
  },
  slate: {
    container: "border-slate-800/50 bg-slate-950/30",
    headRow: "bg-slate-900/35 border-slate-800/50",
    headCell: "text-slate-200/90",
    body: "divide-slate-800/40",
    row: "hover:bg-slate-800/20",
    highlightedRow: "bg-slate-800/35 hover:bg-slate-800/45",
    cell: "text-slate-200/85",
    highlightedCell: "text-slate-50 italic font-bold",
  },
  amber: {
    container: "border-amber-900/50 bg-amber-950/20",
    headRow: "bg-amber-900/20 border-amber-900/50",
    headCell: "text-amber-300/80",
    body: "divide-amber-900/35",
    row: "hover:bg-amber-900/15",
    highlightedRow: "bg-amber-900/30 hover:bg-amber-900/40",
    cell: "text-amber-100/75",
    highlightedCell: "text-amber-200 italic font-bold",
  },
  emerald: {
    container: "border-red-900/50 bg-red-950/20",
    headRow: "bg-red-900/20 border-red-900/50",
    headCell: "text-red-300/80",
    body: "divide-red-900/35",
    row: "hover:bg-red-900/15",
    highlightedRow: "bg-red-900/30 hover:bg-red-900/40",
    cell: "text-red-100/75",
    highlightedCell: "text-red-200 italic font-bold",
  },
  teal: {
    container: "border-teal-900/50 bg-teal-950/20",
    headRow: "bg-teal-900/20 border-teal-900/50",
    headCell: "text-teal-300/80",
    body: "divide-teal-900/35",
    row: "hover:bg-teal-900/15",
    highlightedRow: "bg-teal-900/30 hover:bg-teal-900/40",
    cell: "text-teal-100/75",
    highlightedCell: "text-teal-200 italic font-bold",
  },
  cyan: {
    container: "border-cyan-900/50 bg-cyan-950/20",
    headRow: "bg-cyan-900/20 border-cyan-900/50",
    headCell: "text-cyan-300/80",
    body: "divide-cyan-900/35",
    row: "hover:bg-cyan-900/15",
    highlightedRow: "bg-cyan-900/30 hover:bg-cyan-900/40",
    cell: "text-cyan-100/75",
    highlightedCell: "text-cyan-200 italic font-bold",
  },
  sky: {
    container: "border-sky-900/50 bg-sky-950/20",
    headRow: "bg-sky-900/20 border-sky-900/50",
    headCell: "text-sky-300/80",
    body: "divide-sky-900/35",
    row: "hover:bg-sky-900/15",
    highlightedRow: "bg-sky-900/30 hover:bg-sky-900/40",
    cell: "text-sky-100/75",
    highlightedCell: "text-sky-200 italic font-bold",
  },
  indigo: {
    container: "border-indigo-900/50 bg-indigo-950/20",
    headRow: "bg-indigo-900/20 border-indigo-900/50",
    headCell: "text-indigo-300/80",
    body: "divide-indigo-900/35",
    row: "hover:bg-indigo-900/15",
    highlightedRow: "bg-indigo-900/30 hover:bg-indigo-900/40",
    cell: "text-indigo-100/75",
    highlightedCell: "text-indigo-200 italic font-bold",
  },
  violet: {
    container: "border-violet-900/50 bg-violet-950/20",
    headRow: "bg-violet-900/20 border-violet-900/50",
    headCell: "text-violet-300/80",
    body: "divide-violet-900/35",
    row: "hover:bg-violet-900/15",
    highlightedRow: "bg-violet-900/30 hover:bg-violet-900/40",
    cell: "text-violet-100/75",
    highlightedCell: "text-violet-200 italic font-bold",
  },
  purple: {
    container: "border-purple-900/50 bg-purple-950/20",
    headRow: "bg-purple-900/20 border-purple-900/50",
    headCell: "text-purple-300/80",
    body: "divide-purple-900/35",
    row: "hover:bg-purple-900/15",
    highlightedRow: "bg-purple-900/30 hover:bg-purple-900/40",
    cell: "text-purple-100/75",
    highlightedCell: "text-purple-200 italic font-bold",
  },
  fuchsia: {
    container: "border-fuchsia-900/50 bg-fuchsia-950/20",
    headRow: "bg-fuchsia-900/20 border-fuchsia-900/50",
    headCell: "text-fuchsia-300/80",
    body: "divide-fuchsia-900/35",
    row: "hover:bg-fuchsia-900/15",
    highlightedRow: "bg-fuchsia-900/30 hover:bg-fuchsia-900/40",
    cell: "text-fuchsia-100/75",
    highlightedCell: "text-fuchsia-200 italic font-bold",
  },
  rose: {
    container: "border-rose-900/50 bg-rose-950/20",
    headRow: "bg-rose-900/20 border-rose-900/50",
    headCell: "text-rose-300/80",
    body: "divide-rose-900/35",
    row: "hover:bg-rose-900/15",
    highlightedRow: "bg-rose-900/30 hover:bg-rose-900/40",
    cell: "text-rose-100/75",
    highlightedCell: "text-rose-200 italic font-bold",
  },
};

export function Table({
  headers,
  rows,
  highlightedRows = [],
  theme = "default",
}: TableProps) {
  const styles = themeStyles[theme] || themeStyles.default;

  return (
    <div className={cn("rounded-2xl border overflow-hidden mt-8 mb-12 shadow-xl", styles.container)}>
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className={cn("border-b", styles.headRow)}>
            {headers.map((h, i) => (
              <th
                key={i}
                className={cn("px-6 py-4 text-[10px] font-black uppercase tracking-widest", styles.headCell)}
              >
                {typeof h === "string" ? (
                  <span dangerouslySetInnerHTML={{ __html: h }} />
                ) : (
                  h
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn("divide-y", styles.body)}>
          {rows.map((row, i) => {
            const isHighlighted = highlightedRows.includes(i);
            return (
              <tr
                key={i}
                className={cn("transition-colors duration-200", isHighlighted ? styles.highlightedRow : styles.row)}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={cn("px-6 py-4 font-medium", isHighlighted ? styles.highlightedCell : styles.cell)}
                  >
                    {typeof cell === "string" ? (
                      <span dangerouslySetInnerHTML={{ __html: cell }} />
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
