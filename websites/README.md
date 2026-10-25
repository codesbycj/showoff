# websites — the before / after series

> **This series is closed at episode 10.** No new episodes: the slot has moved to
> [`dashboards/`](../dashboards), which is one dashboard design per episode, built as a
> working three-tab app and filmed by using it. Everything below still stands for the ten
> episodes that exist — they build, they run, and rule 0 is still the reason six of them
> had to be redone. Episode 3 remains unbuildable for the reason given below, and episode
> 11's unused angle (the accessibility retrofit) is left on the table.

One folder per **episode**. An episode is one business shown twice: the site as it was
before CJ got to it, and the site after. A control crossfades between them. That is the
whole format and there is nothing else in this directory.

| Folder | Episode | The before's angle | Built with |
|---|---|---|---|
| [`ember/`](./ember) | 1 — ember health, red light therapy | The 2012 brochure | React 19 · Vite 8 · Tailwind 4 · GSAP · Swiper |
| [`rook/`](./rook) | 2 — rook, a furniture brand | The congested directory | React 19 · Vite 8 · Tailwind 4 · **after rebuilt to rule 0** |
| [`verge/`](./verge) | 3 — verge, an employee commute scheme | The template clash | React 19 · Vite 8 · Tailwind 4 (no tween library) |
| [`mara/`](./mara) | 5 — Mara Atelier, cosmetics | The abandoned refresh | React 19 · Vite 8 · Tailwind 4 · **after rebuilt to rule 0** |
| [`mise/`](./mise) | 6 — mise, restaurant operations software | The over-animated | React 19 · Vite 8 · Tailwind 4 · **after rebuilt to rule 0** |
| [`tare/`](./tare) | 7 — tare, accountants for freelance creatives | The whole page is a JPEG | React 19 · Vite 8 · Tailwind 4 · **after rebuilt to rule 0** |
| [`quay/`](./quay) | 8 — quay, student accommodation | The content-managed sprawl | React 19 · Vite 8 · Tailwind 4 · Lenis · **built to rule 0** |
| [`vane/`](./vane) | 9 — vane, carbon accounting software | The conversion-optimised | React 19 · Vite 8 · Tailwind 4 · **built to rule 0** |
| [`crux/`](./crux) | 10 — crux, a critical-thinking app | The agency portfolio piece | React 19 · Vite 8 · Tailwind 4 · **built to rule 0** |

```bash
cd websites/ember && npm install && npm run dev     # http://localhost:5216
cd websites/rook  && npm install && npm run dev     # http://localhost:5220
cd websites/verge && npm install && npm run dev     # http://localhost:5224
cd websites/mara  && npm install && npm run dev     # http://localhost:5232
cd websites/mise  && npm install && npm run dev     # http://localhost:5236
cd websites/tare  && npm install && npm run dev     # http://localhost:5240
cd websites/quay  && npm install && npm run dev     # http://localhost:5244
cd websites/vane  && npm install && npm run dev     # http://localhost:5248
cd websites/crux  && npm install && npm run dev     # http://localhost:5252
```

From the repository root, `npm run dev:<slug>` and `npm run build:<slug>` do the same thing
without the `cd`.

**Episodes 2, 5, 6 and 7 have been rebuilt to rule 0.** They were first built as original
designs that had merely been *measured against* their references, which is not the brief.
Episode 4 was dropped. Each rebuild replaces its episode in place; there is no archive of
the superseded versions.

**Episode 3 cannot be rebuilt at the moment.** Its reference serves every photograph from
a BunnyCDN pull zone that is currently **unconfigured** — every image URL returns a 403
with BunnyCDN's own "unconfigured node" page, for the reference's own browser as much as
for ours (`imgsDecoded: 0` on its live home page). The layout, type, palette, SVG shapes
and motion are all readable and measured; the photography does not exist to copy. Rule 0
has no answer for a reference whose images are down, so the episode waits rather than
inventing six pictures.

