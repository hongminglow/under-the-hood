import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { Highlight } from "@/components/ui/Highlight";

export const llmQuantizationTopic: Topic = {
	id: "llm-quantization",
	title: "LLM Quantization",
	description: "The bit-level black magic of compressing huge AI models to run on edge devices and consumer hardware.",
	tags: ["ai", "optimization", "quantization"],
	icon: "Cpu",
	content: [
		<p key="intro" className="mb-4">
			An LLM is ultimately just billions of decimal numbers (weights) sitting in matrices. By default, models train
			using <strong>16-bit floating point numbers (FP16/BF16)</strong>. But what if you squish those highly-precise
			decimals down to 8-bit, 4-bit, or even 2-bit integers? That is <strong>Quantization</strong>.
		</p>,
		<Callout key="callout" type="info" title="The Goal">
			A 70B model in FP16 takes ~140GB of VRAM (impossible for consumer GPUs). Quantized to 4-bit, you shrink it to
			~35GB, allowing it to easily fit on two consumer GPUs or an Apple Silicon Mac with Unified Memory.
		</Callout>,
		<h3 key="h3-1" className="text-xl font-semibold mt-8 mb-4">
			Quantization Algorithms Compared
		</h3>,
		<Table
			key="formats-table"
			headers={["Format", "Backend Focus", "How it works"]}
			rows={[
				[
					"GGUF (Llama.cpp)",
					"CPU / Apple Silicon",
					"The king of local Mac/CPU inference. Allows partial offloading bridging CPU RAM and GPU VRAM seamlessly.",
				],
				[
					"GPTQ",
					"Nvidia GPU (VRAM)",
					"Calibration-based. Looks at a sample dataset to figure out which weights matter most before aggressively truncating them. Best for GPUs.",
				],
				[
					"AWQ",
					"Nvidia GPU (VRAM)",
					"Slightly smarter than GPTQ. It identifies the top 1% of 'salient weights' (crucial for intelligence) and keeps them in FP16, while squishing the rest to INT4. Less degradation.",
				],
				[
					"EXL2",
					"Nvidia GPU (VRAM)",
					"Variable bitrate. Compresses boring layers down to 2.5 bits and smart layers to 6.0 bits, achieving insane generation speeds.",
				],
			]}
		/>,
		<Grid key="grid" cols={2} gap={6}>
			<Card title="The Precision Loss Issue">
				<p className="text-sm text-slate-300">
					When converting <Highlight variant="warning">0.3019842 (FP16)</Highlight> to a single integer grid of{" "}
					<Highlight variant="info">[0, 1, 2, 3] (2-bit)</Highlight>, you lose nuance. At extreme quantization levels
					(e.g. 2-bit), the model effectively becomes &quot;dumb&quot;, losing reasoning ability and hallucinating more.
				</p>
			</Card>
			<Card title="The Sweet Spot">
				<p className="text-sm text-slate-300">
					Empirically, <strong>4-bit to 5-bit quantization</strong> is the undisputed sweet spot. It offers a 70-75%
					reduction in size with only a ~2-5% degradation in benchmark performance compared to the original uncompressed
					model.
				</p>
			</Card>
		</Grid>,
		<h3 key="h3-2" className="text-xl font-semibold mt-8 mb-4">
			When to use which?
		</h3>,
		<ul key="ul-1" className="list-disc pl-6 space-y-2 mb-4 text-sm text-muted-foreground">
			<li>
				<strong>Running on a Mac / CPU only?</strong> Always choose <strong>GGUF</strong>.
			</li>
			<li>
				<strong>Running on an Nvidia RTX 3090 / 4090?</strong> Choose <strong>AWQ</strong> or <strong>EXL2</strong> for
				blazing fast streaming.
			</li>
			<li>
				<strong>Training a model?</strong> Don&apos;t train on INT4 natively. You train in BF16, then{" "}
				<em>Post-Training Quantize (PTQ)</em> it for distribution.
			</li>
		</ul>,
	],
};
