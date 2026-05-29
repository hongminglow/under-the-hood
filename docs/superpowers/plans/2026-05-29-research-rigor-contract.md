# Research Rigor Contract — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Research Rigor Contract to `SKILL.md` and ship a new `<SourceMarker>` UI component that AI agents use to ground spec/RFC/version/vendor claims inline.

**Architecture:** One new React component (`SourceMarker`) is added to the UI library and barrel-exported. `SKILL.md` receives a new top-level section (`## 🔬 Research Rigor Contract`) inserted between `## Outcome Expectations` and `## 🚨 Common Technical Pitfalls & Reminders`, plus a one-line cross-reference pointer added to the existing `### 5. Pre-Delivery Styling Audit` and one new import entry in the existing component checklist.

**Tech Stack:** React 19, TypeScript, Tailwind v4, Vite — no test framework. Verification is `pnpm run build`.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/components/ui/SourceMarker.tsx` | The new inline chip component |
| Modify | `src/components/ui/index.ts` | Barrel-export `SourceMarker` |
| Modify | `SKILL.md` | Insert Research Rigor Contract section |
| Modify | `SKILL.md` | Add cross-reference pointer + import entry |

---

## Task 1: Create the `<SourceMarker>` component

**Files:**
- Create: `src/components/ui/SourceMarker.tsx`

- [ ] **Step 1: Create the component file**

Create `src/components/ui/SourceMarker.tsx` with this exact content:

```tsx
import React from "react";
import { cn } from "../../utils/utils";

interface SourceMarkerProps {
  spec?: string;
  version?: string;
  year?: number;
  vendor?: string;
  className?: string;
}

