# Query Discovery Backend

FastAPI + SQLite API for the growth query discovery engine.

## Run

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install -r requirements.txt
.\.venv\Scripts\python -m uvicorn app.main:app --reload --port 8000
```

Optional search scoring (off by default):

```powershell
$env:SERPER_API_KEY="..."
$env:ENABLE_SEARCH_SCORING="1"
$env:ENABLE_NAIVE_CHECK="1"
```

Or Google Custom Search: `GOOGLE_API_KEY`, `GOOGLE_CSE_ID`.

Without these flags the app uses a competition heuristic and marks `naive_has_content` as false.
