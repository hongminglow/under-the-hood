import type { Section, Topic } from "@/data/types";

import { acidPropertiesTopic } from "@/data/topics/acid-properties";
import { apiRateLimitingTopic } from "@/data/topics/api-rate-limiting";
import { aspNetFrontendWorldTopic } from "@/data/topics/aspnet-frontend-world";
import { bloomFiltersTopic } from "@/data/topics/bloom-filters";
import { browserStorageTopic } from "@/data/topics/browser-storage";
import { cachingStrategiesTopic } from "@/data/topics/caching-strategies";
import { capTheoremTopic } from "@/data/topics/cap-theorem";
import { ciCdTopic } from "@/data/topics/ci-cd";
import { concurrencyParallelismTopic } from "@/data/topics/concurrency-parallelism";
import { consistentHashingTopic } from "@/data/topics/consistent-hashing";
import { cspTopic } from "@/data/topics/content-security-policy";
import { corsTopic } from "@/data/topics/cors";
import { databaseChoicesAtScaleTopic } from "@/data/topics/database-choices-at-scale";
import { databaseIndexingTopic } from "@/data/topics/database-indexing";
import { designPatternsTopic } from "@/data/topics/design-patterns";
import { dnsTopic } from "@/data/topics/dns";
import { dockerComposeVsKubernetesVsEksTopic } from "@/data/topics/docker-compose-vs-kubernetes-vs-eks";
import { dockerContainersTopic } from "@/data/topics/docker-containers";
import { dynamoDbDeepDiveTopic } from "@/data/topics/dynamodb-deep-dive";
import { frameworksVsVanillaJsTopic } from "@/data/topics/frameworks-vs-vanilla-js";
import { frontendFrameworksTopic } from "@/data/topics/frontend-frameworks";
import { garbageCollectionTopic } from "@/data/topics/garbage-collection";
import { gitInternalsTopic } from "@/data/topics/git-internals";
import { gitRebaseMergeSquashTopic } from "@/data/topics/git-rebase-merge-squash";
import { graphqlVsRestTopic } from "@/data/topics/graphql-vs-rest";
import { grpcVsRestTopic } from "@/data/topics/grpc-vs-rest";
import { httpEvolutionTopic } from "@/data/topics/http-evolution";
import { iacTopic } from "@/data/topics/iac-terraform-ansible";
import { jsEventLoopTopic } from "@/data/topics/js-event-loop";
import { jwtVsSessionTopic } from "@/data/topics/jwt-vs-session";
import { kubernetesTopic } from "@/data/topics/kubernetes-architecture";
import { loadBalancingTopic } from "@/data/topics/load-balancing";
import { messageQueuesTopic } from "@/data/topics/message-queues";
import { microservicesTopic } from "@/data/topics/microservices";
import { natAddressingTopic } from "@/data/topics/nat-addressing";
import { oauth2OidcTopic } from "@/data/topics/oauth2-oidc";
import { oopVsFpTopic } from "@/data/topics/oop-vs-fp";
import { passkeysWebauthnTopic } from "@/data/topics/passkeys-webauthn";
import { redisInMemoryTopic } from "@/data/topics/redis-in-memory";
import { renderingPipelineTopic } from "@/data/topics/rendering-pipeline";
import { rsaCryptographyTopic } from "@/data/topics/rsa-cryptography";
import { rustSystemsTopic } from "@/data/topics/rust-systems";
import { serverlessTopic } from "@/data/topics/serverless-computing";
import { sqlVsNosqlTopic } from "@/data/topics/sql-vs-nosql";
import { ssrVsCsrTopic } from "@/data/topics/ssr-vs-csr";
import { stackVsHeapTopic } from "@/data/topics/stack-vs-heap";
import { tcpIpTopic } from "@/data/topics/tcp-ip";
import { tcpVsUdpTopic } from "@/data/topics/tcp-vs-udp";
import { typescriptTypesTopic } from "@/data/topics/typescript-types";
import { viteVsWebpackTopic } from "@/data/topics/vite-vs-webpack";
import { webRequestLifecycleTopic } from "@/data/topics/web-request-lifecycle";
import { webSecurityTopic } from "@/data/topics/web-security";
import { webVitalsTopic } from "@/data/topics/web-vitals";
import { webassemblyTopic } from "@/data/topics/webassembly";
import { webhooksVsPollingTopic } from "@/data/topics/webhooks-vs-polling";
import { webRtcTopic } from "@/data/topics/webrtc";
import { websocketsTopic } from "@/data/topics/websockets";