export function SourceMarker({ spec, version, year, vendor, className }: SourceMarkerProps) {
  const label = spec ?? version ?? vendor ?? (year !== undefined ? `as of ${year}` : "");

  if (!label) return null;

  return (
    <span
      className={cn(
        "inline-block px-1.5 py-0.5 rounded border font-mono text-[11px] font-normal tracking-tight align-middle",
        "bg-slate-500/10 text-slate-400 border-slate-500/20",
        className,
      )}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 2: Export from the barrel index**

Open `src/components/ui/index.ts`. It currently ends with:

```ts
export { FeatureCard } from "./FeatureCard";
```

Append one line so the file becomes:

```ts
// Barrel export for all UI components
export { Callout } from "./Callout";
export { Card } from "./Card";
export { CodeBlock } from "./CodeBlock";
export { Flow } from "./Flow";
export { GlobalSearch } from "./GlobalSearch";
export { Grid } from "./Grid";
export { Highlight } from "./Highlight";
export { MistakeCard } from "./MistakeCard";
export { Step } from "./Step";
export { Table } from "./Table";
export { FeatureCard } from "./FeatureCard";
export { SourceMarker } from "./SourceMarker";
```

- [ ] **Step 3: Verify the build passes**

```bash
pnpm run build
```

Expected: build completes with no TypeScript or Vite errors. If you see a type error on `SourceMarkerProps`, confirm the interface is exported correctly and that `utils` path resolves (same pattern as `Highlight.tsx`).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SourceMarker.tsx src/components/ui/index.ts
git commit -m "feat: add SourceMarker UI component for inline spec/version citations"
```

---

## Task 2: Insert the Research Rigor Contract section into `SKILL.md`

**Files:**
- Modify: `SKILL.md` (lines 287–296 region — between `## Outcome Expectations` and `## 🚨 Common Technical Pitfalls`)

The current text at the insertion point looks like this (do not change anything before or after this block — only replace the `---` separator):

```
- All interactive items MUST have `cursor-pointer`.

---

## 🚨 Common Technical Pitfalls & Reminders
```

Replace that exact block with the following (the new section goes between the two separators):

```
- All interactive items MUST have `cursor-pointer`.

---

## 🔬 Research Rigor Contract

This contract applies to **all new topics and active edits**. It runs alongside the visual audit. A topic is not done if any applicable floor is unmet — even if the build passes and components look correct.

### The Five Hard Floors

**Floor 1 — Comparison Axis Floor**
Every actor-driven page with 3+ recurring named paradigms (REST/GraphQL/gRPC, Scrum/Kanban/Waterfall, React/Vue/Angular) MUST include a dedicated comparison-axes `<Table>` covering at minimum: when to pick this, how it fails, and latency/cost/operational characteristics. Quality bar: a senior engineer can defend a technology choice in a design review after skimming the page.

**Floor 2 — Source Grounding Floor**
Every concrete spec, protocol, or version-sensitive claim MUST be one of:
- Marked with `<SourceMarker spec="RFC 9114" />`, `<SourceMarker version="TLS 1.3" />`, `<SourceMarker year={2024} />`, or `<SourceMarker vendor="Stripe Docs" />`
- Carrying an inline freshness qualifier ("post-React 19", "as of HTTP/3")
- Removed if it cannot be grounded

Concrete numbers without context get the same treatment ("p99 ~50ms on a standard cloud LB" beats "fast").

**Floor 3 — Why-It-Matters Floor**
Every major section MUST answer why a working engineer would care. No purely definitional sections. Every section must either end with a "what breaks if you ignore this" consequence, or contain a `<Callout type="tip">` framing the practical impact.

**Floor 4 — War Story / Awareness Floor**
Every actor-driven and mechanism-driven topic MUST include at least one concrete failure scenario — specific, not generic. "Be careful with X" does not satisfy this floor. The scenario must name a consequence: data loss, latency spike, security exposure, or cost blowout.

**Awareness-inherent exemption:** Topics whose primary purpose is raising awareness about attack vectors, vulnerability classes, or encoding/hashing pitfalls (XSS, CSRF, SQLi, bcrypt vs SHA-256, etc.) satisfy this floor through a concrete attack scenario with measurable consequence. No named production incident required. The gate question is: *"Does a reader leave with calibrated intuition about what failure looks like?"* If yes, the floor is satisfied.

**Floor 5 — Decision-Frame Floor**
Every topic that compares ≥ 2 options MUST end with (or contain) a "How to pick" section translating the article into a concrete decision. Acceptable forms: `<FeatureCard>` set, `<MistakeCard>` pattern, or decision `<Table>`.

---

### Page-Type Depth Contracts

These extend the existing Page Shape classifier with required depth dimensions. They are quality bars with judgment, not mechanical checklists.

**Actor-Driven Page** (e.g. REST/GraphQL/gRPC, Scrum/Kanban/Waterfall, React/Vue/Angular)

Required depth: introduce actors with theme map → per-actor strengths and failure modes → cross-actor comparison axes Table (when-to-pick, how-it-fails, operational cost) → concrete failure scenario per Floor 4 → "How to pick" decision frame per Floor 5. Quality bar: a senior engineer can defend a technology choice in a design review after skimming.

**Mechanism-Driven Page** (e.g. TLS handshake, Event Loop, Rendering Pipeline, Raft leader election)

Required depth: the problem the mechanism solves — before the mechanism itself → phase-by-phase breakdown using `<Flow>` or `<Step>` → at least one "what actually breaks in production" section (concrete: latency spikes, connection drops, OOM — not abstract warnings) → performance/latency characteristics with `<SourceMarker>` where numbers are cited. Quality bar: reader understands what breaks first under load and why.

**Diagnostic Page** (e.g. N+1 Query Problem, MVCC Deadlocks, Race Conditions)

Required depth: symptom before cause — readers recognise symptoms, not root causes → `<MistakeCard>` pattern for each failure mode → measurable consequence for each failure (latency, cost, data loss) → fix with concrete before/after. Quality bar: the article is useful at 2am during an incident.

**Reference / Comparison Page** (e.g. Database Choices at Scale, HTTP/1-3, Docker vs K8s)

Required depth: purpose matrix Table upfront — not buried mid-article → "When to use each" block using decision-tree or `<FeatureCard>` set → known gotchas column in every comparison Table. Quality bar: a reader opening the page to settle a specific question finds the answer in under 30 seconds.

---

### `<SourceMarker>` Component

For marking spec/RFC/version/year/vendor-grounded claims inline. Renders as a subtle monospace chip — metadata, not emphasis. Dimmer than `<Highlight>`.

**Props:**

| Prop | Type | Renders as |
|---|---|---|
| `spec` | `string` | e.g. `"RFC 9114"` |
| `version` | `string` | e.g. `"TLS 1.3"` |
| `year` | `number` | e.g. `"as of 2024"` |
| `vendor` | `string` | e.g. `"Stripe Docs"` |

**Usage rule (hard):** Use `<SourceMarker>` only for claims that can be fact-checked against a primary source — RFC numbers, version-sensitive behaviour, cited benchmarks, vendor-specific facts. Do NOT use for general architectural reasoning or prose.

---

### Pre-Delivery Content Audit

Run in the same pass as the Pre-Delivery Styling Audit (see above). Six questions — fix inline, then proceed.

1. **Floors met?** — For each of the five floors that applies to this page type, confirm it is satisfied. If a floor is exempt (e.g. war-story floor on a pure reference page), note the reason — do not skip silently.

2. **Dead definitions?** — Any section that only defines what something *is* without explaining what breaks if you ignore it? Add a "why it matters" consequence line, or cut the section.

3. **Naked numbers?** — Any concrete number (latency, throughput, limit, percentage, cost) without a `<SourceMarker>` or contextualising qualifier? Add the marker, soften to a relative comparison, or remove the number.

4. **Generic warnings?** — Any "be careful with X" or "this can cause problems" without a concrete failure scenario? Make it concrete with a named consequence, or cut it.

5. **Decision frame present?** — Does the topic end with (or contain) a section translating knowledge into a decision the reader can make? If no, add one before marking done.

6. **Component-content alignment?** — Every themed `<FeatureCard>` actually contains that actor's content (not generic prose coloured to match). Every comparison `<Table>` has at least one "failure mode" or "when not to use" column or row. *(This bridges into the Pre-Delivery Styling Audit — both audits end at the same point.)*

---

## 🚨 Common Technical Pitfalls & Reminders
```

- [ ] **Step 1: Open `SKILL.md` and verify the exact text at the insertion point**

Read `SKILL.md` lines 287–296. Confirm the text reads exactly:

```
- All interactive items MUST have `cursor-pointer`.

---

## 🚨 Common Technical Pitfalls & Reminders
```

If the line numbers differ slightly (e.g. file was edited), locate the block by searching for `All interactive items MUST have`. The insertion always goes between that block and `## 🚨 Common Technical Pitfalls`.

- [ ] **Step 2: Apply the edit**

Using a string-replace edit on `SKILL.md`, replace:

```
- All interactive items MUST have `cursor-pointer`.

---

## 🚨 Common Technical Pitfalls & Reminders
```

With the full block shown above (starting with `- All interactive items MUST have` and ending with `## 🚨 Common Technical Pitfalls & Reminders`).

- [ ] **Step 3: Verify the section landed in the right place**

Read `SKILL.md` around the new section. Confirm:
- `## 🔬 Research Rigor Contract` appears after `## Outcome Expectations`
- `## 🚨 Common Technical Pitfalls & Reminders` still follows immediately after the new section
- No existing content was deleted

- [ ] **Step 4: Commit**

```bash
git add SKILL.md
git commit -m "docs: insert Research Rigor Contract section into SKILL.md"
```

---

## Task 3: Add cross-reference pointer and `<SourceMarker>` import entry to `SKILL.md`

**Files:**
- Modify: `SKILL.md` — two small additions in the existing `### 5. Pre-Delivery Styling Audit` section and the import checklist

### Step A — Cross-reference pointer in Pre-Delivery Styling Audit

- [ ] **Step 1: Locate the existing audit section**

Find this exact block in `SKILL.md` (the last line of `### 5. Pre-Delivery Styling Audit`):

```
- `pnpm run build` or the project-equivalent verification passes before final response.
```

- [ ] **Step 2: Apply the edit**

Replace:

```
- `pnpm run build` or the project-equivalent verification passes before final response.
```

With:

```
- `pnpm run build` or the project-equivalent verification passes before final response.
- Run the Research Rigor Content Audit (§ Research Rigor Contract) in the same pass.
```

### Step B — `<SourceMarker>` entry in the import checklist

- [ ] **Step 3: Locate the import checklist**

Find this exact block in `SKILL.md`:

```
<FeatureCard>   → import { FeatureCard } from "@/components/ui/FeatureCard";
```

- [ ] **Step 4: Apply the edit**

Replace:

```
<FeatureCard>   → import { FeatureCard } from "@/components/ui/FeatureCard";
```

With:

```
<FeatureCard>   → import { FeatureCard } from "@/components/ui/FeatureCard";
<SourceMarker>  → import { SourceMarker } from "@/components/ui/SourceMarker";
```

- [ ] **Step 5: Verify both additions landed correctly**

Read the two affected areas. Confirm:
- The audit section ends with the new cross-reference line
- The import checklist now has `<SourceMarker>` as the last entry

- [ ] **Step 6: Commit**

```bash
git add SKILL.md
git commit -m "docs: add SourceMarker import entry and content audit cross-reference to SKILL.md"
```

---

## Task 4: Final build verification

- [ ] **Step 1: Run the build**

```bash
pnpm run build
```

Expected output: TypeScript compile succeeds, Vite bundles with no errors. Typical successful output ends with lines like:
```
✓ built in X.XXs
```

- [ ] **Step 2: If build fails**

Common failure modes:
- `Cannot find module '../../utils/utils'` in `SourceMarker.tsx` → verify the relative path matches `Highlight.tsx` exactly (same directory level)
- `Module '"@/components/ui"' has no exported member 'SourceMarker'` → confirm the export was added to `src/components/ui/index.ts`
- SKILL.md is plain markdown, not compiled — if the build fails, it is not the SKILL.md edits

- [ ] **Step 3: Commit if a fix was needed**

```bash
git add src/components/ui/SourceMarker.tsx src/components/ui/index.ts
git commit -m "fix: correct import path in SourceMarker component"
```

If no fix was needed, no commit required — Task 1 already captured the component.
