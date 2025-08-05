# Agent Instructions

## Repository Structure
- `scripts/` – Python utilities for audio transcription and related tasks.
- `data/recipes/` – Structured recipe JSON files.
- `docs/` – Developer and workflow documentation.
- `react-app/` – Vite + React frontend.

## Development Workflow
- Use Python 3.8+ and Node 18+ or newer.
- For Python changes, run `flake8 scripts` and `pytest` (tests may be absent).
- For frontend changes, run `npm test` (when available) and `npm run lint` inside `react-app`.
- Keep `.audio-inputs/` and `.audio-outputs/` out of version control.

