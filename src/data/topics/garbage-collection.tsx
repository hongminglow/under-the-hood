import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";

export const garbageCollectionTopic: Topic = {
  id: "garbage-collection",
  title: "Garbage Collection (GC)",
  description:
    "How JS and Go reclaim heap memory, why GC can pause execution, and why Rust avoids tracing GC entirely.",
  tags: ["language-design", "memory", "gc", "runtime", "javascript", "go", "rust"],
  icon: "Trash2",
  content: [
    <p key="1">
      <strong>Garbage Collection (GC)</strong> is a runtime system that frees{" "}
      <em>heap</em> objects after they become <strong>unreachable</strong>{" "}
      (nothing can reference them anymore). Languages differ mainly in{" "}
      <strong>when</strong> memory becomes reclaimable and{" "}
      <strong>how much</strong> the runtime must pause your program to find it.
    </p>,
    <Callout key="2" type="info" title="Unreachable ≠ immediately freed">
      In GC languages, an object becomes{" "}
      <Highlight variant="primary">eligible</Highlight> for collection when it
      is unreachable — but the runtime chooses <em>when</em> to run a GC cycle
      (usually based on allocation pressure and heap size). It is not “the OS
      clearing memory later”; it’s the language runtime/VM reclaiming its own
      heap.
    </Callout>,
    <Grid key="3" cols={3} gap={6} className="my-8">
      <Card title="Rust" description="Ownership + RAII (no tracing GC)">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Memory is freed{" "}
            <Highlight variant="primary">deterministically</Highlight> when a
            value goes out of scope (via <code>Drop</code>) or when the last
            reference-counted handle is dropped.
          </li>
          <li>
            No background tracing collector → no GC “stop-the-world” pause.
            This is why Rust is strong for latency-sensitive systems.
          </li>
          <li>
            Trade-off: more compile-time complexity; reference cycles in{" "}
            <code>Rc</code>/<code>Arc</code> can leak (there is no cycle GC).
          </li>
        </ul>
      </Card>
      <Card title="Go" description="Concurrent tracing GC (low-pause focus)">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Uses a tracing GC that runs mostly{" "}
            <Highlight variant="primary">concurrently</Highlight> with your
            goroutines (marking + sweeping while the program runs).
          </li>
          <li>
            Still has short{" "}
            <Highlight variant="warning">stop-the-world</Highlight> points (for
            safe stack/root scanning and phase transitions).
          </li>
          <li>
            Cost scales with “live heap” size: allocation-heavy code increases
            CPU usage and tail latency.
          </li>
        </ul>
      </Card>
      <Card title="JavaScript (V8)" description="Generational + incremental GC">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Young gen</strong> collections are frequent and fast; the{" "}
            <strong>old gen</strong> uses mark-sweep/mark-compact.
          </li>
          <li>
            V8 does incremental/concurrent work, but some phases still pause the{" "}
            <strong>main thread</strong> (visible as UI jank or Node latency
            spikes).
          </li>
          <li>
            “Leaks” are usually just long-lived references (closures, globals,
            DOM listeners) keeping objects reachable.
          </li>
        </ul>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["Language", "Reclaim mechanism", "When memory is reclaimed", "Pause profile"]}
      rows={[
        [
          "Rust",
          <>
            Ownership + <code>Drop</code> (no tracing GC)
          </>,
          "At end of scope / last owner drop",
          "No GC pauses; destructor work runs on your thread",
        ],
        [
          "Go",
          "Concurrent tracing GC",
          "When unreachable, on the next GC cycle",
          "Tiny STW phases + concurrent background work",
        ],
        [
          "JavaScript (V8)",
          "Generational tracing GC",
          "When unreachable, on the next minor/major GC",
          "Occasional main-thread pauses (worse on major GC/compaction)",
        ],
        [
          "Java / C#",
          "Tracing GC (multiple collector modes)",
          "Automatic; usually generational + concurrent options",
          "Can be tuned for throughput or low latency depending on the runtime",
        ],
      ]}
    />,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      Why does GC sometimes “freeze” an application?
    </h4>,
    <p key="6">
      A tracing GC must momentarily get a consistent view of the object graph.
      Even “concurrent” collectors usually need brief{" "}
      <Highlight variant="warning">stop-the-world</Highlight> pauses to do
      bookkeeping safely. In browsers, this is extra noticeable because a pause
      blocks rendering (dropped frames).
    </p>,
    <div key="7" className="mt-6">
      <Step index={1}>
        <strong>Root scan:</strong> find “starting points” (stacks, globals,
        registers). This often requires pausing threads briefly.
      </Step>
      <Step index={2}>
        <strong>Mark:</strong> traverse pointers/references from roots and mark
        everything reachable as <Highlight variant="primary">live</Highlight>.
      </Step>
      <Step index={3}>
        <strong>Sweep / compact:</strong> reclaim dead regions and sometimes
        move objects to reduce fragmentation (moving/compacting phases are
        where pauses can spike).
      </Step>
    </div>,
    <Callout key="8" type="tip" title="What makes Rust/Go feel “special”">
      Rust avoids GC pauses by not having a tracing GC at all (ownership makes
      frees deterministic). Go <em>does</em> have GC, but its runtime is
      engineered to keep pauses very short and do most work concurrently. Both
      can still experience latency from other causes (allocators, locking, OS
      scheduling) — they just reduce one major source of unpredictability.
    </Callout>,
    <CodeBlock
      key="9"
      language="rust"
      title="Rust: deterministic frees via Drop (no GC cycle)"
      code={`struct Tracer(&'static str);

impl Drop for Tracer {
    fn drop(&mut self) {
        println!("drop {}", self.0);
    }
}

fn main() {
    let _a = Tracer("a");
    {
        let _b = Tracer("b");
        println!("in inner scope");
    } // _b is dropped here, deterministically
    println!("back in outer scope");
} // _a is dropped here`}
    />,
    <Callout key="10" type="warning" title="Memory leaks still exist in GC languages">
      GC only frees <em>unreachable</em> objects. If you accidentally keep a
      reference alive, the object stays alive too. In JavaScript, the classic
      culprits are globals, forgotten <code>setInterval</code> timers, and DOM
      event listeners attached to removed elements.
    </Callout>,
    <CodeBlock
      key="11"
      language="javascript"
      title="A classic DOM memory leak"
      code={`const element = document.getElementById("button");
element.addEventListener("click", () => console.log(heavyObject));

// Later, the button is removed from the UI
document.body.removeChild(element);

// BUT heavyObject is never garbage collected:
// The event listener still holds a hidden reference to it.`}
    />,
  ],
};