[`tools/`](./tools) holds the five scripts every episode is checked with — `pageshot.js`
to photograph a page in bands, `probe.js` to measure it, `hovers.js` to photograph every
hover as a rest/hover pair, `dump.js` to survey a reference once into files you can read
offline, `assets.js` to download every image it paints, and `eval.js` to ask a page a
one-off question. They talk to headless Chrome over CDP with no dependencies.
See [`tools/README.md`](./tools/README.md), which also records the two template-literal
traps in `probe.js` that cost a debugging round each.

**Install from inside the folder**, with a plain `npm install`. `npm --prefix
websites/<slug> install` run from the repository root writes `"showoff": "file:../.."`
into that episode's `package.json` and symlinks the Expo project into its `node_modules`
— exactly the coupling this directory exists to prevent. The `dev:` and `build:`
passthroughs are fine; it is only `install:` that does it, which is why no episode has an
`install:` script.

Each episode pins its own port with `strictPort`, four apart: episode 1 is 5216, episode 2
is 5220. Starting one while it is already running then fails loudly instead of quietly
moving to the next free port and leaving every screenshot tool pointed at the wrong site.

---

# The rules

Everything below is a rule, not a suggestion. All of it was learned by getting it wrong
once.

## 0. THE BRIEF. Read this before anything else.

**The after is a pixel-perfect rebuild of the reference site. The only thing that changes
is the words.**

Not "inspired by". Not "the same spirit". Not "I took its measured timings and designed my
own page with them". A rebuild. Open the reference and the build side by side at the same
viewport and they are the same website with different text in it.

What is copied, exactly:

- **the images** — the reference's own photographs, renders, illustrations and SVGs,
  downloaded and bundled;
- **the arrangement** — section order, column counts, grid, spacing, type scale, every
  block in the same place at the same size;
- **the colours** — its palette, read off its stylesheet, not a palette chosen to be
  "distinct from the last episode";
- **the typefaces** — its own if they are free, the closest free substitute named in the
  README if they are not;
- **the animation** — every entrance, every scroll trigger, every marquee, every carousel,
  at its measured durations and easings;
- **the hover effects** — all of them, photographed as proof (rule 5).

What changes:

- **the copy.** Brand name, headlines, body, product names, prices, labels, legal line.
  Invented, so the build is not a clone of a real company's site pretending to be live.

That is the whole list. If something is in the reference and not in the build, it is a
defect, not a design decision — and it goes in "Declared departures" with the reason.

**This went wrong once, expensively.** Episode 1 was built this way and is right. Episodes
2–7 were then built as *original designs that had merely been measured against* their
references: new palettes, new layouts, new photography, invented sections, animations
thrown away. Six episodes had to be redone. The symptom to watch for in yourself is
reaching for a sentence like "deliberately not the reference's forest-green-and-orange" or
"the pattern follows the content, not the previous episode" — those are the sentences of
somebody designing instead of rebuilding.

The series is a **private study**: the builds are not deployed, not published and not
passed off as anyone's site. That is what makes using the reference's own assets the right
call rather than a risk, and it is why the invented copy matters — the page must never be
able to masquerade as the real company's.

The *before* is still invented: a bad version of the same business, built by me, under
rule 3. Only the after is a rebuild.

## 1. The shape of an episode

```
websites/<slug>/
  src/content/site.ts   ONE content deck — brand, copy, photographs, prices.
                        Both designs read it, so the comparison is of design and
                        nothing else.
  src/before/           its own components, its own stylesheet, its own type scale
  src/after/            a pixel-perfect rebuild of the reference (rule 0)
  src/compare/Toggle.tsx  the control, which belongs to neither design
  src/motion/motion.ts  every timing in the episode, with where it came from
  src/App.tsx           both pages mounted and stacked, and the crossfade
  README.md             the diagnosis (see rule 9)
  src/assets/img/CREDITS.md
```

One deck is the point. If a photograph, a price or a line of copy differs between the two
designs, the episode is no longer comparing designs — it is comparing content, and the
viewer cannot tell which they are reacting to.

