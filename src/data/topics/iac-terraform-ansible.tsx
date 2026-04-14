import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Table } from "@/components/ui/Table";

export const iacTopic: Topic = {
  id: "iac-terraform",
  title: "Infrastructure as Code (IaC)",
  description:
    "Replacing manual, error-prone server clicks with version-controlled, declarative configuration files.",
  tags: ["devops", "cloud", "aws", "terraform"],
  icon: "HardDriveUpload",
  content: [
    <p key="1">
      Fifteen years ago, setting up a database or a load balancer meant logging
      into the AWS Console and manually clicking through 20 different web forms
      (ClickOps). If that server crashed, repeating those identical undocumented
      clicks to restore it was nearly impossible.{" "}
      <strong>Infrastructure as Code (IaC)</strong> solved this by defining
      cloud resources in code.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Imperative vs Declarative
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Imperative (Bash / Ansible)">
        <p className="text-sm">
          You write the exact step-by-step commands to achieve the desired
          state.
        </p>
        <ul className="text-sm mt-3 space-y-1 text-emerald-300">
          <li>1. Create an EC2 instance.</li>
          <li>2. SSH into it.</li>
          <li>3. Install PostgreSQL via apt-get.</li>
          <li>4. Start the service.</li>
        </ul>
        <p className="text-xs mt-3 opacity-60">
          Highly dependent on current system state.
        </p>
      </Card>
      <Card title="Declarative (Terraform / CloudFormation)">
        <p className="text-sm">
          You declare the <em>final desired end-state</em>, and the tool
          determines what API calls are necessary to achieve it.
        </p>
        <CodeBlock
          language="hcl"
          code={`resource "aws_db_instance" "prod_db" {
  engine = "postgres"
  instance_class = "db.t3.micro"
  allocated_storage = 20
}`}
        />
        <p className="text-xs mt-3 opacity-60">
          Idempotent and easily version-controlled.
        </p>
      </Card>
    </Grid>,
    <h4 key="4" className="text-xl font-bold mt-8 mb-4">
      Terraform's State File
    </h4>,
    <p key="5">
      How does Terraform know what needs to be changed? It maintains a highly
      sensitive JSON file called the <strong>State File</strong>{" "}
      (`terraform.tfstate`). This maps your local HCL code blocks to the actual
      real-world AWS resources. When you run `terraform plan`, it compares your
      code to the State file to output a precise diff of what will be created,
      modified, or destroyed.
    </p>,
    <Callout key="6" type="warning" title="GitOps Workflow">
      Because IaC is just text files, it is stored in Git. Changes to production
      infrastructure require a Pull Request. CI/CD pipelines automatically run
      `terraform plan` on the PR, and `terraform apply` on merge, creating a
      perfect audit trail of exactly who modified the infrastructure and why.
    </Callout>,
    <h4 key="7" className="text-xl font-bold mt-8 mb-4">
      Remote State & Locking
    </h4>,
    <p key="8">
      The State File is the single source of truth. If two engineers run <code>terraform apply</code> simultaneously, they could corrupt the state. <strong>Remote State Backends</strong>&nbsp;(S3 + DynamoDB, Terraform Cloud) solve this by storing the state centrally and implementing <strong>State Locking</strong>. When Engineer A starts an apply, the state is locked. Engineer B's apply waits or fails gracefully.
    </p>,
    <CodeBlock
      key="9"
      language="hcl"
      title="terraform.tf"
      code={`terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}`}
    />,
    <h4 key="10" className="text-xl font-bold mt-8 mb-4">
      Terraform vs Ansible: When to Use Each
    </h4>,
    <Table
      key="11"
      headers={["Tool", "Purpose", "Best For"]}
      rows={[
        ["Terraform", "Provisioning infrastructure (VMs, networks, databases).", "Creating the servers themselves."],
        ["Ansible", "Configuration management (installing software, updating configs).", "Configuring what runs ON the servers."]
      ]}
    />,
    <Callout key="12" type="tip" title="The Modern Stack">
      Most teams use <strong>Terraform</strong> to provision the AWS infrastructure, then <strong>Ansible</strong> or <strong>Docker</strong> to configure the applications running on those servers. Terraform creates the EC2 instance; Ansible installs Nginx on it.
    </Callout>,
  ],
};
