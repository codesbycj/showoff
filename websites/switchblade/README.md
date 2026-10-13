# One Standard — a motion study

One section, rebuilt: a row of product tiles that arcs across the stage, and a
figure that changes to wear whichever tile is passing it.

```bash
npm run install:switchblade
npm run dev:switchblade     # http://localhost:5188
npm run build:switchblade
```

## What it is made of

| File | What lives there |
|---|---|
| `src/motion/motion.ts` | Every timing, curve and proportion, with the provenance of each |
| `src/sections/OneStandard.tsx` | The marquee loop and the figure's crossfade |
| `src/components/SweepText.tsx` | The headline wipe |
| `src/styles/index.css` | The gradient the wipe moves, clipped to the glyphs |
| `src/data/products.ts` | The six products and the figure each one calls for |

## Where the numbers came from

Not from a stopwatch. The reference is a Next.js app that ships its own source,
so the measurement was a download rather than a frame count:

```bash
curl -sL https://switchblade-awwwards.vercel.app -o index.html
grep -o '/_next/static/chunks/[A-Za-z0-9._/-]*\.js' index.html | sort -u
```

Fetch those, grep for a string you can see on the page — `Jewelry` found it in
one — and the component is sitting there minified but entirely readable, with
every duration as a plain number. The stylesheet carries the rest: the whole
headline wipe is one `linear-gradient` with a custom property in its stops.

What that yielded, and what each number does:

- **`tileWidth = clamp(112px, 11.4vw, 168px)`** is the only free measurement.
  Speed, spacing and the focal point are all multiples of it, so the section
  rescales as one piece rather than drifting apart at other widths.
- **Travel is `tileWidth / 2.9` px per second** — about 58px/s at a desktop
  width. Expressed in tile-widths rather than pixels, the cadence of products
  passing the figure is the same at every size.
- **The arc is a single cosine trough** across 1.2 stage-widths:
  `y = h · (0.03 + 0.55 · (0.5 − 0.5 cos(2π · x / 1.2w)))`. The period being
  wider than the stage is what stops it reading as a repeating wave — tiles
  enter high, bottom out just right of centre, and are still climbing when they
  leave.
- **`zIndex = round((x + tileWidth) / 20)`**, so further right is nearer and the
  overlaps stay consistent as tiles converge. Quantising to 20px keeps most
  frames off the style recalc path.
- **The focal point sits at `w/2 + 0.9 · tileWidth`**, right of centre, so a
  product is selected as it clears the figure rather than while it is behind it.
- **The wipe runs 1300ms, easeInOutQuad, from -30% to 130%**, triggered at 30%
  visibility.

Only then was it recorded playing, to confirm that what the source said is what
it does. It was: at 1440×900 the measured tiles come out 164×179 with 12 of them
on a 1440×660 stage, the arc lands each one within a pixel of the formula, and
the sweep covers 88% of its range in 900ms.

## Two things worth knowing

**Nothing here is tweened.** Every frame places every tile from elapsed time
alone, wrapped with a modulo so the tile leaving the right re-enters at the
left. A resize, a backgrounded tab or a React re-render can none of them
desynchronise it — the next frame is correct whatever happened before it. The
loop pauses offscreen and credits the time back, so scrolling past and returning
does not jump the row forward.

**`--sweep` cannot be transitioned.** It is an unregistered custom property, so
CSS has no type for it and will step rather than interpolate. `SweepText` drives
it from rAF instead. Registering it with `@property` would be the alternative;
driving it by hand keeps the easing in `motion.ts` with everything else.

## Where it departs from the house rules

Two, both deliberate, both recorded here rather than left to be discovered:

1. **The imagery is the reference's own**, not free-licensed stand-ins — see
   `src/assets/images/CREDITS.md`. It was taken so the motion could be checked
   against the reference frame for frame. This is a private study; replace that
   folder before it goes anywhere public.
2. **The brand is the reference's**, for the same reason. There is no original
   copy here beyond the lead-in.

The lead-in above the section is not part of the reference. It exists because
the wipe fires on scrolling into view, and a page that opened with the headline
already on screen would play it to an empty room.

## Known limits

It is a desktop-first section, as the reference is — there is no mobile branch.
Below about 500px the figure is wider than the viewport and is cropped by the
section, which is the reference's behaviour too, not a regression.
