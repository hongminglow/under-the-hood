# Research Rigor Contract — Design Spec
**Date:** 2026-05-29
**Status:** Approved
**Scope:** Additive enhancement to `SKILL.md` — new top-level section only. No existing sections modified except one cross-reference pointer in the Polishing Decision Framework.

---

## Problem Statement

`SKILL.md` enforces *how topics look* with surgical precision (component system, theming rules, colour contracts). It under-specifies *how deep the thinking must be*. The result: visual quality is consistently high, research depth depends on whether the AI is having a good day. For a platform that claims 159 "thoroughly-researched paradigms," this is the primary quality lever left untouched.

**Five specific gaps identified:**
1. No comparison-axis contract — actor-driven pages can drift into vibes
2. No source/evidence discipline — numbers and spec claims go uncited
3. No "why it matters" enforcement — definitional sections escape undetected
4. No war-story requirement — generic warnings replace concrete failure modes
5. No decision-frame requirement — knowledge that doesn't end in a decision rarely sticks

---

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Target dimension | Research depth & rigor | Biggest unlocked quality lever |
| Enforcement style | Hybrid: hard floors + flexible ceilings | Mirrors existing visual rules pattern |
| Citation visibility | Visible for spec/version claims only | Best signal-to-noise; articles stay clean |
| Rollout scope | New topics & active edits only | Avoids 159-topic backfill; pragmatic |
| Component for citations | New `<SourceMarker>` component | Semantically explicit; future-tooling-friendly |
| Packaging | New top-level section in SKILL.md | Discoverable; mirrors Polishing Decision Framework pattern |

---

## What Gets Added to SKILL.md

### Placement

New section: `## 🔬 Research Rigor Contract`
Inserted **between** `## Outcome Expectations` and `## 🚨 Common Technical Pitfalls & Reminders`.

One cross-reference line added inside the existing `### 5. Pre-Delivery Styling Audit`:
> "Run the Research Rigor Content Audit (§ Research Rigor Contract) in the same pass."

One new import entry added to the existing component import checklist:
```
<SourceMarker> → import { SourceMarker } from "@/components/ui/SourceMarker";
```

---

### Section 1 — The Five Hard Floors

Non-negotiable gates. A topic is not done if any applicable floor is unmet, even if the build passes and components look correct.

**Floor 1 — Comparison Axis Floor**
Every actor-driven page with 3+ recurring named paradigms (REST/GraphQL/gRPC, Scrum/Kanban/Waterfall, React/Vue/Angular, etc.) MUST include a dedicated comparison-axes `<Table>` covering at minimum:
- When to pick this option
- How it fails
- Latency / cost / operational characteristics

Quality bar: a senior engineer skimming the page can defend a technology choice in a design review.

**Floor 2 — Source Grounding Floor**
Every concrete spec, protocol, or version-sensitive claim MUST be one of:
- Marked with `<SourceMarker spec="RFC 9114" />`, `<SourceMarker version="TLS 1.3" />`, `<SourceMarker year={2024} />`, or `<SourceMarker vendor="Stripe Docs" />`
- Carrying an inline freshness qualifier ("post-React 19", "as of HTTP/3")
- Removed if it cannot be grounded

Concrete numbers without context get the same treatment ("p99 ~50ms on a standard cloud LB" beats "fast").

**Floor 3 — Why-It-Matters Floor**
Every major section MUST answer why a working engineer would care. No purely definitional sections. Gate: does every section either end with a "what breaks if you ignore this" consequence, or contain a `<Callout type="tip">` framing the practical impact?

**Floor 4 — War Story / Awareness Floor**
Every actor-driven and mechanism-driven topic MUST include at least one concrete failure scenario — specific, not generic. "Be careful with X" does not satisfy this floor. The scenario must name a consequence (data loss, latency spike, security exposure, cost blowout).

**Awareness-inherent exemption:** Topics whose primary purpose is raising awareness about attack vectors, vulnerability classes, or encoding/hashing pitfalls (XSS, CSRF, SQLi, bcrypt vs SHA-256, etc.) satisfy this floor through a concrete attack scenario with measurable consequence. No named production incident required. The gate question is: *"Does a reader leave with calibrated intuition about what failure looks like?"* If yes, the floor is satisfied.

**Floor 5 — Decision-Frame Floor**
Every topic that compares ≥ 2 options MUST end with (or contain) a "How to pick" section that translates the article into a concrete decision the reader can make. Acceptable forms: `<FeatureCard>` set, `<MistakeCard>` pattern, or decision `<Table>`. Knowledge that doesn't end in a decision rarely sticks.

---

### Section 2 — Page-Type Depth Contracts

These extend the existing Page Shape classifier (actor-driven, mechanism-driven, diagnostic, reference/comparison) with required depth dimensions. They are quality bars with judgment, not mechanical checklists.

**Actor-Driven Page**
Required depth progression:
1. Introduce actors with assigned theme map
2. Per-actor strengths and failure modes
3. Cross-actor comparison axes Table (when-to-pick, how-it-fails, operational cost)
4. Concrete failure scenario per Floor 4
5. "How to pick" decision frame per Floor 5

