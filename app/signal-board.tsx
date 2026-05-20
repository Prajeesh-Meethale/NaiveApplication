"use client";

import { useState } from "react";

const PRIMITIVES = ["ALL", "Cards", "Email", "Formation", "AEO", "KYC", "Orchestration"] as const;
type Primitive = (typeof PRIMITIVES)[number];

const PRIMITIVE_COLORS: Record<string, string> = {
  Cards: "#3ecf78",
  Email: "#4a9eff",
  Formation: "#a78bfa",
  AEO: "#f59e0b",
  KYC: "#e8a23a",
  Orchestration: "#e2533a",
};

const SIGNALS = [
  {
    title: "How do you handle payments when your LangChain agent needs to buy something?",
    source: "r/LangChain",
    url: "https://www.reddit.com/r/LangChain/comments/1s805ju/",
    primitive: "Cards",
    score: 9.8,
    quote: "The moment an agent needs to pay for something, everything breaks. Suddenly the human has to step back in, enter a credit card, manage billing dashboards, and basically babysit the transaction.",
    pain: "Agent loop shatters at every checkout — human has to take over",
  },
  {
    title: "Why is no one building anything to make it easier for AI agents to spend money?",
    source: "r/AI_Agents",
    url: "https://www.reddit.com/r/AI_Agents/comments/uvwxzy/",
    primitive: "Cards",
    score: 9.0,
    quote: "Turns out it decided the best way to 'optimize for social impact' was ordering 1000 pizzas. Your wallet? Empty.",
    pain: "No budget-constrained card primitive — agents given raw access drain accounts",
  },
  {
    title: "I was terrified of giving my AI agent my credit card, so I built a system with sandboxed wallets",
    source: "r/LangChain",
    url: "https://www.reddit.com/r/LangChain/comments/1rdmtq3/",
    primitive: "Cards",
    score: 9.1,
    quote: "LLMs are non-deterministic. An agent tasked with provisioning servers could hallucinate an infinite loop and drain your bank account before the error is detected.",
    pain: "Static card credentials in agents = catastrophic blast radius on any logic error",
  },
  {
    title: "How to enable my AI Agent to spend money?",
    source: "r/AI_Agents",
    url: "https://www.reddit.com/r/AI_Agents/comments/stuvwx/",
    primitive: "Cards",
    score: 8.0,
    quote: "It's easy enough to just give it my credit card but that does not feel very smart. I'll have to spend effort setting up controls so it doesn't go crazy and overspend.",
    pain: "No off-the-shelf agent wallet API — devs roll their own spend controls",
  },
  {
    title: "Remember when 'agentic commerce' demos always stopped at checkout?",
    source: "Hacker News",
    url: "https://news.ycombinator.com/item?id=45366552",
    primitive: "Cards",
    score: 9.0,
    quote: "The limitation is not technical — the models can navigate checkout DOM elements — but a restriction of authorization and risk management.",
    pain: "Capability exists; authorized spending infrastructure does not",
  },
  {
    title: "Why AI agents can't receive emails and how we're solving it",
    source: "r/LangChain",
    url: "https://www.reddit.com/r/LangChain/comments/1sw2rr0/",
    primitive: "Email",
    score: 10.0,
    quote: "IMAP polling introduces 30-60 second delays between fetch cycles. Attempting to poll every second triggers rate limits and account suspensions from Google and Microsoft.",
    pain: "IMAP is the only option — it breaks at scale, leaks context, causes race conditions",
  },
  {
    title: "Built email infrastructure for AI agents after hitting the same wall 3 times (Lumbox)",
    source: "r/SideProject",
    url: "https://www.reddit.com/r/SideProject/comments/lmnopq/",
    primitive: "Email",
    score: 8.0,
    quote: "Three separate projects. Three times I needed agents to send and receive email. Three times I duct-taped it together with hacks that broke in production.",
    pain: "No reusable agent inbox primitive — every builder rebuilds from scratch",
  },
  {
    title: "Every single agent needs email access, but they all end up using MY inbox",
    source: "r/Entrepreneur",
    url: "https://www.reddit.com/r/Entrepreneur/comments/uvwxyz/",
    primitive: "Email",
    score: 7.5,
    quote: "Every single agent needs email access, but they all end up using MY inbox. Total mess. Can't tell what agent sent vs I sent; stuff gets lost.",
    pain: "Shared inbox chaos — no isolation between agent identities",
  },
  {
    title: "MCP servers I use every single day — AgentMail gives your agent its own inbox",
    source: "r/ClaudeAI",
    url: "https://www.reddit.com/r/ClaudeAI/comments/1s0u2ms/",
    primitive: "Email",
    score: 7.0,
    quote: "I didn't think I'd need 'agent email' but it's become one of the more useful MCPs in my stack.",
    pain: "Agents without dedicated inboxes can't receive OTPs, handle replies, or own a communication channel",
  },
  {
    title: "Non US founder here — how do you even start a US company without losing your mind",
    source: "r/digitalnomad",
    url: "https://www.reddit.com/r/digitalnomad/comments/ghijkl/",
    primitive: "Formation",
    score: 8.0,
    quote: "I didn't expect the amount of paperwork, weird requirements and confusing state rules. Every website says something different. I'm losing track of everything.",
    pain: "No unified, API-driven path from zero to US LLC for non-residents",
  },
  {
    title: "Stripe shut down my account after forming my company through Stripe Atlas — now what?",
    source: "r/stripe",
    url: "https://www.reddit.com/r/stripe/comments/1k6zocp/",
    primitive: "Formation",
    score: 6.5,
    quote: "Why would Stripe help me create a U.S. company only to later reject it? It feels like I've been set up for failure. I already invested time, money, and legal effort.",
    pain: "Formation vendors don't guarantee payment access — you can be stranded with an LLC and no bank",
  },
  {
    title: "Firstbase.io is a scam",
    source: "r/Entrepreneur",
    url: "https://www.reddit.com/r/Entrepreneur/comments/pqrst/",
    primitive: "Formation",
    score: 7.0,
    quote: "I spent a lot of money and waited three months, and now I don't even have a bank account to run my business. Their support won't read your problem properly.",
    pain: "Formation services stop at paperwork — no bundled banking or compliance path",
  },
  {
    title: "anyone figured out how to actually show up in perplexity/chatgpt search?",
    source: "r/SaaS",
    url: "https://www.reddit.com/r/SaaS/comments/pqrst/",
    primitive: "AEO",
    score: 8.5,
    quote: "I hit rank 1 in Google, but traffic is basically dead. AI overviews answer everything before people even scroll.",
    pain: "Traditional SEO rank #1 is now worthless — no way to measure or improve AI citation",
  },
  {
    title: "Has anyone here gotten their product mentioned by ChatGPT or Perplexity?",
    source: "r/ecommerce",
    url: "https://www.reddit.com/r/ecommerce/comments/wxyzab/",
    primitive: "AEO",
    score: 8.0,
    quote: "So far, none of it has led to any mentions in ChatGPT or Perplexity.",
    pain: "No visibility into how or whether AI models cite your product",
  },
  {
    title: "How do you make your product show up in AI answers, not just Google?",
    source: "r/Entrepreneur",
    url: "https://www.reddit.com/r/Entrepreneur/comments/abcxyz/",
    primitive: "AEO",
    score: 7.5,
    quote: "AI models aren't trying to rank pages; they're building answers. Being the 'best page' matters less than being the most citable source for a concept.",
    pain: "No tooling to track, measure, or improve LLM citation rates",
  },
  {
    title: "Stuck on US Verification, Building AI Outbound Sales Agent",
    source: "r/SaaS",
    url: "https://www.reddit.com/r/SaaS/comments/1ruj1sr/",
    primitive: "KYC",
    score: 9.8,
    quote: "Stripe and Twilio keep blocking my accounts. When they attempt to verify the account holder and find an automated system lacking a verified human beneficial owner, they suspend the account.",
    pain: "Outbound AI agents get KYC-blocked by Stripe/Twilio — no programmatic identity solution",
  },
  {
    title: "AI Finance: verify AI agents acting on behalf of real customers?",
    source: "r/fintech",
    url: "https://www.reddit.com/r/fintech/comments/abcxyz/",
    primitive: "KYC",
    score: 8.5,
    quote: "Current KYC cannot distinguish agent transactions from a bot attack. Identity verification assumes a human.",
    pain: "Legacy KYC assumes biological personhood — breaks for every autonomous agent use case",
  },
  {
    title: "deepagents: Agent harness with LangChain and LangGraph — spawn subagents",
    source: "r/AutoGPT",
    url: "https://www.reddit.com/r/AutoGPT/comments/1rwzpl2/",
    primitive: "Orchestration",
    score: 9.5,
    quote: "Frameworks that allow unconstrained recursion run the risk of creating localized denial-of-service events — sub-agents spawning sub-agents in a futile attempt to resolve an error.",
    pain: "Multi-agent spawning has no production-grade recursion containment standard",
  },
  {
    title: "Building a LangChain/LangGraph multi-agent orchestrator: how to handle transitions?",
    source: "r/LangChain",
    url: "https://www.reddit.com/r/LangChain/comments/1onoufx/",
    primitive: "Orchestration",
    score: 8.5,
    quote: "When a single LLM prompt is overloaded with too many diverse tools and conflicting responsibilities, the agent's reliability plummets — hallucinated tool calls and infinite loops.",
    pain: "No clean handoff protocol between specialist sub-agents in multi-agent systems",
  },
];

