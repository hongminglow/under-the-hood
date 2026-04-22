import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const dockerComposeVsKubernetesVsEksTopic: Topic = {
	id: "docker-compose-vs-kubernetes-vs-eks",
	title: "Docker Compose vs Kubernetes vs EKS",
	description:
		"A practical decision guide for when a single host is enough, when you need orchestration, and when managed Kubernetes on AWS is actually worth it.",
	tags: ["devops", "docker", "kubernetes", "eks", "aws", "containers"],
	icon: "Boxes",
	content: [
		<p key="1">
			These three are often compared like they are interchangeable layers, but they solve{" "}
			<strong>different problems</strong>. <strong>Docker Compose</strong> is a simple way to run multiple containers
			together on one machine. <strong>Kubernetes</strong> is a container orchestrator for running workloads across
			clusters. <strong>Amazon EKS</strong> is AWS&apos;s managed Kubernetes service, not a different orchestration
			model.
		</p>,
		<Callout key="2" type="warning" title="Important Mental Model">
			<Highlight variant="warning">Compose vs Kubernetes</Highlight> is a real decision.{" "}
			<Highlight variant="warning">Kubernetes vs EKS</Highlight> is usually not: if you already need Kubernetes and you
			are committed to AWS, EKS is simply one way to operate it with less control-plane burden.
		</Callout>,
		<Grid key="3" cols={3} gap={6} className="my-8">
			<Card title="Docker Compose" description="Single-host coordination">
				<p className="text-sm text-muted-foreground">
					Best for local development, demos, CI test stacks, and small production systems running on one VM where you
					want low operational overhead.
				</p>
			</Card>
			<Card title="Kubernetes" description="Cluster orchestration">
				<p className="text-sm text-muted-foreground">
					Best when you need multi-node scheduling, self-healing, rolling deployments, autoscaling, service discovery,
					and stronger workload isolation at platform scale.
				</p>
			</Card>
			<Card title="Amazon EKS" description="Managed Kubernetes on AWS">
				<p className="text-sm text-muted-foreground">
					Best when you already want Kubernetes and also want AWS-managed control plane operations plus integration with
					IAM, ECR, ALB/NLB, CloudWatch, and the broader AWS platform.
				</p>
			</Card>
		</Grid>,
		<Table
			key="4"
			headers={["Dimension", "Docker Compose", "Kubernetes", "Amazon EKS"]}
			rows={[
				[
					"What it is",
					"A YAML-based multi-container runner",
					"An open-source orchestration platform",
					"A managed Kubernetes service on AWS",
				],
				["Typical scope", "One host", "Many nodes / cluster", "Many nodes / cluster on AWS"],
				["Operations burden", "Low", "High", "Medium to high"],
				["Self-healing", "Basic restart policies", "Strong built-in reconciliation", "Same as Kubernetes"],
				[
					"Scaling",
					"Manual / limited",
					"Horizontal, declarative",
					"Horizontal, declarative + AWS autoscaling integrations",
				],
				[
					"Networking & ingress",
					"Simple container networking",
					"Services, ingress, policies",
					"Kubernetes model + AWS load balancers",
				],
				[
					"Best fit",
					"Small teams, simple stacks, dev environments",
					"Platform teams, complex distributed systems",
					"AWS shops that truly need Kubernetes",
				],
			]}
		/>,
		<Card key="5" title="When Docker Compose Is The Right Answer" description="Usually earlier than people think">
			<ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
				<li>
					You run <strong>a few services</strong> together on one machine: app, database, Redis, worker, reverse proxy.
				</li>
				<li>
					Your team values <strong>simplicity over elasticity</strong>.
				</li>
				<li>
					You do not need cluster-wide scheduling, pod disruption budgets, autoscaling, or complex service mesh/network
					policy features.
				</li>
				<li>
					You are still proving product-market fit or the workload can live on a single VM with good backups and
					observability.
				</li>
			</ul>
		</Card>,
		<Card
			key="6"
			title="When Kubernetes Is Worth The Complexity"
			description="Use it when orchestration pain becomes real"
		>
			<ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
				<li>
					You need <strong>multi-node resilience</strong>: if one node dies, workloads should be rescheduled elsewhere
					automatically.
				</li>
				<li>
					You need <strong>declarative deployments</strong>, rolling updates, health checks, secrets/configs, and
					autoscaling as first-class platform features.
				</li>
				<li>
					Multiple teams are shipping many services and need a consistent platform rather than hand-managed servers.
				</li>
				<li>
					You already have the engineering maturity to operate observability, CI/CD, capacity planning, and incident
					response around it.
				</li>
			</ul>
		</Card>,
		<Card
			key="7"
			title="When EKS Is Better Than Rolling Your Own Kubernetes"
			description="Choose it only after deciding you need Kubernetes"
		>
			<ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
				<li>
					Your infrastructure already lives in <strong>AWS</strong> and you want tight integration with IAM roles, VPC
					networking, ECR, and AWS load balancers.
				</li>
				<li>
					You want AWS to manage the <strong>control plane</strong> rather than operating etcd and API server
					availability yourself.
				</li>
				<li>
					You accept that worker nodes, networking choices, add-ons, upgrades, costs, and cluster governance are{" "}
					<strong>still your problem</strong>.
				</li>
			</ul>
		</Card>,
		<Callout key="8" type="info" title="What You Pay For Kubernetes">
			The cost is not just cloud spend. Kubernetes adds <strong>people cost</strong>, <strong>debugging cost</strong>,
			and <strong>cognitive load</strong>. You now think in Deployments, Services, Ingress, ConfigMaps, Secrets, probes,
			requests/limits, node groups, autoscalers, and upgrade windows.
		</Callout>,
		<Table
			key="9"
			headers={["Question", "If Yes", "Usually Means"]}
			rows={[
				["Do you only need one machine?", "Yes", "Compose is probably enough"],
				[
					"Do you need workloads rescheduled across multiple nodes automatically?",
					"Yes",
					"You are in Kubernetes territory",
				],
				[
					"Are you already heavily on AWS and want managed control plane operations?",
					"Yes",
					"EKS becomes a strong candidate",
				],
				["Is the team still small and the system still simple?", "Yes", "Prefer Compose or plain VM deployments"],
			]}
		/>,
		<Card
			key="10"
			title="Behind The Scenes: Why They Feel So Different"
			description="The hidden control loops and abstraction jump"
		>
			<Step index={1}>
				<strong>Compose</strong> reads a YAML file, creates networks/volumes, and starts containers on{" "}
				<strong>one Docker host</strong>.
			</Step>
			<Step index={2}>
				<strong>Kubernetes</strong> stores desired state in the API server, then controllers, scheduler, kubelet, and
				networking components constantly reconcile reality to match that desired state.
			</Step>
			<Step index={3}>
				<strong>EKS</strong> keeps that Kubernetes control plane hosted by AWS, but your workloads, nodes, add-ons,
				manifests, and operational model are still Kubernetes.
			</Step>
		</Card>,
		<CodeBlock
			key="11"
			title="docker-compose.yml"
			language="yaml"
			code={`services:
  api:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - redis

  redis:
    image: redis:7-alpine`}
		/>,
		<CodeBlock
			key="12"
			title="deployment.yaml + service.yaml"
			language="yaml"
			code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: my-api:latest
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 3000`}
		/>,
		<Callout key="13" type="success" title="Rule Of Thumb">
			Start with <strong>Docker Compose</strong> if the system is small and a single machine is acceptable. Move to{" "}
			<strong>Kubernetes</strong> only when orchestration requirements are clearly painful. Pick <strong>EKS</strong>{" "}
			only after choosing Kubernetes and deciding AWS is the right operational home.
		</Callout>,
	],
};