Quality bar: a senior engineer can defend a technology choice in a design review after skimming.

**Mechanism-Driven Page**
(TLS handshake, Event Loop, Rendering Pipeline, Raft leader election, etc.)

Required depth progression:
1. The problem the mechanism solves — before the mechanism itself
2. Phase-by-phase breakdown using `<Flow>` or `<Step>`
3. At least one "what actually breaks in production" section (concrete: latency spikes, connection drops, OOM — not abstract warnings)
4. Performance/latency characteristics with `<SourceMarker>` where numbers are cited

Quality bar: reader understands what breaks first under load and why.

**Diagnostic Page**
(N+1 Query Problem, MVCC Deadlocks, Race Conditions, etc.)

Required depth progression:
1. Symptom before cause — readers recognise symptoms, not root causes
2. `<MistakeCard>` pattern for each failure mode
3. Measurable consequence for each failure (latency, cost, data loss)
4. Fix with concrete before/after

Quality bar: the article is useful at 2am during an incident.

**Reference / Comparison Page**
(Database Choices at Scale, HTTP/1-3, Docker vs K8s, etc.)

Required depth progression:
1. Purpose matrix Table upfront — not buried mid-article
2. "When to use each" block using decision-tree or `<FeatureCard>` set
3. Known gotchas column in every comparison Table

Quality bar: a reader opening the page to settle a specific question finds the answer in under 30 seconds.

---

### Section 3 — `<SourceMarker>` Component

**Purpose:** Inline chip that signals a claim is grounded in a specific spec, RFC, version, or year. Metadata, not emphasis — dimmer than `<Highlight variant="primary">`.

**Props (v1):**

| Prop | Type | Example |
|---|---|---|
| `spec` | string | `spec="RFC 9114"` |
| `version` | string | `version="TLS 1.3"` |
| `year` | number | `year={2024}` |
| `vendor` | string | `vendor="Stripe Docs"` |

No `href` in v1 — clickable citations risk dead links everywhere. Can be added in a future iteration once a reference linking strategy is in place.

**Visual contract:**
- Inline chip, same family as `<Highlight>` but smaller and lower-contrast
- Does not break reading rhythm in prose
- Dimmer than any card accent — it is metadata, not a call to action

**Usage rule (hard):**
> Use `<SourceMarker>` for protocol specs (RFC numbers), version-sensitive claims (TLS 1.3, HTTP/3, React 19), cited numbers/benchmarks, and vendor-specific behaviour. Do NOT use it for general architectural reasoning or prose. Only where the claim can be fact-checked against a primary source.

**Import rule (added to existing import checklist):**
```tsx
<SourceMarker> → import { SourceMarker } from "@/components/ui/SourceMarker";
```

---

### Section 4 — Pre-Delivery Content Audit

Runs in the same mental pass as the existing Pre-Delivery Styling Audit. Not a separate step — parallel interrogation at the same moment.

**The six questions:**

1. **Floors met?**
   Run through the Five Hard Floors. For each floor that applies to this page type, confirm it is satisfied. If a floor doesn't apply (e.g. war-story floor on a pure reference page), note the exemption reason — do not skip silently.

2. **Dead definitions?**
   Is there any section that only defines what something *is* without explaining what breaks if you ignore it? If yes: add a "why it matters" consequence line, or cut the section.

3. **Naked numbers?**
   Any concrete number (latency, throughput, limit, percentage, cost) without a `<SourceMarker>` or contextualising qualifier? If yes: add the marker, soften to a relative comparison, or remove the number.

4. **Generic warnings?**
   Any "be careful with X" or "this can cause problems" without a concrete failure scenario? If yes: make it concrete with a named consequence, or cut it.

5. **Decision frame present?**
   Does the topic end with (or contain) a section translating knowledge into a decision the reader can make? If no: add one before marking done.

6. **Component-content alignment?**
   - Every themed `<FeatureCard>` actually contains that actor's content (not generic prose that was coloured to match).
   - Every comparison `<Table>` has at least one "failure mode" or "when not to use" column or row.
   *(This bridges the content audit into the existing styling audit — they end at the same point.)*

---

## What Does NOT Change

- Every existing section of SKILL.md is preserved verbatim
- The UI component library (9 existing components + 1 new `<SourceMarker>`)
- The theming system and colour contracts
- The Topic Polishing Decision Framework
- The Card Text Color Styling Guide
- The Common Technical Pitfalls section
- The rollout is additive only — no existing topics are flagged for rewrite

---

## Implementation Steps (for writing-plans)

1. **Build `<SourceMarker>` component** — `src/components/ui/SourceMarker.tsx` + export from `src/components/ui/index.ts`
2. **Write the Research Rigor Contract section** — insert into `SKILL.md` at the specified placement
3. **Add cross-reference pointer** — one line added to existing `### 5. Pre-Delivery Styling Audit`
4. **Add import entry** — append `<SourceMarker>` to the existing component import checklist in `SKILL.md`
5. **Verify build** — `pnpm run build` must pass

No topic file modifications required as part of this change.
