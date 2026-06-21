import React from "react";
import { cn } from "../../utils/utils";

export function Highlight({
	children,
	variant = "primary",
}: {
	children: React.ReactNode;
	variant?: "primary" | "warning" | "info";
}) {
	const variants = {
		primary: "bg-primary/10 text-primary border-primary/25",
		warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
		info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
	};

	return (
		<span
			className={cn(
				"px-1.5 py-0.5 rounded-md border text-[13px] font-bold tracking-tight",
				variants[variant],
			)}
		>
			{children}
		</span>
	);
}
