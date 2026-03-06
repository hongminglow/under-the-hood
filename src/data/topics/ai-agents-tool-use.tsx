import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";

export const aiAgentsTopic: Topic = {
  id: "ai-agents-tool-use",
  title: "AI Agents & Tool Use",
  description:
    "From chatbots to autonomous agents: ReAct loops, function calling, multi-step reasoning, and the architecture behind AI that takes action.",
  tags: ["ai", "agents", "llm", "architecture"],
  icon: "Bot",
  content: [
    <p key="1">
      A chatbot responds to a single message. An <strong>AI Agent</strong> can{" "}
      <strong>reason, plan, and execute multi-step actions</strong> by calling
      external tools (APIs, databases, web search, code execution) in a loop
      until the task is complete. This is the paradigm shift from "AI as text
      generator" to "AI as autonomous worker."
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Agent Loop (ReAct Pattern)
    </h4>,
    <Step key="3" index={1}>
      <strong>Observe:</strong> Agent receives user request + conversation
      history + available tools and their descriptions.
    </Step>,
    <Step key="4" index={2}>
      <strong>Reason:</strong> LLM decides which tool to call (or whether to
      respond directly). Outputs structured JSON: tool name + arguments.
    </Step>,
    <Step key="5" index={3}>
      <strong>Act:</strong> The orchestrator executes the tool call (e.g., web
      search, database query, file write) and returns the result.
    </Step>,
    <Step key="6" index={4}>
      <strong>Loop:</strong> The tool result is appended to conversation. The
      LLM decides: call another tool, or generate a final response. This
      continues until the task is done.
    </Step>,
    <Table
      key="7"
      headers={["Framework", "Ecosystem", "Key Feature"]}
      rows={[
        [
          "OpenAI Function Calling",
          "API-native",
          "JSON schema tool definitions, parallel tool calls",
        ],
        [
          "LangChain / LangGraph",
          "Python / JS",
          "Agent graphs, state management, memory, tool chaining",
        ],
        [
          "CrewAI",
          "Python",
          "Multi-agent teams with roles (Researcher, Writer, Reviewer)",
        ],
        [
          "Vercel AI SDK",
          "TypeScript",
          "Streaming, React hooks, tool calling with type safety",
        ],
        [
          "AutoGen (Microsoft)",
          "Python",
          "Conversational multi-agent patterns",
        ],
      ]}
    />,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <Card title="Single Agent vs Multi-Agent">
        <p className="text-sm">
          <strong>Single agent:</strong> One LLM with access to many tools.
          Simple, good for most use cases. <strong>Multi-agent:</strong>{" "}
          Specialized agents collaborate (e.g., Planner → Coder → Reviewer).
          Better for complex workflows but harder to orchestrate and debug.
        </p>
      </Card>
      <Card title="Tool Design Matters">
        <p className="text-sm">
          Tools must have <strong>clear names and descriptions</strong> — the
          LLM reads them to decide which tool to call.{" "}
          <code>search_database(query: string)</code> beats{" "}
          <code>doStuff(x: any)</code>. Bad tool design = bad agent behavior.
          Think of tools as the agent's <strong>API</strong>.
        </p>
      </Card>
    </Grid>,
    <Callout key="9" type="warning" title="Agent Safety & Control">
      Agents can take <strong>real-world actions</strong> — send emails, delete
      files, charge credit cards. Always implement: <strong>1.</strong>{" "}
      Human-in-the-loop approval for destructive actions. <strong>2.</strong>{" "}
      Maximum iteration limits (prevent infinite loops). <strong>3.</strong>{" "}
      Sandboxing for code execution. <strong>4.</strong> Audit logging of every
      tool call.
    </Callout>,
  ],
};