What a design is allowed to decide for itself lives in that design's components: the
order of the blocks, what it emphasises, what it leaves out, how many of a list it shows.
What is *content* lives in the deck.

## 2. The caption is "Before CJ" and "After CJ". No timeline.

Not "Before 2012 / After 2026". Not a progress bar, not a year, not a slider with a
handle. Two labels and a thumb.

A date invites an argument about the date, and implies the only difference is that time
passed. Naming the person puts the work in the frame — and it frees the before to be any
kind of bad rather than specifically an *old* kind, which rule 3 depends on.

## 3. The before: a different kind of bad every episode

The before is a genuinely bad website. Ugly, congested, shabby — and **a different one
each episode**, because a series that ships the same before twice is a series with one
idea in it.

Pick an angle from this list, name it in the episode's README, and commit to it. Do not
blend two:

| Angle | What it is | What it does to the visitor |
|---|---|---|
| **The 2012 brochure** | Fixed 960px, floats, a jQuery carousel, bevelled buttons, a sidebar of boxes, a hit counter | Pans sideways on a phone; 105 characters a line |
| **The template clash** | A bought theme with three typefaces, a stock hero with nothing to do with the business, five CTAs in five styles | Nothing is primary, so nothing is clicked |
| **The congested directory** | Everything above the fold: forty links, two sidebars, tables inside tables, 10px type | No hierarchy at all; the eye has nowhere to land |
| **The DIY builder page** | Centred everything, huge drop shadows, clip-art icons, gradients on every surface, an autoplaying video | Looks untrustworthy, which is fatal for anything that takes payment |
| **The abandoned refresh** | A half-finished flat redesign: broken responsive breakpoints, placeholder text still in, images at the wrong aspect ratios | Reads as a company that has stopped caring |
| **The whole page is a JPEG** | Every heading is an image, the menu is a PDF, the type is unreadable at any size | Nothing selectable, nothing searchable, nothing accessible |
| **The over-animated** | Marquees, blinking text, a 2-second carousel, parallax that stutters, hovers that shift the layout | Cannot be read while it is moving |

Spent so far: **1** the 2012 brochure, **2** the congested directory, **3** the template
clash, **4** the DIY builder page, **5** the abandoned refresh, **6** the over-animated,
**7** the whole page is a JPEG, **8** the content-managed sprawl, **9** the
conversion-optimised, **10** the agency portfolio piece. **The list is now empty again.**
Episode 11 needs a new angle written into this table before it is built — repeating one is
the thing this rule exists to prevent.

Two of the seven turned out to be worth more than the rest, and for the same reason: the
over-animated and the page-of-JPEGs were both *expensive*. Somebody cared, somebody signed
them off, and they are still unusable. An angle where the before is obviously cheap lets
the viewer off; an angle where it was clearly paid for does not.

Episodes 8, 9 and 10 took three of the four candidates that were listed here. The one
left, and still unused: **the accessibility retrofit** — a widget bolted on in place of
fixing anything, with a floating blue person icon. Episode 11 needs that one or a new one.

The three that were spent, and why each went to the business it did. The angle has to be
plausible *for that company*, which is most of the choice:

| Angle | Episode | Why it is plausible there |
|---|---|---|
| **The content-managed sprawl** | 8, student accommodation | Nine intakes of pages nobody deleted, four navigations that grew one at a time |
| **The conversion-optimised** | 9, B2B climate software | Every block A/B-tested into a different voice — the reference literally runs AB Tasty |
| **The agency portfolio piece** | 10, a consumer learning app | Beautiful, award-shaped, and after a full screen you still cannot say what it does |

Two guardrails, and only two:

- **It has to be plausible.** Someone paid for it. A real business has this site right
  now. Lorem ipsum, a joke in the copy, or a layout nobody ever shipped breaks the spell
  and makes the comparison worthless — the viewer stops believing the before and stops
  crediting the after.
- **It has to carry the same content.** Every price, every photograph, every claim the
  after makes, the before makes too. It is allowed to bury them, crowd them, set them at
  10px, or put them below four other things. It is not allowed to leave them out.

