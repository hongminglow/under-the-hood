import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { Search } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { GlobalSearch } from "../ui/GlobalSearch";

export function AppLayout() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setIsSearchOpen(true);
			}
		};

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsSearchOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keydown", handleEsc);
		};
	}, []);

	const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

	return (
		<div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/20">
			<Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

			<main className="flex-1 flex flex-col relative min-w-0 overflow-hidden transition-all duration-500">
				{/* Header containing search trigger only (Sidebar toggle is now floating) */}
				<header className="h-16 shrink-0 border-b border-border/40 flex items-center justify-between px-8 bg-card/20 backdrop-blur-3xl z-30">
					<div className="flex-1 flex justify-end">
						<button
							onClick={() => setIsSearchOpen(true)}
							className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-secondary/20 text-muted-foreground/60 hover:text-foreground hover:bg-secondary/40 outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all text-[13px] border border-border/60 hover:border-primary/20 cursor-pointer shadow-lg shadow-background/50 active:scale-95"
						>
							<Search className="w-4 h-4 group-hover:text-primary transition-colors" />
							<span className="hidden sm:inline-block font-bold tracking-tight">Search the Knowledge Base...</span>
							<span className="hidden md:inline-block text-[10px] font-black px-2.5 py-1 rounded-lg bg-background/80 border border-border/80 ml-4 whitespace-nowrap opacity-60">
								CTRL K
							</span>
						</button>
					</div>
				</header>

				{/* Content Area */}
				<div
					key={location.pathname}
					className="flex-1 overflow-y-auto px-8 pt-10 md:px-20 md:pt-20 relative animate-in fade-in slide-in-from-bottom-6 duration-1000 custom-scrollbar"
				>
					<div className="max-w-5xl mx-auto">
						<Outlet />
					</div>
				</div>
			</main>

			<GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

			<ScrollRestoration getKey={(location) => location.pathname} />
		</div>
	);
}
