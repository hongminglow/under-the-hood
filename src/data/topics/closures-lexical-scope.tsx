import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const closuresLexicalScopeTopic: Topic = {
  id: "closures-lexical-scope",
  title: "Closures & Lexical Scope",
  description:
    "The most misunderstood JavaScript concept: how functions 'remember' variables from their birthplace long after the parent exits.",
  tags: ["javascript", "interview", "fundamentals", "scope"],
  icon: "Lock",
  content: [
    <p key="1">
      A <strong>closure</strong> is created every time a function is defined
      inside another function. The inner function retains a reference to the
      outer function's variables — even after the outer function has returned
      and its execution context has been destroyed. This "memory" is the
      closure.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Lexical Scope: The Foundation
    </h4>,
    <p key="3" className="mb-4">
      JavaScript uses <strong>lexical (static) scoping</strong> — a function's
      scope is determined by <em>where it is written</em> in the source code,
      not where it is called. The engine builds a <strong>scope chain</strong>{" "}
      at parse time.
    </p>,
    <CodeBlock
      key="4"
      language="javascript"
      title="Closure In Action"
      code={`function createCounter() {
  let count = 0; // This variable lives in createCounter's scope

  return function increment() {
    count++; // increment() "closes over" count
    return count;
  };
}

const counter = createCounter();
// createCounter() has returned and its stack frame is gone.
// But count is NOT garbage collected — increment() holds a reference.

counter(); // → 1
counter(); // → 2
counter(); // → 3  (count persists across calls!)`}
    />,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      The Classic Interview Trap
    </h4>,
    <Grid key="6" cols={2} gap={6} className="mb-8">
      <Card title="❌ The Bug">
        <CodeBlock
          language="javascript"
          title="var + loop"
          code={`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3
// WHY? var is function-scoped.
// All 3 closures share the SAME i.
// By the time setTimeout fires, i = 3.`}
        />
      </Card>
      <Card title="✅ The Fix">
        <CodeBlock
          language="javascript"
          title="let + loop"
          code={`for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
// WHY? let is block-scoped.
// Each iteration creates a NEW i.
// Each closure captures its OWN copy.`}
        />
      </Card>
    </Grid>,
    <Callout key="7" type="tip" title="Real-World Uses of Closures">
      Closures power <strong>data privacy</strong> (module pattern),{" "}
      <strong>currying</strong>, <strong>memoization</strong>,{" "}
      <strong>React hooks</strong> (useState captures state via closure), and{" "}
      <strong>event handlers</strong>. When an interviewer asks "what is a
      closure?", they want you to explain the <em>mechanism</em> (scope chain
      retention), not just recite a definition.
    </Callout>,
  ],
};
