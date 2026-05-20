import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Form a US LLC as a Non-US Founder (Without an SSN)",
  description:
    "A step-by-step guide for international founders forming a US LLC without a Social Security Number — EIN process, registered agent, banking setup, and the API-first option.",
  openGraph: {
    title: "How to Form a US LLC as a Non-US Founder (Without an SSN)",
    description:
      "Step-by-step: EIN without SSN, registered agent, banking setup, and when to use an API-first formation tool.",
    type: "article",
  },
};

export default function BlogPost() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "14px", fontWeight: 600, color: "var(--text)", textDecoration: "none" }}>
            naïve <span style={{ color: "var(--text3)" }}>×</span> <span style={{ color: "var(--green)" }}>prajeesh</span>
          </Link>
          <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text3)", textDecoration: "none" }}>← Back to application</Link>
        </div>
      </nav>

      {/* Article */}
      <article style={{ maxWidth: 740, margin: "0 auto", padding: "56px 28px 96px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", padding: "3px 10px", border: "1px solid #3ecf7840", borderRadius: 4, color: "var(--green)", background: "#3ecf7812", textTransform: "uppercase", letterSpacing: "0.08em" }}>Formation SEO</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)" }}>·</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)" }}>8 min read</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)" }}>·</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)" }}>May 2026</span>
          </div>
          <h1 style={{ fontFamily: "var(--mono)", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 600, lineHeight: 1.2, marginBottom: 20, letterSpacing: "-0.025em", color: "var(--text)" }}>
            How to Form a US LLC as a Non-US Founder<br />(Without an SSN)
          </h1>
          <p style={{ color: "var(--text2)", fontSize: "16px", lineHeight: 1.625, maxWidth: 600 }}>
            Tens of thousands of international founders hit the same wall every year. No SSN, unclear EIN process, banks that say no,
            and a registered agent requirement that adds confusion. This guide gives you the full picture — what you actually need,
            what it costs, and how to move fast.
          </p>
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)" }}>By Prajeesh</span>
            <span style={{ color: "var(--text3)", fontSize: "11px" }}>·</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)" }}>Growth Engineer Application — Naïve</span>
          </div>
        </div>

        <div className="prose">

          <h2>Why you probably need a US entity</h2>
          <p>
            Most international founders form a US LLC or C-Corp for one or more of these reasons:
          </p>
          <ul>
            <li><strong>Stripe and payment processors</strong> — US entities get better rates, fewer restrictions, and access to Stripe Atlas perks</li>
            <li><strong>US bank account</strong> — Mercury, Relay, Brex, and most modern banking products require a US entity with an EIN</li>
            <li><strong>Investors</strong> — US VCs strongly prefer Delaware C-Corps for fundraising; LLCs work well for solo founders and bootstrapped businesses</li>
            <li><strong>Credibility with US customers</strong> — especially for B2B SaaS, having a US legal entity matters to procurement teams</li>
          </ul>
          <p>
            If you&apos;re just testing an idea, you can often start without one. But if you&apos;re turning on payments or talking to US investors, form the entity first.
          </p>

          <h2>The SSN problem</h2>
          <p>
            The IRS requires an SSN to apply for an EIN online. That locks out non-US founders from the fastest path — the online SS-4 application.
            You have three workarounds:
          </p>
          <ol>
            <li>
              <strong>Phone application (fastest)</strong> — Call the IRS Business &amp; Specialty Tax Line at +1-800-829-4933. If you have an ITIN (or even just a passport), an IRS agent can issue your EIN over the phone in about 15 minutes.
            </li>
            <li>
              <strong>Mail or fax SS-4</strong> — Fill out <a href="https://www.irs.gov/pub/irs-pdf/fss4.pdf" target="_blank" rel="noopener">IRS Form SS-4</a> and fax or mail it to the IRS. Processing takes 4–6 weeks by mail, 4 business days by fax.
            </li>
            <li>
              <strong>Use a formation service with EIN support</strong> — Doola, Firstbase, and others will handle the SS-4 filing as part of their service, including the ITIN/non-resident EIN path.
            </li>
          </ol>
          <p>
            <strong>Note on ITIN vs EIN:</strong> An ITIN (Individual Taxpayer Identification Number) is for individuals; an EIN is for businesses. You&apos;re filing for an EIN — you don&apos;t need an SSN to get one as a non-US person. You just need to use the phone/fax path.
          </p>

          <h2>Choosing a state: Wyoming, Delaware, or your home state</h2>
          <p>
            For most non-US founders forming an LLC (not a C-Corp), the two most common choices are:
          </p>
          <ul>
            <li>
              <strong>Wyoming</strong> — No state income tax, cheap annual fees ($60/year), strong privacy protections, no residency requirement. Best default for non-US founders who aren&apos;t planning to raise VC money.
            </li>
            <li>
              <strong>Delaware</strong> — Standard for VC-backed companies. More expensive ($300+/year), but investors expect it for C-Corps. For LLCs, Wyoming is usually better unless your investors specifically require Delaware.
            </li>
          </ul>
          <p>
            You don&apos;t need to be physically present in either state. You need a registered agent there (more on that below).
          </p>

          <h2>Registered agents: what they are and what to expect</h2>
          <p>
            Every US LLC requires a registered agent — a person or company with a physical address in your state who can receive legal documents on your behalf.
            You can&apos;t use a P.O. box.
          </p>
          <p>
            Most formation services bundle a registered agent for the first year. Annual costs after that run $50–$150/year.
            For non-US founders, this is a non-negotiable line item — don&apos;t try to skip it.
          </p>

          <h2>Your formation options compared</h2>
          <p>
            Here&apos;s the honest comparison as of 2026:
          </p>
          <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Starting price</th>
                <th>Entity types</th>
                <th>EIN support</th>
                <th>Banking included</th>
                <th>API / programmable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Stripe Atlas</strong></td>
                <td>$500 one-time</td>
                <td>Delaware C-Corp only</td>
                <td>✓</td>
                <td>SVB intro offer</td>
                <td>✗</td>
              </tr>
              <tr>
                <td><strong>Doola</strong></td>
                <td>$197/year</td>
                <td>LLC + C-Corp</td>
                <td>✓</td>
                <td>✓ (Mercury referral)</td>
                <td>✗</td>
              </tr>
              <tr>
                <td><strong>Firstbase</strong></td>
                <td>$399/year</td>
                <td>LLC</td>
                <td>✓</td>
                <td>✓ (Mercury referral)</td>
                <td>✗</td>
              </tr>
              <tr>
                <td><strong>Incfile / Northwest</strong></td>
                <td>~$50 + state fees</td>
                <td>LLC + Corp</td>
                <td>Paid add-on</td>
                <td>✗</td>
                <td>✗</td>
              </tr>
              <tr>
                <td><strong>Naïve</strong></td>
                <td>Usage-based</td>
                <td>LLC (via Doola-backed /formation)</td>
                <td>✓</td>
                <td>✓ (via /cards)</td>
                <td><strong>✓ API-first</strong></td>
              </tr>
            </tbody>
          </table>
          </div>
          <p>
            <strong>For a solo non-US founder</strong> who just needs a US entity and bank account: Doola or Firstbase get you there cleanly, with good support for the non-resident EIN process.
          </p>
          <p>
            <strong>For builders and developers</strong> who need formation as a programmable step — either in a product or as part of an autonomous workflow — Naïve&apos;s{" "}
            <code>/formation</code> endpoint is worth knowing. It exposes company formation, KYC, and banking as API primitives, backed by Doola for the legal layer and Footprint for verification.
          </p>

          <h2>The API-first option for builders</h2>
          <p>
            If you&apos;re building a product that programmatically creates entities — a SaaS that spins up LLCs for customers, an autonomous agent that needs a legal identity, or a platform that handles compliance at scale — manual formation tools don&apos;t work at that volume.
          </p>
          <p>
            Naïve&apos;s <code>/formation</code> endpoint lets you kick off an LLC formation flow programmatically:
          </p>
          <pre><code>{`# Kick off formation via Naïve API
curl -X POST https://api.usenaive.ai/v1/formation \\
  -H "Authorization: Bearer $NAIVE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "entity_type": "llc",
    "state": "wyoming",
    "company_name": "My Agent Co LLC",
    "registered_agent": "auto"
  }'`}</code></pre>
          <p>
            You get back a company object you can attach to an agent, assign cards to, or verify KYC against — all through the same API surface.
            This matters less for a solo founder than it does for a builder creating infrastructure.
          </p>

          <h2>Opening a US bank account as a non-US founder</h2>
          <p>
            Once you have your LLC and EIN, the two most founder-friendly US banking options are:
          </p>
          <ul>
            <li><strong>Mercury</strong> — Most popular among early-stage startups. No monthly fees, easy online application, good API. Accepts non-US founders with an EIN. Does not require a US address or SSN for the business account.</li>
            <li><strong>Relay</strong> — Similar to Mercury, slightly more manual onboarding but good support for LLCs and multi-account setups.</li>
          </ul>
          <p>
            <strong>Brex and Ramp</strong> are popular for corporate cards and expense management, but both require a US entity and have minimum balance/revenue requirements. Start with Mercury, add Brex later.
          </p>
          <p>
            <strong>Important:</strong> Naïve is not a bank and doesn&apos;t replace Mercury or Relay. What it adds is programmatic virtual card issuance via <code>/cards</code> — useful for agents that need to make purchases without going through a human workflow.
          </p>

          <h2>The full checklist</h2>
          <ol>
            <li>Choose entity type (LLC for most non-US founders unless raising VC)</li>
            <li>Choose state (Wyoming by default; Delaware if investors require it)</li>
            <li>Select a formation service or file directly with the state</li>
            <li>Obtain your EIN via phone or fax (or have your formation service do it)</li>
            <li>Get a registered agent (usually bundled)</li>
            <li>Open a US bank account (Mercury is the simplest path)</li>
            <li>Keep records for annual state filings and BOI (Beneficial Ownership Information) reports — required post-CTA</li>
          </ol>

          <h2>What it actually costs</h2>
          <p>
            All-in for a Wyoming LLC in 2026, budget roughly:
          </p>
          <ul>
            <li>State filing fee: $100 (Wyoming) or $90 (Delaware)</li>
            <li>Registered agent: $50–$150/year (often bundled first year)</li>
            <li>Formation service: $0–$200+ depending on service</li>
            <li>EIN: Free via IRS (you pay labor or a service fee if using a third party)</li>
            <li>BOI filing: Free (you file directly at FinCEN)</li>
          </ul>
          <p>
            Total out-of-pocket for a lean setup: <strong>$200–$500 in year one</strong>, $100–$200/year after that.
          </p>

          <hr />

          <p>
            The actual process is less scary than the Reddit threads make it sound. The SSN barrier is real but has a clear workaround.
            The EIN phone call takes 15 minutes. Mercury&apos;s onboarding takes an afternoon. The bigger risk is delaying formation
            when you&apos;re already generating revenue or talking to customers who need a US entity to sign a contract.
          </p>
          <p>
            If you&apos;re building something that needs formation as a programmable step — not just a one-time manual process —
            check out <a href="https://usenaive.ai/docs" target="_blank" rel="noopener">Naïve&apos;s primitives docs</a> for the /formation and /verification endpoints.
          </p>

        </div>

        {/* Footer nav */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text3)", textDecoration: "none" }}>← Back to application</Link>
          <Link href="/blog/ai-agent-virtual-card" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--green)", textDecoration: "none" }}>Next: AI Agent Virtual Card →</Link>
        </div>
      </article>
    </div>
  );
}