Everything else is fair game. Comic Sans is fair game now; so are a tiled background, a
visitor counter, a `<marquee>`, 0.3s blink, and a nav with eleven items in it.

**The before is often right about something.** Say so in the README. The 2012 brochure
had the price, the phone number, the opening hours and a last-updated date on the page;
the modern rebuild has none of them. Finding the one thing the bad site did better is
what stops the series being an advert.

## 4. The after: read what it ships before you watch it play

In order. Do not skip to the screenshots.

1. **`curl` the page.** Read the script filenames first — they are usually honest. A
   `<meta name="generator">` is worth reading before anything else: a Webflow site ships
   its behaviour in inline `<script>` blocks and its interactions as IX2 data; a Framer
   site ships its components as a plain ES module with every `duration:` and `ease:`
   sitting in it as a literal.
2. **Read the inline blocks.** Every GSAP call is a literal: `start: 'top 43%'`,
   `once: true`, `power3.out`, `width: '84%'`, `scale: 1.03`, `speed: 800`,
   `delay: 3000`. That is the entire motion specification of the page, free, before a
   single frame is filmed.
3. **Dump the DOM once.** Walk every element that paints and record its box and the
   styles that decide how it looks, to a JSON file. 858 elements for one page, one
   browser round trip, and every subsequent question is answered offline in
   milliseconds. Going back to the browser per question is what makes this take a day.
4. **Grep the stylesheet for `:hover`, then for `transition:`.** See rule 5.
5. **Only now, film it** — and only to confirm what you read.

Record every timing in `src/motion/motion.ts` with its provenance in the comment. The
built app cannot be reverse-engineered back into those numbers later.

## 5. Hovers are half the design. Find all of them.

A page's resting state is what a screenshot shows and what a rebuild copies. Its hovers
are what it feels like, and they are invisible to every method above unless you go
looking. **Every episode does this pass, explicitly, before calling the after done:**

```bash
grep -o "[^{}]*:hover[^{}]*{[^}]*}" site.css | sed 's/^[[:space:]]*//' | sort -u
```

Match loosely. A targeted grep for the selectors you *expect* to have hovers returns
nothing and tells you the page has none, which is how episode 1 nearly shipped with a
flat nav. The loose pattern found eleven rules, four of which mattered.

Then grep for `transition:` and read every declaration on an interactive element. **A
transition is evidence of a hover even when the trigger is not in the CSS**, because
Webflow and Framer put the trigger in interaction data and leave the transition in the
stylesheet. `transition: border-color .6s, padding .6s` on a pill that has no `:hover`
rule means something moves that padding, and the only honest ways to find out what are a
capture of the real page or asking. Do not quietly skip it.

Then build them, and **photograph each one to prove it**: park a real pointer over the
element through CDP (`Input.dispatchMouseEvent` — a synthetic `mouseover` from JS does
not set `:hover`) and capture.

The hover table goes in the episode's README with a source column, like this:

| Element | What happens | Where the number came from |
|---|---|---|
| Category pill | The 20px gradient sphere grows into the whole pill; the label slides left | `transition: border-color .6s, padding .6s`; motion from a capture |
| Nav links | A 1px border fades in, **a different colour per item** | `.nav-link.is-1:hover` … `.is-4:hover`, `transition: border-color .4s` |

Anything inferred rather than read is listed in "Declared departures" as an inference.

## 6. Verify by measuring, not by looking

Shoot your build with the same harness that surveyed the reference, at the same viewport,
and diff the section table: every section's **top and height** in page coordinates.

```
| Section | Reference | This build |
| Hero    | 72 / 828  | 72 / 828   |
```

**Every difference is a mistake until proven to be copy.** In episode 1 the table caught,
in order: a 36px heading that should have been 24, a mono eyebrow that should not have
been mono, a CTA sitting in the wrong section, a statement block with the wrong padding
split, a rail centred by Swiper's own stylesheet, and a hero photograph painting behind
the page. None of those were visible to me in a screenshot; all of them were a number in
the wrong place.

