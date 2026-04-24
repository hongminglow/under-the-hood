import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Cpu, Layers, Zap } from "lucide-react";

export const virtualDomVsSignalsTopic: Topic = {
  id: "virtual-dom-vs-signals",
  title: "Virtual DOM vs Signals",
  description:
    "Why new heavily hyped frameworks are officially abandoning React's core VDOM architecture entirely.",
  tags: ["frontend", "react", "architecture"],
  icon: "Layers",
  content: [
    <p key="1">
      For ten years, React's Virtual DOM was considered the pinnacle of engineering. However, the physical reality is that comparing two massive identical JSON trees mathematically millions of times per minute just to hunt for a single changed <code>{"<label>"}</code> wastes heavy CPU cycles and mobile battery.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Next Paradigm
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Layers} title="The VDOM Tax" subtitle="React: top-down reconciliation" theme="amber">
        <p className="mb-3 text-amber-100/80">
          When a parent component updates state, React natively re-runs the entire function for practically every single child component down the tree automatically.
        </p>
        <p className="text-amber-100/75">
          You are forced to strategically use <code>React.memo</code> or <code>useMemo</code> to stop this top-down execution
          cascade. The framework keeps the mental model simple, but the optimization burden moves to the developer.
        </p>
      </FeatureCard>
      <FeatureCard icon={Zap} title="Signals" subtitle="Solid / Preact: fine-grained reactivity" theme="emerald">
        <p className="mb-3 text-emerald-100/80">
          Signals are mathematically reactive nodes. When <code>count</code> updates, only the exact <code>{"<span>count</span>"}</code> text binding physically updates directly.
        </p>
        <p className="text-emerald-100/75">
          There is no VDOM diff for that change. It skips the parent component, skips unrelated children, and targets the
          physical DOM binding surgically, closer to how an Excel cell updates its dependents.
        </p>
      </FeatureCard>
    </Grid>,
    <FeatureCard key="4" icon={Cpu} title="The Inevitable Convergence" subtitle="React tries to recover signal-like precision" theme="amber">
      <p className="text-amber-100/80">
        React is fully aware of its CPU tax. The React Compiler analyzes component trees and inserts memoization automatically,
        aiming for a signal-like performance profile without forcing teams to rewrite an entire React codebase.
      </p>
    </FeatureCard>,
  ],
};
