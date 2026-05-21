# Claude Code Working Notes — IT Trattoria Pitch Build

This file holds the persistent context for any Claude Code session working on this repo. **Read this first** when you resume.

## What this is

A **pitch-quality mockup website rebuild** for IT — Italian Trattoria, a French-Italian fast-casual restaurant group expanding into the US (Miami Beach + NYC, 4 locations).

The full brief lives in the opening message that bootstrapped this session and should be considered the source of truth. Key points distilled:

- **Client:** IT — Italian Trattoria (Renato & Gio Iera, Calabrian brothers; HQ Paris; ~20 stores; new in US)
- **Goal:** Build a deployed mockup that wins the engagement to rebuild their web presence
- **Audience for the pitch:** the founders + US leadership
- **Quality bar:** Awwwards-tier, not "generic landing page"

## Project structure

```
/
├── CLAUDE.md                 # This file — working notes
├── REVIEW.md                 # Running decisions log
├── PITCH.md                  # The pitch deck deliverable
├── QUESTIONS.md              # Open questions for Rayan
├── HANDOFF.md                # How to edit / deploy
├── README.md                 # Quick-start
│
├── research/                 # Phase 1 outputs
│   ├── 00-synthesis.md
│   ├── 01-current-site-audit.md
│   ├── 02-brand-extraction.md
│   ├── 03-competitors/
│   ├── 04-aspirational/
│   ├── 05-awards-inspiration.md
│   ├── 06-seo-baseline.md
│   └── brand/photos-current/
│
├── strategy/                 # Phase 2 outputs
│   ├── 01-sitemap.md
│   ├── 02-content-model.ts
│   ├── 03-conversion-map.md
│   └── 04-seo.md
│
├── design/                   # Phase 3 outputs
│   ├── 01-direction.md
│   ├── 02-tokens.ts
│   ├── 03-components.md
│   └── 04-photography.md
│
├── data/                     # Static content (mockup; would be CMS in prod)
│
├── src/                      # Next.js 15 App Router source
│   ├── app/[locale]/...
│   ├── components/
│   ├── components/sections/
│   ├── lib/
│   └── data/
│
├── messages/                 # next-intl translations (en, it, es)
├── public/                   # Static assets
│
├── pitch/                    # Pitch deliverables
│   └── screenshots/
│
└── reports/                  # Lighthouse + QA reports
    └── lighthouse/
```

## Hard constraints (from brief)

**Stack** (do not deviate):
- Next.js 15 App Router, TypeScript strict, Tailwind v4
- shadcn/ui (heavily customized), Framer Motion, Lucide
- next-intl (en, it, es), React Hook Form + Zod
- Mapbox GL (fallback Leaflet), next/image, next/font

**Quality**:
- Lighthouse mobile ≥ 95 on every primary page
- WCAG 2.2 AA, keyboard nav, screen-reader tested
- No lorem ipsum. No generic AI gradients. No tricolore stripes.
- Server Components by default. Progressive enhancement.

**Forbidden**:
- Lorem ipsum anywhere
- Fabricated press quotes attributed to real publications
- Italian flag tricolore as primary palette
- Real API integrations (Toast, Resy, Stripe) — stub everything
- Hijacking the real `it-trattoria.com` domain
- Rayan's personal info on the live mockup

## Operational rules

- **Commit at every phase boundary** with `feat(phase-N): <summary>`
- **Spawn parallel Task subagents** wherever work is parallelizable
- **Update REVIEW.md** as decisions are made
- **Write to QUESTIONS.md** for blockers — never stop and wait
- **Use TodoWrite** to track progress

## Current phase

See REVIEW.md for the latest state. Update the "Current phase" pointer there when transitioning.
