import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Gauge, ShieldCheck, Timer } from "lucide-react";

export const circuitBreakerTopic: Topic = {
	id: "circuit-breaker-pattern",
	title: "Circuit Breaker Pattern",
	description:
		"The resilience pattern that prevents cascading failures across microservices by 'tripping' a breaker when a downstream service is dying.",
	tags: ["architecture", "microservices", "resilience", "dist-systems"],
	icon: "Unplug",
	content: [
		<p key="1">
			In a microservices architecture, Service A calls Service B, which calls Service C. If Service C goes down but
			Service A keeps hammering it with requests, those requests pile up, exhaust thread pools, and{" "}
			<strong>cascade the failure backward</strong> — taking down Service B, then Service A. Your entire system
			collapses because of <strong>one unhealthy service</strong>.
		</p>,
		<p key="2" className="mt-4 mb-8">
			The <strong>Circuit Breaker</strong> pattern (popularized by Michael Nygard in <em>Release It!</em>) works exactly
			like an electrical circuit breaker: it monitors failures and <strong>"trips open"</strong> when a threshold is
			exceeded, immediately failing fast instead of waiting for timeouts.
		</p>,
		<h4 key="3" className="text-xl font-bold mt-8 mb-4">
			The Three States
		</h4>,
		<Grid key="4" cols={3} gap={6} className="mb-8">
			<FeatureCard icon={ShieldCheck} title="Closed" subtitle="Normal traffic" theme="emerald">
				<p className="text-sm text-emerald-200/80">
					Traffic passes through normally. The breaker monitors the <strong className="text-emerald-300">failure rate</strong>. If 5 out of the last
					10 calls fail (50% threshold), the breaker <strong className="text-emerald-300">trips open</strong>.
				</p>
			</FeatureCard>
			<FeatureCard icon={Gauge} title="Open" subtitle="Tripped protection" theme="rose">
				<p className="text-sm text-rose-200/80">
					<strong className="text-rose-300">All requests fail immediately</strong> without even attempting to call the downstream service. Returns
					a fallback response or cached data. Stays open for a configurable <strong className="text-rose-300">cool-down period</strong> (e.g., 30
					seconds).
				</p>
			</FeatureCard>
			<FeatureCard icon={Timer} title="Half-Open" subtitle="Testing recovery" theme="amber">
				<p className="text-sm text-amber-200/80">
					After the cool-down, the breaker allows <strong className="text-amber-300">one probe request</strong> through. If it succeeds, the
					breaker <strong className="text-amber-300">closes</strong> (back to normal). If it fails, it <strong className="text-amber-300">trips open again</strong> for
					another cool-down cycle.
				</p>
			</FeatureCard>
		</Grid>,
		<h4 key="5" className="text-xl font-bold mt-8 mb-4">
			The Lifecycle
		</h4>,
		<Step key="6" index={1}>
			<strong>Closed:</strong> Requests flow. Failure counter tracks errors.
		</Step>,
		<Step key="7" index={2}>
			<strong>Threshold Breached:</strong> 5+ failures in 10 calls → breaker trips <strong>OPEN</strong>.
		</Step>,
		<Step key="8" index={3}>
			<strong>Open:</strong> All calls return instant failure (no network call). Timer starts.
		</Step>,
		<Step key="9" index={4}>
			<strong>Half-Open:</strong> After 30s, one probe request is allowed through.
		</Step>,
		<Step key="10" index={5}>
			<strong>Recovery:</strong> Probe succeeds → breaker closes. Probe fails → breaker reopens.
		</Step>,
		<Callout key="11" type="tip" title="Real-World Implementations">
			Netflix's <strong>Hystrix</strong> (now deprecated) pioneered this pattern. Modern alternatives:{" "}
			<strong>Resilience4j</strong> (Java), <strong>Polly</strong> (.NET), <strong>opossum</strong> (Node.js). Istio and
			Envoy implement circuit breaking at the <strong>service mesh layer</strong>, requiring zero application code
			changes.
		</Callout>,
	],
};
