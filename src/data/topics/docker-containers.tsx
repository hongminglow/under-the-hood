import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { Step } from "@/components/ui/Step";
import type { Topic } from "@/data/types";

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
        <p className="text-sm mt-2 text-slate-400">
          Since the container includes the code, the runtime (like Node or Python),
          and the operating system details, it behaves exactly the same on your
          laptop, on your co-worker's MacBook, and on the AWS production cloud.
        </p>
      </Card>
      <Card title="Speed & Efficiency" description="Lighter than VMs">
        <p className="text-sm mt-2 text-slate-400">
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

    <h3 key="multistage-title" className="text-xl font-bold mt-8 mb-4">
      Multi-Stage Builds: Shrinking Images from 1GB to 100MB
    </h3>,
    <p key="multistage-desc" className="mb-4">
      A naive Dockerfile includes build tools, dev dependencies, and source files — bloating the image to over 1GB. <strong>Multi-stage builds</strong>&nbsp;let you compile in one stage and copy only the final artifacts to a minimal runtime image.
    </p>,
    <CodeBlock
      key="multistage-code"
      title="Multi-Stage Dockerfile (Node.js)"
      language="dockerfile"
      code={`# Stage 1: Build stage (includes dev dependencies)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Production stage (minimal runtime)
FROM node:20-alpine
WORKDIR /app

# Copy only production dependencies and built files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Run as non-root user for security
USER node

CMD ["node", "dist/index.js"]

# Result: 150MB instead of 1.2GB`}
    />,
    <Callout key="multistage-tip" type="success" title="Why This Works">
      The final image only contains the <code>node:20-alpine</code> base + production dependencies + compiled code. All build tools (TypeScript compiler, webpack, etc.) are left behind in the builder stage.
    </Callout>,

    <h3 key="compose-title" className="text-xl font-bold mt-8 mb-4">
      Docker Compose: Running App + Database Together
    </h3>,
    <p key="compose-desc" className="mb-4">
      Instead of manually starting containers one by one, <strong>Docker Compose</strong>&nbsp;lets you define multi-container applications in a single YAML file.
    </p>,
    <CodeBlock
      key="compose-code"
      title="docker-compose.yml"
      language="yaml"
      code={`version: '3.8'

services:
  # Your Node.js app
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache
    volumes:
      - ./src:/app/src  # Hot reload in development
  
  # PostgreSQL database
  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  # Redis cache
  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`}
    />,
    <p key="compose-usage" className="text-sm text-muted-foreground mt-4">
      Start everything with: <code>docker-compose up</code><br/>
      Stop everything with: <code>docker-compose down</code>
    </p>,

    <h3 key="mistakes-title" className="text-xl font-bold mt-8 mb-4">
      Common Docker Mistakes
    </h3>,
    <MistakeCard
      key="mistake-1"
      number={1}
      title="No .dockerignore File"
      problem="Copying node_modules and .git into the image bloats it by 500MB+."
      solution="Create a .dockerignore file (like .gitignore) to exclude unnecessary files."
    >
      <CodeBlock
        language="text"
        code={`# .dockerignore
node_modules
.git
.env
*.log
dist
coverage`}
      />
    </MistakeCard>,
    <MistakeCard
      key="mistake-2"
      number={2}
      title="Running as Root User"
      problem="If an attacker exploits your app, they have root access to the container."
      solution="Create and use a non-root user for running the application."
    >
      <CodeBlock
        language="dockerfile"
        code={`# BAD: Runs as root (default)
CMD ["node", "index.js"]

# GOOD: Create and use non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
CMD ["node", "index.js"]`}
      />
    </MistakeCard>,
    <MistakeCard
      key="mistake-3"
      number={3}
      title="Not Using Layer Caching"
      problem="Copying code before installing dependencies invalidates cache on every code change."
      solution="Copy package.json first, install dependencies, then copy code. Docker caches each layer - if package.json hasn't changed, it reuses the cached npm install layer (saves minutes)."
    >
      <CodeBlock
        language="dockerfile"
        code={`# BAD: Code changes invalidate npm install cache
COPY . .
RUN npm install

# GOOD: Copy package.json first, install, then copy code
COPY package*.json ./
RUN npm install
COPY . .`}
      />
    </MistakeCard>,

    <Callout key="best-practices" type="tip" title="Docker Best Practices Checklist">
      ✅ Use multi-stage builds<br/>
      ✅ Create .dockerignore file<br/>
      ✅ Run as non-root user<br/>
      ✅ Copy package.json before code (layer caching)<br/>
      ✅ Use specific image tags (not <code>:latest</code>)<br/>
      ✅ Scan images for vulnerabilities (<code>docker scan</code>)
    </Callout>,
  ],
};
