# slashbrag

A public directory of people's `/brag` pages — professional wins, projects, and who they are.

Built with Astro + Tailwind CSS v4. Deployed to Cloudflare Pages. No database — just a JSON file you add to via pull request.

---

## Adding yourself to the directory

1. Fork this repository on GitHub
2. Open `src/data/brags.json`
3. Add your entry to the **end** of the array:
   ```json
   {
     "name": "Your Name",
     "brag_url": "https://yoursite.com/brag",
     "description": "Who you are and what you do. Max 200 characters."
   }
   ```
4. Open a pull request titled `Add [Your Name]`

Or use the form at `/submit` on the live site to generate the JSON automatically.

**Rules:**

- All three fields are required
- `brag_url` must start with `https://`
- `description` max 200 characters
- Only edit `src/data/brags.json` — no other files

---

## Local development

**Requirements:** Node.js 20+

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build → /dist
npm run preview   # preview the production build
npm run validate  # validate brags.json schema
```

---

## Deploying to Cloudflare Pages

Follow these steps once to set up automatic deploys from GitHub.

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `slashbrag` (or whatever you want)
3. Set it to **Public**
4. **Do not** initialize with a README (you already have one)
5. Click **Create repository**

Then push this project from your terminal:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/slashbrag.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 2 — Connect to Cloudflare Pages

1. Log in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. In the sidebar, click **Workers & Pages**
3. Click **Create application** → **Pages** tab → **Connect to Git**
4. Authorize GitHub when prompted
5. Select your `slashbrag` repository
6. Click **Begin setup**

### Step 3 — Configure the build

Fill in these settings:

| Field                  | Value           |
| ---------------------- | --------------- |
| Project name           | `slashbrag`     |
| Production branch      | `main`          |
| Build command          | `npm run build` |
| Build output directory | `dist`          |

Scroll down to **Environment variables** and add:

| Variable       | Value |
| -------------- | ----- |
| `NODE_VERSION` | `22`  |

Click **Save and Deploy**.

### Step 4 — Your site is live

Cloudflare will clone your repo and run the build (~1 min). When it finishes you'll get a URL like:

```
https://slashbrag.pages.dev
```

That's your live site. Every push to `main` triggers a new deploy automatically. Every pull request gets a preview URL.

### Step 5 — Custom domain (when you're ready)

1. In your Pages project, go to **Custom domains** → **Set up a custom domain**
2. Enter your domain (e.g. `slashbrag.com`)
3. If the domain is already managed in Cloudflare DNS, the setup is automatic
4. If not, follow the CNAME instructions Cloudflare provides

### Step 6 — Update the repo link on /submit

Once you have a GitHub repo URL, open `src/pages/submit.astro` and replace:

```
https://github.com/[YOUR-REPO]
```

with your actual repo URL, e.g. `https://github.com/yourname/slashbrag`.

---

## Project structure

```
src/
├── data/
│   └── brags.json          ← edit this to add entries
├── types/
│   └── brag.ts             ← TypeScript interface for entries
├── styles/
│   └── global.css          ← Tailwind v4 import + theme
├── components/
│   ├── BragList.astro      ← list container
│   └── BragRow.astro       ← single entry row
├── layouts/
│   └── BaseLayout.astro    ← HTML shell, nav, footer
└── pages/
    ├── index.astro         ← directory listing
    └── submit.astro        ← about + JSON generator
```

---

## Tech stack

- [Astro](https://astro.build) — static site builder, zero JS shipped by default
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first CSS via `@tailwindcss/vite`
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting + CI/CD

---

## What's been built

- **Two-column layout** — fixed 1/4 sidebar with site identity + nav; 3/4 main content area
- **Sidebar divider** — gradient line visible only in the center 60% of the viewport, gray at rest, blue while scrolling; masked blue shadow on scroll
- **Scroll-triggered fade overlays** — top and bottom edges fade content in/out with backdrop blur; hidden on page load, appear after 40px of scroll
- **Font system** — `font-display` (Anek Bangla) for headings, `font-body` (Lato) for body text, `font-mono` (Source Code Pro) for code
- **CSS variable theming** — `--color-background` wired to body background and fade overlays so color changes propagate everywhere
- **Active nav state** — current page highlighted via `Astro.url.pathname`
- **Odometer counter** — entry count animates digit-by-digit on page load, blue during spin, fades to gray on landing
- **Custom text selection** — blue-600 at 70% opacity with white text
- **About page** — single-column, consistent heading hierarchy, all external links open in new tab with border-bottom style
- **Submit page** — matches about page layout; form generates live JSON preview with copy button

## Still to do

- [ ] **Mobile layout** — sidebar collapses or shifts to top nav on small viewports
- [ ] **Client-side search** — filter rows by name/description as you type
- [ ] **Sort toggle** — alphabetical vs. newest-first
- [ ] **OG image** — social preview card for link sharing
- [ ] **Footer** — restore and redesign the carousel footer, now commented out
- [ ] **Remove dummy data** — replace the 100 test entries in `brags.json` with real submissions before launch
- [ ] **Real Submit button** — current nav Submit link needs a distinct style separate from the active state indicator

---

## Built by

[YOUR NAME HERE] — update this before deploying, and update the footer in `src/layouts/BaseLayout.astro`.
