import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const reactTransitionsDeferredTopic: Topic = {
  id: "react-transitions-deferred",
  title: "startTransition & useDeferredValue: React's Scheduler Internals",
  description:
    "How React 19's concurrent APIs defer work to lower-priority lanes, yield back to the browser via MessageChannel, and time-slice the render tree — without ever blocking a keypress.",
  icon: "Timer",
  tags: [
    "react",
    "react 19",
    "startTransition",
    "useDeferredValue",
    "concurrent mode",
    "scheduler",
    "lanes",
    "time-slicing",
    "performance",
  ],
  content: [
    <p key="intro" className="mb-6">
      You type into a search box connected to a 10,000-row filtered table. Every
      keystroke triggers a re-render of the whole list. The UI freezes.{" "}
      <code>startTransition</code> and <code>useDeferredValue</code> solve this
      — but not through a simple timer delay. They reach deep into React's
      internal scheduler, lane priority system, and the browser's event loop
      using a trick most developers have never heard of.
    </p>,

    <h3 key="h-root" className="text-xl font-bold mt-8 mb-4">
      The Root Problem: Synchronous, Uninterruptible Renders
    </h3>,

    <Grid key="grid-problem" cols={2} gap={6}>
      <Card title="Before Concurrent Mode (React ≤ 17)" description="The blocking render model.">
        <p className="text-sm text-muted-foreground mb-2">
          In React's legacy mode, a state update triggered a completely
          synchronous render. React would walk the entire Fiber tree, compute
          every diff, and commit all DOM mutations before yielding back to the
          browser — even if that took 400ms.
        </p>
        <p className="text-sm text-muted-foreground">
          During those 400ms the browser's main thread was fully blocked.
          Keystrokes were queued. Animations froze. The page felt dead.
        </p>
      </Card>
      <Card title="The Browser's Frame Budget" description="Why 16ms matters.">
        <p className="text-sm text-muted-foreground mb-2">
          A 60fps display gives the browser exactly{" "}
          <Highlight variant="warning">16.6ms</Highlight> per frame to run all
          JS, handle events, run layout, and paint. Any JS task longer than
          ~5ms starts to push frames over budget and creates visible jank.
        </p>
        <p className="text-sm text-muted-foreground">
          React's answer: break work into small chunks (
          <strong>time-slicing</strong>) and yield back to the browser between
          chunks so it can handle paint and input events.
        </p>
      </Card>
    </Grid>,

    <h3 key="h-arch" className="text-xl font-bold mt-12 mb-4">
      The Architecture: Fiber + Lanes + Scheduler
    </h3>,

    <p key="p-arch" className="mb-6">
      Three separate systems work together to make concurrent rendering possible.
      Understanding each layer is key to understanding what{" "}
      <code>startTransition</code> actually does.
    </p>,

    <Flow
      key="flow-arch"
      steps={[
        {
          title: "Fiber Tree",
          description:
            "Every component is a Fiber node — a plain JS object holding component type, props, state, hooks, child/sibling/parent pointers, and crucially: a `lanes` bitmask. This double-buffered tree (current tree + work-in-progress tree) is what makes interruptible rendering possible.",
        },
        {
          title: "Lane Model (Priority Bitmask)",
          description:
            "Each pending update is tagged with a lane — a 31-bit bitmask value. React defines ~30 named lanes from highest to lowest priority: SyncLane (0b1) → InputContinuousLane → DefaultLane → TransitionLanes (18 bits wide) → IdleLane. startTransition marks updates into TransitionLane bits.",
        },
        {
          title: "React Scheduler Package",
          description:
            "A separate package (`scheduler`) that manages a priority queue of work callbacks. It decides when to run each unit of work based on lane priority. Critically, it uses MessageChannel — not setTimeout — to schedule continuation tasks between browser frames.",
        },
        {
          title: "Work Loop",
          description:
            "The render phase runs inside `workLoopConcurrent()`. After processing each Fiber unit, it checks `shouldYield()`. If the current time slice (≈5ms) is exhausted, it pauses the work loop, posts a MessageChannel message, and lets the browser handle its event queue before resuming.",
        },
      ]}
    />,

    <h3 key="h-lanes" className="text-xl font-bold mt-12 mb-4">
      The Lane System: React's Priority Bitmask
    </h3>,

    <Table
      key="table-lanes"
      headers={["Lane", "Bitmask (approx)", "Priority Level", "Triggered By"]}
      rows={[
        ["SyncLane", "0b0000…001", "🔴 Highest — synchronous", "Flushes before paint, e.g. legacy setState"],
        ["SyncHydrationLane", "0b0000…010", "🔴 Very High", "SSR hydration"],
        ["InputContinuousLane", "0b0000…100", "🟠 High", "Continuous events: mousemove, scroll"],
        ["DefaultLane", "0b0001…000", "🟡 Normal", "Regular setState, useEffect"],
        ["TransitionLane1–18", "0b0…1111…0", "🟢 Low", "startTransition, useDeferredValue"],
        ["IdleLane", "0b1000…000", "⚪ Lowest", "Background prefetch work"],
      ]}
    />,

    <Callout key="callout-lanes" type="info" title="Why bitmasks?">
      Using bitmask integers lets React check, merge, and compare multiple lane
      priorities in a single CPU instruction. The entire "which lanes need
      processing?" question reduces to a bitwise AND operation. React stores
      these on every Fiber node and the root's{" "}
      <code>pendingLanes</code> field, making scheduling decisions O(1).
    </Callout>,

    <h3 key="h-msgchan" className="text-xl font-bold mt-12 mb-4">
      The MessageChannel Trick: How React Yields to the Browser
    </h3>,

    <p key="p-msgchan-intro" className="mb-6">
      This is the part most developers never learn. React does NOT use{" "}
      <code>setTimeout(fn, 0)</code> to yield. Here's why — and what it uses
      instead.
    </p>,

    <Grid key="grid-yield" cols={2} gap={6}>
      <Card title="Why not setTimeout(fn, 0)?" description="The 4ms floor problem.">
        <p className="text-sm text-muted-foreground mb-2">
          The HTML spec mandates a minimum delay of{" "}
          <Highlight variant="warning">4ms</Highlight> for nested{" "}
          <code>setTimeout</code> calls, and browsers throttle it further to{" "}
          <Highlight variant="warning">1000ms</Highlight> in background tabs.
          This would make React's scheduler too slow for smooth 60fps renders.
        </p>
        <p className="text-sm text-muted-foreground">
          Also, <code>setTimeout</code> fires as a macrotask — but at a
          lower-fidelity scheduling priority than the browser needs for
          frame-perfect yielding.
        </p>
      </Card>
      <Card title="MessageChannel — the real mechanism" description="Zero-delay macrotask scheduling.">
        <p className="text-sm text-muted-foreground mb-2">
          React's scheduler creates a{" "}
          <Highlight variant="primary">MessageChannel</Highlight> pair. When it
          needs to yield, it fires <code>port.postMessage(null)</code>. The{" "}
          <code>onmessage</code> handler fires as a macrotask — immediately
          after the browser processes pending events and paint — with no
          artificial delay.
        </p>
        <p className="text-sm text-muted-foreground">
          This lets the browser squeeze in a paint frame and process queued
          input events before React resumes its interrupted render.
        </p>
      </Card>
    </Grid>,

    <CodeBlock
      key="code-msgchan"
      title="React Scheduler — Simplified MessageChannel yield (react/packages/scheduler/src/forks/Scheduler.js)"
      language="typescript"
      code={`const channel = new MessageChannel();
const port = channel.port2;

// Called after every ~5ms work chunk to resume the loop
channel.port1.onmessage = performWorkUntilDeadline;

function schedulePerformWorkUntilDeadline() {
  // postMessage fires as a macrotask — no minimum delay, yields to browser
  port.postMessage(null);
}

function performWorkUntilDeadline() {
  const currentTime = getCurrentTime();
  // Give each work chunk a 5ms deadline (one render "slice")
  deadline = currentTime + yieldInterval; // yieldInterval = 5ms

  let hasMoreWork = true;
  try {
    hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
  } finally {
    if (hasMoreWork) {
      // More work pending — schedule next slice after browser gets a turn
      schedulePerformWorkUntilDeadline();
    }
  }
}`}
    />,

    <Callout key="callout-yield" type="tip" title="The 5ms Slice">
      React yields every <strong>5ms</strong> (configurable via{" "}
      <code>yieldInterval</code>). At 60fps (16.6ms/frame), React can fit ~3
      slices into one frame, while still leaving the browser enough headroom
      for layout and paint. For 120Hz displays, it automatically adjusts to
      ~4ms slices.
    </Callout>,

    <h3 key="h-st" className="text-xl font-bold mt-12 mb-4">
      startTransition — Internals Step by Step
    </h3>,

    <p key="p-st-intro" className="mb-6">
      When you call <code>startTransition(() =&gt; setState(x))</code>, here is
      exactly what happens inside React's source code:
    </p>,

    <Flow
      key="flow-st"
      steps={[
        {
          title: "1. Set the global transition flag",
          description:
            "React sets `ReactCurrentBatchConfig.transition = {}` — a non-null object that acts as a flag. Any state update triggered while this flag is set gets automatically tagged with a TransitionLane instead of DefaultLane.",
        },
        {
          title: "2. Run the callback synchronously",
          description:
            "Your callback `() => setState(x)` executes immediately and synchronously. startTransition does NOT delay execution — it just changes which lane the resulting state update is queued into.",
        },
        {
          title: "3. Clear the flag, restore priority",
          description:
            "After the callback returns (or after the startTransition async wrapper in React 19 resolves), `ReactCurrentBatchConfig.transition` is set back to null. Subsequent updates outside the callback are back to DefaultLane.",
        },
        {
          title: "4. Scheduler enqueues a low-priority render",
          description:
            "The update sits in the Fiber root's `pendingLanes` in a TransitionLane bit. The Scheduler notices urgent work (user input, SyncLane) takes precedence, so the transition render doesn't start until all higher-priority lanes are flushed.",
        },
        {
          title: "5. Time-sliced render begins",
          description:
            "When it's the transition's turn, React starts building the work-in-progress tree. Every 5ms it calls `shouldYield()` — if true, it pauses, posts a MessageChannel ping, and yields. The browser can now paint a frame or process the next keypress.",
        },
        {
          title: "6. Interrupted if something urgent comes in",
          description:
            "If the user types again (InputContinuousLane), React throws away the in-progress transition render, flushes the urgent update first, then restarts the transition from scratch with the newest state value.",
        },
        {
          title: "7. Commit phase",
          description:
            "Once the transition render completes uninterrupted, React enters the synchronous commit phase — no yielding here — to apply all DOM mutations atomically.",
        },
      ]}
    />,

    <CodeBlock
      key="code-st-internals"
      title="startTransition — what the React source actually does"
      language="typescript"
      code={`// Simplified from: react/packages/react/src/ReactStartTransition.js

export function startTransition(scope: () => void) {
  const prevTransition = ReactCurrentBatchConfig.transition;

  // 1. Set the flag — any setState inside will get TransitionLane
  ReactCurrentBatchConfig.transition = {};

  try {
    // 2. Run your callback immediately (not deferred at all yet)
    scope(); // e.g. () => setQuery(value)
  } finally {
    // 3. Restore — updates outside are back to normal priority
    ReactCurrentBatchConfig.transition = prevTransition;
  }
}

// Inside dispatchSetState (what setState calls):
function dispatchSetState(fiber, queue, action) {
  // Lane is determined HERE based on the current context
  const lane = requestUpdateLane(fiber);
  //            ^^^^^^^^^^^^^^^^^
  // If ReactCurrentBatchConfig.transition != null → TransitionLane
  // If inside a click handler                    → SyncLane
  // If inside useEffect                          → DefaultLane
  
  enqueueUpdate(fiber, update, lane);
  scheduleUpdateOnFiber(root, fiber, lane);
}`}
    />,

    <h3 key="h-udv" className="text-xl font-bold mt-12 mb-4">
      useDeferredValue — Internals Step by Step
    </h3>,

    <p key="p-udv-intro" className="mb-6">
      <code>useDeferredValue(value)</code> looks simple — pass a value, get a
      "lagging" version back. The mechanics underneath are subtle.
    </p>,

    <Flow
      key="flow-udv"
      steps={[
        {
          title: "1. First render — returns the value immediately",
          description:
            "On initial mount, both the real value and the deferred value are the same. No deferral happens yet. The component renders with the actual value passed in.",
        },
        {
          title: "2. Value changes (e.g. parent re-renders with new query)",
          description:
            "React re-renders the component. useDeferredValue receives the new value but the hook internally still holds the *old* deferred value in state.",
        },
        {
          title: "3. Returns the stale value for this render",
          description:
            "The current render completes immediately with the OLD deferred value. The UI shows the previous results — no stale placeholder needed, no flicker. The urgent render (keeping other UI responsive) is done fast.",
        },
        {
          title: "4. Schedules a low-priority follow-up render",
          description:
            "Internally, React calls startTransition to enqueue a state update that sets the deferred value to the new value. This gets tagged to TransitionLane — it will only run when there is no higher-priority pending work.",
        },
        {
          title: "5. Transition render updates the deferred value",
          description:
            "The low-priority render runs time-sliced. The deferred value state is updated to match the current real value. The expensive child component (e.g. the filtered list) re-renders with the new data.",
        },
        {
          title: "6. If the value changes again before step 5 completes",
          description:
            "React interrupts the in-progress transition render, discards it, and schedules fresh. The deferred value skips intermediate values and chases the latest one — just like a trailing debounce, but driven by priority not time.",
        },
      ]}
    />,

    <CodeBlock
      key="code-udv-internals"
      title="useDeferredValue — conceptual internal implementation"
      language="typescript"
      code={`// Simplified from: react/packages/react-reconciler/src/ReactFiberHooks.js

function useDeferredValue<T>(value: T): T {
  const [prevValue, setValue] = useState(value);

  useEffect(() => {
    // This effect fires AFTER the urgent render commits
    // startTransition tags the update as low-priority (TransitionLane)
    startTransition(() => {
      setValue(value); // Schedule the "catch-up" render
    });
  }, [value]);

  // Return the STALE value while the transition is in progress.
  // The expensive child that uses this value re-renders only after
  // the low-priority transition completes.
  return prevValue;
}

// In practice React uses a more optimized internal path,
// but this captures the semantics exactly.`}
    />,

    <h3 key="h-compare" className="text-xl font-bold mt-12 mb-4">
      startTransition vs useDeferredValue — When to Use Which
    </h3>,

    <Table
      key="table-compare"
      headers={["", "startTransition", "useDeferredValue"]}
      rows={[
        ["Control point", "You own the setter (setState)", "You receive a value as a prop / from parent"],
        ["API shape", "Wraps the setState call", "Wraps the consumed value"],
        ["Typical use", "Button click triggers heavy render", "Search input drives expensive list filter"],
        ["Access to setter?", "✅ Yes — you call it", "❌ No — parent owns the state"],
        ["Pending state", "useTransition gives `isPending` flag", "Compare value !== deferredValue to detect"],
        ["React 19 async?", "✅ Works with async actions natively", "N/A — value-based API"],
        ["Interruption", "New urgent updates interrupt", "New urgent renders interrupt the transition"],
      ]}
    />,

    <CodeBlock
      key="code-usage"
      title="Practical usage — startTransition vs useDeferredValue"
      language="typescript"
      code={`// ✅ startTransition: you own the setter
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    // Urgent: update the input immediately
    setQuery(e.target.value);

    // Low-priority: let results render async, won't block typing
    startTransition(() => {
      setResults(filterItems(e.target.value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleInput} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </>
  );
}

// ✅ useDeferredValue: you receive the value from outside
function ResultsList({ query }: { query: string }) {
  // deferredQuery lags behind query — stays stale during typing
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  // This expensive derivation only re-runs after typing pauses long
  // enough for a transition render to complete
  const results = useMemo(() => filterItems(deferredQuery), [deferredQuery]);

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      {results.map(r => <Row key={r.id} item={r} />)}
    </div>
  );
}`}
    />,

    <h3 key="h-r19" className="text-xl font-bold mt-12 mb-4">
      React 19: Async Transitions
    </h3>,

    <Callout key="callout-r19" type="info" title="New in React 19">
      React 18's <code>startTransition</code> only worked with synchronous
      callbacks. React 19 extends it to support <strong>async functions</strong>{" "}
      natively — including awaited fetches inside the transition. React
      automatically tracks the pending state across the async boundary, showing{" "}
      <code>isPending = true</code> until the async work and its resulting
      renders complete.
    </Callout>,

    <CodeBlock
      key="code-r19-async"
      title="React 19 — async startTransition (Actions)"
      language="typescript"
      code={`// React 19: async transitions work natively
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  async function handleSearch(newQuery: string) {
    setQuery(newQuery); // Urgent — update input instantly

    startTransition(async () => {
      // In React 19: async inside startTransition is supported
      const data = await fetchSearchResults(newQuery); // Real network call
      setResults(data); // Still a low-priority transition update
    });
    // isPending stays true until the async work + render both complete
  }

  return (
    <>
      <input onChange={e => handleSearch(e.target.value)} />
      {isPending && <Spinner />}
      <Results data={results} />
    </>
  );
}`}
    />,

    <h3 key="h-traps" className="text-xl font-bold mt-12 mb-4">
      Common Pitfalls
    </h3>,

    <Grid key="grid-traps" cols={2} gap={6}>
      <Card title="startTransition is NOT setTimeout" description="">
        <p className="text-sm text-muted-foreground">
          A common misconception: <code>startTransition</code> does NOT delay
          when your callback runs. It runs <strong>immediately</strong> and
          synchronously. What changes is the <em>priority lane</em> of the
          resulting state update — not its timing. Thinking of it as a delay
          leads to wrong usage patterns.
        </p>
      </Card>
      <Card title="useDeferredValue is NOT debounce" description="">
        <p className="text-sm text-muted-foreground">
          Debounce adds a fixed time delay. <code>useDeferredValue</code> delays
          by <em>CPU availability</em>. On an idle CPU, the deferred render can
          complete in the very next frame ({"<"}16ms). On a busy CPU, it might
          take several frames. It adapts to the actual workload — debounce does
          not.
        </p>
      </Card>
      <Card title="No async in startTransition (React 18)" description="">
        <p className="text-sm text-muted-foreground">
          In React 18, the callback passed to <code>startTransition</code> must
          be synchronous. If you <code>await</code> something inside it, the
          state update triggered after the <code>await</code> will NOT be tagged
          as a transition — it will use DefaultLane instead. This is fixed in
          React 19.
        </p>
      </Card>
      <Card title="External stores need special handling" description="">
        <p className="text-sm text-muted-foreground">
          Transition renders can be interrupted and restarted. If your component
          reads from an external mutable store (Zustand, Redux without{" "}
          <code>useSyncExternalStore</code>), the interrupted render may have
          read a stale snapshot while the completed render reads a newer one —
          causing <Highlight variant="warning">tearing</Highlight>. Always use{" "}
          <code>useSyncExternalStore</code> for external state in concurrent
          components.
        </p>
      </Card>
    </Grid>,

    <Callout key="callout-final" type="tip" title="The Mental Model">
      Think of React's scheduler as an airline gate agent. SyncLane passengers
      board first (first class). Typing and scroll events (InputContinuousLane)
      board next. Regular state updates (DefaultLane) are economy. Transitions
      are standby — they board only when all other passengers are seated, and
      they get bumped if a higher-priority passenger shows up while they're
      walking down the jetway. The MessageChannel is the PA system calling the
      next boarding group after each frame.
    </Callout>,
  ],
};
