import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Box, MoveDiagonal } from "lucide-react";

export const cssBoxModelTopic: Topic = {
  id: "css-box-model",
  title: "CSS Box Model & Layout",
  description:
    "Understanding the fundamental geometry engine that calculates the physical size and position of every HTML element.",
  tags: ["frontend", "css"],
  icon: "Box",
  content: [
    <p key="1">
      The <strong>CSS Box Model</strong> is the fundamental geometry engine of the web. Every element on a page is a rectangular box, and how that box calculates its final width and height determines if your layout remains stable or shatters.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Four Layers of Geometry
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Box} title="Content, Padding, & Border" subtitle="The box itself" theme="teal">
        <p className="text-sm text-teal-200/80 mb-2">
          The <strong>Content</strong> is your text/image. <strong>Padding</strong> is the inner breathing room. The <strong>Border</strong> is the physical shell.
        </p>
        <p className="text-sm text-teal-100/75">
          In the legacy <code>content-box</code> model, adding 20px of padding to a 100px div makes it 140px wide. This is why grids often break.
        </p>
      </FeatureCard>
      <FeatureCard icon={MoveDiagonal} title="The Margin" subtitle="Outer layout flow" theme="cyan">
        <p className="text-sm text-cyan-200/80 mb-2">
          <strong>Margin</strong> is the outer space between boxes. It does not affect the box's own size, but it pushes neighbors away.
        </p>
        <p className="text-sm text-cyan-100/75">
          Note: Vertical margins often <strong>Collapse</strong>, meaning two 20px margins between elements results in a 20px gap, not 40px.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Box-Sizing: The Industry Standard
    </h3>,
    <Table
      key="5"
      headers={["Property", "Calculation", "Outcome"]}
      rows={[
        [
          "content-box (Default)",
          "Width + Padding + Border",
          "Adding a border increases the element's size. Hard to manage in fluid layouts."
        ],
        [
          "border-box",
          "Width = (Content + Padding + Border)",
          "The padding and border are subtracted from the content width. Layout stays stable."
        ]
      ]}
    />,
    <Callout key="6" type="tip" title="The Universal Global Border-Box">
      Almost every modern CSS reset (Tailwind, Reset.css) starts with: <code>*, *::before, *::after &#123; box-sizing: border-box; &#125;</code>. This ensures that a 25% width column stays exactly 25% regardless of how much padding you add.
    </Callout>,
  ],
};