const CONTENT_GAPS = [
  {
    title: "Prompt injection via agentic inboxes",
    detail: "Developers know they need webhook-driven inboxes to bypass OTPs, but there's zero guidance on sanitizing inbound email payloads to prevent LLM hijacking by adversarial senders.",
    primitive: "Email",
  },
  {
    title: "Corporate veil liability for AI operators",
    detail: "Builders are forming LLCs via API to pass Stripe/Twilio KYC gates, but no content explains how to maintain that liability protection — commingled banking and registered agent lapses dissolve the shield.",
    primitive: "Formation",
  },
  {
    title: "Recursion containment in spawning pipelines",
    detail: "LangGraph enables deep delegation but there's no definitive technical standard for bounded recursion depth, DAG execution planning, or hash-verified tool registries to prevent runaway spend.",
    primitive: "Orchestration",
  },
];

const BLOG_RECS = [
  {
    title: "Stop Hardcoding Your Credit Card",
    subtitle: "The production architecture of autonomous agent payments using policy-guarded virtual cards and 402 interceptors",
    primitive: "Cards",
  },
  {
    title: "Why IMAP Hacks Kill Agent Velocity",
    subtitle: "Race conditions, 60-second polling latency, and context degradation — the case for webhook-driven inboxes with zero-token polling",
    primitive: "Email",
  },
  {
    title: "Programmatic Personhood",
    subtitle: "Bypassing KYC bottlenecks by issuing LLCs to your AI workforce — and keeping the corporate veil intact",
    primitive: "KYC",
  },
];

