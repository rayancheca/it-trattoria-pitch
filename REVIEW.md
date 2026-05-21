# REVIEW — Running Decisions Log

> Update this file at every significant decision point.

## Current phase
**Phase 1 — Discovery & Competitive Research** (in progress)

## Phase 0 — Bootstrap (complete)
- 2026-05-20: Project initialized at `/Users/rayankarimcheca/it-trattoria-pitch`
- Git repo created on `main` branch
- Folder skeleton created for all 6 phases
- Meta files (CLAUDE.md, REVIEW.md, PITCH.md, QUESTIONS.md, HANDOFF.md) created
- Decision: keep the project in the user's home directory under a clearly named subfolder rather than `/tmp`, because this is a multi-session, multi-phase build

## Scope reality check (read before continuing)

The brief asks for what would normally be **3–6 weeks of full studio work** compressed into agent execution. To make this tractable in a useful timeframe, the orchestration prioritizes:

1. **Depth where it matters most for the pitch:** Home, Story, one fully built Location page (Miami Beach Collins), one Menu category, one fully built Catering page, Founders/Story page.
2. **Breadth-with-stubs everywhere else:** Every page in the sitemap exists, is reachable, and has a credible designed shell — but only the "hero pages" go to full editorial polish.
3. **Single locale (en) ships first.** Italian and Spanish skeletons + a working locale switcher, but full translation is left as a Phase-5/post-pitch task documented in QUESTIONS.md.
4. **Mockup-grade, not production-grade integrations.** Forms log to `/api/*` stub routes and return success. Real Toast/Resy integration is documented in HANDOFF.md as the "what we'd do next" story for the pitch.

This is consistent with the brief's intent: it's a pitch mockup, not a production cutover. The pitch deck will tell the rest of the story.

## Phase 1 — Discovery & Competitive Research

Subagents dispatched (see TodoWrite for status):
- R1: Client site forensics → `/research/01-current-site-audit.md`
- R2: Brand asset extraction → `/research/02-brand-extraction.md`
- R3: Direct competitors (Italian counter-service) → `/research/03-competitors/`
- R4: Aspirational competitors (upscale Italian) → `/research/04-aspirational/`
- R5: Award-winning food sites → `/research/05-awards-inspiration.md`
- R6: SEO + local search baseline → `/research/06-seo-baseline.md`

Synthesis to land in `/research/00-synthesis.md` after subagents complete.
