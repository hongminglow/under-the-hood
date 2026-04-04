import type { Topic, Section } from "@/data/types";

import { tcpIpTopic } from "@/data/topics/tcp-ip";
import { dnsTopic } from "@/data/topics/dns";
import { natAddressingTopic } from "@/data/topics/nat-addressing";
import { webRequestLifecycleTopic } from "@/data/topics/web-request-lifecycle";
import { renderingPipelineTopic } from "@/data/topics/rendering-pipeline";
import { corsTopic } from "@/data/topics/cors";
import { rustSystemsTopic } from "@/data/topics/rust-systems";
import { sqlVsNosqlTopic } from "@/data/topics/sql-vs-nosql";
import { oauth2OidcTopic } from "@/data/topics/oauth2-oidc";
import { dockerContainersTopic } from "@/data/topics/docker-containers";
import { tcpVsUdpTopic } from "@/data/topics/tcp-vs-udp";
import { frontendFrameworksTopic } from "@/data/topics/frontend-frameworks";
import { frameworksVsVanillaJsTopic } from "@/data/topics/frameworks-vs-vanilla-js";
import { graphqlVsRestTopic } from "@/data/topics/graphql-vs-rest";
import { microservicesTopic } from "@/data/topics/microservices";
import { ciCdTopic } from "@/data/topics/ci-cd";
import { jsEventLoopTopic } from "@/data/topics/js-event-loop";
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
import { typescriptTypesTopic } from "@/data/topics/typescript-types";
import { messageQueuesTopic } from "@/data/topics/message-queues";
import { concurrencyParallelismTopic } from "@/data/topics/concurrency-parallelism";
import { apiRateLimitingTopic } from "@/data/topics/api-rate-limiting";
import { capTheoremTopic } from "@/data/topics/cap-theorem";
import { webhooksVsPollingTopic } from "@/data/topics/webhooks-vs-polling";
import { stackVsHeapTopic } from "@/data/topics/stack-vs-heap";
import { kubernetesTopic } from "@/data/topics/kubernetes-architecture";
import { dockerComposeVsKubernetesVsEksTopic } from "@/data/topics/docker-compose-vs-kubernetes-vs-eks";
import { webassemblyTopic } from "@/data/topics/webassembly";
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
import { redisInMemoryTopic } from "@/data/topics/redis-in-memory";
import { passkeysWebauthnTopic } from "@/data/topics/passkeys-webauthn";
import { consistentHashingTopic } from "@/data/topics/consistent-hashing";

// ── Batch 2 ───────────────────────────────────────────────────────────
import { databaseShardingTopic } from "@/data/topics/database-sharding";
import { databaseReplicationTopic } from "@/data/topics/database-replication";
import { monorepoVsPolyrepoTopic } from "@/data/topics/monorepo-vs-polyrepo";
import { restApiDesignTopic } from "@/data/topics/rest-api-design";
import { circuitBreakerTopic } from "@/data/topics/circuit-breaker-pattern";
import { eventDrivenArchitectureTopic } from "@/data/topics/event-driven-architecture";
import { zeroTrustTopic } from "@/data/topics/zero-trust-architecture";
import { closuresLexicalScopeTopic } from "@/data/topics/closures-lexical-scope";
import { promisesVsObservablesTopic } from "@/data/topics/promises-vs-observables";
import { bigOComplexityTopic } from "@/data/topics/big-o-complexity";
import { hashTablesTopic } from "@/data/topics/hash-tables-internals";
import { proxyVsReverseProxyTopic } from "@/data/topics/proxy-vs-reverse-proxy";
import { cdnUnderTheHoodTopic } from "@/data/topics/cdn-under-the-hood";
import { reactFiberReconciliationTopic } from "@/data/topics/react-fiber-reconciliation";
import { virtualDomVsSignalsTopic } from "@/data/topics/virtual-dom-vs-signals";
import { idempotencyTopic } from "@/data/topics/api-idempotency";
import { processVsThreadTopic } from "@/data/topics/process-vs-thread-vs-coroutine";
import { monolithVsMicroservicesTopic } from "@/data/topics/monolith-vs-microservices";
import { monolithVsMonorepoVsMicrofrontendsTopic } from "@/data/topics/monolith-vs-monorepo-vs-microfrontends";
import { oauthFlowsTopic } from "@/data/topics/oauth2-flows-deep-dive";
import { dnsOverHttpsTopic } from "@/data/topics/dns-security-doh-dot";
import { solidPrinciplesTopic } from "@/data/topics/solid-principles";
import { observabilityTopic } from "@/data/topics/observability-monitoring";

