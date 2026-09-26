# AGENTS.md

## Project overview

This is the **Proppo marketing website (v2)** — the public site for Proppo, an all-in-one
property management SaaS for the hospitality industry in India (hotels & resorts, vacation
rentals & villas, homestays & BnBs). Production domain: `https://proppo.in`.

It is a pure front-end site: all pages are statically prerendered marketing/content pages.
The only backend interaction is form submission (demo / get-started / book-a-call), which
posts directly from the browser to Proppo's notification API (`https://api.proppo.in`).

- Repository: `github.com/SwippyInc/website-proppo`
- Package name: `proppo-website`

## Tech stack

- **Next.js 16.0.10** (App Router) with **React 19.2.3** — plain **JavaScript/JSX, no TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/postcss` — CSS-first configuration in `app/globals.css`
  (there is **no `tailwind.config` file**; theme tokens are declared with `@theme inline`)
- **shadcn/ui** set up for JSX (`components.json`, style "new-york"); currently only
  `components/ui/dropdown-menu.jsx` is generated. Add more with the shadcn CLI.
- Animation: `framer-motion` (primary, `whileInView` scroll reveals), `gsap`, `lenis`
  (smooth scrolling), `swiper`
- Icons: `lucide-react`
- Fonts: `Inter` (body) + `Fraunces` (display) via `next/font/google` in `app/layout.js`
- Analytics: Google Tag Manager (`GTM-M2QT2W4N`) via `ClientGoogleAnalytics`, Microsoft
  Clarity via `ClarityInit`
- Other: `axios` (form posts), `moment` (date formatting), `react-phone-number-input`,
  `next-themes` (installed but **the ThemeProvider is commented out** in `app/layout.js`;
  the homepage forces `setTheme('light')` — the site is light-only in practice)

## Commands

```bash
npm run dev     # dev server with Turbopack (next dev --turbopack)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # next lint
```

There are **no tests and no test framework** in this project. Verification after a change is
`npm run lint` and `npm run build` (build must prerender all static pages, including the
`[ota]` dynamic route).

## Project structure

```
app/
  layout.js            Root layout: fonts, GTM analytics, metadata (ThemeProvider commented out)
  page.js              Homepage — composes section components from components/Sections.jsx
  globals.css          Tailwind v4 entry: design tokens (@theme inline) + legacy utility classes
  functions.js         Helpers: isValidEmail, isValidIndianMobile, timeToDateTime, legacy cn()
  sitemap.js           Generates /sitemap.xml
  _backend_service/
    Service.js         DataService (axios singleton) — posts form leads to api.proppo.in;
                       the underscore prefix keeps it out of routing
  styles/              One-off CSS (ScrollStack.css)
  (pages)/             Route group with all marketing pages:
    landing, pricing, all-in-one, proppo-saas, thanks
    product/ + 6 category pages (property-management, inventory-distribution,
      revenue-booking, guest-experience, operations, business-admin)
    product/inventory-distribution/channel-manager/[ota]/   dynamic route, one static
      page per OTA via generateStaticParams() from the OTAS list in constants.js
      (dynamicParams = false — unknown slugs 404)
    solutions/{hotels-resorts, vacation-rentals-villas, homestays-bnbs}
    resources/ + case-studies
    privacy-policy, termsandconditions, refundandcancellation, data-deletion
    d1, d2, d3         Legacy redirect pages (client-side router.replace('/'))
components/            Shared components: NavBar, Footer, Hero, Sections.jsx (homepage
                       sections), SolutionPage.jsx (shared template for solutions pages),
                       Forms.jsx (lead-capture forms + ResponsiveDialog modal),
                       PricingCalculator.jsx, ProductScenes.jsx / SolutionScenes.jsx
                       (large animated scenes), plus many small building blocks
components/ui/         shadcn/ui components
hooks/useForm.jsx      Modal-form hooks: useSignUpForm, useDemoForm, useBookCallForm —
                       each returns { render...Form, formComponent }