// ── Batch 2 ───────────────────────────────────────────────────────────
import { idempotencyTopic } from "@/data/topics/api-idempotency";
import { bigOComplexityTopic } from "@/data/topics/big-o-complexity";
import { cdnUnderTheHoodTopic } from "@/data/topics/cdn-under-the-hood";
import { circuitBreakerTopic } from "@/data/topics/circuit-breaker-pattern";
import { closuresLexicalScopeTopic } from "@/data/topics/closures-lexical-scope";
import { databaseReplicationTopic } from "@/data/topics/database-replication";
import { databaseShardingTopic } from "@/data/topics/database-sharding";
import { dnsOverHttpsTopic } from "@/data/topics/dns-security-doh-dot";
import { eventDrivenArchitectureTopic } from "@/data/topics/event-driven-architecture";
import { hashTablesTopic } from "@/data/topics/hash-tables-internals";
import { monorepoVsPolyrepoTopic } from "@/data/topics/monorepo-vs-polyrepo";
import { observabilityTopic } from "@/data/topics/observability-monitoring";
import { processVsThreadTopic } from "@/data/topics/process-vs-thread-vs-coroutine";
import { promisesVsObservablesTopic } from "@/data/topics/promises-vs-observables";
import { proxyVsReverseProxyTopic } from "@/data/topics/proxy-vs-reverse-proxy";
import { reactFiberReconciliationTopic } from "@/data/topics/react-fiber-reconciliation";
import { restApiDesignTopic } from "@/data/topics/rest-api-design";
import { solidPrinciplesTopic } from "@/data/topics/solid-principles";
import { virtualDomVsSignalsTopic } from "@/data/topics/virtual-dom-vs-signals";
import { zeroTrustTopic } from "@/data/topics/zero-trust-architecture";

// ── Batch 3 (Fullstack & System Design) ──────────────────────────────
import { apiGatewayPatternTopic } from "@/data/topics/api-gateway-pattern";
import { backendEncryptionMethodsTopic } from "@/data/topics/backend-encryption-comparison";
import { connectionPoolingTopic } from "@/data/topics/connection-pooling";
import { cssBoxModelTopic } from "@/data/topics/css-box-model";
import { databaseLockingMvccTopic } from "@/data/topics/database-locking-mvcc";
import { databaseMigrationsTopic } from "@/data/topics/database-migrations";
import { dependencyInjectionTopic } from "@/data/topics/dependency-injection";
import { encodingEncryptionHashingTopic } from "@/data/topics/encoding-encryption-hashing";
import { envConfigTopic } from "@/data/topics/env-config-secrets";
import { errorHandlingTopic } from "@/data/topics/error-handling-patterns";
import { httpsTlsHandshakeTopic } from "@/data/topics/https-tls-handshake";
import { multithreadingDatabaseAccessTopic } from "@/data/topics/multithreading-database-access";
import { nPlusOneProblemTopic } from "@/data/topics/n-plus-one-problem";
import { paginationStrategiesTopic } from "@/data/topics/pagination-strategies";
import { prototypalInheritanceTopic } from "@/data/topics/prototypal-inheritance";
import { recursionCallStackTopic } from "@/data/topics/recursion-call-stack";
import { serviceWorkersPwaTopic } from "@/data/topics/service-workers-pwa";
import { sqlQueryOptimizationTopic } from "@/data/topics/sql-query-optimization";
import { stateManagementTopic } from "@/data/topics/state-management";
import { testingPyramidTopic } from "@/data/topics/testing-pyramid";
import { twelveFacorAppTopic } from "@/data/topics/twelve-factor-app";
import { webAccessibilityTopic } from "@/data/topics/web-accessibility";

