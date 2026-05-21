import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signal-Led Outbound Engine – Prajeesh Meethale",
  description:
    "How a Python + Claude + Clay stack moved positive reply rates from 0.4% to 4.2% and cut cost per qualified lead by 70.8% over a 12-week run.",
};

const RESULTS = [
  { metric: "Email Open Rate", legacy: "28%", signal: "64%", delta: "+128%" },
  { metric: "Positive Reply Rate", legacy: "0.4%", signal: "4.2%", delta: "+950%" },
  { metric: "Meeting Show-up Rate", legacy: "60%", signal: "85%", delta: "+41%" },
  { metric: "Cost Per Qualified Lead", legacy: "$1,200", signal: "~$350", delta: "−70.8%" },
];

const STACK = [
  { role: "Sources", tools: "Apollo.io · BuiltWith API · Python scraper" },
  { role: "Orchestration", tools: "Clay.com" },
  { role: "Research synthesis", tools: "Claude 3.5 Sonnet — JSON: profile + job JD" },
  { role: "Delivery", tools: "Instantly.ai · 10 rotating domains" },
  { role: "CRM", tools: "HubSpot — qualified pipeline tracking" },
];

const SIGNALS = [
  {
    type: "Active Pain",
    source: "Greenhouse / Lever",
    logic: "Weighted regex scoring with context patterns, proximity negation, recency bonus, adaptive thresholds",
    alignment: "Evidence the team is actively staffing around scaling pain",
  },
  {
    type: "Tech Shift",
    source: "BuiltWith",
    logic: "Detection of legacy orchestrators and tooling transitions (e.g. Jenkins)",
    alignment: "Transitioning to modern DevEx workflows",
  },
  {
    type: "Contextual",
    source: "LinkedIn / GitHub",
    logic: "Recent profile and activity context related to platform engineering",
    alignment: "Peer-level observation on their specific strategy",
  },
];

