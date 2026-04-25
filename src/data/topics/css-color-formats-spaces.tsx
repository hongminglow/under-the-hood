import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import {
  Eye,
  Hash,
  Monitor,
  Palette,
  Pipette,
  SlidersHorizontal,
} from "lucide-react";

export const cssColorFormatsSpacesTopic: Topic = {
  id: "css-color-formats-spaces",
  title: "CSS Color Formats & Spaces",
  description:
    "When to use hex, rgb/rgba, hsl, hwb, lab/lch, oklch, and color() — and why modern design systems are moving away from old sRGB-only thinking.",
  tags: ["css", "frontend", "design-systems", "color", "ui"],
  icon: "Palette",
  content: [
    <p key="1">
      CSS gives you many ways to write a color, but they are{" "}
      <strong>not just stylistic aliases</strong>. Some formats are good for
      fixed literal values, some are better for hue-based tweaking, and some are
      built for perceptual consistency on modern displays. The right question is
      not "which syntax looks nicest," but{" "}
      <strong>what kind of color work are you doing?</strong>
    </p>,

    <h3 key="2" className="text-xl font-bold mt-12 mb-4">
      The Quick Mental Model
    </h3>,
    <Grid key="3" cols={2} gap={6} className="mb-10 items-stretch">
      <FeatureCard
        icon={Hash}
        title="Hex"
        subtitle="compact literal color tokens"
        theme="amber"
      >
        <p className="text-sm text-amber-100/80 leading-relaxed mb-3">
          Great for <strong className="text-amber-300">fixed values</strong>{" "}
          copied from design tools, brand constants, and simple tokens like{" "}
          <code>#0f172a</code> or <code>#38bdf8</code>.
        </p>
        <p className="text-sm text-amber-100/70">
          Weakness: terrible for human reasoning. You cannot glance at hex and
          intuit hue, lightness, or how to generate a better hover state.
        </p>
      </FeatureCard>

      <FeatureCard
        icon={SlidersHorizontal}
        title="rgb() / rgba()"
        subtitle="direct channel control + alpha"
        theme="cyan"
      >
        <p className="text-sm text-cyan-100/80 leading-relaxed mb-3">
          Best when you need explicit{" "}
          <strong className="text-cyan-300">red / green / blue channels</strong>
          , interop with canvas or JS APIs, or easy alpha overlays.
        </p>
        <p className="text-sm text-cyan-100/70">
          Modern CSS usually writes alpha as <code>rgb(59 130 246 / 0.5)</code>.
          The older
          <code>rgba()</code> spelling still works, but it is mostly a legacy
          alias now.
        </p>
      </FeatureCard>

      <FeatureCard
        icon={Palette}
        title="hsl()"
        subtitle="human-friendly hue editing"
        theme="sky"
      >
        <p className="text-sm text-sky-100/80 leading-relaxed mb-3">
          Great for quick theme work when you want to think in{" "}
          <strong className="text-sky-300">
            hue, saturation, and lightness
          </strong>
          . It is far easier to shift a blue toward teal or desaturate a warning
          color in HSL than in raw RGB.
        </p>
        <p className="text-sm text-sky-100/70">
          Weakness: HSL lightness is not perceptual lightness. Equal-looking
          steps across hues often do not stay visually balanced.
        </p>
      </FeatureCard>

      <FeatureCard
        icon={Pipette}
        title="lch() / lab()"
        subtitle="older perceptual color spaces"
        theme="fuchsia"
      >
        <p className="text-sm text-fuchsia-100/80 leading-relaxed mb-3">
          These were designed to be more{" "}
          <strong className="text-fuchsia-300">perceptually uniform</strong>
          &nbsp; than sRGB formats like hex or HSL. They are useful when color
          distance and more stable lightness matter.
        </p>
        <p className="text-sm text-fuchsia-100/70">
          In modern frontend work they are valuable conceptually, but many teams
          now skip directly to OKLab/OKLCH because the newer model behaves
          better.
        </p>
      </FeatureCard>

      <FeatureCard
        icon={Eye}
        title="oklch() / oklab()"
        subtitle="modern perceptual design tokens"
        theme="violet"
      >
        <p className="text-sm text-violet-100/80 leading-relaxed mb-3">
          This is the current sweet spot for{" "}
          <strong className="text-violet-300">
            design systems, palette generation, and accessible scaling
          </strong>
          . You can change hue or lightness with more confidence that the
          perceived brightness stays stable.
        </p>
        <p className="text-sm text-violet-100/70">
          That is why modern tooling has moved toward OKLCH for tokens: it is
          much better for making ramps that feel evenly spaced to human eyes.
        </p>
      </FeatureCard>

      <FeatureCard
        icon={Monitor}
        title="color()"
        subtitle="explicit color spaces and wide gamut"
        theme="orange"
      >
        <p className="text-sm text-orange-100/80 leading-relaxed mb-3">
          Use <code>color()</code> when you need to specify the{" "}
          <strong className="text-orange-300">actual color space</strong>, such
          as <code>srgb</code> or <code>display-p3</code>.
        </p>
        <p className="text-sm text-orange-100/70">
          It matters most for high-fidelity visual work and modern displays. For
          everyday app styling, it is usually more than you need.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="4" className="text-xl font-bold mt-12 mb-4">
      Head-to-Head Comparison
    </h3>,
    <Table
      key="5"
      headers={["Format", "Think In", "Best Use", "Main Caveat"]}
      rows={[
        [
          "<span class='text-amber-200/85 font-semibold'>Hex</span>",
          "Literal encoded value",
          "Fixed design tokens, quick copy/paste from design handoff",
          "Poor for human editing and programmatic color reasoning",
        ],
        [
          "<span class='text-cyan-200/85 font-semibold'>rgb() / rgba()</span>",
          "Red, green, blue channels + alpha",
          "JS/canvas interop, overlays, explicit channel math",
          "Not intuitive for hue-based tweaking",
        ],
        [
          "<span class='text-sky-200/85 font-semibold'>hsl()</span>",
          "Hue, saturation, lightness",
          "Theme work, quick palette experiments, hue shifts",
          "Equal numeric changes do not produce equal perceived changes",
        ],
        [
          "<span class='text-indigo-200/85 font-semibold'>hwb()</span>",
          "Hue + whiteness + blackness",
          "Niche quick tint/shade adjustments",
          "Less common in real-world design systems and team codebases",
        ],
        [
          "<span class='text-fuchsia-200/85 font-semibold'>lab() / lch()</span>",
          "Perceptual lightness and color distance",
          "More perceptual work than HSL, color math, advanced palettes",
          "Less ergonomic and often replaced by OKLCH today",
        ],
        [
          "<span class='text-violet-200/85 font-semibold'>oklab() / oklch()</span>",
          "Modern perceptual lightness, chroma, hue",
          "Design tokens, ramps, accessible palette systems, modern UI foundations",
          "Still more advanced than what many teams are used to",
        ],
        [
          "<span class='text-orange-200/85 font-semibold'>color()</span>",
          "Explicit chosen color space",
          "Wide-gamut work, display-p3, precise color-space control",
          "Too low-level for everyday app theming unless you truly need it",
        ],
      ]}
    />,

    <h3 key="6" className="text-xl font-bold mt-12 mb-4">
      The Same Blue in Different Syntaxes
    </h3>,
    <CodeBlock
      key="7"
      title="colors.css"
      language="css"
      code={`/* Fixed literal */
--brand-hex: #3b82f6;

/* Channel-based */
--brand-rgb: rgb(59 130 246);
--brand-rgb-alpha: rgb(59 130 246 / 0.6);

/* Hue-based */
--brand-hsl: hsl(217 91% 60%);

/* Perceptual */
--brand-oklch: oklch(62% 0.19 259);

/* Explicit color space */
--brand-p3: color(display-p3 0.33 0.56 0.97);`}
    />,

    <h3 key="8" className="text-xl font-bold mt-12 mb-4">
      When To Use Each
    </h3>,
    <Table
      key="9"
      headers={["Scenario", "Best Choice", "Why"]}
      rows={[
        [
          "You just need to paste a fixed brand color from a design file",
          "<span class='text-amber-200/85 font-semibold'>Hex</span>",
          "Compact, familiar, and perfectly fine when the value is not meant to be manipulated much.",
        ],
        [
          "You need translucency for overlays, shadows, or glass effects",
          "<span class='text-cyan-200/85 font-semibold'>rgb() with alpha</span>",
          "Direct alpha control is ergonomic and widely understood in frontend code.",
        ],
        [
          "You want to spin hue, mute saturation, or quickly prototype theme variants",
          "<span class='text-sky-200/85 font-semibold'>hsl()</span>",
          "The channels match how designers and developers often think about color tweaking.",
        ],
        [
          "You are building a reusable design system with stable ramps and accessible contrast work",
          "<span class='text-violet-200/85 font-semibold'>oklch()</span>",
          "Perceptual lightness and chroma control make token systems much more predictable.",
        ],
        [
          "You need wide-gamut color on modern displays or explicit control over the color space",
          "<span class='text-orange-200/85 font-semibold'>color()</span>",
          "It lets you intentionally work in spaces like display-p3 instead of assuming sRGB.",
        ],
        [
          "You are doing advanced color science or interpolation work",
          "<span class='text-fuchsia-200/85 font-semibold'>lab() / lch() / oklab() / oklch()</span>",
          "These spaces are built for perceptual reasoning rather than old RGB-era convenience.",
        ],
      ]}
    />,

    <Callout
      key="10"
      type="tip"
      title="Modern CSS Preference: rgb() Over rgba()"
    >
      In current CSS,{" "}
      <strong>alpha is usually written inside the main function</strong> using
      the slash syntax, like <code>rgb(0 0 0 / 0.5)</code> or{" "}
      <code>hsl(220 40% 50% / 0.3)</code>. The older <code>rgba()</code> and{" "}
      <code>hsla()</code> forms still work, but they are mostly
      compatibility-era spellings now.
    </Callout>,

    <Callout
      key="11"
      type="info"
      title="The Practical Rule Most Teams End Up Using"
    >
      If you are styling a normal app: <strong>hex or rgb()</strong> is fine for
      fixed values,
      <strong>hsl()</strong> is nice for quick hand-tuning, and{" "}
      <strong>oklch()</strong> is the best long-term choice when you are
      building a real token system. Reach for <code>color()</code> only when you
      genuinely care about explicit color spaces or wide-gamut displays.
    </Callout>,
  ],
};
