import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const zeroTrustTopic: Topic = {
  id: "zero-trust-architecture",
  title: "Zero Trust Architecture",
  description:
    "The security model that assumes every request is hostile — even from inside your own network. Never trust, always verify.",
  tags: ["security", "architecture", "network", "enterprise"],
  icon: "ShieldOff",
  content: [
    <p key="1">
      Traditional security operates on a <strong>"castle and moat"</strong>{" "}
      model: everything <em>inside</em> the corporate network is trusted,
      everything <em>outside</em> is untrusted. The firewall is the moat. Once
      an attacker breaches the perimeter (via phishing, VPN exploit, etc.), they
      have <strong>free lateral movement</strong> across every internal system.
    </p>,
    <p key="2" className="mt-4 mb-8">
      <strong>Zero Trust</strong> (coined by Forrester in 2010, adopted by
      Google's BeyondCorp) eliminates the concept of a "trusted network." Every
      single request — even from the CEO's laptop on the office Wi-Fi — must be{" "}
      <strong>authenticated, authorized, and encrypted</strong>.
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Core Principles
    </h4>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="Never Trust, Always Verify">
        <p className="text-sm">
          Every request is treated as if it originates from an open, untrusted
          network. Identity verification happens on{" "}
          <strong>every single request</strong>, not just at login.
        </p>
      </Card>
      <Card title="Least Privilege Access">
        <p className="text-sm">
          Users and services get the <strong>minimum permissions</strong> needed
          to do their job. An engineer accessing production logs doesn't need
          write access to the database.
        </p>
      </Card>
      <Card title="Micro-Segmentation">
        <p className="text-sm">
          The network is divided into <strong>tiny security zones</strong>. Each
          workload, database, and API has its own access policy. Breaching one
          zone doesn't grant access to others.
        </p>
      </Card>
      <Card title="Assume Breach">
        <p className="text-sm">
          The system is designed with the assumption that attackers are{" "}
          <strong>already inside</strong>. Continuous monitoring, anomaly
          detection, and automated response are built in.
        </p>
      </Card>
    </Grid>,
    <Table
      key="5"
      headers={["Aspect", "Traditional (Perimeter)", "Zero Trust"]}
      rows={[
        [
          "Trust Model",
          "Trust internal, block external",
          "Trust nothing, verify everything",
        ],
        ["Access Control", "VPN + firewall", "Identity-based, per-request"],
        [
          "Lateral Movement",
          "Easy after breach",
          "Impossible — micro-segmentation",
        ],
        ["Remote Work", "Requires VPN tunneling", "Native — location-agnostic"],
        ["Compliance", "Hard to audit", "Every request is logged and verified"],
      ]}
    />,
    <Callout key="6" type="info" title="Real-World: Google BeyondCorp">
      Google eliminated VPNs entirely. Every employee accesses internal tools
      over the <strong>public internet</strong> — but every request passes
      through an identity-aware proxy that checks device health, user identity,
      and contextual risk scores. This is Zero Trust in production at massive
      scale.
    </Callout>,
  ],
};
