# Wisdom Imah — Portfolio

## Setup

```
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Adding your images

Drop these files directly into the `public/` folder, using these exact names,
and they'll show up automatically — no code changes needed:

- `public/profile.jpg` — your headshot, shown in the hero
- `public/lekki-dashboard.jpg` — Lekki Tides owner dashboard screenshot
- `public/naijastyle-dashboard.jpg` — NaijaStyle admin panel screenshot
- `public/sealine-home.jpg` — Sealine (Tour) homepage screenshot

If you'd rather use different filenames, update the matching `photoUrl` /
`screenshot` fields near the top of `src/Portfolio.jsx`.

## Editing content

All your editable content — name, bio, links, skills, projects, and process
steps — lives in the `PROFILE`, `SKILLS`, `PROJECTS`, and `PROCESS` objects
near the top of `src/Portfolio.jsx`. Everything below that is layout and
styling.

## Build for deployment (e.g. Render)

```
npm run build
```

This outputs a static site to `dist/`, which you can point Render (or any
static host) at.