lib/utils.js           shadcn cn() (clsx + tailwind-merge)
providers/ThemeProvider.jsx   next-themes wrapper (currently unused)
constants.js           Single source of truth for site IA: IMAGES (imported static
                       assets), PRODUCT_CATEGORIES, SOLUTIONS, RESOURCES, OTAS —
                       shared by the NavBar mega-menu, overview pages, and the [ota] route
public/                icons/, images/, robots.txt, llms.txt
```

Path alias: `@/*` maps to the project root (`jsconfig.json`), e.g. `@/components/NavBar`.

## Conventions

- **Language**: JavaScript JSX only. Function components; interactive pages/components start
  with `'use client'` (most marketing pages are client components).
- **Page composition**: pages are thin — they compose shared components and pass copy as
  props. Segment pages use `SolutionPage` as a template; homepage sections live in
  `Sections.jsx`. Follow that pattern for new pages.
- **Spec references**: comments cite `proppo-site-spec.md` sections (e.g.
  `// proppo-site-spec.md Section 11.1`). That spec is not in the repo; keep these comment
  references when editing and add them for new spec-driven pages.
- **Design tokens**: v2 brand tokens live in `app/globals.css` (`--brand-primary: #6840ff`,
  `--ink`, `--surface-bg`, `--line`, …) and are exposed to Tailwind via `@theme inline`, so
  use classes like `text-brand-primary`, `bg-surface-bg`, `text-ink-muted`,
  `font-display`. Common container class: `w_80_90` (90% width, 85% on lg, centered).
  Italic accent headlines use `<span className="italic text-brand-primary">`.
- **Legacy vs v2 styles**: older pages use legacy tokens/classes (`--blue`, `.btn_pri`,
  `.btn_sec`, `.input_box`). New v2 work should use the v2 tokens and the
  `.btn_v2_pri` / `.btn_v2_sec` / `.btn_v2_accent` button classes.
- **Adding an OTA page**: add an entry to `OTAS` in `constants.js`; the slug becomes the
  route segment and static params are generated automatically.
- **Forms & leads**: forms validate client-side (`isValidEmail`, `isValidIndianMobile` —
  Indian 10-digit mobile starting 6–9) and submit via `Data.send_mail()` from
  `app/_backend_service/Service.js`, then redirect to `/thanks`. Open them through the
  hooks in `hooks/useForm.jsx`.
- **Metadata**: only the root layout uses the Next.js `metadata` API. Several legal pages
  still set `document.title` inside `useEffect` (client-only, invisible to crawlers) —
  converting those to `export const metadata` is a known improvement, noted in
  `AI_CRAWLABILITY.md`.

## SEO / AI crawlability

The site is deliberately open to AI crawlers: `public/robots.txt` explicitly allows GPTBot,
ClaudeBot, PerplexityBot, CCBot, Googlebot-Extended, etc.; `app/sitemap.js` emits
`/sitemap.xml`; `public/llms.txt` summarizes the product for LLMs. `AI_CRAWLABILITY.md`
documents this setup and its trade-offs — keep `llms.txt` and the sitemap in sync when
pages, pricing, or positioning change.

## Security considerations

- `app/_backend_service/Service.js` contains a placeholder webhook key
  (`'CHANGE_THIS_TO_SECURE_KEY'`) sent as the `x-webhook-key` header from the browser.
  Because this is a client-side bundle, any real key here is public — treat it as a
  lightweight shared secret, not a true credential, and never commit actual secrets.
- No environment variables are used; the API base URL is hardcoded.
- Form inputs are validated client-side only; the backend API must re-validate.
- `headers.txt` and `invoices.zip` in the repo root are unrelated artifacts (API response
  captures), not part of the website — do not wire them into the app.

## Deployment

Standard Next.js deployment on **Vercel** (`.vercel` is gitignored; no custom config in
`next.config.mjs`). Changes land via GitHub pull requests into `main`.
