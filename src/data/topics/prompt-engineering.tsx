import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Table } from "@/components/ui/Table";

export const promptEngineeringTopic: Topic = {
  id: "prompt-engineering",
  title: "Prompt Engineering Patterns",
  description:
    "The art and science of talking to LLMs: zero-shot, few-shot, chain-of-thought, system prompts, and the patterns that reliably extract better outputs.",
  tags: ["ai", "llm", "prompting", "best-practices"],
  icon: "MessageSquareCode",
  content: [
    <p key="1">
      The same LLM can give wildly different outputs depending on{" "}
      <strong>how you ask</strong>. Prompt engineering is the practice of
      structuring inputs to reliably extract high-quality, accurate, and
      format-compliant outputs from language models.
    </p>,
    <Table
      key="2"
      headers={["Pattern", "Technique", "When to Use"]}
      rows={[
        [
          "Zero-Shot",
          "Ask directly, no examples",
          "Simple tasks the model already knows well",
        ],
        [
          "Few-Shot",
          "Provide 2-5 examples in the prompt",
          "Classification, formatting, style matching",
        ],
        [
          "Chain-of-Thought (CoT)",
          '"Think step by step"',
          "Math, logic, multi-step reasoning",
        ],
        [
          "System Prompt",
          "Set role, constraints, output format",
          "Every production application",
        ],
        [
          "Self-Consistency",
          "Generate multiple answers, pick majority",
          "Reducing hallucinations on hard questions",
        ],
        [
          "ReAct",
          "Reason + Act in alternating steps",
          "Agent workflows with tool use",
        ],
      ]}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Few-Shot Prompting">
        <CodeBlock
          language="text"
          title="Classification Example"
          code={`Classify the sentiment:

"Love this product!" → Positive
"Worst purchase ever" → Negative
"It's okay I guess" → Neutral

"The battery life is incredible!" → `}
        />
      </Card>
      <Card title="Chain-of-Thought">
        <CodeBlock
          language="text"
          title="Reasoning Example"
          code={`Q: If a store has 3 apples and
gets 2 shipments of 5 apples each,
how many apples total?

A: Let me think step by step:
- Start with 3 apples
- 2 shipments × 5 apples = 10
- Total: 3 + 10 = 13 apples`}
        />
      </Card>
    </Grid>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="Structured Output">
        <p className="text-sm">
          Force JSON output: "Respond ONLY with valid JSON matching this schema:
          ..." or use OpenAI's{" "}
          <code>
            response_format: {"{"} type: "json_object" {"}"}
          </code>
          . For complex schemas, use <strong>Zod + structured outputs</strong>{" "}
          to validate at the API level.
        </p>
      </Card>
      <Card title="System Prompt Best Practices">
        <p className="text-sm">
          <strong>1.</strong> Define the role ("You are a senior code
          reviewer"). <strong>2.</strong> Set constraints ("Never reveal
          internal data"). <strong>3.</strong> Specify output format ("Respond
          in markdown with code blocks"). <strong>4.</strong> Handle edge cases
          ("If unsure, say 'I don't know'").
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="tip" title="The Meta-Prompt Trick">
      When a prompt isn't working, ask the LLM to{" "}
      <strong>improve the prompt itself</strong>: "You are a prompt engineering
      expert. Rewrite this prompt to be clearer and produce more accurate
      results: [your prompt]". LLMs are surprisingly good at optimizing their
      own instructions.
    </Callout>,
  ],
};
