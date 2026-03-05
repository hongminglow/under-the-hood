import type { Topic, Section } from "@/data/types";

import { tcpIpTopic } from "@/data/topics/tcp-ip";
import { dnsTopic } from "@/data/topics/dns";
import { natAddressingTopic } from "@/data/topics/nat-addressing";
import { webRequestLifecycleTopic } from "@/data/topics/web-request-lifecycle";
import { renderingPipelineTopic } from "@/data/topics/rendering-pipeline";
import { corsTopic } from "@/data/topics/cors";
import { rustSystemsTopic } from "@/data/topics/rust-systems";
import { sqlVsNosqlTopic } from "@/data/topics/sql-vs-nosql";
import { oauthOidcTopic } from "@/data/topics/oauth2-oidc";
import { dockerContainersTopic } from "@/data/topics/docker-containers";
import { tcpVsUdpTopic } from "@/data/topics/tcp-vs-udp";
import { frontendFrameworksTopic } from "@/data/topics/frontend-frameworks";
import { graphqlVsRestTopic } from "@/data/topics/graphql-vs-rest";
import { microservicesTopic } from "@/data/topics/microservices";
import { ciCdTopic } from "@/data/topics/ci-cd";
import { eventLoopTopic } from "@/data/topics/js-event-loop";
import { websocketsTopic } from "@/data/topics/websockets";
import { jwtVsSessionTopic } from "@/data/topics/jwt-vs-session";
import { loadBalancingTopic } from "@/data/topics/load-balancing";
import { garbageCollectionTopic } from "@/data/topics/garbage-collection";
import { httpEvolutionTopic } from "@/data/topics/http-evolution";
import { cachingStrategiesTopic } from "@/data/topics/caching-strategies";
import { webSecurityTopic } from "@/data/topics/web-security";
import { ssrVsCsrTopic } from "@/data/topics/ssr-vs-csr";
import { designPatternsTopic } from "@/data/topics/design-patterns";
import { gitInternalsTopic } from "@/data/topics/git-internals";
import { typescriptTypeTopic } from "@/data/topics/typescript-types";
import { messageQueuesTopic } from "@/data/topics/message-queues";
import { concurrencyParallelismTopic } from "@/data/topics/concurrency-parallelism";
import { apiRateLimitingTopic } from "@/data/topics/api-rate-limiting";
import { capTheoremTopic } from "@/data/topics/cap-theorem";
import { webhooksTopic } from "@/data/topics/webhooks-vs-polling";
import { stackVsHeapTopic } from "@/data/topics/stack-vs-heap";
import { kubernetesTopic } from "@/data/topics/kubernetes-architecture";
import { webAssemblyTopic } from "@/data/topics/webassembly";
import { serverlessTopic } from "@/data/topics/serverless-computing";
import { cspTopic } from "@/data/topics/content-security-policy";
import { iacTopic } from "@/data/topics/iac-terraform-ansible";
import { oopVsFpTopic } from "@/data/topics/oop-vs-fp";
import { databaseIndexingTopic } from "@/data/topics/database-indexing";
import { browserStorageTopic } from "@/data/topics/browser-storage";
import { viteVsWebpackTopic } from "@/data/topics/vite-vs-webpack";
import { webRtcTopic } from "@/data/topics/webrtc";
import { webVitalsTopic } from "@/data/topics/web-vitals";
import { grpcVsRestTopic } from "@/data/topics/grpc-vs-rest";
import { acidPropertiesTopic } from "@/data/topics/acid-properties";
import { distributedTransactionsTopic } from "@/data/topics/distributed-transactions";
import { redisTopic } from "@/data/topics/redis-in-memory";
import { passkeysTopic } from "@/data/topics/passkeys-webauthn";
import { consistentHashingTopic } from "@/data/topics/consistent-hashing";

// Re-export types so we don't break existing imports relying on knowledge.tsx
export type { Topic, Section };

export const knowledgeBase: Section[] = [
  {
    id: "networking",
    title: "Networking",
    icon: "Network",
    topics: [
      tcpIpTopic,
      dnsTopic,
      natAddressingTopic,
      webRequestLifecycleTopic,
      tcpVsUdpTopic,
      websocketsTopic,
      loadBalancingTopic,
      httpEvolutionTopic,
      webhooksTopic,
      webRtcTopic,
      grpcVsRestTopic,
    ],
  },
  {
    id: "browser",
    title: "Browser Engine",
    icon: "Globe",
    topics: [renderingPipelineTopic],
  },
  {
    id: "security",
    title: "Security & Auth",
    icon: "ShieldAlert",
    topics: [
      corsTopic,
      oauthOidcTopic,
      jwtVsSessionTopic,
      webSecurityTopic,
      apiRateLimitingTopic,
      cspTopic,
      passkeysTopic,
    ],
  },
  {
    id: "architecture",
    title: "Software Architecture",
    icon: "Cpu",
    topics: [
      rustSystemsTopic,
      dockerContainersTopic,
      graphqlVsRestTopic,
      microservicesTopic,
      designPatternsTopic,
      messageQueuesTopic,
      cachingStrategiesTopic,
      serverlessTopic,
      distributedTransactionsTopic,
      consistentHashingTopic,
    ],
  },
  {
    id: "databases",
    title: "Databases & Storage",
    icon: "Database",
    topics: [
      sqlVsNosqlTopic,
      capTheoremTopic,
      databaseIndexingTopic,
      acidPropertiesTopic,
      redisTopic,
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: "LayoutTemplate",
    topics: [
      frontendFrameworksTopic,
      ssrVsCsrTopic,
      webAssemblyTopic,
      browserStorageTopic,
      viteVsWebpackTopic,
      webVitalsTopic,
    ],
  },
  {
    id: "programming",
    title: "Core Programming",
    icon: "Code2",
    topics: [
      eventLoopTopic,
      garbageCollectionTopic,
      typescriptTypeTopic,
      concurrencyParallelismTopic,
      stackVsHeapTopic,
      oopVsFpTopic,
    ],
  },
  {
    id: "devops",
    title: "DevOps & Tooling",
    icon: "GitMerge",
    topics: [ciCdTopic, gitInternalsTopic, kubernetesTopic, iacTopic],
  },
];

export function getAllTopics(): Topic[] {
  return knowledgeBase.flatMap((section) => section.topics);
}

export function getTopicById(id: string): Topic | undefined {
  for (const section of knowledgeBase) {
    const topic = section.topics.find((t) => t.id === id);
    if (topic) return topic;
  }
  return undefined;
}

export function getSectionByTopicId(topicId: string): Section | undefined {
  return knowledgeBase.find((section) =>
    section.topics.some((t) => t.id === topicId),
  );
}
