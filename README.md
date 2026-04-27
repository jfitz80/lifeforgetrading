# lifeforgetrading.com

Minimal Next.js landing page for **The Trader's Operating System: A Practical Guide to Risk, Discipline, and Long-Term Market Skill**.

## Run locally

```bash
npm install
npm run dev
```

The email form posts to `/api/subscribe` and appends valid addresses to `data/subscribers.csv` in local Node.js development.

For production, set `SUBSCRIBE_WEBHOOK_URL` in Vercel to forward signups to your email platform, Formspree, ConvertKit, Beehiiv, Mailchimp, or a Cloudflare Worker. Without this environment variable, production signups return a configuration message instead of trying to write a local CSV file.

## Lead magnet

- Editable checklist page: `/checklist`
- Downloadable PDF: `/lifeforge-trading-checklist.pdf`
- Regenerate PDF after copy changes: `pnpm generate:checklist`
