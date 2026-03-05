import { useParams, Navigate } from "react-router";
import React from "react";
import { getTopicById, getSectionByTopicId } from "@/data/knowledge";
import { ChevronRight, FileText, Globe } from "lucide-react";
import * as LucideIcons from "lucide-react";

export function TopicView() {
  const { topicId } = useParams();

  if (!topicId) return <Navigate to="/networking/tcp-ip" />;

  const topic = getTopicById(topicId);
  const section = getSectionByTopicId(topicId);

  // Helper for dynamic icon rendering
  const getIcon = (name: string, size = 18) => {
    const Icon =
      (LucideIcons[name as keyof typeof LucideIcons] as React.ElementType) ||
      LucideIcons.FileText;
    return <Icon size={size} />;
  };

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground gap-10 animate-in fade-in duration-1000">
        <div className="w-24 h-24 rounded-3xl border border-dashed border-border/80 flex items-center justify-center bg-primary/5">
          <FileText size={48} className="opacity-20 translate-y-1" />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-foreground uppercase">
            Missing Segment
          </h2>
          <p className="max-w-xs mx-auto text-muted-foreground/60 font-semibold tracking-tight">
            The selected documentation node could not be matched with current
            repository state.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12 selection:bg-primary/30">
      {/* Dynamic Breadcrumbs */}
      <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/40 mb-16 animate-in slide-in-from-left-4 duration-700">
        <div className="px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/20 text-primary transition-all cursor-pointer flex items-center gap-2 group hover:border-primary/50">
          <Globe
            size={12}
            className="group-hover:scale-110 transition-transform"
          />
          <span>{section?.title || "System"}</span>
        </div>
        <ChevronRight size={14} className="opacity-20" />
        <span className="text-foreground/80 px-3 py-1.5 border border-border/40 rounded-xl bg-secondary/10 shadow-xl">
          {topic.title}
        </span>
      </nav>

      {/* Primary Hero Section - SMALLER FONT & TIGHTER GAP */}
      <header className="mb-12 animate-in slide-in-from-bottom-6 fade-in-0 duration-1000 fill-mode-both">
        <div className="flex items-center gap-3 text-primary mb-6 font-mono text-[10px] uppercase font-black tracking-widest">
          {getIcon(topic.icon, 14)}
          <span>Verified Segment</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-linear-to-br from-foreground to-foreground/40 leading-normal">
          {topic.title}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground/60 leading-relaxed max-w-3xl font-bold tracking-tight border-l-2 border-primary/20 pl-6">
          {topic.description}
        </p>

        {topic.tags && topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-10">
            {topic.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-primary/5 text-primary-400 border border-primary/20 shadow-xl hover:bg-primary/20 transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content Rendering (with JSX Support) */}
      <article className="prose prose-invert prose-emerald max-w-none border-t border-border/10 animate-in fade-in-0 duration-1000 delay-300 fill-mode-both">
        <div className="leading-[1.9] text-foreground/80 font-semibold text-lg antialiased space-y-4">
          {topic.content.map((block, index) => (
            <React.Fragment key={index}>{block}</React.Fragment>
          ))}
        </div>
      </article>

      {/* Semantic Footer */}
      <div className="mt-32 pt-16 border-t border-border/10 flex items-center justify-between opacity-30 hover:opacity-100 transition-all duration-500">
        <div className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
          Reference: {topic.id}
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-400 flex items-center gap-3 cursor-pointer group">
          Synchronize with Cloud{" "}
          <ChevronRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
