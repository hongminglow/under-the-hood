import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const sqlVsNosqlTopic: Topic = {
  id: "sql-vs-nosql",
  title: "SQL vs NoSQL",
  description:
    "The legendary database war: The rigid structural safety of PostgreSQL vs the raw chaotic scale of MongoDB.",
  tags: ["database", "backend", "system-design"],
  icon: "Database",
  content: [
    <p key="1">
      For 30 years, Relational Databases (SQL) completely ran the world. In the 2010s, developers realized that forcing dynamic modern web-app models into rigid 2D Excel-like tables was painful, giving rise to Document Databases (NoSQL).
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Architectural Difference
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="SQL (PostgreSQL / MySQL)">
        <p className="text-sm text-muted-foreground mb-2">
          Data is aggressively broken apart (Normalized) into dozens of strict tables to prevent duplication. To load a User's profile, you must dynamically <code>JOIN</code> the User table with the Comments table and the Address table.
        </p>
        <p className="text-sm font-semibold mt-3">Best for:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1 space-y-1">
          <li>Financial systems requiring extreme ACID safety.</li>
          <li>Highly interconnected data (Social Networks).</li>
        </ul>
      </Card>
      <Card title="NoSQL (MongoDB / DynamoDB)">
        <p className="text-sm text-muted-foreground mb-2">
          Data is clumped together (Denormalized) into massive, flexible JSON blobs. To load a User's profile, you pull exactly 1 massive JSON document holding their Address and Comments naturally inside of it. Zero `JOIN`ing required.
        </p>
        <p className="text-sm font-semibold mt-3">Best for:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1 space-y-1">
          <li>Rapidly changing schemas (Startups).</li>
          <li>Catalog systems (Amazon Products) where every item has entirely different JSON specs.</li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="4" type="tip" title="The Scaling Myth (Horizontal vs Vertical)">
      It is a known physics fact that joining 5 tables together is terribly slow, causing SQL databases to hit physical CPU limits (forcing expensive Vertical Scaling). NoSQL deliberately abandons relations entirely, which allows you to effortlessly split the database across 100 cheap servers (Horizontal Sharding) indefinitely without math conflicts.
    </Callout>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Schema Flexibility Trade-off
    </h3>,
    <p key="6">
      SQL enforces a <strong>rigid schema</strong>. Every User row must have the exact same columns. Adding a new field requires an <code>ALTER TABLE</code> migration across millions of rows.<br/><br/>
      NoSQL is <strong>schema-less</strong>. One Product document can have 50 fields, another can have 5. Perfect for rapidly evolving startups, but dangerous for data integrity (no enforcement of required fields).
    </p>,
    <Table
      key="7"
      headers={["Database", "Type", "Primary Use Case"]}
      rows={[
        ["PostgreSQL", "SQL (Relational)", "Transactional systems, complex queries"],
        ["MongoDB", "NoSQL (Document)", "Flexible schemas, rapid prototyping"],
        ["Cassandra", "NoSQL (Wide-Column)", "Massive write-heavy workloads (IoT, logs)"],
        ["Redis", "NoSQL (Key-Value)", "Caching, session storage, real-time leaderboards"]
      ]}
    />,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      When to Use SQL: The Decision Framework
    </h3>,
    <Grid key="9" cols={2} gap={6} className="my-8">
      <Card title="Complex Relationships">
        <p className="text-sm text-muted-foreground mb-2">
          Many-to-many relationships, deep JOINs.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Social networks (users, friends, posts, comments, likes), e-commerce (products, categories, orders, reviews), ERP systems. SQL's <code>JOIN</code>&nbsp;operations are optimized for relational queries. NoSQL would require multiple round-trips or massive data duplication.
        </p>
      </Card>
      <Card title="ACID Transactions">
        <p className="text-sm text-muted-foreground mb-2">
          Financial operations, inventory management.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Banking (transfer $100 from A to B atomically), payment processing, stock trading. SQL guarantees <strong>atomicity</strong>: either all operations succeed or all fail. NoSQL historically sacrificed this for scale (though modern NoSQL added limited transaction support).
        </p>
      </Card>
      <Card title="Structured, Stable Data">
        <p className="text-sm text-muted-foreground mb-2">
          Schema rarely changes, data integrity critical.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Healthcare records (strict HIPAA compliance), government systems, legacy enterprise apps. SQL enforces constraints (<code>NOT NULL</code>, <code>FOREIGN KEY</code>, <code>CHECK</code>) at the database level. Bad data physically cannot enter.
        </p>
      </Card>
      <Card title="Complex Queries & Analytics">
        <p className="text-sm text-muted-foreground mb-2">
          Aggregations, window functions, CTEs.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Business intelligence dashboards, reporting systems. SQL's query language is <strong>50 years mature</strong>&nbsp;with advanced features (recursive CTEs, window functions, materialized views). NoSQL query languages are primitive in comparison.
        </p>
      </Card>
    </Grid>,

    <h3 key="10" className="text-xl font-bold mt-8 mb-4">
      When to Use NoSQL: The Decision Framework
    </h3>,
    <Grid key="11" cols={2} gap={6} className="my-8">
      <Card title="Massive Scale (Horizontal)">
        <p className="text-sm text-muted-foreground mb-2">
          Billions of records, petabytes of data.
        </p>
        <p className="text-xs italic text-muted-foreground">
          IoT sensor data (millions of writes/sec), social media feeds (Facebook's 2.9B users), log aggregation. NoSQL databases like Cassandra can scale to <strong>1000+ nodes</strong>&nbsp;linearly. SQL databases hit scaling limits around 10-50 nodes due to JOIN complexity.
        </p>
      </Card>
      <Card title="Flexible/Evolving Schema">
        <p className="text-sm text-muted-foreground mb-2">
          Rapid prototyping, frequent schema changes.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Startups iterating on product-market fit, content management systems (every article has different fields), product catalogs (phones have "screen_size", books have "author"). Adding a field in MongoDB = just insert it. No migrations needed.
        </p>
      </Card>
      <Card title="Document-Centric Data">
        <p className="text-sm text-muted-foreground mb-2">
          Self-contained entities, minimal relationships.
        </p>
        <p className="text-xs italic text-muted-foreground">
          User profiles (all data in one document), blog posts (content + metadata + comments embedded), product listings. If your data naturally maps to JSON and you rarely need to JOIN across collections, NoSQL is simpler and faster.
        </p>
      </Card>
      <Card title="High Write Throughput">
        <p className="text-sm text-muted-foreground mb-2">
          Write-heavy workloads, append-only logs.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Time-series data (metrics, logs, events), real-time analytics, clickstream tracking. Cassandra and DynamoDB are optimized for <strong>write amplification</strong>. SQL databases struggle with millions of inserts/sec due to index maintenance overhead.
        </p>
      </Card>
    </Grid>,

    <h3 key="12" className="text-xl font-bold mt-8 mb-4">
      Real-World Company Examples
    </h3>,
    <Table
      key="13"
      headers={["Company", "Database Choice", "Why", "Scale"]}
      rows={[
        ["Stripe", "PostgreSQL (SQL)", "Financial transactions require ACID guarantees. Complex fraud detection queries need JOINs.", "Billions of transactions, 99.999% uptime"],
        ["Netflix", "Cassandra (NoSQL)", "Massive write throughput for viewing history (400M users). Horizontal scaling to 1000+ nodes.", "1 trillion writes/day"],
        ["Uber", "PostgreSQL + Redis", "SQL for transactional data (trips, payments). Redis for real-time location caching.", "10M trips/day"],
        ["Facebook", "MySQL + Cassandra", "MySQL for social graph (friends, posts). Cassandra for messaging (90B messages/day).", "2.9B users"],
        ["Airbnb", "PostgreSQL (SQL)", "Complex search queries (location, price, availability). Relational data (users, listings, bookings).", "7M listings globally"],
        ["Discord", "Cassandra (NoSQL)", "Billions of messages/day. Horizontal scaling for 150M+ users. Eventual consistency acceptable.", "1B+ messages/day"],
        ["GitHub", "MySQL (SQL)", "Code repositories, pull requests, issues are highly relational. ACID for git operations.", "100M+ repositories"],
        ["Twitter", "Manhattan (NoSQL)", "Custom distributed database for tweets. 500M tweets/day require massive write throughput.", "500M tweets/day"]
      ]}
    />,

    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      The Hidden Costs of NoSQL
    </h3>,
    <p key="15" className="mb-4">
      NoSQL isn't "better"—it trades SQL's guarantees for scale. Here's what you lose:
    </p>,
    <Grid key="16" cols={2} gap={6} className="my-8">
      <Card title="Data Duplication Nightmare">
        <p className="text-sm text-muted-foreground mb-2">
          Denormalization = copying data everywhere.
        </p>
        <p className="text-xs italic text-muted-foreground">
          In SQL, a user's email exists once. In NoSQL, if you embed user data in 1000 documents (orders, comments, posts), updating the email requires <strong>1000 writes</strong>. This is called "write amplification" and causes consistency issues.
        </p>
      </Card>
      <Card title="No Foreign Key Constraints">
        <p className="text-sm text-muted-foreground mb-2">
          Referential integrity enforced in application code.
        </p>
        <p className="text-xs italic text-muted-foreground">
          SQL prevents orphaned records (can't delete a user if orders reference them). NoSQL doesn't care—you can delete a user and leave 1000 orders pointing to a non-existent user. Your app must handle this.
        </p>
      </Card>
      <Card title="Eventual Consistency">
        <p className="text-sm text-muted-foreground mb-2">
          Reads might return stale data.
        </p>
        <p className="text-xs italic text-muted-foreground">
          In distributed NoSQL (Cassandra, DynamoDB), writes propagate across nodes over seconds. A user updates their profile, but reads from another node show old data. This is <strong>eventual consistency</strong>—acceptable for social feeds, catastrophic for banking.
        </p>
      </Card>
      <Card title="Limited Query Capabilities">
        <p className="text-sm text-muted-foreground mb-2">
          No JOINs, limited aggregations.
        </p>
        <p className="text-xs italic text-muted-foreground">
          MongoDB's aggregation pipeline is powerful but nowhere near SQL's expressiveness. Complex analytics queries (recursive CTEs, window functions, lateral joins) are impossible. You'll need to export data to a SQL warehouse (Snowflake, BigQuery).
        </p>
      </Card>
    </Grid>,

    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      Real-World War Story: MongoDB's Early Reputation Crisis
    </h3>,
    <p key="18" className="mb-4">
      In 2013-2015, MongoDB gained a reputation for <strong>data loss</strong>. The default configuration didn't wait for writes to be acknowledged by disk (<code>w:0</code>), meaning "success" responses were sent before data was durable. Server crashes = lost data.
    </p>,
    <Grid key="19" cols={2} gap={6} className="my-8">
      <Card title="What Went Wrong">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>Default write concern: <code>w:0</code>&nbsp;(fire-and-forget)</li>
          <li>No journaling enabled by default (pre-3.2)</li>
          <li>Developers assumed "success" = durable write</li>
          <li>Production crashes revealed massive data loss</li>
          <li>Community backlash: "MongoDB is webscale" meme</li>
        </ul>
      </Card>
      <Card title="How MongoDB Fixed It">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>Changed default to <code>w:1</code>&nbsp;(wait for primary acknowledgment)</li>
          <li>Enabled journaling by default (MongoDB 3.2+)</li>
          <li>Added ACID transactions (MongoDB 4.0+)</li>
          <li>Improved documentation on write concerns</li>
          <li>Now considered production-ready for most use cases</li>
        </ul>
      </Card>
    </Grid>,

    <h3 key="20" className="text-xl font-bold mt-8 mb-4">
      Common Mistakes When Choosing Databases
    </h3>,
    <MistakeCard
      key="21"
      number={1}
      title="Choosing NoSQL for 'Scalability' Without Need"
      problem="Startups choose MongoDB because 'it scales' when they have 1000 users and will never hit SQL's scaling limits. They sacrifice ACID guarantees, foreign keys, and mature tooling for hypothetical scale they'll never need."
      solution="Start with PostgreSQL. It handles 100k requests/sec on a single server. Only migrate to NoSQL when you have concrete evidence of scaling bottlenecks (millions of users, petabytes of data). Premature optimization is the root of all evil."
    />,
    <MistakeCard
      key="22"
      number={2}
      title="Using NoSQL for Highly Relational Data"
      problem="Storing a social network in MongoDB where every query needs to fetch users, friends, posts, and comments separately. This results in N+1 queries, slow performance, and complex application code to manually JOIN data."
      solution="If your data has many-to-many relationships and you frequently need to query across entities, use SQL. NoSQL is for document-centric data with minimal relationships. Don't fight the database's design."
    />,
    <MistakeCard
      key="23"
      number={3}
      title="Ignoring Polyglot Persistence"
      problem="Forcing all data into one database type. Using PostgreSQL for caching (slow) or MongoDB for financial transactions (unsafe)."
      solution="Use the right tool for each job: PostgreSQL for transactional data, Redis for caching, Elasticsearch for full-text search, Cassandra for time-series logs. Modern apps use 3-5 different databases, each optimized for specific access patterns."
    >
      <CodeBlock
        language="javascript"
        code={`// Polyglot Persistence Example
class UserService {
  // PostgreSQL: Transactional data (ACID)
  async createUser(data) {
    return await postgres.query('INSERT INTO users ...');
  }
  
  // Redis: Session cache (fast reads)
  async getUserSession(userId) {
    return await redis.get(\`session:\${userId}\`);
  }
  
  // Elasticsearch: Full-text search
  async searchUsers(query) {
    return await elasticsearch.search({ query });
  }
  
  // Cassandra: Activity logs (high write throughput)
  async logActivity(userId, action) {
    return await cassandra.execute(
      'INSERT INTO activity_log (user_id, action, timestamp) VALUES (?, ?, ?)'
    );
  }
}`}
      />
    </MistakeCard>,

    <h3 key="24" className="text-xl font-bold mt-8 mb-4">
      The Convergence: SQL and NoSQL Are Merging
    </h3>,
    <p key="25" className="mb-4">
      Modern databases are blurring the lines between SQL and NoSQL:
    </p>,
    <Table
      key="26"
      headers={["Database", "SQL Feature in NoSQL", "NoSQL Feature in SQL"]}
      rows={[
        ["PostgreSQL", "N/A (is SQL)", "JSONB columns (document storage), horizontal scaling (Citus)"],
        ["MongoDB", "ACID transactions (4.0+), SQL-like aggregation pipeline", "N/A (is NoSQL)"],
        ["CockroachDB", "Distributed SQL with ACID", "Horizontal scaling like Cassandra"],
        ["DynamoDB", "PartiQL (SQL-like query language)", "N/A (is NoSQL)"],
        ["MySQL", "N/A (is SQL)", "JSON columns, document store mode"]
      ]}
    />,
    <Callout key="27" type="info" title="PostgreSQL's JSONB: Best of Both Worlds">
      PostgreSQL's <code>JSONB</code>&nbsp;column type lets you store flexible JSON documents while keeping ACID guarantees and relational features. You can <code>JOIN</code>&nbsp;JSON columns with regular tables, index JSON fields, and query with SQL. This is why many "NoSQL" use cases now use PostgreSQL instead.
    </Callout>,

    <h3 key="28" className="text-xl font-bold mt-8 mb-4">
      Decision Flow: SQL or NoSQL?
    </h3>,
    <Flow
      key="29"
      steps={[
        { title: "1. Analyze Data Relationships", description: "Highly relational (social graph, e-commerce)? → SQL. Document-centric (CMS, catalogs)? → NoSQL" },
        { title: "2. Check Transaction Requirements", description: "Need ACID guarantees (payments, inventory)? → SQL. Eventual consistency OK? → NoSQL" },
        { title: "3. Estimate Scale", description: "< 10M records, < 10k req/sec? → SQL. Billions of records, 100k+ writes/sec? → NoSQL" },
        { title: "4. Evaluate Query Complexity", description: "Complex JOINs, analytics, aggregations? → SQL. Simple key-value lookups? → NoSQL" },
        { title: "5. Consider Team Expertise", description: "Team knows SQL well? → SQL. Learning curve acceptable? → NoSQL" }
      ]}
    />,

    <h3 key="30" className="text-xl font-bold mt-8 mb-4">
      Industry Sector Breakdown
    </h3>,
    <Table
      key="31"
      headers={["Sector", "Typical Choice", "Reasoning"]}
      rows={[
        ["Fintech / Banking", "SQL (PostgreSQL, Oracle)", "ACID transactions mandatory. Regulatory compliance (SOC2, PCI-DSS). Complex fraud detection queries."],
        ["Social Media", "NoSQL (Cassandra, MongoDB)", "Billions of users, massive write throughput. Eventual consistency acceptable for feeds/likes."],
        ["E-commerce", "SQL (PostgreSQL, MySQL)", "Inventory management requires ACID. Complex queries (search, recommendations, analytics)."],
        ["IoT / Sensors", "NoSQL (Cassandra, InfluxDB)", "Millions of writes/sec from devices. Time-series data. Horizontal scaling essential."],
        ["Healthcare", "SQL (PostgreSQL, SQL Server)", "HIPAA compliance requires audit trails. Relational data (patients, prescriptions, appointments)."],
        ["Gaming", "NoSQL (Redis, DynamoDB)", "Real-time leaderboards, session state. High read/write throughput. Low latency critical."],
        ["SaaS / B2B", "SQL (PostgreSQL)", "Multi-tenant data isolation. Complex reporting. ACID for billing/subscriptions."],
        ["Content / Media", "NoSQL (MongoDB, S3)", "Flexible schemas (articles, videos, metadata). Document-centric. CDN integration."]
      ]}
    />,

    <Callout key="32" type="tip" title="Pro Tip: Start SQL, Add NoSQL Later">
      The best strategy: start with PostgreSQL for everything. As you scale, identify bottlenecks and add specialized databases (Redis for caching, Elasticsearch for search, Cassandra for logs). This is called <strong>polyglot persistence</strong>&nbsp;and is how companies like Uber and Netflix operate at scale.
    </Callout>,

    <h3 key="33" className="text-xl font-bold mt-8 mb-4">
      The Future: NewSQL Databases
    </h3>,
    <p key="34" className="mb-4">
      <strong>NewSQL</strong>&nbsp;databases (CockroachDB, Google Spanner, YugabyteDB) promise the impossible: SQL's ACID guarantees with NoSQL's horizontal scalability. They use distributed consensus algorithms (Raft, Paxos) to maintain consistency across 1000+ nodes.
    </p>,
    <Grid key="35" cols={2} gap={6} className="my-8">
      <Card title="NewSQL Advantages">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>ACID transactions across distributed nodes</li>
          <li>Horizontal scaling like NoSQL (add nodes = more capacity)</li>
          <li>SQL query language (no learning curve)</li>
          <li>Automatic sharding and replication</li>
          <li>Global distribution (multi-region)</li>
        </ul>
      </Card>
      <Card title="NewSQL Tradeoffs">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>Higher latency than single-node SQL (consensus overhead)</li>
          <li>More expensive (distributed systems are complex)</li>
          <li>Less mature ecosystem (fewer tools, extensions)</li>
          <li>Overkill for most applications (< 10M users)</li>
          <li>Operational complexity (need distributed systems expertise)</li>
        </ul>
      </Card>
    </Grid>,
  ],
};