A difference that *is* copy — your FAQ answers five questions where the reference answers
four, your reassurance lines wrap differently — gets said out loud in the README, with
the arithmetic that makes it add up.

**Run the same probe over both designs, and put the table in the README.** From episode 6
the probe reports, per visible pane: CSS animations running at rest and how many are
infinite; elements that replay their entrance on every scroll pass; interactive targets
under 24px and under 44px; every text node's contrast ratio against its computed ground;
selectable characters; images, and how many of them are pictures of text; the h1–h3
outline; and the pane's own content width against the viewport.

Scope it to `[data-pane="..."]` — both designs are mounted, so an unscoped query measures
the hidden one too — and treat a gradient or photographic ground as *no* ratio rather than
a failed one, because the number is different at every pixel.

Its value is not the before's score, which is never a surprise. It is that **it keeps
finding things in my own page**: twenty-four 16px-tall anchors in episode 6, a 93×22 phone
number in episode 7, a grey that failed AA in episode 2. Run it on the after first.

## 7. The traps. Every one of these cost real time.

**Stacking and scrolling, because two full pages are mounted at once:**

- **Never use a negative z-index to put something behind content.** Inside a stacking
  context (and each pane is one, because it is positioned with a z-index) a negative-z
  child paints *below the in-flow backgrounds* of everything in it — so a hero
  photograph at `-z-20` goes behind the page's own background colour and the hero renders
  as an empty card. It still measures correctly and still reports `complete`. Put the
  image first in the DOM and let document order do it.
- **The hidden pane still extends the document's scroll height.** `opacity: 0`,
  `aria-hidden`, `inert` and `visibility: hidden` all leave overflow alone. Clip the
  stack (`overflow: clip`), whose height is already the active page's height, or the
  short design scrolls for the length of the long one.
- **Map the scroll position proportionally across the swap**, not absolutely. The two
  designs are different heights — that is half the point — so carrying `scrollY` lands
  you past the end of the shorter one.
- **Neither page may run an unconditional rAF loop or autoplay a video**, because the
  hidden one is still live. The hidden side pauses its video and stops its ticker.

**Harness and measurement:**

- `Page.captureScreenshot`'s `clip` is in **page** coordinates, not viewport ones. Pass
  the rect plus `scrollY`, with `captureBeyondViewport: true`, or every clipped shot
  after a scroll comes back as a band of empty background.
- **Scroll first, then measure.** Measuring in the same expression that calls
  `scrollIntoView` returns the pre-scroll rect.
- **The page opens on the before.** Any harness that photographs the after has to click
  the toggle first and wait out the crossfade, or it captures a transparent, inert page
  and you spend twenty minutes debugging a layout that is fine.
- **The first capture after a server start is pre-hydration.** Shoot twice, read the
  second.

**Build:**

- **Swiper's own stylesheet centres `.swiper` with auto side margins.** A rail that is
  meant to sit flush left with the next slide overhanging the right edge will quietly
  centre itself and lose the overhang that tells you it is a rail.
- **Never read a ref during render** to size a transition (`panelRef.current?.scrollHeight`
  in a style prop). It lints, and the first open animates to whatever the height was last
  time. Measure into state with a ResizeObserver.
- **A substitute typeface runs 10–15% wider at matched cap height.** Choose per element
  which to match and say which. Episode 1's hero headline keeps 72px and loses 24px of
  padding, because one line is the composition.
- **Run prettier before asserting on a string you are about to patch.** A `.replace()`
  with no assertion silently does nothing after prettier has reordered a class list, and
  the change is reported as applied.

## 8. Reduced motion switches things off, and leaves them reachable

`prefers-reduced-motion: reduce` is not a shorter duration. Entrances do not play,
counters render at their final values, carousels are not initialised.

**And then check what that leaves behind.** An uninitialised Swiper is ten slides in a
flex row with nine of them clipped and no way to reach them — the setting turned a
carousel into a dead end. It becomes a scroll-snap rail with working buttons instead.
Whatever you switch off, open the page with the setting on and try to use it.

