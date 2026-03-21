import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";

export const ragRetrievalAugmentedTopic: Topic = {
  id: "rag-retrieval-augmented",
  title: "RAG (Retrieval-Augmented Generation)",
  description:
    "How to physically prevent a confident LLM from brutally hallucinating facts by forcefully handing it a textbook before it answers.",
  tags: ["ai", "architecture", "backend"],
  icon: "Database",
  content: [
    <p key="1">
      Retrieval-Augmented Generation (RAG) is the industry standard for grounding LLMs in factual, private, or real-time data. It treats the LLM as a <strong>Reasoning Engine</strong> rather than a Knowledge Store, providing it with a temporary 'Open Book' of relevant documents.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      RAG vs. Fine-Tuning
    </h3>,
    <Table
      key="3"
      headers={["Feature", "RAG (Retrieval)", "Fine-Tuning (Training)"]}
      rows={[
        ["Data Freshness", "Real-time (updated in seconds).", "Static (model is 'frozen' at training)."],
        ["Cost", "Low (API calls + Vector DB).", "High (GPU compute + Labeling)."],
        ["Transparency", "High (provides source citations).", "Low (Black box 'internal' memory)."],
        ["Purpose", "Retrieving specific facts.", "Learning a new style or domain vocabulary."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Advanced Retrieval Techniques
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="Semantic Chunking">
        <p className="text-sm text-muted-foreground mb-2">
          Don't just split text every 500 characters.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Use the embedding model to find where the <strong>meaning</strong> changes. This ensures that a paragraph isn't cut in half, preserving context for the LLM.
        </p>
      </Card>
      <Card title="HyDE (Hypothetical Doc)">
        <p className="text-sm text-muted-foreground mb-2">
          Improve search by 'Hallucinating' first.
        </p>
        <p className="text-xs italic text-muted-foreground">
          The LLM generates a <strong>fake answer</strong> to the user's question, then we embed that fake answer to search for similar REAL documents. This bridges the 'Question vs. Answer' embedding gap.
        </p>
      </Card>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The Precision Layer: Re-ranking
    </h3>,
    <p key="7" className="mb-4">
      Vector search (Cosine Similarity) is fast but slightly 'fuzzy'. To ensure the LLM gets the <em>best</em> facts, we use a <strong>Cross-Encoder Re-ranker</strong> (like Cohere Rerank) to deeply compare the top 20 retrieved results and select the top 5 with surgical precision.
    </p>,
    <Callout key="8" type="tip" title="Token Constraints">
      LLMs have a finite <strong>Context Window</strong>. If you inject 50 chunks, the model might 'get lost in the middle' and ignore the most relevant facts. Always prioritize <strong>Quality (Re-ranking)</strong> over <strong>Quantity (Large context)</strong>.
    </Callout>,
  ],
};
