import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";

export const awsServicesMappingTopic: Topic = {
  id: "aws-services-mapping",
  title: "AWS Services: Replacing Open Source Tools",
  description:
    "Why we pay for cloud providers like AWS, what managed services offer over raw compute, and how common open-source tools map to their AWS equivalents (ALB, RDS, ElastiCache, etc.).",
  tags: ["aws", "cloud", "devops", "architecture", "managed-services"],
  icon: "Cloud",
  content: [
    <p key="1">
      Amazon Web Services (AWS) is the largest cloud computing provider in the
      world. While you could technically rent raw servers (EC2) and install all
      your own software on them, the real value of AWS lies in its{" "}
      <strong>managed services</strong>. Instead of maintaining an open-source
      tool yourself, you pay AWS to handle the underlying infrastructure, high
      availability, scaling, and backups.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Why Do We Pay For AWS Managed Services?
    </h3>,
    <p key="3">
      If a Redis server is free to download, why do companies pay AWS thousands of
      dollars a month for ElastiCache for Redis? The short answer is:{" "}
      <strong>to offload operational burden (undifferentiated heavy lifting).</strong>
    </p>,
    <Grid key="4" cols={2} gap={6} className="mt-4">
      <Card title="High Availability (Multi-AZ)" description="Automatic Failover">
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Setting up a Postgres primary-replica failover cluster takes significant
          expertise. In AWS RDS, making a database highly available across multiple
          datacenters (Availability Zones) is a single checkbox. If a datacenter
          burns down, AWS fails over automatically.
        </p>
      </Card>
      <Card title="Automated Backups & Patching" description="Sleep safely">
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Managed services automatically take daily snapshots, retain them for 35
          days, and allow Point-In-Time recovery (restore to 2:15 PM yesterday).
          They also automatically apply minor version security patches during a
          maintenance window you specify.
        </p>
      </Card>
      <Card title="Elastic Scalability" description="Scale without downtime">
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          If your NGINX load balancer runs out of CPU, you have to manually provision
          a bigger box and migrate traffic. An AWS Application Load Balancer (ALB)
          automatically scales its own underlying nodes to handle sudden traffic
          spikes from 100 to 100,000 requests per second.
        </p>
      </Card>
      <Card title="Security & Compliance" description="IAM & VPC integration">
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Managed services integrate natively with AWS IAM (Identity and Access
          Management) and VPCs (Virtual Private Clouds). You can use cryptographic
          roles rather than hardcoding passwords, and isolate databases on private
          networks with strict security groups.
        </p>
      </Card>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Mapping Open-Source Tools to AWS Equivalents
    </h3>,
    <Table
      key="6"
      headers={["Category", "Open-Source / Self-Hosted", "AWS Managed Equivalent", "Why Use The AWS Version?"]}
      rows={[
        [
          "Virtual Machines",
          "Bare metal servers / VMware",
          "Amazon EC2 (Elastic Compute Cloud)",
          "Rent servers by the second; automate provisioning with Auto Scaling Groups (ASG).",
        ],
        [
          "Relational DB (SQL)",
          "PostgreSQL, MySQL, MariaDB",
          "Amazon RDS / Amazon Aurora",
          "Aurora offers 5x throughput, multi-AZ replication, and automated storage auto-scaling up to 128TB.",
        ],
        [
          "In-Memory Cache",
          "Redis, Memcached",
          "Amazon ElastiCache / MemoryDB",
          "Automatic cluster sharding, node replacement, and cross-AZ replication for caching.",
        ],
        [
          "Load Balancer (L7)",
          "NGINX, HAProxy, Traefik",
          "ALB (Application Load Balancer)",
          "Native connection to EC2/ECS/EKS. Inspects HTTP requests, handles path-based routing, terminates TLS/SSL automatically via AWS ACM.",
        ],
        [
          "Load Balancer (L4)",
          "LVS, HAProxy (TCP mode)",
          "NLB (Network Load Balancer)",
          "Handles millions of TCP/UDP connections per second with ultra-low latency. Provides a static IP address.",
        ],
        [
          "Object Storage",
          "Local Disk, MinIO",
          "Amazon S3 (Simple Storage Service)",
          "Infinite scaling, 99.999999999% (11 9s) of durability, native CDN integration via CloudFront.",
        ],
        [
          "Message Queue",
          "RabbitMQ, ActiveMQ",
          "Amazon SQS (Simple Queue Service)",
          "Infinitely scalable polling queue. No servers to manage, billed per message (Serverless).",
        ],
        [
          "Pub/Sub & Events",
          "Kafka, Redis PubSub",
          "Amazon SNS (Simple Notification) / MSK",
          "SNS pushes messages to lambdas, queues, or webhooks. MSK is managed Kafka for high-throughput streaming.",
        ],
        [
          "NoSQL Database",
          "MongoDB, Cassandra",
          "Amazon DynamoDB / DocumentDB",
          "DynamoDB is a serverless, multi-region, key-value store guaranteeing single-digit millisecond latency at any scale.",
        ],
        [
          "Container Orchestration",
          "Kubernetes (Kubeadm)",
          "Amazon EKS / Amazon ECS",
          "AWS manages the Control Plane (API server, etcd). You only pay for/manage the worker nodes (or use Fargate for zero server management).",
        ],
      ]}
    />,
    <Callout key="7" type="tip" title="EC2 isn't exactly a 'managed' service">
      While EC2 provides the server dynamically, AWS only manages the hardware and
      hypervisor. You are still responsible for the OS, patching, security, and the
      application. This is called <strong>IaaS (Infrastructure as a Service)</strong>. Services like RDS and DynamoDB are <strong>PaaS (Platform)</strong> or <strong>SaaS (Software as a Service)</strong>, where AWS manages the software layers too.
    </Callout>,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: ALB vs NGINX
    </h3>,
    <p key="9">
      A common paradigm shift is moving from running highly-available NGINX proxy
      nodes to using an AWS ALB.
    </p>,
    <Flow
      key="10"
      steps={[
        {
          title: "Self-Hosted NGINX",
          description:
            "You spin up 2 EC2 instances running NGINX. You configure Keepalived/Corosync to share a floating IP. You manually update nginx.conf whenever a new backend app server is deployed. You must install certbot to handle Let's Encrypt certificates.",
        },
        {
          title: "AWS ALB",
          description:
            "A highly available, elastic service managed by AWS. You point a DNS record to the ALB. It integrates with AWS Auto Scaling Groups to automatically discover new EC2 app servers. It integrates with AWS Certificate Manager (ACM) for free, auto-renewing SSL certificates.",
        },
      ]}
    />,
    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: RDS vs Self-Hosted PostgreSQL
    </h3>,
    <p key="12">
      Database administration is incredibly high-risk. Losing database state means
      losing the business.
    </p>,
    <Grid key="13" cols={2} gap={6}>
      <Card title="The Hard Way: Self-Hosted Postgres" description="On EC2">
        <ul className="list-disc pl-5 mt-2 text-sm text-foreground/80 space-y-1">
          <li>Provision primary and replica EC2 instances.</li>
          <li>Configure `pg_hba.conf` and streaming replication.</li>
          <li>Write custom bash scripts for daily `pg_dump` to S3.</li>
          <li>If the primary dies, wake up at 3 AM to run `pg_ctl promote` on the replica to elect it as the new leader.</li>
          <li>Update application connection strings to point to the new leader.</li>
        </ul>
      </Card>
      <Card title="The AWS Way: Amazon RDS" description="Managed Service">
        <ul className="list-disc pl-5 mt-2 text-sm text-foreground/80 space-y-1">
          <li>Click 'Create Database'. Check the 'Multi-AZ' box.</li>
          <li>AWS provisions a primary and a synchronous standby replica in a different datacenter.</li>
          <li>AWS writes continuous WAL logs to S3. Point-in-time recovery to any second is possible.</li>
          <li>If primary dies, AWS automatically flips the DNS endpoint to the standby replica within 60 seconds. You sleep through it.</li>
        </ul>
      </Card>
    </Grid>,
    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      The "Serverless" Paradigm
    </h3>,
    <p key="15">
      The pinnacle of managed services on AWS is <strong>Serverless</strong>. This means there are no EC2 instances visible to you, no OS patching, no capacity planning, and you pay exactly for what you use (often per request).
    </p>,
    <Table
      key="16"
      headers={["Traditional / Provisioned", "Serverless Equivalent", "How It Scales"]}
      rows={[
        [
          "EC2 App Server (Node.js/Python)",
          "AWS Lambda",
          "Scales from 0 to 10,000 parallel executions instantly. Billed per millisecond of execution time.",
        ],
        [
          "EKS/ECS on EC2 worker nodes",
          "AWS Fargate",
          "Run Docker containers without managing the underlying EC2 host. Give it CPU/RAM requirements and run.",
        ],
        [
          "RDS (MySQL/PostgreSQL)",
          "Amazon Aurora Serverless",
          "Database automatically scales compute and RAM up and down based on query volume, down to zero when idle.",
        ],
        [
          "Self-Hosted NGINX / Express.js API",
          "Amazon API Gateway",
          "Handles 10,000s of HTTPS requests per second, integrates natively with Lambda, built-in rate limiting and WAF.",
        ],
      ]}
    />,
    <Callout key="17" type="info" title="The Trade-off: Vendor Lock-in">
      The more heavily you rely on highly specific AWS managed services (like DynamoDB, SQS, or Lambda), the harder it becomes to move your application to Azure, Google Cloud, or on-premise later on. The industry consensus is usually that <strong>the speed and operational safety you gain far outweighs the cost of vendor lock-in</strong> for most companies.
    </Callout>,
  ],
};
