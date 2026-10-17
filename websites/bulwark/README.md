# BULWARK — a motion study of huyml.co

Two pieces of motion, rebuilt: a **loading screen whose black wall is shoved
across the viewport by a figure braced against it**, and a **wheel-driven 3D
collage** where the current project faces the camera and the rest sweep past it
on a diagonal.

> **This is a private study and is not to be deployed.** It uses the reference
> site's own imagery, project names and copy — a declared exception to the rule
> in `websites/README.md`, following `switchblade/`. See
> [`src/assets/images/CREDITS.md`](src/assets/images/CREDITS.md) for what that
> covers and why. Replace that folder and `src/data/projects.ts` before this
> goes anywhere public.

```bash
npm install
npm run dev          # http://localhost:5204 — add /?skip to jump past the loader
```

Or from the repository root, without changing directory:

```bash
npm run dev:bulwark
npm run build:bulwark
```

> Install from **inside this folder**. `npm --prefix websites/bulwark install`
> run from the repository root writes `"showoff": "file:../.."` into this
> `package.json` and symlinks the Expo project into `node_modules`.

| | |
|---|---|
| `npm run build` | type-check and bundle to `dist/` |
| `npm run typecheck` | types only |
| `npm run lint` | ESLint, including the React hooks rules |
| `npm run format` | Prettier, with the Tailwind class sorter |

React 19 · Vite 8 · Tailwind 4 · GSAP 3 · TypeScript 5.9

**Scope is the home page and its loading sequence.** There is no router and no
second page; the menu is markup with real `href`s to anchors that do not exist
yet, which is what a one-page study of a four-page site honestly is.

---

## Getting the numbers out of the reference

