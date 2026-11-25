# Lab 3 — Meeting-room booking API with a Squad (60 minutes)

No UI: the proof is a passing test suite. Business rules are where agents guess wrong, so this lab is about writing them down. Install and versions: `..\lab-guide.md` (A1). Squad is the star here; keep v1.1.0 pinned.

**The app:** a REST API for booking meeting rooms. Plain Node `http` module, JSON file storage, `node --test`.

| Act | Min | What |
|---|---|---|
| 1 Setup | 3 | `specify init`, tour |
| 2 Intent | 8 | Constitution, specify, clarify (vote the rule) |
| 3 Design | 7 | Plan the endpoints, tasks, analyze |
| 4 Build | 10 | Squad: API, Domain, Tester in parallel |
| 5 Change | 7 | New business rule, converge |

### Act 1 — Setup

```powershell
mkdir room-booking; cd room-booking
git init
specify init --here --integration copilot
git add -A; git commit -m "chore: spec kit scaffolding"
```

### Act 2 — Intent

```text
/speckit-constitution Principles for a small internal API: Node standard library only, no dependencies;
every endpoint validates input and returns a JSON error with a proper HTTP status;
business rules live in pure functions with unit tests; times are UTC ISO 8601; no personal data beyond a display name.
```

```text
/speckit-specify Build a meeting-room booking API for an office with 5 rooms.
GET /rooms lists rooms. POST /bookings creates a booking (room, start, end, organiser name).
GET /bookings?room=&date= lists bookings. DELETE /bookings/{id} cancels one.
Rules: bookings last 15 minutes to 4 hours, start on a 15-minute boundary, and two bookings for the same room must never overlap.
Bookings only during office hours, 08:00-18:00 UTC, Monday to Friday. Data survives a restart.
```

While it runs, ask: *"Which rule will it get wrong?"* Then open `spec.md` and look at the edge cases (end equal to next start, bookings across midnight).

Rule vote, added with `/speckit-clarify`:

| Option | Rule |
|---|---|
| A Buffer time | There must be at least 10 minutes between two bookings in the same room. |
| B Recurring | A booking can repeat weekly for up to 8 weeks; if any occurrence conflicts, none is created. |
| C Capacity | `GET /rooms?minSeats=` filters rooms by seat count. |
| D Cancel window | A booking cannot be cancelled less than 1 hour before it starts (409 with a clear message). |

### Act 3 — Design

```text
/speckit-plan Plain Node http server in src/server.js, routing in src/routes.js, validation in src/validate.js,
booking rules as pure functions in src/rules.js, storage in src/store.js (JSON file).
Tests with node --test: unit tests for rules, HTTP tests against a server started on a random port.
```

`/speckit-tasks`, then `/speckit-analyze`. In `tasks.md` look for **[P]** tasks that touch different files — those are what Squad parallelises.

### Act 4 — Build with Squad

```powershell
$env:SPECIFY_FEATURE_NO_PERSIST = "1"
squad init
copilot --agent squad
```

When casting, ask for roles that fit the work: lead, API, domain, tester, scribe.

```text
Team, implement specs/001-room-booking/ (spec.md, plan.md, tasks.md).
Domain owns src/rules.js and src/store.js. API owns src/server.js, routes.js and validate.js. Tester writes the tests first for every rule in spec.md.
Do not edit each other's files without asking the lead. Tick tasks in tasks.md. Run "node --test" before you report a phase as finished.
Record any deviation from the plan in .squad/decisions.md.
```

Narrate: who took which task, which test failed first, entries appearing in `.squad/decisions.md`.

Prove it works:

```powershell
node src/server.js
curl -X POST localhost:3000/bookings -H "Content-Type: application/json" -d '{"room":"r1","start":"2026-11-02T09:00:00Z","end":"2026-11-02T10:00:00Z","organiser":"Ana"}'
# repeat the same request: expect 409
node --test
```

Adjust the port to whatever the plan chose.

### Act 5 — Change

```text
/speckit-clarify Add: GET /bookings supports ?organiser= and returns bookings sorted by start time.
A booking in the past is rejected with 422.
```

`/speckit-converge`, implement gap tasks, rerun. Show that the Tester added tests for the new rules.

## Plan B

| Problem | Recovery |
|---|---|
| Agents edit the same file | Say it out loud, point at the ownership line in the prompt, fix with `@Lead` |
| Timezone or boundary bug | Perfect — write the missing rule into the spec, run converge |
| Squad stalls | `/speckit-implement`, or `git switch act4-done` |

## Attendee follow-up

Pick a small rule-heavy domain you know (leave requests, parking spots, on-call swaps). Write the **rules** first, as testable sentences; let the agent build the API afterwards. Done when each rule has a test that would fail without it.
