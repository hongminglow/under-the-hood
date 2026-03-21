import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const stackVsHeapTopic: Topic = {
  id: "stack-vs-heap",
  title: "Stack vs Heap",
  description:
    "How primitive numbers and massive complex arrays literally physically exist inside isolated silicon RAM hardware blocks.",
  tags: ["core", "architecture", "backend"],
  icon: "Database",
  content: [
    <p key="1">
      When you blindly type <code>const age = 30</code> versus <code>{"const user = { age: 30 }"}</code>, the CPU handles the physics entirely differently. One goes into ultra-fast strict physical temporary memory array blocks. The other dives completely randomly into a massive endless unstructured garbage dump.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Two RAM Sectors
    </h3>,
    <Table
      key="3"
      headers={["Concept", "Memory Trait", "What Lives Here"]}
      rows={[
        [
          "The Stack",
          "Tiny, linear, predictable, incredibly fast L1/L2 Cache CPU storage blocks.",
          "Primitive values (booleans, strings, numbers). And function frames. When a function finishes running, this block instantly deletes itself safely."
        ],
        [
          "The Heap",
          "Enormous, unstructured, random-access slow RAM pool.",
          "Complex objects, massive arrays, closures. Because sizes fluctuate endlessly, the Stack simply holds a tiny physical pointer strictly linking to a specific address residing over in the messy Heap."
        ]
      ]}
    />,
    <Callout key="4" type="danger" title="The Stack Overflow">
      If you write a recursive function that blindly calls itself eternally without a proper exit condition, it repeatedly fills up the entirely rigid physical Stack with completely endless new function execution frames. The CPU mathematically throws a "Maximum Call Stack Exceeded" fatal exception and permanently kills your physical backend server instance instantly.
    </Callout>,
  ],
};
