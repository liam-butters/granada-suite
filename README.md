# Granada Crescent — vacation rental site

Plain HTML/CSS/JS, no framework, no dependencies. Deploys as a static site
via Netlify, built from GitHub.

## What's here

- `index.html` — landing page: description, amenities, map
- `calendar.html` — live availability, embeds a Google Calendar
- `photos.html` — photo gallery, auto-built from the `/photos` folder
- `photos/` — **put your images here**
- `scripts/generate-photos.js` — build step that turns `/photos` into
  `data/photos.json`, which the gallery reads
- `netlify.toml` — tells Netlify to run that build step before publishing

## Two things to configure before this is live

### 1. Availability calendar (`calendar.html`)

1. In Google Calendar, create or pick the calendar you'll use for bookings.
2. Settings → that calendar → **Integrate calendar** → copy the **Calendar
   ID** (looks like `abc123@group.calendar.google.com`).
3. Same settings page → **Access permissions** → check **Make available to
   public**. Choose "See only free/busy" if you don't want event titles
   visible to visitors, or "See all event details" if you do.
4. In `calendar.html`, find `YOUR_CALENDAR_ID_HERE` and replace it with your
   ID (leave the `%40` — that's an URL-encoded `@`).

### 2. Map address (`index.html`)

The map uses `q=1568+Granada+Crescent`. If that pulls up the wrong spot
(there's more than one street with that name), add the city/province, e.g.
`q=1568+Granada+Crescent,+Victoria,+BC` — find that line in `index.html`
near the `map-frame` comment.

## Adding photos

Just drop image files into `/photos` and push. That's it — the next
Netlify build regenerates the gallery automatically. See `photos/README.md`
for filename tips.

## Deploying

1. **Push to GitHub**
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

2. **Connect Netlify**
   - netlify.com → **Add new site** → **Import an existing project** →
     choose GitHub → pick this repo.
   - Build command and publish directory are already set via
     `netlify.toml` (`node scripts/generate-photos.js` / `.`) — Netlify
     should pick them up automatically, just confirm and deploy.

3. **Domain** — you said you'll handle this later; Netlify gives you a
   free `*.netlify.app` subdomain immediately, and you can attach a custom
   domain under **Site settings → Domain management** whenever you're
   ready.

From here on, the workflow is: edit files or add photos → `git push` →
Netlify rebuilds automatically in about a minute.

## Editing the copy

Search for `EDIT ME` comments in `index.html` — that's the property
description, amenities list, and contact email. Everything else (nav,
footer, styling) is shared across all three pages via `css/style.css`.
