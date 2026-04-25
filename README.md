# surfc-help

User-facing help site for [Surfc](https://surfc.app). Built with [VitePress](https://vitepress.dev) and deployed to **Cloudflare Pages** at `help.surfc.app`.

This is the third Surfc surface, sibling to:
- `surfc/` — the React PWA at `app.surfc.app`
- `surfc-web/` — the Astro marketing site at `surfc.app`

Linked from the React app via the FAQ row in `ProfileScreen` and the "How Surfc works →" link in `SettingsModal` (see [SUR-223](https://linear.app/surfc/issue/SUR-223) and parent [SUR-209](https://linear.app/surfc/issue/SUR-209)).

## Local development

```bash
npm install
npm run dev      # http://localhost:5173 (or next free port)
npm run build    # docs/.vitepress/dist/
npm run preview  # preview the built site
```

## Environment variables

Copy `.env.example` to `.env` and fill in PostHog credentials if you want analytics in local dev. Leave them empty to skip analytics entirely (the init guard no-ops with no token).

| Variable | Purpose |
|---|---|
| `VITE_POSTHOG_PROJECT_TOKEN` | Same project as `surfc/` and `surfc-web/` so the marketing → waitlist → sign-up → help → app funnel lives in one stream. |
| `VITE_POSTHOG_HOST` | Defaults to `https://eu.i.posthog.com` if unset. |

The PostHog client is configured with `cross_subdomain_cookie: true` so a `distinct_id` set on `surfc.app` or `app.surfc.app` follows the user to `help.surfc.app`.

## Deploy

Cloudflare Pages, connected to this repo on GitHub.

| Setting | Value |
|---|---|
| Framework preset | VitePress |
| Build command | `npm run build` |
| Build output directory | `docs/.vitepress/dist` |
| Root directory | `/` |
| Node version | 20 |
| Production env vars | `VITE_POSTHOG_PROJECT_TOKEN`, `VITE_POSTHOG_HOST` |

Custom domain `help.surfc.app` is added in the Cloudflare Pages project; DNS lives on whichever provider currently fronts `surfc.app`.

## Structure

```
docs/
├─ .vitepress/
│  ├─ config.mts        # site title, nav, sidebar, local search
│  └─ theme/
│     ├─ index.ts       # extends DefaultTheme, calls enhanceApp
│     └─ posthog.ts     # PostHog snippet (mirrors surfc-web/src/layouts/BaseLayout.astro)
├─ index.md             # home (hero + features layout)
├─ getting-started/
│  ├─ index.md          # category overview
│  ├─ first-capture.md
│  ├─ idea-system.md
│  ├─ sources-provenance.md
│  └─ idea-discovery.md
├─ sync-and-devices.md
├─ tiers-quotas.md
└─ export.md
```

Articles use VitePress markdown plus Vite's `:::warning`/`:::tip` containers. Cross-link with sibling-relative paths (`./idea-system`) where possible so files can move without breaking links.
