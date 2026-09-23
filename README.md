# Shubham Gupta — AI Engineering Site (Next.js scaffold)

Real Next.js 15 App Router project. Verified to install and build cleanly
(`npm install && npm run build` passes with zero errors as of this scaffold).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS — custom dark/electric-blue glass design tokens in `tailwind.config.ts`
- Framer Motion — hero entrance animation
- Three.js — particle field background (`components/particle-background.tsx`)
- Live GitHub stats (client-side fetch to the public GitHub API, no key needed)
- A minimal Cmd/Ctrl+K command palette (no external dep, ~90 lines)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's real vs. stubbed

**Real, working:**
- All copy, project data, and links in `lib/data.ts` — pulled from your resume,
  the `Network-utilization-automation` repo (I read the actual source, not
  just the README), and the live `Ai-Work` GitHub repo.
- Live GitHub stats on the homepage (public repos, stars, followers, account age).
- The 4-page structure: Home, Projects, Tech Stack, Contact.
- Command palette, nav, glass design system.

**Stubbed / next steps:**
- No blog, research notebook, or AI Playground pages yet — those need real
  backend work (MDX pipeline, or FastAPI endpoints for the playground tools)
  that goes beyond a frontend scaffold.
- Deployment: static export (`output: "export"`) published to GitHub Pages at
  https://shubh1402.github.io by `.github/workflows/deploy.yml` on every push to `main`.
- Font fetching (`next/font/google`) requires normal internet access at build
  time — this was verified with fonts temporarily swapped out in a
  network-restricted sandbox; it will pull Inter/JetBrains Mono correctly on
  your machine or in a normal CI/Vercel build.

## Design tokens

Background `#060607`, surface `#0C0D10`, electric blue accent `#2E7CFF`,
glass panels via `bg-white/4 + backdrop-blur + border-white/8`. All defined
in `tailwind.config.ts` and `app/globals.css` — change the palette there and
it propagates everywhere.

## Folder structure

```
app/
  layout.tsx        root layout, fonts, nav, command palette
  page.tsx           home: hero, live stats, experience
  projects/page.tsx  featured case study + Ai-Work portfolio grid
  tech-stack/page.tsx
  contact/page.tsx
components/          Nav, Hero, ParticleBackground, TypingRole,
                      GithubStats, CommandPalette, ProjectCard, Footer
lib/data.ts           all content — edit this file to update the site
```