// ── Batch 3 (Fullstack & System Design) ──────────────────────────────
import { apiGatewayPatternTopic } from "@/data/topics/api-gateway-pattern";
import { connectionPoolingTopic } from "@/data/topics/connection-pooling";
import { sqlQueryOptimizationTopic } from "@/data/topics/sql-query-optimization";
import { nPlusOneProblemTopic } from "@/data/topics/n-plus-one-problem";
import { httpsTlsHandshakeTopic } from "@/data/topics/https-tls-handshake";
import { stateManagementTopic } from "@/data/topics/state-management";
import { cssBoxModelTopic } from "@/data/topics/css-box-model";
import { serviceWorkersPwaTopic } from "@/data/topics/service-workers-pwa";
import { prototypalInheritanceTopic } from "@/data/topics/prototypal-inheritance";
import { dependencyInjectionTopic } from "@/data/topics/dependency-injection";
import { twelveFacorAppTopic } from "@/data/topics/twelve-factor-app";
import { testingPyramidTopic } from "@/data/topics/testing-pyramid";
import { encodingEncryptionHashingTopic } from "@/data/topics/encoding-encryption-hashing";
import { backendEncryptionMethodsTopic } from "@/data/topics/backend-encryption-comparison";
import { webAccessibilityTopic } from "@/data/topics/web-accessibility";
import { errorHandlingTopic } from "@/data/topics/error-handling-patterns";
import { paginationStrategiesTopic } from "@/data/topics/pagination-strategies";
import { envConfigTopic } from "@/data/topics/env-config-secrets";
import { databaseMigrationsTopic } from "@/data/topics/database-migrations";
import { databaseLockingMvccTopic } from "@/data/topics/database-locking-mvcc";
import { recursionCallStackTopic } from "@/data/topics/recursion-call-stack";

