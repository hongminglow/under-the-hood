interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  highlightedRows?: number[];
}

export function Table({
  headers,
  rows,
  highlightedRows = [],
}: TableProps) {
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
          {rows.map((row, i) => {
            const isHighlighted = highlightedRows.includes(i);
            return (
              <tr
                key={i}
                className={`transition-colors duration-200 ${
                  isHighlighted 
                    ? "bg-primary/20 hover:bg-primary/30" 
                    : "hover:bg-primary/5"
                }`}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-6 py-4 font-medium ${
                      isHighlighted ? "text-primary italic font-bold" : "text-foreground/70"
                    }`}
                  >
                    {cell}
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