// ── Batch 4 (AI & Frontend) ─────────────────────────────────────────
import { aiAgentsToolUseTopic } from "@/data/topics/ai-agents-tool-use";
import { awsServicesMappingTopic } from "@/data/topics/aws-services-mapping";
import { bTreeVsBPlusTreeTopic } from "@/data/topics/b-tree-vs-b-plus-tree";
import { codexVsSonnetTopic } from "@/data/topics/codex-vs-sonnet";
import { cssInJsVsUtilityTopic } from "@/data/topics/css-in-js-vs-utility";
import { cssSpecificityCascadeTopic } from "@/data/topics/css-specificity-cascade";
import { debounceVsThrottleTopic } from "@/data/topics/debounce-vs-throttle";
import { deploymentStrategiesTopic } from "@/data/topics/deployment-strategies";
import { agGridRenderingInternalsTopic } from "@/data/topics/ag-grid-rendering-internals";
import { frontendLargeDatasetTopic } from "@/data/topics/frontend-large-dataset-strategies";
import { domainRegistrarDnsHostingTopic } from "@/data/topics/domain-registrar-dns-hosting";
import { fullAppHostingDeploymentTopic } from "@/data/topics/full-app-hosting-deployment";
import { harnessEngineeringTopic } from "@/data/topics/harness-engineering";
import { howLlmsWorkTopic } from "@/data/topics/how-llms-work";
import { htmlEntitiesTopic } from "@/data/topics/html-entities";
import { htmlVsHtmxTopic } from "@/data/topics/html-vs-htmx";
import { jenkinsCicdDeepDiveTopic } from "@/data/topics/jenkins-cicd-deep-dive";
import { llmDistillationTrainingEconomicsTopic } from "@/data/topics/llm-distillation-training-economics";
import { llmWebVsIdeVsCliTopic } from "@/data/topics/llm-web-vs-ide-vs-cli";
import { microFrontendsTopic } from "@/data/topics/micro-frontends";
import { networkPayloadVulnerabilitiesTopic } from "@/data/topics/network-payload-vulnerabilities";
import { nginxUnderTheHoodTopic } from "@/data/topics/nginx-under-the-hood";
import { onlineMultiplayerArchitectureTopic } from "@/data/topics/online-multiplayer-architecture";
import { gameEnginesComparisonTopic } from "@/data/topics/game-engines-comparison";
import { realtimeCountersTopic } from "@/data/topics/realtime-counters";
import { sdlcMethodologiesTopic } from "@/data/topics/sdlc-methodologies";
import { paymentGatewayInternalsTopic } from "@/data/topics/payment-gateway-internals";
import { polyfillsDeepDiveTopic } from "@/data/topics/polyfills-deep-dive";
import { promptEngineeringTopic } from "@/data/topics/prompt-engineering";
import { ragRetrievalAugmentedTopic } from "@/data/topics/rag-retrieval-augmented";
import { reactServerComponentsTopic } from "@/data/topics/react-server-components";
import { sagaPatternTopic } from "@/data/topics/saga-pattern";
import { setintervalVsRequestanimationframeTopic } from "@/data/topics/setinterval-vs-requestanimationframe";
import { skillsVsMcpTopic } from "@/data/topics/skills-vs-mcp";
import { softwareTestingStrategiesTopic } from "@/data/topics/software-testing-strategies";
import { tauriUnderTheHoodTopic } from "@/data/topics/tauri-under-the-hood";
import { terminalsShellsKernelTopic } from "@/data/topics/terminals-shells-kernel";
import { vectorDatabasesEmbeddingsTopic } from "@/data/topics/vector-databases-embeddings";
import { vibeCodingAiPairProgrammingTopic } from "@/data/topics/vibe-coding-ai-pair-programming";
import { webComponentsShadowDomTopic } from "@/data/topics/web-components-shadow-dom";
import { moeArchitectureTopic } from "@/data/topics/moe-architecture";
import { llmQuantizationTopic } from "@/data/topics/llm-quantization";