export default function CaseStudy() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "14px", fontWeight: 600, color: "var(--text)", textDecoration: "none" }}>
            naïve <span style={{ color: "var(--text3)" }}>×</span> <span style={{ color: "var(--green)" }}>prajeesh</span>
          </Link>
          <Link href="/#about" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text3)", textDecoration: "none" }}>← Back to application</Link>
        </div>
      </nav>

      <article style={{ maxWidth: 800, margin: "0 auto", padding: "64px 28px 96px" }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
            Case Study · Growth Systems Engineering
          </div>
          <h1 style={{ fontFamily: "var(--mono)", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 20 }}>
            Engineering a Signal-Led Outbound Engine
          </h1>
          <p style={{ color: "var(--text2)", fontSize: "16px", lineHeight: 1.8, maxWidth: 640, marginBottom: 32 }}>
            An automated outbound engine built to bypass the terminal noise floor of the US B2B SaaS market. By orchestrating intent signals from custom job-board scrapers and using Claude 3.5 for peer-to-peer research synthesis, the system transformed a legacy spray-and-pray model into a high-fidelity pipeline machine.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "Reply rate", val: "0.4% → 4.2%" },
              { label: "CPL reduction", val: "−70.8%" },
              { label: "Open rate", val: "28% → 64%" },
              { label: "Run duration", val: "12 weeks" },
            ].map((s) => (
              <div key={s.label} style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 6, padding: "10px 16px" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "14px", fontWeight: 600, color: "var(--green)", marginBottom: 2 }}>{s.val}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1 */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>01 — Context</div>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "20px", fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>The B2B noise floor</h2>
          <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.85, marginBottom: 16 }}>
            In the US SaaS market, the spray-and-pray outbound model is effectively dead. For high-impact technical products, generic sequences don&apos;t just fail — they actively damage your brand. I built an automated outbound engine designed to replace raw volume with high-fidelity signal.
          </p>
          <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.85, marginBottom: 24 }}>
            By using AI to bridge the gap between static lead data and actual context, I moved a legacy system from a sub-1% reply rate to a predictable pipeline machine.
          </p>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 6, padding: "20px 24px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Objective</div>
            <p style={{ color: "var(--text)", fontSize: "14px", lineHeight: 1.75, margin: 0 }}>
              Build a repeatable qualified pipeline channel without templated copy. Every message references a specific, verifiable technical pain point.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>02 — Target</div>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "20px", fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>Quality at scale</h2>
          <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.85, marginBottom: 24 }}>
            The goal was to penetrate the US Mid-Market and Enterprise segments for a Developer Experience platform. The target persona — VP-level engineering leaders — are some of the most heavily marketed-to individuals in the industry.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "Target", val: "Series B+ US DevTools" },
              { label: "KPIs", val: "Reply rate + CPL" },
              { label: "Constraint", val: "Zero templated copy" },
            ].map((item) => (
              <div key={item.label} style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 6, padding: "16px 18px" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text)", fontWeight: 500 }}>{item.val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>03 — Architecture</div>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "20px", fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>Growth stack</h2>
          <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.85, marginBottom: 24 }}>
            The workflow runs in sequence: source coverage → signal consolidation → research synthesis → controlled delivery tied to CRM outcomes.
          </p>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 8, overflow: "hidden" }}>
            {STACK.map((row, i) => (
              <div key={row.role} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 0, borderBottom: i < STACK.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ padding: "14px 18px", borderRight: "1px solid var(--border)", fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center" }}>{row.role}</div>
                <div style={{ padding: "14px 18px", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text2)", display: "flex", alignItems: "center" }}>{row.tools}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>04 — Signal Theory</div>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "20px", fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>Why job signals beat firmographic targeting</h2>
          <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.85, marginBottom: 24 }}>
            Firmographics tell you what a company looked like on paper. Job signals tell you what the team is actively trying to solve right now. The thesis is timing and relevance.
          </p>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid var(--border)" }}>
              {["Dimension", "Firmographics", "Job Signals"].map((h, i) => (
                <div key={h} style={{ padding: "10px 16px", fontFamily: "var(--mono)", fontSize: "9px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>{h}</div>
              ))}
            </div>
            {[
              ["Data Freshness", "Static snapshots", "Continuously updated hiring demand"],
              ["Intent Proximity", "Weak proxy for current pain", "Direct proxy for active priorities"],
              ["Message Specificity", "Broad personalization", "Concrete, context-linked observations"],
            ].map(([dim, firm, sig], i) => (
              <div key={dim} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                <div style={{ padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text)", borderRight: "1px solid var(--border)" }}>{dim}</div>
                <div style={{ padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)", borderRight: "1px solid var(--border)" }}>{firm}</div>
                <div style={{ padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "11px", color: "var(--green)" }}>{sig}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>05 — Signal Mapping</div>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "20px", fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>Segmenting via latent intent</h2>
          <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.85, marginBottom: 24 }}>
            I ignored purchased lists. Instead I built a segmentation engine based on latent intent — finding prospects exactly when their pain was most acute. Three signal layers:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {SIGNALS.map((s) => (
              <div key={s.type} style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 6, padding: "18px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 600, color: "var(--text)" }}>{s.type}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--green)", background: "#3ecf7815", border: "1px solid #3ecf7830", padding: "2px 8px", borderRadius: 3 }}>{s.source}</span>
                </div>
                <p style={{ color: "var(--text3)", fontSize: "12px", lineHeight: 1.7, margin: 0 }}>{s.logic}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 6, padding: "18px 22px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Intent scoring pipeline</div>
            {[
              "Fetch recent jobs (30-day window) and normalize records",
              "De-duplicate near-identical postings by normalized title",
              "Score title and description with weighted regex patterns",
              "Apply context boosts and proximity-based negation penalties",
              "Add recency bonus and optional co-occurrence boosts",
              "Compute adaptive threshold and classify intent level",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "8px 0", borderBottom: i < 5 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", minWidth: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "var(--text2)", fontSize: "12px", lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)", fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)" }}>
              Example output: <span style={{ color: "var(--text)" }}>top_score: 3.8 · intent_level: medium · reason_codes: kw:migration, title:kubernetes, context:2</span>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>06 — LLM Usage</div>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "20px", fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>The AI advantage: research synthesis</h2>
          <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.85, marginBottom: 16 }}>
            Most teams use LLMs for bulk copy generation, which creates recognisable, stiff AI-fluency. I used Claude for research transformation instead. A Python-based webhook watched for new leads and instructed the model to:
          </p>
          <div style={{ borderLeft: "2px solid var(--green)", paddingLeft: 18, marginBottom: 24 }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text2)", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
              &ldquo;Identify the most technically complex project mentioned in this profile and summarise it in 8 words or less as a peer-to-peer observation.&rdquo;
            </p>
          </div>
          <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.85, marginBottom: 24 }}>
            This summary was injected into a manual-style template, ensuring the email felt like it was written by a senior engineer who had actually done the homework.
          </p>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 8, padding: "22px 26px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>Message anatomy</div>
            {[
              { role: "Subject", copy: "[Company]'s transition to [Technology]" },
              { role: "Opening", copy: "I noticed you're hiring for a [Role] to help with [Specific Problem from JD]." },
              { role: "AI hook", copy: "Usually, when teams scale that fast, [Problem] starts to create a bottleneck in [Metric]." },
              { role: "Pain point", copy: "I built a way to automate [Solution] so your team doesn't have to spend weekends on it." },
              { role: "CTA", copy: "Worth a 5-minute chat, or should I send a quick Loom of how [Competitor] is handling this?" },
            ].map((row, i) => (
              <div key={row.role} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, padding: "10px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none", alignItems: "start" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", paddingTop: 2 }}>{row.role}</span>
                <span style={{ color: "var(--text2)", fontSize: "12px", lineHeight: 1.7 }}>{row.copy}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7 — Results */}
        <section style={{ marginBottom: 0 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>07 — Results</div>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "20px", fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>Performance uplift</h2>
          <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.85, marginBottom: 28 }}>
            12-week active run · 1,240 high-fit prospects · Cohorts: Legacy (600, static lists) vs Signal-Led (640, intent-triggered). Baseline from 90-day pre-optimisation average.
          </p>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: "1px solid var(--border)" }}>
              {["Metric", "Legacy", "Signal-Led", "Delta"].map((h, i) => (
                <div key={h} style={{ padding: "10px 16px", fontFamily: "var(--mono)", fontSize: "9px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>{h}</div>
              ))}
            </div>
            {RESULTS.map((row, i) => (
              <div key={row.metric} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: i < RESULTS.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ padding: "13px 16px", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text)", borderRight: "1px solid var(--border)" }}>{row.metric}</div>
                <div style={{ padding: "13px 16px", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text3)", borderRight: "1px solid var(--border)" }}>{row.legacy}</div>
                <div style={{ padding: "13px 16px", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text)", fontWeight: 600, borderRight: "1px solid var(--border)" }}>{row.signal}</div>
                <div style={{ padding: "13px 16px", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--green)", fontWeight: 600 }}>{row.delta}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, borderLeft: "2px solid var(--text3)", paddingLeft: 16 }}>
            <p style={{ color: "var(--text3)", fontSize: "12px", lineHeight: 1.75, margin: 0 }}>
              By gating outbound capacity to verified intent signals, we achieved 10× reply efficiency without increasing total send volume.
            </p>
          </div>
        </section>

      </article>

      {/* Footer */}
      <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)" }}>Part of the Naïve Growth Engineer application</div>
          <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--green)", textDecoration: "none" }}>← Back to application</Link>
        </div>
      </footer>

    </div>
  );
}
