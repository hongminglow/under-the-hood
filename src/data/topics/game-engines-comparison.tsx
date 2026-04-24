import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Boxes, Box, Leaf, Globe } from "lucide-react";

export const gameEnginesComparisonTopic: Topic = {
	id: "game-engines-comparison",
	title: "Game Engines: Unity vs UE5 vs Godot vs Cocos",
	description:
		"A deep dive into the modern game engine landscape. Analyzing when to use Unity's versatile ecosystem, UE5's hyper-realistic Nanite/Lumen, Godot's node-based elegance, or Cocos Creator's ultra-optimized web-first runtime.",
	tags: ["game-dev", "architecture", "c++", "csharp", "rendering"],
	icon: "Gamepad2",
	content: [
		<p key="intro-1">
			Choosing a game engine today isn't just about "which one makes pretty graphics." It dictates your entire
			engineering architecture, hiring pool, platform distribution strategy, and iteration speed. While Unity and Unreal
			dominate the AAA and AA 3D space, engines like Godot and Cocos are fiercely devouring the 2D, indie, and
			Web3/HTML5 markets.
		</p>,

		/* ─── SECTION 1: The 3D Heavyweights ────────────────────────────────── */
		<h3 key="3d-heavyweights" className="text-xl font-bold mt-12 mb-4">
			The 3D Heavyweights: Unreal Engine 5 vs Unity
		</h3>,
		<p key="3d-sub" className="mb-6">
			If you are building a 3D game for PC, Console, or high-end Mobile, your choice almost inevitably boils down to
			these two giants.
		</p>,
		<Grid key="3d-grid" cols={2} gap={6} className="mb-8">
			<FeatureCard
				icon={Boxes}
				title="Unreal Engine 5 (UE5)"
				subtitle="The king of AAA, hyper-realism, and massive scale"
				theme="violet"
			>
				<ul className="text-sm text-violet-100/75 space-y-2 list-disc pl-4 mb-4">
					<li>
						<strong className="text-violet-300">Languages:</strong> C++ and Blueprints (Visual Scripting).
					</li>
					<li>
						<strong className="text-violet-300">Nanite:</strong> Virtualized micropolygon geometry. It eliminates the
						need for LODs (Level of Detail) and normal maps. You can literally drop movie-quality 10-million polygon
						assets directly into the scene.
					</li>
					<li>
						<strong className="text-violet-300">Lumen:</strong> Fully dynamic global illumination and reflections in
						real-time. No more baking lighting or lightmaps.
					</li>
					<li>
						<strong className="text-violet-300">Architecture:</strong> Heavy, monolithic, and deeply structured
						(Actors, Pawns, GameModes). Highly opinionated out of the box.
					</li>
					<li>
						<strong className="text-violet-300">Best For:</strong> AAA studios, hyper-realistic 3D, open-world games,
						and film/virtual production.
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard
				icon={Box}
				title="Unity"
				subtitle="The versatile titan of mobile, XR, and AA development"
				theme="cyan"
			>
				<ul className="text-sm text-cyan-100/75 space-y-2 list-disc pl-4 mb-4">
					<li>
						<strong className="text-cyan-300">Languages:</strong> C# (via Mono/IL2CPP).
					</li>
					<li>
						<strong className="text-cyan-300">Ecosystem:</strong> Unrivaled Asset Store. Finding pre-built systems,
						integrations, or plugins is vastly easier than in Unreal.
					</li>
					<li>
						<strong className="text-cyan-300">Architecture (ECS):</strong> Transitioning to DOTS (Data-Oriented
						Technology Stack) for ultra-performant, data-driven CPU architectures allowing tens of thousands of entities.
					</li>
					<li>
						<strong className="text-cyan-300">Platform Reach:</strong> The absolute gold standard for Mobile
						(iOS/Android) and XR (VR/AR).
					</li>
					<li>
						<strong className="text-cyan-300">Best For:</strong> Mobile games, VR/AR, stylized 3D, rich 2D games, and
						teams relying heavily on C#.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		/* ─── SECTION 2: The 2D & Web Specialists ────────────────────────────── */
		<h3 key="2d-specialists" className="text-xl font-bold mt-12 mb-4">
			The 2D & Web Specialists: Godot vs Cocos
		</h3>,
		<p key="2d-sub" className="mb-6">
			While Unity can do 2D and WebGL exports, doing so often brings a massive engine overhead (30MB+ WebAssembly
			payloads for an empty scene). Godot and Cocos approach lightweight rendering entirely differently.
		</p>,
		<Grid key="2d-grid" cols={2} gap={6} className="mb-8">
			<FeatureCard
				icon={Leaf}
				title="Godot"
				subtitle="The open-source darling with an elegant node paradigm"
				theme="emerald"
			>
				<ul className="text-sm text-emerald-100/75 space-y-2 list-disc pl-4 mb-4">
					<li>
						<strong className="text-emerald-300">Languages:</strong> GDScript (Python-like), C#, C++.
					</li>
					<li>
						<strong className="text-emerald-300">Node Architecture:</strong> Everything is a Node. Nodes are organized
						in trees and can be saved as editable "Scenes". A Scene can be instantiated inside another Scene. It is
						incredibly logical for UI and 2D.
					</li>
					<li>
						<strong className="text-emerald-300">Licensing:</strong> 100% Free and Open Source (MIT). No royalties, ever.
					</li>
					<li>
						<strong className="text-emerald-300">Web Export Caveat:</strong> Godot is technically desktop-first. Its web
						export relies on running the engine via WebAssembly. Godot 4 heavily relies on SharedArrayBuffer, making
						mobile HTML5 deployments notoriously unstable compared to Cocos.
					</li>
					<li>
						<strong className="text-emerald-300">Best For:</strong> Indie 2D/3D games, developers who hate corporate
						royalty fees, and fast prototyping.
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard
				icon={Globe}
				title="Cocos Creator"
				subtitle="The ultra-optimized web-first heavyweight"
				theme="amber"
			>
				<ul className="text-sm text-amber-100/75 space-y-2 list-disc pl-4 mb-4">
					<li>
						<strong className="text-amber-300">Languages:</strong> TypeScript / JavaScript.
					</li>
					<li>
						<strong className="text-amber-300">Web-First Architecture:</strong> Built natively on web technologies. It
						doesn't emulate a desktop engine in WASM; its runtime is designed specifically for extreme HTML5/Canvas
						optimization.
					</li>
					<li>
						<strong className="text-amber-300">Payload & Performance:</strong> Drastically smaller bundle sizes. It
						features robust auto-batching to reduce draw calls, making it the dominant engine for WeChat Mini-Games,
						Facebook Instant Games, and playable ads.
					</li>
					<li>
						<strong className="text-amber-300">Workflow:</strong> Highly component-based, drawing heavy inspiration from
						Unity's editor UI, but strictly targeting web and mobile WebViews.
					</li>
					<li>
						<strong className="text-amber-300">Best For:</strong> Playable ads, HTML5 web games, crypto/Web3 games, and
						extreme low-end mobile targeting.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		<Callout key="web-callout" type="warning" title="The WebAssembly Overhead Trap">
			Exporting Unity or Unreal engine games to HTML5 essentially means compiling a massive C++/C# desktop engine down
			to WebAssembly (WASM). This results in huge initial payload sizes (often 20MB+) and severe Memory Out Of Bounds
			errors on iOS Safari due to RAM limits. If your business model strictly relies on instant, frictionless web
			loading, <strong>Cocos Creator using TypeScript</strong> fundamentally outperforms Unity WebGL.
		</Callout>,

		/* ─── SECTION 3: Deep Technical Comparisons ─────────────────────────── */
		<h3 key="compare-title" className="text-xl font-bold mt-12 mb-4">
			Technical Architecture Comparison
		</h3>,
		<Table
			key="compare-table"
			headers={["Feature", "Unreal Engine 5", "Unity", "Godot 4", "Cocos Creator"]}
			rows={[
				["Primary Language", "C++ / Blueprints", "C#", "GDScript / C#", "TypeScript"],
				[
					"Core Paradigm",
					"Actor / Component Hierarchy",
					"Entity-Component / DOTS",
					"Node Trees / Scenes",
					"Entity-Component system",
				],
				[
					"Lighting Strategy",
					"Lumen (Dynamic Global Illumination)",
					"Enlighten (Baked) / Realtime GI",
					"SDFGI (Signed Distance Fields)",
					"Standard PBR / Web optimized",
				],
				[
					"HTML5 Web Target",
					"🔴 Deprecated / Very Heavy",
					"🟡 Usable (Heavy WASM Payload)",
					"🟡 Usable (SharedArrayBuffer issues)",
					"🟢 Exceptional (Web-Native)",
				],
				[
					"Source Code Access",
					"✅ Yes (GitHub access included)",
					"❌ No (Requires Enterprise $$)",
					"✅ Yes (Fully Open Source)",
					"✅ Yes (Open Source Engine)",
				],
				[
					"Licensing Model",
					"5% Royalties after $1M gross",
					"Subscription + Per-Seat fees",
					"100% Free (MIT)",
					"Free (MIT Engine) / Editor limits",
				],
			]}
		/>,

		/* ─── SECTION 4: Code Paradigm Comparison ───────────────────────────── */
		<h3 key="code-title" className="text-xl font-bold mt-12 mb-4">
			Code Paradigm: Moving a Player
		</h3>,
		<Grid key="code-grid" cols={2} gap={4} className="mb-8">
			<CodeBlock
				title="Godot (GDScript)"
				theme="emerald"
				language="python"
				code={`extends CharacterBody2D

const SPEED = 300.0

func _physics_process(delta):
    var direction = Input.get_axis("ui_left", "ui_right")
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)

    move_and_slide()`}
			/>
			<CodeBlock
				title="Unity (C#)"
				theme="cyan"
				language="csharp"
				code={`using UnityEngine;

public class PlayerMove : MonoBehaviour {
    public float speed = 5f;
    private Rigidbody2D rb;

    void Start() {
        rb = GetComponent<Rigidbody2D>();
    }

    void FixedUpdate() {
        float h = Input.GetAxisRaw("Horizontal");
        rb.velocity = new Vector2(h * speed, rb.velocity.y);
    }
}`}
			/>
		</Grid>,

		/* ─── SECTION 5: Common Traps & Mistakes ────────────────────────────── */
		<h3 key="mistakes-title" className="text-xl font-bold mt-12 mb-6">
			Strategic Engine Traps
		</h3>,
		<MistakeCard
			key="m1"
			number={1}
			title="Using Unreal Engine 5 for a 2D Mobile Scroller"
			problem="You like the idea of learning C++ and Blueprints, so you download UE5 to build a simple 2D platformer for iOS. You fight the engine's 3D-first physics, strip out massive rendering pipelines, and end up with a 500MB install size for a Flappy Bird clone."
			solution="Engine mismatch. UE5's Paper2D is notoriously underdeveloped. For 2D mobile, Unity or Godot will provide a vastly superior iteration speed, battery life optimization, and final package size."
		/>,
		<MistakeCard
			key="m2"
			number={2}
			title="Ignoring WebGL Payload limitations with Unity"
			problem="A client hires you to build an interactive 3D configurator for their website. You build it in Unity because you know it well. The final build is a 25MB initial download. The marketing team rejects it because users bounce during the 10-second loading screen. Unity WebGL doesn't dynamically load the engine — the entire engine runtime must load before the first frame runs."
			solution="For web-first interactive experiences where load time equals conversion rate, raw Three.js / React Three Fiber or Cocos Creator drastically outperform desktop engines shoehorned into WebAssembly."
		/>,
		<MistakeCard
			key="m3"
			number={3}
			title="Over-engineering simple logic in Unity Monobehaviours"
			problem="Creating 5,000 distinct bullet entities as GameObjects with rigidbodies and Update() ticks. The game drops to 12 FPS because of the massive overhead of C++ to C# interop calls and Mono memory fragmentation."
			solution="Switch to Unity's DOTS (Data-Oriented Technology Stack) or write a custom GPU instanced shader. Don't use heavy GameObjects for massive numbers of simple, stateless entities."
		/>,
	],
};
