# Credits

**Every image in this folder belongs to the reference site and is used unchanged** — rule 0
of this series: the after is a pixel-perfect rebuild, and the images are part of what is
rebuilt.

## What this project is, and is not

- A **private design study**, run on `localhost:5236`. **Not deployed**, not published.
- **All of the written copy is invented**, written to the reference's own lengths.
- **Not affiliated with the reference site.**

## How the set was collected

```bash
node tools/dump.js   https://<reference>/ ./out --block ketch,hubspot,googletagmanager
node tools/assets.js ./out ./out/img
python tools/bake.py ./out/img
```

Three things worth recording.

**The consent banner had to be blocked at the network layer.** The reference loads Ketch,
which paints a full-viewport overlay a few seconds in. Deleting its elements does not work
— it is on a timer and comes back between the eval and the first band — so `--block ketch`
stops it loading at all. The first eight bands of the first survey are a picture of a
privacy dialog.

**The three card illustrations are SVG and stay SVG.** Rasterising a drawn illustration
loses it at every size but one.

**Some assets are AVIF and are copied through untouched.** Pillow cannot open AVIF without
a plugin; the browser can, and rule 10 only allows a re-encode that saves bytes. The hero
is an MP4 and is copied the same way.

## The one thing that is not the reference's

The reference's customer rail prints **seventeen real restaurant brands' logos**. A wall of
real logos on an invented platform is a factual claim about seventeen companies, so they
are invented operator names set as wordmarks at the reference's own slot widths. It is the
only departure from "the images and arrangement are copied", and the README lists it.

## Fonts

The reference runs two commercial faces, neither licensable for a study.

| Substitute | Licence | Stands in for |
|---|---|---|
| Archivo Variable 500/600 | SIL OFL 1.1, `@fontsource-variable/archivo` | **Sharp Grotesk 20**, the display face |
| Inter Variable | SIL OFL 1.1, `@fontsource-variable/inter` | **Graphik**, everything that is read |
| Montserrat + Open Sans | SIL OFL 1.1 | **The before only** — the defining 2014–2017 theme pairing |

Sharp Grotesk at weight 400 reads heavier than Archivo at 400 — thicker stems at the same
optical size — so the substitute is set at **500** and tracked to −0.032em, matched against
the reference's own 72px headline. Without that the hero looks thin and sets 7% wide.
