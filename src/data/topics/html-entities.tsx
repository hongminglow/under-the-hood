import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Step } from "@/components/ui/Step";

export const htmlEntitiesTopic: Topic = {
  id: "html-entities",
  title: "HTML Entities",
  description:
    "Why you need &amp;nbsp; for spaces, why writing a literal < character breaks your website, and how HTML entities protect modern web applications from Cross-Site Scripting (XSS).",
  tags: ["html", "frontend", "browser", "xss", "security"],
  icon: "Code",
  content: [
    <p key="1" className="mb-4">
      An <strong>HTML Entity</strong> is a string of text that begins with an
      ampersand (<code>&amp;</code>) and ends with a semicolon (<code>;</code>).
      These are used to display reserved characters (which would otherwise be
      interpreted as HTML code), invisible characters (like special spaces), and
      difficult-to-type symbols (like © or ™).
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Two Main Reasons HTML Entities Exist
    </h3>,

    <Grid key="3" cols={2} gap={6} className="my-6">
      <Card title="1. Escaping Reserved Characters">
        <p className="text-sm text-muted-foreground mb-2">
          HTML is a markup language built on angle brackets (<code>&lt;</code>{" "}
          and <code>&gt;</code>). If you want to write a blog post about math
          and type <code>5 &lt; 10</code>, the browser's parser immediately
          thinks you are trying to open a new HTML element called{" "}
          <code>&lt; 10&gt;</code>.
        </p>
        <p className="text-sm text-muted-foreground">
          To tell the browser "I mean the literal character, not a code tag",
          you must write <code>5 &amp;lt; 10</code>.
        </p>
      </Card>
      <Card title="2. Whitespace Collapse & Invisible Characters">
        <p className="text-sm text-muted-foreground mb-2">
          Browsers automatically collapse multiple spaces, tabs, and line breaks
          into a <strong>single space</strong>. If you type 10 spaces between
          words, the browser renders only 1.
        </p>
        <p className="text-sm text-muted-foreground">
          To force the browser to render exact, unbreakable spacing, we use the
          Non-Breaking Space entity: <code>&amp;nbsp;</code>.
        </p>
      </Card>
    </Grid>,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: What exactly is &amp;nbsp;?
    </h3>,
    <p key="5" className="mb-4">
      The notorious <code>&amp;nbsp;</code> stands for{" "}
      <strong>Non-Breaking Space</strong>. It does two very specific things that
      a regular space bar press does not:
    </p>,
    <div key="6" className="space-y-3 mb-6">
      <Step index={1}>
        <strong>It prevents line-wrapping (The "Non-Breaking" part):</strong> If
        you write <code>10 kg</code>, the word "10" might stay on line 1, and
        "kg" might wrap to line 2. If you write <code>10&amp;nbsp;kg</code>, the
        browser will treat it as a single unbreakable block and move both down
        to line 2 if there isn't enough room. It acts like "glue" between words.
      </Step>
      <Step index={2}>
        <strong>It defeats HTML whitespace collapse:</strong> Because the
        browser treats it as a distinct character entity rather than standard
        whitespace, writing <code>&amp;nbsp;&amp;nbsp;&amp;nbsp;</code> will
        successfully render three physical spaces side-by-side.
      </Step>
    </div>,

    <Callout key="7" type="warning" title="Anti-Pattern Alert">
      Do not use repeated <code>&amp;nbsp;</code> to create visual indents or
      margins (e.g.,{" "}
      <code>&lt;p&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;Text&lt;/p&gt;</code>). This
      breaks semantic layout and screen readers. Always use CSS margins and
      padding for layout geometry. Use <code>&amp;nbsp;</code> strictly to bind
      words together (like <code>$ 100</code> or <code>10:00 PM</code>).
    </Callout>,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Syntax: The 3 Ways to Write an Entity
    </h3>,
    <p key="9" className="mb-4">
      You can write any entity in three different formats depending on what your
      system supports. The browser renders them identically.
    </p>,
    <Table
      key="10"
      headers={["Format Type", "Syntax", "Example (Space)", "Pros / Cons"]}
      rows={[
        [
          "Entity Name",
          "&name;",
          "&nbsp;",
          "Easiest to read and remember. However, not all obscure Unicode characters have names.",
        ],
        [
          "Decimal Number",
          "&#number;",
          "&#160;",
          "References the exact Unicode code point in base-10. Hard to read, but universal.",
        ],
        [
          "Hexadecimal Number",
          "&#xHex;",
          "&#xA0;",
          "References the exact Unicode code point in base-16. Commonly used by generic character-escaping functions.",
        ],
      ]}
    />,

    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      The Core 5 reserved entities (Security Critical)
    </h3>,
    <p key="12" className="mb-4">
      These five entities are the most important in web development. Passing
      user input directly into HTML without converting these five characters to
      their entity versions is the leading cause of{" "}
      <strong>Cross-Site Scripting (XSS)</strong> attacks.
    </p>,
    <Table
      key="13"
      headers={["Character", "Entity Name", "Meaning"]}
      rows={[
        ["<", "&lt;", "Less Than (starts an HTML tag)"],
        [">", "&gt;", "Greater Than (ends an HTML tag)"],
        ["&", "&amp;", "Ampersand (starts an HTML entity)"],
        ['"', "&quot;", "Double Quote (closes an HTML attribute)"],
        ["'", "&apos; / &#39;", "Single Quote (closes an HTML attribute)"],
      ]}
    />,

    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      How Entities Prevent XSS (Cross-Site Scripting)
    </h3>,
    <CodeBlock
      key="15"
      title="The vulnerability (Plaintext injection)"
      language="html"
      code={`<!-- Suppose a malicious user sets their username to: -->
<script>stealTokens()</script>

<!-- If your backend inserts this raw text directly into the HTML: -->
<div>Welcome, <script>stealTokens()</script>!</div>
<!-- 🚨 Discarded! The browser sees an actual script tag and executes it! -->`}
    />,
    <CodeBlock
      key="16"
      title="The fix (HTML Entity Escaping)"
      language="html"
      code={`<!-- If your backend (or React) properly ESCAPES the input to entities: -->
<div>Welcome, &lt;script&gt;stealTokens()&lt;/script&gt;!</div>

<!-- ✅ Safe! The browser renders the literal text "<script>stealTokens()</script>"
visually on the screen, but knows NOT to execute it as code. -->`}
    />,

    <Callout key="17" type="success" title="React Escapes by Default">
      Modern frameworks like React, Vue, and Angular automatically convert the
      "Core 5" characters into their HTML entities when you bind data (e.g.,{" "}
      <code>{"{userInput}"}</code>). You only become vulnerable if you
      explicitly bypass this protection using functions like React's{" "}
      <code>dangerouslySetInnerHTML</code>.
    </Callout>,
  ],
};
