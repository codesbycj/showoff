# mise — before / after, episode 6

One business, two designs, and a button that crossfades between them.

**The after is a pixel-perfect rebuild of the reference's home page. The only thing that
changed is the words.** Same images, same arrangement, same colours, same animation, same
hovers — rule 0 of [the series](../README.md). The *before* is invented, under rule 3.

**mise** is an invented restaurant-operations platform. The customers, figures and quotes
are not real.

```bash
npm install
npm run dev        # http://localhost:5236
```

The toggle is bottom-centre and says **Before CJ / After CJ**.

> **Private study.** Not deployed, not published, not affiliated with the reference site.
> See [`CREDITS.md`](./src/assets/img/CREDITS.md).

---

## What was rebuilt

```
hero       y0     h1174  ink; nav, badge pill, two-colour headline, sub, two
                         buttons, then a bone video panel
rail       y1174  h220   violet; a label pill and a scrolling customer row
why        y1394  h844   white; heading y1490, three illustrated cards y1938
results    y2238  h439   lime; heading at x48, a 2x2 stat grid from x732
crew       y2678  h572   ink; label, headline, three lines, a ghost button
platform   y3250  h773   bone; one module open and three closed, phone on the right
stories    y4023  h963   white; a quote card and a photograph, two stats
news       y5084         a scrolling row of six cards
cta        y5196         a periwinkle card beside a phone photograph
footer     y5796  h807   ink; eight columns, an AI row, the big sign-off
```

| | Reference | Build |
|---|---|---|
| Page height at 1440 | 6,603px | 6,448px (−2.3%) |
| Sections, in order | 10 | 10 |
| Palette | 7 colours | the same 7 |

## The measurement that mattered

**The lime results band does not use the page's measure.** Everything else on the page sits
in a 1116px column from x162; that one section's heading starts at **x48** and its stats at
x732 and x1074 — a full-width grid with a 48px gutter. It is why the band reads as wider
than the sections above and below it even though all three grounds are the same width, and
it is invisible unless you read the boxes.

Built with the page's own container first, it came out 114px narrower on each side and the
section lost the thing that makes it land.

## The hovers

The reference moves nothing anywhere. Every hover on the page is a colour change over 0.2s:

| Element | Rest → hover |
|---|---|
| Primary buttons (nav, hero, CTA) | bone → periwinkle |
| Ghost buttons | transparent → 10% white |
| Inactive platform modules | `#796f7b` → `#140018` |
| Story arrows | hairline → solid black border |
| Nav and footer links | bone → periwinkle |
| The sticky chat pill | violet → ink |

No lift, no scale, no shadow, nothing that moves a neighbour. On a page with five
background colours and a video in the first screen, that restraint is the design decision
worth copying.

Entrances are 24px up and in over 0.6s, once.

## Declared departures

1. **The seventeen customer logos are invented operator names.** A wall of real logos on an
   invented platform is a factual claim about seventeen companies.
2. **The consent banner is not rebuilt** — it is a third-party app, not the design, and it
   was blocked at the network layer when photographing the reference.
3. **Two typeface substitutes**, with the weight and tracking matched against the
   reference's own headline. See [`CREDITS.md`](./src/assets/img/CREDITS.md).
4. **The copy is invented throughout.**

## This episode's before

The same company on the site it bought in 2016. Not shabby — *expensive*: a premium theme
with every option switched on, plus the plugins the agency added and the exit-intent modal
marketing asked for in month two.

Everything works and everything was signed off, and you cannot read a paragraph on it. Two
defects do most of the damage and they are the same missing word: **reveal-on-scroll with
no `once`**, so every element replays each time it re-enters, and **counters that restart**,
so the figure you were reading resets to zero as you scroll back.

## Shape

```
src/content/site.ts     one deck, all invented words. Both designs read it.
src/after/AfterPage.tsx the rebuild, section by section, measurements in comments
src/before/             the 2016 theme, in one file and its own stylesheet
tools/bake.py           how the reference's images were re-encoded
```
