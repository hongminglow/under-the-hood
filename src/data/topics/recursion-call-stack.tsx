import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Table } from "@/components/ui/Table";

export const recursionCallStackTopic: Topic = {
  id: "recursion-call-stack",
  title: "Recursion & the Call Stack",
  description:
    "How recursive functions build stack frames, why they overflow, and the tail-call optimization that could save them.",
  tags: ["algorithms", "cs", "interview", "javascript"],
  icon: "Repeat1",
  content: [
    <p key="1">
      Every time a function calls itself, the JavaScript engine pushes a new{" "}
      <strong>stack frame</strong> onto the call stack: local variables, return
      address, and arguments. With deep recursion (10,000+ calls), the stack
      overflows — the infamous <strong>Maximum call stack size exceeded</strong>{" "}
      error.
    </p>,
    <CodeBlock
      key="2"
      language="typescript"
      title="Recursion vs Iteration"
      code={`// Recursive factorial: elegant but 10,000! overflows the stack
function factorial(n: number): number {
  if (n <= 1) return 1;           // Base case
  return n * factorial(n - 1);    // Recursive case
}
// factorial(5) → 5 * factorial(4) → 5 * 4 * factorial(3) → ...
// Each call adds a stack frame. factorial(100000) → 💥 Stack Overflow

// Iterative factorial: ugly but safe for any input
function factorialIterative(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;                  // Single stack frame, no overflow
}`}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="When to Use Recursion">
        <p className="text-sm">
          <strong>Tree traversal</strong> (DOM, file system, JSON),{" "}
          <strong>divide-and-conquer</strong> (merge sort, quick sort),{" "}
          <strong>backtracking</strong> (maze solving, N-Queens), and{" "}
          <strong>graph algorithms</strong> (DFS). If the problem has a{" "}
          <em>recursive structure</em>, recursion is natural.
        </p>
      </Card>
      <Card title="When to Avoid Recursion">
        <p className="text-sm">
          <strong>Linear iterations</strong> (use a loop), deep recursion that
          might exceed stack limit, and performance-critical paths. JavaScript
          has a ~10,000 frame stack limit. Use{" "}
          <strong>iterative + explicit stack</strong> for deep recursion.
        </p>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["Concept", "Description"]}
      rows={[
        [
          "Base Case",
          "The condition that stops recursion. Without it → infinite loop → stack overflow.",
        ],
        [
          "Recursive Case",
          "The function calling itself with a smaller/simpler input.",
        ],
        [
          "Tail Recursion",
          "Last operation is the recursive call (no pending work). Can be optimized to a loop.",
        ],
        [
          "Memoization",
          "Cache results of expensive recursive calls. Turns O(2ⁿ) Fibonacci into O(n).",
        ],
      ]}
    />,
    <Callout key="5" type="info" title="Tail-Call Optimization (TCO)">
      If the recursive call is the <strong>last thing</strong> the function does
      (tail position), the engine can reuse the current stack frame instead of
      creating a new one. This means infinite recursion depth with zero extra
      memory. <strong>Safari supports TCO</strong>, but V8 (Chrome/Node) does{" "}
      <strong>NOT</strong>. In practice, convert tail-recursive functions to
      iterative for cross-engine safety.
    </Callout>,
  ],
};
