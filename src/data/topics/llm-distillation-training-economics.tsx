import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";

export const llmDistillationTrainingEconomicsTopic: Topic = {
  id: "llm-distillation-training-economics",
  title: "LLM Distillation & Training Economics",
  description:
    "What 'distilled' models really are, why they can be faster and cheaper, and why distillation is only one piece of the cost story.",
  tags: ["ai", "llm", "training", "distillation", "inference"],
  icon: "BrainCircuit",
  content: [
    <p key="1">
      The Chinese word <strong>蒸馏</strong> in AI means{" "}
      <strong>distillation</strong>. It does <em>not</em> mean the model is
      magically compressed by one button. It means a strong{" "}
      <strong>teacher model</strong> is used to generate high-quality behavior,
      and a smaller or more practical <strong>student model</strong> is trained
      to imitate that behavior.
    </p>,
    <Grid key="2" cols={2} gap={6}>
      <Card title="Teacher Model" description="Expensive but powerful">
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Usually large, slow, and expensive to train or serve. It has a higher
          capability ceiling and can produce richer reasoning traces or better
          answers.
        </p>
      </Card>
      <Card title="Student Model" description="Cheaper to run at scale">
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Trained to imitate useful behavior from the teacher. It usually loses
          some top-end ability, but gains lower latency, lower serving cost, and
          easier deployment.
        </p>
      </Card>
    </Grid>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Full Training Stack
    </h3>,
    <Table
      key="4"
      headers={["Stage", "What Happens", "Why It Exists"]}
      rows={[
        [
          "Pre-training",
          "The model learns next-token prediction on massive raw text/code corpora.",
          "Build broad language, code, and world-model capability.",
        ],
        [
          "SFT",
          "The model is fine-tuned on curated input/output examples.",
          "Teach it how an assistant should answer.",
        ],
        [
          "RL / preference tuning",
          "The model is optimized using ranking signals, rewards, or policy updates.",
          "Improve reasoning behavior, helpfulness, and alignment.",
        ],
        [
          "Distillation",
          "A student is trained on outputs or behaviors produced by a stronger teacher.",
          "Transfer capability into a smaller or more efficient model.",
        ],
      ]}
    />,
    <Callout
      key="5"
      type="tip"
      title="Distillation Is Not the Same Thing as Pre-training"
    >
      A frontier model often becomes strong through huge pre-training plus later
      alignment. A distilled model often becomes practical by{" "}
      <strong>borrowing a lot of expensive capability from a teacher</strong>
      &nbsp;instead of discovering all of it from scratch.
    </Callout>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      How Distillation Works Behind the Scenes
    </h3>,
    <Step key="7" index={1}>
      Train or obtain a strong teacher model.
    </Step>,
    <Step key="8" index={2}>
      Ask the teacher to solve many tasks: code, math, reasoning, formatting,
      tool-use patterns, or reflection patterns.
    </Step>,
    <Step key="9" index={3}>
      Save those outputs as synthetic training data for a student model.
    </Step>,
    <Step key="10" index={4}>
      Train the student to imitate the teacher's answers, style, or decision
      patterns.
    </Step>,
    <Step key="11" index={5}>
      Optionally add more SFT or RL after distillation to improve quality,
      safety, or output style.
    </Step>,
    <h3 key="12" className="text-xl font-bold mt-8 mb-4">
      What Exactly Gets Distilled?
    </h3>,
    <Table
      key="13"
      headers={["Signal", "What the Student Learns", "Example"]}
      rows={[
        [
          "Final answers",
          "How to answer tasks more accurately than raw next-token learning alone.",
          "Teacher solves coding tasks and student imitates the final code.",
        ],
        [
          "Reasoning traces",
          "Patterns of reflection, decomposition, and self-checking.",
          "Teacher shows long reasoning on math or debugging tasks.",
        ],
        [
          "Output style",
          "How to format, summarize, or stay concise in a useful way.",
          "Student learns to produce cleaner assistant-style answers.",
        ],
        [
          "Preferences",
          "Which kinds of outputs are more helpful or more aligned.",
          "Teacher/chosen answers become stronger targets than random internet text.",
        ],
      ]}
    />,
    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      Why Distilled Models Can Feel Faster
    </h3>,
    <Table
      key="15"
      headers={["Reason", "Why It Improves Speed or Cost", "Important Nuance"]}
      rows={[
        [
          "Smaller dense model",
          "Fewer active parameters means less compute per generated token.",
          "This is the most intuitive speed gain.",
        ],
        [
          "Shorter outputs",
          "If the student answers with fewer unnecessary tokens, latency drops.",
          "The model can feel smarter simply because it is less verbose.",
        ],
        [
          "More direct behavior",
          "The student may learn to jump to a good pattern faster.",
          "This is behavioral efficiency, not just hardware efficiency.",
        ],
        [
          "Easier deployment",
          "Smaller models are easier to quantize, fit in memory, and serve at scale.",
          "This lowers infra cost and often improves throughput.",
        ],
      ]}
    />,
    <Callout
      key="16"
      type="warning"
      title="Distillation Alone Does Not Explain Everything"
    >
      If a model is cheaper or faster, the reason is often a combination of{" "}
      <strong>
        distillation + architecture + hardware efficiency + inference
        optimization + lower precision
      </strong>
      . People often wrongly attribute the entire win to distillation alone.
    </Callout>,
    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      Distillation vs Other Efficiency Tricks
    </h3>,
    <Table
      key="18"
      headers={[
        "Technique",
        "What It Optimizes",
        "How It Differs from Distillation",
      ]}
      rows={[
        [
          "Distillation",
          "Transfers behavior from teacher to student",
          "Knowledge/behavior transfer, not just numeric compression",
        ],
        [
          "MoE (Mixture of Experts)",
          "Activates only part of the network per token",
          "Architecture trick: huge total model, smaller active compute",
        ],
        [
          "FP8 / lower precision",
          "Uses fewer bits during training or inference",
          "Numerical efficiency, not teacher-student training",
        ],
        [
          "Quantization",
          "Shrinks inference memory and compute cost",
          "Serving optimization done after or alongside training",
        ],
        [
          "Inference stack optimization",
          "Improves batching, caching, scheduling, kernels, serving throughput",
          "Systems engineering, not model-learning transfer",
        ],
      ]}
    />,
    <h3 key="19" className="text-xl font-bold mt-8 mb-4">
      Why DeepSeek's Cost Story Sounds So Dramatic
    </h3>,
    <p key="20">
      Publicly, DeepSeek attributes its efficiency to several factors, not only
      distillation. Their published materials emphasize <strong>MoE</strong>,
      <strong> FP8 mixed precision</strong>, communication-efficient training,
      and later <strong>knowledge distillation from reasoning models</strong>.
      So the cost story is really about{" "}
      <strong>stacked efficiency techniques</strong>.
    </p>,
    <Grid key="21" cols={2} gap={6}>
      <Card title="Where Distillation Helps" description="Capability transfer">
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          A reasoning-heavy teacher can transfer better problem-solving behavior
          into smaller dense models. This lets a cheaper model feel surprisingly
          strong for its size.
        </p>
      </Card>
      <Card
        title="Where Architecture Helps"
        description="Raw compute economics"
      >
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          If only a subset of parameters is active per token, or lower precision
          is used efficiently, the compute bill falls dramatically even before
          distillation enters the picture.
        </p>
      </Card>
    </Grid>,
    <h3 key="22" className="text-xl font-bold mt-8 mb-4">
      Distilled Model vs Frontier Model
    </h3>,
    <Table
      key="23"
      headers={[
        "Aspect",
        "Frontier / Teacher Model",
        "Distilled Student Model",
      ]}
      rows={[
        ["Training cost", "Very high", "Lower"],
        ["Inference cost", "Higher", "Lower"],
        ["Latency", "Often slower", "Often faster"],
        ["Capability ceiling", "Usually higher", "Usually lower"],
        [
          "Best use case",
          "Hardest reasoning, frontier tasks, research",
          "Cheap production serving, local deployment, high-throughput apps",
        ],
      ]}
    />,
    <h3 key="24" className="text-xl font-bold mt-8 mb-4">
      Important Caveat About Public Model Claims
    </h3>,
    <p key="25">
      Companies do not all disclose the same level of training detail. Some,
      like DeepSeek, publicly discuss distillation and training efficiency
      techniques in detail. Others may discuss speed improvements through{" "}
      <strong>inference infrastructure</strong> or <strong>compaction</strong>
      &nbsp;without publicly saying the model itself is distilled. So developers
      should avoid assuming that every fast model is a distilled model.
    </p>,
    <Callout key="26" type="info" title="The Best Mental Model">
      Distillation is like teaching a smaller apprentice using the solved work
      of a brilliant senior engineer. The apprentice becomes cheaper, faster,
      and often very competent, but usually still cannot match the senior on the
      hardest edge cases.
    </Callout>,
  ],
};
