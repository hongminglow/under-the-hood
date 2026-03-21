import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const recursionCallStackTopic: Topic = {
  id: "recursion-call-stack",
  title: "Recursion & the Call Stack",
  description:
    "How recursive functions build stack frames, why they overflow, and the tail-call optimization that could save them.",
  tags: ["algorithms", "cs", "interview", "javascript"],
  icon: "Repeat1",
  content: [
    <p key="1">
      Recursion is a programming technique where a function calls itself to solve a smaller instance of the same problem. While elegant, it is physically limited by the <strong>Call Stack</strong>—a fixed-size memory region that stores the execution state of active functions.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Anatomy of a Stack Frame
    </h3>,
    <p key="3" className="mb-4">
      Every recursive call pushes a new <strong>Stack Frame</strong> (~48-128 bytes) onto the stack. If you exceed the engine's limit (usually ~10,000 frames in V8), you get a <strong>Stack Overflow</strong>.
    </p>,
    <Table
      key="4"
      headers={["Component", "Technical Purpose"]}
      rows={[
        ["Return Address", "The memory location to jump back to after the function finishes."],
        ["Arguments", "The values passed into the current recursive call (e.g., <code>n-1</code>)."],
        ["Local Variables", "Variables declared inside the function scope."],
        ["Instruction Pointer", "Tracks exactly which line of code is currently executing."]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Optimization: Memoization
    </h3>,
    <CodeBlock
      key="6"
      language="typescript"
      title="Fibonacci: O(2ⁿ) vs O(n)"
      code={`// ❌ Naive: Recalculates the same values millions of times
function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}

// ✅ Memoized: Stores results in a cache (Map)
const memo = new Map();
function fibMemo(n) {
  if (memo.has(n)) return memo.get(n);
  if (n <= 1) return n;
  const res = fibMemo(n-1) + fibMemo(n-2);
  memo.set(n, res);
  return res;
}`}
    />,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      The 'Trampoline' Pattern
    </h3>,
    <p key="8" className="mb-4">
      Since V8 (Node/Chrome) doesn't support <strong>Tail Call Optimization (TCO)</strong>, you can use a <strong>Trampoline</strong>. Instead of calling itself, the function returns <em>another function</em>. A loop then calls these functions until a value is returned.
    </p>,
    <Callout key="9" type="tip" title="When to use Recursion?">
      Recursion is the natural choice for <strong>Recursive Data Structures</strong> like the <strong>DOM Tree</strong> or <strong>JSON</strong> objects. If you find yourself writing a <code>while</code> loop with a manual <code>stack.push()</code>, you are essentially re-implementing recursion manually to avoid the stack limit.
    </Callout>,
  ],
};
