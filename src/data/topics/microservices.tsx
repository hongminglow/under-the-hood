import { CodeBlock, Flow, MistakeCard, Table } from "@/components/ui";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { WifiOff, DatabaseZap, Landmark, GitBranch } from "lucide-react";
import type { Topic } from "@/data/types";

export const microservicesTopic: Topic = {
  id: "microservices",
  title: "Microservices",
  description:
    "Why splitting your clean monolith into 50 independent APIs solves organizational charts, but creates network hell.",
  tags: ["architecture", "scale", "backend"],
  icon: "Boxes",
  content: [
    <p key="1">
      A massive Node.js Monolith holding 200 developers working in the exact same GitHub repo is a chaotic nightmare of merge conflicts, hour-long deployment times, and one bad infinite loop crashing the entire company.
    </p>,
    <p key="2" className="mt-4">
      <strong>Microservices</strong> solves the "people" problem. You chop the App into 50 tiny apps (Auth Service, Payment Service, Email Service) run by 50 independent small teams who deploy multiple times a day independently.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Microservice Fallacy
    </h3>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <FeatureCard icon={WifiOff} title="Network Unreliability" subtitle="Function calls become wire hops" theme="rose">
        <p className="text-sm text-rose-100/75">
          In a monolith, calling `auth.getUser()` is a sub-millisecond RAM memory operation. In a Microservice, `Auth Service` must send an HTTP request across a physical datacenter wire to `User Service`. That wire can snap, lag, or timeout. What used to be a simple function call is now a fragile distributed system requiring retries and Circuit Breakers.
        </p>
      </FeatureCard>
      <FeatureCard icon={DatabaseZap} title="Data Isolation Hell" subtitle="No more easy joins across services" theme="amber">
        <p className="text-sm text-amber-100/75">
          Microservices mandate that EVERY service must have its very own independent SQL database. You can no longer write a beautiful `JOIN` query between the Users table and the Orders table, because they literally live on completely separate physical hard drives handled by different teams.
        </p>
      </FeatureCard>
    </Grid>,
    <Callout key="5" type="warning" title="Do not start with Microservices!">
      Startups building MVPs with Kubernetes and 10 microservices inevitably fail. Microservices are not a technical upgrade; they are an organizational scaling tactic for companies with 50+ engineers. Build the majestic monolith first.
    </Callout>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The Distributed Transaction Problem
    </h3>,
    <p key="7">
      In a monolith, wrapping operations in a database transaction is trivial: <code>BEGIN; INSERT INTO orders; UPDATE inventory; COMMIT;</code>. If anything fails, the entire transaction rolls back atomically.<br/><br/>
      In microservices, the Order Service and Inventory Service have separate databases. If the Order Service succeeds but the Inventory Service crashes, you've sold a product you don't have. <strong>Solutions:</strong>
    </p>,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <FeatureCard icon={GitBranch} title="Saga Pattern" subtitle="Compensating local transactions" theme="emerald">
        <p className="text-sm text-emerald-100/75">
          Break the transaction into a series of local transactions. If one fails, execute compensating transactions to undo previous steps (e.g., "Cancel Order" if inventory update fails).
        </p>
      </FeatureCard>
      <FeatureCard icon={Landmark} title="Two-Phase Commit (2PC)" subtitle="Coordinator-driven distributed commit" theme="violet">
        <p className="text-sm text-violet-100/75">
          A coordinator asks all services to "prepare" the transaction. If all agree, it sends "commit". If any fail, it sends "rollback". Slow and fragile (coordinator is a single point of failure).
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Service Discovery & Load Balancing
    </h3>,
    <p key="10">
      In a monolith, calling <code>auth.getUser()</code> is a function call. In microservices, the Order Service needs to find the Auth Service's IP address. <strong>Service Discovery</strong>&nbsp;tools (Consul, Eureka, Kubernetes DNS) maintain a registry of all running services. When Auth Service scales to 5 instances, the load balancer distributes requests across them.
    </p>,

    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      When to Use Microservices: The Decision Matrix
    </h3>,
    <Table
      key="12"
      headers={["Factor", "Monolith", "Microservices"]}
      rows={[
        ["Team Size", "< 20 developers", "> 50 developers across multiple teams"],
        ["Deployment Frequency", "Weekly/monthly releases", "Multiple deploys per day per team"],
        ["Scaling Needs", "Uniform scaling (scale entire app)", "Heterogeneous (scale payment service 10x, auth 2x)"],
        ["Technology Stack", "Single language/framework", "Polyglot (Go for performance, Python for ML, Node for APIs)"],
        ["Organizational Structure", "Single team owns everything", "Conway's Law: architecture mirrors org chart"],
        ["Failure Isolation", "One bug crashes everything", "Payment service down, rest of app still works"],
        ["Development Speed", "Fast initially, slows with size", "Slow initially, scales with team growth"]
      ]}
    />,

    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      The Hidden Costs: What They Don't Tell You
    </h3>,
    <Grid key="14" cols={2} gap={6} className="my-8">
      <Card title="Observability Nightmare">
        <p className="text-sm text-muted-foreground mb-2">
          Debugging distributed traces across 50 services.
        </p>
        <p className="text-xs italic text-muted-foreground">
          A single user request now touches 12 services. When it fails, you need distributed tracing (Jaeger, Zipkin) to follow the request across service boundaries. Logs are scattered across 50 different servers. You need centralized logging (ELK, Datadog) costing $50k+/year.
        </p>
      </Card>
      <Card title="Network Latency Tax">
        <p className="text-sm text-muted-foreground mb-2">
          Every service call adds 5-50ms overhead.
        </p>
        <p className="text-xs italic text-muted-foreground">
          In a monolith, 10 function calls = 0.1ms. In microservices, 10 HTTP calls = 50-500ms. Even within the same datacenter, network I/O is <strong>1000x slower</strong>&nbsp;than in-memory function calls. This compounds with every hop.
        </p>
      </Card>
      <Card title="Deployment Complexity">
        <p className="text-sm text-muted-foreground mb-2">
          Kubernetes, service meshes, API gateways.
        </p>
        <p className="text-xs italic text-muted-foreground">
          You now need Kubernetes (or ECS/Nomad), an API Gateway (Kong, Envoy), service mesh (Istio, Linkerd), secret management (Vault), and CI/CD pipelines for 50 repos. DevOps team grows from 2 to 10 engineers.
        </p>
      </Card>
      <Card title="Data Consistency Chaos">
        <p className="text-sm text-muted-foreground mb-2">
          Eventual consistency everywhere.
        </p>
        <p className="text-xs italic text-muted-foreground">
          You lose ACID transactions. A user's order might show as "paid" in Order Service but "pending" in Inventory Service for 30 seconds. You need Saga patterns, event sourcing, or accept eventual consistency.
        </p>
      </Card>
    </Grid>,

    <h3 key="15" className="text-xl font-bold mt-8 mb-4">
      Communication Patterns: Sync vs Async
    </h3>,
    <Table
      key="16"
      headers={["Pattern", "How It Works", "Use Case", "Tradeoff"]}
      rows={[
        ["Synchronous HTTP/gRPC", "Service A calls Service B and waits for response", "User authentication, payment processing", "Fast but couples services. If B is down, A fails."],
        ["Asynchronous Events", "Service A publishes event to message queue, Service B consumes later", "Email notifications, analytics, audit logs", "Decoupled but eventual consistency. Harder to debug."],
        ["Request-Reply (Async)", "Service A sends message to queue, Service B replies to callback queue", "Long-running jobs (video encoding, reports)", "Best of both worlds but complex to implement."],
        ["GraphQL Federation", "API Gateway stitches multiple service schemas into one", "Mobile apps needing data from 10 services", "Reduces client complexity but gateway becomes bottleneck."]
      ]}
    />,

    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      Real-World War Story: Amazon's Microservices Migration
    </h3>,
    <p key="18" className="mb-4">
      In 2001, Amazon was a monolithic Perl application. Jeff Bezos issued the famous "API Mandate": all teams must expose their functionality through service interfaces. No direct database access. No shared memory. Only API calls.
    </p>,
    <Grid key="19" cols={2} gap={6} className="my-8">
      <Card title="The Pain (2001-2006)">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>Productivity dropped 50% for 2 years</li>
          <li>Outages increased 3x due to cascading failures</li>
          <li>Teams spent 70% of time on infrastructure, 30% on features</li>
          <li>Network costs exploded (internal API calls = $$$)</li>
        </ul>
      </Card>
      <Card title="The Payoff (2006+)">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>Teams could deploy independently 50+ times/day</li>
          <li>AWS was born from internal tooling (EC2, S3, Lambda)</li>
          <li>Black Friday traffic scaled horizontally without rewrites</li>
          <li>Innovation velocity increased 10x (two-pizza teams)</li>
        </ul>
      </Card>
    </Grid>,

    <h3 key="20" className="text-xl font-bold mt-8 mb-4">
      The Biggest Blockers to Microservices Success
    </h3>,
    <MistakeCard
      key="21"
      number={1}
      title="Premature Decomposition"
      problem="Splitting a monolith before understanding domain boundaries. Teams create 'User Service', 'Order Service', 'Product Service' based on database tables, not business capabilities. This leads to chatty services making 20 API calls for one user action."
      solution="Use Domain-Driven Design (DDD) to identify bounded contexts. Start with a modular monolith (separate modules with clear interfaces). Extract services only when team ownership or scaling demands it."
    />,
    <MistakeCard
      key="22"
      number={2}
      title="Shared Database Anti-Pattern"
      problem="Multiple services reading/writing to the same database 'for convenience'. This creates hidden coupling—schema changes break multiple services. You lose the ability to scale databases independently."
      solution="Each service owns its data. Use events or APIs to share data. If you need a JOIN across services, denormalize data or use a read-optimized view (CQRS pattern)."
    />,
    <MistakeCard
      key="23"
      number={3}
      title="Ignoring the Fallacies of Distributed Computing"
      problem="Assuming the network is reliable, latency is zero, bandwidth is infinite. Services call each other without timeouts, retries, or circuit breakers. One slow service cascades and takes down the entire system."
      solution="Implement resilience patterns: timeouts (500ms-5s), exponential backoff retries, circuit breakers (Hystrix, Resilience4j), bulkheads (isolate thread pools), and graceful degradation."
    >
      <CodeBlock
        language="javascript"
        code={`// BAD: No timeout, no error handling
const user = await fetch('http://auth-service/user/123');

// GOOD: Timeout + Circuit Breaker
const user = await fetch('http://auth-service/user/123', {
  timeout: 2000,  // Fail fast after 2s
  retry: { limit: 3, backoff: 'exponential' }
}).catch(err => {
  // Circuit breaker opens after 5 failures
  if (circuitBreaker.isOpen()) {
    return getCachedUser(123);  // Fallback to cache
  }
  throw err;
});`}
      />
    </MistakeCard>,

    <h3 key="24" className="text-xl font-bold mt-8 mb-4">
      Microservices Decomposition Strategies
    </h3>,
    <Flow
      key="25"
      steps={[
        { title: "1. Identify Bounded Contexts", description: "Use DDD to map business domains (Billing, Inventory, Shipping)" },
        { title: "2. Extract Strangler Fig", description: "Wrap monolith with API gateway, route new features to microservices" },
        { title: "3. Database per Service", description: "Migrate data ownership, use events for cross-service queries" },
        { title: "4. Implement Observability", description: "Distributed tracing, centralized logs, metrics before going live" },
        { title: "5. Gradual Rollout", description: "Canary deployments, feature flags, monitor error rates closely" }
      ]}
    />,

    <h3 key="26" className="text-xl font-bold mt-8 mb-4">
      When NOT to Use Microservices
    </h3>,
    <Callout key="27" type="danger" title="Red Flags for Microservices">
      <ul className="text-sm space-y-2 list-disc pl-4">
        <li><strong>Startup/MVP:</strong>&nbsp;You don't have 50 engineers. Build a modular monolith first.</li>
        <li><strong>Low Traffic:</strong>&nbsp;If you're serving 100 requests/sec, a single server handles it. Microservices add complexity without benefit.</li>
        <li><strong>Tight Coupling:</strong>&nbsp;If every feature requires changes across 5 services, you've created a distributed monolith (worst of both worlds).</li>
        <li><strong>No DevOps Maturity:</strong>&nbsp;Without CI/CD, containerization, and monitoring, microservices will drown your team in operational overhead.</li>
      </ul>
    </Callout>,

    <h3 key="28" className="text-xl font-bold mt-8 mb-4">
      The Middle Ground: Modular Monolith
    </h3>,
    <p key="29" className="mb-4">
      Before jumping to microservices, consider a <strong>Modular Monolith</strong>: a single deployable unit with well-defined internal module boundaries. Each module has its own database schema (logical separation), clear APIs, and could be extracted later if needed.
    </p>,
    <Grid key="30" cols={2} gap={6} className="my-8">
      <Card title="Modular Monolith Benefits">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>ACID transactions still work</li>
          <li>Single deployment (no distributed tracing needed)</li>
          <li>Refactoring is easy (move code between modules)</li>
          <li>Can extract to microservices later when needed</li>
        </ul>
      </Card>
      <Card title="Examples in the Wild">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li><strong>Shopify:</strong>&nbsp;Modular monolith serving millions of stores</li>
          <li><strong>GitHub:</strong>&nbsp;Rails monolith with clear module boundaries</li>
          <li><strong>Stack Overflow:</strong>&nbsp;Monolith handling 5000 req/sec</li>
        </ul>
      </Card>
    </Grid>,

    <Callout key="31" type="tip" title="Pro Tip: The Two-Pizza Team Rule">
      Amazon's rule: if a team can't be fed with two pizzas (6-10 people), it's too large. Each microservice should be owned by a two-pizza team. If you have 15 engineers, you should have 2-3 services max, not 20.
    </Callout>,
  ],
};
