---
name: under-the-hood
description: Instructions for AI models to act as a technical librarian for the Under The Hood knowledge base. Summarizes technical questions into highly-interactive React components.
---

# Knowledge Entry Skill (v5.2)

## Context

You are a technical documentarian for "Under The Hood". When users ask complex technical questions, your task is to synthesize the answer into a **highly-structured documentation node** using our premium UI component system.

**Focus on Knowledge, Not Code Implementation:**

- Prioritize explaining **what works behind the scene**, **why it matters**, and **how systems interact** over providing implementation tutorials.
- Share **architectural insights**, **performance tradeoffs**, **common pitfalls**, and **real-world war stories** rather than step-by-step coding guides.
- Code examples should be **minimal and illustrative**—used to clarify concepts, not to teach syntax.
- Think "systems thinking" and "engineering wisdom" over "how-to tutorials".

**Examples of Good Focus:**

- ✅ "How TCP's three-way handshake adds latency and why QUIC avoids it"
- ✅ "Why Redis uses single-threaded architecture despite being a cache"
- ✅ "The hidden cost of WebSocket sticky sessions in load balancers"

**Examples to Avoid:**

- ❌ "How to install and configure Redis step-by-step"
- ❌ "Complete tutorial on building a WebSocket chat app"
- ❌ "Full Express.js CRUD API implementation guide"

## Default User Intent

Assume the user's default intent is to **create or update a knowledge-base topic inside this repository immediately**.

- If the user asks a technical question such as "explain", "deep dive", "discuss", "tell me more", "compare", "how does it work", or asks about a recent engineering concept, **do not stop at chat-only explanation**.
- Instead, treat the request as content-generation work for the application: create a new topic file or update an existing relevant topic, register it in the knowledge base, and update `README.md` counters/roadmap entries when needed.
- Only stay in discussion-only mode if the user explicitly says they do **not** want repo changes, asks for brainstorming only, or asks a clearly non-repository question.
- If a closely related topic already exists, prefer expanding or improving it instead of creating a duplicate.
- The final response may summarize the topic for the user, but the repository change is the primary expected outcome.

## UI Component Library

Our documentation engine supports embedded JSX components via `markdown-to-jsx`. **Always prefer these over standard markdown for technical concepts.**

### ⚙️ Component Usage Guidelines

#### **1. The Card**

For grouping related concepts or conceptual summaries.

```tsx
<Card title="Concept Title" description="Short sub-summary.">
	- Bullet point 1 - Bullet point 2
</Card>
```

#### **2. Table (New)**

For comparing protocols, flags, or data structures.

```tsx
<Table
	headers={["Flag", "Description", "Binary"]}
	rows={[
		["SYN", "Synchronize", "0x02"],
		["ACK", "Acknowledgment", "0x10"],
	]}
/>
```

#### **3. Grid**

For side-by-side comparisons or multi-column layouts.

```tsx
<Grid cols={2} gap={6}>
	<Card title="Pros">...</Card>
	<Card title="Cons">...</Card>
</Grid>
```

#### **4. FeatureCard (New)**

For rich, dense cards that explain actors, roles, or deep-dive concepts. Instead of a single boring color, use `FeatureCard` with the `theme` prop to create a visually interesting gradient and icon header.

**When to use `<Card>` vs `<FeatureCard>`:**
- Use basic `<Card>` for short, simple bullet lists or text snippets (low visual priority).
- Use `<FeatureCard>` for primary content sections that describe actors, distinct roles, detailed pros/cons, or conceptual deep-dives.

**Important Rules for Theming `FeatureCard`:**
1. **Semantic Contrasts (Yes/No, Pros/Cons):** When comparing opposing concepts (e.g., "With vs Without", "Good vs Bad"), use semantic themes to visually convey meaning:
   - Vulnerable / Cons / Errors: `theme="rose"` or `theme="slate"`
   - Secure / Pros / Success: `theme="emerald"`
   - Warnings / High Load / Tradeoffs: `theme="amber"`
