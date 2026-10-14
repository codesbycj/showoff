# Tallow — a motion study

One transition, rebuilt: five app icons sitting inline in a sentence, which fly
out of it and land on an editing timeline as you scroll — and go back up into
the sentence when you scroll the other way.

```bash
cd websites/tallow && npm install   # from inside the folder, see ../README.md
npm run dev:tallow                  # http://localhost:5192
npm run build:tallow
```

## What it is made of

| File | What lives there |
|---|---|
| `src/motion/motion.ts` | Every timing, curve and proportion, with the provenance of each |
| `src/sections/StatementTimeline.tsx` | The transition: the FLIP, the direction toggle, the staggered flight |
| `src/components/TimelinePanel.tsx` | The editor chrome the tiles land in |
| `src/components/Tile.tsx` | One block: squircle clip, lit inner rim |
| `src/components/SquircleDefs.tsx` | The clip path, and why it is pinned rather than computed |
| `src/assets/tiles/*.tsx` | The five block artworks, drawn as SVG |
| `src/data/statement.ts` | The sentence, in the fragments the layout needs |

## How the transition works

There is **one** set of tiles. They live in the timeline's slots — that is their
home, the place a transform of `none` puts them. Sitting up in the sentence is
the transformed state, not the other way round, and the direction matters:

- **Scaling is always a scale *down*.** A browser rasterises a `will-change:
  transform` layer once at its layout size, so scaling up past it gives
  stair-stepped edges. Making the big end the layout size is what lets the tiles
  carry `will-change` — which is the thing that makes the flight smooth — without
  it wrecking them at the same time.
- **Nothing is hard-coded.** Both ends are real laid-out boxes, so every number
  comes out of `getBoundingClientRect` at whatever size the window happens to
  be. A resize is a re-measure, not a new breakpoint. The scale falls out as
  0.2484 at 1920px, 0.2884 at 1440px and 0.5193 at 390px without any of those
  appearing anywhere in the source.
- **The sentence reflows as text.** Each slot is a 1.15em square sitting in the
  line, so the tiles stay with their words at every width, including when a line
  wraps differently.

The FLIP itself is four lines — the half-size terms are what turn a corner-to-
corner delta into a centre-to-centre one, because a CSS scale grows an element
about its middle:

```js
scale = inline.width / track.width
x     = inline.left - track.left + (inline.width - track.width) / 2
y     = inline.top  - track.top  + (inline.height - track.height) / 2
```

### It is a toggle, not a scrub

The single most important thing about this transition, and the one a rebuild is
most likely to get wrong: **scroll position does not drive the tiles frame by
frame.** It is a boolean — are they on the timeline or in the sentence — and a
scroll *downwards* while the timeline is on screen sets it true, upwards sets it
false. Each flip then fires a fixed 1.5s timeline that runs to completion on its
own clock.

Scrubbing it against scroll offset is the obvious guess and it is wrong: scrubbed,
the tiles judder and reverse with every twitch of the wheel, instead of committing
to the move.

## Where the numbers came from

Not from a stopwatch. The reference is a Next.js app that ships its own source,
so the first measurement was a download rather than a frame count:

```bash
curl -sL https://www.butter.video -o index.html
grep -o '/_next/static/chunks/[A-Za-z0-9._/-]*\.js' index.html | sort -u
```

Fetch those and grep for a string you can see in the DOM — `timeline-block-wrapper`
found it in one — and the component is sitting there minified but entirely
readable, with every duration as a plain number. The layout came from the same
file twice over: it is styled-components, so the whole stylesheet is inlined in
the document head, and the `:root` block hands over the brand's two easing curves
without any guessing.

What that yielded:

- **The flight is 1.5s on `power2.inOut`**, one tween carrying scale and both
  translations.
- **The tilt is a separate pair of tweens riding on top of it**: a fresh random
  angle within ±15° every time, reached over the first 0.75s on `power2.in`, then
  back to upright over the second 0.75s on `power2.out`. Random per *flip*, not
  per tile, so they never fall the same way twice.
- **The stagger is 0.1s per tile leaving the sentence and 0.05s coming back.**
  The showy direction gets the wider spacing; the sentence reassembles at twice
  the rate it came apart.
- **The inline slot is a 1.15em square** with `-0.05em 0.2em -0.2em 0.2em` of
  optical margin, and 1em with different margins below 768px.
