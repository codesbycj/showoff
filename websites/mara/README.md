# Mara Atelier — before / after, episode 5

One business, two designs, and a button that crossfades between them.

**The after is a pixel-perfect rebuild of the reference's home page. The only thing that
changed is the words.** Same images, same arrangement, same colours, same typefaces, same
animation, same hovers — rule 0 of [the series](../README.md). The *before* is invented:
the same atelier mid-migration, under rule 3.

**Mara Atelier** is an invented cosmetics house. The products, prices, stockists and
figures are not real.

```bash
npm install
npm run dev        # http://localhost:5232
```

The toggle is bottom-centre and says **Before CJ / After CJ**.

> **Private study.** Not deployed, not published, not affiliated with the reference site.
> See [`CREDITS.md`](./src/assets/img/CREDITS.md).

---

## What was rebuilt

| | Reference | Build |
|---|---|---|
| Page height at 1440 | 9,165px | 9,124px (−0.4%) |
| Sections, in order | 9 | 9 |
| Typefaces | Clash Display + Inter | **the same two** |
| Display sizes | 195.6 / 48 / 40 / 32 / 24 / 16 / 14 | same |

```
hero       y0     h900   photograph full bleed; kicker 1232,120; labels y449
                         on a dotted rule; wordmark 32,583 fitted to 1376
marquee    y900   h109   lime, a 45px row centred in it, 24s linear
statement  y1009  h865   heading 1129, lead 1200, a 400-tall row at 1277,
                         tail 1709 with a 400x1 rule between its two phrases
splits     y1874  3 x h830, panel and photograph swapping sides
collage    y4365  h1917  sticky left column; 944x1677 of absolute boxes
band       y6281  h762   one photograph, six words in the corners
featured   y7043  h744   three 448x360 cards
brands     y7787  h518   names at 48px flowing as a paragraph
footer     y8305  h860   statement, three columns, meta row, wordmark again
```

## Three things only the dump could tell you

**1. The empty collage cells are real elements.** Every gap in the collage is a 236×191
div with `background: #fff` and **`opacity: 0`** — structure that paints nothing. Build
them as white blocks, as the first pass did, and the section becomes a sheet of postage
stamps instead of photographs floating on green. A screenshot cannot distinguish "nothing
here" from "an invisible thing here", and the two lay out differently.

**2. The statement's captions are clipped off by its own layout.** The frames are 320×487
inside a row that is 400 tall, and the captions sit at y1445 and y1489 — 232px past the
row's bottom edge. So the reference ships "Velvet Citrus / fresh, radiant, uplifting" in
its markup and then hides it. Almost certainly a slot height somebody tightened and never
re-checked. It is reproduced rather than tidied, because a rebuild that quietly fixes the
reference's bugs is not a rebuild; the names survive in each image's `alt`.

**3. The collage heading swaps as you scroll.** There is one heading in the DOM and two on
the page: the left column is sticky and its word changes from the first to the second as
the grid passes. The dump at rest has only "Elegance"; the full-page strip has "Elegance"
at the top of the section and "Clarity" further down.

## The wordmark

`font-size: 195.593px`. Three decimal places, because it is not a chosen size — Framer
fitted eleven characters across 1376px and that is what fell out.

Hard-coding it would match at exactly one viewport and for exactly one brand name. The
build solves it the same way Framer does — render at a nominal size, measure the inline
span, scale — in [`useFitText`](./src/motion/useFitText.ts). The measurement has to be of
an **inline** child: `scrollWidth` on a block `<p>` whose text is `nowrap` reports the
container width, so the first version always measured 1376 and solved to the nominal size.

The wordmark appears twice at this size, at the foot of the first screen and the foot of
the last, and nothing between them is bigger than 48px. That bracket is the page's whole
typographic structure.

## The hovers

The reference has exactly one, used everywhere, and nothing else:

| Element | What happens | Timing |
|---|---|---|
| Every photograph — statement frames, explore thumbs, collage cells, product cards | Scales 1.05 inside a frame that does not move | 0.8s, `cubic-bezier(.44,0,.56,1)` |

That is the list. The nav pill, the fixed CTA, the labels and the brand names have no
hover state in the reference, and none was invented for them. 0.8s is long for a hover and
right for a page whose every photograph is a still life.

Entrances are Framer's default: opacity 0 → 1 with a 40px rise over 0.6s, fired once at
20% visibility.

## Declared departures

1. **The seven stockist names are invented.** The reference prints seven real cosmetics
   houses; an invented shop cannot make that claim. Same name lengths, same meta shape.
   This is the only image-or-arrangement change on the page.
2. **The "Made in Framer" badge is not rebuilt.** It is the platform's mark, not the
   design's.
3. **The copy is invented throughout**, written to the reference's lengths.
4. **No typeface substitutes** — see [`CREDITS.md`](./src/assets/img/CREDITS.md). This is
   the first episode that needed none.

## This episode's before

The same atelier, mid-migration. Somebody started a redesign eighteen months ago: the hero
got rebuilt — big display face, lots of air, the new typeface — and then it stopped.
Everything below is still the previous site. Lato, teal buttons, bootstrap-era cards,
icons in circles, a placeholder block nobody came back to, a stale sale banner with the
year left off, and two footers that were never merged.

It is the most damaging angle in the series precisely because the top of the page is
*good*. A visitor who likes the hero reads everything after it as evidence that the
company does not finish what it starts.

## Shape

```
src/content/site.ts     one deck, all invented words. Both designs read it.
src/after/              ten components, every measurement in a comment
src/after/Wordmark.tsx  the fitted display line, used twice
src/after/Collages.tsx  the absolute grid, and the heading that swaps
src/before/             the half-migrated site, in one file and its stylesheet
src/assets/fonts/       Clash Display, bundled, with its licence
tools/bake.py           how the reference's images were re-encoded
```
