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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const allTopics = getAllTopics();
  const fuse = useMemo(
    () =>
      new Fuse(allTopics, {
        // Tags and title outweigh description so the topic's own identity wins.
        keys: [
          { name: "tags", weight: 2 },
          { name: "title", weight: 1.5 },
          { name: "description", weight: 0.5 },
        ],
        threshold: 0.4,
        ignoreLocation: true, // match anywhere, not just near the start
        includeScore: true,
      }),
    [allTopics],
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setQuery("");
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return [];

    // Fuse: lower score = better match. Layer deterministic boosts on top so an
    // exact tag or the topic's own title always ranks first, never 2nd/3rd.
    return fuse
      .search(query)
      .map((result) => {
        const topic = result.item as Topic;
        const title = topic.title.toLowerCase();
        const tags = topic.tags.map((t) => t.toLowerCase());
        let score = result.score ?? 1;

        if (tags.includes(q)) score -= 0.6; // exact tag (e.g. "dns", "grpc", "rest")
        if (title === q || title.startsWith(`${q} `) || title.startsWith(`${q}:`)) {
          score -= 0.6; // title is, or leads with, the query
        } else if (title.includes(q)) {
          score -= 0.2; // query appears somewhere in the title
        }
        if (topic.id.toLowerCase() === q) score -= 0.4; // exact id

        return { topic, score };
      })
      .sort((a, b) => a.score - b.score)
      .map((r) => r.topic);
  }, [query, fuse]);

  // Auto-scroll selected item into view in the results container
  useEffect(() => {
    if (resultsContainerRef.current) {
      const selectedEl = resultsContainerRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    if (results.length === 0) return;

    // Arrow keys or mapping Ctrl+S / Ctrl+W to Down/Up mapping
    if (e.key === "ArrowDown" || (e.ctrlKey && e.key.toLowerCase() === "s")) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (
      e.key === "ArrowUp" ||
      (e.ctrlKey && e.key.toLowerCase() === "w")
    ) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const topic = results[selectedIndex];
      if (topic) {
        handleSelect(topic.id, getSectionForTopic(topic.id));
      }
    }
  };

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
          <Search className="w-6 h-6 text-primary shadow-[0_0_10px_rgba(98,181,140,0.3)]" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-xl font-medium"
            placeholder="What knowledge are you looking for?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
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
            <div className="flex flex-col gap-1.5" ref={resultsContainerRef}>
              {results.map((topic, i) => {
                const secId = getSectionForTopic(topic.id);
                const isSelected = i === selectedIndex;
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleSelect(topic.id, secId)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={cn(
                      "w-full text-left flex items-center gap-4 py-2.5 px-3 rounded-xl transition-all border border-transparent cursor-pointer hover:bg-primary/10 hover:border-primary/20 group relative overflow-hidden",
                      isSelected
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
                              className="text-[9px] font-extrabold uppercase tracking-widest bg-primary/10 text-primary px-1.5 py-0.5 rounded-md border border-primary/20"
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
