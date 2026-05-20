"""Thread fit scoring: PRIMARY | SECONDARY | SKIP (naive-context.md §7–10)."""

from __future__ import annotations

from typing import Literal

FitTier = Literal["PRIMARY", "SECONDARY", "SKIP"]

QUESTION_PREFIXES = (
    "how do",
    "how can",
    "how are",
    "how would",
    "what are",
    "what is",
    "what would",
    "which",
    "why is",
    "why are",
    "is there",
    "are there",
    "can i",
    "should i",
    "best way",
    "best ",
)

HELP_PATTERNS = (
    "looking for",
    "recommend",
    "anyone know",
    "does anyone",
    "anyone using",
    "help with",
    "advice",
    "need help",
    " vs ",
    " versus ",
    "alternative to",
    "compared to",
)

# §10 PRIMARY triggers
PRIMARY_PATTERNS: list[tuple[str, str]] = [
    (r"\bform(ing)?\b.*\b(llc|c-?corp|company|incorporat)", "Company formation — /formation + /kyc"),
    (r"\b(incorporat|llc|c-?corp)\b", "Company formation — /formation"),
    (r"\bnon[- ]?us\b.*\b(founder|founders)\b.*\b(llc|company|incorporat|ein)", "Non-US founder US company — /formation + /kyc"),
    (r"\b(indian|foreign|international)\b.*\b(founder|founders)?\b.*\b(llc|us company|incorporat)", "Non-US founder formation"),
    (r"\bai agent\b.*\b(bank|card|email|browser|account)\b", "Agent real-world identity — /cards + /email + /browser"),
    (r"\b(give|giving)\b.*\b(ai )?agent\b.*\b(bank|card|email)\b", "Give agent bank/card/email — PRIMARY"),
    (r"\bagent\b.*\b(bank account|virtual card|corporate card)\b", "Agent banking — /cards"),
    (r"\bkyc\b.*\b(agent|founder|platform)\b", "KYC for agents/founders — /kyc"),
    (r"\bidentity verification\b.*\b(agent|founder)\b", "Identity verification — /kyc"),
    (r"\bautonomous compan", "Autonomous company runtime"),
    (r"\bai employee", "AI employees / orchestration"),
    (r"\bagent orchestrat", "Agent orchestration"),
    (r"\b(build|launch)\b.*\b(saas|app)\b.*\b(without|no)\b.*\b(team|developer)", "Build SaaS without team"),
    (r"\brank\b.*\b(chatgpt|perplexity|claude|llm|ai search)", "GEO — rank in AI search"),
    (r"\b(cited|cite)\b.*\b(chatgpt|perplexity|ai)", "GEO / AI citations"),
    (r"\bgeo\b|\bgenerative engine optimization\b", "GEO/AEO"),
    (r"\bcold email\b.*\b(automat|outreach|sequence)", "Cold email automation"),
    (r"\blinkedin\b.*\b(automat|outreach)", "LinkedIn automation"),
    (r"\brun\b.*\b(business|company)\b.*\bwithout\b.*\b(employee|team)", "Run business without employees"),
    (r"\bprogrammatic\b.*\b(formation|incorporat|company)", "API-first formation"),
    (r"\bformation\b.*\bapi\b", "API-first formation"),
    (r"\bcorporate card\b.*\b(startup|agent)", "Corporate cards for agents/startups — /cards"),
    (r"\bvirtual card\b.*\bagent", "Virtual cards for agents — /cards"),
    (r"\bein\b.*\b(without ssn|non[- ]?resident|foreign)", "EIN without SSN — formation stack"),
    (r"\bdissolv(e|ing)\b.*\b(llc|company)\b", "LLC dissolution — formation ops gap"),
]

# §10 SECONDARY triggers (§8 worst-thread types)
SECONDARY_PATTERNS: list[tuple[str, str]] = [
    (r"\b(mercury|relay|bluevine|brex|airwallex|slash|wise|novo|chase)\b.*\b(vs|versus|or)\b", "Bank provider comparison — /cards adjacent only"),
    (r"\b(vs|versus)\b.*\b(mercury|relay|bluevine|brex|airwallex|slash)", "Bank provider comparison"),
    (r"\b(brex|airwallex|mercury|relay)\b.*\balternative", "Bank alternative thread — not a Naïve bank pitch"),
    (r"\bbest\b.*\b(bank|banking)\b", "Choosing a business bank — secondary at best"),
    (r"\bbusiness bank account\b", "Business bank account — Naïve is not a bank"),
    (r"\bstripe atlas\b.*\b(vs|versus|or)\b.*\b(doola|firstbase)", "Atlas vs Doola comparison — secondary unless API/agent angle"),
    (r"\b(doola|firstbase|clerky)\b.*\b(vs|versus|or)\b.*\b(atlas|stripe)", "Formation service comparison"),
    (r"\bbookkeeping\b|\baccounting\b", "Bookkeeping — Finance tool is secondary"),
    (r"\bpress\b.*\b(coverage|outreach)\b|\bpr strategy\b", "PR — secondary mention"),
    (r"\bnon[- ]?us\b.*\b(founder|founders)\b.*\b(bank|airwallex|brex|mercury)", "Non-US founder asking which bank — secondary"),
]

