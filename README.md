# Warrgyizmorsch Frontend

Next.js frontend for Warrgyizmorsch — high-performance digital solutions & software development agency website with interactive 3D WebGL scenes, animations, and modern responsive design.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture & Features

- **Typography**: Unified sitewide `Inter` font configured via `next/font/google`.
- **Brand Theme Tokens**: Consolidated blue palette in `app/globals.css`:
  ```css
  --color-brand-navy: #0f4ea1;
  --color-brand-navy-2: #0b63d6;
  --color-brand-accent: #006fc9;
  --color-brand-accent-dark: #055a9f;
  --color-brand-accent-light: #eaf3fe;
  ```
- **Interactive 3D WebGL Scenes**:
  - **Hero Scene**: WebGL interactive network background (`HeroBackground.tsx`).
  - **Sectors Stage**: 3D interactive sector visualization (`SectorsSection.tsx`, `SectorCanvas.tsx`).
  - **Services Stage**: 3D device rigs with live 2D canvas screen simulations (`ServicesTabs.tsx`, `ServiceScene.tsx`, `painters.ts`).
- **Dynamic Animations**:
  - Staggered scroll-reveal animations across all cards, steps, and forms (`Reveal.tsx`).
  - Infinite auto-scrolling client logo showcase (`LogoSlider.tsx`).
- **Pages**:
  - Homepage (`/`)
  - Services / Solutions (`/services`)
  - Case Studies listing (`/case-studies`) and dynamic detail pages (`/case-studies/[slug]`)
  - Our Journey (`/our-journey`)
  - About Us (`/about-us`)
  - Blog (`/blog`)
  - Career (`/career`)
  - Contact Us (`/contact-us`)
  - Privacy Policy & Terms (`/privacy-policy`, `/terms-conditions`)

## File Structure

```
app/
├── layout.tsx                     → Root layout & Inter font injection
├── page.tsx                       → Main homepage
├── globals.css                    → Tailwind theme tokens & animation system
├── lib/
│   └── case-studies.ts            → Case studies data & metadata
├── components/
│   ├── Header.tsx                 → Sticky mega-navigation with responsive mobile menu
│   ├── Footer.tsx                 → Global footer with navigation links
│   ├── HeroBackground.tsx         → 3D WebGL background scene for hero section
│   ├── LogoSlider.tsx             → Continuous marquee client logo slider
│   ├── SectorsSection.tsx         → Interactive sector explorer
│   ├── ServicesTabs.tsx           → Interactive 3D services showcase
│   ├── OurWork.tsx                → Portfolio & Case studies showcase
│   ├── Testimonials.tsx           → Client testimonials grid
│   ├── ProcessStep.tsx            → Interactive 6-step project lifecycle card
│   ├── FaqItem.tsx                → Smooth animated FAQ accordion
│   ├── HomePageContactUs.tsx      → Dual-card project starter & enquiry form
│   ├── IdeaSection.tsx            → CTA banner component
│   ├── Reveal.tsx                 → Scroll-in-view intersection observer wrapper
│   ├── hero/
│   │   ├── HeroCanvas.tsx         → Three.js particle canvas
│   │   └── CyberReactorCanvas.tsx → 3D Cyber reactor canvas
│   ├── sectors/
│   │   └── SectorCanvas.tsx       → Three.js 3D sector models
│   └── services/
│       ├── SceneCanvas.tsx        → Lazy client R3F canvas wrapper
│       ├── ServiceScene.tsx       → 3D device models (Laptop, Phones, Server, etc.)
│       └── painters.ts            → 2D canvas texture simulations (Web, App, Game, AI, etc.)
├── about-us/page.tsx
├── our-journey/page.tsx
├── services/page.tsx
├── case-studies/page.tsx
├── case-studies/[slug]/page.tsx
├── career/page.tsx
├── blog/page.tsx
├── contact-us/page.tsx
├── privacy-policy/page.tsx
└── terms-conditions/page.tsx
public/
└── images/                        → Logos, case studies, sector visuals, and team media
```
