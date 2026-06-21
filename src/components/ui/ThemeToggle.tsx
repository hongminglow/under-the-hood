import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/utils";

export function ThemeToggle({ className }: { className?: string }) {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<button
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			title={isDark ? "Switch to light theme" : "Switch to dark theme"}
			className={cn(
				"group relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-secondary/30 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 cursor-pointer",
				className,
			)}
		>
			<Sun
				size={18}
				className={cn(
					"absolute transition-all duration-300",
					isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
				)}
			/>
			<Moon
				size={18}
				className={cn(
					"absolute transition-all duration-300",
					isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0",
				)}
			/>
		</button>
	);
}
