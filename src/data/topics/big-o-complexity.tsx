import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const bigOComplexityTopic: Topic = {
  id: "big-o-complexity",
  title: "Big O & Time Complexity",
  description:
    "The universal language for measuring algorithm efficiency — the single most important concept in coding interviews.",
  tags: ["algorithms", "interview", "fundamentals", "cs"],
  icon: "TrendingUp",
  content: [
    <p key="1">
      <strong>Big O notation</strong> describes how an algorithm's runtime grows{" "}
      <em>relative to the input size</em>. It doesn't measure actual
      milliseconds — it measures the <strong>rate of growth</strong>. An{" "}
      <code>O(n)</code> algorithm that takes 1ms per element will take 1 second
      for 1,000 elements, but an <code>O(n²)</code> algorithm will take{" "}
      <strong>16 minutes</strong>.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Complexity Hierarchy
    </h4>,
    <Table
      key="3"
      headers={["Big O", "Name", "n = 1,000", "Example"]}
      rows={[
        ["O(1)", "Constant", "1 op", "HashMap lookup, array index"],
        ["O(log n)", "Logarithmic", "~10 ops", "Binary search"],
        ["O(n)", "Linear", "1,000 ops", "Array scan, single loop"],
        [
          "O(n log n)",
          "Linearithmic",
          "~10,000 ops",
          "Merge sort, quicksort avg",
        ],
        ["O(n²)", "Quadratic", "1,000,000 ops", "Nested loops, bubble sort"],
        ["O(2ⁿ)", "Exponential", "~10³⁰⁰ ops", "Brute-force subsets"],
        [
          "O(n!)",
          "Factorial",
          "∞ for practical n",
          "Permutations, TSP brute force",
        ],
      ]}
    />,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Best / Average / Worst Case">
        <p className="text-sm">
          Quicksort is <code>O(n log n)</code> on average but <code>O(n²)</code>{" "}
          worst case (already sorted input). Interviewers want you to know{" "}
          <strong>all three</strong> and explain <em>when</em> each occurs.
        </p>
      </Card>
      <Card title="Space Complexity">
        <p className="text-sm">
          Don't forget memory! Merge sort is <code>O(n log n)</code> time but
          requires <code>O(n)</code> extra space. In-place quicksort uses{" "}
          <code>O(log n)</code> stack space. Always mention{" "}
          <strong>space-time tradeoffs</strong>.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="5"
      language="typescript"
      title="Recognizing Complexity"
      code={`// O(1) — Constant
const first = arr[0];

// O(n) — Linear: single loop
for (const item of arr) { /* ... */ }

// O(n²) — Quadratic: nested loops over same array
for (const a of arr) {
  for (const b of arr) { /* ... */ }
}

// O(log n) — Logarithmic: halving the problem each step
let lo = 0, hi = arr.length - 1;
while (lo <= hi) {
  const mid = (lo + hi) >>> 1;
  if (arr[mid] === target) return mid;
  arr[mid] < target ? lo = mid + 1 : hi = mid - 1;
}`}
    />,
    <Callout key="6" type="warning" title="The 'Drop Constants' Rule">
      Big O drops constants and lower-order terms. <code>O(2n + 100)</code>{" "}
      simplifies to <code>O(n)</code>. <code>O(n² + n)</code> simplifies to{" "}
      <code>O(n²)</code>. But in real-world performance, constants matter — an{" "}
      <code>O(n)</code> algorithm with a massive constant can be slower than{" "}
      <code>O(n log n)</code> for practical input sizes.
    </Callout>,
  ],
};
