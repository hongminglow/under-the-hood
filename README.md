# Under The Hood Knowledge Base

An enterprise-ready, scalable knowledge-sharing platform covering every aspect of networking, programming, and software engineering. We summarize incredibly popular and highly-debated topics into robust, deeply-researched, bite-sized articles. Built with React 19, Tailwind v4, and React Router v7.

## Key Features

- **Neon / Dark Green Enterprise Aesthetics:** A robust deep dark UI focusing on readability and neon accents for clear syntax definitions.
- **Accordion Sidebar Layout:** Collapsible sidebar mapping large overarching sections down to specific bite-sized topics.
- **1-to-1 Route Mapping:** Every topic gets its own route (`/networking/tcp-ip`).
- **Scroll Restoration:** Maintains your scroll position as you jump across deep technical articles.
- **Global Markdown Search:** Use `Ctrl + K` to trigger a modal overlay for fuzzy-searching across entire sections and tags.

---

## Current Progress & Covered Topics

Welcome to a premier knowledge-sharing platform covering every aspect of networking, devops, and common programming concepts! Below is our continually expanding roadmap of **90+ thoroughly researched paradigms**:

| Category                  | Topics Covered                                                                                                                                                                                                                                                                                                                                  | Focus Areas                                                                                   |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **Networking**            | TCP/IP, DNS, NAT, Web Requests, TCP vs UDP, WebSockets, Load Balancing, HTTP/1-3, Webhooks, WebRTC, gRPC vs REST, Proxy vs Reverse Proxy, CDN Under the Hood, **HTTPS & TLS Handshake**                                                                                                                                                         | OSI layers, transport protocols, TLS 1.3, 0-RTT, certificate chains, edge caching.            |
| **Browser Engine**        | Critical Rendering Path                                                                                                                                                                                                                                                                                                                         | DOM/CSSOM construction, layout reflows, painting bottlenecks.                                 |
| **Security & Auth**       | CORS, OAuth 2.0 & OIDC, JWT vs Session, Web Security, API Rate Limiting, CSP, Passkeys & WebAuthn, Zero Trust Architecture, OAuth 2.0 Flows Deep Dive, DNS Security: DoH vs DoT, **Encoding vs Encryption vs Hashing**                                                                                                                          | OWASP Top 10, BeyondCorp, PKCE, bcrypt vs SHA-256, password storage.                          |
| **Software Architecture** | Rust, Docker, GraphQL vs REST, Microservices, Design Patterns, Message Queues, Caching, Serverless, Saga Pattern, Consistent Hashing, REST API Design, Circuit Breaker, Event-Driven Architecture, Idempotency, Monolith vs Microservices, SOLID Principles, **API Gateway Pattern**, **Dependency Injection & IoC**, **Pagination Strategies** | BFF, Kong/Envoy, NestJS IoC, cursor vs offset pagination, constructor injection.              |
| **Databases & Storage**   | SQL vs NoSQL, CAP Theorem, Database Indexing, ACID Properties, Redis, Database Sharding, Database Replication, **Connection Pooling**, **SQL Query Optimization**, **N+1 Query Problem**, **Database Migrations**                                                                                                                               | PgBouncer, EXPLAIN ANALYZE, ORM traps, Prisma, zero-downtime schema changes.                  |
| **Frontend & UI**         | React vs Vue vs Angular, SSR vs CSR vs SSG vs ISR, WebAssembly, Browser Storage APIs, Vite vs Webpack, Core Web Vitals, React Fiber & Reconciliation, Virtual DOM vs Signals, **State Management Patterns**, **CSS Box Model & Layout**, **Service Workers & PWAs**, **Web Accessibility (a11y)**                                               | Redux vs Zustand debate, Flexbox vs Grid, offline-first, WCAG 2.2, POUR principles.           |
| **Core Programming**      | JS Event Loop, V8 Garbage Collection, TypeScript System, Concurrency vs Parallelism, Stack vs Heap, OOP vs FP, Closures & Lexical Scope, Promises vs Observables, Big O & Time Complexity, Hash Tables Internals, Process vs Thread vs Coroutine, **Prototypal Inheritance**, **Error Handling Patterns**, **Recursion & the Call Stack**       | Prototype chain, ES6 class sugar, Result types, error boundaries, TCO, memoization.           |
| **DevOps & Tooling**      | CI/CD Pipelines, Git Internals, Kubernetes Architecture, Infrastructure as Code, Monorepo vs Polyrepo, Observability, **Twelve-Factor App**, **Testing Pyramid & Strategies**, **Environment Variables & Secrets**                                                                                                                              | Cloud-native methodology, unit vs integration vs E2E, .env patterns, Vault, secrets rotation. |

---

## Technical Stack

- **Framework:** React + Vite
- **Styling:** TailwindCSS v4 with `@tailwindcss/vite`
- **Routing:** React Router DOM (with `createBrowserRouter` and `ScrollRestoration`)
- **Search:** `Fuse.js` for fuzzy search filtering
- **Icons:** Lucide React

---

## Adding a Topic Manually (Step-By-Step)

To continuously scale our knowledge well, new topics and sections can be manually added via our dedicated data store file. AI models working on this project must strictly follow these instructions.

### Target File

`src/data/knowledge.ts`

### Steps to Add a New Topic

1. **Locate the `knowledgeBase` array** in `src/data/knowledge.ts`.
2. **Find the matching Section** (e.g. `id: "networking"`). If the section doesn't exist, create a new section object:
   ```typescript
   {
     id: "my-new-section",
     title: "My New Section",
     topics: []
   }
   ```
3. **Append your new Topic object** to that section's `topics` array.
   Follow this interface format carefully:
   ```typescript
   {
     id: "my-topic-id", // must be URL safe (lowercase, dashes)
     title: "Detailed Topic Title",
     description: "A short 1-2 sentence overview of the topic.",
     tags: ["tag1", "tag2"],
     content: `Your detailed markdown content and summarized answer goes here.`
   }
   ```
4. **Save the file**. Because the application is fully reactive via React Router dynamic matching (`/:sectionId/:topicId`) and Fuse.js, the new topic will instantly appear in the sidebar, be globally searchable, and generate its own unique route.

---

## To the AI Agent: Knowledge Storing Directives

Please look at `./SKILL.md` to understand the workflow and constraints for extracting users' questions and auto-categorizing them into this repository.
