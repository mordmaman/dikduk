# Dikduk

Biblical Hebrew grammar for adults who already read Hebrew. All explanations, examples and exercises are original; examples come from Tanakh and the siddur.

A static site for GitHub Pages. No accounts, no analytics, no cookies: progress is kept in the browser on each device.

## Working on it

```
python3 build.py      # bundles src/ into index.html
node tests/check.js   # checks lesson data, Hebrew marks, save logic
```

Edit files in `src/`, never `index.html` directly. No npm install is needed; `package.json` only sets the module type and script names.

- `src/lessons/` holds one file per lesson. See `src/lesson-format.js` for the format; a new lesson file is picked up by the build automatically.
- Lesson Hebrew is proofed outside this repo before it is added. Do not edit Hebrew text in lesson files.
- Divine names are never printed in full. `tests/check.js` fails if one appears.

## Installing and offline use

`manifest.json` and `sw.js` make the site installable and usable offline. The service worker fetches the page from the network first, so a new build shows up straight away, and falls back to the cached copy when offline. Fonts and icons are served from the cache. If you add a file the site needs offline, list it in `sw.js` and bump `CACHE`; `tests/check.js` checks that every listed file exists.

Fonts: Frank Ruhl Libre (Hebrew subset), self-hosted under the SIL Open Font License; see `fonts/OFL.txt`. Hebrew that carries trop marks is set in Noto Serif Hebrew (Hebrew subset, also OFL; see `fonts/OFL-NotoSerifHebrew.txt`), because Frank Ruhl Libre has no trop.
