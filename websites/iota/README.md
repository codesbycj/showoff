# IOTA

A one-page site for a fictional architecture studio, built to get two pieces of motion
right: a loading sequence that spells the studio's name, and a scroll that holds the
screen still while five panels travel across it.

IOTA is invented — the studio, the projects, the addresses and the press notes are all
made up. The motion is modelled on how contemporary architecture-studio sites behave;
none of their content, images or type are used here.

```bash
npm install
npm run dev          # http://localhost:5180 — add /?skip to jump past the loader
```

Or from the repository root, without changing directory:

```bash
npm run install:iota
npm run dev:iota
```

| | |
|---|---|
| `npm run build` | type-check and bundle to `dist/` |
| `npm run typecheck` | types only |
| `npm run lint` | ESLint, including the React hooks rules |
| `npm run format` | Prettier, with the Tailwind class sorter |

React 19 · Vite 8 · Tailwind 4 · GSAP 3 · Lenis · TypeScript 5.9

**Scope is the home page and its loading sequence, nothing else.** There is no router
and no second page. The menu button in the header is rendered and disabled, because a
header looks wrong without one and a button that silently does nothing looks broken.

---

## The loading sequence

IOTA is an acronym, so the load spells it out. Four capitals fade up, the rest of each
word slides out from behind them, the block parts down the middle, and a photograph
grows through the gap until it fills the screen. About eight seconds.

Two bits of structure make it work, and neither is visible from watching:

- **Each word is already at its full width in the first frame.** The tail of each word
  sits parked off to the left inside a box that hides anything sticking out. Nothing
  jumps when the tails arrive, because they were always there. The capitals only *look*
  centred because the whole block is nudged right to start with, then slides back.
- **The two columns sit stacked on top of each other**, which is why the four words read
  as one block before they split. The split moves them sideways from there, so you get a
  diagonal rather than a neat mirror.

`src/sections/Preloader.tsx`

## The pinned rail

The rail does not come after the hero — it comes over it. The section pins, the hero
fades back over the first fraction of the scroll, and five market panels slide
right-to-left across a screen that is not moving. The page carries on below once the
last one has passed.

Pinning is not free: it adds about 4,300px to the page, because that scroll has to come
from somewhere. The budget is set in one place, `scrubDistancePerPanel`, so adding a
sixth market makes the pin longer rather than making the rail faster.

`src/sections/ShowcaseStage.tsx`

---

## Layout

```
src/
  motion/          every timing, and the machinery that runs it
  components/ui/   Reveal, RevealImage, Eyebrow, PlusButton, ArrowLink
  components/layout/  Header, Footer, Wordmark
  sections/        one file per band of the page
  data/home.ts     every word and picture on the page
  styles/index.css design tokens and the four scroll-in recipes
```

Sections are assembly. No section hard-codes a sentence and no component imports a
photograph, so changing the studio, the markets or the project list is an edit to
`data/home.ts` and nothing else.

**Timings all live in `src/motion/motion.ts`.** Spreading them across twelve files is
how you end up unable to answer "was that 0.6 or 0.8?" without measuring again.

**Reveals are CSS, triggered by JavaScript.** An element carries a `data-reveal`
attribute and nothing more; the transition is in the stylesheet. One shared
IntersectionObserver watches the whole page, staggers whatever arrives together, and
stops watching an element the moment it has played.

---

## Four things that cost real time

None of these produce an error message, which is why they are written down.

**In GSAP, a number means an absolute time, not an offset.** `"-=0.3"` overlaps the
previous step; `-0.3` pins it to a negative time, which clamps to zero. Get it wrong and
every step fires at once — an eight-second sequence plays in under two, silently. The
`rel()` helper exists to stop that happening twice.

**Something hidden by its own `clip-path` can never be revealed by an
IntersectionObserver.** The observer measures what is visible *after* clipping, so a
fully clipped element always reports zero and never crosses the threshold. It waits
forever for an observer that cannot see it. The text-wipe reveal uses an
`overflow: hidden` mask instead.

**Headless Chrome asks for reduced motion by default.** Every automated screenshot of
this page captured the reduced-motion fallback until the browser was told otherwise. If
a site looks oddly static in CI, check that first.

**Working out a breakpoint inside `gsap.matchMedia()` is circular** when it decides the
markup the pin needs. The pinned rail and the plain strip are different elements, so the
pin looked for something that only existed once the pin had decided to exist, found
nothing, and quietly did nothing. `useMediaQuery` answers on the first render instead.

---

## Reduced motion, small screens

`prefers-reduced-motion: reduce` skips the loading sequence, drops smooth scrolling so
the browser's own takes over, unpins the rail into an ordinary sideways scroller, and
lands every reveal at its finished state. A pinned section and an eight-second loader
are exactly what that setting is for.

Below 768px the rail does the same, because turning a downward swipe into sideways
movement fights the gesture the finger is already making.

Photography is free-licensed and credited in `src/assets/images/CREDITS.md`. The type is
Schibsted Grotesk.
