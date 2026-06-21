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
	| "orange"
	| "rose";

interface TableProps {
	headers: string[];
	rows: React.ReactNode[][];
	highlightedRows?: number[];
	theme?: TableTheme;
}

interface TableStyle {
	container: string;
	headRow: string;
	headCell: string;
	body: string;
	row: string;
	highlightedRow: string;
	cell: string;
	highlightedCell: string;
}

/*
 * `default` is the iris house style on semantic tokens, so it flips with the
 * theme automatically. Accent themes carry LIGHT base + `dark:` overrides and
 * are only meant for tables nested inside a themed FeatureCard.
 */
const themeStyles: Record<TableTheme, TableStyle> = {
	default: {
		container: "border-border/60 bg-card/40",
		headRow: "bg-secondary/40 border-border/60",
		headCell: "text-primary",
		body: "divide-border/40",
		row: "hover:bg-primary/5",
		highlightedRow: "bg-primary/15 hover:bg-primary/20",
		cell: "text-foreground/75",
		highlightedCell: "text-primary italic font-bold",
	},
	slate: {
		container: "border-slate-300/60 bg-slate-100/50 dark:border-slate-800/50 dark:bg-slate-950/30",
		headRow: "bg-slate-200/60 border-slate-300/60 dark:bg-slate-900/35 dark:border-slate-800/50",
		headCell: "text-slate-700/90 dark:text-slate-200/90",
		body: "divide-slate-200/70 dark:divide-slate-800/40",
		row: "hover:bg-slate-500/5 dark:hover:bg-slate-800/20",
		highlightedRow: "bg-slate-500/10 hover:bg-slate-500/15 dark:bg-slate-800/35 dark:hover:bg-slate-800/45",
		cell: "text-slate-800/85 dark:text-slate-200/85",
		highlightedCell: "text-slate-900 dark:text-slate-50 italic font-bold",
	},
	amber: {
		container: "border-amber-300/60 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20",
		headRow: "bg-amber-100/60 border-amber-300/60 dark:bg-amber-900/20 dark:border-amber-900/50",
		headCell: "text-amber-700/90 dark:text-amber-300/80",
		body: "divide-amber-200/70 dark:divide-amber-900/35",
		row: "hover:bg-amber-500/5 dark:hover:bg-amber-900/15",
		highlightedRow: "bg-amber-500/10 hover:bg-amber-500/15 dark:bg-amber-900/30 dark:hover:bg-amber-900/40",
		cell: "text-amber-900/80 dark:text-amber-100/75",
		highlightedCell: "text-amber-700 dark:text-amber-200 italic font-bold",
	},
	emerald: {
		container: "border-emerald-300/60 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20",
		headRow: "bg-emerald-100/60 border-emerald-300/60 dark:bg-emerald-900/20 dark:border-emerald-900/50",
		headCell: "text-emerald-700/90 dark:text-emerald-300/80",
		body: "divide-emerald-200/70 dark:divide-emerald-900/35",
		row: "hover:bg-emerald-500/5 dark:hover:bg-emerald-900/15",
		highlightedRow: "bg-emerald-500/10 hover:bg-emerald-500/15 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/40",
		cell: "text-emerald-900/80 dark:text-emerald-100/75",
		highlightedCell: "text-emerald-700 dark:text-emerald-200 italic font-bold",
	},
	teal: {
		container: "border-teal-300/60 bg-teal-50/50 dark:border-teal-900/50 dark:bg-teal-950/20",
		headRow: "bg-teal-100/60 border-teal-300/60 dark:bg-teal-900/20 dark:border-teal-900/50",
		headCell: "text-teal-700/90 dark:text-teal-300/80",
		body: "divide-teal-200/70 dark:divide-teal-900/35",
		row: "hover:bg-teal-500/5 dark:hover:bg-teal-900/15",
		highlightedRow: "bg-teal-500/10 hover:bg-teal-500/15 dark:bg-teal-900/30 dark:hover:bg-teal-900/40",
		cell: "text-teal-900/80 dark:text-teal-100/75",
		highlightedCell: "text-teal-700 dark:text-teal-200 italic font-bold",
	},
	cyan: {
		container: "border-cyan-300/60 bg-cyan-50/50 dark:border-cyan-900/50 dark:bg-cyan-950/20",
		headRow: "bg-cyan-100/60 border-cyan-300/60 dark:bg-cyan-900/20 dark:border-cyan-900/50",
		headCell: "text-cyan-700/90 dark:text-cyan-300/80",
		body: "divide-cyan-200/70 dark:divide-cyan-900/35",
		row: "hover:bg-cyan-500/5 dark:hover:bg-cyan-900/15",
		highlightedRow: "bg-cyan-500/10 hover:bg-cyan-500/15 dark:bg-cyan-900/30 dark:hover:bg-cyan-900/40",
		cell: "text-cyan-900/80 dark:text-cyan-100/75",
		highlightedCell: "text-cyan-700 dark:text-cyan-200 italic font-bold",
	},
	sky: {
		container: "border-sky-300/60 bg-sky-50/50 dark:border-sky-900/50 dark:bg-sky-950/20",
		headRow: "bg-sky-100/60 border-sky-300/60 dark:bg-sky-900/20 dark:border-sky-900/50",
		headCell: "text-sky-700/90 dark:text-sky-300/80",
		body: "divide-sky-200/70 dark:divide-sky-900/35",
		row: "hover:bg-sky-500/5 dark:hover:bg-sky-900/15",
		highlightedRow: "bg-sky-500/10 hover:bg-sky-500/15 dark:bg-sky-900/30 dark:hover:bg-sky-900/40",
		cell: "text-sky-900/80 dark:text-sky-100/75",
		highlightedCell: "text-sky-700 dark:text-sky-200 italic font-bold",
	},
	indigo: {
		container: "border-indigo-300/60 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-950/20",
		headRow: "bg-indigo-100/60 border-indigo-300/60 dark:bg-indigo-900/20 dark:border-indigo-900/50",
		headCell: "text-indigo-700/90 dark:text-indigo-300/80",
		body: "divide-indigo-200/70 dark:divide-indigo-900/35",
		row: "hover:bg-indigo-500/5 dark:hover:bg-indigo-900/15",
		highlightedRow: "bg-indigo-500/10 hover:bg-indigo-500/15 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/40",
		cell: "text-indigo-900/80 dark:text-indigo-100/75",
		highlightedCell: "text-indigo-700 dark:text-indigo-200 italic font-bold",
	},
	violet: {
		container: "border-violet-300/60 bg-violet-50/50 dark:border-violet-900/50 dark:bg-violet-950/20",
		headRow: "bg-violet-100/60 border-violet-300/60 dark:bg-violet-900/20 dark:border-violet-900/50",
		headCell: "text-violet-700/90 dark:text-violet-300/80",
		body: "divide-violet-200/70 dark:divide-violet-900/35",
		row: "hover:bg-violet-500/5 dark:hover:bg-violet-900/15",
		highlightedRow: "bg-violet-500/10 hover:bg-violet-500/15 dark:bg-violet-900/30 dark:hover:bg-violet-900/40",
		cell: "text-violet-900/80 dark:text-violet-100/75",
		highlightedCell: "text-violet-700 dark:text-violet-200 italic font-bold",
	},
	purple: {
		container: "border-purple-300/60 bg-purple-50/50 dark:border-purple-900/50 dark:bg-purple-950/20",
		headRow: "bg-purple-100/60 border-purple-300/60 dark:bg-purple-900/20 dark:border-purple-900/50",
		headCell: "text-purple-700/90 dark:text-purple-300/80",
		body: "divide-purple-200/70 dark:divide-purple-900/35",
		row: "hover:bg-purple-500/5 dark:hover:bg-purple-900/15",
		highlightedRow: "bg-purple-500/10 hover:bg-purple-500/15 dark:bg-purple-900/30 dark:hover:bg-purple-900/40",
		cell: "text-purple-900/80 dark:text-purple-100/75",
		highlightedCell: "text-purple-700 dark:text-purple-200 italic font-bold",
	},
	fuchsia: {
		container: "border-fuchsia-300/60 bg-fuchsia-50/50 dark:border-fuchsia-900/50 dark:bg-fuchsia-950/20",
		headRow: "bg-fuchsia-100/60 border-fuchsia-300/60 dark:bg-fuchsia-900/20 dark:border-fuchsia-900/50",
		headCell: "text-fuchsia-700/90 dark:text-fuchsia-300/80",
		body: "divide-fuchsia-200/70 dark:divide-fuchsia-900/35",
		row: "hover:bg-fuchsia-500/5 dark:hover:bg-fuchsia-900/15",
		highlightedRow: "bg-fuchsia-500/10 hover:bg-fuchsia-500/15 dark:bg-fuchsia-900/30 dark:hover:bg-fuchsia-900/40",
		cell: "text-fuchsia-900/80 dark:text-fuchsia-100/75",
		highlightedCell: "text-fuchsia-700 dark:text-fuchsia-200 italic font-bold",
	},
	orange: {
		container: "border-orange-300/60 bg-orange-50/50 dark:border-orange-900/50 dark:bg-orange-950/20",
		headRow: "bg-orange-100/60 border-orange-300/60 dark:bg-orange-900/20 dark:border-orange-900/50",
		headCell: "text-orange-700/90 dark:text-orange-300/80",
		body: "divide-orange-200/70 dark:divide-orange-900/35",
		row: "hover:bg-orange-500/5 dark:hover:bg-orange-900/15",
		highlightedRow: "bg-orange-500/10 hover:bg-orange-500/15 dark:bg-orange-900/30 dark:hover:bg-orange-900/40",
		cell: "text-orange-900/80 dark:text-orange-100/75",
		highlightedCell: "text-orange-700 dark:text-orange-200 italic font-bold",
	},
	rose: {
		container: "border-rose-300/60 bg-rose-50/50 dark:border-rose-900/50 dark:bg-rose-950/20",
		headRow: "bg-rose-100/60 border-rose-300/60 dark:bg-rose-900/20 dark:border-rose-900/50",
		headCell: "text-rose-700/90 dark:text-rose-300/80",
		body: "divide-rose-200/70 dark:divide-rose-900/35",
		row: "hover:bg-rose-500/5 dark:hover:bg-rose-900/15",
		highlightedRow: "bg-rose-500/10 hover:bg-rose-500/15 dark:bg-rose-900/30 dark:hover:bg-rose-900/40",
		cell: "text-rose-900/80 dark:text-rose-100/75",
		highlightedCell: "text-rose-700 dark:text-rose-200 italic font-bold",
	},
};

export function Table({ headers, rows, highlightedRows = [], theme = "default" }: TableProps) {
	const styles = themeStyles[theme] || themeStyles.default;

	return (
		<div className={cn("rounded-2xl border overflow-hidden mt-8 mb-12 shadow-xl shadow-black/5 dark:shadow-black/20", styles.container)}>
			<table className="w-full text-left text-sm border-collapse">
				<thead>
					<tr className={cn("border-b", styles.headRow)}>
						{headers.map((h, i) => (
							<th key={i} className={cn("px-6 py-4 text-[10px] font-black uppercase tracking-widest", styles.headCell)}>
								{typeof h === "string" ? <span dangerouslySetInnerHTML={{ __html: h }} /> : h}
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
										{typeof cell === "string" ? <span dangerouslySetInnerHTML={{ __html: cell }} /> : cell}
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
