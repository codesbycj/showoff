# onesheet

One section of a reference site, rebuilt: six service cards stand in a
perspective stack, step forward one gap at a time as the page scrolls, and the
card nearest the camera is thrown up and off the screen — six times over, in a
section six screens tall, with the copy beside them never moving.

```bash
cd websites/onesheet && npm install
npm run dev          # http://localhost:5208
```

Install from inside this folder. `npm --prefix websites/onesheet install` from
the repository root writes a dependency on the Expo project above into this
`package.json` — see the note in [`../README.md`](../README.md).

Onesheet is invented: the agency, the six services, every line of copy and the
photography are mine, and the three colours are neighbours of the reference's
rather than copies of them (`#211b18 / #f0e6cc / #e8502b` against its
`#27201d / #fcf2bd / #ff5121`). What was taken is the motion, which is in
[`src/motion/motion.ts`](./src/motion/motion.ts) with its provenance beside
each number.

## How the timings were recovered

The reference is a Webflow site whose custom behaviour ships in one bundle, and
the stack is a single function in it. Reading it took minutes; watching the
thing play and guessing would have taken hours and been wrong.

**1. Find the hooks in the markup.** The section names them:

```bash
curl -sL https://<reference> -o home.html
grep -o 'data-[a-z-]*=""' home.html | sort -u | grep -i 'stack\|card'
# data-media-stack, data-media-stack-pin, data-media-stack-container,
# data-media-stack-item, data-media-stack-gap="30"
```

**2. Find the script that reads them.** The page loads GSAP, ScrollTrigger,
Lenis and Barba from jsDelivr — all stock — plus one bundle of its own. Only
one file mentions the hooks:

```bash
grep -l 'media-stack' *.js        # the site's own bundle, not the libraries
```

**3. Read the function.** Minified is still readable, and every number is a
literal: `gap` off the attribute, `back.inOut(3)` and `power4.in` as GSAP
easing strings, `scrub: 0.5`, and a fly-off of `yPercent: -80, y: "-50vh",
scale: 1.2, rotation: (Math.random() - 0.5) * 50`. The stagger is the one piece
of arithmetic, and it is the whole section:

```js
start: `top top+=${(pin.clientHeight - innerHeight) / items.length * i}`
```

Each card's window is the entire track, shifted **earlier** by a sixth of the
scroll per card. That is why the deck empties from the front: the card nearest
the camera is furthest through an identical timeline.

**4. Only then, check it against the running page.** Headless Chrome at
1440x900, scroll to a position, settle for the scrub, read each card's matrix
back. The same probe pointed at this build gives the same table: across the
whole 600vh track the largest disagreement in any card's `y` is **0.2px**, and
that is this deck being 0.2px taller than the reference's.

| scroll | reference, card y | this build |
|---|---|---|
| p=0.00 | 150, 120, 90, 60, 30, 0 | 150, 120, 90, 60, 30, 0 |
| p=0.04 | 153.6, 123.7, 93.7, 63.7, 33.7, −1.0 | 153.6, 123.7, 93.7, 63.7, 33.7, −0.9 |
| p=0.33 | 87.7, 60, 30, 0, −861.4, −861.4 | 87.7, 60, 30, 0, −861.6, −861.6 |

The 153.6 in the second row is the tell: the resting place is 150, so the deck
overshoots it. That is `back.inOut(3)` and nothing else reproduces it.

## Why it felt like it was falling behind

There are two smoothers in series in this section, and only one of them is the
deck's:

* **Lenis** eases the *page* towards where the wheel has asked it to go;
* **`scrub: 0.5`** eases the *deck* towards wherever the page has got to.

They multiply. The first pass here set Lenis to `duration: 1.05` with a
cubic-out and `wheelMultiplier: 0.9` — chosen by feel, which is the mistake —
and the cards visibly trailed the wheel. The reference does not guess either;
its bundle says

```js
new Lenis({ lerp: 0.165, wheelMultiplier: 1.25 })
```

A `lerp` is a fraction of the remaining distance per frame, not a duration: it
is most of the way there in five frames, where a 1.05s ease is still arriving
a second later. The multiplier is the other half — 1.25 against 0.9 is 39% more
page per notch.

Measured the same way in both, with forty synthetic wheel notches 60ms apart
and then a wait:

| | page still coasting when the wheel stops | p99 frame | frames over 33ms |
|---|---|---|---|
| first pass (duration 1.05, x0.9) | 304px | 21.4ms | 2 / 800 |
| matched to the reference | 108px | 14.4ms | 1 / 731 |
| the reference itself | 54px | 49.7ms | 18 / 913 |

The remaining gap between 108 and 54 is the reference dropping frames: a
frame-rate-independent lerp covers more ground per frame when the frames are
127ms long. Per frame, this build is the steadier of the two — it is a section,
not a whole site with a background video on it.

## What the geometry has to be

The fly-off is `yPercent: -80` **plus** `y: "-50vh"`, so how far a card travels
depends on how big the card is. The reference's deck is 60% of a half-width
container capped at 30rem — 411x514 on a 1440 viewport — and the same chain is
in [`Stage.tsx`](./src/components/Stage.tsx) for that reason. Build the deck
narrower and the cards stop short of the top of the screen on the way out.

`perspective: 25vw` belongs to the list, not to the cards: one camera for all
six, so a card moving 30px towards it grows by an amount the geometry decides.

## The card leaving has to stay on top

A card peels off the front of the deck, and it must be painted above the one
arriving behind it for the whole flight. The first pass here flipped them
mid-hand-over — the departing card ducked behind, then snapped back in front.

The cause is two lines apart. The stepping tween eases with `back.inOut(3)`,
which overshoots at both ends, and it moves `z` as well as `y` — so the
arriving card's z does not settle onto 0, it goes **past** it to about +4 before
coming back. Give the deck `transform-style: preserve-3d` and the browser
depth-sorts the children: for those few frames the arriving card is nearer the
camera than the departing one at z = 0, and it wins.

The reference's stylesheet contains **no `transform-style` at all**. Flat
children are painted in document order, which is why its departing card stays in
front no matter what its z is doing. That absence is load-bearing, and this
build copies it: `.deck` sets `perspective` and nothing else. The translateZ
still scales the cards — perspective applies to children regardless — it just
no longer reorders them.

Asked directly, with `elementFromPoint` at the overlap of the two cards while
stepping through a hand-over:

| scroll | arriving card z | with `preserve-3d` | flat (both builds) |
|---|---|---|---|
| p=0.099 | −2 | FLYER | FLYER |
| p=0.113 | **+3** | next | FLYER |
| p=0.128 | **+4** | next | FLYER |
| p=0.142 | +2 | next | FLYER |

The reference reports `FLYER` at every one of those samples, with the same z
overshoot. It is not avoiding the overshoot; it is simply not sorting by it.

## The bug worth keeping

The deck's triggers are built in a layout effect, against a track element that
belongs to an **ancestor** component. React attaches host refs in the same
bottom-up pass that runs layout effects, so on mount the child's effect saw
`trackRef.current === null`, returned early, and built nothing. Nothing warned:
the cards sat in the opening frame the stylesheet gives them, looking
deliberate, and only `ScrollTrigger.getAll().length === 0` gave it away. The
track is passed down as state set from a callback ref instead — see the comment
in `Stage.tsx`.

## Reduced motion

The reference does not shorten this section for `prefers-reduced-motion`; it
replaces it. No stack, no perspective, no transforms — one card at a time,
swapped at `Math.floor(progress * 6)`. This build does the same, and also drops
the track from 600vh to the content's own height, because six screens of scroll
to see six cards is itself the thing being asked about.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
