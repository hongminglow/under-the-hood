import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";

export const setIntervalVsRequestAnimationFrameTopic: Topic = {
  id: "setinterval-vs-requestanimationframe",
  title: "setInterval vs requestAnimationFrame",
  description:
    "How browsers schedule timers vs frames: animation smoothness, tab throttling, drift, rendering cost, and GC pressure.",
  tags: ["javascript", "browser", "performance", "animation", "timers", "ui"],
  icon: "Timer",
  content: [
    <p key="1">
      <code>setInterval</code> is a <strong>time-based</strong> scheduler (“run
      this every N ms”). <code>requestAnimationFrame</code> (rAF) is a{" "}
      <strong>frame-based</strong> scheduler (“run this right before the next
      paint”). If your work affects what users see on screen, rAF is usually the
      correct primitive because it aligns your updates with the browser’s
      rendering pipeline.
    </p>,
    <Grid key="2" cols={3} gap={6} className="my-8">
      <Card title="setInterval" description="Periodic timer (macrotask)">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Fires tasks on the event loop roughly every <code>N</code>{" "}
            milliseconds.
          </li>
          <li>
            Not synchronized to paint → can cause jank if it triggers DOM work
            mid-frame.
          </li>
          <li>
            In background tabs, browsers commonly{" "}
            <Highlight variant="warning">throttle</Highlight> or{" "}
            <Highlight variant="warning">clamp</Highlight> timer frequency to
            reduce CPU/battery usage.
          </li>
        </ul>
      </Card>
      <Card title="requestAnimationFrame" description="Pre-paint callback">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Runs callbacks <strong>before</strong> the next repaint (often ~60Hz,
            but can be 90/120/144Hz).
          </li>
          <li>
            Automatically pauses or slows dramatically when the page is not
            visible → better for battery and avoids “wasted frames”.
          </li>
          <li>
            Provides a high-resolution timestamp to compute frame{" "}
            <Highlight variant="primary">delta time</Highlight>.
          </li>
        </ul>
      </Card>
      <Card title="setTimeout loop" description="Timer with drift control">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            For repeating non-visual work, a recursive <code>setTimeout</code>{" "}
            loop often behaves better than <code>setInterval</code>.
          </li>
          <li>
            You can compensate for drift and avoid “pile-ups” after long tasks.
          </li>
          <li>
            Still subject to background throttling and minimum-delay clamping.
          </li>
        </ul>
      </Card>
    </Grid>,
    <Table
      key="3"
      headers={["Dimension", "setInterval", "requestAnimationFrame", "What matters"]}
      rows={[
        [
          "Primary goal",
          "Run on a clock",
          "Run on a frame",
          "Animations need frames; polling needs time",
        ],
        [
          "Aligned with paint?",
          <>
            <Highlight variant="warning">No</Highlight>
          </>,
          <>
            <Highlight variant="primary">Yes</Highlight>
          </>,
          "Paint-alignment reduces jank and wasted layout/paint work",
        ],
        [
          "Hidden tab behavior",
          "Often clamped/throttled",
          "Often paused",
          "Neither is reliable for accurate background timing",
        ],
        [
          "Timer accuracy",
          "Can drift/jitter under load",
          "Frame time varies with refresh + load",
          "Both depend on main thread availability",
        ],
        [
          "Best for…",
          <>
            Polling, heartbeats, retry loops, non-visual periodic tasks (with
            backoff)
          </>,
          <>
            Smooth UI animations, canvas games, scroll-linked effects, visual
            progress
          </>,
          "Use the primitive that matches the system you’re coordinating with",
        ],
      ]}
    />,
    <h4 key="4" className="text-xl font-bold mt-10 mb-4">
      When to use each (practical rules)
    </h4>,
    <Grid key="5" cols={2} gap={6}>
      <Card title="Use requestAnimationFrame when…">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Your code <strong>updates visuals</strong> (DOM styles, canvas draw,
            WebGL).
          </li>
          <li>
            You need <Highlight variant="primary">smoothness</Highlight> and
            want the browser to coalesce work into a single frame.
          </li>
          <li>
            You want the loop to naturally stop when the tab is not visible
            (battery-friendly).
          </li>
        </ul>
      </Card>
      <Card title="Use setInterval / setTimeout loop when…">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You’re doing <strong>non-visual</strong> periodic work (polling an
            API, refreshing auth tokens, metrics/telemetry).
          </li>
          <li>
            You want explicit control over cadence (including{" "}
            <Highlight variant="primary">backoff</Highlight>).
          </li>
          <li>
            You understand that background tabs may throttle your timers, and
            you can tolerate delays.
          </li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="6" type="warning" title="Avoid setInterval for animations">
      A 16ms <code>setInterval</code> does <em>not</em> mean 60 FPS. The callback
      can run late (main thread busy), run off-frame (mid-render), and create
      extra style/layout work. rAF is designed specifically to integrate with
      the browser’s “update → layout → paint → composite” loop.
    </Callout>,
    <h4 key="7" className="text-xl font-bold mt-10 mb-4">
      Tab throttling, page visibility, and “why did my timer slow down?”
    </h4>,
    <p key="8">
      Modern browsers aggressively protect battery and responsiveness. When a
      tab is hidden, timer-based APIs (<code>setTimeout</code>,{" "}
      <code>setInterval</code>) are commonly{" "}
      <Highlight variant="warning">clamped</Highlight> to a minimum delay and/or{" "}
      <Highlight variant="warning">throttled</Highlight>. rAF usually{" "}
      <Highlight variant="warning">pauses</Highlight> because there is no reason
      to paint frames you cannot see.
    </p>,
    <CodeBlock
      key="9"
      language="javascript"
      title="Pause work when the tab is hidden (recommended for both)"
      code={`let intervalId = 0;
let rafId = 0;

function startPolling() {
  stopPolling();
  intervalId = window.setInterval(() => {
    // background-friendly: tolerate throttling
    pollServer();
  }, 5000);
}

function stopPolling() {
  if (intervalId) window.clearInterval(intervalId);
  intervalId = 0;
}

function startAnimation() {
  stopAnimation();
  const loop = (now) => {
    renderFrame(now);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
}

function stopAnimation() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopPolling();
    stopAnimation();
  } else {
    startPolling();
    startAnimation();
  }
});`}
    />,
    <h4 key="10" className="text-xl font-bold mt-10 mb-4">
      Frame budget, rendering load, and jank
    </h4>,
    <p key="11">
      Smooth UI is about meeting the <strong>frame budget</strong>. At 60Hz you
      have ~16.7ms to do everything: JS, style calculation, layout, paint, and
      compositing. At 120Hz the budget is ~8.3ms. rAF helps because it schedules
      your work right before paint, giving you the best chance to produce one
      coherent frame.
    </p>,
    <div key="12" className="mt-6">
      <Step index={1}>
        <strong>Measure:</strong> read DOM layout once (e.g.{" "}
        <code>getBoundingClientRect</code>), cache the values.
      </Step>
      <Step index={2}>
        <strong>Mutate:</strong> apply DOM writes together (prefer{" "}
        <code>transform</code>/<code>opacity</code> over layout-affecting
        properties).
      </Step>
      <Step index={3}>
        <strong>Render:</strong> the browser runs layout/paint/composite and
        presents the frame.
      </Step>
    </div>,
    <CodeBlock
      key="13"
      language="javascript"
      title="A canonical rAF loop with delta time (animations, games, canvas)"
      code={`let rafId = 0;
let last = performance.now();

function frame(now) {
  const dt = now - last; // ms since previous frame
  last = now;

  update(dt);
  render();

  rafId = requestAnimationFrame(frame);
}

rafId = requestAnimationFrame(frame);`}
    />,
    <Callout key="14" type="info" title="rAF doesn’t guarantee 60 FPS">
      rAF schedules work <em>with</em> the renderer, but you can still miss the
      frame budget if your callback is heavy or if the browser is doing expensive
      layout/paint. rAF is a coordination primitive, not a performance miracle.
    </Callout>,
    <h4 key="15" className="text-xl font-bold mt-10 mb-4">
      Drift, catch-up, and stable simulation (why “16ms” is a trap)
    </h4>,
    <p key="16">
      Both timers and rAF are <strong>best-effort</strong>. If the main thread is
      busy, your callback runs late. For physics/simulation, you often want a
      fixed timestep (e.g. 60 updates/second) and you “catch up” when frames are
      delayed.
    </p>,
    <CodeBlock
      key="17"
      language="javascript"
      title="Fixed-timestep rAF loop (stable simulation + smooth rendering)"
      code={`const STEP = 1000 / 60; // 60hz simulation step (ms)
let last = performance.now();
let acc = 0;

function frame(now) {
  acc += now - last;
  last = now;

  // Catch up simulation in fixed steps
  while (acc >= STEP) {
    update(STEP);
    acc -= STEP;
  }

  // Optional interpolation factor for rendering
  const alpha = acc / STEP;
  render(alpha);

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);`}
    />,
    <CodeBlock
      key="18"
      language="javascript"
      title="A drift-compensated setTimeout loop (better than setInterval for polling)"
      code={`const PERIOD = 5000;
let expected = performance.now() + PERIOD;

function tick() {
  const now = performance.now();
  const drift = now - expected; // +drift means we ran late

  pollServer();

  expected += PERIOD;
  setTimeout(tick, Math.max(0, PERIOD - drift));
}

setTimeout(tick, PERIOD);`}
    />,
    <h4 key="19" className="text-xl font-bold mt-10 mb-4">
      Garbage collection (GC) and allocation pressure in loops
    </h4>,
    <p key="20">
      Neither <code>setInterval</code> nor rAF “triggers GC”. What triggers GC is
      <strong>allocation rate</strong>. Animation loops that allocate new arrays,
      objects, or strings every tick create GC pressure and can introduce
      visible stutters.
    </p>,
    <Callout key="21" type="tip" title="How to keep loops GC-friendly">
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Reuse objects/arrays; avoid creating garbage in hot paths (per-frame,
          per-tick).
        </li>
        <li>
          Avoid layout thrash (forced synchronous layout) — it’s often worse than
          GC for jank.
        </li>
        <li>
          Prefer CSS compositor-friendly properties (<code>transform</code>,{" "}
          <code>opacity</code>) so rendering stays cheap.
        </li>
        <li>
          Use backoff for polling when the app is idle or offline.
        </li>
      </ul>
    </Callout>,
    <h4 key="22" className="text-xl font-bold mt-10 mb-4">
      Related scheduling tools worth knowing
    </h4>,
    <Grid key="23" cols={2} gap={6} className="my-8">
      <Card title="requestIdleCallback" description="Low-priority background work">
        Best-effort work when the browser is idle (analytics batching, prefetch,
        cleanup). Not for anything user-visible and not supported uniformly in
        every environment.
      </Card>
      <Card title="Web Workers" description="Move heavy work off the main thread">
        If your work is CPU-heavy (parsing, compression, data transforms), move
        it off the main thread. You can still use rAF on the main thread for
        rendering while the worker computes in parallel.
      </Card>
    </Grid>,
  ],
};

