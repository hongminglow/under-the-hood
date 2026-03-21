import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";

export const howLlmsWorkTopic: Topic = {
  id: "how-llms-work",
  title: "How LLMs Work",
  description:
    "How billions of mathematical weights predict the absolute most likely next word in a sentence, and why they hallucinate.",
  tags: ["ai", "architecture"],
  icon: "BrainCircuit",
  content: [
    <p key="1">
      At its core, a Large Language Model (LLM) is a statistical engine designed to predict the <strong>most probable next token</strong>. Unlike traditional software, its behavior is determined by billions of adjustable weights (Parameters) rather than explicit conditional logic.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Training Lifecycle: Pre-training to RLHF
    </h3>,
    <p key="3" className="mb-4">
      Models go through a multi-stage process to become useful assistants.
    </p>,
    <Table
      key="4"
      headers={["Stage", "Technical Action", "Objective"]}
      rows={[
        ["1. Pre-training", "Self-supervised learning on 10T+ tokens of raw internet text (Unstructured).", "Acquire broad world knowledge and grammar."],
        ["2. SFT", "Supervised Fine-Tuning on high-quality (Input: Question, Output: Answer) pairs.", "Learn the format of 'Assistant Behavior'."],
        ["3. RLHF", "Reinforcement Learning from Human Feedback. Humans rank model outputs by helpfulness/safety.", "Align the model with human values and reduce toxicity."]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Secret to Speed: KV Caching
    </h3>,
    <p key="6" className="mb-4">
      Because LLMs are <strong>Autoregressive</strong> (output depends on all previous tokens), naive inference is O(N²). To fix this, engines use <strong>KV Caching</strong>: they store the 'Key' and 'Value' vectors of previous tokens in GPU memory so they don't have to be recomputed for every new word.
    </p>,
    <Grid key="7" cols={2} gap={6} className="my-8">
      <Card title="Context Window (RAM)">
        <p className="text-sm text-muted-foreground mb-2">
          The context window is physically limited by <strong>GPU VRAM</strong>.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Increasing the window linearly increases the KV Cache size. A 128k context window requires ~10GB of VRAM just to 'remember' the conversation history.
        </p>
      </Card>
      <Card title="In-Context Learning">
        <p className="text-sm text-muted-foreground mb-2">
          The model doesn't 'learn' while you chat.
        </p>
        <p className="text-xs italic text-muted-foreground">
          It uses <strong>Self-Attention</strong> to relate new tokens to the patterns found in your prompt. This allows it to follow instructions (few-shot) without weight updates.
        </p>
      </Card>
    </Grid>,
    <Callout key="8" type="info" title="Hallucinations">
      Hallucinations occur because there is no 'Fact Checking' layer. If the statistically most likely word to follow "The capital of France is..." is "Mars" (due to bad training data or context skew), the model will output "Mars" with 100% confidence. RAG (Retrieval-Augmented Generation) is the standard industrial fix for this.
    </Callout>,
  ],
};
