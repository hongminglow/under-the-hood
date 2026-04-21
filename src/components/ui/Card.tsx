import React from "react";
import { cn } from "../../utils/utils";

interface CardProps {
	title?: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
}

export function Card({ title, description, children, className }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-2xl border border-border/60 bg-[#02120a]/40 backdrop-blur-md p-6 shadow-2xl transition-all hover:bg-[#02120a]/60 hover:border-primary/30 group mb-2",
				className,
			)}
		>
			{(title || description) && (
				<div className="mb-4 space-y-1">
					{title && (
						<h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
							{title}
						</h3>
					)}
					{description && (
						<p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60">
							{description}
						</p>
					)}
				</div>
			)}
			<div className="text-slate-300 leading-relaxed text-sm">{children}</div>
		</div>
	);
}
