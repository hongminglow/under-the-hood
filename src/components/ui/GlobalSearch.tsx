import { useState, useEffect, useRef, useMemo } from "react";
import Fuse from "fuse.js";
import { Search, Command, BookOpen, Hash, ArrowUpRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getAllTopics, knowledgeBase } from "@/data/knowledge";
import type { Topic } from "@/data/knowledge";
import { useNavigate } from "react-router";
import { cn } from "@/utils/utils";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const allTopics = getAllTopics();
  const fuse = useMemo(
    () =>
      new Fuse(allTopics, {
        keys: ["title", "tags", "description"],
        threshold: 0.4,
        includeScore: true,
      }),
    [allTopics],
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (query.trim() === "") return [];
    return fuse.search(query).map((result) => result.item as Topic);
  }, [query, fuse]);

  const handleSelect = (topicId: string, sectionId: string) => {
    navigate(`/${sectionId}/${topicId}`);
    onClose();
  };

  const getSectionForTopic = (tId: string) => {
    return (
      knowledgeBase.find((s) => s.topics.some((t) => t.id === tId))?.id || ""
    );
  };

  const getIcon = (name: string, size = 16) => {
    const Icon =
      (LucideIcons[name as keyof typeof LucideIcons] as React.ElementType) ||
      BookOpen;
    return <Icon size={size} />;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] bg-background/40 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-card border-2 border-border/40 shadow-2xl shadow-primary/20 rounded-3xl overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-primary/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-6 py-5 border-b border-border/60 gap-4 bg-secondary/20">
          <Search className="w-6 h-6 text-primary shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-xl font-medium"
            placeholder="What knowledge are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background/60 text-xs text-muted-foreground font-bold border border-border/80 shadow-sm">
            <span>ESC</span>
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-3 custom-scrollbar">
          {query.trim() !== "" && results.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground flex flex-col items-center gap-4">
              <Hash size={40} className="opacity-10" />
              <p className="text-lg">
                No findings for{" "}
                <span className="text-primary-300 font-bold">"{query}"</span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {results.map((topic, i) => {
                const secId = getSectionForTopic(topic.id);
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleSelect(topic.id, secId)}
                    className={cn(
                      "w-full text-left flex items-center gap-4 py-2.5 px-3 rounded-xl transition-all border border-transparent cursor-pointer hover:bg-primary/10 hover:border-primary/20 group relative overflow-hidden",
                      i === 0 && query !== ""
                        ? "bg-primary/5 border-primary/10 ring-1 ring-primary/5 shadow-inner"
                        : "hover:bg-secondary/40",
                    )}
                  >
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-secondary/60 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shadow-sm">
                      {getIcon(topic.icon, 16)}
                    </div>

                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-[15px] leading-tight text-foreground group-hover:text-primary transition-colors truncate">
                          {topic.title}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
                        />
                      </div>

                      {topic.description && (
                        <p className="text-[13px] text-muted-foreground/80 line-clamp-1 group-hover:text-muted-foreground transition-colors mt-0.5">
                          {topic.description}
                        </p>
                      )}

                      {topic.tags && topic.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {topic.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-400/90 px-1.5 py-0.5 rounded-md border border-emerald-500/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          {!query && (
            <div className="p-20 text-center text-muted-foreground flex flex-col items-center gap-6 opacity-40">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center">
                <Command size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold tracking-tight">
                  Global Search
                </p>
                <p className="text-sm max-w-xs mx-auto">
                  Access the entire knowledge base with high-precision fuzzy
                  indexing.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
