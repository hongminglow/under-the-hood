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
      The 5 Commandments
    </h3>,
    <Table
      key="3"
      headers={["Letter", "Principle", "Developer Translation"]}
      rows={[
        [
          "S",
          "Single Responsibility",
          "Your `Billing` class should charge credit cards. It should absolutely NEVER also be connecting to AWS to send receipt emails. Split it out!"
        ],
        [
          "O",
          "Open/Closed",
          "You should be able to add a new 'PayPal' feature without physically modifying the existing 'Stripe' code. (Open for extension, Closed for modification)."
        ],
        [
          "L",
          "Liskov Substitution",
          "If you have an array of `Birds`, and you call `.fly()` on all of them, the app shouldn't crash because one of them is a `Penguin`. Sub-classes must behave predictably!"
        ],
        [
          "I",
          "Interface Segregation",
          "Don't build a massive `IUser` interface forcing every class to implement `updateProfile` and `banUser`. An admin class should use an `IAdmin` interface, and a guest should use an `IGuest` interface."
        ],
        [
          "D",
          "Dependency Inversion",
          "High-level business logic should never directly import low-level SQL database drivers. Both should strictly rely on an abstract `DatabaseInterface` so you can effortlessly swap MySQL for MongoDB later."
        ]
      ]}
    />,
    <Callout key="4" type="info" title="Do not over-engineer!">
      Applying all 5 SOLID principles strictly to a 100-line startup MVP is a massive mistake that results in 40 useless files. Apply them reactively only when updating a specific file physically starts to hurt.
    </Callout>,
  ],
};
