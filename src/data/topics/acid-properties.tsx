import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const acidPropertiesTopic: Topic = {
  id: "acid-properties",
  title: "A.C.I.D Properties of SQL",
  description:
    "The 4 fundamental guarantees a Relational Database enforces to stop you from accidentally giving a user infinite money.",
  tags: ["database", "architecture", "sql"],
  icon: "ShieldAlert",
  content: [
    <p key="1">
      If a user initiates a $50 bank transfer, the database mathematically performs two commands: `UPDATE user1 = user1 - 50` and `UPDATE user2 = user2 + 50`. What happens if the physical power cable to the server sparks and violently trips immediately after line 1? User 1 lost $50 permanently, and User 2 never received it. The money evaporated. 
    </p>,
    <p key="2" className="mt-4">
      <strong>ACID</strong> is a set of iron-clad guarantees implemented directly into the deepest core of PostgreSQL and MySQL to prevent these architectural nightmares.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The ACID Matrix
    </h3>,
    <Table
      key="4"
      headers={["Letter", "Property", "The Developer Translation"]}
      rows={[
        [
          "A",
          "Atomicity",
          "To fix the bank transfer power issue, you wrap both SQL lines in a `BEGIN;` and `COMMIT;`. It magically morphs the 2 queries into exactly 1 atomic bomb. Either all 2 lines successfully write cleanly, or 0 lines write."
        ],
        [
          "C",
          "Consistency",
          "The database physically reads your strict constraints (`CHECK amount > 0`) before permitting the transaction. If the transaction scientifically breaks your rules, the database violently rolls the entire action back."
        ],
        [
          "I",
          "Isolation",
          "If 10,000 thousands users violently attempt to buy the absolute last pair of limited Nike shoes physically at the exact same millisecond, the database invisibly isolates the requests and sequentially enforces a queue so exact money-checks don't organically bleed."
        ],
        [
          "D",
          "Durability",
          "Once the SQL database sends the \"COMMIT SUCCESS\", it mathematically guarantees the data is physically burned onto the SSD hard drive. Even if you rip the power plug out 1 nanosecond later, the data survives."
        ]
      ]}
    />,
    <Callout key="5" type="warning" title="NoSQL Abandons ACID (Historically)">
      To achieve massive horizontal cloud scale in the 2010s, databases like Cassandra and early MongoDB historically abandoned the 'I' (Isolation) or 'C' (Consistency) to run blazing fast. This is exactly why 99% of global massive banking and fintech institutions strictly use rigid SQL Postgres arrays for their core ledgers, avoiding NoSQL for financial transactions entirely.
    </Callout>,
  ],
};
