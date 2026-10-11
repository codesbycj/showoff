# VELD

A one-page site for an invented racing driver, built to get one piece of motion right:
a loading sequence in which the white screen you are waiting behind turns out to be the
car number, and collapses into it.

Sem Veldkamp is made up. So is the Continental GT Cup, every partner, every podium and
every date. The photography is free-licensed work by other people, credited file by file
in [`src/assets/images/CREDITS.md`](src/assets/images/CREDITS.md), standing in for
pictures a real driver would own — none of it shows him, because he does not exist.

```bash
npm install
npm run dev          # http://localhost:5184 — add /?skip to jump past the loader
```

Or from the repository root, without changing directory:

```bash
npm run install:veld
npm run dev:veld
```

| | |
|---|---|
| `npm run build` | type-check and bundle to `dist/` |
| `npm run typecheck` | types only |
| `npm run lint` | ESLint, including the React hooks rules |
| `npm run format` | Prettier, with the Tailwind class sorter |

React 19 · Vite 8 · Tailwind 4 · GSAP 3 · Lenis · TypeScript 5.9

**Scope is the home page and its loading sequence.** There is no router and no second
page; the menu scrolls to a band on this one. The contact form is real markup with real
labels and nothing behind it, and says so when you submit it rather than silently doing
nothing.

---

## The loading sequence

A white screen, a black counter rolling up to 96, and five start lights going yellow one
at a time along the bottom. Then the screen opens, and it opens in the shape of a 9 and
a 6, because that is what it was the whole time.

About 5.3 seconds. Three pieces of structure make it work, and none of them are visible
from watching it:

- **The white screen is the car number at a hundred times its own size.** Not a white
  panel that fades, and not a mask: the same SVG that ends up sitting in the hero,
  scaled 100× and pushed 95rem to one side so that the part of the glyph covering the
  viewport is solid ink rather than one of its counters. Collapsing it to `scale: 1`
  *is* the transition — there is nothing behind it to reveal because the hero was never
  covered by anything else.

- **There is a second copy, in yellow, running 25 milliseconds late.** Both end on
  identical transforms, so at rest the yellow one is exactly underneath the white one
  and invisible. It exists solely so that during the collapse — which is an `expo.inOut`,
  so the middle of it is extremely fast — the yellow edge trails the white one. That
  25ms is the difference between a wipe and a trail.

- **The hero starts arriving 0.4s before the takeover finishes.** The two overlap, so
  the loader's timeline has to own both. That is why `Loader.tsx` reaches out and
  animates hero elements by attribute instead of the hero animating itself: only one
  timeline can own an overlap.

`src/sections/Loader.tsx`, with every number in `src/motion/motion.ts`.

### Why the glyph is path data

The numeral is scaled a hundredfold, and that is unusually hostile to the two obvious
implementations.

Set it as text and the browser rasterises the glyph at its layout size and scales the
bitmap — the corners of Anton, which are the entire character of the face, arrive as
stair-steps an inch wide. The same thing happens to an SVG the moment you put
`will-change: transform` on it, because that promotes it to a layer with a fixed raster
scale. Both looked fine at 1× and fell apart at 100×, which is the only size that
matters here.

So the mark is real outlines, pulled out of Anton's own WOFF by
[`tools/glyph-path.py`](tools/glyph-path.py) — a WOFF is an SFNT with each table
zlib-deflated, so the curves are a `zlib.decompress` and a `glyf` walk away. Tracing a
screenshot was the other option and is the wrong tool for type: the smoothing that makes
a traced icon look good is exactly what rounds the corners off a letterform.

## The helmet turntable

The partner wall spins a helmet as you scroll past it, and it is worth being
precise about what "as you scroll" means here, because the obvious reading is
wrong. It is **not** a scrub — scroll position does not map to frame. Scroll
feeds a *speed*:

- it turns at 24 frames a second on its own, so it never freezes;
- every pixel-a-second of scroll adds 0.2 frames a second, up to 270;
- that target is approached through an exponential filter with a 0.35s time
  constant, so a flick of the wheel spins it up and lets it settle;
- scrolling back up past 60px/s flips the direction it coasts in.

Stop scrolling and it keeps turning. That is the whole character of it, and a
position scrub cannot produce it.

Two details make the loading survivable. **Frames arrive in widening strides** —
every 12th, then every 6th, 3rd, and finally all of them — so a complete but
coarse rotation is playable almost immediately and quietly gets smoother; a
sequential load gives you eleven twelfths of a turn and then a jump. And **a
frame that has not arrived falls back to the nearest one that has**, searched
outward from the one wanted, so the canvas never sits on a stale frame while
the gaps fill in.

The ticker is added and removed by a ScrollTrigger, so an off-screen helmet
costs nothing at all.

`src/motion/useFrameSequence.ts`, with the constants in `TURNTABLE`.

### Where the frames come from

There is no photograph of a racing helmet that is not covered in somebody's
real sponsors, and a flat SVG rotated in 3D reads as a spinning sticker. So the
helmet is modelled as a signed distance field and sphere-traced into 120 frames
by [`tools/helmet-frames.py`](tools/helmet-frames.py) — a smooth union of four
ellipsoids for the shell, in the site's own palette.

