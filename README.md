# Ming Wireless — Phone Repair Toronto

Production-ready, lead-generation-first website for Ming Wireless, a phone repair shop in downtown Toronto (250 Dundas St W).

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui**
- **GSAP** + ScrollTrigger (scroll-driven sprite animation)
- **Framer Motion** (page/component transitions)
- **Lenis** (smooth scroll)
- **Howler.js** (sound design)
- **CountUp.js** (animated counters)
- **React Hook Form** + **Zod** (form validation)
- **Resend** (transactional email)
- **next-sitemap** (SEO sitemap)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your Resend API key in .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key for email delivery |
| `EMAIL_FROM` | Sender email address |
| `OWNER_EMAIL` | Where form submissions are sent |
| `SITE_URL` | Production site URL (for sitemap) |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero animation, trust bar, services, reviews |
| `/services` | Detailed service listings with inline quote flow |
| `/quote` | Instant quote via "Fix in 3 Taps" + detailed form |
| `/book` | Booking page with date/time picker |
| `/about` | Company story, values, B2B credentials |
| `/contact` | Contact form + map + business info |
| `/iphone-repair-toronto` | SEO landing page |
| `/samsung-repair-toronto` | SEO landing page |
| `/macbook-repair-toronto` | SEO landing page |
| `/phone-repair-downtown-toronto` | SEO landing page |

## Key Features

- **Fix in 3 Taps** — 3-step mobile-first conversion flow (device > damage > instant price)
- **Scroll-driven sprite animation** — Hero phone repairs as user scrolls (GSAP + Canvas)
- **Custom cursor** — Magnetic snap to CTAs on desktop
- **3D tilt cards** — CSS perspective + JS mouse tracking on service cards
- **Auto-scrolling reviews** — CSS animation carousel with hover pause
- **Live counters** — CountUp.js animated stats on scroll-into-view
- **Exit-intent popup** — Captures leaving visitors (once per session)
- **Sound design** — Glass crack ambient on load (Howler.js, off by default)
- **LocalBusiness schema** — JSON-LD structured data
- **Full SEO** — Meta tags, sitemap, geo-modified keywords

## Deploy to Vercel

```bash
npm run build
```

Or push to GitHub and connect to [Vercel](https://vercel.com).

### Sound File

Place a glass crack sound effect at `public/sounds/glass-crack.mp3` (max 80KB). Sound is off by default and plays once per session when unmuted.

## Build Output

All pages are statically generated except API routes. Target: Lighthouse 90+ mobile, 95+ desktop.
