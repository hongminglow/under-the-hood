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

Welcome to a premier knowledge-sharing platform covering every aspect of networking, devops, and common programming concepts! Below is our continually expanding roadmap of **104 thoroughly researched paradigms**:

| Category                  | Topics Covered                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Focus Areas                                                                                                                                     |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Networking**            | • TCP/IP <br> • DNS <br> • NAT <br> • Web Requests <br> • TCP vs UDP <br> • WebSockets <br> • Load Balancing <br> • HTTP/1-3 <br> • Webhooks <br> • WebRTC <br> • gRPC vs REST <br> • Proxy vs Reverse Proxy <br> • CDN Under the Hood <br> • HTTPS & TLS Handshake <br> • **SSE vs WebSocket vs Long Polling**                                                                                                                                                                                                                                               | • OSI layers <br> • TLS 1.3 <br> • 0-RTT <br> • realtime communication <br> • EventSource API                                                   |
| **Browser Engine**        | • Critical Rendering Path                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | • DOM/CSSOM construction <br> • layout reflows <br> • painting bottlenecks                                                                      |
| **Security & Auth**       | • CORS <br> • OAuth 2.0 & OIDC <br> • JWT vs Session <br> • Web Security <br> • API Rate Limiting <br> • CSP <br> • Passkeys & WebAuthn <br> • Zero Trust Architecture <br> • OAuth 2.0 Flows Deep Dive <br> • DNS Security: DoH vs DoT <br> • Encoding vs Encryption vs Hashing                                                                                                                                                                                                                                                                              | • OWASP Top 10 <br> • BeyondCorp <br> • PKCE <br> • bcrypt vs SHA-256 <br> • password storage                                                   |
| **Software Architecture** | • Rust <br> • Docker <br> • GraphQL vs REST <br> • Microservices <br> • Design Patterns <br> • Message Queues <br> • Caching <br> • Serverless <br> • Saga Pattern <br> • Consistent Hashing <br> • REST API Design <br> • Circuit Breaker <br> • Event-Driven Architecture <br> • Idempotency <br> • Monolith vs Microservices <br> • SOLID Principles <br> • API Gateway Pattern <br> • Dependency Injection & IoC <br> • Pagination Strategies <br> • **Tauri Under the Hood**                                                                             | • BFF <br> • Kong/Envoy <br> • NestJS IoC <br> • cursor vs offset pagination <br> • constructor injection <br> • IPC & Native API               |
| **Databases & Storage**   | • SQL vs NoSQL <br> • CAP Theorem <br> • Database Indexing <br> • ACID Properties <br> • Redis <br> • Database Sharding <br> • Database Replication <br> • Connection Pooling <br> • SQL Query Optimization <br> • N+1 Query Problem <br> • Database Migrations                                                                                                                                                                                                                                                                                               | • PgBouncer <br> • EXPLAIN ANALYZE <br> • ORM traps <br> • Prisma <br> • zero-downtime schema changes                                           |
| **Frontend & UI**         | • React vs Vue vs Angular <br> • **React/Vue vs Vanilla JS Performance** <br> • SSR vs CSR vs SSG vs ISR <br> • WebAssembly <br> • Browser Storage APIs <br> • Vite vs Webpack <br> • Core Web Vitals <br> • React Fiber & Reconciliation <br> • Virtual DOM vs Signals <br> • State Management <br> • CSS Box Model & Layout <br> • Service Workers & PWAs <br> • Web Accessibility <br> • **React Server Components** <br> • **Micro-Frontends** <br> • **Debounce vs Throttle** <br> • **Web Components & Shadow DOM** <br> • **CSS-in-JS vs Utility CSS** | • RSC <br> • Module Federation <br> • Shadow DOM <br> • styled-components vs Tailwind <br> • performance throttling                             |
| **Core Programming**      | • JS Event Loop <br> • V8 Garbage Collection <br> • TypeScript System <br> • Concurrency vs Parallelism <br> • Stack vs Heap <br> • OOP vs FP <br> • Closures & Lexical Scope <br> • Promises vs Observables <br> • Big O & Time Complexity <br> • Hash Tables Internals <br> • Process vs Thread vs Coroutine <br> • Prototypal Inheritance <br> • Error Handling Patterns <br> • Recursion & the Call Stack                                                                                                                                                 | • Prototype chain <br> • ES6 class sugar <br> • Result types <br> • error boundaries <br> • TCO <br> • memoization                              |
| **DevOps & Tooling**      | • CI/CD Pipelines <br> • Git Internals <br> • Kubernetes Architecture <br> • Infrastructure as Code <br> • Monorepo vs Polyrepo <br> • Observability <br> • Twelve-Factor App <br> • Testing Pyramid & Strategies <br> • Environment Variables & Secrets                                                                                                                                                                                                                                                                                                      | • Cloud-native methodology <br> • unit vs integration vs E2E <br> • .env patterns <br> • Vault <br> • secrets rotation                          |
| **AI & Machine Learning** | • **How LLMs Work** <br> • **RAG (Retrieval-Augmented Generation)** <br> • **AI Agents & Tool Use** <br> • **Prompt Engineering Patterns** <br> • **Vector Databases & Embeddings**                                                                                                                                                                                                                                                                                                                                                                           | • Transformers <br> • attention <br> • tokenization <br> • ReAct loops <br> • function calling <br> • pgvector <br> • hybrid search <br> • RLHF |

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

`src/data/knowledge.tsx`

### Steps to Add a New Topic

1. **Create a new topic module** in `src/data/topics/` (example: `my-topic.tsx`) that exports a `Topic`.
2. **Import the topic** into `src/data/knowledge.tsx`.
3. **Add it to the correct section** (example: `id: "frontend"`) by appending it to that section's `topics` array.
4. **Save**. React Router dynamic matching (`/:sectionId/:topicId`) + Fuse.js search will pick it up automatically.

---

## To the AI Agent: Knowledge Storing Directives

Please look at `./SKILL.md` to understand the workflow and constraints for extracting users' questions and auto-categorizing them into this repository.
