import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const webComponentsTopic: Topic = {
  id: "web-components-shadow-dom",
  title: "Web Components & Shadow DOM",
  description:
    "The browser-native component standard: Custom Elements, Shadow DOM, and HTML Templates — no framework required.",
  tags: ["frontend", "web-standards", "components", "html"],
  icon: "Component",
  content: [
    <p key="1">
      <strong>Web Components</strong> are a set of browser-native APIs that let
      you create <strong>reusable, encapsulated custom HTML elements</strong> —
      like <code>&lt;my-button&gt;</code> — that work in any framework (React,
      Vue, Angular) or with no framework at all. They're built on three
      specifications.
    </p>,
    <Grid key="2" cols={3} gap={6} className="my-8">
      <Card title="Custom Elements">
        <p className="text-sm">
          Define your own HTML tags with custom behavior. Extend{" "}
          <code>HTMLElement</code> and register with{" "}
          <code>customElements.define()</code>. Lifecycle callbacks:{" "}
          <code>connectedCallback</code>, <code>disconnectedCallback</code>,{" "}
          <code>attributeChangedCallback</code>.
        </p>
      </Card>
      <Card title="Shadow DOM">
        <p className="text-sm">
          Creates an <strong>encapsulated DOM tree</strong> invisible to the
          parent page. CSS inside Shadow DOM doesn't leak out; CSS outside
          doesn't leak in. True style isolation without CSS modules, BEM, or
          Tailwind prefixes.
        </p>
      </Card>
      <Card title="HTML Templates">
        <p className="text-sm">
          <code>&lt;template&gt;</code> and <code>&lt;slot&gt;</code> elements
          define inert HTML that's cloned on demand. Slots let consumers inject
          content:{" "}
          <code>
            &lt;my-card&gt;&lt;span
            slot="title"&gt;Hi&lt;/span&gt;&lt;/my-card&gt;
          </code>
          .
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="3"
      language="javascript"
      title="Building a Web Component"
      code={`class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: "open" }); // Encapsulated DOM
    this.shadowRoot.innerHTML = \`
      <style>
        button { padding: 8px 16px; font-size: 16px; }
        span { margin: 0 12px; font-weight: bold; }
      </style>
      <button id="dec">−</button>
      <span id="count">0</span>
      <button id="inc">+</button>
    \`;
  }

  connectedCallback() { // Called when element is added to DOM
    this.shadowRoot.getElementById("inc")
      .addEventListener("click", () => this.update(+1));
    this.shadowRoot.getElementById("dec")
      .addEventListener("click", () => this.update(-1));
  }

  update(delta) {
    this.count += delta;
    this.shadowRoot.getElementById("count").textContent = this.count;
  }
}

customElements.define("my-counter", MyCounter);
// Usage: <my-counter></my-counter>`}
    />,
    <Table
      key="4"
      headers={["Framework", "Web Component Support"]}
      rows={[
        ["Vanilla JS", "Native — no library needed"],
        [
          "Lit (Google)",
          "Lightweight WC library — reactive properties, decorators",
        ],
        [
          "Stencil (Ionic)",
          "Compiler that outputs WC from TSX — lazy loading built-in",
        ],
        ["React", "Partial — needs workarounds for events and properties"],
        ["Vue", "Excellent — can compile Vue SFCs as Web Components"],
        ["Angular", "Excellent — Angular Elements exports components as WC"],
      ]}
    />,
    <Callout key="5" type="info" title="When to Use Web Components">
      <strong>Design systems</strong> shared across React, Vue, and Angular
      teams. <strong>Micro-frontends</strong> that need framework-agnostic
      widgets. <strong>CMS embeds</strong> that must work on any website. For
      single-framework apps, framework-native components are usually simpler and
      more ergonomic.
    </Callout>,
  ],
};
