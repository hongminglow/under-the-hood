import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";

export const llmWebVsIdeVsCliTopic: Topic = {
  id: "llm-web-vs-ide-vs-cli",
  title: "LLM Web App vs IDE Extension vs CLI",
  description:
    "Why the same provider can feel totally different across chat apps, editor assistants, and coding agents running in the terminal.",
  tags: ["ai", "llm", "agents", "ide", "cli"],
  icon: "Cpu",
  content: [
    <p key="1">
      The most important mental model is this:{" "}
      <strong>the model is only one layer of the product</strong>. A normal web
      app, an IDE assistant, and a coding CLI may all talk to a similar family
      of models, but they wrap that model in completely different{" "}
      <strong>context pipelines, tools, latency budgets, and safety rules</strong>.
      That is why one can feel "smarter" or "faster" even when the underlying
      provider is similar.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Three Product Surfaces
    </h3>,
    <Table
      key="3"
      headers={["Surface", "What It Usually Sees", "What It Can Do", "Best For"]}
      rows={[
        [
          "Web App",
          "Your chat history, uploaded files/images, maybe lightweight memory",
          "Answer, reason, summarize, generate text/code, sometimes browse or run limited tools",
          "Brainstorming, learning, planning, research, broad Q&A",
        ],
        [
          "IDE Extension",
          "Open file, nearby files, diagnostics, symbols, selected code, editor cursor position",
          "Inline edit, autocomplete, refactor suggestions, explain code, sometimes repo search",
          "Daily coding flow, quick fixes, local explanations, code completion",
        ],
        [
          "CLI / Coding Agent",
          "Repository files, terminal output, git state, test failures, shell environment, task instructions",
          "Search files, edit code, run tests, inspect logs, loop on failures, sometimes use approvals/sandboxing",
          "Debugging, multi-file changes, refactors, build/test-driven coding tasks",
        ],
      ]}
    />,
    <Grid key="4" cols={2} gap={6}>
      <Card
        title="Web Apps Feel Smarter in Conversation"
        description="Less local noise, more general reasoning"
      >
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          A chat product can spend more of its token budget on conversation,
          explanation quality, writing style, and broad reasoning because it is
          not busy indexing your repo, formatting patches, or managing shell
          permissions.
        </p>
      </Card>
      <Card
        title="CLI Agents Feel Stronger at Shipping"
        description="They can verify reality"
      >
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          A coding CLI may feel more capable because it can{" "}
          <strong>read the files, run the build, see the failure, patch the
          code, and retry</strong>. Even if its raw model is not "smarter" in
          the abstract, the harness gives it a much stronger execution loop.
        </p>
      </Card>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      What Actually Makes One Perform Better?
    </h3>,
    <Table
      key="6"
      headers={["Layer", "Why It Matters More Than People Expect", "Example"]}
      rows={[
        [
          "Context Assembly",
          "The answer quality depends heavily on which files, errors, symbols, or prior turns were packed into the prompt.",
          "An IDE assistant that includes the active function, imports, and TypeScript errors can beat a stronger model given only one pasted snippet.",
        ],
        [
          "Tool Access",
          "A model with shell, search, and test tools can verify reality instead of bluffing from memory.",
          "A CLI agent runs the failing test and fixes the exact assertion instead of guessing.",
        ],
        [
          "Prompt Scaffolding",
          "The hidden system prompt, formatting rules, guardrails, and task decomposition shape the model's behavior.",
          "One product tells the model to be concise chat; another tells it to iteratively edit, run, and recover.",
        ],
        [
          "Latency Budget",
          "Autocomplete tools optimize for sub-second speed, while deep chat tools tolerate slower but heavier reasoning.",
          "An IDE completion model may be smaller and faster, but still feel better while typing.",
        ],
        [
          "Retrieval Quality",
          "Getting the right 8 files beats dumping the wrong 80 files into context.",
          "Symbol-aware search often outperforms naive whole-repo stuffing.",
        ],
        [
          "Verification Loop",
          "Systems that can observe outputs and retry usually outperform one-shot chat for coding tasks.",
          "Read error -> patch code -> rerun test -> inspect new failure -> patch again.",
        ],
        [
          "Safety / Permissions",
          "Some agents are intentionally restricted, which reduces risk but also limits what they can solve autonomously.",
          "A web app may refuse filesystem access; a CLI may ask approval before running commands.",
        ],
      ]}
    />,
    <Callout key="7" type="tip" title="Bigger Model Is Not the Whole Story">
      A slightly weaker model inside a strong coding harness can beat a stronger
      model inside a plain chat window for practical engineering tasks. The
      surrounding system often determines whether the model can{" "}
      <strong>ground itself in reality</strong>.
    </Callout>,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      What Happens Behind the Scenes
    </h3>,
    <Step key="9" index={1}>
      The product first collects <strong>context</strong>: chat history, active
      editor state, selected files, terminal output, diagnostics, git diff, or
      uploaded documents.
    </Step>,
    <Step key="10" index={2}>
      A hidden <strong>system prompt</strong> and product instructions are
      added. This tells the model how it should behave: chat politely, emit
      inline edits, call tools, ask approvals, or keep retrying until a task is
      solved.
    </Step>,
    <Step key="11" index={3}>
      Some products run <strong>retrieval</strong> first: searching embeddings,
      symbol graphs, open tabs, test failures, or error logs to gather the most
      relevant context.
    </Step>,
    <Step key="12" index={4}>
      The model generates either a direct answer or a{" "}
      <strong>tool/action request</strong> like read-file, run-test, search-code,
      apply-patch, or browse-docs.
    </Step>,
    <Step key="13" index={5}>
      The harness executes that tool call, captures the result, and sends the
      observation back to the model. This creates an{" "}
      <strong>agent loop</strong>.
    </Step>,
    <Step key="14" index={6}>
      The loop stops when the model decides it has enough evidence, or when the
      product hits limits like timeouts, token budgets, rate limits, or safety
      restrictions.
    </Step>,
    <h3 key="15" className="text-xl font-bold mt-8 mb-4">
      Why IDE Assistants Feel Different From CLIs
    </h3>,
    <Grid key="16" cols={2} gap={6}>
      <Card title="IDE Extension" description="Optimized for typing flow">
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          IDE tools often use prefix/suffix context around your cursor, linter
          diagnostics, AST symbols, and open tabs. Their job is to stay
          low-latency and unobtrusive while you are coding live.
        </p>
      </Card>
      <Card title="CLI Agent" description="Optimized for task completion">
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          CLI agents are less about tiny completions and more about{" "}
          <strong>end-to-end execution</strong>: search the repo, edit multiple
          files, run commands, inspect failures, and converge toward a working
          result.
        </p>
      </Card>
    </Grid>,
    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      When To Use Which
    </h3>,
    <Table
      key="18"
      headers={["Need", "Best Surface", "Why"]}
      rows={[
        [
          "Learn a concept or compare trade-offs",
          "Web App",
          "The product is tuned for conversation, explanation, and broad context rather than local repo operations.",
        ],
        [
          "Finish a small edit while already coding",
          "IDE Extension",
          "It has the best awareness of your cursor, open file, diagnostics, and immediate local context.",
        ],
        [
          "Fix a failing build across multiple files",
          "CLI / Coding Agent",
          "The agent can inspect the repo, run the build, patch files, and verify the fix.",
        ],
        [
          "Review architecture before implementation",
          "Web App or Deep IDE Chat",
          "These surfaces usually devote more room to high-level reasoning and trade-off analysis.",
        ],
        [
          "Refactor a subsystem with many iterative checks",
          "CLI / Coding Agent",
          "The execution loop matters more than elegant prose.",
        ],
      ]}
    />,
    <Callout key="19" type="warning" title="Why the Same Provider Can Feel Inconsistent">
      Even inside one vendor, the products may use{" "}
      <strong>different models, different hidden prompts, different retrieval
      pipelines, different rate limits, and different tool permissions</strong>.
      So "Provider X was better in the web app than in the IDE" does not
      necessarily mean the model itself was better. Often the wrapper changed.
    </Callout>,
  ],
};
