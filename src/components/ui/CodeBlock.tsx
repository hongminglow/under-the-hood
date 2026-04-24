import { cn } from "../../utils/utils";

interface CodeBlockProps {
	code: string;
	language?: string;
	title?: string;
	className?: string;
	theme?:
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
}

const themeStyles = {
	default: {
		container: "bg-emerald-950/30 border-emerald-900/50",
		header: "bg-emerald-900/20 border-emerald-900/50",
		lang: "text-emerald-500/70",
		title: "text-emerald-200/90",
		body: "text-emerald-100/90 selection:bg-emerald-700/40 scrollbar-thumb-emerald-900/50",
	},
	slate: {
		container: "bg-slate-900/70 border-slate-600/60",
		header: "bg-slate-800/65 border-slate-600/60",
		lang: "text-slate-300/80",
		title: "text-slate-100",
		body: "text-slate-100 selection:bg-slate-500/40 scrollbar-thumb-slate-500",
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
	teal: {
		container: "bg-teal-950/30 border-teal-900/50",
		header: "bg-teal-900/20 border-teal-900/50",
		lang: "text-teal-500/70",
		title: "text-teal-200/90",
		body: "text-teal-100/90 selection:bg-teal-700/40 scrollbar-thumb-teal-900/50",
	},
	cyan: {
		container: "bg-cyan-950/30 border-cyan-900/50",
		header: "bg-cyan-900/20 border-cyan-900/50",
		lang: "text-cyan-500/70",
		title: "text-cyan-200/90",
		body: "text-cyan-100/90 selection:bg-cyan-700/40 scrollbar-thumb-cyan-900/50",
	},
	sky: {
		container: "bg-sky-950/30 border-sky-900/50",
		header: "bg-sky-900/20 border-sky-900/50",
		lang: "text-sky-500/70",
		title: "text-sky-200/90",
		body: "text-sky-100/90 selection:bg-sky-700/40 scrollbar-thumb-sky-900/50",
	},
	indigo: {
		container: "bg-indigo-950/30 border-indigo-900/50",
		header: "bg-indigo-900/20 border-indigo-900/50",
		lang: "text-indigo-500/70",
		title: "text-indigo-200/90",
		body: "text-indigo-100/90 selection:bg-indigo-700/40 scrollbar-thumb-indigo-900/50",
	},
	violet: {
		container: "bg-violet-950/30 border-violet-900/50",
		header: "bg-violet-900/20 border-violet-900/50",
		lang: "text-violet-500/70",
		title: "text-violet-200/90",
		body: "text-violet-100/90 selection:bg-violet-700/40 scrollbar-thumb-violet-900/50",
	},
	purple: {
		container: "bg-purple-950/30 border-purple-900/50",
		header: "bg-purple-900/20 border-purple-900/50",
		lang: "text-purple-500/70",
		title: "text-purple-200/90",
		body: "text-purple-100/90 selection:bg-purple-700/40 scrollbar-thumb-purple-900/50",
	},
	fuchsia: {
		container: "bg-fuchsia-950/30 border-fuchsia-900/50",
		header: "bg-fuchsia-900/20 border-fuchsia-900/50",
		lang: "text-fuchsia-500/70",
		title: "text-fuchsia-200/90",
		body: "text-fuchsia-100/90 selection:bg-fuchsia-700/40 scrollbar-thumb-fuchsia-900/50",
	},
	rose: {
		container: "bg-rose-950/30 border-rose-900/50",
		header: "bg-rose-900/20 border-rose-900/50",
		lang: "text-rose-500/70",
		title: "text-rose-200/90",
		body: "text-rose-100/90 selection:bg-rose-700/40 scrollbar-thumb-rose-900/50",
	},
};

export function CodeBlock({ code, language = "typescript", title, className, theme = "default" }: CodeBlockProps) {
	const styles = themeStyles[theme] || themeStyles.default;

	return (
		<div className={cn("rounded-2xl border overflow-hidden my-8 shadow-2xl", styles.container, className)}>
			{title && (
				<div className={cn("flex items-center justify-between px-5 py-2.5 border-b", styles.header)}>
					<span className={cn("text-[10px] font-black font-mono uppercase tracking-widest leading-none", styles.lang)}>
						{language}
					</span>
					<span className={cn("text-[10px] font-bold truncate max-w-[200px]", styles.title)}>{title}</span>
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
