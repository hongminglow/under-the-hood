import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Database, Fingerprint, Globe, ShieldCheck } from "lucide-react";

export const bloomFiltersTopic: Topic = {
  id: "bloom-filters",
  title: "Bloom Filters",
  description:
    "A probabilistic data structure that answers 'is this element in the set?' in O(1) time using a fraction of the memory — but can never be 100% certain.",
  tags: ["data-structures", "databases", "caching", "performance", "algorithms"],
  icon: "Filter",
  content: [
    <p key="1">
      Imagine you are building a username registration system with 500 million users. Before hitting your database on every single signup attempt, you need a way to instantly ask: <em>"Does this username already exist?"</em> A Bloom Filter answers that in <strong>O(1) time using kilobytes of RAM</strong> — no database query required.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      How It Works: Hashing Into Bits
    </h3>,
    <p key="3" className="mb-4">
      A Bloom Filter is a <strong>bit array</strong> of <code>m</code> bits (all initialised to 0) plus <code>k</code> independent hash functions. Every insertion and lookup runs through the exact same pipeline:
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-6">
      <FeatureCard icon={Fingerprint} title="Inserting 'alice'" subtitle="Hash into bit positions" theme="emerald">
        <p className="text-sm text-emerald-200/80 mb-2">Three hash functions produce three positions.</p>
        <p className="text-xs italic text-emerald-200/60">
          <strong className="text-emerald-300">hash₁("alice") → 3, hash₂("alice") → 7, hash₃("alice") → 14.</strong><br /><br />
          The filter sets bits 3, 7, and 14 to <code>1</code>. The string "alice" itself is never stored — only the flipped bits.
        </p>
      </FeatureCard>
      <FeatureCard icon={ShieldCheck} title="Querying 'alice'" subtitle="Cheap negative check" theme="teal">
        <p className="text-sm text-teal-200/80 mb-2">Re-hash, check all positions.</p>
        <p className="text-xs italic text-teal-200/60">
          If bits 3, 7, and 14 are all <code>1</code> → <strong className="text-teal-300">"Possibly in set"</strong> (go hit the DB to confirm).<br /><br />
          If any bit is <code>0</code> → <strong className="text-teal-300">"Definitely NOT in set"</strong> (skip the DB entirely). This is a guaranteed negative.
        </p>
      </FeatureCard>
    </Grid>,
    <Callout key="5" type="warning" title="The Asymmetric Guarantee">
      A Bloom Filter can produce <strong>False Positives</strong> (says "maybe yes" when the answer is "no") but <strong>never False Negatives</strong> (if it says "definitely no", it is always right). This asymmetry is its defining characteristic. You tune the false positive rate by adjusting the size of the bit array and the number of hash functions.
    </Callout>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Bloom Filters vs. Comparable Approaches
    </h3>,
    <Table
      key="7"
      headers={["Approach", "Space", "Lookup Speed", "False Positives", "Deletions", "Best Use Case"]}
      rows={[
        ["Bloom Filter", "Very Low (bits)", "O(k) ≈ O(1)", "Yes (~1-5%)", "No", "Is username taken? Did we cache this URL?"],
        ["Cuckoo Filter", "Low (bits)", "O(1)", "Yes (~low)", "Yes", "Same as Bloom, but needs deletions."],
        ["Hash Set (e.g. Redis SET)", "High (full data)", "O(1)", "No", "Yes", "Exact membership; small-to-medium set sizes."],
        ["SQL Indexed Column", "Medium (index)", "O(log n)", "No", "Yes", "Persistent, transactional exact lookups."],
        ["Quotient Filter", "Low (bits)", "O(1)", "Yes", "Yes", "SSD-friendly; better cache locality than Bloom."],
      ]}
    />,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Real-World Usage in Production Systems
    </h3>,
    <Grid key="9" cols={2} gap={6} className="my-6">
      <FeatureCard icon={Database} title="Databases" subtitle="Cassandra and RocksDB" theme="emerald">
        <p className="text-sm text-emerald-200/80 mb-2">
          Avoiding expensive disk lookups.
        </p>
        <p className="text-xs italic text-emerald-200/60">
          Each SSTable on disk has an associated Bloom Filter in memory. Before a read query hits the disk, the filter checks all SSTables. Only the one(s) that say "possibly contains key" are actually read. This dramatically reduces I/O on read-heavy workloads.
        </p>
      </FeatureCard>
      <FeatureCard icon={Globe} title="Web" subtitle="CDN cache membership" theme="teal">
        <p className="text-sm text-teal-200/80 mb-2">
          Is this asset already cached on this edge node?
        </p>
        <p className="text-xs italic text-teal-200/60">
          CDNs like Akamai and Cloudflare maintain Bloom Filters at each edge to determine whether a URL is cached locally before forwarding the request upstream. A false positive costs one unnecessary upstream request; a false negative never occurs.
        </p>
      </FeatureCard>
      <FeatureCard icon={ShieldCheck} title="Security" subtitle="Malicious URL detection" theme="cyan">
        <p className="text-sm text-cyan-200/80 mb-2">
          Google Chrome's Safe Browsing feature.
        </p>
        <p className="text-xs italic text-cyan-200/60">
          Chrome ships a local Bloom Filter containing millions of known-malicious URL hashes. On every navigation, it does a local O(1) filter check. Only potential "hits" trigger a real network lookup to Google's servers. The filter keeps billions of benign navigations completely private.
        </p>
      </FeatureCard>
      <FeatureCard icon={Fingerprint} title="Distributed Systems" subtitle="Deduplication" theme="sky">
        <p className="text-sm text-sky-200/80 mb-2">
          Has this event/message already been processed?
        </p>
        <p className="text-xs italic text-sky-200/60">
          In Kafka consumers, Bloom Filters serve as ultra-fast idempotency checks for event IDs. Before processing a message, the consumer checks the filter. If "definitely not seen" → process it. If "possibly seen" → check the slower deduplication store.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="10" className="text-xl font-bold mt-8 mb-4">
      When to Use (and When NOT to Use) a Bloom Filter
    </h3>,
    <Table
      key="11"
      headers={["Condition", "Use Bloom Filter?", "Reasoning"]}
      rows={[
        ["Set has tens of millions of items", "Yes", "Memory savings vs a HashSet are massive at scale."],
        ["You can tolerate a 1-3% false positive rate", "Yes", "Standard engineering tradeoff for performance."],
        ["You need to delete items from the set", "No", "Standard Bloom Filters do not support deletion (use Cuckoo Filter instead)."],
        ["You need exact membership (e.g., payments)", "No", "A false positive could be catastrophic. Use an exact store."],
        ["Data fits comfortably in a HashSet < 1M items", "No", "A HashSet is simpler; memory savings are trivial at small scale."],
        ["Working with Redis", "Yes (built-in)", "Redis natively supports Bloom Filters via RedisBloom module."],
      ]}
    />,
    <Callout key="12" type="info" title="Tuning the False Positive Rate">
      The false positive rate <code>p</code> is controlled by two variables: <code>m</code> (bit array size) and <code>k</code> (number of hash functions). The optimal number of hash functions is <code>k = (m/n) × ln(2)</code>, where <code>n</code> is the expected number of insertions. Most production libraries (e.g. <code>guava</code>, <code>pybloom</code>) handle this math automatically — you simply declare the expected element count and desired false positive rate at construction time.
    </Callout>,
  ],
};
