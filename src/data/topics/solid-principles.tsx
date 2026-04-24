import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const solidPrinciplesTopic: Topic = {
  id: "solid-principles",
  title: "S.O.L.I.D Principles",
  description:
    "The legendary 5 rules of Object-Oriented design that stop you from writing 'Spaghetti Code'.",
  tags: ["architecture", "programming", "oop"],
  icon: "Layers",
  content: [
    <p key="1">
      Coined by "Uncle Bob" Martin in 2000, SOLID is a checklist for writing code that is aggressively easy to maintain, scale, and test without breaking existing functionality.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The 5 Design Pressures
    </h3>,
    <Table
      key="3"
      headers={["Letter", "Principle", "Developer Translation"]}
      rows={[
        [
          "S",
          "Single Responsibility",
          "A Billing service should charge cards. Receipt email delivery belongs in a separate collaborator."
        ],
        [
          "O",
          "Open/Closed",
          "Add PayPal by extending a payment interface, not by rewriting the existing Stripe path."
        ],
        [
          "L",
          "Liskov Substitution",
          "A subtype must honor the expectations of its parent type. A Penguin should not pretend it can fly."
        ],
        [
          "I",
          "Interface Segregation",
          "Do not force classes to implement methods they never use. Split large interfaces into role-specific contracts."
        ],
        [
          "D",
          "Dependency Inversion",
          "Business logic should depend on abstractions, not directly on SQL drivers, HTTP clients, or vendor SDKs."
        ]
      ]}
    />,
    <Callout key="4" type="info" title="Do not over-engineer!">
      SOLID is a pressure-release system, not a ceremony checklist. Apply it when a file becomes hard to change, hard to test, or easy to break — not just because the acronym exists.
    </Callout>,
  ],
};
