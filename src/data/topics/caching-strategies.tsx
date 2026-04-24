import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Table } from "@/components/ui/Table";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Database, Globe, HardDrive, ServerCog } from "lucide-react";

export const cachingStrategiesTopic: Topic = {
	id: "caching-strategies",
	title: "Caching Strategies",
	description: "The single most impactful performance optimization: storing computed results closer to the consumer.",
	tags: ["performance", "architecture", "cdn"],
	icon: "HardDrive",
	content: [
		<p key="1">
			<em>"There are only two hard things in Computer Science: cache invalidation and naming things."</em> — Phil
			Karlton. Caching is storing the result of an expensive operation so future requests can be served instantly
			without re-computing.
		</p>,
		<h4 key="2" className="text-xl font-bold mt-8 mb-4">
			The Caching Layers
		</h4>,
		<Grid key="3" cols={2} gap={6} className="mb-8">
			<FeatureCard icon={Globe} title="Browser Cache" subtitle="Closest to the user" theme="emerald">
				<p className="text-sm text-emerald-200/80">
					The nearest cache to the user. Controlled via HTTP headers like <code>Cache-Control: max-age=3600</code> and{" "}
					<code>ETag</code>. Prevents re-downloading assets that haven't changed.
				</p>
			</FeatureCard>
			<FeatureCard icon={ServerCog} title="CDN" subtitle="Edge cache" theme="teal">
				<p className="text-sm text-teal-200/80">
					A globally distributed network of servers (Cloudflare, Akamai). Static assets are cached at the edge node
					closest to the user, slashing latency from 200ms to 20ms.
				</p>
			</FeatureCard>
			<FeatureCard icon={HardDrive} title="Application Cache" subtitle="Redis hot path" theme="cyan">
				<p className="text-sm text-cyan-200/80">
					An in-memory key-value store sitting between the app and the database. Frequently queried results (like user
					profiles) are cached here to avoid expensive DB joins.
				</p>
			</FeatureCard>
			<FeatureCard icon={Database} title="Database Query Cache" subtitle="Execution-plan and result reuse" theme="sky">
				<p className="text-sm text-sky-200/80">
					The database itself can cache the parsed execution plan and result set of repeated queries. MySQL's query
					cache was eventually removed due to contention issues at scale.
				</p>
			</FeatureCard>
		</Grid>,
		<h4 key="4" className="text-xl font-bold mt-8 mb-4">
			Cache Invalidation Patterns
		</h4>,
		<CodeBlock
			key="5"
			language="text"
			title="Common Patterns"
			code={`Cache-Aside (Lazy Loading)
  → App checks cache first. On miss, fetches from DB, writes to cache.
  → Risk: First request is always slow (cold start).

Write-Through
  → App writes to cache AND DB simultaneously.
  → Guarantees cache consistency but doubles write latency.

Write-Behind (Write-Back)
  → App writes to cache ONLY. Cache asynchronously syncs to DB later.
  → Extremely fast writes, but risk of data loss if cache crashes.

TTL (Time-To-Live)
  → Data automatically expires after N seconds.
  → Simple but can serve stale data during the TTL window.`}
		/>,
		<Callout key="6" type="warning" title="The Thundering Herd Problem">
			When a popular cache key expires, thousands of concurrent requests all simultaneously miss the cache and slam the
			database at once. Solutions include mutex locks on the cache key or staggering TTL values with random jitter.
		</Callout>,
		<h4 key="7" className="text-xl font-bold mt-8 mb-4">
			Cache Stampede Prevention
		</h4>,
		<CodeBlock
			key="8"
			language="python"
			title="Probabilistic Early Expiration"
			code={`import random
import time

def get_with_early_expiration(key, ttl=3600):
    cached = redis.get(key)
    if cached:
        time_left = redis.ttl(key)
        # Probabilistically refresh before expiration
        if time_left < ttl * random.random():
            refresh_cache(key)  # Async refresh
        return cached
    return refresh_cache(key)`}
		/>,
		<h4 key="9" className="text-xl font-bold mt-8 mb-4">
			HTTP Cache Headers
		</h4>,
		<Table
			key="10"
			headers={["Header", "Purpose", "Example"]}
			rows={[
				["Cache-Control", "Defines caching rules", "<code>max-age=3600, public</code>"],
				["ETag", "Version identifier for conditional requests", '<code>ETag: "abc123"</code>'],
				["Last-Modified", "Timestamp of last change", "<code>Last-Modified: Wed, 21 Oct 2025 07:28:00 GMT</code>"],
				["Vary", "Cache key depends on request headers", "<code>Vary: Accept-Encoding</code>"],
			]}
		/>,
		<p key="11" className="mt-4">
			When a browser has a cached asset with an ETag, it sends <code>If-None-Match: "abc123"</code>. If the server's
			ETag matches, it returns <strong>304 Not Modified</strong>&nbsp;with zero body, saving bandwidth.
		</p>,
	],
};
