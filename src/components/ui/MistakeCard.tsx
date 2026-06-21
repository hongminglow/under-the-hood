import React from "react";
import { cn } from "../../utils/utils";

interface MistakeCardProps {
	number: number;
	title: string;
	problem: string | React.ReactNode;
	solution: string | React.ReactNode;
	children?: React.ReactNode;
	className?: string;
}

export function MistakeCard({ number, title, problem, solution, children, className }: MistakeCardProps) {
	return (
		<div
			className={cn(
				"group relative rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-6 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all mb-4",
				className,
			)}
		>
			{/* Title with inline number badge */}
			<h4 className="text-base font-bold text-foreground mb-3 flex items-center gap-3">
				<span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/15 border border-rose-500/30 text-xs font-bold text-rose-600 dark:text-rose-300 shadow-md flex-shrink-0">
					{number}
				</span>
				{title}
			</h4>

			{/* Problem */}
			<div className="mb-4 pl-4 border-l-2 border-rose-500/40">
				<p className="text-sm text-foreground/85">
					<strong className="text-rose-600 dark:text-rose-400">Problem:</strong>
					<span className="ml-2">{problem}</span>
				</p>
			</div>

			{/* Additional Content (code examples, etc.) */}
			{children && <div className="mb-4">{children}</div>}

			{/* Solution */}
			<div className="pl-4 border-l-2 border-emerald-500/40">
				<p className="text-sm text-foreground/85">
					<strong className="text-emerald-600 dark:text-emerald-400">Solution:</strong>
					<span className="ml-2">{solution}</span>
				</p>
			</div>
		</div>
	);
}
