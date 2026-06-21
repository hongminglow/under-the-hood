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
		| "orange"
		| "rose";
}

/*
 * `default` is a neutral code surface (zinc/slate) with an iris language label —
 * it reads as code in both themes. Accent themes inherit a parent FeatureCard's
 * identity and carry a LIGHT base + `dark:` override on every layer.
 */
const themeStyles = {
	default: {
		container: "bg-slate-50 border-slate-200 dark:bg-[#0d0d16] dark:border-slate-800/60",
		header: "bg-slate-100/80 border-slate-200 dark:bg-white/[0.02] dark:border-slate-800/60",
		lang: "text-primary/70",
		title: "text-slate-600 dark:text-slate-300",
		body: "text-slate-800 dark:text-slate-100 selection:bg-primary/20 scrollbar-thumb-slate-400/50 dark:scrollbar-thumb-slate-700",
	},
	slate: {
		container: "bg-slate-100/80 border-slate-300/60 dark:bg-slate-900/70 dark:border-slate-600/60",
		header: "bg-slate-200/70 border-slate-300/60 dark:bg-slate-800/65 dark:border-slate-600/60",
		lang: "text-slate-600/80 dark:text-slate-300/80",
		title: "text-slate-700 dark:text-slate-100",
		body: "text-slate-800 dark:text-slate-100 selection:bg-slate-500/25 dark:selection:bg-slate-500/40 scrollbar-thumb-slate-400/50 dark:scrollbar-thumb-slate-500",
	},
	amber: {
		container: "bg-amber-50/80 border-amber-300/60 dark:bg-amber-950/30 dark:border-amber-900/50",
		header: "bg-amber-100/70 border-amber-300/60 dark:bg-amber-900/20 dark:border-amber-900/50",
		lang: "text-amber-600/80 dark:text-amber-500/70",
		title: "text-amber-800 dark:text-amber-200/90",
		body: "text-amber-900 dark:text-amber-100/90 selection:bg-amber-500/20 dark:selection:bg-amber-700/40 scrollbar-thumb-amber-400/50 dark:scrollbar-thumb-amber-900/50",
	},
	emerald: {
		container: "bg-emerald-50/80 border-emerald-300/60 dark:bg-emerald-950/30 dark:border-emerald-900/50",
		header: "bg-emerald-100/70 border-emerald-300/60 dark:bg-emerald-900/20 dark:border-emerald-900/50",
		lang: "text-emerald-600/80 dark:text-emerald-500/70",
		title: "text-emerald-800 dark:text-emerald-200/90",
		body: "text-emerald-900 dark:text-emerald-100/90 selection:bg-emerald-500/20 dark:selection:bg-emerald-700/40 scrollbar-thumb-emerald-400/50 dark:scrollbar-thumb-emerald-900/50",
	},
	teal: {
		container: "bg-teal-50/80 border-teal-300/60 dark:bg-teal-950/30 dark:border-teal-900/50",
		header: "bg-teal-100/70 border-teal-300/60 dark:bg-teal-900/20 dark:border-teal-900/50",
		lang: "text-teal-600/80 dark:text-teal-500/70",
		title: "text-teal-800 dark:text-teal-200/90",
		body: "text-teal-900 dark:text-teal-100/90 selection:bg-teal-500/20 dark:selection:bg-teal-700/40 scrollbar-thumb-teal-400/50 dark:scrollbar-thumb-teal-900/50",
	},
	cyan: {
		container: "bg-cyan-50/80 border-cyan-300/60 dark:bg-cyan-950/30 dark:border-cyan-900/50",
		header: "bg-cyan-100/70 border-cyan-300/60 dark:bg-cyan-900/20 dark:border-cyan-900/50",
		lang: "text-cyan-600/80 dark:text-cyan-500/70",
		title: "text-cyan-800 dark:text-cyan-200/90",
		body: "text-cyan-900 dark:text-cyan-100/90 selection:bg-cyan-500/20 dark:selection:bg-cyan-700/40 scrollbar-thumb-cyan-400/50 dark:scrollbar-thumb-cyan-900/50",
	},
	sky: {
		container: "bg-sky-50/80 border-sky-300/60 dark:bg-sky-950/30 dark:border-sky-900/50",
		header: "bg-sky-100/70 border-sky-300/60 dark:bg-sky-900/20 dark:border-sky-900/50",
		lang: "text-sky-600/80 dark:text-sky-500/70",
		title: "text-sky-800 dark:text-sky-200/90",
		body: "text-sky-900 dark:text-sky-100/90 selection:bg-sky-500/20 dark:selection:bg-sky-700/40 scrollbar-thumb-sky-400/50 dark:scrollbar-thumb-sky-900/50",
	},
	indigo: {
		container: "bg-indigo-50/80 border-indigo-300/60 dark:bg-indigo-950/30 dark:border-indigo-900/50",
		header: "bg-indigo-100/70 border-indigo-300/60 dark:bg-indigo-900/20 dark:border-indigo-900/50",
		lang: "text-indigo-600/80 dark:text-indigo-500/70",
		title: "text-indigo-800 dark:text-indigo-200/90",
		body: "text-indigo-900 dark:text-indigo-100/90 selection:bg-indigo-500/20 dark:selection:bg-indigo-700/40 scrollbar-thumb-indigo-400/50 dark:scrollbar-thumb-indigo-900/50",
	},
	violet: {
		container: "bg-violet-50/80 border-violet-300/60 dark:bg-violet-950/30 dark:border-violet-900/50",
		header: "bg-violet-100/70 border-violet-300/60 dark:bg-violet-900/20 dark:border-violet-900/50",
		lang: "text-violet-600/80 dark:text-violet-500/70",
		title: "text-violet-800 dark:text-violet-200/90",
		body: "text-violet-900 dark:text-violet-100/90 selection:bg-violet-500/20 dark:selection:bg-violet-700/40 scrollbar-thumb-violet-400/50 dark:scrollbar-thumb-violet-900/50",
	},
	purple: {
		container: "bg-purple-50/80 border-purple-300/60 dark:bg-purple-950/30 dark:border-purple-900/50",
		header: "bg-purple-100/70 border-purple-300/60 dark:bg-purple-900/20 dark:border-purple-900/50",
		lang: "text-purple-600/80 dark:text-purple-500/70",
		title: "text-purple-800 dark:text-purple-200/90",
		body: "text-purple-900 dark:text-purple-100/90 selection:bg-purple-500/20 dark:selection:bg-purple-700/40 scrollbar-thumb-purple-400/50 dark:scrollbar-thumb-purple-900/50",
	},
	fuchsia: {
		container: "bg-fuchsia-50/80 border-fuchsia-300/60 dark:bg-fuchsia-950/30 dark:border-fuchsia-900/50",
		header: "bg-fuchsia-100/70 border-fuchsia-300/60 dark:bg-fuchsia-900/20 dark:border-fuchsia-900/50",
		lang: "text-fuchsia-600/80 dark:text-fuchsia-500/70",
		title: "text-fuchsia-800 dark:text-fuchsia-200/90",
		body: "text-fuchsia-900 dark:text-fuchsia-100/90 selection:bg-fuchsia-500/20 dark:selection:bg-fuchsia-700/40 scrollbar-thumb-fuchsia-400/50 dark:scrollbar-thumb-fuchsia-900/50",
	},
	orange: {
		container: "bg-orange-50/80 border-orange-300/60 dark:bg-orange-950/30 dark:border-orange-900/50",
		header: "bg-orange-100/70 border-orange-300/60 dark:bg-orange-900/20 dark:border-orange-900/50",
		lang: "text-orange-600/80 dark:text-orange-500/70",
		title: "text-orange-800 dark:text-orange-200/90",
		body: "text-orange-900 dark:text-orange-100/90 selection:bg-orange-500/20 dark:selection:bg-orange-700/40 scrollbar-thumb-orange-400/50 dark:scrollbar-thumb-orange-900/50",
	},
	rose: {
		container: "bg-rose-50/80 border-rose-300/60 dark:bg-rose-950/30 dark:border-rose-900/50",
		header: "bg-rose-100/70 border-rose-300/60 dark:bg-rose-900/20 dark:border-rose-900/50",
		lang: "text-rose-600/80 dark:text-rose-500/70",
		title: "text-rose-800 dark:text-rose-200/90",
		body: "text-rose-900 dark:text-rose-100/90 selection:bg-rose-500/20 dark:selection:bg-rose-700/40 scrollbar-thumb-rose-400/50 dark:scrollbar-thumb-rose-900/50",
	},
};

export function CodeBlock({ code, language = "typescript", title, className, theme = "default" }: CodeBlockProps) {
	const styles = themeStyles[theme] || themeStyles.default;

	return (
		<div className={cn("rounded-2xl border overflow-hidden my-8 shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/30", styles.container, className)}>
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
