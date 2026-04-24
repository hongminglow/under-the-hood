import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const webComponentsShadowDomTopic: Topic = {
  id: "web-components-shadow-dom",
  title: "Web Components & Shadow DOM",
  description:
    "How to physically isolate a custom <code><my-button></code> so global CSS rules mathematically cannot destroy its padding.",
  tags: ["frontend", "architecture", "html"],
  icon: "Box",
  content: [
    <p key="1">
      Web Components are a suite of browser-native APIs that allow you to create reusable custom elements with their own encapsulated logic and styling. They are <strong>Framework-Agnostic</strong>—a component built today will work in any future framework (or none at all).
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Three Pillars
    </h3>,
    <Table
      key="3"
      headers={["Tech", "Mechanism", "Why it Matters"]}
      rows={[
        ["Custom Elements", "Register a new tag (e.g., <code>&lt;user-card&gt;</code>) via <code>customElements.define()</code>.", "Allows you to extend the browser's vocabulary with your own UI primitives."],
        ["Shadow DOM", "Creates a 'Shadow Root' that is isolated from the main document.", "Guarantees <strong>CSS Scoping</strong>. Your component's styles cannot leak out, and global styles cannot leak in."],
        ["HTML Templates", "Uses <code>&lt;template&gt;</code> and <code>&lt;slot&gt;</code> tags.", "Efficiently clones DOM structures without executing scripts until the component is instantiated."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Lifecycle Callbacks: The 'Under the Hood' Hooks
    </h3>,
    <Table
      key="5"
      headers={["Callback", "When It Fires", "What It Is For"]}
      rows={[
        [
          "connectedCallback",
          "Invoked when the element is first <strong>appended</strong> to the DOM.",
          "Perform data fetching, attach event listeners, and render the initial Shadow DOM tree.",
        ],
        [
          "disconnectedCallback",
          "Invoked when the element is removed from the DOM.",
          "Clean up timers, observers, subscriptions, and listeners so detached custom elements do not leak memory.",
        ],
        [
          "attributeChangedCallback",
          "Invoked when an <strong>observed attribute</strong> is updated.",
          "Synchronize the component's internal state with its HTML attributes, similar to a native <code>componentDidUpdate</code> hook.",
        ],
      ]}
    />,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Declarative Shadow DOM (DSD)
    </h3>,
    <p key="7" className="mb-4 text-sm text-muted-foreground">
      Historically, Shadow DOM required JavaScript to initialize. <strong>Declarative Shadow DOM</strong> allows you to define the shadow root directly in HTML: <code>&lt;template shadowrootmode="open"&gt;</code>. This enables <strong>Server-Side Rendering (SSR)</strong> for Web Components, preventing the "Flash of Unstyled Content" (FOUC).
    </p>,
    <Callout key="8" type="info" title="Theming with CSS Variables">
      Since the Shadow DOM blocks global CSS, how do you theme a component? You use <strong>CSS Custom Properties (Variables)</strong>. Variables pass through the shadow boundary, allowing you to define <code>--primary-color: blue;</code> on the <code>&lt;body&gt;</code> and have it be inherited by all inner components.
    </Callout>,
  ],
};
