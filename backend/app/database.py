from __future__ import annotations

import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parents[1] / "query_discovery.sqlite3"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS queries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                source TEXT NOT NULL,
                url TEXT NOT NULL,
                raw_score INTEGER NOT NULL,
                category TEXT NOT NULL,
                competition_score INTEGER NOT NULL,
                opportunity_score REAL NOT NULL,
                naive_has_content INTEGER NOT NULL,
                fit_tier TEXT NOT NULL DEFAULT 'SECONDARY',
                fit_reason TEXT NOT NULL DEFAULT '',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(text, source, url)
            )
            """
        )
        _ensure_column(conn, "fit_tier", "TEXT NOT NULL DEFAULT 'SECONDARY'")
        _ensure_column(conn, "fit_reason", "TEXT NOT NULL DEFAULT ''")
        _ensure_column(conn, "builder_signal", "INTEGER NOT NULL DEFAULT 0")
        _ensure_column(conn, "bottleneck_signal", "INTEGER NOT NULL DEFAULT 0")
        _ensure_column(conn, "stage_fit", "INTEGER NOT NULL DEFAULT 0")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_queries_category ON queries(category)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_queries_source ON queries(source)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_queries_opportunity ON queries(opportunity_score)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_queries_fit_tier ON queries(fit_tier)")


def _ensure_column(conn: sqlite3.Connection, name: str, definition: str) -> None:
    cols = {row[1] for row in conn.execute("PRAGMA table_info(queries)").fetchall()}
    if name not in cols:
        conn.execute(f"ALTER TABLE queries ADD COLUMN {name} {definition}")


def row_to_query(row: sqlite3.Row) -> dict:
    item = dict(row)
    score = int(item["competition_score"])
    item["competition"] = "low" if score < 34 else "medium" if score < 67 else "high"
    item["naive_has_content"] = bool(item["naive_has_content"])
    return item
