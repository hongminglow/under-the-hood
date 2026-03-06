import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const vectorDatabasesTopic: Topic = {
  id: "vector-databases-embeddings",
  title: "Vector Databases & Embeddings",
  description:
    "How AI search actually works: turning text into numbers, storing them in vector space, and finding similar items in milliseconds.",
  tags: ["ai", "databases", "embeddings", "search"],
  icon: "Locate",
  content: [
    <p key="1">
      Traditional databases search by <strong>exact match</strong>:{" "}
      <code>WHERE name = 'iPhone'</code>. Vector databases search by{" "}
      <strong>semantic similarity</strong>: "Find products similar to 'wireless
      noise-cancelling headphones'" — even if those exact words don't appear in
      the database. This is the engine behind AI search, recommendation systems,
      and RAG.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      How It Works
    </h4>,
    <Grid key="3" cols={3} gap={6} className="mb-8">
      <Card title="1. Embed">
        <p className="text-sm">
          Convert text (or images, audio) into a{" "}
          <strong>high-dimensional vector</strong> (e.g., 1536 floats) using an
          embedding model. Semantically similar content ends up near each other
          in this vector space.
        </p>
      </Card>
      <Card title="2. Index">
        <p className="text-sm">
          Store vectors in specialized indexes (<strong>HNSW</strong>,{" "}
          <strong>IVF</strong>) that enable fast approximate nearest neighbor
          (ANN) search. Brute-force search is O(n) — ANN indexes make it O(log
          n).
        </p>
      </Card>
      <Card title="3. Query">
        <p className="text-sm">
          Embed the query, then find the <strong>K nearest vectors</strong>{" "}
          using cosine similarity or Euclidean distance. Return the original
          documents attached to those vectors.
        </p>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["Database", "Type", "Best For"]}
      rows={[
        [
          "Pinecone",
          "Managed cloud-native",
          "Fastest setup, auto-scaling, serverless",
        ],
        [
          "pgvector",
          "PostgreSQL extension",
          "Already using Postgres, don't want a new DB",
        ],
        ["Weaviate", "Open-source, hybrid", "Combined vector + keyword search"],
        [
          "Qdrant",
          "Open-source, Rust-based",
          "High performance, filtering, on-prem",
        ],
        [
          "ChromaDB",
          "Open-source, lightweight",
          "Local development, prototyping, small datasets",
        ],
        [
          "Milvus",
          "Open-source, distributed",
          "Billion-scale datasets, enterprise",
        ],
      ]}
    />,
    <CodeBlock
      key="5"
      language="typescript"
      title="pgvector — Vector Search in PostgreSQL"
      code={`-- Enable the extension
CREATE EXTENSION vector;

-- Create a table with a vector column
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)  -- 1536-dimensional OpenAI embedding
);

-- Create an HNSW index for fast ANN search
CREATE INDEX ON documents
  USING hnsw (embedding vector_cosine_ops);

-- Find the 5 most similar documents to a query embedding
SELECT content, 1 - (embedding <=> $1) AS similarity
FROM documents
ORDER BY embedding <=> $1  -- <=> is cosine distance operator
LIMIT 5;`}
    />,
    <Callout key="6" type="tip" title="Hybrid Search: Best of Both Worlds">
      Pure vector search can miss exact keyword matches. Pure keyword search
      misses semantic meaning. <strong>Hybrid search</strong> combines both: use
      BM25 for keywords + vector similarity, then{" "}
      <strong>reciprocal rank fusion</strong> to merge results. This is the
      production standard for RAG applications.
    </Callout>,
  ],
};
