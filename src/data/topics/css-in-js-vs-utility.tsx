import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FileCode2, Palette, Braces, Wand2 } from "lucide-react";

export const cssInJsVsUtilityTopic: Topic = {
  id: "css-in-js-vs-utility",
  title: "Modern CSS Architectures",
  description:
    "A deep dive into the evolution of styling: SCSS, Inline Styles, CSS-in-JS, and Utility CSS (Tailwind).",
  tags: ["frontend", "architecture", "css", "tailwind", "scss"],
  icon: "Paintbrush",
  content: [
    <p key="1">
      The "CSS Wars" have raged for over a decade. Frontend developers constantly debate the best way to write, scope, and scale styles. The choice of CSS architecture drastically impacts your application's execution time, bundle size, and developer experience.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Four Pillars of Styling
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <FeatureCard icon={FileCode2} title="SCSS / SASS" subtitle="The preprocessors" theme="teal">
        <p className="text-sm text-teal-200/80 mb-2">
          Adding superpowers to traditional CSS.
        </p>
        <p className="text-xs italic text-teal-100/70">
          <strong>Sass</strong> started as an indentation-based syntax, while <strong>SCSS</strong> (Sassy CSS) is an extension of standard CSS using brackets. They allow variables, nesting, and mixins. Great for traditional websites, but global name-spacing often leads to "append-only stylesheets" where nobody deletes old code for fear of breaking things.
        </p>
      </FeatureCard>
      <FeatureCard icon={Palette} title="Inline Styles" subtitle="Styles attached directly to elements" theme="amber">
        <p className="text-sm text-amber-200/80 mb-2">
          <code>style={"{{ color: 'red' }}"}</code> injected directly into HTML.
        </p>
        <p className="text-xs italic text-amber-100/70">
          Highly dynamic but lacks fundamental CSS features like media queries, keyframe animations, and pseudo-classes (e.g., <code>:hover</code>). It is impossible to cache inline styles effectively, making it poor for large-scale web architectures.
        </p>
      </FeatureCard>
      <FeatureCard icon={Braces} title="CSS-in-JS" subtitle="Styled Components, Emotion" theme="violet">
        <p className="text-sm text-violet-200/80 mb-2">
          Generating styles at runtime via Javascript.
        </p>
        <p className="text-xs italic text-violet-100/70">
          Loved for perfectly scoping styles to components and easily accepting React props for dynamic styling. However, compiling CSS in the browser adds <strong>Runtime Overhead</strong> and completely breaks inside modern Server-Side Rendering patterns like React Server Components (RSC).
        </p>
      </FeatureCard>
      <FeatureCard icon={Wand2} title="Utility-First" subtitle="Tailwind CSS" theme="emerald">
        <p className="text-sm text-emerald-200/80 mb-2">
          Predefined atomic classes (<code>p-4</code>, <code>bg-blue-500</code>).
        </p>
        <p className="text-xs italic text-emerald-100/70">
          Currently the industry favorite. It shifts styling from runtime to <strong>Build-time</strong> via static analysis. It eliminates naming fatigue, prevents CSS bloat (the bundle stops growing once common utilities are used), and is highly cacheable. The tradeoff? "Ugly" HTML files filled with massive class strings.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Head-to-Head Comparison
    </h3>,
    <Table
      key="5"
      headers={["Architecture", "Performance", "RSC Compatibility", "Scalability (Large Teams)"]}
      rows={[
        ["SCSS / CSS Modules", "Fast (Static File)", "Yes (Extracted to .css)", "Medium (Naming conflicts usually avoided with Modules)"],
        ["Inline Styles", "Slow (DOM Bloat)", "Yes", "Poor (No responsive design natively)"],
        ["CSS-in-JS (Runtime)", "Slowest (JS execution)", "No (Needs context/DOM)", "High (Perfect component isolation)"],
        ["Utility CSS (Tailwind)", "Fastest (Atomic extraction)", "Yes (Zero runtime args)", "Highest (No context-switching, consistent design tokens)"]
      ]}
    />,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      When To Use Which?
    </h3>,
    <p key="7" className="mb-4">
      The consensus among modern developers heavily leans towards <strong>Utility-first (Tailwind CSS)</strong> paired with component libraries like Shadcn/ui or Headless UI. Here are some general recommendations:
    </p>,
    <ul key="8" className="list-disc pl-5 text-sm text-muted-foreground space-y-2 mb-8">
      <li><strong>Choose Tailwind CSS</strong> if you are building a modern React/Next.js application, want excellent performance, and want to avoid writing custom CSS classes entirely.</li>
      <li><strong>Choose SCSS / CSS Modules</strong> if you are migrating a legacy codebase, building an embeddable widget, or if your team strongly prefers separation of concerns (HTML vs CSS).</li>
      <li><strong>Choose Zero-Runtime CSS-in-JS (Vanilla Extract / Panda CSS)</strong> if you love the developer experience of Styled Components but need the performance and Server Component compatibility of static CSS.</li>
    </ul>,
    <Callout key="9" type="warning" title="The Tailwind Specificity Trap">
      Utility CSS relies on the order of classes in the generated <code>.css</code> file, not the order in your <code>className</code> string. Overriding a <code>p-4</code> with a <code>p-8</code> conditionally requires utility mergers like <strong>tailwind-merge</strong> to ensure the new class mathematically wins the specificity battle.
    </Callout>,
  ],
};
