import React from "react";
import type { ElementType } from "react";
import { Card } from "./Card";
import { cn } from "../../utils/utils";

export type FeatureTheme = "emerald" | "teal" | "cyan" | "sky" | "indigo" | "violet" | "purple" | "fuchsia" | "orange" | "amber" | "rose" | "slate";

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

const themeClasses: Record<FeatureTheme, ThemeClasses> = {
	emerald: {
		border: "border-red-900/50 hover:border-red-500/50 transition-colors duration-300",
		bgGradient: "from-red-900/20",
		iconWrapper: "bg-red-500/10 border-red-500/20 text-red-400",
		title: "text-red-50",
		subtitle: "text-red-400/80",
		content: "text-red-100/70",
	},
	teal: {
		border: "border-teal-900/50 hover:border-teal-500/50 transition-colors duration-300",
		bgGradient: "from-teal-900/20",
		iconWrapper: "bg-teal-500/10 border-teal-500/20 text-teal-400",
		title: "text-teal-50",
		subtitle: "text-teal-400/80",
		content: "text-teal-100/70",
	},
	cyan: {
		border: "border-cyan-900/50 hover:border-cyan-500/50 transition-colors duration-300",
		bgGradient: "from-cyan-900/20",
		iconWrapper: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
		title: "text-cyan-50",
		subtitle: "text-cyan-400/80",
		content: "text-cyan-100/70",
	},
	sky: {
		border: "border-sky-900/50 hover:border-sky-500/50 transition-colors duration-300",
		bgGradient: "from-sky-900/20",
		iconWrapper: "bg-sky-500/10 border-sky-500/20 text-sky-400",
		title: "text-sky-50",
		subtitle: "text-sky-400/80",
		content: "text-sky-100/70",
	},
	indigo: {
		border: "border-indigo-900/50 hover:border-indigo-500/50 transition-colors duration-300",
		bgGradient: "from-indigo-900/20",
		iconWrapper: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
		title: "text-indigo-50",
		subtitle: "text-indigo-400/80",
		content: "text-indigo-100/70",
	},
	violet: {
		border: "border-violet-900/50 hover:border-violet-500/50 transition-colors duration-300",
		bgGradient: "from-violet-900/20",
		iconWrapper: "bg-violet-500/10 border-violet-500/20 text-violet-400",
		title: "text-violet-50",
		subtitle: "text-violet-400/80",
		content: "text-violet-100/70",
	},
	purple: {
		border: "border-purple-900/50 hover:border-purple-500/50 transition-colors duration-300",
		bgGradient: "from-purple-900/20",
		iconWrapper: "bg-purple-500/10 border-purple-500/20 text-purple-400",
		title: "text-purple-50",
		subtitle: "text-purple-400/80",
		content: "text-purple-100/70",
	},
	fuchsia: {
		border: "border-fuchsia-900/50 hover:border-fuchsia-500/50 transition-colors duration-300",
		bgGradient: "from-fuchsia-900/20",
		iconWrapper: "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400",
		title: "text-fuchsia-50",
		subtitle: "text-fuchsia-400/80",
		content: "text-fuchsia-100/70",
	},
	orange: {
		border: "border-orange-900/50 hover:border-orange-500/50 transition-colors duration-300",
		bgGradient: "from-orange-900/20",
		iconWrapper: "bg-orange-500/10 border-orange-500/20 text-orange-400",
		title: "text-orange-50",
		subtitle: "text-orange-400/80",
		content: "text-orange-100/70",
	},
	amber: {
		border: "border-amber-900/50 hover:border-amber-500/50 transition-colors duration-300",
		bgGradient: "from-amber-900/20",
		iconWrapper: "bg-amber-500/10 border-amber-500/20 text-amber-400",
		title: "text-amber-50",
		subtitle: "text-amber-400/80",
		content: "text-amber-100/70",
	},
	rose: {
		border: "border-rose-900/50 hover:border-rose-500/50 transition-colors duration-300",
		bgGradient: "from-rose-900/20",
		iconWrapper: "bg-rose-500/10 border-rose-500/20 text-rose-400",
		title: "text-rose-50",
		subtitle: "text-rose-400/80",
		content: "text-rose-100/70",
	},
	slate: {
		border: "border-slate-800/50 hover:border-slate-500/50 transition-colors duration-300",
		bgGradient: "from-slate-800/30",
		iconWrapper: "bg-slate-500/10 border-slate-500/20 text-slate-400",
		title: "text-slate-50",
		subtitle: "text-slate-400/80",
		content: "text-slate-300/80",
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
