import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Play, Pause } from "lucide-react";

export const debounceVsThrottleTopic: Topic = {
  id: "debounce-vs-throttle",
  title: "Debounce vs Throttle",
  description:
    "How to logically stop an impatient user from firing 50 identical heavy API requests globally by spamming their mouse cursor.",
  tags: ["frontend", "javascript", "performance"],
  icon: "Clock",
  content: [
    <p key="1">
      Debouncing and Throttling are <strong>Rate-Limiting</strong> strategies used to prevent the main thread from being flooded by high-frequency events (scroll, resize, mousemove).
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Logic Gates
    </h3>,
    <Table
      key="3"
      headers={["Strategy", "Mental Model", "Best For..."]}
      rows={[
        ["Debounce", "The <strong>Quiet Period</strong>. Executes <em>after</em> the user stops performing the action for X ms.", "Search inputs, Window resizing, Auto-save."],
        ["Throttle", "The <strong>Paced Execution</strong>. Executes at most once every X ms, regardless of how many events fire.", "Infinite scroll, Scroll-based animations, Game loops."],
        ["rAF", "The <strong>Browser Sync</strong>. Throttles execution to the browser's refresh rate (usually 60fps).", "Direct DOM manipulations, Canvas drawing."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Leading vs. Trailing Edge
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Play} title="Leading" subtitle="Immediate execution" theme="amber">
        <p className="text-sm text-amber-200/80 mb-2">
          Executes the function <strong>immediately</strong> on the first click, then ignores all subsequent clicks for the duration.
        </p>
        <p className="text-xs italic text-amber-100/70">
          Perfect for "Submit" buttons to prevent double-charging a credit card.
        </p>
      </FeatureCard>
      <FeatureCard icon={Pause} title="Trailing" subtitle="Wait, then fire once" theme="teal">
        <p className="text-sm text-teal-200/80 mb-2">
          Waits for the events to stop, then executes the function <strong>once</strong> at the very end.
        </p>
        <p className="text-xs italic text-teal-100/70">
          Standard for Search bars to ensure you only fetch once the user is done typing.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The React 'Closure' Trap
    </h3>,
    <p key="7" className="mb-4">
      If you create a debounced function inside a React component without <code>useMemo</code>, a <strong>new closure</strong> is created on every render. This wipes the internal <code>timerID</code>, causing the debounce to fail.
    </p>,
    <Callout key="8" type="warning" title="Memory Leaks">
      Always <strong>Cancel</strong> your timers on unmount. If a user types into a search bar and then immediately navigates away, the <code>setTimeout</code> may still fire, trying to update the state of a component that no longer exists (causing a memory leak or crash).
    </Callout>,
  ],
};
