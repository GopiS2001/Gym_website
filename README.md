# Real Warriors — Gym Website

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · React Three Fiber · GSAP · React Hook Form + Zod.
Implementation follows `gym_3d_nextjs_implementation_plan.md`.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## Photos

Original high-res photos live in `Photos/` (git-ignored). `npm run images` converts them into
web-sized WebP files in `public/images/` (~98 MB → ~6.5 MB). To add a photo, put it in `Photos/`,
add it to the map in `scripts/optimize-images.mjs`, re-run the script, and register it in `src/data/photos.ts`.

## Where to edit content

All gym content lives in `src/data/`; UI components never need editing for content changes.

| File | Content |
| --- | --- |
| `site.ts` | Name, phone, WhatsApp, email, address, hours, socials, stats |
| `programs.ts` | Training programs |
| `trainers.ts` | Coach profiles |
| `memberships.ts` | Plans, prices, terms |
| `testimonials.ts` | Member reviews |
| `gallery.ts` | Gallery images and categories |

> **Before launch:** everything marked `PLACEHOLDER` / `TODO(client)` (contact details, prices,
> trainer names, testimonials, stats) must be replaced with real, client-approved content.

## Key pieces

- **3D hero** — `src/components/three/`. A procedural barbell (no external model or licensing needed).
  `HeroVisual` loads it client-only, detects WebGL, pauses rendering off-screen, respects
  `prefers-reduced-motion`, and falls back to a static image on failure. To use a licensed GLB instead,
  put it in `public/models/` and load it with Drei's `useGLTF` inside `GymModel`.
- **Scroll motion** — add `data-reveal` (fade-up) or `data-reveal-image` (clip reveal) to any element
  in a Server Component; `ScrollReveals` in the root layout handles it. Disabled with reduced motion.
- **Enquiry form** — `src/components/forms/EnquiryForm.tsx` → `POST /api/enquiry`. The Zod schema in
  `src/schemas/enquiry.ts` validates on both client and server. Includes a honeypot and a per-IP rate limit
  (in-memory; use a shared store or WAF rule in production). Set `ENQUIRY_WEBHOOK_URL` to forward leads
  to a form service, Zapier/Make, or CRM; without it, enquiries are only logged on the server.
- **SEO** — per-page metadata, `sitemap.xml`, `robots.txt`. Set `NEXT_PUBLIC_SITE_URL` for correct canonical URLs.
