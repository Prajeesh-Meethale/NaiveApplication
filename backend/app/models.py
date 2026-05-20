from __future__ import annotations

from pydantic import BaseModel, Field
from typing import Literal


class QueryOut(BaseModel):
    id: int
    text: str
    source: str
    url: str
    raw_score: int
    category: str
    competition_score: int
    competition: str
    opportunity_score: float
    naive_has_content: bool
    fit_tier: str
    fit_reason: str
    builder_signal: int
    bottleneck_signal: int
    stage_fit: int
    created_at: str


class StatsOut(BaseModel):
    total: int
    gaps: int
    high_opportunity_count: int
    total_volume: int
    sources: int


class ScrapeJobOut(BaseModel):
    job_id: str
    status: str
    inserted: int = 0
    errors: list[str] = []


class ScrapeOptions(BaseModel):
    intent_mode: Literal["tight", "balanced", "wide"] = "balanced"
    user_overrides: bool = False
    categories: list[str] = Field(default_factory=lambda: ["formation", "banking", "identity", "kyc", "infrastructure", "deployment", "aeo"])
    sources: list[str] = Field(default_factory=lambda: [
        "r/AIAgents", "r/LangChain", "r/ClaudeAI",
        "r/AutoGPT", "r/SideProject", "r/LocalLLaMA",
        "r/indiehackers", "Hacker News",
    ])
    source_floors: dict[str, int] = Field(default_factory=lambda: {
        "r/entrepreneur": 5,
        "r/startups": 5,
        "r/smallbusiness": 4,
        "r/legaladvice": 3,
        "r/indiehackers": 4,
        "r/AIAgents": 3,
        "r/LangChain": 3,
        "r/ClaudeAI": 3,
        "r/AutoGPT": 2,
        "r/SideProject": 3,
        "r/LocalLLaMA": 3,
        "Hacker News": 5,
        "Stack Overflow": 1,
    })
    post_types: list[str] = Field(default_factory=lambda: ["questions", "help", "ask_hn"])
    recency_days: int = 180
    max_results: int = 80
    clear_existing: bool = False
