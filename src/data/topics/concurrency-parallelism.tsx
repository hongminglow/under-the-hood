import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const concurrencyParallelismTopic: Topic = {
  id: "concurrency-vs-parallelism",
  title: "Concurrency vs Parallelism",
  description:
    "Two fundamentally different approaches to doing multiple things: interleaving tasks vs simultaneously executing them.",
  tags: ["cs-fundamentals", "performance", "threads"],
  icon: "Layers",
  content: [
    <p key="1">
      These two terms are constantly used interchangeably, but they describe
      fundamentally different concepts. Understanding the distinction is
      critical for writing performant software.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="Concurrency">
        <p className="text-sm mb-3">
          <strong>Dealing with</strong> multiple things at once. A single
          barista managing 5 orders by switching between tasks (taking orders,
          making coffee, serving). Only one thing happens at any given instant.
        </p>
        <ul className="text-sm space-y-1 list-disc pl-4 text-emerald-400">
          <li>JavaScript Event Loop (single thread, many tasks).</li>
          <li>Go goroutines on a single core.</li>
          <li>Python asyncio / async-await.</li>
        </ul>
      </Card>
      <Card title="Parallelism">
        <p className="text-sm mb-3">
          <strong>Doing</strong> multiple things at once. Five baristas each
          making one coffee simultaneously. Requires multiple physical CPU
          cores.
        </p>
        <ul className="text-sm space-y-1 list-disc pl-4 text-emerald-400">
          <li>Multi-threaded C++/Java/Rust.</li>
          <li>Web Workers in the browser.</li>
          <li>GPU shader execution (thousands of cores).</li>
        </ul>
      </Card>
    </Grid>,
    <Table
      key="3"
      headers={["Aspect", "Concurrency", "Parallelism"]}
      rows={[
        [
          "Goal",
          "Manage multiple tasks efficiently",
          "Execute multiple tasks simultaneously",
        ],
        ["Hardware", "Works on a single core", "Requires multiple cores"],
        [
          "Problem Type",
          "I/O-bound (network, disk)",
          "CPU-bound (math, encoding)",
        ],
        ["Risk", "Race conditions, deadlocks", "Data races, thread safety"],
        [
          "Language Example",
          "JS async/await, Go channels",
          "Rust threads, Java ForkJoin",
        ],
      ]}
    />,
    <Callout key="4" type="info" title="Rob Pike's Famous Quote">
      "Concurrency is about <em>dealing with</em> lots of things at once.
      Parallelism is about <em>doing</em> lots of things at once. One is about
      structure, the other is about execution. Concurrency is a way to structure
      a program to make it easier to understand and parallelize, but parallelism
      is the simultaneous execution." — Rob Pike, co-creator of Go.
    </Callout>,
  ],
};
