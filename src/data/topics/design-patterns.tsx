import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const designPatternsTopic: Topic = {
  id: "design-patterns",
  title: "Design Patterns (GoF)",
  description:
    "The legendary blueprints of object-oriented programming that stop developers from reinventing the wheel.",
  tags: ["architecture", "programming", "oop"],
  icon: "Component",
  content: [
    <p key="1">
      In 1994, four authors (The Gang of Four) wrote a book identifying 23 repeated architectural problems across all software engineering, and assigned strict vocabulary names to their proven solutions. 
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Vocabulary
    </h3>,
    <Table
      key="3"
      headers={["Pattern Name", "The Problem it Solves", "Real World Developer Example"]}
      rows={[
        [
          "Singleton",
          "You accidentally initialized 5 different database handlers burning up 5 TCP port connections.",
          "It forces a class to only ever create exactly ONE instance of itself globally. (Used heavily for DB connections and Node Loggers)."
        ],
        [
          "Factory",
          "You have massive `if/else` statements manually building complex `Car` classes with 20 properties.",
          "You create a `VehicleFactory` class. You simply ask it for 'Truck', and it hides all the ugly initialization logic behind the scenes."
        ],
        [
          "Observer",
          "Your UI screen needs to update instantly when a deeply nested background data download finishes.",
          "The classic Publisher/Subscriber (PubSub) model. The UI 'Subscribes' to the data class. React's `useEffect` or RxJS are pure Observer patterns."
        ],
        [
          "Strategy",
          "Your shopping cart has a massive 500-line switch statement calculating tax for every country in the world.",
          "You split it out. The Cart class accepts a completely interchangeable 'TaxStrategy' function passed in cleanly as an argument."
        ]
      ]}
    />,
    <Callout key="4" type="info" title="The Anti-Pattern Trap">
      Junior developers read about Design Patterns and immediately try to violently force all 23 into a tiny To-Do List app. This is over-engineering. Use standard logic first, and only reach for a strict GoF Pattern when you physically feel the pain of a massive architectural knot.
    </Callout>,
  ],
};
