import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import * as LucideIcons from "lucide-react";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { knowledgeBase } from "../../data/knowledge";
import { cn } from "../../utils/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    networking: true, // Default open for better UI
  });
  const location = useLocation();

  const toggleSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIcon = (name: string, size = 18) => {
    const Icon =
      (LucideIcons[name as keyof typeof LucideIcons] as React.ElementType) ||
      LucideIcons.FileText;
    return <Icon size={size} />;
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-card/60 backdrop-blur-3xl border-r border-border/40 shrink-0 text-muted-foreground select-none transition-all duration-500 relative z-40 shadow-2xl",
        isCollapsed ? "w-20" : "w-72",
      )}
    >
      {/* ALWAYS VISIBLE Floating Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          "absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl shadow-primary/30 cursor-pointer z-50 transition-all border border-primary-400 hover:scale-110 active:scale-95",
          isCollapsed ? "opacity-100" : "opacity-100",
        )}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Header */}
      <div
        className={cn(
          "h-16 flex items-center shrink-0 font-bold border-b border-border/30 px-6",
          isCollapsed ? "justify-center px-0" : "px-6 gap-3",
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_25px_rgba(16,185,129,0.1)] transition-all hover:border-primary/40">
          <img src="/logo.svg" className="text-primary w-5 h-5" />
        </div>
        {!isCollapsed && (
          <span className="text-xl tracking-tight font-black bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/40 whitespace-nowrap">
            Under The Hood
          </span>
        )}
      </div>

      {/* Navigation Space */}
      <div
        className={cn(
          "flex-1 overflow-y-auto pt-8 pb-12 flex flex-col custom-scrollbar",
          isCollapsed ? "items-center px-0 gap-4" : "px-4 gap-2",
        )}
      >
        {isCollapsed
          ? // COLLAPSED MODE: Show all topic icons directly for one-click access
            knowledgeBase.map((section) => (
              <div
                key={section.id}
                className="flex flex-col gap-4 items-center w-full"
              >
                {section.topics.map((topic) => (
                  <div key={topic.id} className="relative group/mini">
                    <NavLink
                      to={`/${section.id}/${topic.id}`}
                      className={({ isActive }) =>
                        cn(
                          "p-3 rounded-2xl transition-all border border-transparent cursor-pointer flex items-center justify-center",
                          isActive
                            ? "text-primary bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                            : "text-muted-foreground/40 hover:bg-primary/10 hover:border-primary/30 hover:text-primary",
                        )
                      }
                    >
                      {getIcon(topic.icon, 22)}
                    </NavLink>
                    {/* Floating Tooltip */}
                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-card border border-border shadow-2xl rounded-lg text-[10px] font-black uppercase tracking-widest text-primary opacity-0 pointer-events-none group-hover/mini:opacity-100 transition-all scale-95 group-hover/mini:scale-100 whitespace-nowrap z-50 ring-1 ring-primary/20">
                      {topic.title}
                    </div>
                  </div>
                ))}
                {/* Optional: Small divider between sections even in collapsed mode */}
                <div className="w-8 h-px bg-border/20 last:hidden my-2" />
              </div>
            ))
          : // EXPANDED MODE: Show sections with collapsible accordion
            knowledgeBase.map((section) => {
              const isOpen = openSections[section.id];
              const hasActiveDescendant = section.topics.some((t) =>
                location.pathname.includes(t.id),
              );

              return (
                <div key={section.id} className="mb-4">
                  <button
                    onClick={(e) => toggleSection(section.id, e)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-all group rounded-xl cursor-pointer hover:bg-secondary/20",
                      hasActiveDescendant
                        ? "text-primary"
                        : "text-muted-foreground/40 hover:text-foreground",
                    )}
                  >
                    {section.title}
                    {isOpen ? (
                      <ChevronDown
                        size={14}
                        className="opacity-40 group-hover:opacity-100"
                      />
                    ) : (
                      <ChevronRight
                        size={14}
                        className="opacity-40 group-hover:opacity-100"
                      />
                    )}
                  </button>

                  {isOpen && (
                    <div className="flex flex-col gap-1 mt-2 ml-1 pl-4 border-l border-border/10">
                      {section.topics.map((topic) => (
                        <NavLink
                          key={topic.id}
                          to={`/${section.id}/${topic.id}`}
                          className={({ isActive }) =>
                            cn(
                              "relative group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-300 cursor-pointer font-bold",
                              isActive
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "text-muted-foreground/50 hover:bg-secondary/40 hover:text-foreground",
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <div
                                className={cn(
                                  "transition-all transform",
                                  isActive
                                    ? "text-primary scale-110"
                                    : "text-muted-foreground/40 group-hover:text-primary/60",
                                )}
                              >
                                {getIcon(topic.icon, 16)}
                              </div>
                              <span className="truncate">{topic.title}</span>
                              {isActive && (
                                <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-[3px] h-1/2 bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                              )}
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
      </div>

      {!isCollapsed && (
        <div className="p-6">
          <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-3xl border border-primary/10 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-black uppercase tracking-widest text-primary/70">
              Engine: Sync-Active
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
