# MkSaaS Core

A clean Next.js 16 SaaS skeleton extracted from a working production app.
Auth, payments, i18n, email, storage, blog, docs, dashboard and admin are wired
and building — the business domain has been stripped out so you can drop your
own product in.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Auth | Better Auth (email/password + Google + GitHub) |
| Payments | Stripe (subscriptions + one-time lifetime) |
| Database | Postgres + Drizzle ORM |
| i18n | next-intl (`en`, `zh`) |
| Email | Resend + React Email |
| Storage | S3-compatible (AWS S3 / R2 / MinIO) |
| Content | Content Collections + Fumadocs (MDX blog & docs) |
| UI | Tailwind CSS v4 + shadcn/ui + Radix + Magic UI |
| Lint | Biome |

## Quick start

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm db:push                 # push schema to your database
pnpm dev                     # http://localhost:3000
```

Minimum env to boot: `NEXT_PUBLIC_BASE_URL`, `DATABASE_URL`,
`BETTER_AUTH_SECRET` (`openssl rand -base64 32`). Everything else degrades
gracefully until you need it.

## What's included

**Auth** — login, register, forgot/reset password, email verification, session
management, admin user list with ban/impersonate. Routes under
`src/app/[locale]/auth/`, config in `src/lib/auth.ts`.

**Payments** — Stripe checkout, customer portal, webhook handler at
`/api/webhooks/stripe`, three-tier pricing (free / pro monthly+yearly /
lifetime). Plans in `src/config/price-config.tsx`, provider in
`src/payment/provider/stripe.ts`.

**Dashboard** — protected shell with sidebar, breadcrumbs, placeholder stat
cards and a demo chart. Settings pages for profile, billing, security and
notifications.

**Marketing** — home page assembled from swappable blocks, pricing, about,
contact, changelog, waitlist, legal pages (terms / privacy / cookie), plus a
`/blocks` and `/preview` gallery of ~90 prebuilt section variants.

**Content** — MDX blog with categories, authors and pagination; Fumadocs-powered
docs with search. Sample posts live in `content/` — replace them.

## Layout

```
src/
├── app/[locale]/
│   ├── (marketing)/     public pages — home, pricing, blog, legal, about
│   ├── (protected)/     dashboard, settings, admin
│   ├── auth/            login, register, password reset
│   ├── docs/            Fumadocs routes
│   └── preview/         block gallery
├── app/api/             auth, stripe webhook, storage
├── components/
│   ├── blocks/          landing page sections (hero, features, pricing, faqs…)
│   ├── ui/              shadcn primitives
│   ├── magicui/         animated components
│   └── tailark/         extra marketing components
├── config/              website, navbar, sidebar, footer, pricing config
├── db/schema.ts         Drizzle schema — 5 core tables
├── payment/             Stripe abstraction
├── mail/                Resend + React Email templates
├── storage/             S3 abstraction
├── i18n/                next-intl routing & request config
└── routes.ts            route enum + protected route list
```

## Making it yours

1. **Brand** — `src/config/website.tsx` (logo, social, feature flags),
   `messages/{en,zh}.json` under `Metadata`, and `public/logo*.png` + `og.png`.
2. **Nav** — `src/config/navbar-config.tsx` and `sidebar-config.tsx`.
   Add route constants to `src/routes.ts`; gate them via `protectedRoutes`.
3. **Pricing** — `src/config/price-config.tsx`, then set the
   `NEXT_PUBLIC_STRIPE_PRICE_*` env vars to your Stripe price IDs.
4. **Schema** — add tables to `src/db/schema.ts`, then `pnpm db:generate &&
   pnpm db:migrate`.
5. **Copy** — all UI text is in `messages/en.json` and `messages/zh.json`; the
   two files must keep identical key structure. Drop a locale by editing
   `websiteConfig.i18n.locales` and `src/i18n/routing.ts`.
6. **Home page** — `src/app/[locale]/(marketing)/(home)/page.tsx` just composes
   blocks. Reorder, remove, or browse `/preview` for alternates.

## Scripts

```bash
pnpm dev          # dev server + content watcher
pnpm build        # content build + next build
pnpm lint         # biome check --write
pnpm db:push      # sync schema without a migration (dev)
pnpm db:generate  # generate a migration from schema changes
pnpm db:migrate   # apply migrations
pnpm db:studio    # Drizzle Studio
pnpm email        # React Email preview on :3333
```

## Database

Five tables, all auth/billing infrastructure:

- `user` — profile, role, ban state, Stripe `customerId`
- `session` — sessions with impersonation support
- `account` — OAuth links and password hashes
- `verification` — email verification and reset tokens
- `payment` — subscriptions and one-time purchases

Baseline migration: `drizzle/0000_complete_puppet_master.sql`.

## Notes

- `/api/storage/upload` accepts authenticated uploads. Review its size and
  MIME-type limits before exposing it publicly.
- Cron routes were removed with the domain logic. If you add any under
  `/api/cron/*`, guard them with `CRON_SECRET` and register the schedule in
  `vercel.json`.
- Feature flags in `src/config/website.tsx` toggle the Discord widget, affiliate
  scripts, upgrade card and analytics providers — all off or neutral by default.
