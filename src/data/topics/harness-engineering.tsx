import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";

export const harnessEngineeringTopic: Topic = {
  id: "harness-engineering",
  title: "Harness Engineering",
  description:
    "Why reliable agent systems depend less on prompts alone and more on the surrounding tools, feedback loops, and repository legibility.",
  tags: ["ai", "agents", "architecture", "tooling", "reliability"],
  icon: "Cpu",
  content: [
    <p key="1">
      <strong>Harness Engineering</strong> is the discipline of designing the
      environment around an AI agent so it can repeatedly produce useful work.
      Instead of treating the model as magic, it focuses on the
      <strong> system of execution</strong>: context loading, repository docs,
      tool access, tests, review agents, safety gates, and self-correction
      loops. The modern community interest around the term accelerated in{" "}
      <strong>February 2026</strong>, but the underlying idea is older:
      reliable agents improve most when they can <em>see reality</em>, receive
      clear constraints, and verify their own output.
    </p>,
    <Callout key="2" type="info" title="Why The Term Suddenly Spread">
      The phrase became widely discussed after Mitchell Hashimoto described
      “engineering the harness,” OpenAI published{" "}
      <strong>Harness engineering: leveraging Codex in an agent-first world</strong>
      , and Thoughtworks / Martin Fowler later expanded the concept into a
      broader model for coding-agent users. The viral part was not a new neural
      architecture. It was a new <strong>language for a systems problem</strong>.
    </Callout>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Core Mental Model
    </h3>,
    <Table
      key="4"
      headers={["Layer", "What It Does", "Typical Examples"]}
      rows={[
        [
          "Base model",
          "Provides reasoning, code generation, language understanding, and tool-call decisions.",
          "GPT-style coding model, frontier chat model, distilled local model",
        ],
        [
          "Context engineering",
          "Chooses what information is loaded into the current run.",
          "Relevant files, errors, diffs, docs, logs, screenshots",
        ],
        [
          "Harness engineering",
          "Designs the broader operating environment so the agent can succeed repeatedly.",
          "AGENTS.md, skills, test scripts, sandboxes, review loops, custom linters",
        ],
        [
          "Human steering",
          "Sets goals, priorities, boundaries, and decides when autonomy is acceptable.",
          "Task framing, approvals, escalation, final review",
        ],
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      How A Good Harness Changes Agent Behavior
    </h3>,
    <Flow
      key="6"
      steps={[
        {
          title: "1. Constrain",
          description:
            "Give the agent a map: architecture docs, project rules, task-specific skills, and allowed tools.",
        },
        {
          title: "2. Act",
          description:
            "Let it read files, run commands, call services, or edit code inside a controlled execution surface.",
        },
        {
          title: "3. Sense",
          description:
            "Return deterministic feedback like lint, type, test, screenshot, or log results plus optional AI review.",
        },
        {
          title: "4. Self-correct",
          description:
            "The agent retries using real failure signals instead of guessing from memory.",
        },
        {
          title: "5. Compound",
          description:
            "When a mistake repeats, engineers improve the harness so future runs avoid it.",
        },
      ]}
    />,
    <Grid key="7" cols={2} gap={6}>
      <Card
        title="Weak Harness"
        description="High intelligence, low grounding"
      >
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The agent may sound smart, but it guesses APIs, misses repo
          conventions, over-edits files, or repeats the same broken command
          because nothing in the environment teaches it faster than trial and
          error.
        </p>
      </Card>
      <Card
        title="Strong Harness"
        description="Moderate intelligence, high leverage"
      >
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Even a less impressive model can perform surprisingly well when the
          repository is legible, the tasks are structured, and fast feedback
          tells it exactly what failed and how to recover.
        </p>
      </Card>
    </Grid>,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Feedforward vs Feedback
    </h3>,
    <Table
      key="9"
      headers={["Control Type", "Purpose", "Concrete Examples"]}
      rows={[
        [
          "Feedforward guides",
          "Reduce mistakes before the agent takes action.",
          "AGENTS.md, architecture docs, design system references, workflow skills, command wrappers",
        ],
        [
          "Computational sensors",
          "Catch failures deterministically and cheaply after execution.",
          "Type-checking, linting, unit tests, structural tests, schema validation",
        ],
        [
          "Inferential sensors",
          "Judge semantics or product quality where deterministic rules are too weak.",
          "AI code review, UX review, “LLM as judge”, product-spec conformance review",
        ],
        [
          "Human oversight",
          "Intervenes where cost, risk, or ambiguity remain too high.",
          "Approval for destructive actions, final merge, production sign-off",
        ],
      ]}
    />,
    <Callout key="10" type="tip" title="The Winning Pattern">
      The best harnesses use <strong>cheap deterministic feedback everywhere</strong>
      &nbsp;and reserve expensive semantic judgment for the places where it
      truly matters. If every check is slow and probabilistic, the agent loop
      becomes expensive and frustrating.
    </Callout>,
    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      Is This “Training” The Agent?
    </h3>,
    <Grid key="12" cols={2} gap={6}>
      <Card
        title="What It Usually Is"
        description="Behavior shaping without changing model weights"
      >
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Most harness engineering does <strong>not</strong> retrain the base
          model. It improves outcomes by changing the agent’s operating
          conditions: what it sees, what it can do, how it is checked, and how
          quickly it can recover from errors.
        </p>
      </Card>
      <Card
        title="Where It Can Touch Training"
        description="Great harnesses can produce great training data"
      >
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Accepted patches, tool traces, review loops, and high-quality failure
          corrections can later become synthetic data for SFT, preference
          tuning, or distillation. The harness is often what makes those traces
          clean enough to reuse.
        </p>
      </Card>
    </Grid>,
    <Table
      key="13"
      headers={["Question", "Harness Engineering Answer"]}
      rows={[
        [
          "Does it change the model weights directly?",
          "Usually no. It changes the workflow around inference time.",
        ],
        [
          "Can it make the agent feel much smarter?",
          "Yes. Better evidence and better feedback often beat raw model upgrades.",
        ],
        [
          "Can it influence future training?",
          "Yes. Strong harnesses generate better traces, evaluations, and supervision data.",
        ],
        [
          "Is it just prompt engineering renamed?",
          "No. Prompting is only one part of the harness; tools, docs, tests, constraints, and control loops matter just as much.",
        ],
      ]}
    />,
    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      Why It Matters So Much In Software Engineering
    </h3>,
    <Table
      key="15"
      headers={["Problem", "Without Harness", "With Harness"]}
      rows={[
        [
          "Repo navigation",
          "Agent wanders through files and misses the real abstraction boundaries.",
          "Architecture docs, directory maps, and naming conventions shorten search drastically.",
        ],
        [
          "Bug fixing",
          "The model guesses the bug from prose alone.",
          "The agent can run the app, capture logs, reproduce the issue, and verify the fix.",
        ],
        [
          "Style and consistency",
          "Human review catches the same boring issues repeatedly.",
          "Linters, codemods, and structure rules convert taste into reusable enforcement.",
        ],
        [
          "Safety",
          "The agent has too much freedom or too little autonomy.",
          "Sandboxing, approvals, and scoped tools let it move fast without reckless access.",
        ],
        [
          "Scaling the team",
          "Every new run re-learns the same tribal knowledge.",
          "Repository-local docs and skills become the system of record for future runs.",
        ],
      ]}
    />,
    <h3 key="16" className="text-xl font-bold mt-8 mb-4">
      A Practical Example: This Knowledge Base
    </h3>,
    <p key="17">
      This application already demonstrates a small but real harness. The local
      <strong> SKILL.md</strong> constrains output structure, preferred UI
      components, import hygiene, React key requirements, and common JSX
      pitfalls. That means the model is not asked to “just write a topic.” It
      is given a framework for <strong>how this repository wants topics to be
      produced</strong>, which reduces drift and makes failures easier to
      detect.
    </p>,
    <Grid key="18" cols={2} gap={6}>
      <Card title="Harness Inputs" description="What the agent receives">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Topic conventions, section taxonomy, component recipes, README counter
          rules, and examples from existing topic files all act as
          feedforward controls.
        </p>
      </Card>
      <Card title="Harness Feedback" description="What keeps quality stable">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          TypeScript, the build step, import validation, and visible rendering
          errors act as sensors. When a mistake appears, the repo instructions
          can be tightened so the same failure becomes less likely next time.
        </p>
      </Card>
    </Grid>,
    <Callout key="19" type="warning" title="Common Misread">
      Harness engineering is <strong>not</strong> proof that models no longer
      matter. Stronger models still help. The point is that once agents can act
      in the world, performance depends heavily on the surrounding system. Many
      real-world failures are workflow failures, not pure intelligence failures.
    </Callout>,
    <h3 key="20" className="text-xl font-bold mt-8 mb-4">
      The Best Mental Model
    </h3>,
    <p key="21">
      If pretraining builds the <strong>brain</strong>, harness engineering
      builds the <strong>workplace</strong>. The most reliable agents are not
      just “smart models.” They are smart models placed inside environments
      that make the right action easier, the wrong action visible, and recovery
      cheap.
    </p>,
  ],
};
