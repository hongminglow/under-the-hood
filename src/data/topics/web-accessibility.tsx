import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Focus, Tags } from "lucide-react";

export const webAccessibilityTopic: Topic = {
  id: "web-accessibility",
  title: "Web Accessibility (a11y)",
  description:
    "How to build apps for visually impaired users without getting sued, using semantic HTML.",
  tags: ["frontend", "accessibility"],
  icon: "User",
  content: [
    <p key="1">
      <strong>Web Accessibility (A11y)</strong> is not just about blind users. It ensures that people with situational, temporary, or permanent disabilities (including motor or cognitive impairments) can perceive, understand, and navigate the web.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Accessibility Tree vs. The DOM
    </h3>,
    <p key="3" className="mb-4">
      Browsers maintain a secondary structure called the <strong>Accessibility Tree</strong>. While the DOM is for rendering, the Accessibility Tree is for Assistive Technologies (AT). If you use a <code>&lt;div&gt;</code> instead of a <code>&lt;button&gt;</code>, the node exists in the DOM but lacks the "Actionable" role in the Accessibility Tree.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Tags} title="WAI-ARIA Roles" subtitle="Patch the tree only when native HTML cannot" theme="cyan">
        <p className="text-cyan-100/80">
          When native HTML is not enough, such as a complex <strong className="text-cyan-300">combobox</strong>, use
          <code>role="combobox"</code> and <code>aria-expanded</code> to manually update the Accessibility Tree.
        </p>
      </FeatureCard>
      <FeatureCard icon={Focus} title="Focus Management" subtitle="Keyboard users need a controlled route" theme="emerald">
        <p className="text-red-100/80">
          When a modal opens, you must <strong className="text-red-300">trap focus</strong> inside it. If the user hits
          <code>Tab</code>, they should not accidentally reach a hidden button in the background.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      WCAG Guidelines: Color & Contrast
    </h3>,
    <p key="6" className="mb-4">
      The <strong>Web Content Accessibility Guidelines (WCAG)</strong> define technical standards for contrast.
    </p>,
    <Table
      key="7"
      headers={["Level", "Contrast Ratio", "Requirement"]}
      rows={[
        ["AA (Standard)", "4.5:1", "Minimum for normal text. Essential for middle-aged users and low-vision."],
        ["AAA (Enhanced)", "7:1", "The gold standard. Essential for people with significant vision loss."],
        ["Non-text", "3:1", "Minimum for icons, buttons, and state indicators (like focus rings)."]
      ]}
    />,
    <Callout key="8" type="tip" title="Semantic HTML First">
      ARIA is a "poly-fill" for poor HTML. Rule #1 of ARIA: <strong>If you can use a native HTML element instead of a role, do it.</strong> A <code>&lt;nav&gt;</code> is always superior to a <code>&lt;div role="navigation"&gt;</code>.
    </Callout>,
  ],
};
