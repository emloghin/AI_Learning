# AI Learning Sites

Three static sites plus the GH-600 research material, all built by `tools/build.mjs`:

| Site | Folder | Source | Output |
|------|--------|--------|--------|
| GH-600 study guide | `gh-600/` | `gh-600/docs/*.md` | `gh-600/site/*.html` |
| GH-600 quiz | `gh-600-quiz/` | hand-written HTML/JS | served as-is |
| Original GH-600 (reference, not built) | `gh-600/original/` | hand-written | served as-is |
| AI fundamentals guide | `ai-fundamentals/` | `ai-fundamentals/docs/*.md` | `ai-fundamentals/site/*.html` |

`gh-600/research/` holds the working data behind the study guide: downloaded Microsoft Learn pages, extraction scripts, and question dumps (historical; scripts contain old absolute paths). Correction history lives in `gh-600/corrections-log.md`.

## Layout

```
gh-600/
├── docs/             # markdown source — edit here
├── site/             # built HTML — do not edit (overwritten by build)
├── original/         # pre-correction site kept for reference
├── research/         # Learn downloads, scripts, question data
└── corrections-log.md
gh-600-quiz/          # standalone quiz site (hand-written HTML/JS)
ai-fundamentals/
├── docs/             # markdown source — edit here
└── site/             # built HTML — do not edit (overwritten by build)
tools/build.mjs       # the generator for gh-600 and ai-fundamentals
```

## Build

Requires Node.js. Install deps once:

```
cd tools
npm install
```

Then from the repo root:

```
node tools/build.mjs                  # builds gh-600/site
node tools/build.mjs ai-fundamentals  # builds ai-fundamentals/site
```

Edit the `.md` files in `gh-600/docs/` / `ai-fundamentals/docs/`, then rebuild — the HTML is generated and manual edits to the `site/` folders get overwritten.

## Run locally

The sites are plain HTML with no server-side code, so any of these works:

**Option 1 — just open it.** Double-click `gh-600/site/index.html`, `gh-600-quiz/index.html`, `gh-600/original/index.html`, or `ai-fundamentals/site/index.html`. Everything works from `file://`.

**Option 2 — local server** (nicer URLs, auto-refresh with some tools):

```
# from repo root
npx serve gh-600/site        # http://localhost:3000 — GH-600 guide
npx serve gh-600-quiz        # GH-600 quiz
npx serve gh-600/original    # original (reference) site
npx serve ai-fundamentals/site  # AI fundamentals guide

# or with Python
python -m http.server 8000 -d gh-600/site
python -m http.server 8000 -d ai-fundamentals/site
```

Then open http://localhost:3000 (or :8000) in a browser.
