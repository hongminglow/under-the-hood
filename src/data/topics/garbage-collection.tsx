import type { Topic } from "@/data/types";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const garbageCollectionTopic: Topic = {
  id: "garbage-collection",
  title: "Garbage Collection (V8)",
  description:
    "How modern high-level engines automatically manage memory heaps and prune dead references without developer intervention.",
  tags: ["language-design", "memory", "engine"],
  icon: "Trash2",
  content: [
    <p key="1">
      In low-level languages like C or Rust, memory must be explicitly allocated
      and freed by the developer. In high-level languages like JavaScript, Java,
      and Python, an automated subsystem called the{" "}
      <strong>Garbage Collector (GC)</strong> runs in the background to reclaim
      memory occupied by objects that are no longer referenced. V8's GC goes to
      extreme lengths to avoid freezing the main thread.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Generational Hypothesis
    </h4>,
    <p key="3">
      V8 divides memory into two primary spaces based on the hypothesis that{" "}
      <em>
        "most objects die young, and the ones that survive tend to live
        forever."
      </em>
    </p>,
    <ul key="4" className="list-disc pl-6 space-y-2 mt-4 text-emerald-300">
      <li>
        <strong>Young Generation:</strong> Where objects are initially created.
        It is very small (1-8 MB) and fills up rapidly.
      </li>
      <li>
        <strong>Old Generation:</strong> Objects that survive two passes in the
        Young Generation are evacuated here.
      </li>
    </ul>,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      Scavenger & Mark-Sweep Algorithms
    </h4>,
    <p key="6">
      The Young Generation uses the{" "}
      <strong>Scavenger (Cheney's Algorithm)</strong>. It splits the space in
      half. When half fills up, it looks at all objects. Moving surviving
      referenced objects to the other half, and instantly trashing the rest.
      This takes &lt;1 millisecond.
    </p>,
    <p key="7" className="mt-4">
      The Old Generation uses <strong>Mark-Sweep-Compact</strong>. The engine
      pauses execution, traverses the entire object reference graph starting
      from the global root (Marking), sweeps dead objects away (Sweeping), and
      defragments the remaining memory (Compacting).
    </p>,
    <div key="8" className="mt-8 mb-6">
      <Callout type="warning" title="Memory Leaks in JS">
        Even with GC, developers can cause memory leaks by leaving unneeded
        references. The global scope, forgotten <code>setInterval</code> timers,
        and lingering DOM event listeners connected to removed UI elements are
        the primary culprits.
      </Callout>
    </div>,
    <CodeBlock
      key="9"
      language="javascript"
      title="A classic DOM memory leak"
      code={`const element = document.getElementById("button");
element.addEventListener("click", () => console.log(heavyObject));

// Later, the button is removed from the UI
document.body.removeChild(element);

// BUT heavyObject is never garbage collected!
// The Event Listener still holds a massive hidden reference to it.`}
    />,
  ],
};
