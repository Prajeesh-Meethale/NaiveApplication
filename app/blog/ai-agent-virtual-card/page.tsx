import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Give Your AI Agent a Virtual Card and Real-World Spending Power",
  description:
    "AI agents can plan, write, and execute — but they can't spend money without a human in the loop. Here's how to issue per-agent virtual cards with full attribution and spend controls.",
  openGraph: {
    title: "How to Give Your AI Agent a Virtual Card",
    description:
      "Why agents need real-world financial identity, how /cards solves it, and a code walkthrough for issuing per-agent virtual cards.",
    type: "article",
  },
};

export default function BlogPost() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>

      <nav style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "14px", fontWeight: 600, color: "var(--text)", textDecoration: "none" }}>
            naïve <span style={{ color: "var(--text3)" }}>×</span> <span style={{ color: "var(--green)" }}>prajeesh</span>
          </Link>
          <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text3)", textDecoration: "none" }}>← Back to application</Link>
        </div>
      </nav>

      <article style={{ maxWidth: 740, margin: "0 auto", padding: "56px 28px 96px" }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", padding: "3px 10px", border: "1px solid #e8a23a40", borderRadius: 4, color: "var(--amber)", background: "#e8a23a12", textTransform: "uppercase", letterSpacing: "0.08em" }}>Agent ICP</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)" }}>·</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)" }}>7 min read</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)" }}>·</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)" }}>May 2026</span>
          </div>
          <h1 style={{ fontFamily: "var(--mono)", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 600, lineHeight: 1.2, marginBottom: 20, letterSpacing: "-0.025em", color: "var(--text)" }}>
            How to Give Your AI Agent a Virtual Card<br />and Real-World Spending Power
          </h1>
          <p style={{ color: "var(--text2)", fontSize: "16px", lineHeight: 1.625, maxWidth: 600 }}>
            Your AI agent can draft emails, research competitors, and run campaigns. But when it needs to buy a domain,
            pay for a SaaS tool, or fund Google Ads — it stops and waits for you.
            The human-in-the-loop problem isn&apos;t just about approval. It&apos;s about financial identity.
          </p>
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)" }}>By Prajeesh</span>
            <span style={{ color: "var(--text3)", fontSize: "11px" }}>·</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)" }}>Growth Engineer Application — Naïve</span>
          </div>
        </div>

        <div className="prose">

          <h2>Why agents need real-world financial identity</h2>
          <p>
            The gap between an &quot;AI assistant&quot; and an &quot;AI employee&quot; is whether it can take actions with real-world consequences.
            Drafting is cheap. Clicking publish isn&apos;t. Scheduling a meeting is easy. Paying a vendor isn&apos;t.
          </p>
          <p>
            For autonomous agents to actually run business operations — not just simulate them — they need:
          </p>
          <ul>
            <li>A way to make purchases without a human approving each one</li>
            <li>Spending limits so a rogue agent can&apos;t drain an account</li>
            <li>Attribution so you know which agent spent what, on what</li>
            <li>A compliance layer so the money flows through a real legal entity, not a grey-area workaround</li>
          </ul>
          <p>
            Most businesses handle this with a shared company card and an approval workflow. That works at human speed. It breaks the moment you want agents running at scale.
          </p>

          <h2>The problem with current approaches</h2>
          <p>
            <strong>Shared company card:</strong> No per-agent attribution. One compromised agent or runaway loop can exhaust your balance. No audit trail by agent. Violates most card issuer ToS for automated use.
          </p>
          <p>
            <strong>Human approval workflow:</strong> Defeats the purpose of autonomous operations. Fine for one agent doing one task per day. Completely breaks down at any meaningful scale.
          </p>
          <p>
            <strong>Prepaid card APIs (e.g., Lithic, Stripe Issuing direct):</strong> These exist, but they&apos;re raw infrastructure. You&apos;re responsible for the compliance layer (KYC, entity, BSA/AML), the spend controls logic, the attribution system, and the agent assignment framework. Weeks of work before your agent can buy its first tool.
          </p>

          <h2>How Naïve&apos;s /cards endpoint works</h2>
          <p>
            Naïve wraps the card issuance infrastructure into a single primitive. You create a virtual card,
            assign it to a specific AI employee, set spending limits, and get back card details your agent can use immediately.
            The compliance layer — entity formation, KYC, BSA registration — is handled by Naïve&apos;s backend.
          </p>
          <p>
            Here&apos;s the basic flow to create a virtual card for an agent:
          </p>
          <pre><code>{`import requests

NAIVE_API_KEY = "your_api_key"

# Create a virtual card assigned to a specific AI employee
response = requests.post(
    "https://api.usenaive.ai/v1/cards",
    headers={
        "Authorization": f"Bearer {NAIVE_API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "employee_id": "growth-agent-001",
        "label": "Growth Agent — Ad Spend",
        "spending_limit": 500,
        "currency": "USD",
        "merchant_categories": ["advertising", "software", "subscriptions"]
    }
)

card = response.json()
print(f"Card number: \${card['card_number']}")
print(f"Expiry: {card['expiry']}")
print(f"CVV: {card['cvv']}")
print(f"Assigned to: {card['employee_id']}")
print(f"Limit: \${card['spending_limit']}")`}</code></pre>
          <p>
            Your agent now has a card it can use to buy tools, pay for API credits, run ad campaigns,
            or handle any vendor payment — up to the limit you set.
          </p>

          <h2>Per-agent limits and controls</h2>
          <p>
            The key thing that makes this actually safe to deploy is granular control per card:
          </p>
          <ul>
            <li><strong>Spending limit</strong> — hard cap per billing period; the card declines once hit</li>
            <li><strong>Merchant category controls</strong> — whitelist which MCCs (merchant category codes) the card can use; a content agent shouldn&apos;t be buying cloud compute</li>
            <li><strong>Single-use vs recurring</strong> — issue a card for one specific purchase, then freeze it</li>
            <li><strong>Employee attribution</strong> — every transaction is tagged to the agent that ran it</li>
          </ul>
          <p>
            This means you can give your growth agent $500/month for ad spend without worrying it&apos;ll accidentally charge $5,000 to a GPU provider. The controls live at the card level, not in your agent logic.
          </p>

          <h2>What agents can do with spending power</h2>
          <p>
            Once an agent has a card, the set of things it can do autonomously expands dramatically:
          </p>
          <ul>
            <li><strong>SaaS subscriptions</strong> — the agent signs up for and pays for the tools it needs to do its job</li>
            <li><strong>Ad campaigns</strong> — a growth agent runs and funds Google/Meta campaigns within budget</li>
            <li><strong>Domain registration</strong> — an ops agent registers a domain for a new landing page it just built</li>
            <li><strong>API credits</strong> — a content agent tops up its own OpenAI, Perplexity, or Serper credits</li>
            <li><strong>Vendor payments</strong> — freelancer platforms, stock photo sites, translation services</li>
            <li><strong>Infrastructure</strong> — Vercel deployments, Cloudflare plans, monitoring tools</li>
          </ul>
          <p>
            The pattern shifts from &quot;agent proposes, human approves, human pays&quot; to &quot;agent acts, system logs, human audits.&quot;
            That&apos;s the difference between a tool and an employee.
          </p>

          <h2>The compliance and KYC layer</h2>
          <p>
            The reason most teams don&apos;t issue programmatic cards is that card issuance requires a real legal entity,
            KYC verification, and compliance with banking regulations (BSA/AML in the US). Building that yourself is a multi-month project.
          </p>
          <p>
            Naïve handles this through:
          </p>
          <ul>
            <li><strong>Entity formation</strong> via the <code>/formation</code> endpoint (Doola-backed LLC filing)</li>
            <li><strong>KYC/verification</strong> via the <code>/verification</code> endpoint (Footprint-powered identity verification)</li>
            <li><strong>Card issuance</strong> via <code>/cards</code>, backed by a compliant card issuer</li>
          </ul>
          <p>
            <strong>Important:</strong> Naïve is not a bank. It&apos;s an autonomous company runtime that connects to real banking and compliance infrastructure via APIs.
            The cards are real Visa/Mastercard virtual cards that work anywhere online. But Naïve itself isn&apos;t holding deposits or acting as a bank — it&apos;s providing the programmatic layer on top of regulated infrastructure.
          </p>

          <h2>Seeing spend across your agent fleet</h2>
          <p>
            One of the more useful things that falls out of per-agent card assignment is a full spend log across your agent fleet. Every transaction is attributable to a specific employee:
          </p>
          <pre><code>{`# Get spend history for a specific agent
response = requests.get(
    "https://api.usenaive.ai/v1/cards/transactions",
    headers={"Authorization": f"Bearer {NAIVE_API_KEY}"},
    params={"employee_id": "growth-agent-001", "limit": 50}
)

transactions = response.json()
for tx in transactions["data"]:
    print(f"{tx['date']}  {tx['merchant']}  \${tx['amount']}  {tx['status']}")`}</code></pre>
          <p>
            This is directly useful for cost attribution, budget reporting, and catching unexpected charges before they become a problem.
          </p>

          <h2>When you actually need this</h2>
          <p>
            You don&apos;t need per-agent virtual cards if your agents are only doing read operations — research, drafting, analysis.
            You need them the moment an agent needs to interact with the outside world in a way that costs money.
          </p>
          <p>
            Good signals that you&apos;re at this point:
          </p>
          <ul>
            <li>You&apos;re adding manual &quot;approve payment&quot; steps to agent workflows</li>
            <li>A shared card is being used by multiple agents and attribution is unclear</li>
            <li>An agent prototype works but you can&apos;t deploy it in production because payments aren&apos;t solved</li>
            <li>You want to give an agent a recurring budget and have it manage its own tools</li>
          </ul>

          <hr />

          <p>
            The goal of autonomous AI employees isn&apos;t to have agents that require less hand-holding. It&apos;s to have agents that can complete objectives end-to-end without needing a human to push them through financial gates.
            Virtual cards with per-agent limits are one of the primitives that makes that real.
          </p>
          <p>
            Naïve&apos;s <code>/cards</code> endpoint is documented at{" "}
            <a href="https://usenaive.ai/docs" target="_blank" rel="noopener">usenaive.ai/docs</a>.
            Formation and verification endpoints are at the same location if you need to set up the legal entity first.
          </p>

        </div>

        <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/blog/non-us-llc-no-ssn" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text3)", textDecoration: "none" }}>← Non-US LLC Guide</Link>
          <Link href="/blog/sole-proprietor-vs-llc-banking" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--green)", textDecoration: "none" }}>Next: Sole Proprietor vs LLC →</Link>
        </div>
      </article>
    </div>
  );
}