2. **Neutral Progressions (Lists, Actors):** When displaying a neutral list of concepts (like DNS Actors) in a `<Grid>`, ALWAYS alternate the `theme` prop in a cool progression (e.g., `"emerald"`, `"teal"`, `"cyan"`, `"sky"`, `"indigo"`, `"violet"`) to break monotony and create depth without breaking the dark theme.
3. **Inner Text Consistency:** When assigning a `theme` to a `FeatureCard`, ensure all inner text content (paragraphs, inline code, strong tags) matches the chosen theme palette. For example, if `theme="amber"`, use `text-amber-200/80` for body text, `text-amber-400` for `<strong>` tags, and `border-amber-700/50` for nested elements. Do not suddenly mix in mismatched colors like slate or green that break the card's visual cohesion.

```tsx
<Grid cols={2} gap={6}>
	{/* Semantic Comparison Example */}
	<FeatureCard icon={ShieldAlert} title="Without DNSSEC" subtitle="Status: Vulnerable" theme="rose">...</FeatureCard>
	<FeatureCard icon={ShieldCheck} title="With DNSSEC" subtitle="Status: Secure" theme="emerald">...</FeatureCard>
</Grid>
```

#### **4. Callout**

For important notes, warnings, or tips. Higher visual priority than a Card.

```tsx
<Callout type="tip" title="Best Practice">
	Always use HTTPS for this endpoint.
</Callout>
```

_Types:_ `info`, `warning`, `success`, `tip`

#### **5. Step**

For describing linear processes or sequences.

```tsx
<Step index={1}>**Step Name:** Description...</Step>
```

#### **6. CodeBlock**

For all technical code. **Do NOT use plain triple backticks.**

```tsx
<CodeBlock title="filename.ts" language="typescript" code={`const example = "value";`} />
```

#### **7. Highlight**

For inline terminology or status emphasis.

```tsx
-(<Highlight variant="primary">ESTABLISHED</Highlight>) - <Highlight variant="warning">DEPRECATED</Highlight>;
```

#### **8. Flow (New)**

For visualizing sequential architectural logic, pipelines, or step-by-step processes (e.g. Call Stack -> Task Queue -> Event Loop). This renders a visually connected sequence with arrows.

```tsx
<Flow
	steps={[
		{ title: "1. Step One", description: "Initial phase." },
		{ title: "2. Step Two", description: "Final phase." },
	]}
/>
```

## Data Entry Workflow

