# Porino — Spec
*Decided: 2026-05-23*

---

## What we are building

Porino is the training and consulting home for Angshuman Rudra's AI infrastructure work. A standalone brand (not under a personal site) serving three audience tiers through a unified Astro site: a practitioner patterns library, an operator-level blog + learn section, and a consulting conversion page.

The positioning is already locked: "the infrastructure layer is what makes agents reliable." People who build, not people who demo.

## Who it's for

| Tier | Who | Pain |
|---|---|---|
| Practitioner | Engineers, data teams, technical PMs | Need battle-tested patterns for production agentic systems |
| Operator | Business leaders, marketing/RevOps teams | Need to understand multi-agent design without being engineers |
| Executive | CTOs, VPs, decision-makers | Need strategic POV on when to build, what to buy, what the infra layer is |

## Must-haves (v2 — expanding from current state)

- [ ] `/blog` section live with the 5 migrated Clearpath AI posts
- [ ] `/learn` section with at least 2 Maven course modules as standalone pages
- [ ] `/work-with-me` page replacing or expanding the current `/consulting` page — clear offering tiers, price points, booking link
- [ ] `/patterns` remains as-is (22 patterns already written and live)
- [ ] Navigation updated to reflect all four sections

## Out of scope

- Do not rebuild the design — current Astro + Tailwind site is fine
- Do not add auth, user accounts, or gating in v2
- Do not migrate the 12 Clearpath MarTech posts — those stay on Clearpath
- Do not add a course platform or video hosting — text-first for now
- Do not touch angshumanrudra.com as part of this build

## Definition of done

Site live at porino-ai.vercel.app with all four sections navigable. At least 5 blog posts live. At least 2 learn modules live. `/work-with-me` page with a real booking link (Cal.com or Calendly).

---

## Infrastructure decisions

### Framework
Astro 4 + Tailwind 4 — already in place, keep it

### Content
Markdown files in `src/content/` — consistent with how patterns are already managed

### Hosting
Vercel — already deployed

### Auth
Not needed for v2

### New sections needed
- `src/content/blog/` — for migrated + new posts
- `src/content/learn/` — for course modules
- `src/pages/blog/` — index + [slug] routing
- `src/pages/learn/` — index + [slug] routing
- `src/pages/work-with-me.astro` — replaces or extends consulting.astro

---

## Parallelism map

**Dependencies:** Nav update depends on all new sections being scaffolded first.

**Can run in parallel:**
- Blog section (content migration + routing)
- Learn section (course content + routing)
- Work-with-me page

**Order:**
1. Scaffold content directories + routing for blog and learn
2. [parallel] Migrate 5 blog posts | Write 2 learn modules | Write work-with-me page
3. Update nav to include all four sections
4. Deploy

---

## Posts to migrate from Clearpath

Copy these files into `src/content/blog/` — update frontmatter author/date, keep content as-is:

- `ai-orchestration-layer-defines-everything.md`
- `ai-orchestration-layer-determinism.md`
- `context-for-agentic-ai.md`
- `how-to-organize-context-for-agentic-ai.md`
- `ai-agents-for-marketing-teams.md`

---

## Learn modules (v1 — from Maven courses)

Two modules from `~/Documents/Vercel/ai-courses/`:

1. **How to Build Agent Teams** — from `course-agent-teams.md`
   - Three roles, three communication patterns, five business examples
   - Audience: operator

2. **Context Is the Moat** — from `course-context-moat.md`
   - Four dimensions of context quality, context moat audit
   - Audience: operator → executive

---

## Consulting tiers (work-with-me)

| Offering | Description | Price |
|---|---|---|
| Architecture Clarity Session | 90-min review of your agentic system decisions. Written summary within 24h. | $750 |
| Agentic Strategy Workshop | Half-day session: orchestration layer, context design, build vs. buy. Deliverable: decision doc. | $3,000 |
| Embedded Advisor | Ongoing monthly retainer. Weekly async + one live session. | $5,000/mo |

Booking: Cal.com link (to be added).
