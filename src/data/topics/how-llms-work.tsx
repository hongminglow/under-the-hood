import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";

export const llmHowItWorksTopic: Topic = {
  id: "how-llms-work",
  title: "How LLMs Work",
  description:
    "Transformers, attention, tokenization, and the math behind ChatGPT — how a neural network generates human-like text.",
  tags: ["ai", "llm", "transformers", "deep-learning"],
  icon: "Brain",
  content: [
    <p key="1">
      Large Language Models (LLMs) like GPT-4, Claude, and Llama are built on
      the <strong>Transformer architecture</strong> (2017, "Attention Is All You
      Need"). At their core, they do one thing:{" "}
      <strong>predict the next token</strong> given all previous tokens. They
      don't "understand" — they compute statistical patterns across trillions of
      tokens of training data.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Pipeline
    </h4>,
    <Step key="3" index={1}>
      <strong>Tokenization:</strong> Input text is split into{" "}
      <strong>tokens</strong> (subwords). "unhappiness" → ["un", "happiness"].
      GPT-4 uses ~100K token vocabulary. Each token gets an integer ID.
    </Step>,
    <Step key="4" index={2}>
      <strong>Embedding:</strong> Each token ID maps to a high-dimensional
      vector (e.g., 4096 dimensions). This vector captures semantic meaning —
      "king" and "queen" are nearby in embedding space.
    </Step>,
    <Step key="5" index={3}>
      <strong>Self-Attention:</strong> Each token "attends" to every other token
      in the sequence via <strong>Query, Key, Value matrices</strong>. This lets
      "it" in "The cat sat because it was tired" attend to "cat".
    </Step>,
    <Step key="6" index={4}>
      <strong>Feed-Forward + Layers:</strong> After attention, each token passes
      through a neural network. This repeats across{" "}
      <strong>96+ transformer layers</strong> (GPT-4). Each layer refines the
      representation.
    </Step>,
    <Step key="7" index={5}>
      <strong>Prediction:</strong> The final layer outputs a probability
      distribution over the vocabulary. Token with highest probability (or
      sampled via temperature) becomes the next word.{" "}
      <strong>Repeat autoregressively.</strong>
    </Step>,
    <Table
      key="8"
      headers={["Concept", "What It Does"]}
      rows={[
        [
          "Self-Attention",
          "Lets each token look at all other tokens to understand context",
        ],
        [
          "Multi-Head Attention",
          "Runs attention multiple times in parallel — each head learns different patterns",
        ],
        [
          "Positional Encoding",
          "Tells the model the ORDER of tokens (Transformers have no inherent sequence)",
        ],
        [
          "Temperature",
          "Controls randomness: 0 = deterministic, 1 = creative, 2 = chaos",
        ],
        [
          "Context Window",
          "Maximum tokens the model can see at once (GPT-4: 128K, Claude: 200K)",
        ],
      ]}
    />,
    <Grid key="9" cols={2} gap={6} className="my-8">
      <Card title="Pre-Training vs Fine-Tuning">
        <p className="text-sm">
          <strong>Pre-training:</strong> Learn language from the entire internet
          (trillions of tokens, $100M+ compute). <strong>Fine-tuning:</strong>{" "}
          Specialize on specific tasks (instruction following, code, medical).
          RLHF (Reinforcement Learning from Human Feedback) aligns the model
          with human preferences.
        </p>
      </Card>
      <Card title="Inference Cost">
        <p className="text-sm">
          Each token generated requires a <strong>forward pass</strong> through
          all 96+ layers. Longer context = more KV-cache memory. This is why API
          pricing is <strong>per-token</strong> and why long prompts are
          expensive. Techniques like KV-cache, speculative decoding, and
          quantization reduce cost.
        </p>
      </Card>
    </Grid>,
    <Callout key="10" type="info" title="LLMs Don't 'Think'">
      LLMs are <strong>next-token prediction machines</strong>. They don't have
      memory between conversations, don't have beliefs, and can confidently
      generate plausible-sounding but factually wrong text (
      <strong>hallucinations</strong>). Understanding this limitation is
      critical for building reliable AI applications.
    </Callout>,
  ],
};
