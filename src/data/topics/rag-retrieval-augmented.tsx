import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const ragTopic: Topic = {
  id: "rag-retrieval-augmented-generation",
  title: "RAG: Retrieval-Augmented Generation",
  description:
    "The pattern that gives LLMs access to YOUR data — retrieve relevant docs, inject them into the prompt, and generate grounded answers.",
  tags: ["ai", "llm", "rag", "architecture"],
  icon: "DatabaseZap",
  content: [
    <p key="1">
      LLMs are trained on public data with a{" "}
      <strong>knowledge cutoff date</strong>. They don't know your company's
      docs, your codebase, or yesterday's Jira tickets. <strong>RAG</strong>{" "}
      (Retrieval-Augmented Generation) fixes this by{" "}
      <strong>retrieving relevant documents</strong> at query time and injecting
      them into the prompt as context.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      How RAG Works
    </h4>,
    <Step key="3" index={1}>
      <strong>Index:</strong> Split your documents into chunks (~500 tokens
      each). Convert each chunk into a <strong>vector embedding</strong> using
      an embedding model (OpenAI, Cohere, local). Store in a{" "}
      <strong>vector database</strong> (Pinecone, pgvector, Weaviate).
    </Step>,
    <Step key="4" index={2}>
      <strong>Retrieve:</strong> When a user asks a question, embed the query
      into the same vector space. Find the{" "}
      <strong>top-K most similar chunks</strong> using cosine similarity or ANN
      search.
    </Step>,
    <Step key="5" index={3}>
      <strong>Augment:</strong> Insert the retrieved chunks into the LLM prompt:
      "Based on the following context: [chunks], answer the user's question:
      [query]".
    </Step>,
    <Step key="6" index={4}>
      <strong>Generate:</strong> The LLM generates an answer{" "}
      <strong>grounded in your actual documents</strong> — with citations
      pointing back to the source chunks.
    </Step>,
    <CodeBlock
      key="7"
      language="typescript"
      title="Simple RAG Pipeline"
      code={`// 1. Embed the user's question
const queryEmbedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: "What is our refund policy?"
});

// 2. Search vector DB for similar chunks
const results = await vectorDB.query({
  vector: queryEmbedding.data[0].embedding,
  topK: 5,
  includeMetadata: true
});

// 3. Build the augmented prompt
const context = results.matches.map(m => m.metadata.text).join("\\n");
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: \`Answer based ONLY on this context:\\n\${context}\` },
    { role: "user", content: "What is our refund policy?" },
  ],
});`}
    />,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <Card title="Chunking Strategies">
        <p className="text-sm">
          <strong>Fixed-size:</strong> 500 tokens with overlap. Simple but can
          split sentences. <strong>Semantic:</strong> Split by paragraph/section
          boundaries. <strong>Recursive:</strong> Try paragraphs, then
          sentences, then characters. Chunk size affects retrieval quality
          dramatically.
        </p>
      </Card>
      <Card title="RAG vs Fine-Tuning">
        <p className="text-sm">
          <strong>RAG:</strong> Real-time data access, no training needed, easy
          to update. Best for <em>knowledge retrieval</em>.{" "}
          <strong>Fine-Tuning:</strong> Changes model behavior/tone, expensive,
          stale after training. Best for <em>skill/style changes</em>. Use RAG
          first — fine-tune only if needed.
        </p>
      </Card>
    </Grid>,
    <Callout key="9" type="warning" title="RAG Failure Modes">
      <strong>1.</strong> Bad chunking → relevant info split across chunks.{" "}
      <strong>2.</strong> Wrong embeddings → irrelevant docs retrieved.{" "}
      <strong>3.</strong> Context window overflow → too many chunks stuffed into
      the prompt. <strong>4.</strong> The LLM ignores the context and
      hallucinate anyway. Always evaluate with{" "}
      <strong>retrieval precision and answer faithfulness</strong> metrics.
    </Callout>,
  ],
};
