import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Blocks, Network } from "lucide-react";

export const consensusRaftPaxosTopic: Topic = {
  id: "consensus-raft-paxos",
  title: "Consensus Algorithms (Raft & Paxos)",
  description:
    "How do 5 machines on different continents agree on the same value when any of them could crash at any moment?",
  tags: ["distributed-systems", "architecture", "database", "backend"],
  icon: "GitMerge",
  content: [
    <p key="1">
      You have a 5-node database cluster. A client writes <code>balance = 500</code> to Node A. Before Node A can replicate this to the others, it crashes. Nodes B through E still think <code>balance = 0</code>. When Node A recovers, who is right? <strong>Consensus algorithms</strong> solve this — they are the mathematical foundation that allows distributed systems to agree on a single source of truth even when nodes fail, networks partition, or messages arrive out of order.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Problem: Split Brain
    </h3>,
    <p key="2a" className="mb-4">
      Without consensus, a network partition can create <strong>Split Brain</strong> — two halves of a cluster both believe they are the leader and accept conflicting writes. Consensus algorithms prevent this by requiring a <strong>Quorum</strong> (a majority of nodes) to agree before any write is committed.
    </p>,
    <Callout key="2b" type="info" title="The Quorum Rule">
      In a cluster of N nodes, a quorum requires <strong>⌊N/2⌋ + 1</strong> votes. For 5 nodes, that's 3. This means the cluster can tolerate up to 2 node failures and still make progress. This is why production clusters almost always use <strong>odd numbers</strong> (3, 5, 7) — even numbers waste a node without improving fault tolerance.
    </Callout>,

    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      Raft: The Understandable Consensus
    </h3>,
    <p key="3a" className="mb-4">
      Raft was designed in 2014 specifically because Paxos was too difficult for engineers to implement correctly. It decomposes consensus into three clean sub-problems: <strong>Leader Election</strong>, <strong>Log Replication</strong>, and <strong>Safety</strong>.
    </p>,
    <Flow key="4" steps={[
      { title: "1. Leader Election", description: "Nodes start as Followers. If a Follower receives no heartbeat from a Leader within a random timeout, it becomes a Candidate and requests votes. The first Candidate to receive a quorum of votes becomes the new Leader." },
      { title: "2. Log Replication", description: "All client writes go to the Leader. The Leader appends the entry to its log and replicates it to all Followers. Once a quorum of Followers acknowledges the entry, the Leader commits it." },
      { title: "3. Commitment", description: "The Leader notifies all Followers that the entry is committed. Followers apply it to their state machines. The client receives a success response." },
      { title: "4. Leader Failure", description: "If the Leader crashes, Followers detect the missing heartbeat and trigger a new election. The cluster is unavailable for a brief moment (~150ms) during the election." }
    ]} />,

    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Raft vs. Paxos
    </h3>,
    <Table
      key="6"
      headers={["Aspect", "Paxos (Lamport, 1989)", "Raft (Ongaro, 2014)"]}
      rows={[
        ["Understandability", "Notoriously difficult. Papers are abstract and mathematical.", "Designed for clarity. The paper includes a visual state diagram."],
        ["Leader", "Multi-leader capable. Any node can propose values.", "Strict single leader. All writes flow through the elected leader."],
        ["Log Ordering", "Does not guarantee log ordering natively.", "Guarantees strict log ordering by design."],
        ["Real-World Use", "Google Chubby, Apache Zookeeper.", "etcd (Kubernetes), CockroachDB, Consul, TiKV."],
        ["Implementation", "Extremely error-prone. Google reported years of bugs.", "Substantially easier. Many production-grade open-source implementations exist."]
      ]}
    />,

    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Where You See Consensus Every Day
    </h3>,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Blocks} title="Kubernetes (etcd)" subtitle="Raft-backed control plane" theme="cyan">
        <p className="text-sm text-cyan-100/75">
          Every <code>kubectl apply</code> writes to <strong>etcd</strong>, a Raft-based key-value store. The entire cluster state (pods, services, secrets) is consensus-replicated across 3-5 etcd nodes. If etcd loses quorum, <strong>your entire Kubernetes cluster freezes</strong>.
        </p>
      </FeatureCard>
      <FeatureCard icon={Network} title="Kafka (Leader Election)" subtitle="Consensus selects the writer" theme="indigo">
        <p className="text-sm text-indigo-100/75">
          Each Kafka partition has a <strong>Leader Replica</strong>. When a broker crashes, the controller uses a consensus mechanism (now KRaft, replacing ZooKeeper) to elect a new partition leader. During election, that partition is temporarily unavailable for writes.
        </p>
      </FeatureCard>
    </Grid>,

    <Callout key="9" type="warning" title="Consensus ≠ Broadcast">
      Consensus is NOT the same as "send a message to all nodes." Broadcasting can lose messages, deliver them out of order, or create duplicates. Consensus guarantees that once a value is committed, <strong>all nodes will eventually agree on the same value in the same order</strong>, even if some nodes were temporarily offline. This is a fundamentally harder problem.
    </Callout>,
  ],
};
