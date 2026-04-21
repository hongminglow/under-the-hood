import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const dataSerializationFormatsTopic: Topic = {
  id: "data-serialization-formats",
  title: "Data Serialization (Protobuf, Avro, JSON)",
  description:
    "Why sending human-readable JSON between 500 microservices at 100K requests/second is silently bankrupting your cloud bill.",
  tags: ["architecture", "backend", "networking", "performance"],
  icon: "FileCode",
  content: [
    <p key="1">
      <strong>Serialization</strong> is the process of converting an in-memory object into a byte stream that can be transmitted over a network or written to disk. <strong>Deserialization</strong> is the reverse. The format you choose — text-based (JSON, XML) or binary (Protobuf, Avro, MessagePack) — has massive implications for bandwidth, CPU cost, schema evolution, and developer ergonomics.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Format Spectrum
    </h3>,
    <Table
      key="3"
      headers={["Format", "Type", "Payload Size", "Parse Speed", "Schema", "Human Readable"]}
      rows={[
        ["JSON", "Text", "Large (field names repeated)", "Slow (parse strings)", "None (schema-less)", "✅ Yes"],
        ["MessagePack", "Binary", "~30% smaller than JSON", "Fast", "None (schema-less)", "❌ No"],
        ["Protocol Buffers", "Binary", "~60-80% smaller than JSON", "Very Fast", "Required (.proto files)", "❌ No"],
        ["Avro", "Binary", "Very small (schema not in payload)", "Very Fast", "Required (JSON schema, sent separately)", "❌ No"],
        ["FlatBuffers", "Binary (zero-copy)", "Small", "Instant (no parsing needed)", "Required", "❌ No"]
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Why Binary Formats Win at Scale
    </h3>,
    <p key="4a" className="mb-4">
      Consider a <code>User</code> object with fields <code>id</code>, <code>name</code>, <code>email</code>. In JSON, the field names are repeated in every single message. When you're sending 100,000 messages per second between microservices, you're paying bandwidth and CPU to serialize, transmit, and parse the string <code>"email"</code> hundreds of thousands of times. Binary formats encode fields as numeric tags (e.g., field 3 = email), eliminating this overhead entirely.
    </p>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="Protocol Buffers (Google)">
        <p className="text-sm text-slate-400 mb-2">
          Define schemas in <code>.proto</code> files. Code generators produce type-safe classes in any language. Fields are identified by numeric tags, not names. Adding new fields is backward-compatible as long as you never reuse tag numbers.
        </p>
        <p className="text-xs italic text-slate-400">
          Used by: gRPC, Google internal services, Envoy, Kubernetes API extensions.
        </p>
      </Card>
      <Card title="Apache Avro (Confluent/Kafka)">
        <p className="text-sm text-slate-400 mb-2">
          Schema is defined in JSON but stored in a <strong>Schema Registry</strong>, not embedded in the payload. The producer and consumer negotiate schemas at connection time. Supports full schema evolution (add, remove, rename fields).
        </p>
        <p className="text-xs italic text-slate-400">
          Used by: Kafka (with Confluent Schema Registry), Apache Spark, Hadoop ecosystem.
        </p>
      </Card>
    </Grid>,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Schema Evolution: The Real Reason to Care
    </h3>,
    <p key="6a" className="mb-4">
      In production, schemas change constantly. You add a <code>phone</code> field, remove a deprecated <code>fax</code> field, rename <code>name</code> to <code>full_name</code>. With JSON, you silently break all consumers who don't know about the change. With schema-based formats, compatibility is <strong>enforced at the registry level</strong>.
    </p>,
    <Table
      key="7"
      headers={["Compatibility", "Rule", "What You Can Do"]}
      rows={[
        ["Backward Compatible", "New schema can read old data.", "Add optional fields, remove fields with defaults."],
        ["Forward Compatible", "Old schema can read new data.", "Add fields (old readers ignore unknown fields)."],
        ["Full Compatible", "Both directions work.", "Only add optional fields with defaults. Never remove or rename required fields."],
        ["Breaking", "Neither direction works.", "Rename a required field, change a field type. Requires a new topic/endpoint version."]
      ]}
    />,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      When to Use What
    </h3>,
    <Grid key="9" cols={2} gap={6} className="my-8">
      <Card title="Use JSON When...">
        <ul className="text-sm text-slate-400 list-disc pl-4 space-y-1">
          <li>Building public APIs consumed by external developers</li>
          <li>Low traffic volume where bandwidth isn't a concern</li>
          <li>Debugging and quick prototyping (human readable)</li>
          <li>Config files and REST APIs for web frontends</li>
        </ul>
      </Card>
      <Card title="Use Binary When...">
        <ul className="text-sm text-slate-400 list-disc pl-4 space-y-1">
          <li>Internal service-to-service communication (gRPC + Protobuf)</li>
          <li>High-throughput event streaming (Kafka + Avro)</li>
          <li>Mobile apps where bandwidth is limited and expensive</li>
          <li>Any system doing 10K+ messages/second</li>
        </ul>
      </Card>
    </Grid>,

    <Callout key="10" type="info" title="The Schema Registry Pattern">
      In Kafka ecosystems, producers <strong>register</strong> their Avro/Protobuf schema in a central <strong>Confluent Schema Registry</strong> before publishing. Consumers fetch the schema by ID embedded in the first few bytes of each message. The registry enforces compatibility rules, rejecting any schema change that would break existing consumers. This turns "runtime JSON parsing errors" into "deployment-time schema validation errors."
    </Callout>,

    <Callout key="11" type="warning" title="Don't Over-Optimize">
      If your entire system is 3 microservices handling 100 requests per second, JSON is perfectly fine. The cognitive overhead of maintaining <code>.proto</code> files, code generation pipelines, and schema registries is only worth it when you're operating at a scale where bandwidth and CPU savings are measurable.
    </Callout>,
  ],
};
