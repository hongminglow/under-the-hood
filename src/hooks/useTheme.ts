import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

function getInitialTheme(): Theme {
	if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
		return "dark";
	}
	return "light";
}

/**
 * Reads/writes the active theme. The initial `.dark` class is set by the
 * pre-paint script in index.html, so there is no flash on load.
 */
export function useTheme() {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		try {
			localStorage.setItem("theme", theme);
		} catch {
			/* storage unavailable — ignore */
		}
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

	return { theme, setTheme, toggleTheme };
}
