# Shiroorkar

Website for Udaykumar Shiroorkar: his story, environmental work, Reels and media, and inquiry
pathways for speaking, workshops, projects and partnerships.

Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4. Every page is static
except the inquiry API.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; the form works in "not live" mode without it
npm run dev                  # http://localhost:3000
```

Checks before deploying:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Editing content

All copy and facts live in `content/`. Pages read from these files, so most updates never touch
a component.

| File | What it holds |
|---|---|
| `content/site.ts` | Email, WhatsApp number, social links, navigation |
| `content/bio.ts` | Introduction, roles, About page chapters, quote, portrait slots |
| `content/timeline.ts` | Timeline entries |
| `content/impact.ts` | Impact figures |
| `content/initiatives.ts` | Focus areas and environmental projects |
| `content/media.ts` | Reels, videos, press and photos |
| `content/offerings.ts` | Speaking and workshop programmes |
| `content/inquiryTypes.ts` | Options in the inquiry form |
| `content/sources.ts` | Press sources cited across the site |

### Fact status

Every fact has a `status`:

- `confirmed`: the family has confirmed it.
- `sourced`: reported publicly. Add a `source` link; the site shows it as a citation.
- `pending`: a placeholder or unconfirmed fact. It shows with a "TO VERIFY" badge in development
  and is **hidden in production**.

Change `pending` to `confirmed` only after checking the fact. Do not add awards, figures,
clients or testimonials that cannot be backed up.

### Photos

Put files in `public/images/` and set `src` on the matching image, for example in
`content/bio.ts`:

```ts
hero: { src: "/images/portrait-hero.jpg", alt: "Udaykumar Shiroorkar", brief: "..." },
```

An image with `src: null` renders as a quiet placeholder. Use real photos of his work only.

### Adding a Reel

1. On Instagram, open the Reel and copy its link.
2. Save a cover frame (9:16) to `public/images/reels/`.
3. Edit a `reel` entry in `content/media.ts`: set `title`, `url`, `thumb.src`,
   `status: "confirmed"`, and `featured: true` to show it on the homepage.

Reels open on Instagram. Nothing autoplays on this site.

### WhatsApp

Set `whatsapp` in `content/site.ts` to the number in international format, digits only. Every
WhatsApp button appears once it is set.

## Inquiry form

`app/api/inquiry/route.ts` validates the form with zod (`lib/inquiry.ts`), drops honeypot spam
and sends email through [Resend](https://resend.com).

To switch it on:

1. Create a Resend account and verify a sending domain (for example `shiroorkar.com`). This adds
   DNS records in Cloudflare, so do it deliberately.
2. Set `RESEND_API_KEY`, `INQUIRY_TO` and `INQUIRY_FROM` in `.env.local` and in Vercel.

Until then the form tells visitors their message was not sent and offers a prefilled email.

## Deploying separately from shiroorkar.com

This project is independent of the existing site on `shiroorkar.com`. Deploying it does not
touch that site as long as the root domain records stay as they are.

1. Push this repo to a new GitHub repository.
2. In Vercel, import it as a **new** project. Framework preset: Next.js.
3. Add the environment variables from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to the final
   URL.
4. Check the `*.vercel.app` preview. Set `NEXT_PUBLIC_SHOW_PENDING=true` on preview deploys if
   you want to see placeholders.
5. When ready, add `udaykumar.shiroorkar.com` in Vercel (Project, Settings, Domains). In Cloudflare
   add one record: `CNAME udaykumar -> cname.vercel-dns.com`, proxy status **DNS only**. Do not edit
   the root `shiroorkar.com` or `www` records.