# §10 SKIP triggers
SKIP_PATTERNS: list[tuple[str, str]] = [
    (r"\bwhich crm\b|\bbest crm\b", "CRM — not a Naïve product"),
    (r"\bhosting\b.*\b(best|which|recommend)", "Hosting — skip"),
    (r"\bwhat should i name\b|\bbusiness name ideas\b", "Naming — skip"),
    (r"\b(getting )?funding\b|\braise\b.*\b(vc|investor|round)\b", "Fundraising — skip (Accelerator at most)"),
    (r"\bbest social media platform\b", "Social platform choice — skip"),
    (r"\bhire\b.*\b(employee|employees|staff)\b", "Hiring humans — weak fit"),
    (r"\blangchain\b.*\b(tracing|guardrail|eval)", "Agent dev tooling — skip"),
    (r"\bshow hn:\b|\blaunch hn\b", "HN show/launch — skip"),
    (r"\bpitch deck\b", "Pitch deck advice — skip"),
    (r"\bco.?founder\b.*\b(equity|split|paradox|vesting)\b", "Co-founder equity/structure — skip"),
    (r"\bproduct hunt\b.*\b(launch|#1|ranking|week)\b", "Product Hunt launch — skip"),
    (r"\b(finding|hire|hiring)\b.*\b(technical|engineer|developer|cto|engineer)\b", "Hiring engineers — skip"),
    (r"\bfranchis", "Franchise business — skip"),
    (r"\b(septic|car wash|lawn|plumbing|hvac)\b.*\b(business|service)", "Local services — skip"),
    (r"\b(raise|raised)\b.*\b\$?[0-9]+[km]?\b.*\b(arr|mrr|revenue|month)", "Revenue milestone post — skip"),
    (r"\b9.?to.?5\b|\b9-5\b|\bquitting my job\b|\bleaving my job\b", "Job-quitting motivation — skip"),
    (r"\bwho is hiring\b|\bwho.s hiring\b|\bhiring\?\s*\(", "Hiring thread — skip"),
    (r"\bmental health\b|\bburnout\b|\blosing my mind\b|\btook a toll\b", "Personal wellbeing post — skip"),
    (r"\bnon.?profit\b|\bnonprofit\b|\b501.?c\b", "Non-profit formation — skip"),
]

AGENT_OPS_TERMS = (
    "ai agent",
    "ai agents",
    "autonomous agent",
    "agentic",
    "langchain",
    "crewai",
    "mcp",
    "autonomous",
    "api-first",
    "programmatic",
    "non-us",
    "non us",
    "foreign founder",
    "indian founder",
    "llc",
    "formation",
    "incorporate",
    "kyc",
    "virtual card",
    "geo",
)

BANK_NAMES = (
    "mercury", "relay", "bluevine", "brex", "airwallex", "slash", "wise", "novo",
    "chase", "bank of america", "capital one",
)

BLOCKLIST = (
    "i will not promote",
    "who is hiring",
    "literature review",
    "hot take",
    "unpopular opinion",
    "pitch deck",
    "show hn:",
)

# ── Three-dimension scoring (B × 0.3 + R × 0.5 + S × 0.2) × 10 → 0-100 ──────
# Maps each Naïve primitive to the problem language people actually use,
# not to product/brand names.

_BUILDER_STRONG: tuple[str, ...] = (
    "my agent", "our agent", "building an agent", "building autonomous",
    "agent needs to", "give my agent", "make my agent", "my llm agent",
    "my ai agent", "building a bot", "deploy my agent", "spawn agent",
    "spawn sub-agent", "multi-agent", "agentic workflow", "agent pipeline",
    "i built an agent", "we built an agent",
)

_BUILDER_MEDIUM: tuple[str, ...] = (
    "ai agent", "autonomous agent", "langchain", "crewai", "autogpt",
    "llm agent", "gpt agent", "claude agent", "orchestrat",
    "automate", "agent framework", "agentic system",
)

_BUILDER_WEAK: tuple[str, ...] = (
    "autonomous", "agentic", "bot", "automated", "workflow automation",
)

