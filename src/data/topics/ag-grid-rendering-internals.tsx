import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { Step } from "@/components/ui/Step";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Gauge, Layers, ListFilter, Repeat2, Rows3, ScrollText, SearchCheck } from "lucide-react";

export const agGridRenderingInternalsTopic: Topic = {
	id: "ag-grid-rendering-internals",
	title: "AG Grid: Rendering Internals",
	description:
		"How AG Grid renders 10,000+ rows without white space during scroll — and why it feels nothing like naive virtual scrolling despite doing the same thing under the hood.",
	tags: ["frontend", "performance", "react", "optimization"],
	icon: "Table2",
	content: [
		<p key="intro-1">
			You have 10,000 rows. Your client bans pagination, infinite scroll, and virtual scrolling. You reach for{" "}
			<strong>AG Grid</strong> — and it just works. No white spaces during fast scrolling. Every row is visually
			accessible. The scrollbar reflects the full dataset. How? Is it rendering all 10,000 rows to the DOM? Not even
			close.
		</p>,
		<Callout key="truth-callout" type="warning" title="The Fundamental Truth: AG Grid IS virtual scrolling">
			AG Grid uses DOM virtualization just like <code>react-window</code> or <code>@tanstack/react-virtual</code>. At
			any given moment, only <strong>~20–50 rows</strong> exist in the DOM regardless of dataset size. The reason it{" "}
			<em>feels</em> different is because of a stack of engineering decisions that make the recycling invisible to the
			human eye. This topic is about what those decisions are.
		</Callout>,

		/* ─── SECTION 1: Why naive virtual scroll shows white space ─────────── */
		<h3 key="naive-title" className="text-xl font-bold mt-12 mb-4">
			Why Naive Virtual Scrolling Shows White Space
		</h3>,
		<p key="naive-sub" className="mb-6">
			Before AG Grid, you need to understand exactly why a basic virtual scroller fails to feel smooth. The problem is a
			timing gap between three separate browser events:
		</p>,
		<Flow
			key="naive-flow"
			steps={[
				{
					title: "1. User Drags Scrollbar",
					description: "The browser fires a scroll event. This happens on the main thread, synchronously.",
				},
				{
					title: "2. JS Calculates New Rows",
					description:
						"Your virtual scroll library reads the new scrollTop, calculates which row indexes should now be visible. This takes CPU time.",
				},
				{
					title: "3. React Re-renders",
					description:
						"React schedules a re-render to swap out old row components for new ones. This is asynchronous — it queues behind other work.",
				},
				{
					title: "4. DOM is Updated",
					description: "React commits the changes to the DOM on the next paint frame.",
				},
				{
					title: "5. Browser Paints",
					description:
						"Only now does the browser repaint. If steps 2–4 took longer than 16ms, the user sees one paint cycle of empty space (white flash).",
				},
			]}
		/>,
		<p key="naive-gap" className="mb-6">
			The white space appears in that gap between <strong>step 1</strong> (user scrolled) and <strong>step 5</strong>{" "}
			(new rows painted). On a fast machine this might be imperceptible. But drag the scrollbar rapidly — or run on a
			mid-range Android phone — and the gap opens up to multiple frames. You see a flash of empty space before rows pop
			in.
		</p>,

		/* ─── SECTION 2: AG Grid's Architecture Stack ───────────────────────── */
		<h3 key="arch-title" className="text-xl font-bold mt-12 mb-4">
			AG Grid's 5-Layer Performance Architecture
		</h3>,
		<p key="arch-sub" className="mb-6">
			AG Grid closes that timing gap through five compounding techniques. Each one individually helps. Together they
			make 10,000 rows feel indistinguishable from a native app.
		</p>,

		/* Layer 1: Custom Scroll Interception */
		<FeatureCard
			key="layer1"
			icon={ScrollText}
			title="Layer 1 — Synthetic Scroll Infrastructure"
			subtitle="The fake scrollbar"
			theme="emerald"
			className="mb-4"
		>
			<p className="text-sm text-emerald-200/80 mb-4">
				AG Grid does <strong>not</strong> use the browser's native scroll event on the actual row container. Instead, it
				builds its own scroll infrastructure consisting of two separate elements:
			</p>
			<ul className="text-sm text-emerald-200/70 space-y-4 list-disc pl-4 mb-4">
				<li>
					<strong className="text-emerald-300">The Spacer:</strong> A tall, empty <code>div</code> whose height is
					exactly <code>totalRows × rowHeight</code>. If you have 10,000 rows at 40px each, this div is{" "}
					<code>400,000px</code> tall. It lives inside the scroll container, forcing the browser to display a native
					scrollbar with the correct proportional thumb size — as if all 400,000px of content actually existed.
				</li>
				<li>
					<strong className="text-emerald-300">The Row Viewport:</strong> A separate fixed-height container
					positioned on top, which only ever holds ~30–50 row DOM nodes. Rows here are never scrolled natively — they
					are moved via <strong>CSS transforms</strong>.
				</li>
				<li>
					<strong className="text-emerald-300">Scroll Interception:</strong> AG Grid listens to the{" "}
					<code>scroll</code> event on the outer container, reads the <code>scrollTop</code> value, and then manually
					calculates which rows to show and what <code>translateY</code> offset to apply — all without moving the row
					viewport container at all.
				</li>
			</ul>
			<p className="text-xs text-emerald-200/60 border-t border-emerald-700/50 pt-3">
				If you open DevTools on an AG Grid and inspect the DOM, you will literally find elements annotated{" "}
				<code>ag-fake-vertical-scroll</code> and <code>ag-fake-horizontal-scroll</code>. This is not an accident — it is
				the core of the architecture.
			</p>
		</FeatureCard>,

		/* Layer 2: CSS Transform vs top/left */
		<FeatureCard
			key="layer2"
			icon={Gauge}
			title="Layer 2 — GPU-Composited Positioning"
			subtitle="transform vs top"
			theme="cyan"
			className="mb-4"
		>
			<p className="text-sm text-cyan-200/80 mb-4">
				This is the single biggest difference between AG Grid and a naive implementation. When a row needs to move
				position, there are two ways to do it in CSS:
			</p>
			<Grid cols={2} gap={4}>
				<div className="rounded-xl border border-cyan-800/50 bg-cyan-950/20 p-4">
					<p className="text-sm font-semibold text-cyan-200 mb-3">
						Naive: <code>position: absolute + top</code>
					</p>
					<CodeBlock
						title="Slow positioning"
						language="css"
						theme="cyan"
						code={`.row {
  position: absolute;
  top: 4800px; /* Row 120 × 40px */
}`}
					/>
					<p className="text-xs mt-3 leading-relaxed text-cyan-200/70">
						Setting <code>top</code> triggers <strong>Layout Reflow</strong>. The browser must recalculate the position
						of every element in the document subtree — extremely expensive at 60fps.
					</p>
				</div>
				<div className="rounded-xl border border-cyan-700/60 bg-cyan-900/20 p-4 shadow-[0_0_24px_rgba(8,145,178,0.08)]">
					<p className="text-sm font-semibold text-cyan-100 mb-3">
						AG Grid: <code>transform: translateY</code>
					</p>
					<CodeBlock
						title="GPU positioning"
						language="css"
						theme="cyan"
						code={`.row {
  position: absolute;
  top: 0;
  transform: translateY(4800px);
}`}
					/>
					<p className="text-xs mt-3 leading-relaxed text-cyan-100/75">
						<code>transform</code> skips Layout and Paint entirely. The browser hands this off to the{" "}
						<strong>GPU compositor thread</strong> — zero reflow cost, handled completely off the main thread.
					</p>
				</div>
			</Grid>
			<p className="text-sm text-cyan-200/80 mt-4">
				When AG Grid repositions a recycled row, it only updates <code>transform: translateY(Xpx)</code>. The GPU
				compositor reads this property on its own thread and moves the layer, completely independent of JavaScript
				execution or main thread layout. This is why rows appear in the right position instantly, even mid-scroll.
			</p>
		</FeatureCard>,

		/* Layer 3: Row Buffer */
		<FeatureCard
			key="layer3"
			icon={Rows3}
			title="Layer 3 — The Row Buffer"
			subtitle="Pre-rendered invisible rows"
			theme="sky"
			className="mb-4"
		>
			<p className="text-sm text-sky-200/80 mb-4">
				Every virtual scroller has an <code>overscan</code> or buffer concept. AG Grid calls it <code>rowBuffer</code>.
				By default it is <strong>10 rows above and 10 rows below</strong> the visible viewport at all times.
			</p>
			<p className="text-sm text-sky-200/80 mb-4">
				If your viewport shows rows 50–70, AG Grid is actually maintaining rows 40–80 in the DOM — fully rendered,
				data-bound, and GPU-composited. They are just translated off-screen. When you scroll down to reveal row 71, AG
				Grid doesn't need to create any new DOM nodes. Row 71 is already in the DOM; AG Grid simply updates its{" "}
				<code>translateY</code> so it enters the visible area.
			</p>
			<CodeBlock
				title="AG Grid rowBuffer configuration"
				language="typescript"
				theme="sky"
				code={`// Default: 10 rows above/below viewport
// Increase for faster machines or smoother fast-drag experience
// Decrease for initial load performance on slow devices
const gridOptions: GridOptions = {
  rowBuffer: 10, // AG Grid default

  // You can also set this in the component:
  // <AgGridReact rowBuffer={20} ... />
};`}
			/>
			<p className="text-xs text-sky-200/60 mt-3 border-t border-sky-700/50 pt-3">
				Increasing <code>rowBuffer</code> makes fast scrolling smoother (more pre-rendered rows available) at the cost
				of slightly slower initial render and more memory. It is a tunable trade-off based on your hardware target.
			</p>
		</FeatureCard>,

		/* Layer 4: requestAnimationFrame sync */
		<FeatureCard
			key="layer4"
			icon={Layers}
			title="Layer 4 — requestAnimationFrame Sync"
			subtitle="One batch per paint frame"
			theme="indigo"
			className="mb-4"
		>
			<p className="text-sm text-indigo-200/80 mb-4">
				The <code>scroll</code> event can fire 100+ times per second. If AG Grid processed every single event
				synchronously — recalculating rows, recycling nodes, updating transforms — it would flood the main thread and{" "}
				<em>cause</em> the jank it's trying to prevent.
			</p>
			<p className="text-sm text-indigo-200/80 mb-4">
				Instead, AG Grid wraps all DOM update logic in <code>requestAnimationFrame()</code>. This means that no matter
				how many scroll events fire in a given millisecond, AG Grid will only perform one batch of DOM work per browser
				paint frame (≈16ms at 60fps). The browser gets to process scroll, paint, and composite at its own pace — AG Grid
				is just a passenger that slots in at the right moment.
			</p>
			<CodeBlock
				title="Conceptual model — how AG Grid handles scroll internally"
				language="typescript"
				theme="indigo"
				code={`// Simplified conceptual version of AG Grid's scroll handler
let pendingScrollUpdate = false;

scrollContainer.addEventListener('scroll', () => {
  if (pendingScrollUpdate) return; // Already scheduled for this frame
  pendingScrollUpdate = true;

  requestAnimationFrame(() => {
    const scrollTop = scrollContainer.scrollTop;
    const firstVisibleRow = Math.floor(scrollTop / ROW_HEIGHT);
    const lastVisibleRow = firstVisibleRow + VISIBLE_ROW_COUNT + ROW_BUFFER;

    // Recycle and reposition rows in one synchronous batch
    recycleAndPositionRows(firstVisibleRow, lastVisibleRow);
    pendingScrollUpdate = false;
  });
});`}
			/>
		</FeatureCard>,

		/* Layer 5: Row Recycling vs Destroy/Create */
		<FeatureCard
			key="layer5"
			icon={Repeat2}
			title="Layer 5 — Row Recycling"
			subtitle="Not destroy/create"
			theme="violet"
			className="mb-4"
		>
			<p className="text-sm text-violet-200/80 mb-4">
				A naive virtual scroller typically <strong>destroys</strong> the DOM node for a row that scrolls out of view and{" "}
				<strong>creates</strong> a new DOM node for the row entering the view. DOM creation is expensive — the browser
				must parse, create, style, lay out, and paint a new element.
			</p>
			<p className="text-sm text-violet-200/80 mb-4">
				AG Grid instead <strong>recycles</strong> row containers. When row 40 scrolls off the top of the viewport, AG
				Grid does not destroy that DOM node. It takes it, updates its data binding to point to row 81 (the next row
				entering the bottom), and sets a new <code>translateY</code> to position it at the bottom of the visible area.
				The DOM node itself is reused.
			</p>
			<Table
				theme="violet"
				headers={["Operation", "Naive: Destroy + Create", "AG Grid: Recycle"]}
				rows={[
					[
						"DOM mutations",
						"removeChild() + createElement() + appendChild()",
						"Update textContent + translateY value only",
					],
					[
						"Style recalculation",
						"Full style calculation on new element",
						"No recalc — element already has computed styles",
					],
					[
						"Memory allocation",
						"GC pressure from repeated alloc/dealloc",
						"Fixed pool of row nodes — GC cost is ~zero",
					],
					["Time cost (per row)", "~2–5ms", "~0.1ms"],
				]}
			/>
		</FeatureCard>,

		/* ─── SECTION 3: The Full Scroll Cycle Explained ────────────────────── */
		<h3 key="cycle-title" className="text-xl font-bold mt-12 mb-6">
			The Full Scroll Cycle — What Happens On Every Frame
		</h3>,
		<Card key="cycle-card">
			<div className="space-y-4">
				<Step index={1}>
					<strong>User drags scrollbar.</strong> The browser updates <code>scrollTop</code> on the outer scroll
					container. The tall spacer div causes the native scrollbar to reflect the full dataset height accurately.
				</Step>
				<Step index={2}>
					<strong>Scroll event fires.</strong> AG Grid's debounced rAF-wrapped listener is scheduled for the next paint
					frame. No DOM work happens yet — no jank.
				</Step>
				<Step index={3}>
					<strong>requestAnimationFrame fires.</strong> AG Grid reads <code>scrollTop</code>, calculates{" "}
					<code>firstVisibleRowIndex = Math.floor(scrollTop / rowHeight)</code> and the full window of rows to display
					including the buffer.
				</Step>
				<Step index={4}>
					<strong>Diff against current DOM pool.</strong> AG Grid compares which row indexes the current ~40 DOM nodes
					are bound to against which indexes they should be bound to. Any row nodes that are now outside the buffer
					range are flagged for recycling.
				</Step>
				<Step index={5}>
					<strong>Data rebinding.</strong> Each recycled row node has its cell content updated — text nodes, cell
					renderers, class names — to reflect the new row's data. This is pure JS property assignment, no DOM creation.
				</Step>
				<Step index={6}>
					<strong>CSS transform update.</strong> Each row node's <code>transform: translateY(Xpx)</code> is updated to
					place it at the correct vertical position. The GPU compositor handles the actual visual repositioning — off
					the main thread.
				</Step>
				<Step index={7}>
					<strong>Browser paints.</strong> The compositor composites the repositioned, freshly-data-bound row layers
					onto the screen. Because <code>transform</code> is a compositor-only property, many of these updates don't
					even require a full paint — just a composite.
				</Step>
			</div>
		</Card>,

		/* ─── SECTION 4: The Browser Search Problem — The Honest Truth ─────── */
		<h3 key="search-title" className="text-xl font-bold mt-12 mb-4">
			The Browser Ctrl+F Problem — The Honest Answer
		</h3>,
		<Callout
			key="search-warning"
			type="warning"
			title="Ctrl+F still only searches the DOM — AG Grid did NOT solve this"
		>
			Native browser <strong>Find in Page (Ctrl+F)</strong> can only find text nodes that are physically present in the
			DOM. Since AG Grid only maintains ~30–50 row DOM nodes out of 10,000, Ctrl+F will only find text in those visible
			rows. AG Grid does <em>not</em> magically fix this limitation — no virtual scroll library can.
		</Callout>,
		<p key="search-sub" className="mb-6">
			What AG Grid provides instead are two purpose-built alternatives that satisfy the same user need far better than a
			browser search bar ever could:
		</p>,
		<Grid key="search-grid" cols={2} gap={6} className="mb-4">
			<FeatureCard
				icon={ListFilter}
				title="Quick Filter"
				subtitle="Ctrl+F replacement across all loaded rows"
				theme="teal"
			>
				<p className="text-sm text-teal-200/80 mb-3">
					Quick Filter operates on AG Grid's <strong className="text-teal-300">internal data model</strong>, not the
					DOM. When the user types, AG Grid runs the search across all 10,000 JavaScript row objects in memory and
					filters the visible set. Zero DOM limitation.
				</p>
				<CodeBlock
					title="Quick Filter implementation"
					language="typescript"
					theme="teal"
					code={`// Wire up a search input to AG Grid's Quick Filter
const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  gridRef.current!.api.setGridOption(
    'quickFilterText',
    e.target.value
  );
};

// The grid will instantly filter ALL 10,000 rows — not just visible ones
return (
  <>
    <input onChange={onSearch} placeholder="Search all rows..." />
    <AgGridReact ref={gridRef} rowData={data} ... />
  </>
);`}
				/>
			</FeatureCard>
			<FeatureCard
				icon={SearchCheck}
				title="AG Grid Find API"
				subtitle="Highlight and navigate matches"
				theme="cyan"
			>
				<p className="text-sm text-cyan-200/80 mb-3">
					AG Grid's built-in <strong className="text-cyan-300">Find</strong> feature provides the exact UX of Ctrl+F —
					highlight matched cells, navigate with "next/previous" — but it operates on the data model. When you
					navigate to a match in row 8,432, AG Grid scrolls the virtualizer to that row and recycles necessary DOM
					nodes to bring it into view.
				</p>
				<CodeBlock
					title="AG Grid Find API"
					language="typescript"
					theme="cyan"
					code={`// Set the search term
gridRef.current!.api.setGridOption('findSearchValue', 'apple');

// Navigate between matches
gridRef.current!.api.findNext();
gridRef.current!.api.findPrevious();

// Jump to a specific match index
gridRef.current!.api.findGoTo(42);`}
				/>
				<p className="text-xs text-cyan-200/60 mt-3 border-t border-cyan-700/50 pt-2">
					Note: The Find API is available in AG Grid Community and Enterprise. It is compatible with the{" "}
					<strong className="text-cyan-300">Client-Side Row Model</strong> (all data loaded in memory).
				</p>
			</FeatureCard>
		</Grid>,
		<Callout key="suppress-callout" type="info" title="suppressRowVirtualisation — The Nuclear Option">
			AG Grid does offer <code>suppressRowVirtualisation: true</code>, which forces ALL rows into the DOM simultaneously
			— making native Ctrl+F work. This is documented but explicitly flagged as suitable only for very small datasets.
			For 10,000 rows it will freeze the browser on initial render and make scrolling unusable.{" "}
			<strong>Do not use this in production for large datasets.</strong>
		</Callout>,

		/* ─── SECTION 5: Column Virtualization ─────────────────────────────── */
		<h3 key="col-title" className="text-xl font-bold mt-12 mb-4">
			Bonus: Column Virtualization — The Other Dimension
		</h3>,
		<p key="col-sub" className="mb-6">
			AG Grid applies the exact same recycling architecture horizontally. If your grid has 200 columns but only 10 fit
			in the viewport, AG Grid only renders DOM cells for those 10 visible columns. Scrolling right recycles column cell
			nodes just like row virtualization recycles row nodes.
		</p>,
		<Table
			key="col-table"
			headers={["Scenario", "DOM cell nodes without AG Grid", "DOM cell nodes with AG Grid"]}
			rows={[
				["10,000 rows × 5 cols", "50,000 cell nodes", "~200 cell nodes (visible rows × cols)"],
				["10,000 rows × 50 cols", "500,000 cell nodes", "~500 cell nodes (visible rows × visible cols)"],
				["10,000 rows × 200 cols", "2,000,000 cell nodes", "~600 cell nodes — still just what's visible"],
			]}
		/>,

		/* ─── SECTION 6: AG Grid vs react-virtual comparison ───────────────── */
		<h3 key="compare-title" className="text-xl font-bold mt-12 mb-4">
			AG Grid vs @tanstack/react-virtual — What Actually Differs
		</h3>,
		<Table
			key="compare-table"
			headers={["Feature", "@tanstack/react-virtual", "AG Grid Client-Side Model"]}
			rows={[
				["DOM virtualization", "Yes", "Yes"],
				["Row buffer / overscan", "Yes (configurable)", "Yes (rowBuffer, default 10)"],
				["CSS transform positioning", "Yes", "Yes, with GPU compositing"],
				["rAF-based scroll sync", "Depends on implementation", "Built-in, automatic"],
				["Row recycling (node reuse)", "Creates/destroys nodes", "Full node pool recycling"],
				["Synthetic scroll container", "Uses native scroll directly", "Custom fake scroll + spacer"],
				["Column virtualization", "Not included", "Built-in, horizontal too"],
				["Native browser Ctrl+F", "Only visible rows", "Only visible rows"],
				["Built-in search (data model)", "Not included", "Quick Filter + Find API"],
				["Bundle size", "~12KB", "~300KB+ (Community)"],
				["Customization effort", "Full control", "Configuration-based"],
			]}
		/>,
		<Callout key="conclude-callout" type="tip" title="When to reach for AG Grid vs a lightweight virtualizer">
			If you only need performant row virtualization with a simple design, <code>@tanstack/react-virtual</code> is the
			right tool — small, flexible, composable. Reach for AG Grid when you need the <strong>full package</strong>:
			built-in sort, filter, grouping, column pinning, resizing, built-in Find, Excel export, and a grid that absorbs
			thousands of edge cases so you don't have to. The scroll "magic" is just one part of why the library is ~300KB.
		</Callout>,

		/* ─── SECTION 7: Common Mistakes ────────────────────────────────────── */
		<h3 key="mistakes-title" className="text-xl font-bold mt-12 mb-6">
			Common AG Grid Performance Mistakes
		</h3>,
		<MistakeCard
			key="m1"
			number={1}
			title="Complex Cell Renderers killing scroll performance"
			problem="Even though only ~40 rows are in the DOM, those rows get recycled rapidly during fast scrolling. If each cell renderer runs a heavy computation or renders a complex React subtree on mount, the recycling cost per row skyrockets and you get exactly the jank AG Grid is designed to prevent."
			solution={
				<>
					Use <code>deferRender: true</code> on expensive cell renderers. For cells displaying large amounts of computed
					data, memoize the computation. Keep cell renderers simple — if you need complex UI, consider rendering it in a
					row detail panel that only opens on click.
				</>
			}
		/>,
		<MistakeCard
			key="m2"
			number={2}
			title="Calling rowData setState on every keystroke with 10k rows"
			problem="Developer wires a search input to setState which replaces the entire rowData array on every keystroke. AG Grid has to diff 10,000 row objects, destroy and reassign all row nodes, and re-virtualize the entire grid. This tanks performance on mid-range hardware."
			solution={
				<>
					Use AG Grid's built-in <code>setGridOption('quickFilterText', value)</code> for search. This filters the
					internal row model without touching React state or triggering a grid reset. For external data updates, use the
					Grid API's <code>applyTransaction()</code> for incremental updates instead of replacing the full array.
				</>
			}
		/>,
		<MistakeCard
			key="m3"
			number={3}
			title="Expecting suppressRowVirtualisation to work for large datasets"
			problem="Client or QA requires native Ctrl+F search. Developer sets suppressRowVirtualisation: true. Grid renders 10,000 DOM nodes simultaneously. Browser freezes for 15 seconds on load. Scrolling drops to 5fps. Client is unhappy in a new direction."
			solution="Implement AG Grid's Quick Filter or Find API as a UX replacement for Ctrl+F. These search across all rows in the data model — not the DOM — making them faster and more reliable than browser search anyway. The client's underlying need (finding a row) is better served by these APIs than by native browser search."
		/>,
	],
};