The reference is a [Framer](https://framer.com) site, and a Framer site ships
its own component code as a plain ES module. Most of this build was read rather
than watched:

```bash
curl -sL https://<site> -o index.html

# 1. The page names its own stack. One module, and the chunks it imports.
grep -oE '<script[^>]*src="[^"]+"' index.html

# 2. The two numbers that set the whole site's pace are in the inline CSS.
grep -oE 'transition:[^;"}]+' index.html | sort | uniq -c | sort -rn
grep -oE 'cubic-bezier\([^)]*\)' index.html | sort | uniq -c | sort -rn

# 3. The site's own GSAP timelines are in script_main.*.mjs, in the clear.
curl -sL '<...>/script_main.<hash>.mjs' -o main.mjs
grep -oE 'duration:[0-9.]+|ease:`[a-z0-9.]+`' main.mjs | sort | uniq -c

# 4. The inline snippets are NOT minified, and carry whole behaviours.
#    This is where the scroll model turned out to live.
grep -oE '<!-- Snippet: [A-Za-z0-9_-]+ -->' index.html

# 5. And the CMS payload -- names, copy, dates, per-record colours -- is
#    embedded in the page as a pointer table. Slice it between slugs.
grep -oE ',"[a-z0-9-]{3,30}",\{"type":9,' index.html | head
```

Two curves carry the entire site — `cubic-bezier(0.22, 1, 0.36, 1)` 25 times
and `cubic-bezier(0.22, 0.61, 0.36, 1)` 12 — and four transition durations
account for nearly every one of them. Every value marked **read** in
[`src/motion/motion.ts`](src/motion/motion.ts) came out this way, with the
minified identifier quoted beside it so the claim can be checked.

### What could not be read, and what was done instead

**The loading screen is drawn into a WebGL canvas.** Its choreography is not in
the shipped JS, and headless Chrome paints the canvas black, so filming it
gives nothing either. Three things were still recoverable:

- **Its DOM skeleton**, by probing the live page over CDP rather than
  screenshotting it. The loader is a white ground, a 580×422 centred block of
  display type, a black panel, a travelling figure and a zero-width counter
  pinned at the right edge, mid-height. That is the structure this build has.
- **Its geometry and colour**, measured off two stills with PIL.
- **Nothing about its timing.** The seconds in `LOAD` are mine and are marked
  **chosen**.

The measurements are worth repeating because two of them are structural rather
than decorative:

| | frame A | frame B |
|---|---|---|
| wall edge | 0.5744 of the width | 0.3614 |
| figure's hand to the wall | 4px | 4px |

The edge is **vertical to the pixel**, sampled at the top, middle and bottom of
both frames — a straight-edged panel, not a shaped wipe. And the hand-to-wall
gap is **identical at two completely different edge positions**, which means
the figure is not walking and being caught up with. It is welded to the edge
and carried by it. In this build that is why `--wall` is the only thing
animated horizontally and the figure's offset is a constant: the relationship
the stills prove cannot drift, because there is nothing for it to drift
against.

The red is `rgb(255, 73, 73)` flat, with no second shade in either frame.

---

## The loading sequence

About 5.4 seconds. A white screen with `HOLD FAST` set large in red; a figure
walks in from the right, plants both hands on a black wall and shoves it across
the screen in four goes until the screen is black; then the whole sheet carries
on left and the home is behind it.

Three decisions are load-bearing, and none are visible from watching it:

- **The push is four shoves, not one glide.** A still cannot tell you which it
  was. But a figure braced with both arms locked is a drawing of someone
  applying force in bursts, and a single eased sweep makes that drawing
  meaningless — the wall would be moving under its own power with a figure
  merely attached to it. Each shove is `power4.out`, so it leaves fast and dies
  slowly, and the figure compresses into it and recovers between.

- **The squash scales about the figure's right edge.** `transform-origin: 100%
  50%`, so the body compresses away from the wall while the palms stay welded
  to it. About the centre — the obvious default — the hands slide off the wall
  on every shove, and the whole conceit goes with them.

- **The sheet leaves, not the wall.** The obvious ending is to keep the wall
  moving left past zero. It is wrong: what is behind the wall is this screen's
  own white ground and red word, so the sequence would end by revealing the
  thing it just spent five seconds covering up. Moving the whole loader takes
  the ground with it, and the only thing underneath is the page. This was a
  real bug, caught by filming the build rather than reasoning about it.

The counter at the right edge is computed from the wall's position rather than
tweened alongside it, so it cannot disagree with what it is reporting.

## The entrance

The home resolves in five groups — the studio's own details, the navigation, the
corners, the plate, the index — each group staggering its own items and each
starting *before* the one before it has finished. That overlap is the whole
character of it, and it is the one timeline in the reference that is fully
legible in the bundle, so it is reproduced rather than approximated:

```
fr(n) = G + max(0, n - 1) * K      a group of n items takes this long
pr(n) = max(0, fr(n) - Tr)         ...and the next one starts after this
G = 0.7   K = 0.08   Tr = 0.6
```

Run end to end, five groups would take about 5 seconds. Overlapped by 0.6 each,
they come in at about 1.6 and read as one wash rather than five reveals. Every
item travels `opacity 0 → 1`, `blur(12px) → 0`, `y 18 → 0` on `power2.out`; the
blur is the part that would be missed by watching rather than reading.

**`clearProps` is not used to finish it, and that is deliberate.** The reference
ends these tweens with `clearProps: 'willChange,filter'`, which is correct *for
the reference*, because its items start from an inline `gsap.set` and clearing
the inline value leaves nothing behind. This build holds the opening frame in a
stylesheet rule instead — `.cascade-item` carries `filter: blur(12px)` so the
very first painted frame is already hidden — and against that, clearing the
inline `blur(0px)` drops the element straight back onto the rule. Each group
sharpened and then snapped back as it completed, leaving the entire home
permanently out of focus with nothing in the console.

Copying a cleanup verbatim is only safe when the thing being cleaned up got
there the same way. Here the end state is written explicitly instead
(`filter: none`, `will-change: auto`), which beats the class and still leaves no
filter forcing a compositing layer for the session.

The bug survived a first round of checking because the two capture paths that
looked sharp — `?skip` and reduced motion — both take a *different* branch that
writes `filter: none` inline, and in the films of the loader the blurred frames
at the end read plausibly as "the cascade is still running". The check that
actually catches it is a measurement of the **settled** state: mean absolute
horizontal gradient over the finished frame, against the `?skip` render as a
known-good reference. Settled now measures 1.473 against `?skip`'s 1.464.

## The collage

The home does not scroll. The reference's own `document.scrollHeight` is exactly
one viewport and the hero is a full-bleed WebGL canvas, so all movement comes
from wheel events.

**The scroll model is not in the compiled bundle.** It is in a plain, unminified
`<!-- Snippet: ... -->` script at the foot of the page, under the key
`__universalSmoothScrollV1`, with its settings written out as an object literal:
`wheelMultiplier: 1.15`, `easing: 0.075`, `maxDelta: 240`, `stopThreshold: 0.2`.
An earlier revision of this build used `0.25` / `0.12` taken from a *different*
component in the bundle — a draggable card stack — which are not the page's
scroll model at all. A Framer page's inline snippets are as much its spec as the
module is, and they are easier to read.

The `0.075` is converted rather than copied: it is a per-frame constant written
for 60Hz, and left alone the page converges 2.4x faster on a 144Hz screen for no
reason anybody chose. [`src/lib/damp.ts`](src/lib/damp.ts) turns it into the
148ms half-life it encodes.

### Which way the diagonal runs

The collage is drawn into a canvas, so none of its geometry is in the DOM and
headless Chrome renders it black — the plates in the page's markup are nineteen
30x30 preload thumbnails parked off-screen at `x = -56`. The arrangement was
measured off the two home stills instead, and **the first pass had the diagonal
backwards.**

The tell is in the index column rather than in the collage. With FROMANOTHER
centred the column reads DAFI / DISTRICT2 / FROMANOTHER / IVENTIONS / WON J. YOU
top to bottom — CMS indices 1, 0, 18, 17, 16, descending and wrapping past zero.
So DISTRICT2 is the *previous* project. And DISTRICT2 is the plate at the
**upper right** in both stills. The previous project therefore recedes up and
away; the next one arrives large and near from the lower left. Scrolling forward
flies the plates up the diagonal into the distance.

One value is genuinely read: `perspective: 1200px`, off the only element in the
reference's DOM that carries one.

### How it is driven

Every plate carries a static `--i` — its slot on the diagonal — and the page root
carries `--pos`, written once a frame. The whole transform is a `calc()` off
`(var(--i) - var(--pos))`, so nineteen plates interpolate from one custom
property and React never re-renders to animate. The index column is positioned
the same way, because a circular list has no single track to translate: slot and
project stop being the same thing once the list repeats.

Slots are **unwrapped** — they run negative and past nineteen — and the project
at a slot is `slot mod 19`. Wrapping the slot instead would make the plate at
index 0 jump the whole length of the diagonal every time the list passed the
end.

### The index column

Two measurements off the home still:

- **Entries sit on a 20vh pitch.** The project names fall at y = 264, 458, 654,
  848 in a 977px frame — gaps of 194, 196, 194, or 0.1993 of the height. The
  blurb is clamped to exactly three lines and given the height of three whether
  it fills them or not; without that the boxes stay on pitch but the *names*
  drift by up to 20px a row, and the names are what the rhythm is read from.
- **The falloff is brutal.** The darkest pixel in each name measured 30, 187 and
  204 at distances 0, 1 and 2 from the centre — about 1.0, 0.24 and 0.16 against
  this ground and ink. Only the centred entry is readable.

That 450ms focus fade also pins the one invented constant in the build.
`UNITS_PER_ENTRY` maps wheel units to projects, and at 300 a single clamped notch
moved 0.77 of a project — faster than the fade could finish, so no entry ever
arrived and the column read as empty the whole time you were scrolling. At 900 a
notch moves 0.31 of a project and each one gets comfortably longer than the fade
it has to complete.

## Why the imagery is the reference's own

An earlier revision of this project did what every other project in `websites/`
does: invented a brand, invented nineteen projects, and generated abstract
plates from each one's palette. It was the wrong call here, and the reason is
specific rather than a matter of taste.

The motion being studied *is* plates of a particular shape and weight sweeping
past a camera on a diagonal, and the arrangement was measured off stills of
these exact plates in these exact positions. With stand-ins there is nothing to
check the geometry against — the first pass had the diagonal running the wrong
way and nothing in the build could have told me.

So this project uses the reference's own images, project names, copy, award
lists and per-project colours, all of which come out of the Framer CMS payload
embedded in its page. That is a declared exception, following `switchblade/`,
and it is what makes this a private study rather than something to deploy. See
[`src/assets/images/CREDITS.md`](src/assets/images/CREDITS.md).

The figure in the loading screen is still drawn here rather than taken. What is
kept from the reference's illustration is the *pose*, because the pose is what
that piece of motion is about.

## Accessibility and scope, declared

- **`prefers-reduced-motion`** removes the loading sequence outright rather
  than speeding it up, and drops the plates' focus transition. The collage
  still moves between projects, because that movement is the navigation itself
  rather than decoration.
- **The index is reachable without a wheel.** Arrow and Page keys, and Home,
  drive the same accumulator. `End` is deliberately absent: the list is
  circular, so there is no end to go to.
- **Below 1024px the particulars column is dropped, not reflowed.** The page is
  a 3D collage with columns either side of it, and there is no honest way to fit
  those columns on a narrow screen without making it a different design.
  Everything that block says is also on the centred index entry. This is a
  desktop-first study and says so rather than pretending otherwise.
- **The imagery is not ours.** See the banner at the top and
  [`src/assets/images/CREDITS.md`](src/assets/images/CREDITS.md).
