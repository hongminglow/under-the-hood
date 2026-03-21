import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const cssInJsVsUtilityTopic: Topic = {
  id: "css-in-js-vs-utility",
  title: "CSS-in-JS vs Utility CSS",
  description:
    "Why the React ecosystem abandoned runtime Styled Components for zero-cost build-time Tailwind generation.",
  tags: ["frontend", "architecture", "css"],
  icon: "Paintbrush",
  content: [
    <p key="1">
      The "CSS Wars" are a battle over <strong>Execution Time</strong>. The choice between utility-first (Tailwind) and runtime-injection (Styled Components) determines whether your styles are generated on the developer's laptop or the user's phone.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Performance Divide
    </h3>,
    <Table
      key="3"
      headers={["Feature", "Runtime CSS-in-JS (Emotion/Styled)", "Utility-First (Tailwind/UnoCSS)"]}
      rows={[
        ["Generation", "In the browser during component render.", "At <strong>Build-time</strong> via static analysis."],
        ["Payload", "Javascript bundle contains style logic.", "Static <code>.css</code> file (highly cacheable)."],
        ["RSC Support", "<strong>Fail</strong> (cannot inject tags on server).", "<strong>Pass</strong> (standard CSS works perfectly)."],
        ["Specificity", "Generated unique class names.", "Flattened <strong>Atomic CSS</strong> classes."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Engine: Atomic CSS
    </h3>,
    <p key="5" className="mb-4">
      Tailwind's secret is <strong>Atomic CSS</strong>. Instead of writing a <code>.button</code> class with 10 properties, it generates 10 single-purpose classes (<code>p-4</code>, <code>bg-blue</code>, etc.). This means your CSS bundle size doesn't grow linearly with your app; it hits a "plateau" once most common utilities are used.
    </p>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="Runtime Style Injection">
        <p className="text-sm text-muted-foreground mb-2">
          Styled Components use a <strong>StyleSheet Manager</strong>.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Every time a prop changes (e.g., <code>color={"{props.color}"}</code>), the library must re-hash the style and inject a new <code>&lt;style&gt;</code> tag, triggering a browser <strong>Recalculate Style</strong> event.
        </p>
      </Card>
      <Card title="Static Extraction (Zero-Runtime)">
        <p className="text-sm text-muted-foreground mb-2">
          Libraries like <strong>Vanilla Extract</strong> or <strong>Panda CSS</strong>.
        </p>
        <p className="text-xs italic text-muted-foreground">
          They offer the "Object-style" DX of CSS-in-JS but use a compiler to "Extract" them into standard CSS files during build. Best of both worlds.
        </p>
      </Card>
    </Grid>,
    <Callout key="7" type="warning" title="Specificity Issues">
      Utility CSS relies on the order of classes in the generated <code>.css</code> file, not the order in your <code>className</code> string. This is why <strong>Tailwind Merge</strong> is essential for component libraries to ensure that child overrides actually "win" the specificity battle.
    </Callout>,
  ],
};
