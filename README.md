# Warrgyizmorsch Frontend

Rebuilt Next.js frontend, structured similarly to thoughtbot.com, using
Warrgyizmorsch's own content — now in an all-blue palette with animations
throughout.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## What's in this version

- **Home added to the nav bar** (`app/components/Header.tsx`), alongside
  Services, Case Studies, Blog, About Us, Our Journey, Career.
- **Orange accent removed — replaced with shades of blue.** The whole
  accent system now lives in `app/globals.css`:
  ```css
  --color-brand-navy: #0b1f3a;          /* darkest — backgrounds, headings */
  --color-brand-navy-2: #13345f;        /* secondary navy — gradients */
  --color-brand-accent: #2f86eb;        /* vivid azure — CTAs, highlights */
  --color-brand-accent-dark: #1f6fcb;   /* accent hover state */
  --color-brand-accent-light: #eaf3fe;  /* pale blue — tinted badges/backgrounds */
  ```
  Change these five lines and the entire site re-colors — every component
  uses `bg-brand-accent`, `text-brand-navy`, etc. instead of hardcoded hex.
- **Background image behind the hero heading**: `public/images/hero-bg.svg`,
  redrawn in blue tones only (a network/circuit motif) with two soft glow
  shapes that drift slowly behind the text (`animate-drift`,
  `animate-pulse-glow` in `globals.css`).
- **Animations sitewide**:
  - Hero text fades/slides in on load, staggered line by line
    (`animate-fade-in-up`, `.delay-1/2/3`).
  - Every other section fades up into view as you scroll, via a small
    reusable `<Reveal>` client component (`app/components/Reveal.tsx`)
    using `IntersectionObserver` — no extra library needed.
  - Cards lift and gain a soft blue-tinted shadow on hover; buttons lift
    slightly and get a glow on hover; nav links get an animated underline;
    the FAQ accordion now animates open/closed with a smooth height
    transition instead of snapping.

## Structure

```
app/
  layout.tsx              → global shell (Header + Footer wrap every page)
  page.tsx                → homepage
  globals.css              → Tailwind import + brand color variables + animation keyframes
  lib/case-studies.ts      → shared case study data
  components/
    Header.tsx              → nav incl. Home, animated underline links
    Footer.tsx
    ServiceCard.tsx
    CaseStudyCard.tsx        → links to /case-studies/[slug]
    ProcessStep.tsx
    FaqItem.tsx               → animated accordion
    IdeaSection.tsx
    Reveal.tsx                → scroll-in-view fade/slide wrapper (client component)
  about-us/page.tsx
  our-journey/page.tsx
  services/page.tsx
  case-studies/page.tsx
  case-studies/[slug]/page.tsx
  career/page.tsx
  blog/page.tsx
  contact-us/page.tsx
  privacy-policy/page.tsx
  terms-conditions/page.tsx
public/
  images/                  → hero background (blue) + team placeholder avatars (SVG)
```

## Next steps

- Replace placeholder images in `public/images/` with real photos —
  swapping `hero-bg.svg` for a real photo works too; just update the
  `src` in `app/page.tsx`'s hero `<Image>` if you rename the file.
- Wire the contact form in `app/contact-us/page.tsx` to your backend API.
- Fill in real content for Blog, Career, Privacy Policy, and Terms pages.
- Tell me what to remove/change next.
