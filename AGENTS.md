# Workout Tracker

## What this is

A personal workout tracking PWA. Single user, mobile only, installed to the
home screen. Log sets during a workout, compare against previous sessions.

I am a product designer learning design engineering by building this. I make
the design decisions and review all output. Explain trade-offs rather than
picking silently.

## Stack

Next.js (App Router) · TypeScript · Tailwind v4 · Supabase · Vercel

## Structure

```
app/
  layout.tsx              root layout, fonts, PWA meta
  globals.css             Tailwind import + @theme tokens
  <route>/
    page.tsx
    _components/          used only by this route
components/
  ui/                     domain-agnostic primitives
  <domain>/               promoted, shared across routes
lib/
  supabase/queries.ts     the only place Supabase is queried
  types.ts                shared data shapes
  utils.ts                formatters, helpers
public/icons/             PWA icons incl. maskable
```

New components default to the route's own `_components/`. Never import from
another route's `_components/` — if a second route needs one, tell me and I
will promote it to `components/` rather than you duplicating or cross-importing.
`components/ui/` is for primitives with no knowledge of the domain.

## Constraints

- Mobile only. No desktop layouts, no responsive breakpoints, no interactions
  that depend on hover.
- Client-rendered. Data must be reachable offline, so no server components or
  server actions holding data the UI needs.
- Components never call Supabase directly. All data access goes through
  `lib/supabase/queries.ts`.
- Design tokens are defined in `app/globals.css` under `@theme`. Use only what
  is defined there. No arbitrary values, no raw hex.
- Animate `transform` and `opacity` only. Animating `height`, `width`, `top` or
  `left` will jank on a phone.
- When something falls outside the existing system, do not invent a token,
  component, or pattern. Build with what exists, then list the calls you had to
  make at the end of your response.
- Split files on responsibility, not line count. Logic goes in hooks, formatting
  goes in `lib/utils.ts`.

## Verifying changes

```bash
npm run dev          # dev server
npm run build        # must pass before a task is done
npm run lint         # biome, auto-fixes
npx tsc --noEmit     # type check
```
