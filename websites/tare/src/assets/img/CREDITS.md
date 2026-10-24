# Credits

**Every illustration in this folder belongs to the reference site and is used unchanged** —
rule 0: the after is a pixel-perfect rebuild, and the images are part of what is rebuilt.

## What this project is, and is not

- A **private design study**, run on `localhost:5240`. **Not deployed**, not published.
- **All of the written copy is invented.**
- **Not affiliated with the reference site.**

## How the set was collected

This reference has **no image files at all** — `images.json` came back with zero entries.
Every drawing on the page is **inline SVG** in the markup, so the usual collector finds
nothing and `assets.js` has nothing to download.

```bash
node tools/dump.js https://<reference>/ ./out --block cookie,consent,googletagmanager
# then pull every <svg> over 600 bytes straight out of out/page.html
```

That returned 43 drawings, of which 24 are used here:

| In the build | What it is |
|---|---|
| `taxman/00–12.svg` | **Thirteen states of the same figure** — the hero's whole interaction |
| `steps/0–3.svg` | The four step illustrations, 490×530 |
| `icons/0–5.svg` | The six service icons, 120×120 |
| `click-label.svg` | The hand-lettered "click to…" label |
| `hand.svg` | The drawn pointing hand, used as the hero's CSS cursor |
| `receipt-edge.svg` | The footer receipt's torn edge |

They stay SVG. Rasterising a line drawing loses it at every size but one, and these are
drawn at 313×480 and shown at 298×457 — about a 5% upscale, which is free in vector and
visible in a bitmap.

## Fonts

**No substitutes.** The reference runs **Anton** and **Inter**, both OFL, both on
fontsource — so the build's letterforms are the reference's, not an approximation. This is
the second episode in the series that needed no stand-in.

| Font | Licence | Used for |
|---|---|---|
| Anton | SIL OFL 1.1, `@fontsource/anton` | Every display size, 18px to 128px |
| Inter Variable | SIL OFL 1.1, `@fontsource-variable/inter` | Body copy and nav |
| Cinzel + PT Serif | SIL OFL 1.1, fetched by `tools/fetch-fonts.py` | **The before only**, inside its generated JPEGs |
