import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const consistentHashingTopic: Topic = {
  id: "consistent-hashing",
  title: "Consistent Hashing",
  description:
    "The ingenious mathematical algorithm that keeps massive distributed caches from collapsing during autoscaling.",
  tags: ["architecture", "caching", "algorithms", "dist-systems"],
  icon: "CircleDashed",
  content: [
    <p key="1">
      Imagine you have 10 million users stored across 3 Redis Cache Servers. To
      quickly find which server holds `user_102`, you use the formula:{" "}
      <code>server_index = hash("user_102") % 3</code>. It routes perfectly to
      Server 2.
    </p>,
    <p key="2" className="mt-4 mb-8">
      <strong>The Fatal Flaw:</strong> If traffic spikes and you autoscale to
      add a 4th cache server, the formula becomes `hash(user_id) % 4`. Suddenly,
      <strong>
        99% of all user hashes map to a completely different server index
      </strong>
      . Every request results in a "Cache Miss," immediately crashing your
      primary SQL database under the massive load.
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      The Hash Ring Solution
    </h4>,
    <p key="4" className="mb-4">
      <strong>Consistent Hashing</strong> solves this by mapping both the Users{" "}
      <em>AND</em>
      the Servers onto a massive mathematical "Hash Ring" (usually an integer
      range from 0 to 2^32).
    </p>,
    <Grid key="5" cols={2} gap={6} className="mb-8">
      <Card title="1. Placing the Servers">
        We hash the IPs or IDs of the 3 servers and place them at those
        coordinates on the massive 360-degree circle.
      </Card>
      <Card title="2. Routing the Users">
        We hash the User ID, place them on the circle, and travel{" "}
        <strong>clockwise</strong>
        until we encounter the first Server coordinate block. We save the user
        there.
      </Card>
    </Grid>,
    <Table
      key="6"
      headers={[
        "Adding/Removing a Server",
        "Standard Modulo (%)",
        "Consistent Hashing",
      ]}
      rows={[
        [
          "New Server Added",
          "99% cache invalidation rate.",
          "Only remaps the users sitting immediately clockwise of the new server (~25%).",
        ],
        [
          "Server Dies",
          "Complete mapping chaos.",
          "Only the keys on the dead server migrate to their next clockwise neighbor.",
        ],
      ]}
    />,
    <Callout key="7" type="info" title="Virtual Nodes">
      If a server dies on the ring, its immediate neighbor absorbs a massive 2x
      traffic spike. To prevent this, systems deploy{" "}
      <strong>Virtual Nodes</strong>: each physical server pretends to be 100
      randomly scattered "clones" across the circle, perfectly balancing the
      redistribution.
    </Callout>,
  ],
};
