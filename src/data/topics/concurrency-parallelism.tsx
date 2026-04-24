import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Shuffle, Cpu } from "lucide-react";

export const concurrencyParallelismTopic: Topic = {
  id: "concurrency-parallelism",
  title: "Concurrency vs Parallelism",
  description:
    "The physical difference between a juggler balancing three chainsaws alone, versus three separate jugglers holding one chainsaw each.",
  tags: ["core", "architecture", "backend"],
  icon: "Cpu",
  content: [
    <p key="1">
      Junior developers often use these terms interchangeably. But a system handling 50,000 active concurrent WebSocket HTTP connections perfectly does not necessarily employ parallel computing. Your database scaling strategy fundamentally relies on understanding this distinction.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Differences
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Shuffle} title="Concurrency" subtitle="The single juggler" theme="teal">
        <p className="text-sm text-teal-200/80 mb-2">
          Dealing intelligently with multiple tasks at once on one strict physical CPU core.
        </p>
        <p className="text-sm text-teal-100/75">
          NodeJS inherently operates this way. It rapidly switches your single CPU core back and forth between handling an HTTP request, querying a database, and writing a file. The processor switches contexts so extremely quickly that humans perceive everything happening functionally simultaneously.
        </p>
      </FeatureCard>
      <FeatureCard icon={Cpu} title="Parallelism" subtitle="The hiring spree" theme="cyan">
        <p className="text-sm text-cyan-200/80 mb-2">
          Actually physically executing entirely multiple independent algorithms at the literal exact nanosecond.
        </p>
        <p className="text-sm text-cyan-100/75">
          This demands separate hardware cores natively. If you render a complex 3D video game frame, your modern GPU activates 4,000 independent physical pixel-processing cores simultaneously in parallel to perfectly paint your screen monitor in completely isolated independent physical lanes.
        </p>
      </FeatureCard>
    </Grid>,
    <Callout key="4" type="tip" title="The Node JS Worker Trap">
      Spinning up massive 'Worker Threads' inside a tiny Node JS server container that only physically contains 1 CPU vCore actually makes the server brutally slower natively. The lone CPU explicitly stops doing real application mathematics to waste deep overhead cycles structurally context-switching between fake artificial worker threads. Use parallelism only when physical silicone matches the threads.
    </Callout>,
  ],
};
