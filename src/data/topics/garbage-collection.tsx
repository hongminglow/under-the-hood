import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const garbageCollectionTopic: Topic = {
  id: "garbage-collection",
  title: "Garbage Collection (GC)",
  description:
    "How the Javascript engine physically deletes orphaned unused objects to prevent out-of-memory browser crashes.",
  tags: ["core", "javascript", "backend"],
  icon: "Database",
  content: [
    <p key="1">
      In primitive languages like C++, you must explicitly write manual instructions to allocate bytes in physical memory, and strictly command the system to delete them when finished. If you forget to trigger a delete command, the program leaks memory endlessly until the server completely crashes. High-level languages like Javascript introduced automated Garbage Collection algorithms to solve this automatically.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Mark-and-Sweep Algorithm
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Roots (Marking)">
        <p className="text-sm text-muted-foreground mb-2">
          The engine starts calculating from exactly one place: the absolute global root object (`window` or `global`). 
        </p>
        <p className="text-sm text-muted-foreground">
          It traverses every single variable property, following the execution object graph like a spider web. Any object it physically touches is actively marked as "Alive". It cannot be deleted.
        </p>
      </Card>
      <Card title="The Orphan Cleanup (Sweeping)">
        <p className="text-sm text-muted-foreground mb-2">
          After fully marking the massive web of alive objects, the engine iterates through the entire heap memory stack.
        </p>
        <p className="text-sm text-muted-foreground">
          Any object entirely missing the "Alive" mark is immediately classified as unreachable orphaned garbage. The engine mathematically safely deletes it and reclaims those exact physical bytes for newborn objects.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="danger" title="The Closure Memory Leak">
      If a Javascript event listener perfectly references a giant 50-megabyte array physically inside a function, that array theoretically stays "Alive." If the DOM element attaching the exactly listening callback unmounts, but you fail manually to explicitly remove the event listener, the engine's GC physically cannot delete the 50MB array. A huge memory crash ensues. Always destroy your listeners.
    </Callout>,
  ],
};