_BOTTLENECK_STRONG: tuple[str, ...] = (
    "give my agent a credit card", "agent needs to make purchases",
    "autonomous spending", "agent payment", "agent spend",
    "agent needs a bank", "agent bank account", "virtual card for agent",
    "give agent a card", "card for my agent", "agent card",
    "my agent needs a legal entity", "ai company formation via api",
    "agent operating as a business", "company for my agent",
    "legal identity for agent", "legal entity for my agent",
    "agent that sends email", "agent inbox", "autonomous outreach",
    "agent email", "email for my agent",
    "get cited by chatgpt", "appear in ai search", "llm visibility",
    "rank in perplexity", "cited by perplexity",
    "kyc without ssn", "programmatic identity verification",
    "kyc for agent", "verify agent", "agent kyc",
    "multi-agent task delegation", "spawn sub-agents",
    "autonomous workforce", "ai employee",
)

_BOTTLENECK_MEDIUM: tuple[str, ...] = (
    "llc", "formation", "incorporate", "kyc", "virtual card",
    "corporate card", "ein", "non-us founder", "foreign founder",
    "identity verification", "geo", "aeo", "llm mentions",
    "cited by ai", "prepaid card", "business card",
    "business email", "autonomous company",
    # real-world action signals — detectable from titles alone
    "real action", "real world", "real-world",
    "take action", "takes action", "taking action",
    "make a purchase", "make purchases", "spend money",
    "payment", "money", "credential", "permission",
    "controlling agent", "control agent", "monitor agent",
    "agent in production", "production-ready", "production ready",
    "over-permission", "overpermission",
    "deploy agent", "agent access", "agent tool",
)

_STAGE_INFRA: tuple[str, ...] = (
    "how do i give", "how do i connect", "how do i set up",
    "best way to give", "best way to connect", "need to give",
    "already built", "in production", "deployed",
    "live agent", "running agent", "next step", "ready to launch",
    "going live", "just built", "we built", "i shipped",
    "building right now",
)

_STAGE_IDEATOR: tuple[str, ...] = (
    "thinking about", "planning to build", "someday",
    "in the future", "considering building", "maybe one day",
    "not sure if i should", "wondering if",
)


def _score_builder(text: str) -> int:
    strong = sum(1 for t in _BUILDER_STRONG if t in text)
    medium = sum(1 for t in _BUILDER_MEDIUM if t in text)
    weak = sum(1 for t in _BUILDER_WEAK if t in text)
    return min(10, strong * 5 + medium * 2 + weak * 1)


def _score_bottleneck(text: str) -> int:
    strong = sum(1 for t in _BOTTLENECK_STRONG if t in text)
    medium = sum(1 for t in _BOTTLENECK_MEDIUM if t in text)
    return min(10, strong * 4 + medium * 1)


def _score_stage(text: str) -> int:
    infra = sum(1 for t in _STAGE_INFRA if t in text)
    ideation = sum(1 for t in _STAGE_IDEATOR if t in text)
    base = min(10, infra * 3 + 3)
    return max(0, base - ideation * 3)


def three_dim_score(title: str) -> tuple[int, int, int, float]:
    """(builder_signal, bottleneck_signal, stage_fit, final_0_to_100).

    Formula: (B × 0.3 + R × 0.5 + S × 0.2) × 10
    """
    text = _normalize(title)
    b = _score_builder(text)
    r = _score_bottleneck(text)
    s = _score_stage(text)
    final = round((b * 0.3 + r * 0.5 + s * 0.2) * 10, 2)
    return b, r, s, final


def _normalize(title: str) -> str:
    return " ".join(title.lower().split())


def _match_patterns(patterns: list[tuple[str, str]], text: str) -> str | None:
    import re
    for pattern, reason in patterns:
        if re.search(pattern, text):
            return reason
    return None


def _has_agent_ops_angle(text: str) -> bool:
    return any(term in text for term in AGENT_OPS_TERMS)


def _is_skip_generic_bank(text: str) -> bool:
    """§8 #2 / §10: plain 'best business bank' or vague bank account — SKIP."""
    # Named bank comparisons are §8 #1 → SECONDARY, not skip
    if (" vs " in text or " versus " in text) and any(b in text for b in BANK_NAMES):
        return False
    if "business bank account" in text and len(text.split()) <= 6:
        return True
    if "best" in text and "bank" in text and "small business" in text and not _has_agent_ops_angle(text):
        if not any(b in text for b in BANK_NAMES):
            return True
    if text.strip() in ("business bank account", "business bank account??", "bank account", "bank account??"):
        return True
    return False


