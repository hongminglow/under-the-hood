import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const vibeCodingAiPairProgrammingTopic: Topic = {
  id: "vibe-coding-ai-pair-programming",
  title: "Vibe Coding & AI Pair Programming",
  description:
    "How strong developers use AI agents in practice, and how to prompt them clearly without wasting turns or sending them in the wrong direction.",
  tags: ["ai", "vibe coding", "prompting", "developer-workflow", "agents"],
  icon: "Bot",
  content: [
    <p key="1">
      <strong>Vibe coding</strong> usually means coding through rapid natural
      language direction instead of manually writing every line yourself. The
      good version feels like a senior pair-programmer loop: you set direction,
      the agent explores and implements, then both of you verify. The bad
      version is just spraying vague wishes like <code>make it better</code> and
      hoping the model reads your mind.
    </p>,
    <Callout key="2" type="tip" title="The Core Shift">
      Strong developers do not use AI as a magic code generator. They use it as
      a <strong>high-speed execution partner</strong> with tight constraints,
      fast feedback loops, and explicit definitions of success.
    </Callout>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      What Strong Developers Actually Do
    </h3>,
    <Table
      key="4"
      headers={["Weak Vibe Coding", "Strong Vibe Coding"]}
      rows={[
        [
          "Ask for a huge change with almost no context",
          "Start with the exact goal, target files, constraints, and success criteria",
        ],
        [
          "Assume the agent understands the codebase automatically",
          "Tell the agent to inspect first, then act after grounding itself",
        ],
        [
          "Bundle design, logic, refactor, and bugfix into one foggy request",
          "Split work into clear stages: explore -> plan -> implement -> verify",
        ],
        [
          "Judge quality only by how plausible the code looks",
          "Require tests, build checks, screenshots, or concrete verification",
        ],
        [
          "Keep asking follow-ups that change the direction mid-flight",
          "Stabilize the target and update assumptions only when necessary",
        ],
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Best Prompt Shape for Coding Agents
    </h3>,
    <Grid key="6" cols={2} gap={6}>
      <Card title="Include These" description="High-signal prompt ingredients">
        <ul className="list-disc pl-5 text-sm space-y-2 text-slate-300">
          <li>
            The exact goal: bugfix, refactor, feature, explanation, review.
          </li>
          <li>The relevant files or subsystem names.</li>
          <li>
            Constraints: preserve API, keep styling, avoid new deps, no schema
            change.
          </li>
          <li>
            Definition of done: tests pass, route renders, typecheck clean, edge
            cases covered.
          </li>
          <li>
            Decision boundaries: ask before changing architecture, DB schema, or
            public API.
          </li>
        </ul>
      </Card>
      <Card title="Avoid These" description="Low-signal prompt habits">
        <ul className="list-disc pl-5 text-sm space-y-2 text-slate-300">
          <li>
            <code>Fix this</code> with no error or failing behavior attached.
          </li>
          <li>
            <code>Make it cleaner</code> with no scope boundary.
          </li>
          <li>Multiple unrelated goals in one prompt.</li>
          <li>
            Hidden assumptions like "same as before" when the agent lacks that
            context.
          </li>
          <li>Pasting massive logs without saying what matters in them.</li>
        </ul>
      </Card>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Prompting Formula That Usually Works
    </h3>,
    <CodeBlock
      key="8"
      title="good-coding-prompt.md"
      language="markdown"
      code={`
Goal:
Fix the broken pagination state in the orders page.

Context:
Relevant files are src/pages/orders.tsx and src/components/Pager.tsx.
The bug is that changing filters resets the page visually but still fetches the old page index.

Constraints:
- Do not change the API contract.
- Keep current UI structure and styling.
- Prefer the smallest safe fix.

Definition of done:
- Filter changes always reset both UI state and request state to page 1.
- Typecheck/build passes.
- Explain the root cause briefly.

If you discover this needs a broader refactor, pause and say why before changing architecture.
      `}
    />,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Bad Prompt vs Good Prompt
    </h3>,
    <Table
      key="10"
      headers={["Bad Prompt", "Why It Fails", "Better Prompt"]}
      rows={[
        [
          "`make this page better`",
          "No scope, no metric, no constraint, no target.",
          "`Improve the mobile layout of the pricing page without changing copy or desktop layout. Focus on spacing, hierarchy, and CTA visibility.`",
        ],
        [
          "`fix the bug in auth`",
          "Auth is too broad. The agent will guess.",
          "`Investigate why refresh token rotation fails after 30 minutes. Start by checking the token expiry logic in auth middleware and session refresh service.`",
        ],
        [
          "`refactor this mess`",
          "The agent does not know whether you want readability, performance, architecture, or naming cleanup.",
          "`Refactor this component for readability only. Keep behavior identical and do not extract new hooks unless duplication is obvious.`",
        ],
        [
          "`use best practices`",
          "Best practices are contextual and often conflict.",
          "`Modernize this form using the project's existing React patterns. Do not introduce new libraries or move validation to the backend.`",
        ],
      ]}
    />,
    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      Why Prompts Get Wasted
    </h3>,
    <Table
      key="12"
      headers={["Failure Pattern", "What Happens Behind the Scenes", "Fix"]}
      rows={[
        [
          "Too little context",
          "The model fills gaps with guesses and plausible-sounding assumptions.",
          "Name files, error messages, routes, or failing behavior explicitly.",
        ],
        [
          "Too much irrelevant context",
          "Important signal gets buried in noise, and retrieval quality drops.",
          "Summarize the problem and point to the 1-3 most relevant files first.",
        ],
        [
          "Scope ambiguity",
          "The agent cannot tell whether to patch locally or redesign globally.",
          "State whether you want a minimal fix, medium cleanup, or full redesign.",
        ],
        [
          "Moving target",
          "The agent optimizes for a goal that changes every message.",
          "Stabilize the target, or explicitly say the goal changed.",
        ],
        [
          "No verification target",
          "The agent stops at plausible code because it lacks a finish line.",
          "Require test/build/lint/UI verification in the prompt.",
        ],
      ]}
    />,
    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      The Strong Developer Workflow
    </h3>,
    <Step key="14" index={1}>
      <strong>Anchor the task.</strong> Say what outcome you want and where it
      lives.
    </Step>,
    <Step key="15" index={2}>
      <strong>Constrain the space.</strong> Say what must not change: APIs,
      visuals, dependencies, architecture, database schema.
    </Step>,
    <Step key="16" index={3}>
      <strong>Ask for grounding first.</strong> For non-trivial work, tell the
      agent to inspect the codebase before editing.
    </Step>,
    <Step key="17" index={4}>
      <strong>Prefer small loops.</strong> One bug, one feature slice, one
      component, one verification cycle.
    </Step>,
    <Step key="18" index={5}>
      <strong>Demand proof.</strong> Build output, tests, screenshots, or root
      cause summary.
    </Step>,
    <Step key="19" index={6}>
      <strong>Course-correct with precision.</strong> Say exactly what was wrong
      in the previous attempt instead of reissuing the whole task vaguely.
    </Step>,
    <h3 key="20" className="text-xl font-bold mt-8 mb-4">
      How To Correct an Agent Without Misleading It
    </h3>,
    <Grid key="21" cols={2} gap={6}>
      <Card title="Bad Correction" description="Creates more confusion">
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          "No not like that, do it better." This does not tell the model what
          was wrong: logic, style, performance, UX, architecture, or tests.
        </p>
      </Card>
      <Card title="Good Correction" description="Points to the real delta">
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          "Keep your pagination fix, but revert the UI restyle. I only wanted
          the data bug fixed. Do not change markup or class names." This narrows
          the correction to the exact dimension that drifted.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="22"
      title="good-feedback-loop.md"
      language="markdown"
      code={`
Keep the previous database fix.

What to change:
- Revert the button styling changes.
- Do not rename any exported functions.
- Keep the new test you added.

What was wrong:
- The UI drift was outside scope.
- I only wanted the stale state bug fixed.

Please patch only the affected files and rerun verification.
      `}
    />,
    <h3 key="23" className="text-xl font-bold mt-8 mb-4">
      When Vibe Coding Works Best
    </h3>,
    <Table
      key="24"
      headers={["Great Fit", "Weak Fit"]}
      rows={[
        [
          "Boilerplate, CRUD flows, test generation, refactors with clear constraints, UI polish, repetitive migration work, explaining unfamiliar code",
          "High-stakes security logic, novel algorithms, unclear product requirements, architecture changes with hidden business constraints, anything where no one can define 'done'",
        ],
      ]}
    />,
    <Callout
      key="25"
      type="warning"
      title="Vibe Coding Is Not No-Thinking Coding"
    >
      The strongest developers still own the hard parts: defining the right
      target, catching incorrect assumptions, judging trade-offs, and verifying
      reality. AI compresses execution time, but it does not remove engineering
      responsibility.
    </Callout>,
    <h3 key="26" className="text-xl font-bold mt-8 mb-4">
      The Highest-Leverage Habit
    </h3>,
    <p key="27">
      Talk to the agent like you are handing off to a fast teammate on a real
      codebase:{" "}
      <strong>
        state the problem, point to the files, define the constraints, set the
        finish line, and require evidence
      </strong>
      . That is the difference between chaotic vibe coding and professional
      AI-assisted engineering.
    </p>,
  ],
};
