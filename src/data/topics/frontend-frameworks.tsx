import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";

export const frontendFrameworksTopic: Topic = {
  id: "frontend-frameworks",
  title: "React vs Vue vs Angular",
  description:
    "A comprehensive architectural comparison guide to help you choose the right frontend technology for your next project based on specific use cases.",
  tags: ["frontend", "react", "vue", "angular", "architecture"],
  icon: "Layers",
  content: [
    <p key="1" className="mb-6">
      Modern web development is dominated by three major players: <Highlight variant="primary">React</Highlight>, <Highlight variant="primary">Vue</Highlight>, and <Highlight variant="primary">Angular</Highlight>. While they all solve the fundamental problem of keeping the UI in sync with underlying state, they adopt radically different philosophies regarding architecture, developer freedom, and built-in tooling.
    </p>,
    
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Technical Comparison
    </h3>,

    <Table
      key="3"
      headers={["Feature", "React", "Vue", "Angular"]}
      rows={[
        ["Classification", "UI Library", "Progressive Framework", "Opinionated Framework"],
        ["Data Binding", "One-way", "Two-way (via v-model)", "Two-way"],
        ["DOM Strategy", "Virtual DOM", "Virtual DOM", "Incremental DOM"],
        ["Core Language", "JavaScript / TypeScript", "JavaScript / TypeScript", "TypeScript (Enforced)"],
        ["State Management", "3rd-party (Redux, Zustand)", "Official (Pinia)", "Official (NgRx / Services)"],
        ["Routing", "3rd-party (React Router)", "Official (Vue Router)", "Official (Angular Router)"]
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      When to Use Which? (Scenarios)
    </h3>,

    <Grid key="5" cols={1} gap={6} className="mb-8">
      <Card title="React: The Startup Default">
        <p className="text-sm text-foreground mb-4">
          React is a library, not a framework. It handles UI rendering but leaves routing, state management, and architecture entirely up to you.
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
          <li><strong>Scenario:</strong> Startups, highly custom interfaces, SaaS dashboards, and teams needing to move fast with a massive talent pool.</li>
          <li><strong>The Why:</strong> The React ecosystem is unparalleled. If you need a complex 3D globe or a specific drag-and-drop interaction, someone has likely already built an open-source React wrapper for it.</li>
          <li><strong>The Catch:</strong> "Decision Fatigue." You have to research and maintain compatibility between 15 different 3rd-party libraries just to build a standard application.</li>
        </ul>
      </Card>
      
      <Card title="Vue: The Elegant Bridge">
        <p className="text-sm text-foreground mb-4">
          Vue strikes a perfect middle ground. It is highly approachable like plain HTML/JS but includes official, core-team-supported tools for state and routing.
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
          <li><strong>Scenario:</strong> Standard web apps, legacy migrations, rapid prototyping, and teams transitioning from backend to frontend.</li>
          <li><strong>The Why:</strong> Vue has the lowest barrier to entry. Features like Single-File Components make code highly readable. You avoid React's ecosystem fatigue because Vue officially maintains its own router and state management (Pinia).</li>
          <li><strong>The Catch:</strong> A smaller enterprise job market and relatively fewer out-of-the-box UI component frameworks compared to the massive React ecosystem.</li>
        </ul>
      </Card>
      
      <Card title="Angular: The Enterprise Fortress">
        <p className="text-sm text-foreground mb-4">
          Angular is a massive, batteries-included framework built by Google. It mandates strict architectural patterns and relies heavily on TypeScript and RxJS.
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
          <li><strong>Scenario:</strong> Huge enterprise-level banking, insurance, or corporate software maintained by thousands of developers over many years.</li>
          <li><strong>The Why:</strong> Strictness guarantees consistency. If a developer joins an Angular project in Berlin, it looks identical to an Angular project in New York. You get routing, state, forms, and HTTP tools right out of the box.</li>
          <li><strong>The Catch:</strong> An incredibly steep vertical learning curve and lots of boilerplate, requiring deep knowledge of concepts like Observables and Dependency Injection.</li>
        </ul>
      </Card>
    </Grid>,

    <Callout key="6" type="warning" title="The True Deciding Factor">
      While technical specs matter, the <strong>talent pool and existing team expertise</strong> are often the most important factors. If your team is composed of Java or C# backend developers transitioning to frontend, they will feel right at home with Angular's rigid Object-Oriented patterns. If you need to hire frontend engineers quickly and scale an MVP, React's massive developer community makes it the safest organizational bet.
    </Callout>,
  ],
};