Everything except the shell is a **surface region**, decided from where the hit
point lands in helmet-local *spherical* coordinates rather than modelled as
geometry. That is what makes the livery wrap the shell as it turns. An earlier
pass cut those regions with planes in x/y/z and the result was a visor that
wrapped round to the back of the head and hard horizontal crescents across the
occiput: a livery is painted onto a shell, so its boundaries are lines of
latitude and longitude.

Antialiasing is analytic — a ray that misses records how close it passed, and
that becomes the alpha. Supersampling would have quadrupled a render that
already takes minutes for an edge that is no cleaner.

## The counter, and every other number

The loader's counter, the hero statistics and the race countdown are one component. Each
digit place is a column of glyphs that slides up to land on its target, passing 0–9 two
extra times on the way, with the places landing right to left.

The part that is easy to miss: **each place animates its own width**. Anton's figures are
not tabular — a `1` is far narrower than a `0` — so a column with one fixed width either
clips its glyphs or leaves a hole. Widths are measured in `em` against the real face
after `document.fonts.ready`; measuring before that returns the fallback's metrics and
the whole number jumps by a few per cent on the frame the webfont lands.

`src/motion/odometer.ts`

## Responsiveness without breakpoints

Every size on the page is a `rem`, and the root font-size is a function of the viewport —
a straight line between two (viewport, size) pairs per band, expressed as
`calc(base * 1rem + m * 1vw)`. A 10rem heading is 160px on a 1440px display and 110px on
a 992px laptop with no media query of its own.

The bands deliberately do not join up at 992px. Below that the page is a different
layout with different type needs, so the ramp restarts rather than continuing the
desktop line down into illegibility.

`src/styles/index.css`, at the top.

---

## Four things that cost real time

None of these produce an error message, which is why they are written down.

**StrictMode's double-invoke undoes a one-shot animation.** The loader set up a
`gsap.context`, React unmounted it, the context reverted every property it had touched,
and then the effect's own "already ran" guard stopped the second pass rebuilding it. The
result was a white screen and five dead lights, forever, with nothing in the console. The
fix is to have no guard at all and let the context's cleanup do its job — the second pass
starts from the same state the first one did.

**A `will-change: transform` makes a scaled SVG blocky.** See above. It is the one
property you would reach for to make a big transform smooth, and it is what breaks it.

**Prettier's Tailwind plugin eats spaces in class templates.** `` `bg-line${dark ? '
bg-line--dark' : ''}` `` came back as `bg-linebg-line--dark` after a format, which is a
class name that does not exist and so fails silently. Class names that are conditional
now go through an array and a `join`, which the plugin leaves alone.

**Two things wanted the same text node.** The countdown ticks every second and the loader
rolls that same element digit by digit. With React also rendering its text, its next
update patched against a text node the odometer had already replaced with a stack of
spans. That element is now uncontrolled — React renders it empty and only effects write
into it.

## Reduced motion, small screens

`prefers-reduced-motion: reduce` skips the loading sequence entirely and lands every
element on its finished value, drops smooth scrolling so the browser's own takes over,
unpins the scroll-driven history, and stops the film growing out of its frame. A
five-second loader is precisely what that setting exists for.

Below 992px the pinned history becomes an ordinary stacked band, the gutter drops from
5rem to 2.5rem and then 1.5rem, and the car number comes back towards the middle of the
screen at two-thirds the size.

## Layout

```
src/
  motion/          every timing, and the machinery that runs it
  components/ui/   CarNumber, HeroMark, BgLines, Countdown, ArrowButton, BandWord, Grid
  components/layout/  Nav, Footer, Monogram
  sections/        one file per band of the page
  data/home.ts     every word, and a calendar that rolls to next season on its own
  assets/images/   photography, with CREDITS.md beside it
tools/
  glyph-path.py    Anton's outlines out of its WOFF, as SVG path data
  helmet-frames.py the helmet turntable, sphere-traced to 120 WebP frames
  commons.py       find, fetch and credit photography in one step
  images.tsv       the asset manifest; `commons.py batch` rebuilds the folder from it
  optimise.py      resize and re-encode to what the page needs
```

Sections are assembly. No section hard-codes a sentence and no component imports a
photograph, so changing the driver is an edit to `data/home.ts` and nothing else.

**Timings all live in `src/motion/motion.ts`,** with a note on each saying where the
number came from. They cannot be recovered from the built page afterwards, which is the
whole reason they are in one file rather than spread across a dozen components.

**The calendar is generated against the current date** and rolls to the following season
once the last round has been run. A hard-coded season is a page with a shelf life: every
date falls into the past, the countdown quietly reads TBA, and the one live number on the
page is dead.

## Type

Anton for display, which is free and is a true match. The body face is Helvetica, which
is not obtainable; **Inter** stands in for it. At a matched cap height Inter runs a little
wider and has rather more personality in the `a`, `g` and `t` — at the 0.875rem the body
copy is actually set at, the difference is close to invisible, which is the trade that
was chosen.

## Rebuilding the images

```bash
python tools/commons.py batch tools/images.tsv   # fetch, with sidecar credits
python tools/optimise.py                         # resize + WebP; 32MB -> 4.9MB
python tools/commons.py credits                  # rewrite CREDITS.md from the sidecars
```

Fetching and crediting are one step on purpose. A file downloaded by hand is a file
nobody can attribute three weeks later.
