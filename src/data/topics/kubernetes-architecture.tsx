import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const kubernetesTopic: Topic = {
	id: "kubernetes-architecture",
	title: "Kubernetes (K8s) Architecture",
	description:
		"The open-source container orchestration platform that abstracted away the entire concept of physical servers.",
	tags: ["devops", "cloud", "containers"],
	icon: "Ship",
	content: [
		<p key="1">
			Docker standardized how we package applications into containers. But if you have 5,000 containers running across
			100 servers, how do you manage which containers run on which server? How do you load balance? How do you replace a
			server if it catches fire? That is the job of <strong>Kubernetes</strong>.
		</p>,
		<h4 key="2" className="text-xl font-bold mt-8 mb-4">
			The Control Plane (The Brain)
		</h4>,
		<p key="3">The master node that makes global decisions and reacts to cluster events.</p>,
		<Grid key="4" cols={2} gap={6} className="my-4 mb-8">
			<Card title="kube-apiserver">
				<p className="text-sm text-muted-foreground">
					The front-end of the cluster. Every command (`kubectl`) interacts with this REST API. It is the only component
					that talks to `etcd`.
				</p>
			</Card>
			<Card title="etcd">
				<p className="text-sm text-muted-foreground">
					A highly-available, distributed key-value store. It contains the absolute source of truth for the entire
					cluster's state.
				</p>
			</Card>
			<Card title="kube-scheduler">
				<p className="text-sm text-muted-foreground">
					Watches for newly created Pods that have no assigned node, and selects a worker node for them to run on based
					on resource requirements.
				</p>
			</Card>
			<Card title="kube-controller-manager">
				<p className="text-sm text-muted-foreground">
					Runs controller processes (e.g., Node controller, ReplicaSet controller). It constantly compares current state
					to the desired state and attempts to reconcile them.
				</p>
			</Card>
		</Grid>,
		<h4 key="5" className="text-xl font-bold mt-8 mb-4">
			The Worker Nodes (The Muscle)
		</h4>,
		<p key="6">The machines (VMs or bare metal) that actually run your application workloads.</p>,
		<Grid key="7" cols={2} gap={6} className="my-4 mb-8">
			<Card title="Kubelet">
				<p className="text-sm text-muted-foreground">
					An agent that runs on every node. It ensures that containers are running and healthy exactly as described by
					the Control Plane.
				</p>
			</Card>
			<Card title="Kube-proxy">
				<p className="text-sm text-muted-foreground">
					A network proxy running on each node establishing networking rules, enabling communication across pods and to
					the outside world.
				</p>
			</Card>
		</Grid>,
		<Callout key="8" type="info" title="The Pod: The Smallest Unit">
			Kubernetes does not run containers directly; it wraps them in a higher-level construct called a{" "}
			<strong>Pod</strong>. A Pod encapsulates one or more tightly-coupled containers that share the exact same IP
			address, port space, and storage volumes.
		</Callout>,
	],
};
