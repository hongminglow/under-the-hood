import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const consistentHashingTopic: Topic = {
  id: "consistent-hashing",
  title: "Consistent Hashing",
  description:
    "How Amazon scaled global datacenters predictably without violently scattering petabytes of data during crashes.",
  tags: ["system-design", "architecture", "caching", "database"],
  icon: "Hash",
  content: [
    <p key="1">
      If you store 10,000 profile images across 3 massive S3 storage servers, how does the Load Balancer instantly perfectly know which server holds a user's image without tracking all exactly 10,000 IDs in a giant slow mapping file?
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Standard Modulo Hash (The Flaw)
    </h3>,
    <p key="3" className="mb-4">
      Traditionally, developers just calculate a hash of the image name and use modulo arithmetic: <code>10080 % 3 Servers = Server 0</code>. This evenly distributes 10,000 files flawlessly among 3 servers instantly based on their names.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="The Catastrophic Crash">
        <p className="text-sm text-slate-400">
          What happens when Server 2 physically dies? The equation suddenly becomes <code>10080 % 2 Servers = Server ?</code>. The math fundamentally changes for <strong>literally every single one of the 10,000 files</strong>. The entire caching system instantly invalidates, and 10,000 raw requests brutally hammer your database simultaneously.
        </p>
      </Card>
      <Card title="Consistent Hashing (The Ring)">
        <p className="text-sm text-slate-400">
          We map the 3 servers onto a massive mathematical "Circle" (A ring from 0 to 360 degrees). When a file is uploaded, we hash it to a random degree (e.g., 45°). We map it to the FIRST server we see by walking strictly clockwise.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="tip" title="Why the Ring is Genius">
      If Server 2 dies, it simply vanishes from the Circle. All the files stored on it walk clockwise to the next surviving server immediately! <strong>Crucially: Only the files directly mapping to Server 2 have to move!</strong> The files mapping to Server 1 and Server 3 mathematically stay perfectly in place, saving 66% of your datacenter from reloading.
    </Callout>,
  ],
};
