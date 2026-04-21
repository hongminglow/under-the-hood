import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const setintervalVsRequestanimationframeTopic: Topic = {
  id: "setinterval-vs-requestanimationframe",
  title: "setInterval vs requestAnimationFrame",
  description:
    "Why your beautiful javascript particles animation totally destroys laptop batteries when hidden in another Chrome tab.",
  tags: ["frontend", "javascript", "performance"],
  icon: "MonitorPlay",
  content: [
    <p key="1">
      Modern browsers use a <strong>Render Loop</strong> to synchronize JavaScript execution with the physical monitor refresh rate (typically 60Hz or 120Hz). Choosing the wrong timer can lead to <strong>Jank</strong> (stuttering) or massive battery drain.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Pulse: Browser vs. Clock
    </h3>,
    <Table
      key="3"
      headers={["Feature", "setInterval (The Timer)", "requestAnimationFrame (The Sync)"]}
      rows={[
        ["Precision", "Low. Subject to <strong>Drift</strong> and Main Thread congestion.", "High. Perfectly synced to the <strong>Vertical Sync (V-Sync)</strong>."],
        ["Background Tabs", "Throttled to ~1fps by the browser (saves battery).", "<strong>Paused</strong> completely when tab is hidden."],
        ["Refresh Rate", "Hardcoded (e.g., 16ms = 60fps).", "Dynamic (automatically adapts to 144Hz/240Hz screens)."],
        ["Execution", "Macro-task (Event Loop).", "Dedicated <strong>Animation Frame</strong> phase."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Problem with setInterval Drift
    </h3>,
    <p key="5" className="mb-4">
      If you set <code>setInterval(1000)</code>, it does NOT mean it will run every 1000.00ms. If the Main Thread is busy calculating a heavy <code>for</code> loop, the timer is delayed. Over time, these delays accumulate, causing <strong>Clock Drift</strong>.
    </p>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="Gaming Mice & Input">
        <p className="text-sm text-slate-400 mb-2">
          High-frequency polling (1,000Hz).
        </p>
        <p className="text-xs italic text-slate-400">
          Using <code>mousemove</code> with <code>setInterval</code> causes "Input Overload". <code>rAF</code> naturally "buffers" these inputs, executing your logic only when a frame is actually ready to be painted.
        </p>
      </Card>
      <Card title="Layout Thrashing">
        <p className="text-sm text-slate-400 mb-2">
          Read/Write cycles in the loop.
        </p>
        <p className="text-xs italic text-slate-400">
          <code>rAF</code> helps prevent "Layout Thrashing" because the browser batches your DOM changes right before the <strong>Layout & Paint</strong> stage of the rendering pipeline.
        </p>
      </Card>
    </Grid>,
    <Callout key="7" type="tip" title="Use setTimeout for Logic, rAF for UI">
      A good rule of thumb: If you are calculating game state (physics, logic), use a fixed-step <code>setTimeout</code> or <code>Web Worker</code>. If you are <strong>moving pixels on the screen</strong>, always use <code>requestAnimationFrame</code>.
    </Callout>,
  ],
};
