import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";

export const dockerContainersTopic: Topic = {
  id: "docker-containers",
  title: "Docker & Container Architecture",
  description:
    "Deconstructing process-level virtualization: how Linux Kernel features are orchestrated to create isolated, reproducible runtime environments.",
  tags: ["devops", "containers", "linux", "architecture"],
  icon: "Box",
  content: [
    <p key="1">
      The "Works on my machine!" problem plagued software engineering for
      decades. Developers would build logic on a Mac, test on CentOS, and deploy
      on Ubuntu—inevitably failing due to mismatched system dependencies.{" "}
      <strong>Docker</strong> popularized OS-level virtualization to solve this
      by packaging code, runtimes, and system tools into an immutable, portable
      artifact called an Image.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Containers vs. Virtual Machines (VMs)
    </h4>,
    <p key="3">
      Historically, scaling applications meant running Virtual Machines (VMs).
      VMs are hardware-level virtualizations. A hypervisor (like VMware or
      VirtualBox) reserves physical RAM/CPU to run an entire, heavy Guest
      Operating System from scratch.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-6">
      <Card title="Virtual Machines" description="Hardware Virtualization">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Runs a full Guest Kernel on top of the Host Kernel.</li>
          <li>Weighs Gigabytes, takes minutes to boot.</li>
          <li>Strict hardware boundary ensures heavy isolation.</li>
        </ul>
      </Card>
      <Card title="Containers" description="OS-Level Virtualization">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            Shares the underlying Host OS Kernel natively; no hypervisor needed.
          </li>
          <li>Weighs Megabytes, boots in milliseconds.</li>
          <li>
            Isolated via <Highlight variant="primary">Namespaces</Highlight>.
          </li>
        </ul>
      </Card>
    </Grid>,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      The Magic Behind the Box: Linux Primitives
    </h4>,
    <p key="6">
      "Container" isn't actually a technical Linux Kernel term; it's a
      conceptual wrapper around three highly advanced core Linux isolation
      features working in tandem.
    </p>,
    <Step key="7" index={1}>
      <strong>Namespaces (Isolation):</strong> Limits what a process can{" "}
      <em>see</em>. Docker creates unique Mount, PID (Process ID), Network, and
      User namespaces. To the containerized app, it appears it is the only
      process running on the machine, with its own dedicated network interface
      and root filesystem.
    </Step>,
    <Step key="8" index={2}>
      <strong>Cgroups (Resource Quotas):</strong> "Control Groups" limit what a
      process can <em>use</em>. This prevents a rogue memory-leaking container
      from consuming all the host's RAM. It tightly throttles CPU cycles and
      Memory availability.
    </Step>,
    <Step key="9" index={3}>
      <strong>UnionFS (Layered Filesystems):</strong> A filesystem service that
      allows files and directories of separate file systems (branches) to be
      transparently overlaid. If an image is 1GB, and you run 10 containers from
      it, they don't consume 10GB. They all read from the same base image layer
      and only allocate storage for thin, temporary "Copy-on-Write" differential
      layers.
    </Step>,
    <h4 key="10" className="text-xl font-bold mt-8 mb-4">
      The Orchestration Evolutionary Step
    </h4>,
    <Table
      key="11"
      headers={["Layer", "Technology", "Responsibility"]}
      rows={[
        [
          "The Standard",
          "OCI Images (Docker)",
          "Defines exactly how an application is packaged step-by-step.",
        ],
        [
          "The Engine",
          "Containerd / runc",
          "The daemon responsible for downloading images and executing namespaced processes.",
        ],
        [
          "The Orchestrator",
          "Kubernetes",
          "The distributed cluster manager. It observes thousands of containers, rerouting traffic, handling crash restarts, and auto-scaling based on CPU loads.",
        ],
      ]}
    />,
    <Callout key="12" type="tip" title="Why Microservices?">
      Containerization was the physical catalyst for the microservices boom.
      Because containers cost almost zero overhead to run, architects could
      freely split massive monolithic codebases into dozen of independently
      deployable APIs without worrying about server provisioning limits.
    </Callout>,
  ],
};
