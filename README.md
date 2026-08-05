# Shreya Singh — Portfolio

A dark-glass, neon-accent developer portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion, with a lightweight React Three Fiber hero element.

## Stack

- **Next.js 16** (App Router, `src/` directory)
- **TypeScript**
- **Tailwind CSS v4** (theme driven by CSS variables in `src/app/globals.css`)
- **Framer Motion** for page/section animation and micro-interactions
- **React Three Fiber + drei** for the hero's animated 3D core
- **lucide-react** for icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Editing content

**Everything text-based — name, bio, skills, projects, experience, education, certifications, contact links — lives in one file:**

```
src/data/content.ts
```

Update the exported objects/arrays there and every section re-renders automatically; you never need to touch component/layout code to change copy.

### Adding or updating a project

Add an entry to the `projects` array in `src/data/content.ts`:

```ts
{
  slug: "my-new-project",
  name: "My New Project",
  summary: "One-line summary shown on the card.",
  description: "Longer paragraph shown in the detail modal.",
  impact: ["92% accuracy", "1,000+ users"], // optional stat chips
  tags: ["React", "Postgres"],
  liveHref: "https://example.com",
  githubHref: "https://github.com/you/repo",
}
```

Each project card shows a real screenshot of the live, logged-in app (`public/projects/*.png`) in a browser-chrome frame, with a two-stop `accent` gradient drawn from that product's own brand colors. To update a screenshot, replace the PNG at the path referenced by that project's `image` field in `content.ts`; to change the accent, edit the `accent: [string, string]` tuple.

### Résumé download

The "Résumé" button in the hero links to `public/resume/Shreya-Singh-Resume.pdf`, which is included in this repo. Replace it with an updated PDF at the same path (or update `profile.resumeHref` in `content.ts`) whenever your résumé changes.

### Contact form

The contact form has no backend — submitting it opens the visitor's email client via a `mailto:` link pre-filled with their message (see `src/components/sections/Contact.tsx`). To wire up a real backend instead (e.g. Formspree, Resend, a serverless function), replace the `handleSubmit` function with a `fetch` call to your endpoint.

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, ThemeProvider/Nav/Footer shell
    page.tsx           # assembles all sections in order
    globals.css         # design tokens (colors, fonts) + base styles
  components/
    sections/           # Hero, About, Skills, Projects, Experience, Certifications, Contact
    Nav.tsx, Footer.tsx
    ThemeProvider.tsx    # dark/light context, persisted to localStorage, defaults to dark
    ThemeToggle.tsx
    CustomCursor.tsx     # desktop-only magnetic cursor, disabled on touch + reduced motion
    MagneticButton.tsx   # spring-physics magnetic hover button
    Reveal.tsx           # scroll-triggered reveal animation wrappers
    TextScramble.tsx     # scramble-in text effect used in the hero
    Marquee.tsx           # auto-scrolling skills strip
    HeroScene.tsx         # React Three Fiber background (lazy-loaded, client-only)
  data/
    content.ts           # ← all portfolio copy/data lives here
  lib/
    utils.ts              # `cn()` class-merging helper
```

## Design notes

- **Theme**: dark-mode-first with a violet → cyan → pink gradient accent, glassmorphism panels (`.glass-panel`), and a subtle background grid. Toggle in the nav switches to a light variant using the same CSS variables (`src/app/globals.css`).
- **Motion**: scroll-triggered staggered reveals (`Reveal`/`RevealGroup`), magnetic buttons, animated nav underlines, a scramble-text hero headline, a cursor-following 3D tilt on project cards, and a shared-layout project modal (Framer Motion `layoutId`).
- **Accessibility**: all interactive elements are real `button`/`a` elements, focus-visible via default browser outlines, the project modal traps Escape-to-close and locks body scroll, and every animation respects `prefers-reduced-motion` (the custom cursor and hero 3D scene are skipped entirely, Framer Motion transitions collapse to near-zero duration).
- **Performance**: the R3F hero scene and its dependencies are code-split via `next/dynamic({ ssr: false })` so they never block first paint or load for reduced-motion users; below-the-fold sections stay in normal React (no heavy libraries) and rely on `whileInView` for scroll-in animation rather than a scroll-linked library.

## Known follow-ups

- Double-check the AI Sign Language Translator's live URL before sharing — it's hosted on Render's free tier, which spins down on inactivity (`liveHref` in `content.ts`).
- Project screenshots are static captures; re-capture and replace the PNGs in `public/projects/` periodically as the live apps evolve.
