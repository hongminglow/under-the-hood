import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Flow } from "@/components/ui/Flow";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Highlight } from "@/components/ui/Highlight";

export const moeArchitectureTopic: Topic = {
  id: "moe-architecture",
  title: "Mixture of Experts (MoE)",
  description: "How models efficiently scale parameters by routing tokens only to specialized sub-networks.",
  tags: ["ai", "architecture", "moe"],
  icon: "Brain",
  content: [
    <p key="intro" className="mb-4">
      Historically, LLMs were <strong>Dense Models</strong>—every parameter in the brain is activated for every single word generated. While effective, scaling this approach requires an absurd amount of compute (FLOPs). A <strong>Mixture of Experts (MoE)</strong> flips this paradigm. Instead of one massive dense network, the model is composed of a Router and several smaller "Expert" networks.
    </p>,
    <Flow
      key="flow"
      steps={[
        { title: "Input Token", description: "The word e.g., 'Python'" },
        { title: "Gating / Router Network", description: "A linear layer calculates probabilities determining which experts are best suited." },
        { title: "Expert Activation", description: "Only top-K experts (usually 2 out of 8) run the computation." },
        { title: "Weighted Sum", description: "The outputs of the activated experts are combined for the final prediction." }
      ]}
    />,
    <Grid key="grid" cols={2} gap={6}>
      <Card title="Dense Model (e.g. Llama 3)">
        <ul className="list-disc pl-5">
          <li>Every parameter is active for every token.</li>
          <li>Linear compute scaling with parameter count.</li>
          <li>High VRAM <em>and</em> high compute (TFLOPs) required.</li>
        </ul>
      </Card>
      <Card title="MoE Model (e.g. Mixtral 8x7B)">
        <ul className="list-disc pl-5">
          <li>Sparse activation (e.g., only 2 experts per token).</li>
          <li>Only 13B active parameters out of 47B total per token.</li>
          <li>High VRAM required (all experts fit in memory), but <strong>low compute</strong>.</li>
        </ul>
      </Card>
    </Grid>,
    <h3 key="h3-1" className="text-xl font-semibold mt-8 mb-4">Popular MoE Models in Production</h3>,
    <Table
      key="table"
      headers={["Model", "Architecture", "Why it matters"]}
      rows={[
        ["GPT-4", "Rumored to be 8x 220B experts", "The industry pioneer of MoE scaling. Saved OpenAI from explosive inference compute bottlenecks."],
        ["Mixtral 8x7B", "8 experts (7B each)", "Brought MoE to the open-source community. Beats 70B dense models but runs much faster."],
        ["DeepSeek V3", "Hundreds of tiny experts", "Incredible cost efficiency. Uses shared experts for general knowledge and specialized routing for niche queries."]
      ]}
    />,
    <Callout key="callout1" type="tip" title="Cost vs Hardware Tradeoff">
      MoE models are much faster and cheaper to serve in production (<Highlight variant="info">lower compute cost</Highlight>), but they still require massive amounts of GPU memory to hold all the weights (<Highlight variant="warning">high VRAM required</Highlight>). This is why you might not be able to run a 47B MoE on a small laptop, even if it feels fast.
    </Callout>,
    <h3 key="h3-2" className="text-xl font-semibold mt-6 mb-4">Pros &amp; Cons</h3>,
    <Card key="pros-cons">
      <strong>Pros:</strong> Fast inference speeds without sacrificing size. Allows extreme scaling of total knowledge capacity.<br />
      <br />
      <strong>Cons:</strong> VRAM hungry. Requires complex load balancing during training so the router doesn&apos;t just send 100% of tokens to &quot;Expert 1&quot; (known as <em>expert collapse</em>).
    </Card>
  ]
};