## 9. The README is a diagnosis, not a changelog

For each change: what the before does, what it costs the visitor, and what the after does
instead — **with the number that justifies it**. Contrast ratio, tap-target size, line
length in characters, bytes on the wire, how far the eye travels, how many screens of
scrolling.

Measure those numbers; do not assert them. And measure them on *both* sides: in episode 1
the modern page's body copy is 3.9:1 and its section labels are 1.9:1, against the 2012
page's small print at 3.8:1. The redesign did not fix the contrast problem, it inherited
it and made it bigger — which is the most interesting line in that README and it would
not exist if the after had been assumed to win.

Also in the README: how the after was measured, what the measurement caught, the hover
table, the reduced-motion behaviour, and **Declared departures** — every place the build
differs from the reference, with the reason.

## 10. Assets: the reference's own, bundled and credited

**Download the reference's images and use them.** Rule 0: the images do not change. A
photograph swapped for a stock lookalike is the fastest way to turn a rebuild into a
tribute, because the photograph is usually where the art direction lives — the crop, the
colour, the grade, what is in frame.

```bash
# every image the page actually paints, from the DOM dump rather than the HTML:
# <img src>, <img srcset>, <source>, every computed background-image, every <use href>
node tools/assets.js http://reference.example/ ./src/assets/img
```

Take them at the largest size the page offers (the last entry in a `srcset`), keep the
format the site serves unless it is wasteful, and re-encode only to save bytes — never to
re-crop, recolour or "improve" one.

- `src/assets/img/CREDITS.md` names every file, the URL it came from, and the reference
  site; and states plainly that the build is a private study, not deployed, with invented
  copy.
- **Inline SVG stays SVG.** A logo, an icon set or a drawn illustration is copied as path
  data, not screenshotted. Episode 4's reference draws its badge in SVG; rasterising it
  would have lost it at every size but one.
- **Fonts**: the reference's own where they are free-licensed. Where they are not, name
  the closest free substitute in the README and expect it to run 10–15% wider at matched
  cap height. Do not pick a "fresh" pairing to distinguish the episode — the episodes are
  distinguished by their references.
- Nothing hotlinked. Nothing unused shipped.

**The brand marks are the exception, and they are replaced.** The reference's wordmark,
logo and any copy that names the real company come out, because the copy is invented
(rule 0) and a page carrying a real company's mark with invented prices on it is the one
thing this series must never produce. Draw the invented brand's mark in the same idiom,
at the same size, in the same place.

## 11. The done-gate

An episode is finished when all of these pass:

1. `npx tsc -b --noEmit` clean.
2. `npx eslint src --ext .ts,.tsx` clean.
3. `npx prettier --check "src/**/*.{ts,tsx,css}"` clean.
4. `npm run build` succeeds.
5. The section table matches the reference, or every difference is explained in the
   README as copy.
5b. **Side by side at 1440, the reference and the build are the same page.** Shoot both,
   band for band, and put the pairs next to each other. This is the check rule 0 exists
   for and it is the one that was skipped six times: every other check in this list
   passed on all six of the episodes that had to be redone.
6. The hover pass of rule 5 is done, each hover photographed.
7. The page renders at 390 and at 1440 with no horizontal scroll at either.
8. Reduced motion is on, and the page is still usable.
9. Both designs photographed end to end, and looked at — the measurement does not catch
   a wrong photograph in the wrong row.
10. Registered: the table at the top of this file, and `dev:`/`build:` in the root
    `package.json`.

## Starting an episode

```bash
cp -r ember <slug> && cd <slug>
rm -rf node_modules dist src/assets/img/* src/before/* src/after/*
npm install
```

Keep `src/App.tsx`, `src/compare/Toggle.tsx` and `src/motion/useReveal.ts` — the stack,
the crossfade, the scroll mapping and the observer are the same every time. Change the
port in `vite.config.ts` and the name in `package.json`. Then start at rule 4.
