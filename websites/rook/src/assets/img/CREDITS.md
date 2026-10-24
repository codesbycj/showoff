# Credits

**Every photograph in this folder belongs to the reference site and is used unchanged** —
rule 0: the after is a pixel-perfect rebuild, and the images are part of what is rebuilt.

## What this project is, and is not

- A **private design study**, run on `localhost:5220`. **Not deployed**, not published.
- **All of the written copy is invented.**
- **Not affiliated with the reference site.**

## How the set was collected

```bash
node tools/dump.js   https://<reference>/ ./out --block cookie,consent,googletagmanager
node tools/assets.js ./out ./out/img --min 80
python tools/bake.py ./out/img
```

189 image URLs collapse to 166 files, because the reference serves a
`-p-500 / 800 / 1080 / 1600 / 2000` ladder for every picture and `assets.js` keeps only the
widest of each. `bake.py` then caps each at twice its painted size and writes webp: 3MB in,
1MB out, nothing visibly changed.

**One naming trap worth recording.** The reference numbers its gallery `-1`, then `-02`
through `-13`. A plan that matches `-2` finds nothing, and the deck ends up importing six
files that were never written — which does not fail the typecheck, only the dev server,
and only as a blank page. The matcher now takes the two shapes separately.

## Fonts

**No substitutes.** The reference runs **Switzer**, which Indian Type Foundry gives away
under the ITF Free Font License. Four weights (400/500/600/700) and the licence are
bundled in `src/assets/fonts/`.

The pairing of file to weight is read out of Fontshare's own `@font-face` blocks rather
than from the order the URLs appear in — the CSS lists them in a different order from the
weights, and taking them positionally gets 500 and 600 the wrong way round in a way that
is only visible on a 60px heading.
