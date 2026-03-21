import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const frontendFrameworksTopic: Topic = {
  id: "frontend-frameworks",
  title: "React vs Vue vs Angular",
  description:
    "The 10-year Holy War of Frontend engineering: Library vs Framework vs Corporate Behemoth.",
  tags: ["frontend", "react", "architecture"],
  icon: "Layers",
  content: [
    <p key="1">
      At their core, all three tools solve the exact same scientific problem: How do we sync Javascript Data (<code>let count = 0;</code>) mathematically flawlessly with the Browser DOM (<code>{"<div id=\"count\">0</div>"}</code>) without writing massive agonizing <code>document.getElementById</code> spaghetti code?
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Philosophies
    </h3>,
    <Table
      key="3"
      headers={["Tool", "Vibe", "The Reality"]}
      rows={[
        [
          "React (Meta)",
          "The Wild West (Library)",
          "React is strictly just a hyper-fast rendering UI library. It has literally zero built-in router, zero state manager, and zero animation library. You are completely violently forced to stitch together 15 random 3rd-party NPM packages (Zustand, React Router, Tailwind) to build a real app. Extremely flexible, but massive architecture fatigue."
        ],
        [
          "Angular (Google)",
          "The Dictator (Framework)",
          "Angular is an aggressive, mathematically massive, all-in-one military fortress. It dictates exactly how you route, exactly how you fetch HTTP (RxJS), and practically physically forces you to use strict Object-Oriented TypeScript Services. Zero decision fatigue, but an agonizingly brutal 6-month learning curve."
        ],
        [
          "Vue (Independent)",
          "The Perfect Middle",
          "Vue brings the best of both. It feels like incredibly lightweight beautiful plain HTML/JS (unlike React's weird JSX), but its core team officially maintains the <code>vue-router</code> and <code>pinia</code> state exactly natively. You don't have to glue random 3rd-party tools together."
        ]
      ]}
    />,
    <Callout key="4" type="tip" title="Always Bet on the Ecosystem">
      Why does React completely crush the industry despite its architectural flaws (like useEffect nightmares)? Because of the **Ecosystem**. If you need an obscure React component for a 3D spinning interactive globe, somebody natively wrote a flawless NPM React wrapper for it 6 years ago. Vue and Angular often force you to write the tedious wrapper entirely yourself.
    </Callout>,
  ],
};
