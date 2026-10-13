# AI Learning Sites

Two static sites, both generated from markdown by `tools/build.mjs`:

| Site | Source | Output |
|------|--------|--------|
| GH-600 study guide | `docs/*.md` | `site/*.html` |
| AI models guide | `ai-models/docs/*.md` | `ai-models/site/*.html` |
| Original GH-600 (reference) | hand-written | `original/*.html` |

## Build

Requires Node.js. Install deps once:

```
cd tools
npm install
```

Then from the repo root:

```
node tools/build.mjs             # builds site/ (GH-600)
node tools/build.mjs ai-models   # builds ai-models/site/
```

Edit the `.md` files in `docs/` / `ai-models/docs/`, then rebuild — the HTML is generated and manual edits to `site/` get overwritten.

## Run locally

The sites are plain HTML with no server-side code, so any of these works:

**Option 1 — just open it.** Double-click `site/index.html`, `ai-models/site/index.html`, or `original/index.html`. Everything works from `file://`.

**Option 2 — local server** (nicer URLs, auto-refresh with some tools):

```
# from repo root
npx serve site           # http://localhost:3000 — GH-600 guide
npx serve ai-models/site # http://localhost:3000 — AI models guide
npx serve original       # http://localhost:3000 — original (reference) site

# or with Python
python -m http.server 8000 -d site
python -m http.server 8000 -d ai-models/site
python -m http.server 8000 -d original
```

Then open http://localhost:3000 (or :8000) in a browser.
