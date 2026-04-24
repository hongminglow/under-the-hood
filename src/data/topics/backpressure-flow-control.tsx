import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Gauge, Radio, ServerCog, Workflow } from "lucide-react";

export const backpressureFlowControlTopic: Topic = {
  id: "backpressure-flow-control",
  title: "Backpressure & Flow Control",
  description:
    "What happens when a producer generates 10,000 events per second but the consumer can only handle 500.",
  tags: ["architecture", "system-design", "streaming", "backend"],
  icon: "Gauge",
  content: [
    <p key="1">
      <strong>Backpressure</strong> is the mechanism by which a slow consumer signals a fast producer to <em>slow down</em>. Without it, the producer blindly floods the consumer, memory fills up, latencies spike, and eventually the system crashes or drops data silently. It's the invisible force that keeps every streaming pipeline, message queue, and API from collapsing under load.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Fundamental Problem
    </h3>,
    <p key="2a" className="mb-4">
      Imagine a Kafka producer ingesting 10,000 click events per second. The consumer processes each event by querying a database, which can handle only 500 queries per second. Without backpressure, the consumer's internal buffer grows unboundedly: 9,500 unprocessed events per second accumulate in memory until the process is killed by the OS (OOM).
    </p>,

    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      Backpressure Strategies
    </h3>,
    <Table
      key="4"
      headers={["Strategy", "How It Works", "Trade-off"]}
      rows={[
        ["Drop", "When the buffer is full, silently discard new incoming items.", "Data loss. Acceptable for metrics, telemetry, and live video frames where freshness matters more than completeness."],
        ["Buffer (Bounded)", "Accumulate items in a fixed-size queue. Block the producer when the queue is full.", "The producer slows down or blocks. Good for batch pipelines. Risk: if the buffer is too large, latency spikes; too small, throughput drops."],
        ["Sample / Throttle", "Only process every Nth item or one item per time window.", "Reduced fidelity. Good for dashboards, monitoring, and analytics where 100% accuracy isn't required."],
        ["Scale Consumers", "Auto-scale the number of consumer instances to match the producer rate.", "The correct architectural answer at scale. But scaling takes time (30s–2min for new pods), creating a gap during bursts."],
        ["Pull-Based", "The consumer requests items when it's ready, instead of the producer pushing.", "The consumer is never overwhelmed. Kafka uses this — consumers pull batches at their own pace."]
      ]}
    />,

    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Where Backpressure Lives in Practice
    </h3>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Gauge} title="TCP" subtitle="Sliding window" theme="emerald">
        <p className="text-sm text-emerald-200/80">
          TCP has backpressure built in. The receiver advertises a <strong className="text-emerald-300">window size</strong> — the amount of data it can buffer. If the receiver's buffer fills up, the window shrinks to zero, and the sender physically stops transmitting until the receiver drains its buffer.
        </p>
      </FeatureCard>
      <FeatureCard icon={ServerCog} title="Kafka" subtitle="Consumer lag" theme="teal">
        <p className="text-sm text-teal-200/80">
          Kafka consumers pull messages at their own pace. If a consumer falls behind, <strong className="text-teal-300">Consumer Lag</strong> grows (the offset gap between the latest produced message and the latest consumed message). Monitoring lag is the primary Kafka health signal.
        </p>
      </FeatureCard>
      <FeatureCard icon={Workflow} title="Node.js Streams" subtitle="highWaterMark" theme="cyan">
        <p className="text-sm text-cyan-200/80">
          Node.js Readable streams have a <code>highWaterMark</code> (default 16KB). When the internal buffer exceeds this, <code>.read()</code> returns null and the stream pauses until the consumer drains data. If you pipe a fast file read into a slow HTTP upload without respecting this, you'll OOM.
        </p>
      </FeatureCard>
      <FeatureCard icon={Radio} title="RxJS / Reactive Streams" subtitle="Explicit demand signals" theme="sky">
        <p className="text-sm text-sky-200/80">
          Reactive frameworks provide explicit backpressure operators: <code>buffer()</code>, <code>throttle()</code>, <code>debounce()</code>, <code>sample()</code>. The Reactive Streams specification (used by Java's Project Reactor and Akka) mandates that a <code>Subscriber</code> signals demand via <code>request(n)</code>.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Push vs. Pull: The Architectural Decision
    </h3>,
    <Table
      key="8"
      headers={["Model", "How It Works", "Backpressure Behavior"]}
      rows={[
        ["Push (WebSocket, SSE)", "Producer sends data as soon as it's available.", "Consumer has no control over rate. Must buffer, drop, or crash. Backpressure is the consumer's problem."],
        ["Pull (Kafka, HTTP Polling)", "Consumer requests data when ready.", "Natural backpressure. Consumer never receives more than it can handle. Backpressure is built-in."],
        ["Hybrid (gRPC Streaming)", "Bidirectional streaming with flow control frames.", "Both sides can signal when they're overwhelmed. gRPC uses HTTP/2 flow control windows."]
      ]}
    />,

    <Callout key="9" type="warning" title="The Silent Killer">
      Backpressure failures rarely cause immediate crashes. Instead, they cause <strong>increasing latency</strong> as buffers grow, then <strong>timeouts</strong> as consumers fall further behind, then <strong>cascading failures</strong> as upstream services pile up retries. By the time you notice, the entire pipeline is hours behind real-time. Monitor buffer sizes and consumer lag aggressively.
    </Callout>,

    <Callout key="10" type="tip" title="The Golden Architecture">
      The most robust pattern is a <strong>bounded buffer + pull-based consumer + auto-scaling</strong>. Kafka does this naturally: partitions act as bounded buffers, consumers pull at their pace, and Kubernetes HPA scales consumer pods based on consumer lag metrics. This combination handles both steady-state load and sudden traffic bursts gracefully.
    </Callout>,
  ],
};
