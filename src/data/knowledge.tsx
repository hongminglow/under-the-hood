import type { Topic, Section } from "@/data/types";

import { tcpIpTopic } from "@/data/topics/tcp-ip";
import { dnsTopic } from "@/data/topics/dns";
import { natAddressingTopic } from "@/data/topics/nat-addressing";
import { webRequestLifecycleTopic } from "@/data/topics/web-request-lifecycle";
import { renderingPipelineTopic } from "@/data/topics/rendering-pipeline";
import { corsTopic } from "@/data/topics/cors";
import { rustSystemsTopic } from "@/data/topics/rust-systems";

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
    title: "Security",
    icon: "ShieldAlert",
    topics: [corsTopic],
  },
  {
    id: "architecture",
    title: "Software Architecture",
    icon: "Cpu",
    topics: [rustSystemsTopic],
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
