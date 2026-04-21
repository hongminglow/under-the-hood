import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
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
      Modern prompting is shifting from "vague prose" to <strong>Programmatic Engineering</strong>. It is the process of manipulating the model's internal <strong>Self-Attention</strong> and <strong>KV Cache</strong> to produce deterministic, high-quality, and structured results.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      From Prose to DSPy (Programmatic)
    </h3>,
    <p key="3" className="mb-4">
      The future of prompting isn't hand-writing text. It's <strong>Optimization</strong>.
    </p>,
    <Table
      key="4"
      headers={["Technique", "Physical Action", "The 'Why'"]}
      rows={[
        ["Chain-of-Thought", "Forces the model to 'write its scratchpad' before the final answer.", "Prevents the model from 'blurt-guessing' the first token."],
        ["Self-Consistency", "Generate 5 variations of an answer; select the one with the most 'Votes'.", "Eliminates random statistical outliers in reasoning."],
        ["DSPy (Framework)", "Define a <strong>Signature</strong> (Input/Output). The framework 'Compiles' the best prompt.", "Removes the need for 'Manual Tweaking' of words."]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Precision Layer: Sampling Parameters
    </h3>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="Temperature (0 to 1)">
        <p className="text-sm text-slate-400 mb-2">
          Controls the <strong>Softmax</strong> randomness.
        </p>
        <p className="text-xs italic text-slate-400">
          T=0 is 'Greedy' (always picks the #1 most likely word). T=0.8 is 'Creative' (picks from a wider distribution).
        </p>
      </Card>
      <Card title="Top-P (Nucleus Sampling)">
        <p className="text-sm text-slate-400 mb-2">
          Limits the vocabulary based on <strong>Probability Mass</strong>.
        </p>
        <p className="text-xs italic text-slate-400">
          Top-P=0.9 means the model only considers the smallest set of words whose collective probability is 90%.
        </p>
      </Card>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Treating Prompts as Code: LMEval
    </h3>,
    <p key="8" className="mb-4">
      In production, you never "just ship" a prompt. You must <strong>Benchmarking</strong> it against a dataset.
    </p>,
    <ul className="list-disc pl-5 mb-8 text-sm space-y-2">
      <li><strong>Golden Dataset:</strong> A collection of "Perfect" (Input/Output) pairs to test new prompt versions.</li>
      <li><strong>Assertion Testing:</strong> Using <code>Zod</code> or <code>Instructor</code> to guarantee that the prompt output matches a strict JSON schema.</li>
    </ul>,
    <Callout key="9" type="tip" title="Context Management">
      As you add more <strong>Few-Shot Examples</strong>, the <strong>Prompt Latency</strong> increases. Each token in the prompt must be cross-referenced with every other token. For production speed, use only the <strong>3 most relevant</strong> examples found via RAG.
    </Callout>,
  ],
};
