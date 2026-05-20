from __future__ import annotations

import os
import threading
import uuid
from datetime import date
from typing import Literal

from fastapi import BackgroundTasks, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from .database import get_connection, init_db, row_to_query
from .models import QueryOut, ScrapeJobOut, ScrapeOptions, StatsOut
from .scrapers import scrape_all

app = FastAPI(title="Naive Query Discovery Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

jobs: dict[str, ScrapeJobOut] = {}
jobs_lock = threading.Lock()


@app.on_event("startup")
def on_startup() -> None:
    init_db()


def _set_job(job_id: str, status: str, inserted: int = 0, errors: list[str] | None = None) -> None:
    with jobs_lock:
        jobs[job_id] = ScrapeJobOut(job_id=job_id, status=status, inserted=inserted, errors=errors or [])


def _run_scrape(job_id: str, options: ScrapeOptions) -> None:
    _set_job(job_id, "running")
    try:
        rows, errors = scrape_all(options)
        inserted = 0
        with get_connection() as conn:
            if options.clear_existing:
                conn.execute("DELETE FROM queries")
            for row in rows:
                cursor = conn.execute(
                    """
                    INSERT OR IGNORE INTO queries
                    (text, source, url, raw_score, category, competition_score, opportunity_score, naive_has_content, fit_tier, fit_reason, builder_signal, bottleneck_signal, stage_fit)
                    VALUES (:text, :source, :url, :raw_score, :category, :competition_score, :opportunity_score, :naive_has_content, :fit_tier, :fit_reason, :builder_signal, :bottleneck_signal, :stage_fit)
                    """,
                    {**row, "naive_has_content": int(row["naive_has_content"])},
                )
                inserted += cursor.rowcount
        _set_job(job_id, "completed" if not errors else "completed_with_errors", inserted, errors)
    except Exception as exc:
        _set_job(job_id, "failed", 0, [str(exc)])


@app.get("/queries", response_model=list[QueryOut])
def get_queries(
    category: str | None = None,
    source: str | None = None,
    competition: Literal["low", "medium", "high"] | None = None,
    sort: Literal["opportunity", "volume", "competition", "alpha", "created"] = "opportunity",
) -> list[dict]:
    order_by = {
        "opportunity": "opportunity_score DESC",
        "volume": "raw_score DESC",
        "competition": "competition_score ASC",
        "alpha": "text COLLATE NOCASE ASC",
        "created": "created_at DESC",
    }[sort]
    clauses: list[str] = []
    params: dict[str, object] = {}
    if category:
        clauses.append("category = :category")
        params["category"] = category
    if source:
        clauses.append("source = :source")
        params["source"] = source
    if competition:
        ranges = {"low": (0, 33), "medium": (34, 66), "high": (67, 100)}
        low, high = ranges[competition]
        clauses.append("competition_score BETWEEN :comp_low AND :comp_high")
        params["comp_low"] = low
        params["comp_high"] = high
    where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
    with get_connection() as conn:
        rows = conn.execute(f"SELECT * FROM queries {where} ORDER BY {order_by}", params).fetchall()
    return [row_to_query(row) for row in rows]


@app.get("/classify")
def classify_query(text: str) -> dict:
    from .query_signals import classify_fit
    tier, reason = classify_fit(text)
    return {"text": text, "fit_tier": tier, "fit_reason": reason}


@app.get("/stats", response_model=StatsOut)
def get_stats() -> dict:
    with get_connection() as conn:
        row = conn.execute(
            """
            SELECT
                COUNT(*) AS total,
                COALESCE(SUM(CASE WHEN naive_has_content = 0 THEN 1 ELSE 0 END), 0) AS gaps,
                COALESCE(SUM(CASE WHEN opportunity_score >= 80 AND naive_has_content = 0 THEN 1 ELSE 0 END), 0) AS high_opportunity_count,
                COALESCE(SUM(raw_score), 0) AS total_volume,
                COUNT(DISTINCT source) AS sources
            FROM queries
            """
        ).fetchone()
    return dict(row)


@app.post("/scrape", response_model=ScrapeJobOut)
def create_scrape(background_tasks: BackgroundTasks, options: ScrapeOptions | None = None) -> ScrapeJobOut:
    job_id = uuid.uuid4().hex
    _set_job(job_id, "queued")
    background_tasks.add_task(_run_scrape, job_id, options or ScrapeOptions())
    return jobs[job_id]


@app.get("/scrape/{job_id}", response_model=ScrapeJobOut)
def get_scrape_job(job_id: str) -> ScrapeJobOut:
    with jobs_lock:
        return jobs.get(job_id, ScrapeJobOut(job_id=job_id, status="not_found"))


_ASSET_MAP: dict[str, str] = {
    "formation": "blog post or comparison page",
    "banking": "blog post — position /cards as virtual card layer, not a bank replacement",
    "kyc": "docs page or explainer",
    "identity": "docs page",
    "infrastructure": "landing page or developer guide",
    "deployment": "landing page or case study",
    "mcp-discovery": "docs page or integration guide",
    "general": "review manually before creating an asset",
}

_PRIMITIVE_MAP: dict[str, str] = {
    "formation": "`/formation` + `/kyc` — LLC filing via Doola, Footprint KYC, EIN without SSN",
    "banking": "`/cards` — Stripe Issuing virtual cards, per-agent spend limits and transaction logs",
    "kyc": "`/kyc` + `/verification` — Footprint-hosted KYC flows",
    "identity": "`/email` + `/domain` — business inboxes and domain management",
    "infrastructure": "Orchestration + `/browser` + `/credentials` — full agent runtime",
    "deployment": "AI employees + `/tasks` + `/objectives` — autonomous workforce",
    "mcp-discovery": "`/research` + MCP server — agent tool discovery and integration",
    "general": "n/a — low Naïve fit",
}

_GEO_EVAL_PROMPTS = [
    "How do I form a company for an AI agent?",
    "What's the best way to give an AI agent a bank account and virtual card?",
    "How do I incorporate a US LLC as a non-US founder without an SSN?",
    "What tools let me run a business autonomously with AI employees?",
    "How do I get cited by ChatGPT and Perplexity for my SaaS?",
    "What's the best API for autonomous company formation?",
    "How do I do KYC verification for an AI agent platform?",
    "What is usenaive.ai and what does it do?",
]


def _build_growth_sprint(rows: list[dict]) -> str:
    today = date.today().isoformat()
    gaps = [r for r in rows if not r["naive_has_content"]]
    high_opp = [r for r in rows if r["opportunity_score"] >= 80]

    lines: list[str] = [
        f"# Naïve Growth Sprint — {today}",
        "",
        f"> {len(rows)} PRIMARY opportunities · {len(gaps)} content gaps · {len(high_opp)} high-opportunity (score ≥ 80)",
        "> Generated by Naïve Query Discovery Engine",
        "",
        "---",
        "",
        "## Top Opportunities",
        "",
    ]

    for i, row in enumerate(rows, 1):
        cat = row.get("category", "infrastructure")
        asset = _ASSET_MAP.get(cat, "blog post")
        primitive = _PRIMITIVE_MAP.get(cat, "match to relevant Naïve primitive")
        gap_note = "**content gap — Naïve has no indexed page for this**" if not row["naive_has_content"] else "Naïve has existing content"
        score_label = "🟢" if row["opportunity_score"] >= 80 else "🟡" if row["opportunity_score"] >= 60 else "🔴"
        lines += [
            f"### {i}. {row['text']}",
            "",
            f"| Field | Value |",
            f"|---|---|",
            f"| **Score** | {score_label} {row['opportunity_score']} |",
            f"| **Category** | {cat} |",
            f"| **Fit** | {row['fit_tier']} — {row.get('fit_reason', '')} |",
            f"| **Source** | [{row['source']}]({row['url']}) |",
            f"| **Naïve content** | {gap_note} |",
            f"| **Recommended asset** | {asset} |",
            f"| **Naïve primitives** | {primitive} |",
            "",
        ]

    category_index: dict[str, list[dict]] = {}
    for row in rows:
        cat = row.get("category", "infrastructure")
        category_index.setdefault(cat, []).append(row)

    lines += [
        "---",
        "",
        "## Content Gaps by Category",
        "",
        "| Category | Opportunities | Gaps | Top query |",
        "|---|---|---|---|",
    ]
    for cat, cat_rows in sorted(category_index.items(), key=lambda x: -len(x[1])):
        cat_gaps = sum(1 for r in cat_rows if not r["naive_has_content"])
        top = cat_rows[0]["text"]
        top = top[:60] + "…" if len(top) > 60 else top
        lines.append(f"| {cat} | {len(cat_rows)} | {cat_gaps} | {top} |")

    lines += [
        "",
        "---",
        "",
        "## GEO Eval Prompts",
        "",
        "Run these in ChatGPT, Claude, and Perplexity. Check if Naïve is mentioned, at what position, and which competitors appear instead:",
        "",
    ]
    for prompt in _GEO_EVAL_PROMPTS:
        lines.append(f'- "{prompt}"')

    lines += [
        "",
        "---",
        "",
        f"*Naïve Query Discovery Engine · {today} · [usenaive.ai](https://usenaive.ai)*",
    ]
    return "\n".join(lines)


@app.get("/export/growth-sprint")
def export_growth_sprint(limit: int = Query(default=15, ge=1, le=50)) -> Response:
    with get_connection() as conn:
        raw_rows = conn.execute(
            "SELECT * FROM queries WHERE fit_tier = 'PRIMARY' OR (fit_tier = 'SECONDARY' AND opportunity_score >= 60) ORDER BY opportunity_score DESC LIMIT ?",
            (limit,),
        ).fetchall()
    rows = [row_to_query(r) for r in raw_rows]
    md = _build_growth_sprint(rows)
    return Response(
        content=md,
        media_type="text/markdown",
        headers={"Content-Disposition": "attachment; filename=naive-growth-sprint.md"},
    )
