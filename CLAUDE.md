# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Santa Fe Hunt club website, live at **santafehunt.com**. DNS was cut over from the old Wix site, so this repo is now the production site — pushes to `main` ship to the public domain. Deploys to Netlify automatically on push to `main`. The deploy root is `netlify-site/` (configured in `netlify.toml` at the repo root). There is **no build step, no package.json, no node_modules** — Netlify just serves `netlify-site/` as static files. Editing a file → commit → push → live in ~30 seconds.

## Who edits this site (and how to act for them)

Two people maintain this site: Sam (technical, comfortable with git/terminal) and **Kristen** (content editor, non-technical). Kristen works through **Claude Desktop on Windows**, with the Code tab pointed at this folder — she does not use a terminal. When you're running on her machine, behave accordingly:

- **Do, don't instruct.** If something needs `git pull`, `git commit`, `git push`, `npx serve`, etc., run it yourself via the shell tool. Don't tell her to "open a terminal and type X" — that's a setup failure she shouldn't have to recover from.
- **Pull before editing.** Sam may have pushed from his own machine since she last worked. Start sessions with `git pull` unless the conversation makes clear she's mid-flow on something local.
- **Previewing `index.html` needs a dev server.** The homepage uses in-browser Babel to load `.jsx` files, which fails under `file://`. To show her a preview, run `npx serve netlify-site` in the background and open `http://localhost:3000` in the Preview pane. Static pages (`about.html`, `awards.html`, etc.) render fine from `file://`.
- **Confirm visually when it's a visible change.** For copy/photo/layout edits, render the page in the Preview pane and tell her what you see before committing. She's relying on you as her eyes.
- **Default close-out is: commit + push + confirm the live site updated.** Don't leave changes uncommitted unless she asks you to.

Full Windows setup is in `developer_setup.md` at the repo root.

## Architecture: two coexisting page styles

The site mixes two rendering approaches. Know which you're touching before editing.

1. **`index.html` — in-browser React/Babel.** Loads React 18 + `@babel/standalone` from unpkg, then `<script type="text/babel" src="...">` tags pull in each `*.jsx` file. Each component file defines a top-level function and assigns it to `window` (e.g. `window.Header = Header`) so sibling scripts can reference it. `index.html` itself composes `<App>` from those globals. There is no module system, no JSX import — components communicate through `window`. `SectionEyebrow` is defined in `EventList.jsx` and re-used by `Etiquette.jsx` via the same window-global pattern.

2. **`about.html`, `awards.html`, `contact.html`, `etiquette.html`, `events.html`, `gallery.html`, `join.html`, `members.html` — static HTML.** Each has its own duplicated header/footer markup and a `<style>` block inline. They do **not** use the React components; if you change navigation or header styling, you must update both the JSX (`Header.jsx`/`Footer.jsx`) *and* the inline markup in each static page (plus `404.html`). Note: `gallery.html` is the live gallery page — the `Gallery.jsx` component used by `index.html` is a separate homepage strip. `404.html` is the same static-page pattern but only served via the `_redirects` catch-all for unmatched URLs; it's not in the nav.

Both styles share `colors_and_type.css`, which is the single source of truth for brand colors, typography, and spacing tokens (CSS custom properties prefixed `--sfh-*`). Always reach for an existing token before introducing a hex value.

## Routing

`_redirects` maps clean URLs to the static files (`/about`, `/awards`, `/contact`, `/etiquette`, `/events`, `/gallery`, `/join`, `/members`, each with and without trailing slash). The catch-all `/* → /404.html 404` renders the branded `404.html` for any unmatched path and returns a real 404 status (so search engines don't index every random slug as a soft duplicate of the homepage). Netlify reads `_redirects` at the deploy root. When you add a new static page, add its redirect pair here too.

## Forms

`contact.html` submits through **Netlify Forms** (a `<form netlify>` attribute on a plain HTML form — Netlify scrapes it at deploy time and starts collecting submissions). No backend code. If a contact form ever stops collecting submissions, the first check is whether Netlify still sees the form in the deploy log.

## Join page prefill

`join.html` lists membership tiers and has per-tier **Register** buttons that link to the membership form with the chosen tier prefilled (query-string driven). When editing tier names or pricing, keep the button targets in sync so the prefill still matches the form's options.

## Conventions worth preserving

- Components are styled with **inline `style={{...}}` objects** referencing CSS variables (e.g. `color: 'var(--sfh-navy-900)'`). No styled-components, no CSS modules — match the existing pattern.
- Mobile/responsive rules that can't be expressed inline (media queries, hover states) are injected via a one-time `<style>` tag inside a `React.useEffect` (see `Header.jsx:17`). Reuse that pattern instead of introducing a stylesheet.
- The shop link (`https://santa-fe-hunt.myshopify.com`) is external; nav items use `target` to open it in a new tab.
- The splash screen in `index.html` exists because Babel transpilation causes a flash of unstyled content on first load; don't remove it without replacing the boot strategy.

## Common edits

- **Homepage event dates** → `EventList.jsx` (`events` array)
- **Standalone events page** → `events.html`
- **Quote / attribution** → `MemberSpotlight.jsx`
- **Homepage hero** → `Hero.jsx`
- **Homepage gallery strip** → `Gallery.jsx` (separate from the full `gallery.html` page)
- **Social links** → `Footer.jsx` (and the duplicated footer in each static `.html`)
- **Etiquette tabs/copy** → `Etiquette.jsx` (`content` object, keyed by tab id) — also rendered as `etiquette.html`
- **Membership tiers / pricing** → `join.html`
- **Contact form** → `contact.html` (Netlify Forms)
- **Colors, fonts, spacing** → `colors_and_type.css` only

## Performance note (from netlify-site/README.md)

The in-browser-build approach is intentional for a club site of this size (~1s initial load). If a future task requires real bundling/SEO, that is a larger migration — flag it before changing the deploy model.
