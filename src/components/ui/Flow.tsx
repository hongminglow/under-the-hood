import React from "react";
import { cn } from "../../utils/utils";

export interface FlowStep {
	title: string;
	description?: React.ReactNode;
}

export interface FlowProps {
	steps: FlowStep[];
}

const flowThemeClasses = [
	{
		border: "border-emerald-900/50",
		bg: "bg-gradient-to-b from-emerald-900/20 to-transparent",
		badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
		title: "text-emerald-50",
		arrow: "text-emerald-500/50",
	},
	{
		border: "border-teal-900/50",
		bg: "bg-gradient-to-b from-teal-900/20 to-transparent",
		badge: "bg-teal-500/10 text-teal-400 border-teal-500/30",
		title: "text-teal-50",
		arrow: "text-teal-500/50",
	},
	{
		border: "border-cyan-900/50",
		bg: "bg-gradient-to-b from-cyan-900/20 to-transparent",
		badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
		title: "text-cyan-50",
		arrow: "text-cyan-500/50",
	},
	{
		border: "border-sky-900/50",
		bg: "bg-gradient-to-b from-sky-900/20 to-transparent",
		badge: "bg-sky-500/10 text-sky-400 border-sky-500/30",
		title: "text-sky-50",
		arrow: "text-sky-500/50",
	},
	{
		border: "border-indigo-900/50",
		bg: "bg-gradient-to-b from-indigo-900/20 to-transparent",
		badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
		title: "text-indigo-50",
		arrow: "text-indigo-500/50",
	},
	{
		border: "border-violet-900/50",
		bg: "bg-gradient-to-b from-violet-900/20 to-transparent",
		badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
		title: "text-violet-50",
		arrow: "text-violet-500/50",
	},
];

export function Flow({ steps }: FlowProps) {
	return (
		<div className="my-8 w-full overflow-x-auto pb-6 custom-scrollbar">
			<div className="flex flex-col items-stretch gap-3 px-1 md:inline-flex md:min-w-max md:flex-row md:items-stretch">
				{steps.map((step, index) => {
					const t = flowThemeClasses[index % flowThemeClasses.length];
					return (
						<React.Fragment key={index}>
							<div
								className={cn(
									"flex w-full flex-col rounded-xl border p-5 md:w-[260px] md:flex-none self-stretch overflow-hidden shadow-lg transition-all hover:bg-black/20",
									t.border,
									t.bg,
								)}
							>
								<div className="flex items-center gap-3 mb-3">
									<div
										className={cn(
											"flex shrink-0 items-center justify-center w-7 h-7 rounded-full border text-xs font-bold shadow-sm",
											t.badge,
										)}
									>
										{index + 1}
									</div>
									<h4 className={cn("text-base font-bold leading-tight", t.title)}>
										{step.title.replace(/^\d+\.\s*/, "")}
									</h4>
								</div>
								{step.description && (
									<div className="text-sm text-slate-300 leading-relaxed overflow-hidden">{step.description}</div>
								)}
							</div>
							{index < steps.length - 1 && (
								<div className={cn("flex shrink-0 flex-col items-center justify-center transition-colors", t.arrow)}>
									{/* Right Arrow (Desktop) */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="hidden md:block"
									>
										<path d="M5 12h14" />
										<path d="m12 5 7 7-7 7" />
									</svg>
									{/* Down Arrow (Mobile) */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="md:hidden my-2"
									>
										<path d="M12 5v14" />
										<path d="m19 12-7 7-7-7" />
									</svg>
								</div>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
}
