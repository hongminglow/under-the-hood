import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Highlight } from "@/components/ui/Highlight";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Gauge, Package, Settings, Zap } from "lucide-react";

export const viteVsWebpackTopic: Topic = {
	id: "vite-vs-webpack",
	title: "Vite vs Webpack",
	description:
		"How Vite completely destroyed Webpack's monopoly by fundamentally redefining the frontend build architecture.",
	tags: ["frontend", "performance", "architecture", "build-tools"],
	icon: "Zap",
	content: [
		<p key="1" className="mb-6">
			For years, <Highlight variant="primary">Webpack</Highlight> was the undisputed king of frontend build tools. But
			as web applications scaled to thousands of modules, its internal architecture struggled, turning 1-second local
			builds into 30-second coffee breaks. Then <Highlight variant="primary">Vite</Highlight> arrived, radically
			changing the paradigm by leveraging modern browser features and natively compiled languages (Go), instantly
			becoming the default modern standard.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			The Core Paradigm Shift
		</h3>,

		<Grid key="3" cols={2} gap={6} className="mb-8">
			<FeatureCard icon={Package} title="Webpack" subtitle="Bundle-based development server" theme="teal">
				<p className="mb-4 text-teal-100/80">
					Webpack crawls your entire application. It parses every single JavaScript file, CSS file, and asset, builds a
					massive dependency graph, and then mathematically mashes them all together into big bundle files{" "}
					<strong>before</strong> the development server can even turn on.
				</p>
				<p className="text-teal-100/70">
					Result: The server startup time scales exponentially as the project grows. A legacy enterprise app might take
					two minutes just to boot locally.
				</p>
			</FeatureCard>
			<FeatureCard icon={Zap} title="Vite" subtitle="Native ESM development server" theme="amber">
				<p className="mb-4 text-amber-100/80">
					Vite skips bundling entirely during development. It leverages modern browsers' native support for{" "}
					<code>&lt;script type="module"&gt;</code>. Vite instantly turns on the server and only compiles exact files
					natively when the browser actively HTTP requests them.
				</p>
				<p className="text-amber-100/70">
					Result: Server startup time is completely decoupled from project size. It boots in ~100ms whether you have 10
					files or 10,000.
				</p>
			</FeatureCard>
		</Grid>,

		<h3 key="4" className="text-xl font-bold mt-8 mb-4">
			Why Vite Took Over the Industry
		</h3>,

		<Grid key="5" cols={1} gap={6} className="mb-8">
			<FeatureCard icon={Gauge} title="1. esbuild" subtitle="Vite's unfair speed advantage" theme="amber">
				<p className="mb-4 text-amber-100/80">
					Webpack relies on transpilers written in JavaScript (like Babel or tsc), which are tightly bottlenecked by JS
					engine parse speeds. Vite completely sidesteps this by using <strong className="text-amber-300">esbuild</strong>,
					a bundler written in heavily optimized <strong>Go</strong>. esbuild pre-bundles dependencies and parses code
					roughly 10-100x faster than JavaScript-based tools at the physical CPU level.
				</p>
			</FeatureCard>

			<FeatureCard icon={Settings} title="2. Zero-Config Environment" subtitle="Vite absorbs the loader maze" theme="amber">
				<p className="mb-4 text-amber-100/80">
					To get Webpack working with modern standards (React, TypeScript, CSS modules), you must manually install and
					orchestrate complex chains of loaders (<code>babel-loader</code>, <code>ts-loader</code>,{" "}
					<code>css-loader</code>). Vite supports TypeScript, JSX, CSS processors, and JSON automatically
					out-of-the-box.
				</p>
				<Grid cols={2} gap={4}>
					<CodeBlock
						theme="amber"
						title="webpack.config.js"
						language="javascript"
						code={`module.exports = {
  module: {
    rules: [
      { test: /\\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\\.(js|jsx)$/, use: 'babel-loader' }
    ]
  }
};`}
					/>
					<CodeBlock
						theme="amber"
						title="vite.config.ts"
						language="javascript"
						code={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Everything works automatically.
export default defineConfig({
  plugins: [react()]
})`}
					/>
				</Grid>
			</FeatureCard>

			<FeatureCard icon={Zap} title="3. Constant-Time HMR" subtitle="Vite updates the requested module, not the world" theme="amber">
				<p className="text-amber-100/80">
					When you edit a file, Webpack has to rebuild part of the bundle to inject the new code, meaning HMR gets
					linearly slower over time as it processes heavy graphs. With Vite, because it uses native ESM routing, saving
					a file simply causes the browser to request that single module again. HMR takes the same ~50ms in a tiny app
					as it does in a massive monolithic application.
				</p>
			</FeatureCard>
		</Grid>,

		<h3 key="6" className="text-xl font-bold mt-8 mb-4">
			Technical Comparison
		</h3>,

		<Table
			key="7"
			headers={["Metric", "<span class='text-teal-300'>Webpack</span>", "<span class='text-amber-300'>Vite</span>"]}
			rows={[
				["Paradigm", "Bundle-based dev server", "Native ESM-based dev server"],
				["Dev Startup Time", "O(N) - Slows down as codebase grows", "O(1) - ~100ms regardless of size"],
				["HMR Speed", "Slows down eventually", "Instantaneous, constant time"],
				["Internal Compiler", "Babel / tsc (JavaScript-based)", "esbuild (Go-based, 100x faster)"],
				["Production Build", "Webpack strict bundler", "Rollup (Tree-shaking optimized)"],
				["Configuration", "Heavy, verbose 3rd-party mapping", "Strict zero-config philosophy"],
			]}
		/>,

		<Callout key="8" type="warning" title="What About Production?">
			It is a common misconception that Vite doesn't bundle code at all.{" "}
			<strong>Vite strictly bundles code for Production.</strong> However, instead of building its own complex
			production bundler, it intelligently delegates this task to <strong className="text-amber-300">Rollup</strong>{" "}
			beneath the hood. Rollup is famous for producing highly optimized, heavily tree-shaken static production assets,
			guaranteeing your users get the smallest possible payload.
		</Callout>,
	],
};
