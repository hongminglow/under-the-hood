import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const stackVsHeapTopic: Topic = {
  id: "stack-vs-heap",
  title: "Stack vs Heap Memory",
  description:
    "How primitive variables and massive objects physically reside in different sectors of RAM, and why this fundamentally drives React render bugs.",
  tags: ["core", "architecture", "backend", "react"],
  icon: "Database",
  content: [
    <p key="1" className="mb-6">
      When you write <code>const age = 30</code> versus <code>{"const user = { age: 30 }"}</code>, the physical CPU handles them completely differently. One is stored in a highly rigid, ultra-fast memory block. The other is tossed into a massive unstructured memory pool. Deeply understanding this distinction is the engineering secret to avoiding weird "UI not updating" bugs in frontend frameworks like React.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Two RAM Sectors
    </h3>,

    <Table
      key="3"
      headers={["Concept", "Architecture", "What Lives Here", "Speed"]}
      rows={[
        ["The Stack", "Linear, rigid, LIFO (Last-In-First-Out). Automatically cleans up when a function finishes.", "Primitive values (Booleans, Strings, Numbers), and Function Execution Frames.", "Extremely Fast (L1/L2 Cache)"],
        ["The Heap", "Enormous, unstructured, dynamic memory pool.", "Objects, Arrays, Closures, and Maps. Dynamic sizes.", "Slower (Requires Garbage Collection)"]
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: Code Samples
    </h3>,

    <Grid key="5" cols={2} gap={6} className="mb-8">
      <Card title="The Stack (Primitives & Functions)">
        <p className="text-sm text-foreground mb-4">
          Every time you explicitly call a normal function, a "Frame" is securely pushed onto the Stack. Primitives are stored directly inside that exact frame. When the function returns, the Stack automatically deletes the frame natively.
        </p>
        <CodeBlock
          title="stack.js"
          language="javascript"
          code={`function calculateAge() {
  // Primitives! Stored directly in the Stack
  const currentYear = 2024;
  const birthYear = 1990; 
  
  return currentYear - birthYear;
}
// Once finished, currentYear physically vanishes.`}
        />
      </Card>

      <Card title="The Heap (Dynamic Objects)">
        <p className="text-sm text-foreground mb-4">
          Objects and Arrays can grow to 50 Megabytes. They cannot strictly fit inside the tiny, rigid Stack frames. Instead, they live in the Heap. The Stack simply holds a tiny <Highlight variant="primary">Pointer</Highlight> (an address like <code>0x1F4A</code>) linking to the Heap object.
        </p>
        <CodeBlock
          title="heap.js"
          language="javascript"
          code={`function createUser() {
  // 1. The Stack holds a tiny memory pointer.
  // 2. The physical { name: "John" } object lives in the Heap.
  const user = { name: "John" };
  
  return user;
}`}
        />
      </Card>
    </Grid>,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The React Ecosystem Trap
    </h3>,

    <p key="6a" className="mb-6">
      <strong>The Problem:</strong> React heavily relies on shallow comparison (using `Object.is()`) mechanically under the hood for states and props. It strictly checks if the <Highlight variant="primary">Stack Pointer reference</Highlight> changed. It absolutely does not deeply scan the massive Heap object to see if values interiorly changed (because recursively scanning 10,000 JSON items every frame would destroy performance).
    </p>,

    <Grid key="7" cols={2} gap={6} className="mb-8">
      <Card title="Bad: Mutating the Heap (No Render)">
        <p className="text-sm text-slate-400 mb-4">
          Modifying an object property changes the Heap, but the Stack's pointer address (e.g., <code>0x1F4A</code>) stays completely identical. React falsely assumes nothing mathematically changed.
        </p>
        <CodeBlock
          title="Component.jsx"
          language="javascript"
          code={`const [user, setUser] = useState({ age: 30 });

function badUpdate() {
  user.age = 31; // Mutates the Heap directly!
  
  // React sees identical Stack pointer: 0x1F4A === 0x1F4A 
  // BUG: The UI WILL NOT physically re-render!
  setUser(user);
}`}
        />
      </Card>

      <Card title="Good: Creating a New Pointer">
        <p className="text-sm text-slate-400 mb-4">
          By spreading properties into a brand new object, you explicitly force JavaScript to allocate a completely new slot in the Heap. The Stack natively receives a new pointer (e.g., <code>0x9B2C</code>).
        </p>
        <CodeBlock
          title="Component.jsx"
          language="javascript"
          code={`const [user, setUser] = useState({ age: 30 });

function goodUpdate() {
  // Mathematically allocates a NEW Object in the Heap
  const newUser = { ...user, age: 31 };
  
  // React sees new Stack pointer: 0x1F4A !== 0x9B2C
  // SUCCESS: UI Re-renders perfectly!
  setUser(newUser); 
}`}
        />
      </Card>
    </Grid>,

    <Callout key="8" type="warning" title="The Stack Overflow Event">
      If you write a recursive function that blindly calls itself eternally without a proper exit condition, it repeatedly fills up the rigid internal Stack with an endless mountain of new function execution frames. The CPU mathematically throws a <strong>"Maximum Call Stack Exceeded"</strong> fatal exception and permanently kills your entire local backend server thread instantly.
    </Callout>,
  ],
};
