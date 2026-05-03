import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Flow } from "@/components/ui/Flow";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { Scissors, WandSparkles, Network } from "lucide-react";

export const ragRetrievalAugmentedTopic: Topic = {
  id: "rag-retrieval-augmented",
  title: "RAG (Retrieval-Augmented Generation)",
  description:
    "How to physically prevent a confident LLM from brutally hallucinating facts by forcefully handing it a textbook before it answers.",
  tags: ["rag", "ai", "architecture", "backend"],
  icon: "Database",
  content: [
    <p key="1" className="text-slate-300 mb-6">
      Retrieval-Augmented Generation (RAG) is the industry standard for
      grounding LLMs in factual, private, or real-time data. It treats the LLM
      as a <strong>Reasoning Engine</strong> rather than a Knowledge Store,
      providing it with a temporary 'Open Book' of relevant documents.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      RAG vs Fine-Tuning
    </h3>,
    <Table
      key="3"
      headers={["Feature", "RAG (Retrieval)", "Fine-Tuning (Training)"]}
      rows={[
        [
          "Data Freshness",
          "Real-time (updated in seconds).",
          "Static (model is 'frozen' at training).",
        ],
        [
          "Cost",
          "Low (API calls + Vector DB).",
          "High (GPU compute + Labeling).",
        ],
        [
          "Transparency",
          "High (provides source citations).",
          "Low (Black box 'internal' memory).",
        ],
        [
          "Purpose",
          "Retrieving specific facts.",
          "Learning a new style or domain vocabulary.",
        ],
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Advanced Retrieval Techniques
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <FeatureCard
        icon={Scissors}
        title="Semantic Chunking"
        subtitle="Split where meaning changes"
        theme="cyan"
      >
        <p className="text-sm text-cyan-100/75 mb-2">
          Don't just split text every 500 characters.
        </p>
        <p className="text-xs italic text-cyan-200/70">
          Use the embedding model to find where the <strong>meaning</strong>{" "}
          changes. This ensures that a paragraph isn't cut in half, preserving
          context for the LLM.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={WandSparkles}
        title="HyDE (Hypothetical Doc)"
        subtitle="Search by generating a fake answer first"
        theme="violet"
      >
        <p className="text-sm text-violet-100/75 mb-2">
          Improve search by 'Hallucinating' first.
        </p>
        <p className="text-xs italic text-violet-200/70">
          The LLM generates a <strong>fake answer</strong> to the user's
          question, then we embed that fake answer to search for similar REAL
          documents. This bridges the 'Question vs. Answer' embedding gap.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Network}
        title="GraphRAG"
        subtitle="Knowledge Graphs + Vector Search"
        theme="fuchsia"
      >
        <p className="text-sm text-fuchsia-100/75 mb-2">
          Understand relationships, not just text similarity.
        </p>
        <p className="text-xs italic text-fuchsia-200/70">
          Instead of just fetching text chunks, GraphRAG extracts entities
          (Nodes) and relationships (Edges). This allows the LLM to answer
          complex multi-hop questions like{" "}
          <em>"Who is the CEO of the company that acquired X?"</em>
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The Precision Layer: Re-ranking
    </h3>,
    <p key="7" className="text-slate-300 mb-4">
      Vector search (Cosine Similarity) is fast but slightly 'fuzzy'. To ensure
      the LLM gets the <em>best</em> facts, we use a{" "}
      <strong>Cross-Encoder Re-ranker</strong> (like Cohere Rerank) to deeply
      compare the top 20 retrieved results and select the top 5 with surgical
      precision.
    </p>,
    <Callout key="8" type="tip" title="Token Constraints">
      LLMs have a finite <strong>Context Window</strong>. If you inject 50
      chunks, the model might 'get lost in the middle' and ignore the most
      relevant facts. Always prioritize <strong>Quality (Re-ranking)</strong>{" "}
      over <strong>Quantity (Large context)</strong>.
    </Callout>,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Agentic RAG: From Pipeline to Tool
    </h3>,
    <p key="10" className="text-slate-300 mb-6">
      Traditional RAG is a linear pipeline (Embed &rarr; Search &rarr;
      Generate). <strong>Agentic RAG</strong> gives the LLM autonomy to use
      retrieval as a tool. The agent can decide if it needs external knowledge,
      formulate optimized search queries, and evaluate if the retrieved context
      is sufficient before answering.
    </p>,
    <Flow
      key="11"
      steps={[
        {
          title: "1. Query Analysis",
          description:
            "Agent decides if external knowledge is required to answer the prompt.",
        },
        {
          title: "2. Query Formulation",
          description:
            "Agent rewrites the user's prompt into one or more optimized search queries.",
        },
        {
          title: "3. Retrieval & Tool Call",
          description:
            "The retrieval system fetches chunks from the Vector DB based on the rewritten queries.",
        },
        {
          title: "4. Context Evaluation",
          description:
            "Agent reads the chunks. If insufficient, it loops back to step 2 with a new strategy.",
        },
        {
          title: "5. Generation",
          description:
            "Once satisfied with the context, the agent generates the final response.",
        },
      ]}
    />,
    <h3 key="12" className="text-xl font-bold mt-8 mb-4">
      Common RAG Pitfalls
    </h3>,
    <Grid key="13" cols={2} gap={6}>
      <MistakeCard
        number={1}
        title="Garbage In, Garbage Out"
        problem="LLM hallucinates or gives wrong answers despite having RAG attached."
        solution="Clean your data before embedding. Remove boilerplate (headers, footers, navbars) from HTML/PDFs. Vector search will happily return boilerplate if it matches a keyword, confusing the LLM."
      />
      <MistakeCard
        number={2}
        title="Lost in the Middle"
        problem="LLM ignores highly relevant facts because they were buried in chunk #25 out of 50."
        solution="Use a Cross-Encoder to Re-rank results and only pass the top 5-7 highly relevant chunks. LLMs pay the most attention to the beginning and end of their context window."
      />
    </Grid>,
  ],
};
