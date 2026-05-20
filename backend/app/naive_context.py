"""Naïve fit classification — sourced from extrastuff/naive-context.md sections 7–11."""

from __future__ import annotations

from typing import Literal

FitTier = Literal["PRIMARY", "SECONDARY", "SKIP"]

# Section 11 — do not duplicate these topics as net-new PRIMARY pages
EXISTING_BLOG_TOPICS = (
    "introducing /formation",
    "introducing /kyc",
    "introducing /cards",
    "naive vs paperclip",
    "top 10 platforms to build autonomous companies",
)

# Section 3 — primitives that exist (for guardrails in prompts)
VALID_PRIMITIVES = (
    "/formation",
    "/kyc",
    "/cards",
    "/email",
    "/social",
    "/browser",
    "/domain",
    "/credentials",
    "/research",
    "/verification",
    "naive formation",
    "naive cards",
    "naive email",
    "geo",
    "seo/geo",
)
