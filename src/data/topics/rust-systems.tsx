import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";

export const rustSystemsTopic: Topic = {
  id: "rust-systems",
  title: "Rust & Systems Architecture",
  description:
    "Why Rust dominates modern engine development, and the performance hierarchy of programming languages.",
  tags: ["rust", "compilers", "performance"],
  icon: "TerminalSquare",
  content: [
    <p key="1">
      Rust has become the paradigm-shifting standard for writing
      high-performance engines, core libraries, and infrastructure. It achieves
      this by shifting safety checks from runtime to compile-time.
    </p>,
    <Grid key="2" cols={2} gap={6}>
      <Card
        title="Memory Safety Without GC"
        description="The core of Rust's dominance"
      >
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Unlike C/C++, Rust guarantees memory safety at compile-time via the{" "}
          <Highlight variant="primary">Ownership Model</Highlight> and Borrow
          Checker, eliminating entire classes of bugs (segmentation faults, data
          races) without the runtime overhead of a Garbage Collector.
        </p>
      </Card>
      <Card
        title="Fearless Concurrency"
        description="Engine-grade multi-threading"
      >
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Writing parallel engines is notoriously difficult. Rust's strict type
          system ensures thread safety, allowing engineers to write highly
          concurrent code without fear of deadlocks or race conditions.
        </p>
      </Card>
    </Grid>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Performance & Compile Complexity Hierarchy
    </h4>,
    <p key="4">
      The architectural trade-off in modern languages is typically between{" "}
      <strong>Developer Velocity</strong> (fast compilation, slower runtime) and{" "}
      <strong>Execution Velocity</strong> (slow compilation, fast runtime).
    </p>,
    <Table
      key="5"
      headers={[
        "Language",
        "Execution Speed",
        "Compile Complexity",
        "Under The Hood Architecture",
      ]}
      rows={[
        [
          "C / C++",
          "⚡⚡⚡ Highest",
          "High (Manual AST/Linking)",
          "AOT (Ahead-of-Time) Compiled",
        ],
        [
          "Rust",
          "⚡⚡⚡ Highest",
          "Very High (Borrow Checker, LLVM)",
          "AOT Compiled",
        ],
        ["Go", "⚡⚡ High", "Very Low (Fast Compilation)", "AOT Compiled + GC"],
        [
          "Java / C#",
          "⚡ High",
          "Medium (Bytecode via JIT)",
          "JIT (Just-in-Time) Compiled + GC",
        ],
        [
          "JavaScript / Python",
          "🐌 Lowest",
          "None (Interpreted)",
          "Interpreted / JIT Runtime",
        ],
      ]}
    />,
    <h4 key="6" className="text-xl font-bold mt-8 mb-4">
      Why does a slow compile equal a fast runtime?
    </h4>,
    <p key="7">
      Rust compilation is notoriously slow comparing to Go or JavaScript
      iteration, but this is an intentional structural design to maximize
      instruction execution speed:
    </p>,
    <Step key="8" index={1}>
      <strong>The Borrow Checker:</strong> Before emitting any code, the
      compiler mathematically proves that all memory access is safe, enforcing
      strict lifetime rules. This takes compilation time but completely removes
      the need for CPU-intensive runtime boundary checks or GC sweeps.
    </Step>,
    <Step key="9" index={2}>
      <strong>Zero-Cost Abstractions:</strong> Rust allows high-level, ergonomic
      code (like iterators or traits) but the compiler flattens them down to the
      exact equivalent of hand-written, optimized assembly during compilation.
    </Step>,
    <Step key="10" index={3}>
      <strong>Aggressive LLVM Optimization:</strong> Because Rust feeds
      extremely strictly-typed and constraint-rich intermediate representations
      to LLVM, LLVM can perform incredibly aggressive memory optimizations that
      C/C++ compilers often can't risk due to "pointer aliasing" ambiguity.
    </Step>,
    <Callout key="11" type="tip" title="The Architect's Trade-off">
      You pay a massive front-loaded cost in compile time and developer learning
      curve so your execution environment never pays a cost in runtime latency
      or random application crashes. This makes it the ultimate ecosystem for{" "}
      <strong>
        game engines, databases, JS runtimes (like Deno/Bun), and core network
        infrastructure
      </strong>
      .
    </Callout>,
  ],
};
