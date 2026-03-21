import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const ssrVsCsrTopic: Topic = {
  id: "ssr-vs-csr",
  title: "SSR vs CSR vs SSG vs ISR",
  description:
    "How to theoretically deliver your React logic across the globe so Google SEO doesn't viciously penalize you.",
  tags: ["frontend", "architecture", "react", "nextjs"],
  icon: "Globe",
  content: [
    <p key="1">
      When you run `create-react-app`, your physical HTML file is literally empty: `&lt;div id="root"&gt;&lt;/div&gt;`. The user stares at a stark white screen for 3 seconds while your massive 2MB `bundle.js` downloads and magically physical injects the entire DOM via Javascript.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The NextJS Rendering Matrix
    </h3>,
    <Table
      key="3"
      headers={["Acronym", "Name", "How it renders HTML", "Best For"]}
      rows={[
        [
          "CSR",
          "Client-Side Rendering",
          "Traditional React. Sends empty HTML. The User's iPhone burns CPU safely building the UI.",
          "Internal SaaS Dashboards hidden behind an Auth login. (SEO explicitly does not matter)."
        ],
        [
          "SSR",
          "Server-Side Rendering",
          "You physically run a real Node server. When a user requests a page, the server aggressively builds the full HTML string on the fly and sends it instantly. Great for SEO, but heavy on your AWS bill.",
          "Dynamic content that changes every second (Twitter Feed, Stock Prices)."
        ],
        [
          "SSG (Next)",
          "Static-Site Generation",
          "During your actual GitHub Actions CI/CD Build phase, it pre-renders every single page into hardcore physical HTML files. It is insanely fast (CDN speed), but requires a full re-deploy to update.",
          "Marketing sites, Blogs, Documentation pages."
        ],
        [
          "ISR",
          "Incremental Static",
          "SSG is magically fast, but if a price changes organically, you can tell NextJS to 'Regenerate this specific page in the background at most once every 60 seconds'. The perfect hybrid.",
          "Ecommerce product pages where prices update periodically."
        ]
      ]}
    />,
    <Callout key="4" type="warning" title="Hydration">
      If a server sends pure HTML (SSR/SSG), it looks great instantly, but buttons won't work yet. React must download the Javascript bundle in the background and silently attach event listeners securely to the static buttons. This process is called <strong>Hydration</strong>.
    </Callout>,
  ],
};
