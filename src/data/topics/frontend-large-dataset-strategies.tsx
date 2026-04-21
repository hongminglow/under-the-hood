import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";

export const frontendLargeDatasetTopic: Topic = {
  id: "frontend-large-dataset-strategies",
  title: "Frontend Large Dataset Strategies",
  description:
    "How to render 100,000 rows in a React table without freezing the browser: pagination, virtualization, streaming, and the hidden performance tradeoffs.",
  tags: ["frontend", "performance", "react", "optimization"],
  icon: "Database",
  content: [
    <p key="1">
      Your API returns 50,000 product records. If you naively render all 50,000 <code>&lt;tr&gt;</code> elements into the DOM, the browser will freeze for 10 seconds, scroll will stutter, and your users will rage-quit. The DOM was never designed to hold tens of thousands of elements simultaneously. Modern frontend engineering has evolved multiple strategies to handle this.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Problem: DOM Bloat
    </h3>,
    <p key="3">
      Every DOM node consumes memory (~1KB per element). 50,000 rows × 5 columns = 250,000 DOM nodes = ~250MB of memory just for the table structure. The browser must calculate layout, paint, and composite for every single node. <strong>Scrolling becomes a slideshow.</strong>
    </p>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Strategy Comparison Matrix
    </h3>,
    <Table
      key="5"
      headers={["Strategy", "DOM Nodes", "Network Requests", "UX Feel", "Best For"]}
      rows={[
        [
          "Pagination",
          "Only current page (e.g., 50 rows)",
          "1 per page navigation",
          "Traditional, requires clicking",
          "Admin dashboards, search results"
        ],
        [
          "Infinite Scroll",
          "Accumulates (grows over time)",
          "1 per scroll trigger",
          "Seamless, but memory grows",
          "Social feeds, product catalogs"
        ],
        [
          "Virtual Scrolling",
          "Only visible rows (~20-30)",
          "1 initial fetch (all data)",
          "Instant scroll, feels native",
          "Large tables, logs, spreadsheets"
        ],
        [
          "Windowing (Hybrid)",
          "Only visible + buffer (~50)",
          "Lazy loads chunks on demand",
          "Best of both worlds",
          "Gmail inbox, Slack messages"
        ],
        [
          "Server-Side Rendering",
          "Pre-rendered HTML (static)",
          "0 (cached at CDN)",
          "Instant first paint, no JS needed",
          "SEO-critical lists, blogs"
        ],
        [
          "Web Workers + Streaming",
          "Progressively rendered",
          "1 streaming connection",
          "Non-blocking, shows data as it arrives",
          "Real-time dashboards, analytics"
        ]
      ]}
    />,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      1. Pagination: The Classic Approach
    </h3>,
    <Grid key="7" cols={2} gap={6}>
      <Card title="How It Works">
        <p className="text-sm text-slate-400">
          Backend returns 50 rows per page. Frontend renders exactly 50 rows. User clicks "Next" to fetch page 2. DOM never exceeds 50 rows.
        </p>
      </Card>
      <Card title="The Hidden Cost">
        <p className="text-sm text-slate-400">
          Users must manually click through pages. If they want row 4,832, they need to click "Next" 96 times. Search engines can't crawl paginated content easily (requires <code>rel="next"</code> hints).
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="8"
      language="typescript"
      title="pagination-example.tsx"
      code={`const [page, setPage] = useState(1);
const [data, setData] = useState([]);

useEffect(() => {
  fetch(\`/api/products?page=\${page}&limit=50\`)
    .then(res => res.json())
    .then(setData);
}, [page]);

return (
  <>
    <table>{data.map(row => <tr key={row.id}>...</tr>)}</table>
    <button onClick={() => setPage(p => p + 1)}>Next</button>
  </>
);`}
    />,
    <Callout key="9" type="tip" title="When to Use Pagination">
      Perfect for <strong>admin dashboards</strong> where users expect traditional navigation, or when you need <strong>deep linking</strong> to specific pages (e.g., <code>/products?page=5</code>). Avoid for consumer-facing feeds where users expect continuous scrolling.
    </Callout>,
    <h3 key="10" className="text-xl font-bold mt-8 mb-4">
      2. Infinite Scroll: The Social Media Pattern
    </h3>,
    <p key="11">
      As the user scrolls to the bottom, the app fetches the next batch and <strong>appends</strong> it to the existing DOM. The DOM grows indefinitely. After scrolling through 500 items, you have 500 DOM nodes in memory.
    </p>,
    <Flow
      key="12"
      steps={[
        { title: "1. Initial Load", description: "Fetch first 50 items, render them." },
        { title: "2. User Scrolls", description: "Intersection Observer detects bottom of list." },
        { title: "3. Fetch Next Batch", description: "API call for items 51-100." },
        { title: "4. Append to DOM", description: "React renders 50 more rows. Total: 100 DOM nodes." },
        { title: "5. Repeat Forever", description: "DOM grows to 1,000+ nodes. Memory usage climbs." }
      ]}
    />,
    <CodeBlock
      key="13"
      language="typescript"
      title="infinite-scroll.tsx"
      code={`const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['products'],
  queryFn: ({ pageParam = 0 }) => 
    fetch(\`/api/products?offset=\${pageParam}&limit=50\`).then(r => r.json()),
  getNextPageParam: (lastPage, pages) => 
    lastPage.hasMore ? pages.length * 50 : undefined
});

const observerRef = useRef();
useEffect(() => {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
  });
  if (observerRef.current) observer.observe(observerRef.current);
  return () => observer.disconnect();
}, [hasNextPage]);

return (
  <div>
    {data?.pages.map(page => page.items.map(item => <div key={item.id}>...</div>))}
    <div ref={observerRef} />
  </div>
);`}
    />,
    <Grid key="14" cols={2} gap={6}>
      <Card title="Pros">
        <ul className="text-sm space-y-1 list-disc pl-4 text-slate-400">
          <li>Seamless UX (no clicking)</li>
          <li>Works great for feeds (Twitter, Instagram)</li>
          <li>Easy to implement with React Query</li>
        </ul>
      </Card>
      <Card title="Cons">
        <ul className="text-sm space-y-1 list-disc pl-4 text-slate-400">
          <li>Memory grows indefinitely</li>
          <li>Scroll position is fragile (hard to "jump to top")</li>
          <li>Browser slows down after 1,000+ items</li>
          <li>No way to jump to item #5,000 directly</li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="15" type="warning" title="The Memory Leak Trap">
      After scrolling through 2,000 items, the user's browser is holding 2,000 DOM nodes. If they leave the tab open for hours, memory usage can hit 500MB+. Some apps implement <strong>DOM recycling</strong>: remove items that scrolled out of view (but this breaks browser "Find in Page").
    </Callout>,
    <h3 key="16" className="text-xl font-bold mt-8 mb-4">
      3. Virtual Scrolling: The Performance King
    </h3>,
    <p key="17">
      The breakthrough insight: <strong>only render what's visible</strong>. If the viewport shows 20 rows, render exactly 20 rows. As the user scrolls, dynamically swap out the DOM nodes. The scrollbar thinks there are 50,000 rows (via a tall spacer div), but the DOM only holds 20.
    </p>,
    <CodeBlock
      key="18"
      language="typescript"
      title="virtual-scroll.tsx"
      code={`import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualTable = ({ data }) => {
  const parentRef = useRef();
  const virtualizer = useVirtualizer({
    count: data.length,  // Total: 50,000 items
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,  // Each row is 35px tall
    overscan: 5  // Render 5 extra rows above/below viewport
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: \`translateY(\${virtualRow.start}px)\`
            }}
          >
            {data[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
};`}
    />,
    <Table
      key="19"
      headers={["Metric", "Without Virtualization", "With Virtualization"]}
      rows={[
        ["DOM Nodes", "50,000 rows × 5 cols = 250,000 nodes", "20 visible rows × 5 cols = 100 nodes"],
        ["Memory Usage", "~250MB", "~1MB"],
        ["Initial Render Time", "8-12 seconds", "50ms"],
        ["Scroll FPS", "5-10 FPS (janky)", "60 FPS (smooth)"],
        ["Browser Find (Ctrl+F)", "Works on all 50,000 rows", "Only works on visible 20 rows"]
      ]}
    />,
    <Callout key="20" type="info" title="Libraries">
      <strong>react-window</strong> (lightweight, 7KB) and <strong>@tanstack/react-virtual</strong> (modern, TypeScript-first) are the industry standards. They handle variable row heights, horizontal scrolling, and grid layouts.
    </Callout>,
    <h3 key="21" className="text-xl font-bold mt-8 mb-4">
      4. Windowing (Virtual Scroll + Lazy Loading)
    </h3>,
    <p key="22">
      Combine virtual scrolling with infinite scroll. Initially fetch 1,000 rows, virtualize them. When the user scrolls to row 900, fetch the next 1,000 in the background. The user never waits, and the DOM stays tiny.
    </p>,
    <Grid key="23" cols={2} gap={6}>
      <Card title="Gmail's Approach">
        <p className="text-sm text-slate-400">
          Gmail loads ~50 emails initially. As you scroll, it fetches more in chunks of 50. But it uses virtual scrolling, so the DOM only holds ~30 email rows at any time. This is why Gmail can handle 100,000+ emails without crashing.
        </p>
      </Card>
      <Card title="Slack's Approach">
        <p className="text-sm text-slate-400">
          Slack loads the most recent 100 messages. Scrolling up triggers a fetch for older messages. Virtual scrolling keeps the DOM at ~50 messages. Scrolling down past the initial 100 fetches newer messages. Bidirectional windowing.
        </p>
      </Card>
    </Grid>,
    <h3 key="24" className="text-xl font-bold mt-8 mb-4">
      5. Server-Side Rendering (SSR/SSG)
    </h3>,
    <p key="25">
      For SEO-critical lists (e.g., e-commerce product pages), pre-render the first 50 items as static HTML at build time. The user sees content instantly (no loading spinner). Clicking "Load More" hydrates React and fetches the next batch client-side.
    </p>,
    <CodeBlock
      key="26"
      language="typescript"
      title="nextjs-ssg.tsx"
      code={`// Next.js Static Site Generation
export async function getStaticProps() {
  const products = await db.products.findMany({ take: 50 });
  return { props: { products }, revalidate: 3600 };  // Cache for 1 hour
}

export default function ProductList({ products }) {
  const [items, setItems] = useState(products);  // Start with SSR data
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    const next = await fetch(\`/api/products?page=\${page + 1}\`).then(r => r.json());
    setItems([...items, ...next]);
    setPage(page + 1);
  };

  return (
    <>
      {items.map(p => <ProductCard key={p.id} {...p} />)}
      <button onClick={loadMore}>Load More</button>
    </>
  );
}`}
    />,
    <h3 key="27" className="text-xl font-bold mt-8 mb-4">
      6. Web Workers + Streaming
    </h3>,
    <p key="28">
      For real-time dashboards with millions of data points, fetch data in a Web Worker (off the main thread) and stream it to the UI progressively. The UI renders the first 1,000 rows while the worker is still fetching rows 10,000-50,000.
    </p>,
    <CodeBlock
      key="29"
      language="typescript"
      title="worker-streaming.ts"
      code={`// worker.ts
self.onmessage = async () => {
  const response = await fetch('/api/logs?limit=100000');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    self.postMessage({ type: 'chunk', data: JSON.parse(chunk) });
  }
};

// main.tsx
const worker = new Worker('/worker.js');
worker.onmessage = (e) => {
  if (e.data.type === 'chunk') {
    setData(prev => [...prev, ...e.data.data]);  // Append progressively
  }
};`}
    />,
    <h3 key="30" className="text-xl font-bold mt-8 mb-4">
      Decision Tree: Which Strategy to Use?
    </h3>,
    <Table
      key="31"
      headers={["Scenario", "Recommended Strategy", "Why"]}
      rows={[
        [
          "Admin table with 10,000 rows, users need to search/filter",
          "Virtual Scrolling + Client-side filtering",
          "All data in memory allows instant filtering. Virtualization keeps DOM small."
        ],
        [
          "E-commerce product catalog (SEO critical)",
          "SSG + Pagination",
          "Pre-rendered HTML for SEO. Pagination for deep linking."
        ],
        [
          "Social media feed (infinite content)",
          "Infinite Scroll + DOM recycling",
          "Users expect continuous scrolling. Recycle old nodes to prevent memory leaks."
        ],
        [
          "Gmail-style inbox (100,000+ emails)",
          "Windowing (Virtual + Lazy)",
          "Fetch in chunks, virtualize visible rows. Best performance + UX."
        ],
        [
          "Real-time analytics dashboard",
          "Web Workers + Streaming",
          "Non-blocking data fetching. Progressive rendering."
        ],
        [
          "Spreadsheet app (Google Sheets clone)",
          "Virtual Grid (2D virtualization)",
          "Must handle millions of cells. Only render visible viewport."
        ]
      ]}
    />,
    <Callout key="32" type="warning" title="The Accessibility Trap">
      Virtual scrolling breaks screen readers. A blind user's screen reader announces "List of 50,000 items" but can only navigate the 20 visible ones. <strong>Solution:</strong>&nbsp;Use <code>aria-rowcount</code> and <code>aria-rowindex</code> to hint the total count, or provide a "View All (Accessible)" mode that disables virtualization.
    </Callout>,
    <h3 key="33" className="text-xl font-bold mt-8 mb-4">
      Performance Benchmarks (50,000 Rows)
    </h3>,
    <Table
      key="34"
      headers={["Strategy", "Initial Render", "Memory Usage", "Scroll FPS", "Time to Interactive"]}
      rows={[
        ["Naive (render all)", "12s", "280MB", "8 FPS", "15s"],
        ["Pagination (50/page)", "80ms", "2MB", "60 FPS", "200ms"],
        ["Infinite Scroll", "80ms → grows", "2MB → 150MB", "60 → 20 FPS", "200ms"],
        ["Virtual Scrolling", "60ms", "1.5MB", "60 FPS", "150ms"],
        ["Windowing", "60ms", "1.5MB", "60 FPS", "150ms"]
      ]}
    />,
    <Callout key="35" type="tip" title="The Golden Rule">
      <strong>Never render more than 100 DOM nodes per frame.</strong>&nbsp;If your dataset exceeds 100 items, you need one of these strategies. The browser's layout engine is the bottleneck, not JavaScript execution.
    </Callout>,
  ],
};
