# rook — before / after, episode 2

One business, two designs, and a button that crossfades between them.

**The after is a pixel-perfect rebuild of the reference's home page. The only thing that
changed is the words.** Same photographs, same arrangement, same ground, same typeface,
same hovers — rule 0 of [the series](../README.md). The *before* is invented, under rule 3.

**rook** is an invented furniture brand. The products, prices, reviews and awards are not
real.

```bash
npm install
npm run dev        # http://localhost:5220
```

The toggle is bottom-centre and says **Before CJ / After CJ**.

> **Private study.** Not deployed, not published, not affiliated with the reference site.
> See [`CREDITS.md`](./src/assets/img/CREDITS.md).

---

## What was rebuilt

```
hero         y0      h900   four 60px lines in a 470px column at x30;
                            a seven-tile grid on a slightly darker ground
ingredients  y1100   h236   one 60px sentence with images set between the words
products     y1536   h900   two cards: shot, price, swatches, add to cart
stats                       three bordered claims
spaces       y2636   h566   a 60px paragraph and a row of tiles
people       y3402   h553   three review cards
quiz         y4841   h422   two 60px tabs and a four-option form
about        y5462   h600   two people: portrait, role, blurb, 30px quote
awards       y6263          three groups of rows at 30px
stories      y7294          a scrolling row of story cards
earth                       a line and a button
faq                         an accordion beside a chair
```

## The thing worth copying

**The whole page is one ground colour and four type sizes** — 60 / 30 / 19 / 14, at two
weights. No display face, no capitals, no tracking, no second colour anywhere in the
interface.

All of the colour is in the photography. A grid of yellow, lilac and olive product shots
reads as the brand's palette even though the page itself has none, and that is what lets
14,538px of scrolling hold together without a single section divider.

The second decision is the chrome: **a wordmark and a hamburger**. No links, no cart, no
search. A brand with two products does not need a nav, and leaving it out is what lets the
first screen be a headline and photographs with nothing competing for the top-right
corner.

## The hovers

| Element | What happens |
|---|---|
| Every photograph | Scales 1.04 inside a frame that does not move, over 0.9s |
| The two "about us" portraits | Swap to a **second photograph** — the reference ships `about-1.webp` and `about-1-hovered.webp` as a pair |
| Buttons | ink → mute |
| Nav / footer links | mute → ink |
| FAQ rows | the `+` rotates 45° |

That second row is the detail: a whole second photoshoot, for a hover.

## Declared departures

1. **The product detail panels are not rebuilt.** The reference ships two expandable
   product pages inside the home page — quote, gallery, "Why Lightly", features, usage
   notes — about 3,000px of content behind a control. The home page as it rests does not
   show them and this build does not either.
2. **The copy is invented throughout**, written to the reference's lengths.
3. **No typeface substitute** — Switzer is free. See
   [`CREDITS.md`](./src/assets/img/CREDITS.md).

## This episode's before

The same brand as a congested directory: everything above the fold, two rails, forty
links, a countdown, tables inside tables, and 10px type. The information is all there and
there is no hierarchy at all, so the eye has nowhere to land.

It carries the same deck as the after — both chairs with their spec tables, the gallery,
the awards, the reviews and the whole footer — crowded into a 1,000px grid with a
bestseller rail down one side and a news rail down the other.

## Shape

```
src/content/site.ts     one deck, all invented words. Both designs read it.
src/after/AfterPage.tsx the rebuild, measurements in comments
src/before/             five files: chrome, rails, catalogue, footer
src/assets/fonts/       Switzer, bundled, with its licence
tools/bake.py           how the reference's images were re-encoded
```