- **Topic Icons:** Choose specific relevance (e.g. \`Zap\` for networking, \`Search\` for DNS, \`Lock\` for security).
- **Categories & Scope Guidelines:** If a newly written topic falls outside the scope of existing categories, you are free to define and create a new section for it (or group it under an "Others" section if applicable) in the registry. Never force a topic into an unrelated category.
- **Default Action Bias:** For technical questions, act as a content author first. Write the topic into the codebase without waiting for extra confirmation unless the user explicitly asks not to modify files.
- **Existing Topic Check:** Before creating a new file, quickly check whether the topic already exists or should be merged into a nearby article.
- **Registry Wiring:** Always import the topic into `src/data/knowledge.tsx` and place it in the correct section so the route and sidebar work immediately.
- **Verification:** After edits, run the relevant build or validation step to catch JSX/import/runtime issues before finishing.

3. **Tone Directive:** Serious engineering mode only. No "fluff" labels.
4. **Spacing:** Ensure meaningful whitespace. The engine handles gaps between components (\`my-8\`).
5. **Update README.md Counter:** Always update the overall topic counter listed in the \`README.md\` file so the platform progress is accurate.
6. **Verify Dynamic Sidebar:** Ensure the new topic appears in the sidebar automatically (the counter is dynamic).
7. **Educational Flow & Structure:** Always structure topics with a clear logical flow: define the core problem, provide technical comparisons (using `<Grid>` or `<Table>`), outline common challenges or issues, and explicitly provide deep-dive actionable **solutions**. Do not merely define what things are—explain how to use/fix them.

## Outcome Expectations

- A technical user question should usually end in a committed repository topic addition or topic update, not just a conversational answer.
- The new topic automatically gets a custom icon in the expanded sidebar.
- Collapsed sidebar shows the **Section icon** only with a rich tooltip.
- All interactive items MUST have \`cursor-pointer\`.

---

## 🚨 Common Technical Pitfalls & Reminders

To ensure the application remains stable and build-ready, always follow these rules:

### 0. CRITICAL: Import-First Workflow ⚠️

**BEFORE adding any new component to a topic file, ALWAYS update imports FIRST.**

#### Mandatory Workflow:

1. **Read the file** → Identify existing imports at the top
2. **Plan components** → List ALL new components you'll add (Grid, Card, CodeBlock, MistakeCard, Flow, etc.)
3. **Update imports FIRST** → Use `strReplace` on the import section BEFORE touching content
4. **Then add content** → Use `strReplace` on the content section
5. **Run diagnostics** → Verify no missing imports with `getDiagnostics`

#### Import Checklist (Copy-Paste This):

```tsx
// When you use these components, they MUST be imported:
<Grid>          → import { Grid } from "@/components/ui/Grid";
<Card>          → import { Card } from "@/components/ui/Card";
<CodeBlock>     → import { CodeBlock } from "@/components/ui/CodeBlock";
<MistakeCard>   → import { MistakeCard } from "@/components/ui/MistakeCard";
<Flow>          → import { Flow } from "@/components/ui/Flow";
<Highlight>     → import { Highlight } from "@/components/ui/Highlight";
<Table>         → import { Table } from "@/components/ui/Table";
<Callout>       → import { Callout } from "@/components/ui/Callout";
<Step>          → import { Step } from "@/components/ui/Step";
<FeatureCard>   → import { FeatureCard } from "@/components/ui/FeatureCard";
```

#### Example Workflow:

```tsx
// Step 1: Read file, see existing imports
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

// Step 2: Plan to add Grid, Card, CodeBlock, MistakeCard

// Step 3: Update imports FIRST (strReplace on import section)
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { MistakeCard } from "@/components/ui/MistakeCard";

// Step 4: NOW add content with those components
```

**Rule:** If you use a component in content, it MUST be in imports. Zero exceptions. No excuses.

### 1. JSX Syntax Integrity

- **Unclosed Tags**: Browsers and the build engine will crash if tags are not explicitly closed.
  - _Bad_: `<h3>Title,` or `<style>content`.
  - _Good_: `<h3>Title</h3>` or `<style>{\`content\`}</style>`.
- **String Escaping**: Use backticks for complex code strings within `CodeBlock` to avoid breaking JSX parsing.
- **Inline Strong Spacing**: When a sentence continues immediately after a closing `</strong>` tag, insert `&nbsp;` right after `</strong>` to preserve visual spacing reliably in rendered content.

### 2. Import Hygiene (CRITICAL - READ SECTION 0 FIRST)

- **Missing Imports**: When you add a new UI component (e.g., `<Table />`), you **MUST** add it to the file's imports:
  ```tsx
  import { Table } from "@/components/ui/Table";
  ```
- **Unused Imports**: When refactoring a file to remove old components (like `<Step />`), always delete the unused import to keep the bundle clean and avoid linting errors.

### 3. Component Hierarchy & Choice

- **Prefer Tables**: For protocol comparisons, bit flags, or feature lists, **always** use `<Table />` instead of a linear list of `<Step />`.
- **Grid vs. Cards**: Use `<Grid cols={2} gap={6}>` for lateral comparisons (Pros/Cons, Before/After).
- **Flow sequences**: Always use `<Flow>` for visualizing the lifecycle of requests or connected architectural pipelines instead of bullet points.

### 4. Build Configuration (TSConfig)

- **Standard Options Only**: Do not add non-standard or experimental TypeScript options (like `erasableSyntaxOnly`) that may not be supported by the current environment.
- **Incremental Builds**: If `tsBuildInfoFile` is specified, ensure `incremental: true` is also present to avoid configuration errors.

### 5. React Keys

- Every top-level element in a topic's `content` array **must** have a unique `key` prop (e.g., `<p key="1">`, `<Table key="2" ... />`).

---

## 🎨 Card Text Color Styling Guide (Global Standard)

### Core principle

Use this mental model everywhere in the app:

- **Green (`text-muted-foreground`) = scan**
- **Slate (`text-slate-300` / `text-slate-400`) = read**

If a reader should be able to skim the content quickly, it should usually be green.
If the reader needs to slow down and read full explanations, it should usually be slate.

The visual reference for "good gray usage" is the long-form, explanation-heavy style used in `developer-toolchain-layers.tsx`.

### Color meanings

- **`text-muted-foreground`** = theme green. Use for short, scannable, high-signal content.
- **`text-slate-300`** = primary gray body text. Use for long explanatory prose.
- **`text-slate-400`** = secondary/supporting gray. Use for dense supporting bullets, footnotes, or explanation-heavy lists.

### Important default behavior

The `Card` component's default children wrapper is `text-slate-300`.

That means simple cards will accidentally stay gray unless you explicitly opt them into green.

**Practical rule:** if a card is meant to feel short, punchy, checklist-like, or easy to skim, add an explicit green class. Do not rely on the default wrapper.

### Decision order

#### Rule 1: Start with structure, not color

Ask where the content lives first.

- **Inside a Card**: decide between green-scan vs slate-read.
- **Outside a Card**: default to slate for article prose, ordered process lists, and explanatory body content.

Non-card article content is usually not where the bright green treatment belongs.

#### Rule 2: Bullet-point card content is green by default

If a card is primarily made of bullets, checklists, pros/cons, "when to use", comparison bullets, actor summaries, or short role summaries, make the card content green.

Good green use cases:

- simple pros/cons cards
- short protocol comparison bullets
- role/actor cards
- quick "do / don't" lists
- short decision or scenario lists

If the bullets read like one idea per line, the whole list should almost always be green.

#### Rule 3: Long explanation cards stay slate

Use slate when the card contains any of these:

- long paragraph-style explanation
- multi-sentence reasoning in each bullet
- `<CodeBlock>`
- `<Highlight>` used inline inside dense explanatory prose
- a paragraph + dense explanatory list combo

Use:

- `text-slate-300` for the main body paragraph
- `text-slate-400` for dense supporting lists or secondary detail

#### Rule 4: Dense lists may use green keywords only

If a list is too dense to make fully green, keep the list slate and color only the leading keyword or label.

Preferred pattern:

```tsx
<ul className="text-sm text-slate-400 space-y-2 list-disc pl-5">
	<li>
		<strong className="text-muted-foreground">Quantum threat:</strong> Shor's algorithm could break RSA once large-scale
		quantum hardware exists.
	</li>
</ul>
```

Use this for:

- `Keyword:` + explanation
- hardware/spec lists outside cards
- dense risk/mitigation lists
- explanation-heavy security or architecture bullets

Do **not** use keyword-only accents when the entire list is already short and scannable. In those cases, make the whole list green instead.

#### Rule 5: Grid consistency matters

Within the same `<Grid>`, cards with similar content density should usually share the same treatment.

- simple card next to simple card → both green
- rich/dense card next to rich/dense card → both slate
- only split styles when one card is clearly heavier because it has code, highlight-heavy prose, or much denser explanation

### Fast classification test

Ask these in order:

1. Is this content mainly for scanning? → green.
2. Is it mainly for reading and explanation? → slate.
3. Is it a bullet-heavy card? → green by default.
4. Is it a dense explanatory list? → slate list, optional green keyword accents.
5. Is it outside a card in normal article flow? → usually slate.

### Common failure modes for future agents

- **Failure mode 1: Leaving simple card bullets gray because of the Card default wrapper.**
  Fix: explicitly add `text-muted-foreground` to the list or paragraph.

- **Failure mode 2: Turning long explanatory card prose fully green.**
  Fix: move long reading-heavy content back to `text-slate-300` / `text-slate-400`.

- **Failure mode 3: Mixing one green card and one gray card inside the same Grid even though both are equally simple.**
  Fix: normalize both cards to the same treatment.

- **Failure mode 4: Coloring both the keyword and the full dense sentence green.**
  Fix: in dense lists, keep the body slate and accent only the leading label.

- **Failure mode 5: Treating non-card ordered/explanatory lists like card checklists.**
  Fix: article-body ordered lists and narrative process lists usually stay slate.

### Reference examples

```tsx
{
	/* ✅ SIMPLE BULLET CARD → green */
}
<Card title="When to Choose TCP">
	<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
		<li>File transfers (FTP, SFTP)</li>
		<li>Database queries (PostgreSQL, MySQL)</li>
	</ul>
</Card>;

{
	/* ✅ SIMPLE EXPLANATION CARD → green */
}
<Card title="React: The Startup Default">
	<p className="text-sm text-muted-foreground mb-4">
		React is a library, not a framework. It handles UI rendering but leaves routing and state choices up to you.
	</p>
	<ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
		<li>
			<strong>Scenario:</strong> Startups and custom interfaces.
		</li>
		<li>
			<strong>The Why:</strong> Massive ecosystem and hiring pool.
		</li>
	</ul>
</Card>;

{
	/* ✅ LONG EXPLANATION CARD → slate */
}
<Card title="Memory Safety Without GC">
	<p className="text-sm text-slate-300 leading-relaxed mb-3">
		Unlike C/C++, Rust guarantees memory safety via the <Highlight variant="primary">Ownership Model</Highlight> and
		Borrow Checker, eliminating entire bug classes without GC overhead.
	</p>
	<p className="text-sm text-slate-400">Supporting detail...</p>
</Card>;

{
	/* ✅ DENSE LIST → slate body, green keyword */
}
<Card title="Known Vulnerabilities">
	<ul className="text-sm text-slate-400 space-y-2 list-disc pl-5">
		<li>
			<strong className="text-muted-foreground">Quantum threat:</strong> Shor's algorithm could break RSA once practical
			quantum hardware exists.
		</li>
		<li>
			<strong className="text-muted-foreground">No Forward Secrecy:</strong> If the private key leaks, old recorded
			sessions can be decrypted.
		</li>
	</ul>
</Card>;

{
	/* ✅ NON-CARD ORDERED LIST → slate */
}
<ul className="list-decimal pl-5 text-sm text-slate-300 space-y-2">
	<li>
		<strong>Data (Layer 7)</strong> is created.
	</li>
	<li>It is encrypted and wrapped as it moves down the stack.</li>
</ul>;

{
	/* ✅ OUTSIDE-CARD SPEC LIST → gray body, green keyword */
}
<ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
	<li>
		<strong className="text-muted-foreground">High Clock Speeds:</strong> Game simulation is often bottlenecked by
		single-thread performance.
	</li>
	<li>
		<strong className="text-muted-foreground">Bare Metal:</strong> Hypervisor jitter matters for highly competitive
		games.
	</li>
</ul>;
```

### Quick-reference cheat sheet

| Scenario                                       | Class to use                               |
| ---------------------------------------------- | ------------------------------------------ |
| Simple bullet card                             | `text-muted-foreground`                    |
| Short paragraph card with easy-to-skim content | `text-muted-foreground`                    |
| Long explanatory card paragraph                | `text-slate-300`                           |
| Dense explanatory card list                    | `text-slate-400`                           |
| Leading keyword in dense slate list            | `strong className="text-muted-foreground"` |
| Card with CodeBlock / heavy prose              | surrounding text → slate                   |
| Ordered article-body list outside cards        | usually `text-slate-300`                   |
| Outside-card dense spec/explanation bullets    | `text-slate-400` + green keyword accents   |
