import React from "react";

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
