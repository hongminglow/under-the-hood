import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const webAccessibilityTopic: Topic = {
  id: "web-accessibility",
  title: "Web Accessibility (a11y)",
  description:
    "Building websites that work for everyone — screen readers, keyboard navigation, and the legal requirements you can't ignore.",
  tags: ["frontend", "a11y", "html", "best-practices"],
  icon: "Accessibility",
  content: [
    <p key="1">
      <strong>1 in 4 adults</strong> in the US has a disability. If your website
      doesn't work with screen readers, keyboard navigation, or assistive
      technologies, you're excluding <strong>25% of potential users</strong> —
      and in many countries, you're breaking the law (ADA, EAA, WCAG
      compliance).
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The POUR Principles (WCAG 2.2)
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Perceivable">
        <p className="text-sm">
          All content must be perceivable regardless of ability. Images need{" "}
          <strong>alt text</strong>. Videos need <strong>captions</strong>.
          Color alone cannot convey meaning (red error + icon + text).
        </p>
      </Card>
      <Card title="Operable">
        <p className="text-sm">
          Everything must work with <strong>keyboard only</strong>. No mouse
          traps. Interactive elements must have visible{" "}
          <strong>focus indicators</strong>. Animations respect{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </Card>
      <Card title="Understandable">
        <p className="text-sm">
          Labels, error messages, and navigation must be{" "}
          <strong>clear and predictable</strong>. Set <code>lang="en"</code> on
          HTML. Error messages must explain <em>what went wrong</em> and{" "}
          <em>how to fix it</em>.
        </p>
      </Card>
      <Card title="Robust">
        <p className="text-sm">
          Use <strong>semantic HTML</strong> that works across all assistive
          technologies. <code>&lt;button&gt;</code> not{" "}
          <code>&lt;div onClick&gt;</code>. <code>&lt;nav&gt;</code>,{" "}
          <code>&lt;main&gt;</code>, <code>&lt;aside&gt;</code> for landmark
          regions.
        </p>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["Common Mistake", "Impact", "Fix"]}
      rows={[
        [
          "<div onClick>",
          "Not focusable, no keyboard support",
          "Use <button> or add role='button' + tabindex",
        ],
        [
          "Missing alt on <img>",
          "Screen reader says 'image' with no context",
          "Add descriptive alt text or alt='' for decorative",
        ],
        [
          "Low contrast text",
          "Unreadable for low-vision users",
          "Minimum 4.5:1 contrast ratio (WCAG AA)",
        ],
        [
          "No focus styles",
          "Keyboard users can't see where they are",
          "Never remove outline without replacement",
        ],
        [
          "Form inputs without labels",
          "Screen reader can't identify the field",
          "Use <label htmlFor> or aria-label",
        ],
      ]}
    />,
    <Callout key="5" type="tip" title="Quick Audit Trick">
      Unplug your mouse and try to use your website with{" "}
      <strong>keyboard only</strong> (Tab, Enter, Escape, Arrow keys). If you
      get stuck, can't see focus, or can't interact with something — your site
      has critical a11y issues. Also run{" "}
      <strong>Lighthouse Accessibility audit</strong> in Chrome DevTools for
      instant automated checks.
    </Callout>,
  ],
};
