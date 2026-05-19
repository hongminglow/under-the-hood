import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Flow } from "@/components/ui/Flow";
import { MistakeCard } from "@/components/ui/MistakeCard";
import {
  Flame,
  Database,
  Shield,
  Cloud,
  Lock,
  HardDrive,
  Wrench,
} from "lucide-react";

export const baasProvidersComparisonTopic: Topic = {
  id: "baas-providers-comparison",
  title: "BaaS: Firebase vs Supabase vs Self-Hosted",
  description:
    "What Backend-as-a-Service providers actually give you, how Firebase, Supabase, and Appwrite compare architecturally, and when self-hosting your own backend is worth the operational cost.",
  tags: [
    "backend",
    "firebase",
    "supabase",
    "appwrite",
    "baas",
    "architecture",
  ],
  icon: "Cloud",
  content: [
    <p key="1" className="text-slate-300 mb-6">
      Backend-as-a-Service (BaaS) platforms bundle authentication, databases,
      file storage, serverless functions, and realtime subscriptions into a
      single managed product. They let small teams ship production apps without
      building, deploying, or maintaining any server infrastructure. But they
      come with architectural tradeoffs that become expensive to reverse later.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      What a BaaS Actually Provides
    </h3>,
    <p key="3" className="text-slate-300 mb-6">
      A BaaS is not just a hosted database. It is an integrated stack of
      services that replaces what would traditionally be an entire backend team.
      Here is what the major providers bundle:
    </p>,
    <Flow
      key="4"
      steps={[
        {
          title: "Authentication",
          description:
            "Email/password, OAuth (Google, GitHub, Apple), magic links, phone OTP — all pre-built. No password hashing, session management, or token rotation to implement yourself.",
        },
        {
          title: "Database",
          description:
            "A managed database with client-side SDKs that let your frontend read/write data directly — secured by row-level rules or policies instead of custom API endpoints.",
        },
        {
          title: "File Storage",
          description:
            "Upload, transform, and serve files (images, videos, documents) with automatic CDN distribution and access control tied to your auth system.",
        },
        {
          title: "Serverless Functions",
          description:
            "Run custom server-side logic without managing servers. Triggered by HTTP requests, database events, scheduled crons, or auth lifecycle hooks.",
        },
        {
          title: "Realtime",
          description:
            "Subscribe to database changes, broadcast events, or build presence systems — without managing WebSocket infrastructure yourself.",
        },
      ]}
    />,

    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Major Players
    </h3>,
    <Grid key="6" cols={3} gap={6} className="my-8">
      <FeatureCard
        icon={Flame}
        title="Firebase"
        subtitle="Google Cloud · Proprietary"
        theme="amber"
      >
        <p className="text-xs text-amber-200/70 mb-2">
          The original BaaS. Launched in 2012, acquired by Google in 2014.
          Deeply integrated with the Google Cloud ecosystem.
        </p>
        <ul className="text-xs text-amber-200/70 list-disc pl-4 space-y-1">
          <li>
            <strong className="text-amber-400">Firestore:</strong> NoSQL
            document database with realtime sync.
          </li>
          <li>
            <strong className="text-amber-400">Auth:</strong> Mature auth
            system with 20+ providers.
          </li>
          <li>
            <strong className="text-amber-400">Cloud Functions:</strong>{" "}
            Node.js/Python serverless functions on Google Cloud.
          </li>
          <li>
            <strong className="text-amber-400">Hosting:</strong> CDN-backed
            static hosting with preview channels.
          </li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={Database}
        title="Supabase"
        subtitle="Open-Source · PostgreSQL"
        theme="cyan"
      >
        <p className="text-xs text-cyan-200/70 mb-2">
          The "open-source Firebase alternative." Built on PostgreSQL, PostgREST,
          GoTrue, and Realtime — all standard open-source tools.
        </p>
        <ul className="text-xs text-cyan-200/70 list-disc pl-4 space-y-1">
          <li>
            <strong className="text-cyan-400">PostgreSQL:</strong> Full SQL
            database — joins, indexes, constraints, extensions.
          </li>
          <li>
            <strong className="text-cyan-400">Row-Level Security:</strong>{" "}
            PostgreSQL RLS policies replace custom API auth logic.
          </li>
          <li>
            <strong className="text-cyan-400">Edge Functions:</strong> Deno
            runtime for serverless logic at the edge.
          </li>
          <li>
            <strong className="text-cyan-400">Realtime:</strong> WebSocket
            subscriptions to Postgres changes via logical replication.
          </li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={Shield}
        title="Appwrite"
        subtitle="Open-Source · Self-Hostable"
        theme="violet"
      >
        <p className="text-xs text-violet-200/70 mb-2">
          Self-hosted-first BaaS. Runs as Docker containers. Designed for teams
          that want BaaS convenience without cloud vendor dependency.
        </p>
        <ul className="text-xs text-violet-200/70 list-disc pl-4 space-y-1">
          <li>
            <strong className="text-violet-400">MariaDB:</strong> Relational
            backend with a document-style API layer.
          </li>
          <li>
            <strong className="text-violet-400">Functions:</strong> Supports
            30+ runtimes (Node, Python, Dart, Rust, etc.).
          </li>
          <li>
            <strong className="text-violet-400">Self-hosting:</strong> Single{" "}
            <code>docker compose up</code> deployment on any VPS.
          </li>
          <li>
            <strong className="text-violet-400">Privacy:</strong> Data stays
            on your infrastructure — ideal for regulated industries.
          </li>
        </ul>
      </FeatureCard>
    </Grid>,

    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Architectural Deep Dive: How They Differ Under the Hood
    </h3>,
    <p key="8" className="text-slate-300 mb-6">
      Despite offering similar feature sets, these platforms are built on
      fundamentally different architectures. These differences determine your
      data model, query capabilities, migration path, and long-term flexibility.
    </p>,

    <h4 key="9" className="text-lg font-semibold mt-6 mb-3">
      Database Architecture
    </h4>,
    <Grid key="10" cols={2} gap={6} className="my-8">
      <FeatureCard
        icon={Flame}
        title="Firebase: Firestore"
        subtitle="NoSQL Document Model"
        theme="amber"
      >
        <p className="text-xs text-amber-200/70 mb-2">
          Firestore stores data as <strong className="text-amber-400">documents</strong> inside{" "}
          <strong className="text-amber-400">collections</strong>. Each document is a JSON-like
          map of key-value pairs. There are no joins — data is denormalized by
          design.
        </p>
        <ul className="text-xs text-amber-200/70 list-disc pl-4 space-y-1">
          <li>Queries are fast because every query hits an index.</li>
          <li>
            Complex filtering (inequality on multiple fields) requires composite
            indexes that must be created manually.
          </li>
          <li>
            No aggregations (COUNT, SUM, AVG) without Cloud Functions or the
            limited aggregation queries added in 2023.
          </li>
          <li>
            Data duplication is the norm — updating a user's name may require
            writing to dozens of documents.
          </li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={Database}
        title="Supabase: PostgreSQL"
        subtitle="Full Relational SQL"
        theme="cyan"
      >
        <p className="text-xs text-cyan-200/70 mb-2">
          Supabase gives you a real{" "}
          <strong className="text-cyan-400">PostgreSQL</strong> instance. Full SQL, joins,
          constraints, transactions, triggers, views, stored procedures — everything
          you'd get from a self-managed Postgres.
        </p>
        <ul className="text-xs text-cyan-200/70 list-disc pl-4 space-y-1">
          <li>
            PostgREST auto-generates a RESTful API from your schema — no API
            code needed.
          </li>
          <li>
            Schema migrations are standard SQL files, portable to any Postgres
            host.
          </li>
          <li>
            Extensions like <code>pgvector</code>, <code>PostGIS</code>,{" "}
            <code>pg_cron</code> are available.
          </li>
          <li>
            Row-Level Security policies enforce auth at the database level.
          </li>
        </ul>
      </FeatureCard>
    </Grid>,

    <h4 key="11" className="text-lg font-semibold mt-6 mb-3">
      Security Model
    </h4>,
    <Grid key="12" cols={2} gap={6} className="my-8">
      <FeatureCard
        icon={Lock}
        title="Firebase Security Rules"
        subtitle="Custom DSL on the Server"
        theme="amber"
      >
        <p className="text-xs text-amber-200/70">
          Firebase uses a{" "}
          <strong className="text-amber-400">custom rules language</strong> (not
          JavaScript) to define who can read/write which documents. Rules are
          evaluated server-side before any operation executes. They can reference
          the auth token, the existing document, and the incoming write data.
          The language is powerful but proprietary — debug tooling is limited
          and complex rules can become hard to reason about.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Lock}
        title="Supabase RLS Policies"
        subtitle="Standard PostgreSQL Feature"
        theme="cyan"
      >
        <p className="text-xs text-cyan-200/70">
          Supabase uses{" "}
          <strong className="text-cyan-400">
            PostgreSQL Row-Level Security
          </strong>{" "}
          — a standard database feature. Policies are written in SQL and
          evaluated by the database engine itself. Because they are standard
          SQL, you can test them locally, version them in migrations, and they
          work identically on any Postgres host. The tradeoff is that SQL
          policies can be verbose for complex authorization logic.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      Head-to-Head Comparison
    </h3>,
    <Table
      key="14"
      headers={["Dimension", "Firebase", "Supabase", "Appwrite", "Self-Hosted"]}
      rows={[
        [
          "Database",
          "Firestore (NoSQL documents) or RTDB (JSON tree).",
          "PostgreSQL (full relational SQL).",
          "MariaDB with document-style API.",
          "Any database you choose (Postgres, MySQL, MongoDB, etc.).",
        ],
        [
          "Query power",
          "Limited. No joins, basic filtering, manual composite indexes.",
          "Full SQL. Joins, CTEs, window functions, aggregations, extensions.",
          "Moderate. Collection queries with filters, pagination, basic relations.",
          "Unlimited — depends entirely on your database and ORM choices.",
        ],
        [
          "Auth",
          "Firebase Auth. 20+ providers, phone, anonymous, custom tokens.",
          "GoTrue. Email, OAuth, magic links, phone OTP, SAML (enterprise).",
          "Built-in. Email, OAuth, phone, magic URL, teams & permissions.",
          "Build or integrate (Passport.js, Auth0, Clerk, Keycloak, etc.).",
        ],
        [
          "Realtime",
          "Native to Firestore. Automatic sync with offline persistence.",
          "Postgres logical replication over WebSocket. Broadcast & presence channels.",
          "Realtime events via WebSocket. Database & auth event subscriptions.",
          "Implement with Socket.io, SSE, or message queues.",
        ],
        [
          "Functions",
          "Cloud Functions (Node.js/Python). Tight GCP integration.",
          "Edge Functions (Deno). Also supports Database Functions (PL/pgSQL).",
          "30+ runtimes. Functions run as isolated containers.",
          "Express/Fastify/NestJS routes — full control over runtime and framework.",
        ],
        [
          "Vendor lock-in",
          "High. Firestore data model and security rules are proprietary. Migration requires re-architecture.",
          "Low. PostgreSQL is portable. RLS policies, SQL migrations, and data export to any Postgres host.",
          "Low. Self-hostable. MariaDB is standard. Data is always on your infrastructure.",
          "None. You own everything.",
        ],
        [
          "Pricing model",
          "Pay-per-read/write/delete + storage + bandwidth. Can spike unpredictably.",
          "Usage-based tiers. Free tier generous. Predictable pricing at scale.",
          "Free to self-host. Cloud pricing is usage-based.",
          "Fixed infrastructure cost (VPS/cloud VM). Scales linearly and predictably.",
        ],
        [
          "Scaling",
          "Automatic. Google-grade infrastructure. Near-infinite horizontal scaling.",
          "Managed Postgres with connection pooling (Supavisor). Scales well but has connection limits.",
          "Manual scaling when self-hosted. Cloud tier handles it automatically.",
          "You manage replication, load balancing, caching, and failover.",
        ],
      ]}
    />,

    <h3 key="15" className="text-xl font-bold mt-8 mb-4">
      BaaS vs Self-Hosted: The Real Tradeoff
    </h3>,
    <p key="16" className="text-slate-300 mb-6">
      The decision is not "which BaaS" — it's whether to use a BaaS at all.
      The tradeoff is between{" "}
      <strong>development velocity</strong> and{" "}
      <strong>long-term control</strong>.
    </p>,
    <Grid key="17" cols={2} gap={6} className="my-8">
      <FeatureCard
        icon={Cloud}
        title="BaaS (Managed)"
        subtitle="Speed over control"
        theme="emerald"
      >
        <ul className="text-xs text-red-200/70 list-disc pl-4 space-y-1">
          <li>
            <strong className="text-red-400">Ship in hours, not weeks.</strong>{" "}
            Auth, database, storage, and realtime are pre-built. Focus on
            product logic instead of infrastructure.
          </li>
          <li>
            <strong className="text-red-400">Zero DevOps.</strong> No servers to
            patch, no backups to configure, no SSL certificates to rotate.
          </li>
          <li>
            <strong className="text-red-400">Built-in scaling.</strong> The
            provider handles traffic spikes, replication, and failover.
          </li>
          <li>
            <strong className="text-red-400">Cost at scale.</strong> Per-operation
            pricing can become expensive with high read/write volumes.
          </li>
          <li>
            <strong className="text-red-400">Vendor coupling.</strong> Your data
            model, auth system, and business logic become entangled with the
            provider's APIs.
          </li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={HardDrive}
        title="Self-Hosted"
        subtitle="Control over speed"
        theme="sky"
      >
        <ul className="text-xs text-sky-200/70 list-disc pl-4 space-y-1">
          <li>
            <strong className="text-sky-400">Total flexibility.</strong> Choose
            any database, any framework, any hosting provider. No artificial
            constraints on your architecture.
          </li>
          <li>
            <strong className="text-sky-400">Predictable costs.</strong> Fixed
            VPS/cloud pricing. No surprise bills from read/write spikes.
          </li>
          <li>
            <strong className="text-sky-400">Data sovereignty.</strong> Full
            control over where data lives — critical for GDPR, HIPAA, or
            government contracts.
          </li>
          <li>
            <strong className="text-sky-400">Operational burden.</strong> You own
            uptime, backups, security patches, monitoring, scaling, and
            on-call rotations.
          </li>
          <li>
            <strong className="text-sky-400">Slower iteration.</strong> Building
            auth, file upload, and realtime from scratch takes weeks of
            engineering time.
          </li>
        </ul>
      </FeatureCard>
    </Grid>,

    <Callout key="18" type="info" title="The Middle Path: Open-Source BaaS + Your Infrastructure">
      You don't have to choose between fully managed and fully DIY.{" "}
      <strong>Supabase</strong> and <strong>Appwrite</strong> can be self-hosted
      on your own VPS (DigitalOcean, Hetzner, AWS EC2). You get the BaaS
      developer experience — client SDKs, auth, realtime — while keeping full
      control over your data and infrastructure. This is increasingly popular
      for teams that want BaaS velocity without vendor lock-in.
    </Callout>,

    <h3 key="19" className="text-xl font-bold mt-8 mb-4">
      When to Use What
    </h3>,
    <Grid key="20" cols={2} gap={6} className="my-8">
      <FeatureCard
        icon={Flame}
        title="Choose Firebase When..."
        subtitle=""
        theme="amber"
      >
        <ul className="text-xs text-amber-200/70 list-disc pl-4 space-y-1">
          <li>You need rock-solid offline sync for mobile apps.</li>
          <li>Your data model is naturally document-oriented (no complex joins).</li>
          <li>You want deep GCP integration (BigQuery, Cloud Run, Vertex AI).</li>
          <li>You're building real-time collaborative features (Firestore listeners).</li>
          <li>Your team is small and velocity matters more than long-term portability.</li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={Database}
        title="Choose Supabase When..."
        subtitle=""
        theme="cyan"
      >
        <ul className="text-xs text-cyan-200/70 list-disc pl-4 space-y-1">
          <li>Your data is relational and you need SQL (joins, aggregations, constraints).</li>
          <li>You want a portable backend you can migrate away from anytime.</li>
          <li>You need PostgreSQL extensions (pgvector, PostGIS, pg_cron).</li>
          <li>Your team knows SQL and prefers standard tooling over proprietary DSLs.</li>
          <li>You want the option to self-host later without re-architecting.</li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={Shield}
        title="Choose Appwrite When..."
        subtitle=""
        theme="violet"
      >
        <ul className="text-xs text-violet-200/70 list-disc pl-4 space-y-1">
          <li>Self-hosting is a hard requirement (compliance, data residency).</li>
          <li>You want a single Docker Compose deployment for the full stack.</li>
          <li>Your functions need runtimes beyond Node/Python (Dart, Rust, Go, etc.).</li>
          <li>You want built-in team management with roles and permissions.</li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={Wrench}
        title="Choose Self-Hosted When..."
        subtitle=""
        theme="sky"
      >
        <ul className="text-xs text-sky-200/70 list-disc pl-4 space-y-1">
          <li>You need a custom architecture that no BaaS can accommodate.</li>
          <li>Your business logic is complex enough to justify a dedicated backend team.</li>
          <li>You're at scale where BaaS per-operation pricing becomes prohibitive.</li>
          <li>You require specific databases, message queues, or caching layers.</li>
          <li>Regulatory requirements demand full infrastructure ownership.</li>
        </ul>
      </FeatureCard>
    </Grid>,

    <h3 key="21" className="text-xl font-bold mt-8 mb-4">
      How the Client SDK Pattern Works
    </h3>,
    <p key="22" className="text-slate-300 mb-6">
      The fundamental architectural shift of a BaaS is eliminating the
      traditional backend API layer. Instead of{" "}
      <code className="text-cyan-300 bg-slate-800 px-1 rounded">
        Frontend → Your API → Database
      </code>
      , the pattern becomes{" "}
      <code className="text-cyan-300 bg-slate-800 px-1 rounded">
        Frontend → BaaS SDK → Managed Database
      </code>
      . Here is how that changes the request lifecycle:
    </p>,
    <Flow
      key="23"
      steps={[
        {
          title: "1. Frontend Calls the SDK",
          description:
            "Your React/Vue/mobile app calls supabase.from('posts').select('*') or firebase.firestore().collection('posts').get(). This is a direct database query from the client.",
        },
        {
          title: "2. SDK Attaches Auth Token",
          description:
            "The SDK automatically includes the user's JWT token in the request header. You never manually manage auth headers.",
        },
        {
          title: "3. Server Evaluates Security Rules",
          description:
            "The BaaS server checks the auth token against your security rules (Firebase Rules) or RLS policies (Supabase). If the user doesn't have access, the query is rejected before touching data.",
        },
        {
          title: "4. Database Executes Query",
          description:
            "If authorized, the query runs against the managed database. Results are filtered by the security policies — users only see data they're permitted to see.",
        },
        {
          title: "5. Response Returns to Client",
          description:
            "The SDK deserializes the response and returns typed data to your component. For realtime subscriptions, a WebSocket connection pushes changes continuously.",
        },
      ]}
    />,

    <Callout key="24" type="warning" title="The Security Implication">
      With BaaS, your frontend has <strong>direct database access</strong>.
      This means your security rules / RLS policies are your{" "}
      <strong>only line of defense</strong>. A misconfigured rule doesn't just
      expose an API endpoint — it exposes your entire database. This is the #1
      source of BaaS security incidents. Always test your rules exhaustively,
      and default to deny-all policies that you selectively open.
    </Callout>,

    <h3 key="25" className="text-xl font-bold mt-8 mb-4">
      Common Pitfalls
    </h3>,
    <Grid key="26" cols={2} gap={6}>
      <MistakeCard
        number={1}
        title="Firebase Lock-in Surprise"
        problem="Team builds an entire product on Firestore's document model, then realizes they need SQL joins, aggregations, or multi-field inequality queries. Migrating the data model requires a complete re-architecture."
        solution="Before choosing Firebase, map your data relationships. If you need joins, foreign keys, or complex queries, use Supabase or a relational database from the start. The migration cost from NoSQL to SQL grows exponentially with data volume."
      />
      <MistakeCard
        number={2}
        title="Wide-Open Security Rules"
        problem="Shipping with allow read, write: if true (Firebase) or no RLS policies enabled (Supabase). Bots scrape or delete the entire database within hours."
        solution="Start with deny-all rules and selectively open access. Test with the Firebase Rules Emulator or Supabase's RLS policy tester. Treat security rules as production code — version them, review them, test them."
      />
      <MistakeCard
        number={3}
        title="Surprise Bills from Read Operations"
        problem="Firebase charges per document read. A list page rendering 500 items = 500 reads. Add a realtime listener and every change triggers reads across all connected clients."
        solution="Use pagination, caching, and aggregation queries. Avoid realtime listeners on large collections. Monitor usage dashboards daily during development. Set billing alerts."
      />
      <MistakeCard
        number={4}
        title="Assuming BaaS Replaces All Backend Logic"
        problem="Complex business logic (payment processing, multi-step workflows, third-party API orchestration) doesn't fit cleanly into serverless functions with cold-start latency."
        solution="Use BaaS for CRUD, auth, and storage. Use a dedicated backend service (Express, NestJS, FastAPI) for complex business logic. Hybrid architectures are the norm at scale."
      />
    </Grid>,

    <Callout key="27" type="tip" title="The Hybrid Pattern at Scale">
      Most production apps outgrow a pure BaaS architecture. The mature pattern
      is: use BaaS for <strong>auth + storage + realtime</strong> (where the
      managed services genuinely save time), and build a dedicated API for{" "}
      <strong>business logic + integrations + complex queries</strong>. This
      gives you BaaS velocity for commodity features while keeping full control
      over your core domain logic.
    </Callout>,
  ],
};