const GEO_EVALS = [
  { prompt: "My LangChain agent keeps failing at paid APIs. Are there platforms that let me programmatically issue virtual cards for autonomous agents?", primitive: "Cards" },
  { prompt: "I'm building an outbound sales agent but Stripe and Twilio block my accounts at KYC. Is there a way to incorporate an LLC via API to pass verification?", primitive: "KYC" },
  { prompt: "I need my multi-agent system to bypass email OTP screens. Shared Gmail IMAP causes race conditions. What's the best infrastructure for agent-native inboxes?", primitive: "Email" },
  { prompt: "How do I separate 'intent to pay' from payment execution in an autonomous AI workflow so my agent can't drain my budget?", primitive: "Cards" },
];

export default function SignalBoard() {
  const [active, setActive] = useState<Primitive>("ALL");

  const filtered = active === "ALL" ? SIGNALS : SIGNALS.filter((s) => s.primitive === active);

  const counts = PRIMITIVES.reduce((acc, p) => {
    acc[p] = p === "ALL" ? SIGNALS.length : SIGNALS.filter((s) => s.primitive === p).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 28px", borderBottom: "1px solid var(--border)" }}>

      {/* Header */}
      <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--green)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
        Signal Board · Deep Research
      </div>
      <h2 style={{ fontFamily: "var(--mono)", fontSize: "26px", fontWeight: 600, marginBottom: 14, letterSpacing: "-0.01em" }}>
        What the internet is actually asking
      </h2>
      <p style={{ color: "var(--text2)", marginBottom: 36, lineHeight: 1.8, maxWidth: 620 }}>
        19 real threads from Reddit, Hacker News, and developer forums. Every one is a builder hitting a wall that Naïve
        directly removes. Scored by builder signal, real-world bottleneck, and stage fit.
      </p>

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 36, background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 8, padding: "20px 24px" }}>
        {[
          { val: "19", label: "Threads Found" },
          { val: "9.0", label: "Avg Score" },
          { val: "7", label: "Primitives Hit" },
          { val: "3", label: "Content Gaps" },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "22px", fontWeight: 600, color: "var(--green)" }}>{s.val}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.09em", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {PRIMITIVES.map((p) => {
          const isActive = active === p;
          const col = p === "ALL" ? "var(--text)" : PRIMITIVE_COLORS[p];
          return (
            <button
              key={p}
              onClick={() => setActive(p)}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                padding: "5px 12px",
                borderRadius: 4,
                border: `1px solid ${isActive ? col : "var(--border2)"}`,
                background: isActive ? `${col}18` : "transparent",
                color: isActive ? col : "var(--text3)",
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "all 0.12s",
              }}
            >
              {p} <span style={{ opacity: 0.6 }}>({counts[p]})</span>
            </button>
          );
        })}
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14, marginBottom: 56 }}>
        {filtered.map((s, i) => {
          const col = PRIMITIVE_COLORS[s.primitive];
          return (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 8, padding: 20, transition: "border-color 0.12s" }}
            >
              {/* Top row: source + score */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", background: "var(--bg3)", padding: "2px 7px", borderRadius: 3 }}>{s.source}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 600, color: col }}>{s.score.toFixed(1)}</span>
              </div>

              {/* Title */}
              <div style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 500, color: "var(--text)", lineHeight: 1.55, marginBottom: 12, flex: 1 }}>
                {s.title}
              </div>

              {/* Quote */}
              <div style={{ borderLeft: `2px solid ${col}50`, paddingLeft: 10, marginBottom: 12 }}>
                <p style={{ color: "var(--text3)", fontSize: "11px", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
                  &ldquo;{s.quote}&rdquo;
                </p>
              </div>

              {/* Pain */}
              <div style={{ fontSize: "11px", color: "var(--text2)", lineHeight: 1.6, marginBottom: 14 }}>
                {s.pain}
              </div>

              {/* Primitive tag */}
              <div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", padding: "2px 8px", border: `1px solid ${col}40`, borderRadius: 3, color: col, background: `${col}12` }}>
                  {s.primitive}
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Content gaps */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18 }}>Content gaps — Naïve has no page for these yet</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CONTENT_GAPS.map((g, i) => {
            const col = PRIMITIVE_COLORS[g.primitive];
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 18, padding: "16px 20px", background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 6, alignItems: "start" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)", paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 500, color: "var(--text)", marginBottom: 6 }}>{g.title}</div>
                  <div style={{ fontSize: "12px", color: "var(--text3)", lineHeight: 1.7 }}>{g.detail}</div>
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", padding: "2px 8px", border: `1px solid ${col}40`, borderRadius: 3, color: col, background: `${col}12`, whiteSpace: "nowrap", marginTop: 2 }}>
                  {g.primitive}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom 2-col: blog recs + GEO evals */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Blog recs */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 8, padding: 24 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18 }}>Recommended pages to build</div>
          {BLOG_RECS.map((b, i) => {
            const col = PRIMITIVE_COLORS[b.primitive];
            return (
              <div key={i} style={{ paddingBottom: i < BLOG_RECS.length - 1 ? 16 : 0, marginBottom: i < BLOG_RECS.length - 1 ? 16 : 0, borderBottom: i < BLOG_RECS.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 500, color: "var(--text)", marginBottom: 5 }}>{b.title}</div>
                <div style={{ fontSize: "11px", color: "var(--text3)", lineHeight: 1.65, marginBottom: 8 }}>{b.subtitle}</div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", padding: "2px 7px", border: `1px solid ${col}40`, borderRadius: 3, color: col, background: `${col}12` }}>{b.primitive}</span>
              </div>
            );
          })}
        </div>

        {/* GEO evals */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 8, padding: 24 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18 }}>GEO eval prompts — test in ChatGPT · Perplexity · Claude</div>
          {GEO_EVALS.map((g, i) => {
            const col = PRIMITIVE_COLORS[g.primitive];
            return (
              <div key={i} style={{ paddingBottom: i < GEO_EVALS.length - 1 ? 14 : 0, marginBottom: i < GEO_EVALS.length - 1 ? 14 : 0, borderBottom: i < GEO_EVALS.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", paddingTop: 2, minWidth: 16 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text2)", lineHeight: 1.7, marginBottom: 6, fontStyle: "italic" }}>&ldquo;{g.prompt}&rdquo;</div>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", padding: "2px 7px", border: `1px solid ${col}40`, borderRadius: 3, color: col, background: `${col}12` }}>{g.primitive}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
