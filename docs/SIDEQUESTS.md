# Side Quests

> **Staff Engineers** - We expect you to complete at least one side quest.

> **Senior Software Engineers** - Quests are **optional** (unless BE leaning), though encouraged!

These are designed to show how you handle deeper challenges in areas like:

- **SQL & Search Pro**: full-text search, trigram similarity, and materialized stats views.
- **Relational Modeling**: venues, categories, organizations, and tiered tickets with realistic constraints.
- **Permissions & RLS Mastery**: defining roles and securing data with row-level security.
- **Gated UI Logic, Data Sanitization, Validation**: ensuring secure and trustworthy end-to-end flows.

## How to Play

- **Constraint**: Keep Next.js App Router + Supabase. **No external servers**.
- **Deliverables**: These should be included in the pull request, with notes included in [QUESTS.md](../QUESTS.md) describing which quests you attempted and any feedback around those tasks.

## SQ1 — SQL & Search Pro

**Overview (what you're doing):**
Add true full-text search with ranking and a materialized stats view that can be safely refreshed without blocking reads.

**Why it matters:**
Fast, relevant search = more registrations. Pre-computed stats = snappy dashboards and list pages without punishing the DB.

### SQ1 Tasks

1. **Search Quests**

    1a. *Full-Text Search*
      - Add a `tsvector` generated column on `events` (title, description, tags) and a GIN index.
      - Search endpoint uses `plainto_tsquery` (or `websearch_to_tsquery`) with ranking via `ts_rank` and tie-break by start time.

    1b. *Alternative / Extension: pg_trgm (Trigram Similarity)*
      - Enable the `pg_trgm` extension and add trigram GIN indexes on relevant text columns (`title`, `description`, `tags`).
      - Support fuzzy matching and partial search (i.e. via `similarity()`).
      - Optionally explore combining trigram similarity with FTS scores for hybrid ranking.

1. **Event Stats View Quest**
    - Create a **materialized view** `event_stats` with: `registrations_count`, `seats_remaining`, `last_registration_at`.
    - Refresh policy: `CONCURRENTLY` on write via trigger or scheduled job (e.g. Supabase cron).

> Note: It is expected that you will update `seed` data as needed.

## SQ2 — Relational Modeling Deep Dive

**Overview (what you're doing):**
Model venues, categories, organizations, and tiered tickets with realistic keys and constraints.

**Why it matters:**
Real data is messy. Good modeling prevents double-booking venues, duplicate registrations, and "VIP ticket" bargains for `-$1`.

### SQ2 Tasks

- Tables: `venues` (one-to-many with events), `categories` (many-to-many via `event_categories`), `organizations` (event owner), `tickets` (tiered pricing).  

  > Note: We've listed the core entities, but it's up to you to decide which fields/attributes to include in each table. Show us how you'd model this domain realistically.

- Enforce **FKs with `ON DELETE` rules**, unique constraints (e.g., one registration per user/event), and **check constraints** (start\_time < end\_time, capacity ≥ 0).

## SQ3 — Permissions & RLS Mastery

**Overview (what you're doing):**
Define `admin`, `organizer`, `member` roles and write RLS so public can read published events, while `organizers`/`admins` manage their own resources.

**Why it matters:**
Least privilege keeps personal data private and avoids "one bad query exposes all registrations" headlines.

### SQ3 Tasks

- Add roles: `admin`, `organizer`, `member` for users (open on where you store this concept).
- RLS policies:
  - `events`: anyone can read **published**; only `admin` or event `organizer` can CRUD their own; drafts visible to owner.
  - `registrations`: users can CRUD their own; organizers/admin can read for their events.
  - `tickets`: read for published events; modify by organizer/admin.
- **Row‑level ownership**
- Secure all read paths used by the UI (no "service key in client").

## SQ4 — Gated Display Logic

**Overview (what you're doing):**
Show the right controls to the right people; use optimistic UI so actions feel instant and roll back cleanly on failure.

**Why it matters:**
Users trust software that feels fast and never exposes buttons they can't actually use.

### SQ4 Tasks

- **Progressive disclosure**: organizer tools (Edit, Manage Attendees) only for owners.
  > [Progressive disclosure](https://en.wikipedia.org/wiki/Progressive_disclosure)
  
- **Optimistic UI** with server action confirmation + rollback.
  > [Optimistic UI](https://javascript.plainenglish.io/what-is-optimistic-ui-656b9d6e187c)

## SQ5 — User Data Sanitization & Content Safety

**Overview (what you're doing):**
Sanitize user input/output, lock down Storage buckets per event, and serve signed image URLs with cache headers.

**Why it matters:**
Prevents XSS, e.g.

```js
<script>alert('gotcha')</script> 
```

and keeps private uploads from leaking.

### SQ5 Tasks

- Sanitize fields on **both** input and output.
- Store event images in Supabase Storage with **bucket‑level policies**
  - Note: only organizers can write to their event's path.

- Generate **signed URLs** for images; cache headers set.

## SQ6 — Form Validation

**Overview (what you're doing):**
Define Zod schemas (login, event create/update, registration, profile) and make them the single source of truth across server and client.

**Why it matters:**
One schema to rule them all: fewer drift bugs, consistent error messages, happier PMs.

### SQ6 Tasks

- Define **Zod** schemas for: login, event create/update, registration, profile.
  > Note: some of these are new concepts, consider the interface required to support these.

- Surface errors to the UI (field + form errors)
