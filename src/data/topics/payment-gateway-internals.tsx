import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const paymentGatewayInternalsTopic: Topic = {
  id: "payment-gateway-internals",
  title: "Payment Gateway: Under The Hood",
  description:
    "How money actually moves when you click 'Pay Now' — the full lifecycle from browser to bank, including tokenisation, card networks, 3DS2 authentication, PCI DSS, and the real security vulnerabilities that attackers target.",
  tags: [
    "payments",
    "security",
    "fintech",
    "pci-dss",
    "stripe",
    "tokenisation",
    "3ds",
  ],
  icon: "CreditCard",
  content: [
    <p key="1">
      Every time a user clicks <strong>Pay Now</strong>, a sequence of encrypted
      messages races across at least six independent systems — your server, a
      payment gateway, a payment processor, two card networks, an issuing bank,
      and an acquiring bank — all in under{" "}
      <strong>two to three seconds</strong>. Almost none of this happens inside
      your own infrastructure. Understanding these layers is essential for any
      engineer building commerce features, because a single misstep exposes
      either cardholder data or millions in fraud liability.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Six Parties You Never See
    </h3>,

    <Table
      key="3"
      headers={["Party", "Role", "Real-World Example"]}
      rows={[
        [
          "Cardholder",
          "The person holding the credit/debit card. Initiates the payment in the browser / mobile app.",
          "You, checking out on Amazon",
        ],
        [
          "Merchant",
          "The business selling goods or services. Owns the checkout UI and integrates the gateway SDK.",
          "Amazon, Shopify store, SaaS product",
        ],
        [
          "Payment Gateway",
          "The API endpoint that accepts raw card data from the merchant, encrypts and forwards it to the processor. Acts as the secure courier.",
          "Stripe, Braintree, Adyen, Square",
        ],
        [
          "Payment Processor",
          "The backend financial engine. Communicates directly with card networks on behalf of the merchant's bank.",
          "Stripe (also acts as processor), First Data, Worldpay",
        ],
        [
          "Card Network",
          "The rails that route authorisation requests and settlement between the acquiring and issuing banks. Sets interchange fees and fraud rules.",
          "Visa, Mastercard, American Express, UnionPay",
        ],
        [
          "Acquiring Bank",
          "The merchant's bank. Holds the merchant account and receives the actual money after settlement.",
          "Chase Merchant Services, Wells Fargo",
        ],
        [
          "Issuing Bank",
          "The cardholder's bank. The one that actually decides YES or NO to the payment and holds the credit line.",
          "Chase, Citi, HSBC, any bank that issued the card",
        ],
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Full Payment Flow: Authorisation → Capture → Settlement
    </h3>,

    <p key="5">
      There are three distinct phases. Most developers only think about
      authorisation, but all three matter for accounting, fraud, and user
      experience.
    </p>,

    <Flow
      key="6"
      steps={[
        {
          title: "1. Tokenisation in the Browser",
          description:
            "The user enters card details. The gateway's JavaScript SDK (e.g. Stripe.js) intercepts the raw numbers BEFORE they ever touch your server. It sends the PAN (Primary Account Number), expiry, and CVV directly to the gateway's PCI-compliant servers over TLS 1.3. The gateway returns a short-lived, single-use token (e.g. tok_1ABC2DEF). Your server only ever sees this opaque token — never the real card number.",
        },
        {
          title: "2. Charge Request (Merchant → Gateway)",
          description:
            "Your server sends a server-to-server HTTPS POST to the gateway API (e.g. POST /v1/charges) with the token, amount, currency, and your secret API key. The gateway validates the token, looks up the real card data from its vault, and begins the authorisation flow.",
        },
        {
          title: "3. Authorisation Request (Gateway → Processor → Card Network)",
          description:
            "The gateway/processor builds an ISO 8583 financial message — the binary protocol used across the entire payments industry — and forwards it through the card network (Visa/Mastercard) to the issuing bank. The message includes the PAN, amount, merchant category code (MCC), and AVS (Address Verification) data.",
        },
        {
          title: "4. Issuing Bank Decision (Approve / Decline / 3DS Challenge)",
          description:
            "The issuing bank's fraud engine evaluates the transaction: is the card present? Is the amount anomalous? Is the device recognised? It responds with an authorisation code (approved) or a decline code (e.g. 05 = Do Not Honour, 51 = Insufficient Funds). A 3DS2 challenge may be triggered at this point (Step 5).",
        },
        {
          title: "5. 3D Secure 2 (Optional But Growing Mandatory)",
          description:
            "3DS2 adds a real-time risk-based authentication step. The issuing bank's 3DS server performs 'frictionless' auth using 100+ device/behavioural signals (device fingerprint, prior transaction history, shipping address match) or triggers a Step-Up Challenge: a one-time password (OTP) / biometric prompt. Liability shifts from the merchant to the bank if 3DS passes.",
        },
        {
          title: "6. Response (Card Network → Processor → Gateway → Merchant)",
          description:
            "The authorisation response travels back the same path in milliseconds. The gateway returns a JSON response to your server (status: 'succeeded' or 'requires_action'). At this point, the funds are only RESERVED on the cardholder's account — not yet moved.",
        },
        {
          title: "7. Capture",
          description:
            "The authorisation hold (usually valid 5–7 days) is converted to an actual charge. Most gateways auto-capture immediately. Marketplaces or hotels often separate auth + capture: authorise at booking, capture only when the service is delivered.",
        },
        {
          title: "8. Batch Settlement (T+1 to T+3)",
          description:
            "At end of day, the processor batches all authorised transactions into a settlement file and submits it to the card network. The card network debits the issuing bank and credits the acquiring bank, minus interchange fees. The acquiring bank deposits the net amount into the merchant's account the next business day.",
        },
      ]}
    />,

    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      How Tokenisation Actually Works
    </h3>,

    <p key="8">
      Raw PANs (e.g. <code>4111 1111 1111 1111</code>) are the most sensitive
      data in fintech. Tokenisation replaces them with a surrogate value that is
      meaningless to an attacker.
    </p>,

    <Grid key="9" cols={2} gap={6}>
      <Card
        title="Gateway Tokenisation"
        description="One-time payment tokens"
      >
        <p className="mt-2 text-sm text-slate-300">
          Stripe/Braintree JS SDK sends the raw PAN to the gateway's PCI vault.
          The vault stores the PAN, generates a random token
          (<code>tok_...</code>) and returns only the token to your JavaScript.
          Your server never touches card data. The token can only be used once
          and expires in minutes.
        </p>
      </Card>
      <Card
        title="Network Tokenisation (EMV)"
        description="Replacing PAN at the network level"
      >
        <p className="mt-2 text-sm text-slate-300">
          Visa's Token Service (VTS) and Mastercard's MDES replace the PAN with
          a <strong>network token</strong> that is device- and merchant-bound. Even if
          intercepted, a token from Amazon cannot be replayed at Google Pay. Used
          by Apple Pay, Google Pay, and Samsung Pay. Significantly reduces fraud
          on card-on-file transactions.
        </p>
      </Card>
    </Grid>,

    <CodeBlock
      key="10"
      title="stripe_checkout.ts — Tokenisation flow"
      language="typescript"
      code={`// 1. Frontend: Stripe.js intercepts card data before it hits your server
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const { error, paymentMethod } = await stripe.createPaymentMethod({
  type: "card",
  card: cardElement, // CardElement from @stripe/react-stripe-js
});

// 2. Send only the opaque token to YOUR server
const response = await fetch("/api/pay", {
  method: "POST",
  body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: 4999 }),
});

// 3. Your server uses the SECRET KEY to charge — raw card data never arrives here
// server.ts
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const paymentIntent = await stripe.paymentIntents.create({
  amount: 4999,       // in cents
  currency: "usd",
  payment_method: paymentMethodId,
  confirm: true,
  return_url: "https://yourapp.com/success",
});
// stripe.com now holds the PAN; you store only paymentIntent.id`}
    />,

    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      Major Third-Party Processors: How They Differ
    </h3>,

    <Table
      key="12"
      headers={[
        "Provider",
        "Type",
        "Best For",
        "Key Technical Differentiator",
      ]}
      rows={[
        [
          "Stripe",
          "Gateway + Processor + Acquirer",
          "SaaS, startups, global products",
          "Unified API. Stripe is the acquirer in many regions — meaning fewer hops. Stripe Radar ML fraud scoring built in.",
        ],
        [
          "Braintree (PayPal)",
          "Gateway + Processor",
          "Marketplaces, PayPal-heavy user base",
          "Drop-in UI, native PayPal/Venmo support, PayPal Credit. Owned by PayPal so deep integration.",
        ],
        [
          "Adyen",
          "Gateway + Processor + Acquirer",
          "Enterprise, high-volume, omnichannel (POS + online)",
          "Direct issuer connections in 150+ countries. Single platform for in-store, online, mobile. Lower interchange via direct routes.",
        ],
        [
          "Square",
          "Gateway + Processor + Acquirer",
          "SMB, in-person retail",
          "Owns the hardware (card readers). Tight vertical integration from POS terminal to bank account.",
        ],
        [
          "Checkout.com",
          "Gateway + Processor",
          "High-volume e-commerce",
          "Specialises in high-approval rates with local acquiring in emerging markets. Granular decline reason codes.",
        ],
        [
          "PayPal",
          "Wallet + Processor",
          "Consumer checkout (especially guest users)",
          "1.2 billion PayPal accounts means one-click checkout without card entry. Buyer Protection program reduces chargebacks.",
        ],
      ]}
    />,

    <Callout key="13" type="info" title="Why Stripe Can Be Both Gateway and Acquirer">
      Traditional setups required a separate payment gateway (to collect card
      data), a processor (to talk to card networks), and an acquiring bank (to
      hold the money). Stripe holds all three licenses in the US, EU, and more
      — this is why Stripe settlement happens in ~2 business days compared to
      5+ days via a traditional processor chain. Adyen does the same at
      enterprise scale.
    </Callout>,

    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      3D Secure 2 (3DS2): The Authentication Layer
    </h3>,

    <p key="15">
      3DS2 is the modern replacement for the original 3D Secure (3DS1), which
      required a full browser redirect and a static password — a terrible UX
      that drove cart abandonment rates above 30%. 3DS2 is risk-based: only
      high-risk transactions get a challenge.
    </p>,

    <Flow
      key="16"
      steps={[
        {
          title: "Device Fingerprinting (100+ signals)",
          description:
            "The 3DS2 JavaScript SDK collects: browser language, timezone, screen resolution, device type, IP address, prior transaction history with the issuer, and behavioural biometrics (typing cadence, mouse movement). This 'device fingerprint' is sent to the issuing bank's 3DS Server.",
        },
        {
          title: "Frictionless Authentication (Low-Risk Path)",
          description:
            "If the issuing bank's machine learning model determines the transaction is low-risk (trusted device, known location, normal amount), it issues a cryptographic Authentication Value (CAVV) silently. The user sees no additional prompt. ~95% of transactions take this path with a well-tuned 3DS configuration.",
        },
        {
          title: "Step-Up Challenge (High-Risk Path)",
          description:
            "For high-risk or unfamiliar transactions, the bank triggers a challenge: an OTP sent via SMS/email, a biometric prompt in the bank's mobile app, or a push notification. The cardholder completes the challenge and the CAVV is issued.",
        },
        {
          title: "Liability Shift",
          description:
            "If a transaction passes 3DS2 and is later disputed as fraudulent, the LIABILITY shifts from the merchant to the issuing bank. This is the primary commercial reason to implement 3DS2. Without it, merchants pay every chargeback.",
        },
      ]}
    />,

    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      PCI DSS: The Security Standard You Cannot Ignore
    </h3>,

    <p key="18">
      The <strong>Payment Card Industry Data Security Standard (PCI DSS)</strong>{" "}
      is a contractual requirement — not a law — mandated by the card networks
      for any entity that touches cardholder data. Version 4.0 (2022) is the
      current standard.
    </p>,

    <Grid key="19" cols={2} gap={6}>
      <Card title="PCI DSS Compliance Levels" description="Based on transaction volume">
        <Table
          headers={["Level", "Volume / Year", "Requirement"]}
          rows={[
            ["Level 1", "> 6M Visa tx", "Annual on-site audit by QSA + quarterly ASV scan"],
            ["Level 2", "1-6M Visa tx", "Annual self-assessment questionnaire (SAQ) + ASV scan"],
            ["Level 3", "20K-1M e-commerce tx", "Annual SAQ + quarterly ASV scan"],
            ["Level 4", "< 20K e-commerce tx", "Annual SAQ + quarterly ASV scan (merchant bank decides)"],
          ]}
        />
      </Card>
      <Card title="Why Using Stripe Simplifies PCI Scope" description="SAQ A vs SAQ D">
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          If you use Stripe.js / hosted payment fields, raw card data is
          collected inside Stripe-owned iframes. Your servers,{" "}
          <strong>never see PAN, CVV, or expiry</strong>. This reduces your
          PCI scope to <strong>SAQ A</strong> — the simplest self-assessment,
          only 22 requirements. Handling card data server-side jumps you to{" "}
          <strong>SAQ D</strong> — 329 requirements, extensive audits, and
          hardware security modules (HSMs).
        </p>
      </Card>
    </Grid>,

    <h3 key="20" className="text-xl font-bold mt-8 mb-4">
      Security Vulnerabilities in Payment Systems
    </h3>,

    <Callout key="21" type="warning" title="These are the real attack surfaces">
      Payment infrastructure is the highest-value target on the internet.
      Understanding these vectors is essential for defensive engineering.
    </Callout>,

    <Table
      key="22"
      headers={["Vulnerability", "How It Works", "Mitigation"]}
      rows={[
        [
          "Magecart / Web Skimming",
          "Attackers inject malicious JavaScript into your checkout page (via a compromised npm dependency, CDN, or your own CMS). The script reads card field values from the DOM and exfiltrates them to an attacker-controlled server in real time — entirely bypassing your backend.",
          "Use Stripe.js / Braintree hosted fields (inputs are inside cross-origin iframes — your JS cannot read them). Implement a strict Content Security Policy (CSP) with script-src whitelisting. Use Subresource Integrity (SRI) hashes on all third-party scripts.",
        ],
        [
          "Card Testing / Enumeration",
          "Attackers buy stolen card numbers and test them in bulk through your checkout to find which are still valid, paying $0.01 items. Your legitimate traffic mixes with bot traffic and you accumulate chargebacks and processor fees. Card testing can go from 0 to 10,000 attempts in minutes.",
          "Implement rate limiting on payment endpoints keyed by IP + fingerprint. Require CAPTCHA (Turnstile / reCAPTCHA v3) before payment submission. Enable Stripe Radar rules (e.g., block if >3 card attempts in 1 hour from the same IP). Monitor failed payment ratios.",
        ],
        [
          "Replay / MITM Attack",
          "An attacker intercepts an authorisation response and replays it to get goods without payment, or intercepts a refund response and inflates the amount on the return path.",
          "All gateway communications must use TLS 1.2+. Use Stripe's webhook signature verification (HMAC-SHA256 of the raw payload against your webhook secret) to ensure event authenticity. Never trust gateway callbacks without signature validation.",
        ],
        [
          "IDOR on Order / Invoice IDs",
          "If your order IDs are sequential integers (/orders/10234), an attacker can enumerate other users' orders and charge another user's saved payment method if your authorisation check is missing.",
          "Use UUIDs or cryptographically random order IDs. Always validate that the authenticated user owns the resource before processing a charge against their stored payment method.",
        ],
        [
          "Webhook Spoofing",
          "An attacker sends fake payment.succeeded webhook events directly to your webhook endpoint, triggering order fulfilment without actual payment.",
          "ALWAYS verify webhook signatures. Stripe provides a stripe.webhooks.constructEvent() method. Reject any event where the computed HMAC does not match the Stripe-Signature header.",
        ],
        [
          "Currency / Amount Tampering",
          "A user intercepts the client-side fetch call and modifies the amount (e.g., from 4999 to 1) before it reaches your server. Many naive implementations pass amount from the frontend.",
          "NEVER trust the amount from the frontend. Always calculate the authoritative amount server-side from cart contents stored in your database. Only send the session/intent ID between frontend and backend.",
        ],
        [
          "Refund Fraud (Friendly Fraud)",
          "Legitimate cardholders dispute a real transaction as 'unauthorised' after receiving goods. Also called 'chargeback fraud'. Very difficult to prevent entirely.",
          "Collect strong evidence: delivery confirmation, IP logs, device fingerprint, 3DS2 authentication logs, customer communication. Gateways like Stripe provide 'Chargeback Protection' products that cover the liability for an additional fee.",
        ],
      ]}
    />,

    <CodeBlock
      key="23"
      title="webhook_handler.ts — Signature verification (critical)"
      language="typescript"
      code={`import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  // ALWAYS read the raw body bytes — JSON.parse will break the HMAC
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    // constructEvent internally computes HMAC-SHA256(rawBody, webhookSecret)
    // and compares it against the 'stripe-signature' header
    event = stripe.webhooks.constructEvent(rawBody, sig!, webhookSecret);
  } catch (err) {
    // DO NOT fulfil orders if signature is invalid
    return NextResponse.json({ error: "Webhook signature mismatch" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    // Safely fulfil order — this event is cryptographically verified
    await fulfillOrder(pi.metadata.orderId);
  }

  return NextResponse.json({ received: true });
}`}
    />,

    <h3 key="24" className="text-xl font-bold mt-8 mb-4">
      How Refunds, Disputes, and Chargebacks Work
    </h3>,

    <Flow
      key="25"
      steps={[
        {
          title: "Merchant-Initiated Refund",
          description:
            "You call the gateway API (e.g. stripe.refunds.create({ payment_intent: 'pi_...' })). The gateway sends a reversal request through the same processor/network path. Funds are credited back to the cardholder's account in 5–10 business days. Your acquiring bank account is debited immediately.",
        },
        {
          title: "Cardholder Dispute (Chargeback)",
          description:
            "The cardholder contacts their issuing bank claiming the transaction is unauthorised or the goods were not delivered. The issuing bank temporarily credits the cardholder and initiates a dispute via the card network. Your acquiring bank debits your account for the charge plus a $15–$25 chargeback fee.",
        },
        {
          title: "Merchant Dispute Response",
          description:
            "You have 7–21 days (depending on network rules) to submit evidence: delivery confirmation, customer communications, IP logs, 3DS auth data, signed terms of service. The gateway (Stripe/Braintree) provides a UI to submit this evidence directly to the card network.",
        },
        {
          title: "Card Network Arbitration",
          description:
            "If the merchant wins, the funds are returned and the chargeback fee may be refunded. If the issuer wins, the chargeback stands and you absorb the loss. High chargeback rates (> 1% of transactions) result in fines and eventually losing your merchant account.",
        },
      ]}
    />,

    <h3 key="26" className="text-xl font-bold mt-8 mb-4">
      The ISO 8583 Protocol: The Binary Language of Banks
    </h3>,

    <p key="27">
      Behind the modern REST APIs of Stripe and Braintree lies an ancient,
      battle-hardened binary protocol:{" "}
      <strong>ISO 8583</strong>. This is the actual message format transmitted
      between processors and card networks. Every ATM withdrawal and every
      POS terminal swipe speaks ISO 8583.
    </p>,

    <Grid key="28" cols={2} gap={6}>
      <Card title="Message Type Indicator (MTI)" description="4-digit code">
        <Table
          headers={["MTI", "Meaning"]}
          rows={[
            ["0100", "Authorisation Request (processor → network)"],
            ["0110", "Authorisation Response (network → processor)"],
            ["0200", "Financial Transaction Request"],
            ["0400", "Reversal / Refund Request"],
            ["0800", "Network Management Request (heartbeat)"],
          ]}
        />
      </Card>
      <Card title="Key Data Elements (Fields)" description="Bitmap-addressed">
        <Table
          headers={["Field", "Description"]}
          rows={[
            ["DE 2", "Primary Account Number (PAN)"],
            ["DE 3", "Processing Code (purchase/refund/etc.)"],
            ["DE 4", "Transaction Amount"],
            ["DE 7", "Transmission Date & Time"],
            ["DE 22", "Point of Service Entry Mode (chip/swipe/NFC)"],
            ["DE 39", "Response Code (00=approved, 05=declined)"],
            ["DE 41", "Card Acceptor Terminal ID"],
          ]}
        />
      </Card>
    </Grid>,

    <Callout key="29" type="tip" title="Why modern gateways exist">
      Before Stripe (2010), merchants had to implement ISO 8583 directly, sign
      lengthy contracts with acquiring banks, pass full PCI DSS Level 1 audits,
      and integrate with each card network separately. Stripe's genius was
      wrapping all of that behind two REST API calls and a publishable key. The
      ISO 8583 messages still fly under the hood — Stripe just never shows them
      to you.
    </Callout>,

    <h3 key="30" className="text-xl font-bold mt-8 mb-4">
      Interchange Fees: Who Gets Paid for What
    </h3>,

    <p key="31">
      Every card transaction carries invisible costs. Understanding interchange
      helps you make informed decisions about which payment methods to accept
      and why some gateways cost more than others.
    </p>,

    <Table
      key="32"
      headers={["Fee Type", "Who Pays", "Who Receives", "Typical Rate"]}
      rows={[
        [
          "Interchange",
          "Acquiring bank (merchant's bank)",
          "Issuing bank (cardholder's bank)",
          "1.5%–2.1% of transaction (Visa/MC consumer cards)",
        ],
        [
          "Assessment / Scheme Fee",
          "Acquiring bank",
          "Card network (Visa/Mastercard)",
          "0.13%–0.15% of transaction",
        ],
        [
          "Processor / Gateway Markup",
          "Merchant",
          "Gateway/Processor (Stripe, Braintree)",
          "0.2%–0.5% + flat fee",
        ],
        [
          "Stripe Total (Blended)",
          "Merchant",
          "Stripe (who then pays interchange to issuer)",
          "2.9% + $0.30 per successful card charge",
        ],
        [
          "Chargeback Fee",
          "Merchant",
          "Acquiring bank",
          "$15–$25 per dispute",
        ],
      ]}
    />,

    <Callout key="33" type="info" title="Interchange++ Pricing (Enterprise)">
      At scale ($1M+/month), enterprises switch from blended pricing (2.9% +
      $0.30 flat) to <strong>Interchange++</strong>: they pay the exact raw
      interchange rate set by Visa/Mastercard + a fixed processor markup
      (e.g., 0.15% + $0.10). This can reduce effective rates by 0.5–1.0%,
      saving six figures annually on high volume. Adyen and Checkout.com
      specialise in this model.
    </Callout>,

    <h3 key="34" className="text-xl font-bold mt-8 mb-4">
      Security Architecture Summary
    </h3>,

    <Grid key="35" cols={2} gap={6}>
      <Card title="What You Must Always Do" description="Non-negotiable defences">
        <ul className="list-disc pl-5 mt-2 text-sm text-slate-300 space-y-1">
          <li>Use hosted payment fields (Stripe Elements / Braintree Drop-in) — keep PAN out of your DOM.</li>
          <li>Verify all webhook signatures (HMAC-SHA256) before fulfilling orders.</li>
          <li>Calculate order amounts server-side from your database — never trust client-supplied amounts.</li>
          <li>Rate-limit payment endpoints by IP, user, and card fingerprint.</li>
          <li>Implement 3DS2 to shift chargeback liability to the issuer.</li>
          <li>Set a strict CSP to prevent Magecart-style script injection.</li>
          <li>Log all payment events (intent created, succeeded, failed) for audit trails.</li>
        </ul>
      </Card>
      <Card title="What You Must Never Do" description="Instant compliance violations">
        <ul className="list-disc pl-5 mt-2 text-sm text-slate-300 space-y-1">
          <li>Never log raw PAN, CVV, or full card expiry — even in debug mode.</li>
          <li>Never store CVV after authorisation — prohibited by PCI DSS Rule 3.2.</li>
          <li>Never pass card data through your own server unless SAQ D compliant.</li>
          <li>Never expose your Stripe <strong>secret key</strong> in frontend code or public repos.</li>
          <li>Never re-use webhook event IDs — implement idempotency checks to prevent double-fulfil.</li>
          <li>Never trust payment status solely from a client-side redirect — always verify via API or webhook.</li>
        </ul>
      </Card>
    </Grid>,
  ],
};