- **The timeline is `aspect-ratio: 1372/408`**, its track 72% of that height with
  a 1.5% inset, five square slots spaced apart.
- **The squircle is `cornerRadius: 0.26, cornerSmoothing: 1`**, which the
  reference computes at runtime with `figma-squircle`. Since those inputs never
  change, the resulting path is pinned in `SquircleDefs.tsx` rather than shipping
  a library to compute one constant.

Only then was it recorded playing, to confirm that what the source said is what
it does. The confirmation ran the live site in headless Chrome, parked above the
timeline, then sampled every tile's computed matrix on every frame while
scrolling down. It agreed to four decimal places: the resting transform matched
the FLIP formula exactly at all five tiles, and the tiles began moving 107, 209,
324, 428 and 523ms apart — ~104ms against the 100ms the source asks for.

The same sampler was then pointed at this build. At 1440×900 it reports a scale
of 0.2884 against the reference's 0.2884, slot widths of 69.45 and 240.78 against
69.45 and 240.78, and a stagger of 101, 100, 99, 101ms going down and 51, 50, 49,
51ms coming back.

## Deviations, and why

**The brand, the copy and the five blocks are invented.** The reference's tiles
are real third-party logos and the sentence is its own marketing copy; neither is
ours to redistribute, so the sentence is rewritten and the blocks are drawn from
scratch as SVG. They are in the same family — glossy squircle app icons, one
glass-and-metal, two typographic, one halftone, one scanline — because the
*shape* of the content is what the motion is designed around: five square tiles
small enough to sit in a line of text and interesting enough to be worth watching
move. Drawing them also means there is nothing to license, nothing to credit and
nothing to hotlink.

**The editor chrome is DOM, not a bitmap.** The reference ships its timeline as a
flat 1576×783 PNG laid over the section at 115% width. That does not resize and
cannot be restyled, so it is rebuilt here as real elements — transport, ruler,
track — with every size inside it a container query unit against the panel, so
the chrome scales as one piece. Below 768px the ruler is dropped rather than
rendered as sub-4px type.

**The typeface is a substitute.** The reference sets this in DieGrotesk, which is
proprietary. Geist is the closest free neutral grotesk and is what is used here;
it is slightly narrower per character, so the measure is 32ch rather than the
reference's 30ch to land the sentence on three lines without a one-word last line.

**The inner rim is lighter.** The reference's rim blur is a share of a declared
ceiling rather than of the tile as rendered, which works out near 18% of the tile
at desktop widths. Its blocks are photographic and absorb that; artwork this flat
does not, so it is pulled back to 11% and taken from the tile's own width, which
also keeps it constant at every size.

## Things that bit, recorded so they do not bite again

- **`gsap.from` is not safe to build twice.** A `from` tween reads its
  destination off the element as it is when the tween is constructed. React's
  StrictMode mounts effects twice, so the second `from` recorded the already
  displaced `-300px` as where the tile was supposed to *end up*, and the first
  tile hung above the line permanently. It only showed at phone width, where the
  trigger happened to fire inside the double-mount window — a latent bug at every
  other size. `fromTo`, naming both ends, is the only version of this that is
  safe to construct more than once.
- **The web render cannot be trusted on the first capture.** The sampler reads
  computed matrices rather than pixels for exactly this reason: a screenshot
  taken mid-flight looks like a layout bug and is not one.
- **Park the scroll above the trigger before measuring the resting state.** The
  first attempt at measuring the reference parked inside the timeline panel,
  which armed the toggle and started the move, and sampled the tiles mid-flight
  — reporting a scale of 0.87 for something whose resting value is 0.2884.

## Reduced motion

`prefers-reduced-motion: reduce` switches off Lenis entirely — hijacking the
wheel is exactly the kind of movement that setting is asking not to have — and
replaces the flight with a crossfade in place: no travel, no tilt, no stagger.
The tiles still change position, because that is what the section *means*; they
just do not fly there. Verified: under `--force-prefers-reduced-motion` all five
move together, with a measured stagger of 0ms, and still land at the
FLIP-predicted transform at both ends.

## Checked at

1920×1080, 1440×900, 1280×800, 768×1024 and 390×844 — placement verified against
the FLIP formula at all five, in both directions, plus `tsc`, `eslint` and
`vite build` clean.
