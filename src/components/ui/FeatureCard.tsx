import React from "react";
import type { ElementType } from "react";
import { Card } from "./Card";
import { cn } from "../../utils/utils";

export type FeatureTheme =
	| "emerald"
	| "teal"
	| "cyan"
	| "sky"
	| "indigo"
	| "violet"
	| "purple"
	| "fuchsia"
	| "orange"
	| "amber"
	| "rose"
	| "slate";

interface FeatureCardProps {
	icon: ElementType;
	title: string;
	subtitle?: string;
	theme?: FeatureTheme;
	children: React.ReactNode;
	className?: string;
}

interface ThemeClasses {
	border: string;
	bgGradient: string;
	iconWrapper: string;
	title: string;
	subtitle: string;
	content: string;
}

/*
 * Each accent carries a LIGHT base value + a `dark:` override so the card
 * stays legible in both themes. Light text on a tinted card for dark mode,
 * dark text on a pale tint for light mode.
 */
const themeClasses: Record<FeatureTheme, ThemeClasses> = {
	emerald: {
		border: "border-emerald-300/70 hover:border-emerald-400/80 dark:border-emerald-900/50 dark:hover:border-emerald-500/50 transition-colors duration-300",
		bgGradient: "from-emerald-100/70 dark:from-emerald-900/20",
		iconWrapper: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500/20",
		title: "text-emerald-950 dark:text-emerald-50",
		subtitle: "text-emerald-600/90 dark:text-emerald-400/80",
		content: "text-emerald-900/80 dark:text-emerald-100/70",
	},
	teal: {
		border: "border-teal-300/70 hover:border-teal-400/80 dark:border-teal-900/50 dark:hover:border-teal-500/50 transition-colors duration-300",
		bgGradient: "from-teal-100/70 dark:from-teal-900/20",
		iconWrapper: "bg-teal-500/10 border-teal-500/30 text-teal-700 dark:text-teal-400 dark:border-teal-500/20",
		title: "text-teal-950 dark:text-teal-50",
		subtitle: "text-teal-600/90 dark:text-teal-400/80",
		content: "text-teal-900/80 dark:text-teal-100/70",
	},
	cyan: {
		border: "border-cyan-300/70 hover:border-cyan-400/80 dark:border-cyan-900/50 dark:hover:border-cyan-500/50 transition-colors duration-300",
		bgGradient: "from-cyan-100/70 dark:from-cyan-900/20",
		iconWrapper: "bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-400 dark:border-cyan-500/20",
		title: "text-cyan-950 dark:text-cyan-50",
		subtitle: "text-cyan-600/90 dark:text-cyan-400/80",
		content: "text-cyan-900/80 dark:text-cyan-100/70",
	},
	sky: {
		border: "border-sky-300/70 hover:border-sky-400/80 dark:border-sky-900/50 dark:hover:border-sky-500/50 transition-colors duration-300",
		bgGradient: "from-sky-100/70 dark:from-sky-900/20",
		iconWrapper: "bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-400 dark:border-sky-500/20",
		title: "text-sky-950 dark:text-sky-50",
		subtitle: "text-sky-600/90 dark:text-sky-400/80",
		content: "text-sky-900/80 dark:text-sky-100/70",
	},
	indigo: {
		border: "border-indigo-300/70 hover:border-indigo-400/80 dark:border-indigo-900/50 dark:hover:border-indigo-500/50 transition-colors duration-300",
		bgGradient: "from-indigo-100/70 dark:from-indigo-900/20",
		iconWrapper: "bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-400 dark:border-indigo-500/20",
		title: "text-indigo-950 dark:text-indigo-50",
		subtitle: "text-indigo-600/90 dark:text-indigo-400/80",
		content: "text-indigo-900/80 dark:text-indigo-100/70",
	},
	violet: {
		border: "border-violet-300/70 hover:border-violet-400/80 dark:border-violet-900/50 dark:hover:border-violet-500/50 transition-colors duration-300",
		bgGradient: "from-violet-100/70 dark:from-violet-900/20",
		iconWrapper: "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-400 dark:border-violet-500/20",
		title: "text-violet-950 dark:text-violet-50",
		subtitle: "text-violet-600/90 dark:text-violet-400/80",
		content: "text-violet-900/80 dark:text-violet-100/70",
	},
	purple: {
		border: "border-purple-300/70 hover:border-purple-400/80 dark:border-purple-900/50 dark:hover:border-purple-500/50 transition-colors duration-300",
		bgGradient: "from-purple-100/70 dark:from-purple-900/20",
		iconWrapper: "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400 dark:border-purple-500/20",
		title: "text-purple-950 dark:text-purple-50",
		subtitle: "text-purple-600/90 dark:text-purple-400/80",
		content: "text-purple-900/80 dark:text-purple-100/70",
	},
	fuchsia: {
		border: "border-fuchsia-300/70 hover:border-fuchsia-400/80 dark:border-fuchsia-900/50 dark:hover:border-fuchsia-500/50 transition-colors duration-300",
		bgGradient: "from-fuchsia-100/70 dark:from-fuchsia-900/20",
		iconWrapper: "bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-700 dark:text-fuchsia-400 dark:border-fuchsia-500/20",
		title: "text-fuchsia-950 dark:text-fuchsia-50",
		subtitle: "text-fuchsia-600/90 dark:text-fuchsia-400/80",
		content: "text-fuchsia-900/80 dark:text-fuchsia-100/70",
	},
	orange: {
		border: "border-orange-300/70 hover:border-orange-400/80 dark:border-orange-900/50 dark:hover:border-orange-500/50 transition-colors duration-300",
		bgGradient: "from-orange-100/70 dark:from-orange-900/20",
		iconWrapper: "bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-400 dark:border-orange-500/20",
		title: "text-orange-950 dark:text-orange-50",
		subtitle: "text-orange-600/90 dark:text-orange-400/80",
		content: "text-orange-900/80 dark:text-orange-100/70",
	},
	amber: {
		border: "border-amber-300/70 hover:border-amber-400/80 dark:border-amber-900/50 dark:hover:border-amber-500/50 transition-colors duration-300",
		bgGradient: "from-amber-100/70 dark:from-amber-900/20",
		iconWrapper: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400 dark:border-amber-500/20",
		title: "text-amber-950 dark:text-amber-50",
		subtitle: "text-amber-600/90 dark:text-amber-400/80",
		content: "text-amber-900/80 dark:text-amber-100/70",
	},
	rose: {
		border: "border-rose-300/70 hover:border-rose-400/80 dark:border-rose-900/50 dark:hover:border-rose-500/50 transition-colors duration-300",
		bgGradient: "from-rose-100/70 dark:from-rose-900/20",
		iconWrapper: "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400 dark:border-rose-500/20",
		title: "text-rose-950 dark:text-rose-50",
		subtitle: "text-rose-600/90 dark:text-rose-400/80",
		content: "text-rose-900/80 dark:text-rose-100/70",
	},
	slate: {
		border: "border-slate-300/80 hover:border-slate-400/80 dark:border-slate-800/50 dark:hover:border-slate-500/50 transition-colors duration-300",
		bgGradient: "from-slate-200/70 dark:from-slate-800/30",
		iconWrapper: "bg-slate-500/10 border-slate-500/30 text-slate-700 dark:text-slate-400 dark:border-slate-500/20",
		title: "text-slate-900 dark:text-slate-50",
		subtitle: "text-slate-600/90 dark:text-slate-400/80",
		content: "text-slate-700 dark:text-slate-300/80",
	},
};

export function FeatureCard({ icon: Icon, title, subtitle, theme = "emerald", children, className }: FeatureCardProps) {
	const t = themeClasses[theme];
	return (
		<Card
			className={cn(
				"relative overflow-hidden bg-gradient-to-br to-transparent flex flex-col !p-6",
				t.border,
				t.bgGradient,
				className,
			)}
		>
			<div className="flex items-center gap-4 mb-4">
				<div className={cn("flex-shrink-0 p-3 rounded-xl border", t.iconWrapper)}>
					<Icon className="w-6 h-6" />
				</div>
				<div>
					<h4 className={cn("text-lg font-bold leading-tight", t.title)}>{title}</h4>
					{subtitle && (
						<p className={cn("text-xs font-medium uppercase tracking-wider mt-1.5", t.subtitle)}>{subtitle}</p>
					)}
				</div>
			</div>
			<div className={cn("text-sm mb-5 leading-relaxed flex-1 flex flex-col", t.content)}>{children}</div>
		</Card>
	);
}
