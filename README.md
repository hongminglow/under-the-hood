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

Welcome to a premier knowledge-sharing platform covering every aspect of networking, devops, and common programming concepts! Below is our continually expanding roadmap of thoroughly researched paradigms:

| Category                  | Topics Covered                                                                                                                               | Focus Areas                                                                                        |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| **Networking**            | TCP/IP, DNS, NAT, Web Requests, TCP vs UDP, WebSockets, Load Balancing, HTTP/1.1 vs HTTP/2 vs HTTP/3, Webhooks vs Polling                    | OSI layers, transport protocols, multiplexing, QUIC, tunneling, high-availability routing, APIs.   |
| **Browser Engine**        | Critical Rendering Path                                                                                                                      | DOM/CSSOM construction, layout reflows, painting bottlenecks.                                      |
| **Security & Auth**       | CORS Policy, OAuth 2.0 & OIDC, JWT vs Session Auth, Web Security (XSS/CSRF/SQLi), API Rate Limiting, Content Security Policy                 | Pre-flight handshakes, token validation, OWASP Top 10, throttling, defense-in-depth headers.       |
| **Software Architecture** | Rust Systems, Docker & Containers, GraphQL vs REST, Microservices, Design Patterns, Message Queues, Caching Strategies, Serverless Computing | Namespaces/cgroups, event-driven CQRS, GoF patterns, cache invalidation, edge cloud computation.   |
| **Databases & Storage**   | SQL vs NoSQL Paradigms, CAP Theorem, Database Indexing & B-Trees                                                                             | ACID vs BASE guarantees, document/graph tradeoffs, network partitioning, B-Tree reads/writes.      |
| **Frontend & UI**         | React vs Vue vs Angular, SSR vs CSR vs SSG vs ISR, WebAssembly                                                                               | Virtual DOM vs Signals, rendering strategies, hydration, meta-frameworks, near-native binary code. |
| **Core Programming**      | JS Event Loop, V8 Garbage Collection, TypeScript Type System, Concurrency vs Parallelism, Stack vs Heap, OOP vs Functional                   | Microtask queues, generational GC, structural typing, memory allocation, programming paradigms.    |
| **DevOps & Tooling**      | CI/CD Pipelines, Git Internals, Kubernetes Architecture, Infrastructure as Code (Terraform)                                                  | Automated deployments, zero-downtime rollouts, object stores, container orchestration, HCL State.  |

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