// ── Batch 5 (Core Gaps) ──────────────────────────────────────────────
import { developerToolchainLayersTopic } from "@/data/topics/developer-toolchain-layers";
import { consensusRaftPaxosTopic } from "@/data/topics/consensus-raft-paxos";
import { raceConditionsDistributedLocksTopic } from "@/data/topics/race-conditions-distributed-locks";
import { domainDrivenDesignTopic } from "@/data/topics/domain-driven-design";
import { backpressureFlowControlTopic } from "@/data/topics/backpressure-flow-control";
import { dataSerializationFormatsTopic } from "@/data/topics/data-serialization-formats";
import { cqrsPatternTopic } from "@/data/topics/cqrs-pattern";

// ── Batch 6 ──────────────────────────────────────────────────────────
import { codeObfuscationTopic } from "@/data/topics/code-obfuscation";
import { reactTransitionsDeferredTopic } from "@/data/topics/react-transitions-deferred";
import { apiParadigmsComparisonTopic } from "@/data/topics/api-paradigms-comparison";

// Re-export types so we don't break existing imports relying on knowledge.tsx

export type { Section, Topic };

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
      realtimeCountersTopic,
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
      dnsOverHttpsTopic,
      encodingEncryptionHashingTopic,
      backendEncryptionMethodsTopic,
      networkPayloadVulnerabilitiesTopic,
      rsaCryptographyTopic,
      codeObfuscationTopic,
    ],
  },
  {
    id: "architecture",
    title: "Software Architecture",
    icon: "Cpu",
    topics: [
      rustSystemsTopic,
      dockerContainersTopic,
      apiParadigmsComparisonTopic,
      graphqlVsRestTopic,
      microservicesTopic,
      designPatternsTopic,
      messageQueuesTopic,
      cachingStrategiesTopic,
      serverlessTopic,
      sagaPatternTopic,
      consistentHashingTopic,
      restApiDesignTopic,
      circuitBreakerTopic,
      eventDrivenArchitectureTopic,
      idempotencyTopic,
      solidPrinciplesTopic,
      apiGatewayPatternTopic,
      dependencyInjectionTopic,
      paginationStrategiesTopic,
      tauriUnderTheHoodTopic,
      consensusRaftPaxosTopic,
      raceConditionsDistributedLocksTopic,
      domainDrivenDesignTopic,
      backpressureFlowControlTopic,
      dataSerializationFormatsTopic,
      cqrsPatternTopic,
      sdlcMethodologiesTopic,
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
      multithreadingDatabaseAccessTopic,
      databaseMigrationsTopic,
      databaseChoicesAtScaleTopic,
      dynamoDbDeepDiveTopic,
      bloomFiltersTopic,
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: "LayoutTemplate",
    topics: [
      aspNetFrontendWorldTopic,
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
      frontendLargeDatasetTopic,
      agGridRenderingInternalsTopic,
      debounceVsThrottleTopic,
      setintervalVsRequestanimationframeTopic,
      htmlVsHtmxTopic,
      webComponentsShadowDomTopic,
      cssInJsVsUtilityTopic,
      cssSpecificityCascadeTopic,
      polyfillsDeepDiveTopic,
      htmlEntitiesTopic,
      reactTransitionsDeferredTopic,
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
      developerToolchainLayersTopic,
    ],
  },
  {
    id: "devops",
    title: "DevOps & Tooling",
    icon: "GitMerge",
    topics: [
      ciCdTopic,
      jenkinsCicdDeepDiveTopic,
      gitInternalsTopic,
      gitRebaseMergeSquashTopic,
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
      terminalsShellsKernelTopic,
      nginxUnderTheHoodTopic,
      fullAppHostingDeploymentTopic,
      domainRegistrarDnsHostingTopic,
      awsServicesMappingTopic,
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
      moeArchitectureTopic,
      llmQuantizationTopic,
    ],
  },
  {
    id: "fintech",
    title: "Fintech & Payments",
    icon: "CreditCard",
    topics: [paymentGatewayInternalsTopic],
  },
  {
    id: "game-engineering",
    title: "Game Engineering",
    icon: "Gamepad2",
    topics: [onlineMultiplayerArchitectureTopic, gameEnginesComparisonTopic],
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
