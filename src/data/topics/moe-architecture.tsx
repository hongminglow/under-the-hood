import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Flow } from "@/components/ui/Flow";
import { Table } from "@/components/ui/Table";
import { MistakeCard } from "@/components/ui/MistakeCard";

export const moeArchitectureTopic: Topic = {
	id: "moe-architecture",
	title: "Mixture of Experts (MoE)",
	description: "How models efficiently scale parameters by routing tokens only to specialized sub-networks.",
	tags: ["ai", "architecture", "moe"],
	icon: "Brain",
	content: [
		<p key="intro" className="mb-4">
			Historically, LLMs were <strong>Dense Models</strong>—every parameter in the brain is activated for every single
			word generated. While effective, scaling this approach requires an absurd amount of compute (FLOPs). A{" "}
			<strong>Mixture of Experts (MoE)</strong> flips this paradigm. Instead of one massive dense network, the model is
			composed of a Router and several smaller "Expert" networks.
		</p>,
		<Flow
			key="flow"
			steps={[
				{ title: "Input Token", description: "The word e.g., 'Python'" },
				{
					title: "Gating / Router Network",
					description: "A linear layer calculates probabilities determining which experts are best suited.",
				},
				{
					title: "Expert Activation",
					description: "Only top-K experts (usually 2 out of 8) run the computation.",
				},
				{
					title: "Weighted Sum",
					description: "The outputs of the activated experts are combined for the final prediction.",
				},
			]}
		/>,
		<h3 key="h3-1" className="text-xl font-bold mt-8 mb-4">
			The MoE vs Dense Paradigm
		</h3>,
		<Grid key="grid" cols={2} gap={6}>
			<Card title="Dense Model (e.g., Llama 3)">
				<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4 mb-4">
					<li>Every parameter is active for every token.</li>
					<li>Linear compute scaling with parameter count.</li>
					<li>
						High VRAM <em>and</em> high compute (TFLOPs) required.
					</li>
					<li>
						<strong>Example:</strong> A 70B dense model uses 70B parameters for every word.
					</li>
				</ul>
			</Card>
			<Card title="MoE Model (e.g., Mixtral 8x7B)">
				<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4 mb-4">
					<li>Sparse activation (e.g., only 2 experts per token).</li>
					<li>Only 13B active parameters out of 47B total per token.</li>
					<li>
						High VRAM required (all experts fit in memory), but <strong>low compute</strong>.
					</li>
					<li>
						<strong>Example:</strong> An MoE with 8x7B experts uses only 2 experts per token, performing the compute of
						a ~13B model.
					</li>
				</ul>
			</Card>
		</Grid>,
		<h3 key="h3-2" className="text-xl font-bold mt-8 mb-4">
			The State of Modern Large Models
		</h3>,
		<p key="modern-sub" className="mb-4">
			As you move into the tier of "frontier models", engineering heavily favors MoE because you can scale the model's
			total "knowledge capacity" without skyrocketing the per-token inference cost. Here is how modern models stack up:
		</p>,
		<Table
			key="table"
			headers={["Model Family", "Architecture Strategy", "Details"]}
			rows={[
				[
					"DeepSeek-V3 & R1",
					"MoE (Confirmed)",
					'The current poster child for MoE efficiency. V3/R1 use a massive 671B total parameters, but only activate 37B per token. It uses "DeepDive" routing to save immense training and inference costs, completely disrupting the AI pricing market in early 2025.',
				],
				[
					"Grok 3 (xAI)",
					"MoE (Confirmed)",
					"Grok 3 is a gargantuan MoE trained on an unprecedented 100,000 H100 GPUs. Like its predecessors, it heavily relies on MoE to keep API response times incredibly fast despite its immense underlying size.",
				],
				[
					"GPT-4o & o1 (OpenAI)",
					"MoE (Rumored/Leaked)",
					"Widely understood to be massive MoE models (originally leaked as 8x220B). This allows OpenAI to hold world-class reasoning capabilities while maintaining low latencies for real-time voice and text generation.",
				],
				[
					"Gemini 1.5 Pro (Google)",
					"MoE (Confirmed)",
					"Explicitly confirmed MoE architecture. Its sparse activation is the fundamental reason Google can offer an insane 2M+ token context window—the compute cost per token is aggressively optimized.",
				],
				[
					"Llama 3.3 (Meta)",
					"Dense (Confirmed)",
					"Meta's flagship models (like Llama 3.3 70B) are the exception to the rule. They are explicitly Dense models, meaning every parameter is fired for every token. Meta brute-forces performance with massive, highly optimized dense training runs.",
				],
				[
					"Claude 3.5 Sonnet",
					"Undisclosed",
					"Anthropic keeps its architecture closely guarded. Given Sonnet 3.5's blistering speed mixed with top-tier coding performance, researchers heavily suspect it uses a highly optimized MoE, though Anthropic has not publicly confirmed.",
				],
			]}
		/>,
		<MistakeCard
			key="mistake1"
			number={1}
			title="Thinking MoE saves VRAM / GPU Memory"
			problem="A developer buys a laptop with 24GB of VRAM and tries to run Mixtral 8x7B (47B total parameters) locally, assuming it will fit because 'it only uses 13B parameters at a time!'"
			solution={
				<>
					<strong>MoE saves Compute, NOT Memory.</strong> Even though only 2 experts are used <em>per token</em>, the
					router could pick any expert at any time. Therefore,{" "}
					<strong>all experts must physically reside in VRAM</strong> constantly. A 47B MoE requires exactly the same
					VRAM as a 47B Dense model.
				</>
			}
		/>,
		<h3 key="h3-4" className="text-xl font-bold mt-8 mb-4">
			Pros and Cons of MoE Architecture
		</h3>,
		<Grid key="pros-cons-grid" cols={2} gap={6} className="my-8">
			<Card title="Pros">
				<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
					<li>
						<strong>Blistering Inference Speed:</strong> Active parameter count remains low, meaning less compute time
						per token.
					</li>
					<li>
						<strong>Massive Knowledge Capacity:</strong> Total parameter count can be scaled to trillions without
						breaking real-time latency.
					</li>
					<li>
						<strong>Lower Training/Serving Cost:</strong> TFLOPs per token remain bound to the active experts, saving
						immense electricity/compute costs for API providers.
					</li>
					<li>
						<strong>Specialization:</strong> Experts naturally organize themselves into specializations (e.g., an expert
						that fires mainly for Python syntax, another for French translation).
					</li>
				</ul>
			</Card>
			<Card title="Cons">
				<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
					<li>
						<strong>VRAM Hungry:</strong> Every single parameter must be kept in memory. You cannot page experts in and
						out of GPU memory fast enough during generation.
					</li>
					<li>
						<strong>Expert Collapse / Load Balancing:</strong> The router can get "lazy" and only route to Expert #1,
						starving others. Complex training loss penalties are required to force even load balancing.
					</li>
					<li>
						<strong>Higher Cold-Start Latency:</strong> Loading massive 1.8T parameter weights into GPU memory takes
						significantly longer than standard dense models.
					</li>
					<li>
						<strong>Communication Bottlenecks:</strong> In multi-GPU setups (tensor parallelism), bouncing tokens
						between GPUs to find their required expert limits scaling efficiency.
					</li>
				</ul>
			</Card>
		</Grid>,
	],
};
