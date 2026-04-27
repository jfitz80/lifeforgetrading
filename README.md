# lifeforgetrading.com

Minimal Next.js landing page for **The Trader's Operating System: A Practical Guide to Risk, Discipline, and Long-Term Market Skill**.

## Run locally

```bash
npm install
npm run dev
```

The email form posts to `/api/subscribe` and appends valid addresses to `data/subscribers.csv` in local Node.js development.

For production, set `SUBSCRIBE_WEBHOOK_URL` to forward signups to your email platform or a Cloudflare Worker.
