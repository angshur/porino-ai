# Current Task

## Task

Deploy Porino v2 to Vercel. Then write the 6th blog post — a new original POV piece.

## Context

V2 build complete as of 2026-05-26. All pages built and verified locally:
- `/blog` — 5 posts (4 on orchestration/context/agents, 1 on marketing agents)
- `/learn` — 2 modules (agent teams, context moat)
- `/work-with-me` — three-tier consulting page ($750 / $3K / $5K/mo)
- Nav updated across the site

## What to do next session

### 1. Deploy

```
cd ~/Documents/Vercel/porino-ai
vercel --prod
```

Confirm the URL matches `porino-ai.vercel.app`.

### 2. Update Cal.com link

The `/work-with-me` page uses `https://cal.com/angshuman` as a placeholder.
Update this once the Cal.com account is set up with the real booking link.

### 3. Write the 6th blog post

An original POV piece — not migrated from Clearpath. Pick from the key POVs in `~/Documents/Vercel/startup-studio/you.md`.

Good candidates based on existing content gaps:
- Why most "AI agents" are just scripts with a chatbot wrapper
- The three mistakes operators make when scoping their first agentic system
- What "production-ready" actually means for an agentic AI system

## Definition of done

- [ ] Site live at porino-ai.vercel.app with all four sections
- [ ] Cal.com link updated with real URL
- [ ] 6th blog post live
