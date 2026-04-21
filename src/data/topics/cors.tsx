import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const corsTopic: Topic = {
  id: "cors",
  title: "CORS (Cross-Origin Resource Sharing)",
  description:
    "Why your perfectly fine API fails entirely in the browser, but works perfectly fine in Postman.",
  tags: ["security", "frontend", "headers", "api-design"],
  icon: "Ban",
  content: [
    <p key="1">
      The most deeply hated error message in all of frontend development: <code>Blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present</code>. 
    </p>,
    <p key="2" className="mt-4">
      As developers, we constantly assume CORS is our backend "blocking" the request, but <strong>CORS is entirely enforced by the Browser!</strong>&nbsp;It is a critical security protection to prevent a malicious website (<code>hackers.com</code>) from making silent background API requests to <code>your-bank.com</code> using your currently logged-in cookies.
    </p>,

    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Real Threat: Why CORS Exists
    </h3>,
    <p key="4" className="mb-4">
      Without CORS, the web would be a security nightmare. Imagine this attack scenario:
    </p>,
    <Card key="5" title="The Attack Without CORS Protection">
      <ol className="text-sm text-slate-400 space-y-2">
        <li>1. You log into <code>bank.com</code> and get an authentication cookie.</li>
        <li>2. You visit <code>evil-site.com</code> (maybe from a phishing email).</li>
        <li>3. Evil site runs JavaScript: <code>fetch('https://bank.com/transfer', &#123; method: 'POST', body: JSON.stringify(&#123; to: 'attacker', amount: 10000 &#125;) &#125;)</code></li>
        <li>4. <strong>Without CORS</strong>: Your browser automatically sends your <code>bank.com</code> cookies with the request. Money transferred. You're broke.</li>
        <li>5. <strong>With CORS</strong>: Browser blocks the request because <code>bank.com</code> didn't whitelist <code>evil-site.com</code>.</li>
      </ol>
    </Card>,
    <Callout key="6" type="warning" title="This is Called CSRF (Cross-Site Request Forgery)">
      CORS is the browser's <strong>first line of defense</strong>&nbsp;against CSRF attacks. It prevents malicious sites from making authenticated requests on your behalf. This is why CORS errors are frustrating but absolutely necessary.
    </Callout>,

    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      What Defines an "Origin"?
    </h3>,
    <p key="8" className="mb-4">
      An origin is the combination of <Highlight variant="primary">protocol</Highlight> + <Highlight variant="primary">domain</Highlight> + <Highlight variant="primary">port</Highlight>. If <em>any</em>&nbsp;of these differ, it's a cross-origin request.
    </p>,
    <Table
      key="9"
      headers={["URL", "Same Origin as https://api.example.com?", "Reason"]}
      rows={[
        ["https://api.example.com/users", "✅ Yes", "Exact match"],
        ["https://api.example.com:443/users", "✅ Yes", "443 is default HTTPS port"],
        ["http://api.example.com", "❌ No", "Different protocol (http vs https)"],
        ["https://example.com", "❌ No", "Different subdomain"],
        ["https://api.example.com:8080", "❌ No", "Different port"],
        ["https://api.example.org", "❌ No", "Different domain"]
      ]}
    />,

    <h3 key="10" className="text-xl font-bold mt-8 mb-4">
      The Preflight OPTIONS Request
    </h3>,
    <p key="11" className="mb-4">
      If a React app at <code>localhost:3000</code> attempts to POST JSON data to <code>api.my-startup.com</code>, they are on two completely different domains (Origins). The browser performs a <strong>preflight check</strong>&nbsp;before sending the actual request.
    </p>,
    <Flow
      key="12"
      steps={[
        { title: "1. Browser Detects Cross-Origin", description: "React app tries to POST to different domain" },
        { title: "2. Preflight OPTIONS Sent", description: "Browser asks: 'Is this allowed?'" },
        { title: "3. Server Responds with CORS Headers", description: "Access-Control-Allow-Origin: localhost:3000" },
        { title: "4. Actual POST Request Sent", description: "Browser proceeds with original request" }
      ]}
    />,
    <Grid key="13" cols={2} gap={6} className="my-8">
      <Card title="The Browser's Paranoia">
        <p className="text-sm text-slate-400">
          Before sending your actual POST request, the browser halts completely. It sends a tiny, invisible <code>OPTIONS</code> request to your backend asking, "Hey Backend, my user is on <code>localhost</code>, are they mathematically allowed to send you this POST?"
        </p>
      </Card>
      <Card title="The Backend's Permission">
        <p className="text-sm text-slate-400">
          If your API server replies with the header <code>Access-Control-Allow-Origin: localhost:3000</code>, the browser sighs in relief and instantly fires the actual POST request. If the backend doesn't reply with that exact header, the browser instantly throws an error and destroys your request.
        </p>
      </Card>
    </Grid>,

    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      Simple vs Preflighted Requests
    </h3>,
    <p key="15" className="mb-4">
      Not all cross-origin requests trigger a preflight. <strong>Simple requests</strong>&nbsp;skip the OPTIONS check and go straight through.
    </p>,
    <Table
      key="16"
      headers={["Request Type", "Triggers Preflight?", "Conditions"]}
      rows={[
        ["GET with no custom headers", "❌ No", "Simple request"],
        ["POST with Content-Type: application/x-www-form-urlencoded", "❌ No", "Simple request"],
        ["POST with Content-Type: application/json", "✅ Yes", "Custom content type"],
        ["Any request with Authorization header", "✅ Yes", "Custom header"],
        ["PUT, DELETE, PATCH", "✅ Yes", "Non-simple method"]
      ]}
    />,
    <Callout key="17" type="info" title="Why Simple Requests Exist">
      Simple requests mirror what HTML forms can do naturally (<code>&lt;form method="POST"&gt;</code>). Since forms have existed since the 1990s, browsers allow these without preflight for backward compatibility.
    </Callout>,

    <h3 key="18" className="text-xl font-bold mt-8 mb-4">
      The Complete CORS Header Reference
    </h3>,
    <Table
      key="19"
      headers={["Header", "Purpose", "Example"]}
      rows={[
        ["Access-Control-Allow-Origin", "Which origins can access the resource", "https://app.example.com or *"],
        ["Access-Control-Allow-Methods", "Which HTTP methods are allowed", "GET, POST, PUT, DELETE"],
        ["Access-Control-Allow-Headers", "Which custom headers are allowed", "Content-Type, Authorization"],
        ["Access-Control-Allow-Credentials", "Allow cookies/auth to be sent", "true"],
        ["Access-Control-Max-Age", "How long to cache preflight response", "86400 (24 hours in seconds)"],
        ["Access-Control-Expose-Headers", "Which response headers JS can read", "X-Total-Count, X-Request-ID"]
      ]}
    />,

    <h3 key="20" className="text-xl font-bold mt-8 mb-4">
      Backend Implementation: The Right Way
    </h3>,
    <CodeBlock
      key="21"
      title="express-server.js"
      language="javascript"
      code={`const express = require('express');
const cors = require('cors');
const app = express();

// ❌ DANGEROUS: Allows ALL origins (never use in production with credentials)
app.use(cors({ origin: '*' }));

// ✅ SAFE: Whitelist specific origins
const allowedOrigins = [
  'https://app.example.com',
  'https://staging.example.com',
  'http://localhost:3000' // Dev environment
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // Cache preflight for 24 hours
}));

app.post('/api/transfer', (req, res) => {
  // Your API logic here
  res.json({ success: true });
});`}
    />,

    <h3 key="22" className="text-xl font-bold mt-8 mb-4">
      The Credentials Trap
    </h3>,
    <p key="23" className="mb-4">
      When sending cookies or Authorization headers, you must set <code>credentials: 'include'</code> on the frontend <strong>AND</strong>&nbsp;<code>Access-Control-Allow-Credentials: true</code> on the backend. But here's the catch:
    </p>,
    <Callout key="24" type="warning" title="The Wildcard Restriction">
      If <code>Access-Control-Allow-Credentials: true</code> is set, you <strong>CANNOT</strong>&nbsp;use <code>Access-Control-Allow-Origin: *</code>. You must specify the exact origin. This is a security requirement to prevent credential leakage.
    </Callout>,
    <Grid key="25" cols={2} gap={6} className="my-8">
      <Card title="Frontend (React)">
        <CodeBlock
          language="javascript"
          code={`fetch('https://api.example.com/data', {
  method: 'POST',
  credentials: 'include', // Send cookies
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ data: 'value' })
});`}
        />
      </Card>
      <Card title="Backend (Express)">
        <CodeBlock
          language="javascript"
          code={`app.use(cors({
  origin: 'https://app.example.com',
  credentials: true // Must be exact origin
}));`}
        />
      </Card>
    </Grid>,

    <h3 key="26" className="text-xl font-bold mt-8 mb-4">
      Common CORS Mistakes & Fixes
    </h3>,
    <MistakeCard
      key="mistake-1"
      number={1}
      title="CORS Middleware Order"
      problem="CORS middleware placed after routes."
      solution="Place CORS middleware before all routes so it runs first."
    >
      <CodeBlock
        language="javascript"
        code={`// ❌ WRONG: CORS never runs for /api/users
app.get('/api/users', (req, res) => res.json(users));
app.use(cors());

// ✅ CORRECT: CORS runs first
app.use(cors());
app.get('/api/users', (req, res) => res.json(users));`}
      />
    </MistakeCard>,
    <MistakeCard
      key="mistake-2"
      number={2}
      title="Forgetting OPTIONS Handler"
      problem="Custom route handlers don't respond to OPTIONS."
      solution="Explicitly handle OPTIONS requests for each route."
    >
      <CodeBlock
        language="javascript"
        code={`// ❌ WRONG: OPTIONS returns 404
app.post('/api/data', handler);

// ✅ CORRECT: Explicitly handle OPTIONS
app.options('/api/data', cors());
app.post('/api/data', cors(), handler);`}
      />
    </MistakeCard>,
    <MistakeCard
      key="mistake-3"
      number={3}
      title="Localhost Port Mismatch"
      problem="localhost:3000 ≠ localhost:3001"
      solution="Use regex to allow all localhost ports in development."
    >
      <CodeBlock
        language="javascript"
        code={`// ❌ WRONG: Only allows port 3000
origin: 'http://localhost:3000'

// ✅ CORRECT: Allow all localhost ports in dev
origin: /^http:\\/\\/localhost:\\d+$/`}
      />
    </MistakeCard>,

    <h3 key="30" className="text-xl font-bold mt-8 mb-4">
      Why Postman Doesn't Care
    </h3>,
    <Callout key="31" type="warning" title="CORS is Browser-Only">
      Postman is not a web browser. It is a desktop application. It couldn't care less about Cross-Origin policies, so it directly hits your API and retrieves the JSON flawlessly. The CORS error purely lives inside Chrome, Safari, and Firefox. This is why your API "works in Postman but not in the browser."
    </Callout>,
    <Table
      key="32"
      headers={["Client", "Enforces CORS?", "Why?"]}
      rows={[
        ["Chrome/Firefox/Safari", "✅ Yes", "Browsers enforce Same-Origin Policy"],
        ["Postman/Insomnia", "❌ No", "Desktop apps, not subject to browser security"],
        ["cURL/wget", "❌ No", "Command-line tools have no origin"],
        ["Mobile Apps (native)", "❌ No", "Not running in browser context"],
        ["Server-to-Server", "❌ No", "No browser involved"]
      ]}
    />,

    <h3 key="33" className="text-xl font-bold mt-8 mb-4">
      Alternative Solutions to CORS
    </h3>,
    <Grid key="34" cols={2} gap={6} className="my-8">
      <Card title="1. Proxy Server (Dev)">
        <p className="text-sm text-slate-400 mb-2">
          In development, use a proxy to avoid CORS entirely.
        </p>
        <CodeBlock
          language="json"
          code={`// package.json (React)
{
  "proxy": "http://localhost:5000"
}

// Now fetch('/api/users') goes to localhost:5000`}
        />
      </Card>
      <Card title="2. Same-Origin Deployment">
        <p className="text-sm text-slate-400 mb-2">
          Deploy frontend and backend on the same domain.
        </p>
        <CodeBlock
          language="text"
          code={`Frontend: example.com
Backend:  example.com/api

No CORS needed - same origin!`}
        />
      </Card>
    </Grid>,
    <Card key="35" title="3. JSONP (Legacy, Avoid)">
      <p className="text-sm text-slate-400 mb-2">
        Before CORS, developers used JSONP (JSON with Padding) by injecting <code>&lt;script&gt;</code> tags. This is <strong>insecure</strong>&nbsp;and deprecated. Never use it.
      </p>
    </Card>,

    <h3 key="36" className="text-xl font-bold mt-8 mb-4">
      Real-World War Stories
    </h3>,
    <Card key="37" title="Story 1: The Wildcard Disaster">
      <p className="text-sm text-slate-400 mb-2">
        A startup set <code>Access-Control-Allow-Origin: *</code> with <code>credentials: true</code> on their payment API. Attackers created phishing sites that made authenticated requests, draining user accounts. The fix? Whitelist only their official domain. Cost: $2M in refunds.
      </p>
    </Card>,
    <Card key="38" title="Story 2: The Preflight Performance Hit">
      <p className="text-sm text-slate-400 mb-2">
        A high-traffic API was getting <strong>double the requests</strong>&nbsp;due to preflight OPTIONS calls. They added <code>Access-Control-Max-Age: 86400</code> to cache preflight responses for 24 hours. Result: 50% reduction in OPTIONS traffic, saving $10K/month in server costs.
      </p>
    </Card>,
    <Card key="39" title="Story 3: The Mobile App Confusion">
      <p className="text-sm text-slate-400 mb-2">
        A team spent 3 days debugging CORS errors in their React Native app. The issue? React Native doesn't enforce CORS (it's not a browser). The real problem was a typo in the API URL. Always check if CORS is actually relevant to your environment.
      </p>
    </Card>,

    <h3 key="40" className="text-xl font-bold mt-8 mb-4">
      Security Best Practices
    </h3>,
    <Grid key="41" cols={2} gap={6} className="my-8">
      <Card title="✅ DO">
        <ul className="text-sm text-slate-400 space-y-2">
          <li>• Whitelist specific origins (never use <code>*</code> with credentials)</li>
          <li>• Use <code>Access-Control-Max-Age</code> to reduce preflight overhead</li>
          <li>• Validate origin dynamically from a database/config</li>
          <li>• Use HTTPS for all cross-origin requests</li>
          <li>• Implement CSRF tokens for state-changing operations</li>
        </ul>
      </Card>
      <Card title="❌ DON'T">
        <ul className="text-sm text-slate-400 space-y-2">
          <li>• Use <code>Access-Control-Allow-Origin: *</code> with authentication</li>
          <li>• Trust the <code>Origin</code> header without validation</li>
          <li>• Disable CORS entirely (use proxy instead)</li>
          <li>• Allow <code>null</code> origin (used by file:// and sandboxed iframes)</li>
          <li>• Expose sensitive headers unnecessarily</li>
        </ul>
      </Card>
    </Grid>,

    <Callout key="42" type="info" title="The Simple Backend Fix">
      Backend developers must install a CORS middleware (like the <code>cors</code> package in Express) and explicitly whitelist the exact frontend domains they wish to allow. Setting it to <code>*</code> is an epic vulnerability for authenticated systems, as it lets ANY domain hit your API.
    </Callout>,

    <h3 key="43" className="text-xl font-bold mt-8 mb-4">
      Debugging CORS Issues
    </h3>,
    <CodeBlock
      key="44"
      title="Browser DevTools Network Tab"
      language="text"
      code={`1. Open DevTools → Network tab
2. Look for the failed request (red)
3. Check the "Response Headers" section:
   - Missing Access-Control-Allow-Origin? Backend issue.
   - Present but wrong value? Origin mismatch.
4. Check if there's an OPTIONS request before your actual request
   - If OPTIONS fails, your POST/PUT/DELETE never fires
5. Look at the "Request Headers" → Origin
   - This is what your backend must whitelist`}
    />,

    <Callout key="45" type="tip" title="Quick Test">
      To test if CORS is configured correctly, run this in your browser console:
      <CodeBlock
        language="javascript"
        code={`fetch('https://your-api.com/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: true })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);`}
      />
      If you see a CORS error, check the Network tab for the exact missing header.
    </Callout>,
  ],
};