// ── Batch 4 (AI & Frontend) ─────────────────────────────────────────
import { howLlmsWorkTopic } from "@/data/topics/how-llms-work";
import { ragRetrievalAugmentedTopic } from "@/data/topics/rag-retrieval-augmented";
import { aiAgentsToolUseTopic } from "@/data/topics/ai-agents-tool-use";
import { promptEngineeringTopic } from "@/data/topics/prompt-engineering";
import { vectorDatabasesEmbeddingsTopic } from "@/data/topics/vector-databases-embeddings";
import { reactServerComponentsTopic } from "@/data/topics/react-server-components";
import { microFrontendsTopic } from "@/data/topics/micro-frontends";
import { debounceVsThrottleTopic } from "@/data/topics/debounce-vs-throttle";
import { setintervalVsRequestanimationframeTopic } from "@/data/topics/setinterval-vs-requestanimationframe";
import { webComponentsShadowDomTopic } from "@/data/topics/web-components-shadow-dom";
import { sseVsWebsocketTopic } from "@/data/topics/sse-vs-websocket";
import { cssInJsVsUtilityTopic } from "@/data/topics/css-in-js-vs-utility";
import { htmlVsHtmxTopic } from "@/data/topics/html-vs-htmx";
import { tauriUnderTheHoodTopic } from "@/data/topics/tauri-under-the-hood";
import { sagaPatternTopic } from "@/data/topics/saga-pattern";
import { bTreeVsBPlusTreeTopic } from "@/data/topics/b-tree-vs-b-plus-tree";
import { deploymentStrategiesTopic } from "@/data/topics/deployment-strategies";
import { softwareTestingStrategiesTopic } from "@/data/topics/software-testing-strategies";
import { networkPayloadVulnerabilitiesTopic } from "@/data/topics/network-payload-vulnerabilities";
import { codexVsSonnetTopic } from "@/data/topics/codex-vs-sonnet";
import { nginxUnderTheHoodTopic } from "@/data/topics/nginx-under-the-hood";
import { llmWebVsIdeVsCliTopic } from "@/data/topics/llm-web-vs-ide-vs-cli";
import { skillsVsMcpTopic } from "@/data/topics/skills-vs-mcp";
import { vibeCodingAiPairProgrammingTopic } from "@/data/topics/vibe-coding-ai-pair-programming";
import { fullAppHostingDeploymentTopic } from "@/data/topics/full-app-hosting-deployment";
import { llmDistillationTrainingEconomicsTopic } from "@/data/topics/llm-distillation-training-economics";
import { harnessEngineeringTopic } from "@/data/topics/harness-engineering";

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
      webhooksVsPollingTopic,
      webRtcTopic,
      grpcVsRestTopic,
      proxyVsReverseProxyTopic,
      cdnUnderTheHoodTopic,
      httpsTlsHandshakeTopic,
      sseVsWebsocketTopic,
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
      oauth2OidcTopic,
      jwtVsSessionTopic,
      webSecurityTopic,
      apiRateLimitingTopic,
      cspTopic,
      passkeysWebauthnTopic,
      zeroTrustTopic,
      oauthFlowsTopic,
      dnsOverHttpsTopic,
      encodingEncryptionHashingTopic,
      backendEncryptionMethodsTopic,
      networkPayloadVulnerabilitiesTopic,
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
      sagaPatternTopic,
      distributedTransactionsTopic,
      consistentHashingTopic,
      restApiDesignTopic,
      circuitBreakerTopic,
      eventDrivenArchitectureTopic,
      idempotencyTopic,
      monolithVsMicroservicesTopic,
      monolithVsMonorepoVsMicrofrontendsTopic,
      solidPrinciplesTopic,
      apiGatewayPatternTopic,
      dependencyInjectionTopic,
      paginationStrategiesTopic,
      tauriUnderTheHoodTopic,
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
      bTreeVsBPlusTreeTopic,
      acidPropertiesTopic,
      redisInMemoryTopic,
      databaseShardingTopic,
      databaseReplicationTopic,
      connectionPoolingTopic,
      sqlQueryOptimizationTopic,
      nPlusOneProblemTopic,
      databaseLockingMvccTopic,
      databaseMigrationsTopic,
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: "LayoutTemplate",
    topics: [
      frontendFrameworksTopic,
      frameworksVsVanillaJsTopic,
      ssrVsCsrTopic,
      webassemblyTopic,
      browserStorageTopic,
      viteVsWebpackTopic,
      webVitalsTopic,
      reactFiberReconciliationTopic,
      virtualDomVsSignalsTopic,
      stateManagementTopic,
      cssBoxModelTopic,
      serviceWorkersPwaTopic,
      webAccessibilityTopic,
      reactServerComponentsTopic,
      microFrontendsTopic,
      debounceVsThrottleTopic,
      setintervalVsRequestanimationframeTopic,
      htmlVsHtmxTopic,
      webComponentsShadowDomTopic,
      cssInJsVsUtilityTopic,
    ],
  },
  {
    id: "programming",
    title: "Core Programming",
    icon: "Code2",
    topics: [
      jsEventLoopTopic,
      garbageCollectionTopic,
      typescriptTypesTopic,
      concurrencyParallelismTopic,
      stackVsHeapTopic,
      oopVsFpTopic,
      closuresLexicalScopeTopic,
      promisesVsObservablesTopic,
      bigOComplexityTopic,
      hashTablesTopic,
      processVsThreadTopic,
      prototypalInheritanceTopic,
      errorHandlingTopic,
      recursionCallStackTopic,
    ],
  },
  {
    id: "devops",
    title: "DevOps & Tooling",
    icon: "GitMerge",
    topics: [
      ciCdTopic,
      gitInternalsTopic,
      kubernetesTopic,
      dockerComposeVsKubernetesVsEksTopic,
      iacTopic,
      monorepoVsPolyrepoTopic,
      observabilityTopic,
      twelveFacorAppTopic,
      testingPyramidTopic,
      envConfigTopic,
      deploymentStrategiesTopic,
      softwareTestingStrategiesTopic,
      nginxUnderTheHoodTopic,
      fullAppHostingDeploymentTopic,
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: "Brain",
    topics: [
      howLlmsWorkTopic,
      ragRetrievalAugmentedTopic,
      aiAgentsToolUseTopic,
      promptEngineeringTopic,
      vectorDatabasesEmbeddingsTopic,
      codexVsSonnetTopic,
      llmWebVsIdeVsCliTopic,
      skillsVsMcpTopic,
      harnessEngineeringTopic,
      vibeCodingAiPairProgrammingTopic,
      llmDistillationTrainingEconomicsTopic,
    ],
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
