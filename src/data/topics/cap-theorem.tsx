import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const capTheoremTopic: Topic = {
  id: "cap-theorem",
  title: "CAP Theorem",
  description:
    "The immutable law of physics proving it's mathematically impossible to build a perfectly flawless distributed database.",
  tags: ["database", "system-design", "architecture"],
  icon: "Triangle",
  content: [
    <p key="1">
      When you have exactly one PostgreSQL server, everything is perfect. If the server dies, nobody can read anything. But if you have 3 servers clustered globally to prevent downtime, a massive nightmare begins: **What if the transatlantic fiber-optic cable snaps, completely isolating the US server from the Europe server?**
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Mathematical Triangle
    </h3>,
    <Table
      key="3"
      headers={["Letter", "Concept", "The Developer Reality"]}
      rows={[
        [
          "C",
          "Consistency",
          "Every single read from ANY server in the world strictly returns the most recent, mathematically perfect write. Zero stale data."
        ],
        [
          "A",
          "Availability",
          "Every single request (read/write) MUST receive an un-crashed, perfectly functioning response, no matter how many servers are currently physically dead."
        ],
        [
          "P",
          "Partition Tolerance",
          "The system organically continues to operate perfectly even if the physical network wires absolutely snap and servers cannot talk to each other."
        ]
      ]}
    />,
    <p key="4" className="my-4">
      Because networks physically break randomly on planet Earth, <strong>Partition Tolerance is 100% mandatory (P).</strong> This forces every Software Architect sitting in a room to make a violently rigid permanent decision regarding their database: <strong>Do I choose Consistency (CP) or Availability (AP)?</strong>
    </p>,
    <Callout key="5" type="warning" title="CP (MongoDB / Redis) vs AP (Cassandra)">
      If a European bank suffers a wire snap to the US, the European server realizes the data isn't perfectly syncing. It explicitly chooses <strong>Consistency (CP)</strong>: it physically turns itself completely off and screams an error. "I refuse to be Available, because I might hand you scientifically wrong bank balances!" 
      <br/><br/>
      If Instagram suffers a wire snap to the US, the European server explicitly chooses <strong>Availability (AP)</strong>. It stays perfectly alive, happily accepting thousands of European photo 'Likes', mathematically knowing the US server is wildly out of sync. It chooses speed over perfection.
    </Callout>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      PACELC: The Extended Reality
    </h3>,
    <p key="7">
      CAP only describes behavior during a network partition. <strong>PACELC</strong>&nbsp;extends this: "If there's a Partition (P), choose Availability (A) or Consistency (C), Else (E) choose Latency (L) or Consistency (C)."<br/><br/>
      Even when the network is healthy, you must choose: Do you want <strong>low latency</strong> (eventual consistency, replicas might be slightly stale) or <strong>strong consistency</strong> (every read waits for all replicas to sync, adding latency)?
    </p>,
    <Table
      key="8"
      headers={["Database", "CAP Choice", "PACELC Choice"]}
      rows={[
        ["PostgreSQL (Single Node)", "CA (No Partition Tolerance)", "N/A (Not distributed)"],
        ["MongoDB", "CP", "PC (Prioritizes Consistency over Latency)"],
        ["Cassandra", "AP", "PA/EL (Prioritizes Availability & Low Latency)"],
        ["DynamoDB", "AP", "PA/EL (Tunable consistency levels)"]
      ]}
    />,
  ],
};
