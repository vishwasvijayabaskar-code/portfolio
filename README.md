# VISHWAS VIJAYABASKAR — Portfolio

Dark, multi-color, scroll-driven, 3D, cinematic personal portfolio.
Built with React 19, Three.js (react-three-fiber), GSAP + ScrollTrigger,
Framer Motion, and Lenis smooth scroll.

Tagline: **Puzzles to Problems.**

## Stack

- **React 19** + **Vite 8**
- **@react-three/fiber** + **@react-three/drei** + **@react-three/postprocessing** — Three.js
- **GSAP** + **ScrollTrigger** — pinning, scrub, marquee
- **Framer Motion** — component micro-interactions
- **Lenis** — smooth scroll
- **split-type** — text splitting (loaded but minimal use; GSAP timeline drives letter cascade)

## Sections

| # | Section | Headline | Animation flavor |
|---|---------|----------|------------------|
| 0 | Hero | VISHWAS VIJAYABASKAR / Puzzles to Problems | GSAP letter cascade + 12k particle field |
| 1 | About | I'm a 16 year old builder... | Framer word-by-word mask reveal |
| 2 | Projects | Things / built | GSAP **pinned horizontal scroll** across 5 cinematic panels |
| 3 | Skills | Tools / trade | 3-row infinite marquee, scroll-velocity coupled |
| 4 | Activities | Off / keyboard | Framer clip-path slide reveal |
| 5 | Contact | Let's build. | Magnetic links, scramble text, click-to-copy |

## Palette

- BG base: `#07050B` (near-black) + animated conic nyan-cat gradient (`#FF1493` / `#00E5FF` / `#BFFF36` / `#F04000`)
- Accent primary: **`#BFFF36`** acid green
- Accent secondary: `#F04000` electric red-orange
- Text: `#FFFFE0` cream

## Typography (Google Fonts)

- Display: **Anton** (condensed bold)
- Body: **Space Grotesk** (modern sans)
- Mono: **JetBrains Mono**

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production bundle to dist/
npm run preview      # preview production build locally
```

## Live integrations

### Weather — `wttr.in` (no setup, already live)
Status widget pulls real Cary, NC weather every 15 min. Zero config. Falls back to `Cary, NC · 64°F · clear` if API errors.

### Spotify "now playing" — optional, env-gated
Server route at `/api/spotify.js` (Vercel serverless). Polls every 30s from client. Falls back to hardcoded J. Cole line if env vars missing.

**Setup:**
1. Register app at https://developer.spotify.com/dashboard
2. Add Redirect URI: `http://localhost:8888/callback`
3. Get a **refresh token** (one-time OAuth):
   ```bash
   # Open this in browser (replace CLIENT_ID):
   https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-read-currently-playing
   # After approve → you're redirected to /callback?code=AUTH_CODE
   # Exchange code for refresh_token:
   curl -X POST https://accounts.spotify.com/api/token \
     -H "Authorization: Basic $(echo -n 'CLIENT_ID:CLIENT_SECRET' | base64)" \
     -d "grant_type=authorization_code&code=AUTH_CODE&redirect_uri=http://localhost:8888/callback"
   ```
4. In Vercel project → Settings → Environment Variables, add:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`
5. Redeploy.

### Google Analytics — optional, env-gated
Add `VITE_GA_ID=G-XXXXXXXXXX` in Vercel env vars. GA4 script loads only when set. Anonymized IP by default.

---

## Deploy to Vercel

### Option A — CLI

```bash
npm install -g vercel
vercel --prod
```

Defaults work: framework auto-detected as Vite, build command `npm run build`, output `dist`.

### Option B — GitHub + Dashboard

1. `git init && git add -A && git commit -m "init portfolio"`
2. Push to a new repo: `gh repo create vvijayabaskar/portfolio --public --source=. --push`
   (or create repo manually on github.com and `git remote add origin ... && git push -u origin main`)
3. Go to vercel.com → New Project → Import the repo
4. All defaults are correct. Click Deploy.

## Customize

### Project content
- `src/components/Projects/projectsData.js` — add / edit project panels
- `src/components/Activities/Activities.jsx` — `ACTIVITIES` array
- `src/components/Skills/Skills.jsx` — `ROWS` array (skill chips)
- `src/components/Contact/Contact.jsx` — email, links, footer

### Visual
- `src/styles/variables.css` — palette, fonts, easings (single source of truth)
- `src/components/Hero/ParticleField.jsx` — particle count, shader colors, motion

### Performance
- Particles default 12,000. Reduce in `BackgroundCanvas.jsx` (`<ParticleField count={...} />`) for slower devices.
- Mobile auto-disables the 3D canvas below 768px. Threshold in `src/App.jsx`.

## File map

```
src/
  main.jsx                    entry, gsap plugin registration
  App.jsx                     section orchestrator + mobile gate
  styles/                     reset, variables, global
  hooks/
    useSmoothScroll.js        Lenis + GSAP ticker glue
    useMagnetic.js            magnetic cursor pull
    useMediaQuery.js          mobile gate
  context/
    CursorContext.jsx         cursor variant + label state
  components/
    Layout/                   SmoothScroll, Cursor, GrainOverlay, BackgroundCanvas
    Hero/                     Hero, HeroTitle, ParticleField (GLSL), ScrollIndicator
    About/                    About, WordReveal
    Projects/                 Projects (pinned horizontal), ProjectPanel, projectsData
    Skills/                   Skills (marquee), SkillChip
    Activities/               Activities (clip-path reveal), ActivityRow
    Contact/                  Contact (scramble + magnetic), ContactLink
```

## License

Personal portfolio. All rights reserved.
