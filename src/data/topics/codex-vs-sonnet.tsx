import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";

export const codexVsSonnetTopic: Topic = {
  id: "codex-vs-sonnet",
  title: "Codex vs Sonnet/Opus",
  description:
    "How architectural differences between specialized coding models and general-purpose frontier models affect problem-solving and software development.",
  tags: ["ai", "architecture", "codex", "claude", "llm-agents"],
  icon: "Cpu",
  content: [
    <p key="1">
      When developers debate between models like <strong>OpenAI Codex</strong> (the architecture often driving dedicated coding assistants) and Anthropic's <strong>Claude 3 Sonnet/Opus</strong>, they are comparing two completely different design philosophies: <strong>Specialized Agentic Harnesses</strong> versus <strong>General-Purpose Frontier Intelligence</strong>.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Core Architectural Philosophies
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Codex Architecture">
        <p className="text-sm text-slate-400 mb-4">
          Built strictly as an expert developer-in-the-loop. It focuses on taking immediate, executable actions inside a sandbox.
        </p>
        <ul className="text-sm text-slate-400 list-disc pl-4 space-y-2">
          <li><strong>Training:</strong> Heavily biased toward vast amounts of GitHub repositories, commit histories, and terminal outputs.</li>
          <li><strong>Decision Logic:</strong> Iterative trial-and-error—it prefers to write code, execute a test, read the stack trace, and fix the bug in a rapid loop.</li>
        </ul>
      </Card>
      <Card title="Sonnet / Opus Architecture">
        <p className="text-sm text-slate-400 mb-4">
          Massive frontier models (utilizing Mixture of Experts) tuned heavily by Constitutional AI to excel at deep, generalized reasoning.
        </p>
        <ul className="text-sm text-slate-400 list-disc pl-4 space-y-2">
          <li><strong>Training:</strong> Broad world knowledge combined with complex instruction-following datasets.</li>
          <li><strong>Decision Logic:</strong> Holistic architectural planning—it analyzes system trade-offs and generates comprehensive mental models before touching code.</li>
        </ul>
      </Card>
    </Grid>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      How They Approach Problem Solving
    </h3>,
    <p key="5" className="mb-4">
      Because of their training, these models tackle a feature request or broken build very differently:
    </p>,
    <Flow 
      key="6"
      steps={[
        { title: "Specialized Agents (Codex)", description: "Read current file -> Write immediate fix -> Run compiler/test in terminal -> Ingest specific error -> Re-write fix (Iterative Micro-loop)." },
        { title: "Frontier Reasoners (Opus)", description: "Analyze entire system context in large memory window -> Reason about architectural limits -> Produce complete structured design plan -> Output coordinated multi-file implementations." }
      ]}
    />,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Key Differences in Practice
    </h3>,
    <Table
      key="8"
      headers={["Aspect", "Codex-Style Agents", "Sonnet/Opus Models"]}
      rows={[
        ["Context & Memory", "Highly localized to the active IDE window and terminal syntax.", "Massive context windows (e.g., 200k tokens), capable of cross-referencing vast codebases simultaneously."],
        ["System Design", "Weaker at abstract scaffolding. Wants to solve the problem directly in front of it.", "Exceptional at designing robust system architectures, databases, and APIs from scratch."],
        ["Workflow Integration", "Deeply integrated via agentic harnesses to tools like linters, bash, and git.", "Often acts as an autonomous thinking partner orchestrating higher-level strategies."],
        ["Speed vs Depth", "Built for low-latency autocomplete layers and rapid bug patching.", "Sonnet is fast and balanced for daily coding; Opus trades latency for maximum analytical depth on hard refactors."]
      ]}
    />,
    <Callout key="9" type="tip" title="The Professional Hybrid Workflow">
      Modern software engineers don't limit themselves to one. Standard practice is to use an <strong>Opus-level model</strong> for architectural planning, reviewing PRs, and complex refactoring, while relying on a <strong>Codex-powered assistant</strong> running locally in the IDE to iteratively implement those plans and catch immediate syntax errors.
    </Callout>,
  ],
};
