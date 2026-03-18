# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Deployment

- Production URL: **https://aria-dashboard-black.vercel.app**
- Deployed via Vercel GitHub integration — push to `main` to deploy
- When asked to "open the dashboard", open https://aria-dashboard-black.vercel.app (not localhost)

## Architecture

Single-page React app with no router. Navigation is handled by an `active` state string in `App.jsx` that maps to panel components.

**State lives entirely in `App.jsx`** and is passed down as props:
- `simStats` — live KPI counters (leads, bookings, missed calls, revenue, instagram)
- `simFeed`, `simAppointments`, `simLeads`, `simMissedCalls`, `simEmails`, `simReviews`, `simIgConversations` — arrays populated during simulation
- `simRunning` / `simStarted` — simulation state flags

**Simulation system** (`SIM_EVENTS` in `App.jsx`): A scripted sequence of timed events (`setTimeout`) that fires toasts, updates stats, and pushes data into the sim arrays. Triggered by "Start Live Simulation" button on the Dashboard. `resetSim` clears all timers and resets to base state.

**Design system** (defined in `src/index.css`):
- CSS vars: `--accent` (#8BBCAD sage green), `--rose` (#D4907A), `--gold` (#C9A87C)
- Dark background: `#0D1110`
- Card bg: `#131918`, borders: `#1E2B28`
- Custom animations: `.toast-enter`, `.toast-exit`, `.count-up`, `.sim-pulse`
- Fonts: `font-display` (headings), `font-mono` (labels/badges), Tailwind default (body)
