import React from "react";
import { cn } from "../../utils/utils";
import { Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

export function Callout({
	children,
	type = "info",
	title,
}: {
	children: React.ReactNode;
	type?: "info" | "warning" | "success" | "tip" | "danger";
	title?: string;
}) {
	const styles = {
		info: {
			icon: Info,
			color: "text-blue-600 dark:text-blue-400",
			bg: "bg-blue-500/8",
			border: "border-blue-500/25",
			label: "Note",
		},
		warning: {
			icon: AlertTriangle,
			color: "text-amber-600 dark:text-amber-400",
			bg: "bg-amber-500/8",
			border: "border-amber-500/25",
			label: "Caution",
		},
		success: {
			icon: CheckCircle,
			color: "text-emerald-600 dark:text-emerald-400",
			bg: "bg-emerald-500/8",
			border: "border-emerald-500/25",
			label: "Requirement",
		},
		tip: {
			icon: Lightbulb,
			color: "text-primary",
			bg: "bg-primary/8",
			border: "border-primary/25",
			label: "Tip",
		},
		danger: {
			icon: AlertTriangle,
			color: "text-rose-600 dark:text-rose-400",
			bg: "bg-rose-500/8",
			border: "border-rose-500/25",
			label: "Danger",
		},
	};

	const config = styles[type];
	const Icon = config.icon;

	return (
		<div className={cn("p-5 rounded-2xl border flex gap-4 my-8", config.bg, config.border)}>
			<Icon className={cn("shrink-0", config.color)} size={20} />
			<div className="space-y-1">
				<p className={cn("text-xs font-black uppercase tracking-[0.2em]", config.color)}>{title || config.label}</p>
				<div className="text-foreground/80 text-sm leading-relaxed">{children}</div>
			</div>
		</div>
	);
}
