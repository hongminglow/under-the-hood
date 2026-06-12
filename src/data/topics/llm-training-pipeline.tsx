import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Highlight } from "@/components/ui/Highlight";
import { SourceMarker } from "@/components/ui/SourceMarker";
import {
  Database,
  FlaskConical,
  Cpu,
  Scale,
  Zap,
  Globe,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

export const llmTrainingPipelineTopic: Topic = {
  id: "llm-training-pipeline",
  title: "How LLMs Are Trained: GPT to GPT-5",
  description:
    "The full story behind training a large language model — from raw internet text to a GPT-5-level assistant — covering pre-training, fine-tuning, RLHF, version cutoffs, and why ChatGPT on the web is NOT using RAG to train.",
  tags: [
    "ai",
    "llm",
    "training",
    "gpt",
    "openai",
    "rlhf",
    "fine-tuning",
    "pretraining",
    "chatgpt",
    "architecture",
  ],
  icon: "BrainCircuit",
  content: [
    <p key="intro-1" className="text-slate-300 mb-4 leading-relaxed">
      When GPT-4 was released in 2023, OpenAI revealed very little about how it
      was trained. When GPT-5 arrived, they revealed even less. Yet the core
      pipeline — pre-training on raw text, supervised fine-tuning, and
      reinforcement learning from human feedback — is well-documented from
      their earlier papers and research.{" "}
      <strong>
        Training a frontier LLM is not one process. It is a multi-month,
        multi-stage pipeline involving petabytes of data, thousands of GPUs,
        and layers of human curation.
      </strong>{" "}
      This topic traces the full journey from raw internet text to the model
      that answers your question in ChatGPT.
    </p>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 1 — THE BIG PICTURE                       */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-overview" className="text-xl font-bold mt-10 mb-4">
      The Three-Stage Training Pipeline
    </h3>,
    <p key="p-overview" className="text-slate-300 mb-6 leading-relaxed">
      Every modern frontier LLM (GPT-4, Gemini, Claude, Llama) is produced
      through the same fundamental three-stage pipeline. The stages build on
      each other: each one starts from the checkpoint left by the previous.
    </p>,
    <Flow
      key="flow-pipeline"
      steps={[
        {
          title: "Stage 1 — Pre-training (months, $tens of millions)",
          description:
            "The model is trained on a massive corpus of raw text from the internet, books, code, and scientific papers — typically trillions of tokens. The only task: predict the next token. No instructions, no chat, just next-word prediction at massive scale. This builds the raw world model: language, reasoning, facts, code, math.",
        },
        {
          title: "Stage 2 — Supervised Fine-Tuning / SFT (days to weeks)",
          description:
            "Human contractors (at OpenAI: red-teamers and labelers) write thousands of (prompt → ideal response) pairs. The pre-trained model is fine-tuned on these pairs. This teaches the model how to behave like a helpful assistant — format, tone, following instructions — rather than just continuing internet text.",
        },
        {
          title:
            "Stage 3 — Reinforcement Learning from Human Feedback / RLHF (weeks)",
          description:
            "Human raters compare multiple model outputs and rank them by quality. A reward model is trained to predict human preference scores. Then the LLM itself is updated via RL (specifically PPO — Proximal Policy Optimization) to generate outputs that score higher on the reward model. This is what makes the model genuinely helpful, harmless, and honest.",
        },
      ]}
    />,
    <Callout
      key="call-overview"
      type="info"
      title="One Liner Summary"
    >
      <strong>Pre-training</strong> gives the model knowledge of the world.{" "}
      <strong>SFT</strong> gives it an assistant personality.{" "}
      <strong>RLHF</strong> aligns it with human values. Every GPT version goes
      through all three.
    </Callout>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 2 — PRE-TRAINING IN DEPTH                 */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-pretrain" className="text-xl font-bold mt-12 mb-4">
      Stage 1 Deep Dive: Pre-training on the Internet
    </h3>,
    <p key="p-pretrain" className="text-slate-300 mb-6 leading-relaxed">
      Pre-training is where the model acquires its core intelligence. It is also
      the most expensive phase — often consuming 90%+ of total compute budget.
    </p>,
    <Grid key="grid-pretrain" cols={2} gap={6} className="mb-8">
      <FeatureCard
        icon={Database}
        title="The Training Data"
        subtitle="What goes in"
        theme="emerald"
      >
        <ul className="mt-2 text-sm text-emerald-200/80 space-y-2 list-disc pl-4">
          <li>
            <strong className="text-emerald-300">Common Crawl</strong> — a
            snapshot of the public web (petabytes of HTML).
          </li>
          <li>
            <strong className="text-emerald-300">Books / BookCorpus</strong> —
            long-form narrative and coherent reasoning.
          </li>
          <li>
            <strong className="text-emerald-300">GitHub</strong> — code across
            hundreds of languages teaches logical structure.
          </li>
          <li>
            <strong className="text-emerald-300">Wikipedia / arXiv</strong> —
            factual, structured, high-quality text.
          </li>
          <li>
            <strong className="text-emerald-300">Filtered web text</strong> —
            Reddit, Stack Overflow, news, filtered for quality.
          </li>
        </ul>
        <p className="mt-3 text-xs text-emerald-300/60">
          GPT-3 used ~570GB of cleaned text (~300B tokens). GPT-4 likely used
          10–100× more.&nbsp;<SourceMarker vendor="OpenAI" year={2020} />
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Cpu}
        title="The Compute"
        subtitle="What it takes"
        theme="violet"
      >
        <ul className="mt-2 text-sm text-violet-200/80 space-y-2 list-disc pl-4">
          <li>
            GPT-3 (2020): ~3,600 petaflop/s-days on A100 GPUs.&nbsp;
            <SourceMarker vendor="OpenAI" year={2020} />
          </li>
          <li>
            GPT-4 training cost: estimated{" "}
            <strong className="text-violet-300">$50–100 million</strong> in
            compute alone.&nbsp;
            <SourceMarker vendor="Sam Altman estimate" year={2023} />
          </li>
          <li>
            Typically run on thousands of H100/A100 GPUs in parallel for months.
          </li>
          <li>
            A single training run consumes as much electricity as a small town
            over several months.
          </li>
        </ul>
      </FeatureCard>
    </Grid>,
    <Card
      key="card-autoregressive"
      title="The Self-Supervised Trick: Next-Token Prediction"
      description="Why you don't need labelled data to train the world's most powerful AI"
    >
      <p className="text-sm text-slate-300 leading-relaxed mb-3">
        The key insight that makes LLMs possible:{" "}
        <strong>you don't need human labels</strong>. Every sentence on the
        internet is its own training example. Given{" "}
        <code className="text-cyan-300 bg-slate-800 px-1 rounded">
          "The capital of France is"
        </code>
        , the label is simply{" "}
        <code className="text-cyan-300 bg-slate-800 px-1 rounded">
          "Paris"
        </code>
        . The model trains by predicting the next token across trillions of
        such examples, and gradient descent adjusts billions of weights to
        make each prediction more accurate.
      </p>
      <p className="text-sm text-slate-400 leading-relaxed">
        This is called <strong>self-supervised learning</strong>: the labels
        come from the data itself. It is why pre-training can scale
        indefinitely without human annotation cost — the entire internet
        becomes a free label machine.
      </p>
    </Card>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 3 — SFT                                   */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-sft" className="text-xl font-bold mt-12 mb-4">
      Stage 2 Deep Dive: Supervised Fine-Tuning (SFT)
    </h3>,
    <p key="p-sft" className="text-slate-300 mb-6 leading-relaxed">
      After pre-training, the model is a brilliant but socially inept predictor
      — it will continue internet text patterns, which include toxic, biased,
      and incoherent content. SFT is the first alignment step.
    </p>,
    <Grid key="grid-sft" cols={2} gap={6} className="mb-8">
      <Card title="What SFT Data Looks Like">
        <CodeBlock
          theme="cyan"
          title="SFT Training Pair Example"
          language="json"
          code={`{
  "prompt": "Explain recursion to a 10-year-old.",
  "response": "Imagine you want to know how many
    candies are in a jar. You take one candy out,
    count it as '1', then ask the same question
    about the smaller pile of remaining candies.
    You repeat until the jar is empty. Each step
    calls itself with a smaller problem — that's
    recursion!"
}`}
        />
        <p className="mt-2 text-xs text-slate-400">
          OpenAI used contractors (via Scale AI and similar vendors) to write
          tens of thousands of such pairs for InstructGPT and GPT-4.
        </p>
      </Card>
      <Card title="What SFT Actually Teaches">
        <ul className="text-sm text-slate-300 space-y-2 list-disc pl-4">
          <li>
            <strong className="text-cyan-400">Follow instructions</strong> —
            stop completing text, start answering questions.
          </li>
          <li>
            <strong className="text-cyan-400">Format responses</strong> — use
            markdown, bullet points, code blocks appropriately.
          </li>
          <li>
            <strong className="text-cyan-400">Adopt a persona</strong> — "I am
            a helpful assistant" vs. continuing arbitrary web text.
          </li>
          <li>
            <strong className="text-cyan-400">Refuse harmful requests</strong>{" "}
            — red-teamers write adversarial prompts; responses are crafted to
            refuse safely.
          </li>
          <li>
            <strong className="text-cyan-400">Admit uncertainty</strong> —
            "I'm not sure" instead of hallucinating confidently.
          </li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="call-sft" type="tip" title="SFT Data Size vs Quality">
      InstructGPT (the paper that defined this pipeline) showed that a model
      fine-tuned on only{" "}
      <strong>13,000 high-quality examples</strong> outperformed raw GPT-3
      (175B params) by a large margin on human preference ratings. Quality
      dominates quantity in the SFT phase.&nbsp;
      <SourceMarker vendor="OpenAI InstructGPT Paper" year={2022} />
    </Callout>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 4 — RLHF                                  */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-rlhf" className="text-xl font-bold mt-12 mb-4">
      Stage 3 Deep Dive: RLHF — Aligning with Human Preference
    </h3>,
    <p key="p-rlhf" className="text-slate-300 mb-6 leading-relaxed">
      SFT teaches format; RLHF teaches quality. The key insight:{" "}
      <strong>
        it is easier for humans to compare two outputs than to write the
        perfect output from scratch.
      </strong>{" "}
      RLHF exploits this by turning human comparisons into a training signal.
    </p>,
    <Flow
      key="flow-rlhf"
      steps={[
        {
          title: "1. Collect Comparisons",
          description:
            "The SFT model generates 4–9 different responses to the same prompt. Human raters rank them from best to worst. This produces a dataset of (prompt, chosen_response, rejected_response) triples.",
        },
        {
          title: "2. Train a Reward Model (RM)",
          description:
            "A separate neural network is trained to predict the human preference scores. Given any (prompt, response) pair, the reward model outputs a scalar score: how much would a human prefer this response?",
        },
        {
          title: "3. Optimize the LLM Against the Reward Model (PPO)",
          description:
            "The LLM is treated as a policy. Using PPO (Proximal Policy Optimization), the LLM's weights are updated to generate responses that score higher on the reward model — while a KL-divergence penalty prevents it from drifting too far from the SFT baseline (preventing 'reward hacking').",
        },
        {
          title: "4. Iterate",
          description:
            "The updated model generates new responses. Humans re-rank. The reward model is updated. The LLM is updated again. This loop runs for many iterations until the model reaches the desired quality and safety profile.",
        },
      ]}
    />,
    <Grid key="grid-rlhf-variants" cols={2} gap={6} className="mb-8">
      <FeatureCard
        icon={Scale}
        title="PPO (Original RLHF)"
        subtitle="OpenAI's approach — InstructGPT / GPT-4"
        theme="indigo"
      >
        <p className="mt-2 text-sm leading-relaxed text-indigo-200/80">
          Proximal Policy Optimization treats the LLM as a reinforcement
          learning agent. The reward signal comes from the reward model trained
          on human preferences. A KL-divergence constraint keeps the model from
          straying too far from the SFT base.{" "}
          <strong className="text-indigo-300">Expensive but effective.</strong>
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Zap}
        title="DPO / GRPO (Modern Variants)"
        subtitle="DeepSeek, Llama 3, newer models"
        theme="amber"
      >
        <p className="mt-2 text-sm leading-relaxed text-amber-200/80">
          Direct Preference Optimization (DPO) eliminates the separate reward
          model — the LLM is trained directly on preference pairs. Group Relative
          Policy Optimization (GRPO, used by DeepSeek-R1) further simplifies
          this.{" "}
          <strong className="text-amber-300">
            Cheaper and increasingly competitive with PPO.
          </strong>
        </p>
      </FeatureCard>
    </Grid>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 5 — GPT VERSION STORY                     */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-versions" className="text-xl font-bold mt-12 mb-4">
      Version by Version: GPT-1 to GPT-5
    </h3>,
    <p key="p-versions" className="text-slate-300 mb-6 leading-relaxed">
      Each GPT version is not just a bigger model — each generation introduced
      architectural or training innovations that changed what was possible.
    </p>,
    <Table
      key="tbl-versions"
      headers={[
        "Version",
        "Year",
        "Key Innovation",
        "Training Data",
        "Params (approx)",
      ]}
      rows={[
        [
          "GPT-1",
          "2018",
          "Proved Transformer + unsupervised pre-training + fine-tuning works at language tasks.",
          "BookCorpus (~1B tokens)",
          "117M",
        ],
        [
          "GPT-2",
          "2019",
          "Demonstrated zero-shot task completion — no fine-tuning needed for many tasks. Sparked public AI concern.",
          "WebText (~40GB)",
          "1.5B",
        ],
        [
          "GPT-3",
          "2020",
          "In-context learning: few-shot prompting without weight updates. API-first commercial model.",
          "~570GB filtered web + books",
          "175B",
        ],
        [
          "InstructGPT",
          "2022",
          "First public RLHF model — proved smaller+aligned beats larger+raw. Blueprint for ChatGPT.",
          "GPT-3 base + 13K SFT examples + RLHF",
          "~1.3B–175B",
        ],
        [
          "GPT-4",
          "2023",
          "Multimodal inputs, system-level instruction following, dramatically improved reasoning and safety.",
          "Undisclosed (trillions of tokens)",
          "Undisclosed (est. ~1T MoE)",
        ],
        [
          "GPT-4o",
          "2024",
          "Natively multimodal (audio, vision, text in one model). Faster and cheaper than GPT-4 Turbo.",
          "Undisclosed",
          "Undisclosed",
        ],
        [
          "GPT-4.5",
          "2025",
          "Expanded world knowledge, improved conversational fluency, improved coding. Better at following nuanced instructions.",
          "Undisclosed",
          "Undisclosed",
        ],
        [
          "GPT-5 / o-series",
          "2025",
          "Reasoning-first training: chain-of-thought at scale as a first-class training objective. Tool use, agents.",
          "Undisclosed",
          "Undisclosed",
        ],
      ]}
    />,
    <Callout key="call-versions" type="warning" title="Why OpenAI Goes Dark After GPT-3">
      GPT-1, GPT-2, and GPT-3 all had published technical papers with parameter
      counts and training data details. From GPT-4 onwards, OpenAI released no
      technical report with these details — citing competitive concerns.&nbsp;
      <SourceMarker vendor="OpenAI GPT-4 Technical Report" year={2023} /> Most
      of what we know about GPT-4+ architecture comes from leaks, speculation,
      and reverse-engineering rather than official disclosure.
    </Callout>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 6 — TRAINING CUTOFFS EXPLAINED            */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-cutoff" className="text-xl font-bold mt-12 mb-4">
      Knowledge Cutoffs — Why the Model Doesn't Know About Yesterday
    </h3>,
    <p key="p-cutoff" className="text-slate-300 mb-6 leading-relaxed">
      Every LLM has a <strong>training cutoff date</strong>: the date after
      which no new information was included in the pre-training corpus. This is
      not a deliberate design flaw — it is a fundamental consequence of how
      training works.
    </p>,
    <Grid key="grid-cutoff" cols={2} gap={6} className="mb-8">
      <Card
        title="Why Cutoffs Exist"
        description="A fundamental architecture constraint"
      >
        <ul className="text-sm text-slate-300 space-y-2 list-disc pl-4">
          <li>
            Pre-training data must be <strong>collected, cleaned, and deduplicated</strong> before training begins. This takes months.
          </li>
          <li>
            Training itself takes months on thousands of GPUs — you cannot add new data mid-run.
          </li>
          <li>
            Post-training (SFT + RLHF) takes additional months after pre-training completes.
          </li>
          <li>
            Safety testing, red-teaming, and API infrastructure setup adds more months.
          </li>
          <li>
            By the time a model ships publicly, the training data is often{" "}
            <strong>6–18 months old</strong>.
          </li>
        </ul>
      </Card>
      <Card
        title="The Cutoff Timeline (GPT examples)"
        description="Gap between data cutoff and public release"
      >
        <Table
          headers={["Model", "Data Cutoff", "Release", "Gap"]}
          rows={[
            ["GPT-3", "~Oct 2019", "Jun 2020", "~8 months"],
            ["GPT-4", "~Sep 2021", "Mar 2023", "~18 months"],
            ["GPT-4 Turbo", "~Apr 2023", "Nov 2023", "~7 months"],
            ["GPT-4o", "~Oct 2023", "May 2024", "~7 months"],
            ["GPT-4.5", "~Jun 2024", "Feb 2025", "~8 months"],
          ]}
        />
      </Card>
    </Grid>,
    <Callout key="call-cutoff" type="tip" title="How Models Handle Post-Cutoff Questions">
      When you ask a model about something after its cutoff, it has three strategies:{" "}
      <strong>(1) Admit uncertainty</strong> — "My training data ends in X, I
      don't have information about that."{" "}
      <strong>(2) Infer from patterns</strong> — reason from pre-cutoff
      knowledge about likely developments (often wrong).{" "}
      <strong>(3) Hallucinate</strong> — generate plausible-sounding but false
      information. Well-aligned models do (1); poorly calibrated ones drift into (3).
    </Callout>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 7 — CHATGPT WEB: RAG OR TRAINING?         */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-chatgpt-web" className="text-xl font-bold mt-12 mb-4">
      How ChatGPT on the Web Actually Works
    </h3>,
    <p key="p-chatgpt-web" className="text-slate-300 mb-6 leading-relaxed">
      ChatGPT at{" "}
      <code className="text-cyan-300 bg-slate-800 px-1 rounded">
        chat.openai.com
      </code>{" "}
      is a product built on top of the GPT API. Understanding what happens when
      you send a message clears up several major misconceptions about how the
      model "learns" from your conversations.
    </p>,
    <Flow
      key="flow-chatgpt"
      steps={[
        {
          title: "1. Your Message Arrives at the API",
          description:
            "Your message (plus all previous messages in this conversation) is serialised as a sequence of tokens. The entire conversation history is passed as the model's context window — there is no persistent memory between sessions by default.",
        },
        {
          title: "2. Optional Tools Are Invoked",
          description:
            "If you have the Web Search or Code Interpreter plugins enabled, the model may emit a tool-call token before responding. The tool runs (e.g. a web search), and the result is injected back into the context as a 'tool result' message.",
        },
        {
          title: "3. Autoregressive Generation",
          description:
            "The full context (system prompt + conversation history + optional tool results) is passed through the transformer. The model generates tokens one at a time, each predicted from all previous tokens. This is streamed back to your UI as it is produced.",
        },
        {
          title: "4. Your Conversation Is Stored (Not Used for Training Immediately)",
          description:
            "OpenAI stores conversations for safety review, abuse detection, and optionally for future training data (users can opt out in settings). Conversations are NOT immediately fed back into the live model — the live model weights are frozen. This is a critical distinction.",
        },
      ]}
    />,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 8 — RAG vs TRAINING (THE BIG MYTH)        */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-rag-vs-train" className="text-xl font-bold mt-12 mb-4">
      RAG vs Training: What Actually Happens When ChatGPT Searches the Web
    </h3>,
    <p key="p-rag-vs-train" className="text-slate-300 mb-6 leading-relaxed">
      This is one of the most commonly misunderstood aspects of modern LLMs.
      When ChatGPT (or any AI with web search) browses the web, it is{" "}
      <strong>
        absolutely not updating its weights or "learning" from what it finds
      </strong>
      . It is using RAG — retrieval-augmented generation — at inference time.
    </p>,
    <Table
      key="tbl-rag-vs-train"
      headers={[
        "Dimension",
        "RAG (What ChatGPT web search does)",
        "Training (What actually updates a model)",
      ]}
      rows={[
        [
          "When it happens",
          "At inference time — while generating your response.",
          "Before deployment — over days/weeks on thousands of GPUs.",
        ],
        [
          "What changes",
          "Nothing. The retrieved text is added to the context window temporarily.",
          "The model's weights (billions of floating point numbers) are permanently updated via gradient descent.",
        ],
        [
          "Persistence",
          "The retrieved content lasts for one conversation turn. Next conversation has no memory of it.",
          "Permanent. The new knowledge is baked into the weights forever (until the next training run).",
        ],
        [
          "Cost",
          "Cheap — a web search + a few extra tokens in context.",
          "Enormously expensive — millions of dollars in compute.",
        ],
        [
          "Real-time data",
          "Yes. The search retrieves today's content.",
          "No. Training has a cutoff. You cannot train on real-time data at model scale.",
        ],
        [
          "What the model 'knows' after",
          "Within that conversation, it can cite and use retrieved content. Next conversation, it's gone.",
          "The model can recall the knowledge in any future conversation without retrieval.",
        ],
      ]}
    />,
    <Grid key="grid-chatgpt-arch" cols={2} gap={6} className="mb-8">
      <FeatureCard
        icon={Globe}
        title="ChatGPT Web Search (RAG at Inference)"
        subtitle="What's actually happening"
        theme="cyan"
      >
        <ol className="mt-2 text-sm text-cyan-200/80 space-y-2 list-decimal pl-4">
          <li>
            Model detects query needs fresh or factual data (or you explicitly
            ask it to search).
          </li>
          <li>
            Model emits a tool call:{" "}
            <code className="text-cyan-300">{"search(\"query here\")"}</code>
          </li>
          <li>
            Bing/custom search engine returns top results.
          </li>
          <li>
            Snippets are injected into the model's context window.
          </li>
          <li>
            Model generates its response citing the retrieved content.
          </li>
          <li>
            <strong className="text-cyan-300">
              Model weights unchanged. Everything is in the context.
            </strong>
          </li>
        </ol>
      </FeatureCard>
      <FeatureCard
        icon={FlaskConical}
        title="Actual Model Training"
        subtitle="What updates the weights"
        theme="rose"
      >
        <ol className="mt-2 text-sm text-rose-200/80 space-y-2 list-decimal pl-4">
          <li>
            Months of data collection, cleaning, and deduplication.
          </li>
          <li>
            Distributed training across thousands of GPUs.
          </li>
          <li>
            Gradients computed via backpropagation through billions of params.
          </li>
          <li>
            Adam optimizer updates weights millions of times per second.
          </li>
          <li>
            Human feedback cycles for RLHF alignment.
          </li>
          <li>
            <strong className="text-rose-300">
              New model checkpoint deployed. Old model retired.
            </strong>
          </li>
        </ol>
      </FeatureCard>
    </Grid>,
    <Callout key="call-rag-myth" type="warning" title="Your Conversations Don't Train the Live Model">
      A very common myth:{" "}
      <em>"ChatGPT learns from my conversations in real-time."</em> This is
      false. The live production model has frozen weights. Your conversations
      may be collected and used to produce future training datasets, but that
      process involves months of curation and a full new training run — not
      live weight updates. Users can opt out of having their data used for
      training in OpenAI's settings (Settings → Data Controls → Improve the
      model for everyone).
    </Callout>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 9 — CONTEXT MEMORY vs WEIGHTS             */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-memory" className="text-xl font-bold mt-12 mb-4">
      Two Kinds of "Memory": Context vs Weights
    </h3>,
    <p key="p-memory" className="text-slate-300 mb-6 leading-relaxed">
      Understanding the difference between these two memory types is essential
      to understanding what any LLM-based product can and cannot do.
    </p>,
    <Table
      key="tbl-memory"
      headers={["", "Context Window Memory", "Weight Memory (Training)"]}
      rows={[
        ["What it stores", "The current conversation + any retrieved content", "All the world knowledge from training"],
        ["Duration", "One session only — wiped when context clears", "Permanent until the model is retrained"],
        ["Capacity", "Finite — measured in tokens (GPT-4: 128K tokens)", "Effectively unlimited — encoded across billions of weights"],
        ["How to add information", "Paste it into the prompt / retrieve via RAG", "Run a fine-tuning or full training pass"],
        ["Speed to update", "Instant — just extend the context", "Weeks to months + millions of dollars"],
        ["Real-world analogy", "Working memory (RAM) — fast but ephemeral", "Long-term memory (ROM) — slow to write but permanent"],
      ]}
    />,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 10 — o-SERIES / REASONING MODELS          */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-reasoning" className="text-xl font-bold mt-12 mb-4">
      The Reasoning Model Era: o1, o3, DeepSeek-R1
    </h3>,
    <p key="p-reasoning" className="text-slate-300 mb-6 leading-relaxed">
      In 2024–2025, a new training paradigm emerged for the best models: instead
      of just predicting text, models are trained to{" "}
      <strong>think before they answer</strong>. This is the core of OpenAI's
      o-series and DeepSeek's R1.
    </p>,
    <Grid key="grid-reasoning" cols={2} gap={6} className="mb-8">
      <Card title="Chain-of-Thought as a Training Signal">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Reasoning models are trained to produce a{" "}
          <strong>scratchpad of thinking tokens</strong> before the final
          answer. These thinking tokens are part of the model's generation but
          are hidden from the user. They allow the model to decompose complex
          problems step by step.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          The key training innovation: these thinking traces are optimized via
          RL. The model is rewarded for thinking patterns that lead to correct
          final answers — regardless of what the intermediate thoughts look like.
          This enables emergent reasoning beyond what SFT alone can produce.
        </p>
      </Card>
      <Card title="Test-Time Compute Scaling">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Traditional scaling laws say: bigger model + more training data =
          better model. Reasoning models introduced a new axis:{" "}
          <strong>more thinking at inference time</strong> = better answers.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          On hard math or coding problems, an o3-class model spending 10,000
          thinking tokens (about 30 seconds of "thinking") dramatically
          outperforms the same model limited to 100 tokens. The answer quality
          scales with inference compute — not just training compute.
        </p>
      </Card>
    </Grid>,
    <Table
      key="tbl-reasoning"
      headers={["Model", "Reasoning Approach", "Training Signal", "Strength"]}
      rows={[
        [
          "GPT-4 / Claude 3.5",
          "Implicit — chain-of-thought via prompting, not training objective",
          "RLHF on answer quality",
          "General capability",
        ],
        [
          "OpenAI o1 / o3",
          "Explicit — thinking tokens trained as first-class objective",
          "RL on verifiable outcomes (math, code correctness)",
          "Math, science, complex reasoning",
        ],
        [
          "DeepSeek-R1",
          "GRPO on verifiable reasoning outcomes",
          "Group Relative Policy Optimization — no reward model needed",
          "Math, code, at lower cost",
        ],
        [
          "Gemini 2.5 Pro",
          "Thinking mode — extended inference budget",
          "Undisclosed",
          "Multimodal reasoning",
        ],
      ]}
    />,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 11 — HOW A NEW MODEL VERSION IS BORN      */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-newversion" className="text-xl font-bold mt-12 mb-4">
      How a New Model Version (GPT-X → GPT-X+1) Is Born
    </h3>,
    <Flow
      key="flow-newversion"
      steps={[
        {
          title: "1. Data Pipeline Refresh",
          description:
            "A new web crawl is run. The new corpus is deduplicated against the previous training set to maximise uniqueness. Quality filters remove toxic, repetitive, and low-quality content. New data sources (e.g. newly available code repositories, scientific papers) are added.",
        },
        {
          title: "2. Architecture Iteration",
          description:
            "The research team experiments with architectural changes: new attention mechanisms, different positional encodings, context length improvements, MoE (Mixture of Experts) routing changes, or changes to how multimodal inputs are processed.",
        },
        {
          title: "3. Pre-training Run",
          description:
            "The new architecture is trained from scratch (or from a partial checkpoint) on the new dataset. This is the dominant compute expenditure. The team monitors loss curves, runs evaluation benchmarks periodically, and can stop early if training diverges.",
        },
        {
          title: "4. SFT + RLHF / RLAIF",
          description:
            "The new base model goes through supervised fine-tuning and preference optimization. For later models (GPT-4+), Constitutional AI (Anthropic) and AI feedback (RLAIF) supplements human feedback — scaling alignment without proportionally scaling human labor.",
        },
        {
          title: "5. Red-Teaming & Safety Eval",
          description:
            "Internal and external red-teamers attack the model with adversarial prompts. The model's outputs on thousands of safety scenarios are evaluated. Failure cases drive more targeted SFT or RLHF iterations. This step can take months.",
        },
        {
          title: "6. Staged Rollout",
          description:
            "The new model is deployed to a small % of API traffic first (canary), monitored for regressions, then expanded. The old model version remains available for backward compatibility for a deprecation window.",
        },
      ]}
    />,
    <FeatureCard
      key="fc-rlaif"
      icon={RefreshCw}
      title="RLAIF: AI Feedback Instead of Human Feedback"
      subtitle="The alignment scaling trick"
      theme="emerald"
    >
      <p className="mt-2 text-sm leading-relaxed text-emerald-200/80">
        Human feedback is the bottleneck in RLHF. For each new model version,
        you need thousands of human comparisons — expensive and slow.{" "}
        <strong className="text-emerald-300">
          RLAIF (Reinforcement Learning from AI Feedback)
        </strong>{" "}
        uses a separate LLM (often an already-aligned model) as the ranker.
        The AI ranker evaluates model outputs against a set of constitutional
        principles (Anthropic's approach) or rubrics, providing feedback at
        machine speed.{" "}
        <SourceMarker vendor="Anthropic" year={2022} /> This allows alignment
        to scale without proportionally scaling human labeler cost — a key
        enabler for training increasingly capable models on reasonable timelines.
      </p>
    </FeatureCard>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 12 — SAFETY MECHANISMS                    */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-safety" className="text-xl font-bold mt-12 mb-4">
      What Keeps the Model Safe: Layers of Alignment
    </h3>,
    <p key="p-safety" className="text-slate-300 mb-6 leading-relaxed">
      Modern production LLMs are not safe because of a single filter. Safety is
      a layered stack built into the training process itself.
    </p>,
    <Grid key="grid-safety" cols={2} gap={6} className="mb-8">
      <FeatureCard
        icon={ShieldCheck}
        title="Pre-Training Data Filtering"
        subtitle="Layer 1 — remove at the source"
        theme="sky"
      >
        <p className="mt-2 text-sm leading-relaxed text-sky-200/80">
          Before training starts, the corpus is filtered to remove CSAM,
          known-toxic content, and datasets that repeatedly showed up as
          harmful in prior models. This reduces the base rate of harmful
          knowledge in the weights.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={ShieldCheck}
        title="SFT on Refusals"
        subtitle="Layer 2 — teach refusal patterns"
        theme="violet"
      >
        <p className="mt-2 text-sm leading-relaxed text-violet-200/80">
          The SFT dataset includes many examples of harmful prompts paired with
          ideal refusal responses. The model learns the pattern: "when asked for
          X, respond with Y" — where X is a harmful category and Y is a safe,
          informative refusal.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={ShieldCheck}
        title="RLHF Alignment"
        subtitle="Layer 3 — reinforce safe behavior"
        theme="amber"
      >
        <p className="mt-2 text-sm leading-relaxed text-amber-200/80">
          Human raters explicitly downrank harmful, toxic, or manipulative
          outputs. The reward model learns to score safety as a dimension of
          quality. The final RLHF-trained model has been systematically pushed
          toward responses that score high on both helpfulness AND safety.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={ShieldCheck}
        title="System Prompt + Moderation API"
        subtitle="Layer 4 — runtime guardrails"
        theme="rose"
      >
        <p className="mt-2 text-sm leading-relaxed text-rose-200/80">
          ChatGPT has a hidden system prompt that instructs the model to follow
          OpenAI's usage policies. Additionally, both input and output may be
          passed through a separate moderation classifier (the Moderation API)
          that flags policy violations before they reach the user.
        </p>
      </FeatureCard>
    </Grid>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 13 — COMMON MISCONCEPTIONS                */
    /* ─────────────────────────────────────────────────── */
    <h3 key="h-mistakes" className="text-xl font-bold mt-12 mb-4">
      Common Misconceptions About LLM Training
    </h3>,
    <Grid key="grid-mistakes" cols={1} gap={4}>
      <MistakeCard
        number={1}
        title="ChatGPT Learns From Our Conversations in Real-Time"
        problem="Every time I correct ChatGPT, it updates itself and gets smarter from my feedback."
        solution="The production model has frozen weights. Your correction improves the response in that session via context, not via weight updates. If you opt in to data sharing, your conversations MAY become training data for a FUTURE model version — after months of curation and a full retraining run. The live model is never updated mid-conversation."
      />
      <MistakeCard
        number={2}
        title="Web Search = Training the Model on New Information"
        problem="ChatGPT browses the web, so it's constantly learning new facts and updating its knowledge base."
        solution="Web search is RAG at inference time. Retrieved content is placed in the context window for that conversation only. The model's weights are not touched. The moment the conversation ends, that knowledge is gone. Training the model on genuinely new information requires a new multi-million-dollar training run."
      />
      <MistakeCard
        number={3}
        title="Bigger = Always Better"
        problem="GPT-5 has more parameters than GPT-4, so it must be smarter at everything."
        solution="Parameter count is a proxy for capability, not a guarantee. InstructGPT (1.3B params, RLHF-aligned) outperformed raw GPT-3 (175B) on human preference ratings. Architecture, training data quality, alignment, and inference-time compute (reasoning tokens) often matter more than raw scale. DeepSeek-R1 achieves frontier-level math with a fraction of GPT-4's estimated cost."
      />
      <MistakeCard
        number={4}
        title="Fine-Tuning a Model Adds New Knowledge"
        problem="I'll fine-tune GPT on my company's documents and the model will 'know' our internal data."
        solution="Fine-tuning teaches behavioral patterns (format, style, domain vocabulary), NOT new factual recall reliably. To query specific facts from documents, use RAG — retrieve relevant docs into the context at query time. Fine-tuning on facts alone leads to inconsistent recall and can cause catastrophic forgetting of pre-training knowledge."
      />
    </Grid>,

    /* ─────────────────────────────────────────────────── */
    /*  SECTION 14 — BIG PICTURE SUMMARY                  */
    /* ─────────────────────────────────────────────────── */
    <Callout key="call-summary" type="tip" title="The Complete Mental Model">
      <ul className="space-y-2 mt-2 text-sm">
        <li>
          <Highlight variant="primary">Pre-training</Highlight>&nbsp;= the
          model learns the world from raw text. Frozen when training ends.
        </li>
        <li>
          <Highlight variant="primary">SFT</Highlight>&nbsp;= human-written
          examples teach assistant behavior on top of the base model.
        </li>
        <li>
          <Highlight variant="primary">RLHF</Highlight>&nbsp;= human preference
          comparisons teach quality and safety via reinforcement learning.
        </li>
        <li>
          <Highlight variant="primary">Knowledge Cutoff</Highlight>&nbsp;= the
          date after which no new information was included. A structural
          consequence of how training works, not laziness.
        </li>
        <li>
          <Highlight variant="primary">Web search in ChatGPT</Highlight>
          &nbsp;= RAG at inference time. Retrieves text into the context window.
          Does NOT update model weights. Gone after the conversation.
        </li>
        <li>
          <Highlight variant="primary">New model version</Highlight>&nbsp;=
          fresh data + architecture changes + new training run + months of
          alignment work. Not an incremental update to the existing model.
        </li>
        <li>
          <Highlight variant="primary">Reasoning models (o1, R1)</Highlight>
          &nbsp;= trained to think in hidden tokens before answering. Scale
          inference compute to improve answer quality.
        </li>
      </ul>
    </Callout>,
  ],
};
