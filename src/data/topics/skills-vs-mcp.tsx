import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const skillsVsMcpTopic: Topic = {
  id: "skills-vs-mcp",
  title: "Skills vs MCP",
  description:
    "Why teams increasingly package repeatable workflows as skills, and how that differs from the Model Context Protocol layer.",
  tags: ["ai", "agents", "mcp", "skills", "tooling"],
  icon: "Brain",
  content: [
    <p key="1">
      People often compare <strong>Skills</strong> and <strong>MCP</strong> as
      if one is replacing the other, but they actually solve{" "}
      <strong>different layers of the stack</strong>. MCP is mostly about
      giving a model standardized access to external tools, resources, and
      structured capabilities. Skills are about packaging{" "}
      <strong>domain knowledge, workflow instructions, and reusable operating
      procedures</strong> so the agent knows <em>how</em> to solve a class of
      problems consistently.
    </p>,
    <Grid key="2" cols={2} gap={6}>
      <Card
        title="MCP"
        description="The protocol / transport / capability layer"
      >
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          MCP exposes tools, files, prompts, resources, or APIs to the model in
          a structured way. It answers: <strong>What can the agent access?</strong>
        </p>
      </Card>
      <Card
        title="Skills"
        description="The workflow / policy / know-how layer"
      >
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Skills bundle instructions, conventions, recipes, and decision rules.
          They answer: <strong>How should the agent approach this task?</strong>
        </p>
      </Card>
    </Grid>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Clean Comparison
    </h3>,
    <Table
      key="4"
      headers={["Dimension", "Skills", "MCP"]}
      rows={[
        [
          "Primary Purpose",
          "Package reusable workflows and domain-specific guidance",
          "Standardize tool/resource access between models and external systems",
        ],
        [
          "Main Artifact",
          "Instruction files, templates, step-by-step playbooks, reusable patterns",
          "Servers, tools, resources, prompts, protocol messages",
        ],
        [
          "Solves",
          "Inconsistency, poor task framing, repeated prompting, team conventions",
          "Context isolation, tool integration, file access, external system connectivity",
        ],
        [
          "Feels Better Because",
          "It makes the agent behave more predictably on recurring tasks",
          "It gives the agent more raw capability and live data access",
        ],
        [
          "Typical Failure Mode",
          "The instructions are vague, outdated, or too generic",
          "The tool exists, but the model uses it poorly or lacks the workflow to apply it well",
        ],
        [
          "Best Unit of Reuse",
          "A repeated job like code review, design-to-code, incident triage, or docs updates",
          "A capability like search repo, read Figma, query database, or browse docs",
        ],
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Why People Often Prefer Skills First
    </h3>,
    <Table
      key="6"
      headers={["Reason", "Why It Matters in Practice", "Example"]}
      rows={[
        [
          "Lower setup cost",
          "A team can write a skill in plain text or markdown much faster than standing up an MCP server.",
          "Create a `PR review` skill today instead of building a custom review service."
        ],
        [
          "Captures tribal knowledge",
          "Skills preserve how your team actually wants work done, not just what tools are available.",
          "A deployment skill can encode your exact rollback checklist and naming conventions."
        ],
        [
          "More predictable behavior",
          "Many failures come from bad task framing, not lack of tool access. Skills narrow the workflow.",
          "A SQL tuning skill tells the model to start with `EXPLAIN ANALYZE`, not random index guesses."
        ],
        [
          "Portable across providers",
          "Instructional assets can often move more easily between products than deeply custom tool integrations.",
          "The same skill can work in multiple agents with small formatting changes."
        ],
        [
          "Safer abstraction",
          "You can shape behavior without immediately exposing dangerous new capabilities.",
          "Give the agent a strict incident playbook before you give it production-changing tools."
        ],
        [
          "Better ROI for repeatable work",
          "If the same category of task repeats every week, a skill pays back quickly.",
          "Docs updates, dependency reviews, migration checklists, onboarding tasks."
        ],
      ]}
    />,
    <Callout key="7" type="tip" title="The Real Reason">
      Many teams discover that their agent was not failing because it lacked a
      protocol. It was failing because it lacked{" "}
      <strong>clear reusable judgment</strong>. Skills improve that faster than
      new plumbing.
    </Callout>,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Where MCP Still Wins Hard
    </h3>,
    <Grid key="9" cols={2} gap={6}>
      <Card
        title="Live System Access"
        description="Skills cannot replace capabilities"
      >
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          If the agent must read a design file, query a ticket system, inspect a
          database, or browse internal docs, you still need a capability layer
          like MCP. A skill cannot magically fetch data it cannot access.
        </p>
      </Card>
      <Card
        title="Standardization Across Tools"
        description="One protocol, many integrations"
      >
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          MCP becomes powerful when you want one model interface to talk to many
          external systems without handcrafting each integration differently for
          every vendor or product surface.
        </p>
      </Card>
    </Grid>,
    <h3 key="10" className="text-xl font-bold mt-8 mb-4">
      When To Use Which
    </h3>,
    <Table
      key="11"
      headers={["Situation", "Prefer", "Why"]}
      rows={[
        [
          "The task repeats often, but the agent already has enough tools",
          "Skills",
          "The bottleneck is workflow quality, not missing access."
        ],
        [
          "The agent needs new external data or actions",
          "MCP",
          "You need capabilities the model simply does not have yet."
        ],
        [
          "The team wants consistent outputs across many similar tasks",
          "Skills",
          "Reusable guidance beats rewriting prompts from scratch every time."
        ],
        [
          "You need reliable integration with design tools, docs, DBs, or internal systems",
          "MCP",
          "This is exactly what the protocol layer is for."
        ],
        [
          "You want the best overall system",
          "Both together",
          "MCP gives access; skills tell the agent how to use that access intelligently."
        ],
      ]}
    />,
    <h3 key="12" className="text-xl font-bold mt-8 mb-4">
      The Best Mental Model
    </h3>,
    <p key="13">
      Think of <strong>MCP as the toolbox connection</strong> and{" "}
      <strong>Skills as the playbook</strong>. A toolbox without a playbook
      creates chaotic agents with lots of power but weak judgment. A playbook
      without tools creates disciplined agents that still cannot see or do much.
      The strongest agent systems usually combine both.
    </p>,
    <Callout key="14" type="warning" title="Not Really 'Instead Of'">
      When people say they prefer skills "instead of MCP", what they often mean
      is: <strong>for their current pain, workflow packaging solved more value
      faster than protocol plumbing</strong>. That does not make MCP obsolete.
      It means the missing layer was different.
    </Callout>,
  ],
};
