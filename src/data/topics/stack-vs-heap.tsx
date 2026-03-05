import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const stackVsHeapTopic: Topic = {
  id: "stack-vs-heap",
  title: "Memory: Stack vs Heap",
  description:
    "The two fundamental regions of RAM used by programs, mapping directly to speed, size, and lifecycle tradeoffs.",
  tags: ["cs-fundamentals", "memory", "c++", "rust"],
  icon: "Layers",
  content: [
    <p key="1">
      When an application executes, the operating system allocates memory. Data
      must be stored in RAM to be accessed by the CPU. Almost all programming
      languages divide this memory into two distinct regions: the{" "}
      <strong>Stack</strong> and the <strong>Heap</strong>.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="The Stack">
        <ul className="text-sm space-y-2 list-disc pl-4 mt-2">
          <li>
            <strong>Structure:</strong> A strict LIFO (Last-In, First-Out) data
            structure.
          </li>
          <li>
            <strong>What goes here:</strong> Local variables (ints, floats,
            booleans, pointers) and function call frames.
          </li>
          <li>
            <strong>Size requirement:</strong> All data stored on the stack must
            have a known, fixed size at compile time.
          </li>
          <li>
            <strong>Speed:</strong> Blazing fast. Allocation is just moving a
            single CPU pointer.
          </li>
          <li>
            <strong>Lifecycle:</strong> Memory is automatically reclaimed the
            moment the function returns.
          </li>
        </ul>
      </Card>
      <Card title="The Heap">
        <ul className="text-sm space-y-2 list-disc pl-4 mt-2">
          <li>
            <strong>Structure:</strong> A disorganized, massive pool of free
            memory governed by the OS.
          </li>
          <li>
            <strong>What goes here:</strong> Dynamically sized data (arrays,
            strings, large objects, closures).
          </li>
          <li>
            <strong>Size requirement:</strong> Size can change dynamically at
            runtime.
          </li>
          <li>
            <strong>Speed:</strong> Slower. Must ask the OS to find a contiguous
            block of free memory.
          </li>
          <li>
            <strong>Lifecycle:</strong> Must be managed. Requires manual
            `free()` (C/C++) or a Garbage Collector (JS/Java).
          </li>
        </ul>
      </Card>
    </Grid>,
    <Table
      key="3"
      headers={["Property", "Stack", "Heap"]}
      rows={[
        [
          "Allocation Strategy",
          "Automatic (handled by compiler)",
          "Manual or Garbage Collected",
        ],
        ["Performance", "Near-instantaneous", "Slower (OS syscall overhead)"],
        [
          "Size Limit",
          "Small (often ~8MB total per thread)",
          "Massive (limited only by physical RAM/swap)",
        ],
        [
          "Fragmentation",
          "Impossible (strict LIFO)",
          "Common (leads to holes in memory)",
        ],
        [
          "Data Access",
          "Thread-local (private)",
          "Can be shared across multiple threads",
        ],
      ]}
    />,
    <Callout key="4" type="info" title="How Pointers Bridge The Gap">
      In most languages, if you create a large object on the Heap, the actual
      gigabytes of data reside in the Heap, but a small fixed-size{" "}
      <em>pointer</em> (an integer storing the memory address, usually 8 bytes
      on 64-bit systems) is stored on the Stack to keep track of it.
    </Callout>,
  ],
};