def _is_bank_comparison_secondary(text: str) -> bool:
    """§8 #1 / §10: Mercury vs Relay etc. — SECONDARY only (not SKIP)."""
    has_bank = any(b in text for b in BANK_NAMES) or "bank account" in text
    if not has_bank:
        return False
    if " vs " in text or " versus " in text or "alternative" in text:
        return True
    if "best" in text and "bank" in text:
        return True
    return "business bank account" in text


def classify_fit(title: str) -> tuple[FitTier, str]:
    """
    Intent-first decision tree.
    PRIMARY = builder building autonomous system + hitting real-world infra bottleneck.
    Topic-only matches (LLC, formation) with no builder signal → SECONDARY at best.
    """
    text = _normalize(title)
    if any(b in text for b in BLOCKLIST):
        return "SKIP", "Blocked noise / off-topic thread type"

    skip_reason = _match_patterns(SKIP_PATTERNS, text)
    if skip_reason:
        return "SKIP", skip_reason

    # ── Intent-first: builder + bottleneck wins PRIMARY before any topic check ──
    b = _score_builder(text)
    r = _score_bottleneck(text)
    if b >= 2 and r >= 2:
        return "PRIMARY", "Builder hitting real-world infra bottleneck — core Naïve ICP"
    if b >= 3 and r >= 1:
        return "PRIMARY", "Active builder needs Naïve primitive"
    if b >= 1 and r >= 4:
        return "PRIMARY", "Strong infra bottleneck with builder context"

    # Agent + real-world action phrasing (still intent, not topic)
    if "agent" in text and ("bank account" in text or " card" in text or "payment" in text):
        return "PRIMARY", "Agent real-world action — /cards + identity"

    # ── Topic patterns — but only PRIMARY if there is also a builder/agent signal ──
    primary_reason = _match_patterns(PRIMARY_PATTERNS, text)
    if primary_reason:
        if b >= 1 or _has_agent_ops_angle(text):
            return "PRIMARY", primary_reason
        # Topic match with no builder signal → demote
        return "SECONDARY", f"Topic match, no builder signal — {primary_reason}"

    # Non-US founder formation — useful but not core ICP, cap at SECONDARY
    if ("non-us" in text or "non us" in text or "indian" in text or "foreign founder" in text) and (
        "llc" in text or "company" in text or "incorporat" in text or "ein" in text
    ):
        return "SECONDARY", "Non-US founder formation — /formation relevant, not core ICP"

    if _is_skip_generic_bank(text):
        return "SKIP", "Generic business bank question — Naïve is not a bank"

    secondary_reason = _match_patterns(SECONDARY_PATTERNS, text)
    if secondary_reason:
        if "atlas" in text and _has_agent_ops_angle(text):
            return "PRIMARY", "Formation comparison with agent/API-first angle"
        return "SECONDARY", secondary_reason

    if _is_bank_comparison_secondary(text) and not _has_agent_ops_angle(text):
        return "SECONDARY", "Bank comparison — mention /cards only"

    if not _has_agent_ops_angle(text):
        return "SKIP", "General business thread — no agent/automation angle"

    return "SECONDARY", "Adjacent to Naïve — mention primitives only if clearly relevant"


def title_type(title: str) -> str:
    lowered = title.lower().strip()
    if lowered.endswith("?") or any(lowered.startswith(prefix) for prefix in QUESTION_PREFIXES):
        return "questions"
    if any(pattern in lowered for pattern in HELP_PATTERNS):
        return "help"
    return "discussion"


def allowed_post_type(title: str, post_types: list[str]) -> bool:
    return title_type(title) in set(post_types)


def is_relevant_query(title: str, mode: str) -> bool:
    tier, _ = classify_fit(title)
    if mode == "tight":
        return tier == "PRIMARY"
    if mode == "balanced":
        return tier in ("PRIMARY", "SECONDARY")
    return True  # wide: include SKIP rows for review, but no page generation


def relevance_score(title: str) -> int:
    """0–100 fit score; 20% tier-anchor, 80% three-dimension intent model.

    Tier is now a soft floor, not the primary driver.  A formation thread
    with no builder signal scores low even if classify_fit called it PRIMARY.
    A builder-bottleneck thread scores high regardless of topic category.
    """
    tier, _ = classify_fit(title)
    tier_base = {"PRIMARY": 70, "SECONDARY": 35, "SKIP": 5}[tier]
    _, _, _, dim_score = three_dim_score(title)
    blended = round(tier_base * 0.20 + dim_score * 0.80)
    if title_type(title) == "questions":
        blended += 5
    return min(100, blended)
