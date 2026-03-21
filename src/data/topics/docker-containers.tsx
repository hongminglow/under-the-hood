import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Grid } from "@/components/ui/Grid";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const dockerContainersTopic: Topic = {
  id: "docker-containers",
  title: "Docker & Containers",
  description:
    "A high-level explanation of what Docker is in the programming world, how it solves the 'it works on my machine' problem, and its role in modern CI/CD.",
  tags: ["devops", "containers", "ci-cd", "backend"],
  icon: "Box",
  content: [
    <p key="1">
      For years, developers faced the infamous{" "}
      <strong>"It works on my machine!"</strong> problem. You write code on your
      Windows laptop, it works perfectly, but when you send it to the Linux
      production server, it crashes because of wrong Node.js versions, missing
      packages, or different OS configurations.
    </p>,
    <p key="2" className="mt-4">
      <strong>Docker</strong> was created to solve this. Instead of just sending
      your code, you send your code <em>along with</em> the exact environment it
      needs to run. Docker packages your app and all its dependencies into a
      standardized puzzle piece called a{" "}
      <Highlight variant="primary">Container</Highlight>.
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      How Docker Helps Developers
    </h4>,
    <Grid key="4" cols={2} gap={6} className="my-6">
      <Card title="Absolute Consistency" description="No More Surprises">
        <p className="text-sm mt-2 text-muted-foreground">
          Since the container includes the code, the runtime (like Node or Python),
          and the operating system details, it behaves exactly the same on your
          laptop, on your co-worker's MacBook, and on the AWS production cloud.
        </p>
      </Card>
      <Card title="Speed & Efficiency" description="Lighter than VMs">
        <p className="text-sm mt-2 text-muted-foreground">
          Unlike traditional Virtual Machines (VMs) that boot up entirely new
          heavy operating systems, containers share the host's OS. They are tiny,
          fast, and start in milliseconds.
        </p>
      </Card>
    </Grid>,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      Key Concepts: Image vs. Container
    </h4>,
    <Card key="6" title="The Blueprint vs. The House">
      <ul className="list-disc pl-5 space-y-2 mt-2">
        <li>
          <strong>Docker Image:</strong> The static blueprint. It's an immutable file
          that contains your source code, libraries, dependencies, and tools.
        </li>
        <li>
          <strong>Docker Container:</strong> The running instance of that Image.
          You can run many identical containers from a single Image.
        </li>
      </ul>
    </Card>,
    <h4 key="7" className="text-xl font-bold mt-8 mb-4">
      The Docker CI/CD Workflow
    </h4>,
    <p key="8" className="mb-6">
      Docker is the backbone of modern Continuous Integration and Continuous
      Deployment (CI/CD). Here is how a typical pipeline looks when you push
      code to GitHub:
    </p>,
    <Step key="9" index={1}>
      <strong>Build:</strong> The CI server (like GitHub Actions) reads your{" "}
      <Highlight variant="primary">Dockerfile</Highlight>—a simple instruction
      file—and builds a fresh Docker Image containing your updated code.
    </Step>,
    <Step key="10" index={2}>
      <strong>Ship (Push):</strong> The CI server uploads this newly built
      Image to a central storage area called a Registry (like Docker Hub or AWS
      Elastic Container Registry).
    </Step>,
    <Step key="11" index={3}>
      <strong>Run (Deploy):</strong> Your production servers download the newest
      Image from the Registry, stop the old containers, and spin up new
      containers exactly recreating your fresh application environment.
    </Step>,
    <Callout key="12" type="tip" title="Example: The Dockerfile">
      A simple instruction set mapping out your environment.
    </Callout>,
    <CodeBlock
      key="13"
      title="Dockerfile"
      language="dockerfile"
      code={`
# 1. Start from an existing Node.js blueprint
FROM node:20-alpine

# 2. Copy your local code into the image
COPY . /app
WORKDIR /app

# 3. Install dependencies
RUN npm install

# 4. Tell the container what command to run
CMD ["npm", "start"]
      `}
    />,
  ],
};
