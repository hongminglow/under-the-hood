import React from "react";
import { cn } from "../../utils/utils";
import { Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

export function Callout({
  children,
  type = "info",
  title,
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "tip" | "danger";
  title?: string;
}) {
  const styles = {
    info: {
      icon: Info,
      color: "text-blue-400",
      bg: "bg-blue-400/5",
      border: "border-blue-400/20",
      label: "Note",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-amber-400",
      bg: "bg-amber-400/5",
      border: "border-amber-400/20",
      label: "Caution",
    },
    success: {
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/5",
      border: "border-emerald-400/20",
      label: "Requirement",
    },
    tip: {
      icon: Lightbulb,
      color: "text-primary",
      bg: "bg-primary/5",
      border: "border-primary/20",
      label: "Tip",
    },
    danger: {
      icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-500/5",
      border: "border-red-500/20",
      label: "Danger",
    },
  };

  const config = styles[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "p-5 rounded-2xl border flex gap-4 my-8",
        config.bg,
        config.border,
      )}
    >
      <Icon className={cn("shrink-0", config.color)} size={20} />
      <div className="space-y-1">
        <p
          className={cn(
            "text-xs font-black uppercase tracking-[0.2em]",
            config.color,
          )}
        >
          {title || config.label}
        </p>
        <div className="text-foreground/80 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
