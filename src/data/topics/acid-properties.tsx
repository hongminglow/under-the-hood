import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const acidPropertiesTopic: Topic = {
  id: "acid-properties",
  title: "ACID Database Properties",
  description:
    "The 4 fundamental iron-clad guarantees that protect a relational database from corrupting your money.",
  tags: ["databases", "sql", "architecture"],
  icon: "Key",
  content: [
    <p key="1">
      When you transfer $100 from your account to a friend's account, it
      involves two separate database operations:{" "}
      <code>UPDATE account SET balance = balance - 100 WHERE me</code> and{" "}
      <code>UPDATE account SET balance = balance + 100 WHERE friend</code>. If
      the database server crashes exactly in the middle of these two queries,
      $100 vanishes into thin air.
    </p>,
    <p key="2" className="mt-4 mb-8">
      Relational Databases (like PostgreSQL / MySQL) wrap these queries inside a{" "}
      <strong>Transaction</strong>. A transaction must strictly adhere to all
      four ACID properties to guarantee absolute data integrity.
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      The ACID Guarantees
    </h4>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="Atomicity (All or Nothing)">
        <p className="text-sm">
          A transaction represents a single indivisible unit of work. If 99
          queries succeed but the 100th fails, the database automatically{" "}
          <strong>ROLLBACKS</strong> all 99 operations as if nothing ever
          happened.
        </p>
      </Card>
      <Card title="Consistency">
        <p className="text-sm">
          Data must always conform to all defined rules, constraints (like NOT
          NULL), and triggers before and after the transaction. A transaction
          can never leave the DB in an illegal state.
        </p>
      </Card>
      <Card title="Isolation">
        <p className="text-sm">
          A transaction must execute sequentially, completely unaware of other
          transactions running at the exact same millisecond. Prevents scenarios
          like "Dirty Reads" or "Phantom Reads" using row locks.
        </p>
      </Card>
      <Card title="Durability">
        <p className="text-sm">
          The moment a transaction commits, the data is permanently written to
          persistent non-volatile storage (disk logging). Even if a power outage
          happens 1 nanosecond later, the data is safe.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="5"
      language="sql"
      title="The Atomicity Guarantee"
      code={`BEGIN TRANSACTION;

  UPDATE checking SET balance = balance - 100 WHERE id = 1;
  UPDATE savings SET balance = balance + 100 WHERE id = 1;

COMMIT; -- Either both succeed simultaneously, or both fail.`}
    />,
    <Callout key="6" type="info" title="Why did NoSQL drop ACID?">
      Enforcing strict ACID properties (specifically Isolation using locks) is
      extremely hard to scale horizontally across multiple servers. Early NoSQL
      databases (like Cassandra) happily sacrificed ACID for BASE (Basically
      Available, Soft state, Eventual consistency) to achieve massive
      scalability.
    </Callout>,
  ],
};
