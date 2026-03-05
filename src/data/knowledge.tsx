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
    topics: [corsTopic, oauthOidcTopic, jwtVsSessionTopic],
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
    ],
  },
  {
    id: "databases",
    title: "Databases & Storage",
    icon: "Database",
    topics: [sqlVsNosqlTopic],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: "LayoutTemplate",
    topics: [frontendFrameworksTopic],
  },
  {
    id: "programming",
    title: "Core Programming",
    icon: "Code2",
    topics: [eventLoopTopic, garbageCollectionTopic],
  },
  {
    id: "devops",
    title: "DevOps & Tooling",
    icon: "GitMerge",
    topics: [ciCdTopic],
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
