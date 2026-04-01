import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { Highlight } from "@/components/ui/Highlight";

export const nginxUnderTheHoodTopic: Topic = {
  id: "nginx-under-the-hood",
  title: "NGINX Under the Hood",
  description: "An incredibly fast, event-driven web server, reverse proxy, and load balancer. Discover how it works and when to use bare-metal vs managed AWS options.",
  tags: ["infrastructure", "networking", "devops", "backend", "web-server"],
  icon: "Server",
  content: [
    <p key="intro" className="mb-6">
      <Highlight variant="primary">NGINX is not just a web server.</Highlight> While historically built to serve static HTML files faster than Apache (solving the C10K problem), modern NGINX fundamentally acts as the ultimate "traffic cop" for your application—serving as a reverse proxy, a load balancer, and a TLS terminator.
    </p>,

    <h3 key="capabilities-title" className="text-xl font-bold mt-8 mb-4">
      Core Capabilities
    </h3>,

    <Grid key="capabilities-grid" cols={2} gap={6} className="mb-8">
      <Card title="Reverse Proxy">
        Sitting in front of your Node.js/Python backend. It intercepts requests, handles HTTPS, and then passes raw HTTP to your internal app so your backend doesn't have to handle security overhead.
      </Card>
      <Card title="Load Balancing">
        Spreading incoming traffic across identical background servers using algorithms like Round Robin, Least Connections, or IP Hash.
      </Card>
      <Card title="Static File Serving">
        Blazing fast at returning static assets (images, CSS, JS) directly from the disk without ever waking up your expensive application logic.
      </Card>
      <Card title="Caching & Rate Limiting">
        Can temporarily store backend responses (microcaching) and choke overly aggressive clients to prevent DDoS attacks.
      </Card>
    </Grid>,

    <h3 key="architecture-title" className="text-xl font-bold mt-12 mb-4">
      Event-Driven Architecture Flow
    </h3>,

    <Flow
      key="architecture-flow"
      steps={[
        {
          title: "1. The Master Process",
          description: "Reads and evaluates your nginx.conf. Binds to ports (e.g., 80/443), and orchestrates the worker processes.",
        },
        {
          title: "2. Worker Processes",
          description: "NGINX usually spawns one worker per CPU core. These are single-threaded and use asynchronous, non-blocking I/O (like JS Event Loop) to handle thousands of connections simultaneously.",
        },
        {
          title: "3. Connection Processing",
          description: "When a request arrives, the worker doesn't spawn a new thread. It simply handles the event, passes it to the backend, and is immediately free to serve the next user while waiting.",
        },
      ]}
    />,

    <h3 key="setup-title" className="text-xl font-bold mt-12 mb-4">
      How to Setup: Raw NGINX vs AWS ALB
    </h3>,

    <p key="setup-desc" className="mb-6">
      A major architectural decision is whether to physically spin up a standard NGINX server (via <code>nginx.conf</code> on EC2/Docker) or pay AWS to do it via an Application Load Balancer (ALB) or API Gateway.
    </p>,

    <Table
      key="setup-table"
      headers={["Setup Type", "How It Works", "Pros", "Cons"]}
      rows={[
        [
          "Raw NGINX (nginx.conf)",
          "You install NGINX directly via Linux package manager or Docker. You manually write the `nginx.conf` file.",
          "Maximum control, incredibly cheap, portable across clouds (multi-cloud), allows complex localized routing scripts (LUA).",
          "You must manage scaling, OS patching, TLS certificate renewals (Certbot), and high-availability clustered setups yourself.",
        ],
        [
          "AWS Managed (ALB / API Gateway)",
          "Click buttons in the AWS Console. AWS invisibly spins up massive proprietary proxies (often utilizing custom engines) on your behalf.",
          "Zero maintenance, auto-scales infinitely, natively integrates with AWS WAF and AWS Certificate Manager.",
          "Expensive at massive scale, vendor lock-in, harder to debug custom headers, less flexible algorithmic control.",
        ],
      ]}
    />,

    <h3 key="deepdive-title" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: The `nginx.conf` File
    </h3>,
    
    <p key="deepdive-text" className="mb-4">
      If you choose the traditional route, NGINX is controlled entirely by a single nested configuration file. It relies on a hierarchy of "blocks": <code>http</code> → <code>server</code> → <code>location</code>.
    </p>,

    <CodeBlock
      key="deepdive-code"
      title="/etc/nginx/nginx.conf"
      language="nginx"
      code={`http {
    # 1. Define upstream servers (Load Balancing)
    upstream backend_api {
        server 10.0.0.1:3000;
        server 10.0.0.2:3000;
    }

    # 2. Define the Server block (Virtual Host)
    server {
        listen 80;
        server_name api.myapp.com;

        # 3. Define Location matching
        location / {
            # Reverse Proxy the traffic
            proxy_pass http://backend_api;
            
            # Forward real client IP
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # Storing static assets directly
        location /images/ {
            root /var/www/assets;
            expires 30d; # Aggressive static caching
        }
    }
}`}
    />,

    <h3 key="pitfalls-title" className="text-xl font-bold mt-12 mb-4">
      Common Pitfalls & Architectural Solutions
    </h3>,

    <Grid key="pitfalls-grid" cols={1} gap={6} className="mb-8">
      <Card title="The 'Lost Client IP' Problem">
        <p className="text-sm text-foreground mb-4">
          <strong>The Problem:</strong> When the Node.js or Python backend logs a user's IP, it records the internal IP address of the NGINX server itself, because mathematically, NGINX is the entity that established the final TCP connection to the backend.
        </p>
        <p className="text-sm font-semibold mb-2">Solution:</p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
          <li>Ensure NGINX utilizes <code>proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</code>.</li>
          <li>Configure your Express/backend framework to trust the proxy (e.g., <code>app.set('trust proxy', 1)</code> in Express) so it extracts the real IP from the header instead of the TCP socket.</li>
        </ul>
      </Card>
      
      <Card title="Buffer Overflows via Large Uploads">
        <p className="text-sm text-foreground mb-4">
          <strong>The Problem:</strong> Users attempting to upload a 50MB video file get instantly rejected by NGINX with a <strong>413 Request Entity Too Large</strong> error, before the request even reaches the backend API.
        </p>
        <p className="text-sm font-semibold mb-2">Solution:</p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
          <li>NGINX aggressively protects backends by defaulting max body sizes to 1MB.</li>
          <li>Explicitly override this limit inside your server or location block via <code>client_max_body_size 100M;</code>.</li>
        </ul>
      </Card>
    </Grid>,

    <Callout key="callout-conclusion" type="tip" title="When to use What?">
      If you are a solo developer or a mid-sized startup on a tight budget, manually deploying NGINX via Docker Compose or a cheap VPS is significantly cost-effective. For enterprise systems orchestrating massive Kubernetes clusters, you frequently offload this to Managed AWS Load Balancers or use NGINX Ingress Controllers to handle dynamic routing mechanically.
    </Callout>,
  ],
};
