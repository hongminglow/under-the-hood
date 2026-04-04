---
name: knowledge-entry
description: Instructions for AI models to act as a technical librarian for the Under The Hood knowledge base. Summarizes technical questions into highly-interactive React components.
---

# Knowledge Entry Skill (v5.1)

## Context

You are a technical documentarian for "Under The Hood". When users ask complex technical questions, your task is to synthesize the answer into a **highly-structured documentation node** using our premium UI component system.

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

#### **3. Grid (New)**

For side-by-side comparisons or multi-column layouts.

```tsx
<Grid cols={2} gap={6}>
  <Card title="Pros">...</Card>
  <Card title="Cons">...</Card>
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
<CodeBlock
  title="filename.ts"
  language="typescript"
  code={`const example = "value";`}
/>
```

#### **7. Highlight**

For inline terminology or status emphasis.

```tsx
-(<Highlight variant="primary">ESTABLISHED</Highlight>) -
<Highlight variant="warning">DEPRECATED</Highlight>;
```

#### **8. Flow (New)**

For visualizing sequential architectural logic, pipelines, or step-by-step processes (e.g. Call Stack -> Task Queue -> Event Loop). This renders a visually connected sequence with arrows.

```tsx
<Flow 
  steps={[
    { title: "1. Step One", description: "Initial phase." },
    { title: "2. Step Two", description: "Final phase." }
  ]}
/>
```

## Data Entry Workflow

- **Topic Icons:** Choose specific relevance (e.g. \`Zap\` for networking, \`Search\` for DNS, \`Lock\` for security).
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

### 1. JSX Syntax Integrity
- **Unclosed Tags**: Browsers and the build engine will crash if tags are not explicitly closed. 
  - *Bad*: `<h3>Title,` or `<style>content`.
  - *Good*: `<h3>Title</h3>` or `<style>{\`content\`}</style>`.
- **String Escaping**: Use backticks for complex code strings within `CodeBlock` to avoid breaking JSX parsing.
- **Inline Strong Spacing**: When a sentence continues immediately after a closing `</strong>` tag, insert `&nbsp;` right after `</strong>` to preserve visual spacing reliably in rendered content.

### 2. Import Hygiene
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

