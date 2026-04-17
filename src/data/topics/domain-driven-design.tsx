import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const domainDrivenDesignTopic: Topic = {
  id: "domain-driven-design",
  title: "Domain-Driven Design (DDD)",
  description:
    "The methodology that answers the hardest microservices question: 'Where exactly should I draw the service boundary?'",
  tags: ["architecture", "microservices", "system-design", "backend"],
  icon: "Blocks",
  content: [
    <p key="1">
      Most teams that adopt microservices fail not because of technical complexity, but because they <strong>drew the boundaries wrong</strong>. They split by technical layer (a "User API" service, a "Database" service) instead of by business capability. <strong>Domain-Driven Design (DDD)</strong> is the methodology that solves this by forcing you to model your services around the business domain, not around the tech stack.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Strategic DDD: Drawing the Map
    </h3>,
    <Table
      key="3"
      headers={["Concept", "What It Means", "Real Example"]}
      rows={[
        ["Ubiquitous Language", "Developers and business stakeholders use the EXACT same terms. No translation layer.", "If the business says 'Policy,' the code has a Policy class — not 'Contract' or 'Agreement.'"],
        ["Bounded Context", "A clear boundary where a specific domain model applies. Each context owns its own data and definitions.", "In the Shipping context, 'Order' means a tracking number + address. In the Billing context, 'Order' means an invoice + payment status. Same word, different models."],
        ["Context Map", "A diagram showing how Bounded Contexts relate to each other and communicate.", "Shipping publishes an 'OrderShipped' event. Billing subscribes to it to trigger invoicing. The map shows this dependency."],
        ["Subdomain", "A portion of the business problem space. Types: Core (competitive advantage), Supporting (necessary but not differentiating), Generic (commodity).", "For Netflix: Core = Recommendation Engine. Supporting = Billing. Generic = Email Delivery."]
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Tactical DDD: Building Inside the Boundary
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="Entity">
        <p className="text-sm text-muted-foreground mb-2">
          An object with a <strong>unique identity</strong> that persists over time. Two <code>User</code> objects with different IDs are different users, even if they share the same name and email.
        </p>
      </Card>
      <Card title="Value Object">
        <p className="text-sm text-muted-foreground mb-2">
          An object defined entirely by its <strong>attributes</strong>, with no identity. A <code>Money(100, "USD")</code> is equal to another <code>Money(100, "USD")</code> regardless of which instance you hold.
        </p>
      </Card>
      <Card title="Aggregate">
        <p className="text-sm text-muted-foreground mb-2">
          A cluster of Entities and Value Objects treated as a <strong>single transactional unit</strong>. The <strong>Aggregate Root</strong> (e.g., <code>Order</code>) is the only entry point. You never modify an <code>OrderItem</code> directly — you always go through the <code>Order</code>.
        </p>
      </Card>
      <Card title="Domain Event">
        <p className="text-sm text-muted-foreground mb-2">
          A record that <strong>something meaningful happened</strong> in the domain: <code>OrderPlaced</code>, <code>PaymentFailed</code>, <code>InventoryReserved</code>. These are the glue between Bounded Contexts.
        </p>
      </Card>
    </Grid>,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The Wrong Way vs. The DDD Way
    </h3>,
    <Grid key="7" cols={2} gap={6} className="my-8">
      <Card title="❌ Split by Technical Layer">
        <p className="text-sm text-muted-foreground mb-2">
          "API Service," "Database Service," "Auth Service." Every feature change touches all three services. Deployments are coupled. You got a Distributed Monolith.
        </p>
      </Card>
      <Card title="✅ Split by Business Domain">
        <p className="text-sm text-muted-foreground mb-2">
          "Order Service," "Shipping Service," "Billing Service." Each owns its own API, database, and business logic. Teams can deploy independently. This is the DDD way.
        </p>
      </Card>
    </Grid>,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Context Communication Patterns
    </h3>,
    <Table
      key="9"
      headers={["Pattern", "Mechanism", "When to Use"]}
      rows={[
        ["Shared Kernel", "Two contexts share a small, co-owned data model.", "When two teams are tightly aligned and the shared model is small and stable."],
        ["Anti-Corruption Layer (ACL)", "A translation layer that converts external context models into your internal model.", "When integrating with a legacy system or third-party API that uses incompatible terminology."],
        ["Published Language", "Contexts communicate via a well-documented event schema (e.g., Avro, Protobuf).", "When contexts are owned by different teams and need formal contracts."],
        ["Customer-Supplier", "One context (Supplier) provides data that another (Customer) consumes. The Supplier dictates the API.", "Upstream-downstream dependencies where the supplier team has more influence."]
      ]}
    />,

    <Callout key="10" type="tip" title="Start Monolith, Extract Later">
      DDD does NOT mean you must start with microservices. The best approach is to build a well-structured <strong>modular monolith</strong> with clear Bounded Context boundaries in the code. Once you understand the domain deeply, extract contexts into separate services only when you have a concrete scaling or team-autonomy reason. Premature decomposition is the #1 microservice mistake.
    </Callout>,

    <Callout key="11" type="warning" title="Each Context Owns Its Data">
      The golden rule of DDD: <strong>no shared databases</strong>. If the Order Service needs customer data, it does NOT query the Customer Service's database directly. It either calls the Customer API, or it maintains its own local copy via event-driven synchronization. Sharing a database across contexts creates invisible coupling that defeats the entire purpose.
    </Callout>,
  ],
};
