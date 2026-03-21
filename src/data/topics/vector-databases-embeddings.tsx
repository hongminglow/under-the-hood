import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";

export const vectorDatabasesEmbeddingsTopic: Topic = {
  id: "vector-databases-embeddings",
  title: "Vector Databases & Embeddings",
  description:
    "Why you absolutely cannot use a standard SQL `WHERE text LIKE '%dog%'` search to query massive unstructured LLM AI knowledge.",
  tags: ["ai", "database", "backend"],
  icon: "Database",
  content: [
    <p key="1">
      Embeddings convert unstructured text, images, or audio into <strong>High-Dimensional Vectors</strong> (arrays of numbers). A Vector Database is a specialized engine designed to store, index, and query these vectors using <strong>Geometric Similarity</strong> rather than exact keyword matching.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Indexing Algorithms: HNSW vs. IVF
    </h3>,
    <p key="3" className="mb-4">
      Searching millions of vectors is computationally expensive (O(N)). To achieve sub-millisecond latency, we use <strong>Approximate Nearest Neighbor (ANN)</strong> algorithms.
    </p>,
    <Table
      key="4"
      headers={["Algorithm", "Mechanism", "Trade-off"]}
      rows={[
        ["HNSW", "Creates a multi-layered graph of vectors. High-speed 'navigation' between nodes.", "High memory consumption (RAM-intensive)."],
        ["IVF (Inverted File)", "Clusters vectors into 'buckets'. Only searches the most relevant buckets.", "Slower than HNSW, but much lower memory footprint."],
        ["Flat", "Brute-force comparison (checks every single vector).", "100% accuracy, but O(N) slow."]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Hybrid Search: The Best of Both Worlds
    </h3>,
    <p key="6" className="mb-4">
      Vector search is 'fuzzy' and can't find exact SKUs or acronyms. <strong>Hybrid Search</strong> combines Vector Similarity (Semantic) with <strong>BM25</strong> (Keyword) to produce a unified relevance score.
    </p>,
    <Grid key="7" cols={2} gap={6} className="my-8">
      <Card title="Metadata Filtering">
        <p className="text-sm text-muted-foreground mb-2">
          "Find docs similar to X, but ONLY for <code>user_id=42</code>."
        </p>
        <p className="text-xs italic text-muted-foreground">
          <strong>Pre-filtering</strong> is superior; it limits the search space <em>before</em> the vector calculation, ensuring 100% accuracy for the filter.
        </p>
      </Card>
      <Card title="Product Quantization (PQ)">
        <p className="text-sm text-muted-foreground mb-2">
          Compressing 1536-dim vectors.
        </p>
        <p className="text-xs italic text-muted-foreground">
          PQ divides vectors into sub-spaces and replaces them with 'centroid' codes. This reduces memory by 90% while maintaining ~95% search accuracy.
        </p>
      </Card>
    </Grid>,
    <Callout key="8" type="info" title="Cosine Similarity">
      Most vector DBs use <strong>Cosine Similarity</strong>—measuring the cosine of the angle between two vectors. This focuses on <strong>Direction</strong> (meaning) rather than <strong>Magnitude</strong> (line length), which is critical for text embeddings where document length can vary.
    </Callout>,
  ],
};
