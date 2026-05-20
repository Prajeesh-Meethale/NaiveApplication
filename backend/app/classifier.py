from __future__ import annotations

import math
import os
import re
from functools import lru_cache

import requests

CATEGORY_RULES: list[tuple[str, list[str]]] = [
    ("formation", ["formation", "incorporate", "llc", "atlas", "doola", "firstbase", "ein", "dissolve", "registered agent", "delaware", "c corp", "non-us", "non resident", "us company", "c-corp", "state filing"]),
    ("banking", ["bank account", "mercury", "relay", "wise", "payoneer", "virtual card", "stripe issuing", "business bank", "corporate card", "prepaid card", "reloadly", "airwallex", "brex"]),
    ("kyc", ["kyc", "kyb", "verification", "footprint", "persona", "beneficial ownership", "fema odi", "identity verification", "know your customer", "aml compliance", "accredited investor"]),
    ("identity", ["email inbox", "business email", "domain name", "dns record", "spf", "dkim", "dmarc", "email domain"]),
    ("infrastructure", ["mcp", "autonomous company", "usenaive", "primitive", "ai agent", "ai agents", "agent runtime", "autonomous agent", "langchain", "crewai", "agentic"]),
    ("deployment", ["ai employee", "orchestration", "autonomous workflow", "ai worker", "deploy agent", "agent task"]),
    ("mcp-discovery", ["model context protocol", "mcp server", "mcp tool", "mcp integration", "claude mcp", "cursor mcp"]),
    ("aeo", ["answer engine optimization", "aeo", "llm mentions", "llm seo", "cited by chatgpt", "cited by perplexity", "ai brand", "ai search visibility", "geo content", "generative engine", "llm visibility", "ai keyword"]),
]

_AGENT_OPS_FALLBACK = (
    "ai agent", "ai agents", "autonomous", "llc", "formation", "incorporate",
    "kyc", "virtual card", "non-us", "non us", "mcp", "langchain",
)


def classify_category(text: str) -> str:
    haystack = text.lower()
    for category, needles in CATEGORY_RULES:
        if any(needle in haystack for needle in needles):
            return category
    if any(term in haystack for term in _AGENT_OPS_FALLBACK):
        return "infrastructure"
    return "general"


def normalize_raw_score(activity_score: int) -> int:
    if activity_score <= 0:
        return 0
    return min(100, round(math.log1p(activity_score) / math.log1p(500) * 100))


def opportunity(raw_score: int, competition_score: int) -> float:
    return round((raw_score * 0.4) + ((100 - competition_score) * 0.6), 2)


def heuristic_competition_score(query: str) -> int:
    words = re.findall(r"[a-z0-9]+", query.lower())
    broad_terms = {"ai", "agent", "api", "company", "startup", "platform", "tools", "business"}
    length_bonus = max(0, 7 - len(words)) * 8
    broad_bonus = sum(1 for word in words if word in broad_terms) * 7
    exactness_discount = sum(1 for word in words if word in {"kyc", "mcp", "llc", "oauth", "virtual"}) * 8
    return max(8, min(92, 35 + length_bonus + broad_bonus - exactness_discount))


def _serper_search_count(query: str) -> int | None:
    api_key = os.getenv("SERPER_API_KEY")
    if not api_key:
        return None
    response = requests.post(
        "https://google.serper.dev/search",
        headers={"X-API-KEY": api_key, "Content-Type": "application/json"},
        json={"q": query},
        timeout=6,
    )
    response.raise_for_status()
    data = response.json()
    return int(data.get("searchInformation", {}).get("totalResults") or 0)


def _google_search_count(query: str) -> int | None:
    api_key = os.getenv("GOOGLE_API_KEY")
    cse_id = os.getenv("GOOGLE_CSE_ID")
    if not api_key or not cse_id:
        return None
    response = requests.get(
        "https://www.googleapis.com/customsearch/v1",
        params={"key": api_key, "cx": cse_id, "q": query},
        timeout=6,
    )
    response.raise_for_status()
    data = response.json()
    return int(data.get("searchInformation", {}).get("totalResults") or 0)


def _count_to_score(total_results: int) -> int:
    if total_results <= 0:
        return 5
    return max(5, min(100, round(math.log10(total_results + 1) / 8 * 100)))


@lru_cache(maxsize=512)
def competition_score(query: str) -> int:
    if os.getenv("ENABLE_SEARCH_SCORING") != "1":
        return heuristic_competition_score(query)
    try:
        result_count = _serper_search_count(query)
        if result_count is None:
            result_count = _google_search_count(query)
        if result_count is not None:
            return _count_to_score(result_count)
    except requests.RequestException:
        pass
    return heuristic_competition_score(query)


@lru_cache(maxsize=512)
def naive_has_content(query: str) -> bool:
    if os.getenv("ENABLE_NAIVE_CHECK") != "1":
        return False
    search_query = f"site:usenaive.ai {query}"
    try:
        result_count = _serper_search_count(search_query)
        if result_count is None:
            result_count = _google_search_count(search_query)
        if result_count is not None:
            return result_count > 0
    except requests.RequestException:
        pass
    return False
