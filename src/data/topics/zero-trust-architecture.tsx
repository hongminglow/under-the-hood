import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Activity, KeyRound, ScanEye, ShieldCheck } from "lucide-react";

export const zeroTrustTopic: Topic = {
	id: "zero-trust-architecture",
	title: "Zero Trust Architecture",
	description:
		"The security model that assumes every request is hostile — even from inside your own network. Never trust, always verify.",
	tags: ["security", "architecture", "network", "enterprise"],
	icon: "ShieldOff",
	content: [
		<p key="1">
			Traditional security operates on a <strong>"castle and moat"</strong> model: everything <em>inside</em> the
			corporate network is trusted, everything <em>outside</em> is untrusted. The firewall is the moat. Once an attacker
			breaches the perimeter (via phishing, VPN exploit, etc.), they have <strong>free lateral movement</strong> across
			every internal system.
		</p>,
		<p key="2" className="mt-4 mb-8">
			<strong>Zero Trust</strong> (coined by Forrester in 2010, adopted by Google's BeyondCorp) eliminates the concept
			of a "trusted network." Every single request — even from the CEO's laptop on the office Wi-Fi — must be{" "}
			<strong>authenticated, authorized, and encrypted</strong>.
		</p>,
		<h4 key="3" className="text-xl font-bold mt-8 mb-4">
			Core Principles
		</h4>,
		<Grid key="4" cols={2} gap={6} className="mb-8">
			<FeatureCard icon={ShieldCheck} title="Never Trust, Always Verify" subtitle="Per-request identity proof" theme="emerald">
				<p className="text-emerald-100/80">
					Every request is treated as if it originates from an open, untrusted network. Identity verification happens on{" "}
					<strong className="text-emerald-300">every single request</strong>, not just at login.
				</p>
			</FeatureCard>
			<FeatureCard icon={KeyRound} title="Least Privilege Access" subtitle="Smallest useful permission set" theme="cyan">
				<p className="text-cyan-100/80">
					Users and services get the <strong className="text-cyan-300">minimum permissions</strong> needed to do their job. An engineer accessing
					production logs doesn't need write access to the database.
				</p>
			</FeatureCard>
			<FeatureCard icon={ScanEye} title="Micro-Segmentation" subtitle="One breach should not unlock the network" theme="sky">
				<p className="text-sky-100/80">
					The network is divided into <strong className="text-sky-300">tiny security zones</strong>. Each workload, database, and API has its own
					access policy. Breaching one zone doesn't grant access to others.
				</p>
			</FeatureCard>
			<FeatureCard icon={Activity} title="Assume Breach" subtitle="Detection and response are part of the design" theme="amber">
				<p className="text-amber-100/80">
					The system is designed with the assumption that attackers are <strong className="text-amber-300">already inside</strong>. Continuous
					monitoring, anomaly detection, and automated response are built in.
				</p>
			</FeatureCard>
		</Grid>,
		<Table
			key="5"
			headers={["Aspect", "<span class='text-amber-300'>Traditional (Perimeter)</span>", "<span class='text-emerald-300'>Zero Trust</span>"]}
			rows={[
				["Trust Model", "Trust internal, block external", "Trust nothing, verify everything"],
				["Access Control", "VPN + firewall", "Identity-based, per-request"],
				["Lateral Movement", "Easy after breach", "Impossible — micro-segmentation"],
				["Remote Work", "Requires VPN tunneling", "Native — location-agnostic"],
				["Compliance", "Hard to audit", "Every request is logged and verified"],
			]}
		/>,
		<Callout key="6" type="info" title="Real-World: Google BeyondCorp">
			Google eliminated VPNs entirely. Every employee accesses internal tools over the <strong>public internet</strong>{" "}
			— but every request passes through an identity-aware proxy that checks device health, user identity, and
			contextual risk scores. This is Zero Trust in production at massive scale.
		</Callout>,
	],
};
