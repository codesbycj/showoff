# crux — before / after, episode 10

One business, two designs, one content deck, and a control that crossfades between
them.

**crux** is an invented app for thinking clearly: lessons on logic, statistics and
media literacy, written by people, £4.99 a month or £129 once. Everything on both
pages — the brand, the lesson titles, the case study, the four reviews, the prices,
the eight answers — is invented. The photographs are the reference's own and the
brand marks are not (rule 10); see
[`src/assets/img/CREDITS.md`](./src/assets/img/CREDITS.md).

| | |
|---|---|
| **The after** | A pixel-perfect rebuild of <https://reasonal.co/> (rule 0) |
| **The before's angle** | **The agency portfolio piece** — beautiful, award-shaped, and after a full screen you still cannot say what it does |
| **Built with** | React 19 · Vite 8 · Tailwind 4 · TypeScript. No tween library; every movement is CSS |
| **Port** | 5252 (`npm run dev:crux` from the repository root) |

```bash
cd websites/crux && npm install && npm run dev
```

## The reference

A Next.js site on Tailwind 4, and the friendliest reference this series has had.
Everything that matters is in the markup: the palette, the radii, the type scale and
the panel heights are all in its own class strings, so there is nothing to measure
off a screenshot and nothing to guess at. Both of its typefaces are OFL and on
fontsource, so for once nothing is substituted — Archivo and Gabarito in the after
*are* the reference's faces, not approximations.

The page is one idea repeated. A 16px white gutter, and inside it a stack of
32px-radius coloured panels — 900, 776, 776, 388, 816, 576, 576, 514, 1120 and 304
tall. There is no container, no column grid and no twelve-column anything: the
panels are the grid. Eleven of them, in a palette of eight pastels.

Its motion is the one thing that is *not* readable, because it comes from a client
bundle the survey did not fetch. What the survey did get is the **start state** of
every entrance, because Tailwind writes it into the markup:

```html
<div class="... opacity-0 scale-[1.2]">        the hero content
<div class="... opacity-0">                     each cloud
<div class="why-image ... opacity-0 scale-75"> each scattered object
<span class="feat-word inline-block">          one per word
<span class="char inline-block">               one per character
```

So the *shape* of all of it is read and only the duration and easing are inferred.
Those are flagged in [`src/motion/motion.ts`](./src/motion/motion.ts) and in
Declared departures below.

### The dump lied twice, and the photographs caught it both times

This is the lesson of the episode, and it cost a wrong build each time.

`tools/dump.js` records the DOM with every element's computed box. On a Next.js page
that dump can be the **server's** state rather than the hydrated one, and this
reference differs between the two in two places that matter:

1. **The FAQ.** The dump shows all eight rows open, with answer wrappers 88, 112,
   88, 64, 136, 64, 40 and 112 tall — heights that only vary if the text is there.
   So the first build had all eight open, and I lengthened eight answers to make
   the row heights match. The band photographs, taken later in the page's life,
   show **one open row and seven shut ones at a constant 96px pitch**. The server
   renders the accordion with every answer in the markup and the client collapses
   seven of them on mount. Matching the dump made the section 616px too tall and
   the page 8138 instead of 7522.
2. **The header.** The dump has it at `-translate-y-full`, 120px above the top of
   the page, which reads as a header that hides until you have left the hero — and
   that is what the first build did, with a scroll listener. Every one of the
   reference's nine band photographs has the bar in it, *including the one taken at
   the top of the page*. The class is the start of a drop-in entrance that plays
   once. There is no scroll listener on this page at all.

Both were invisible to the section table, because the section table was built from
the same dump. Rule 5b caught both: **photograph the reference and the build side
by side, band for band.** It is the only check in the list that compares the build
to the thing itself rather than to a record of it.

## The after, measured

Shot at 1440×900 with the same harness that surveyed the reference, in nine bands,
and diffed section by section in page coordinates.

| Section | Reference | This build |
|---|---|---|
| Hero | 0 / 900 | 0 / 900 |
| Why | 900 / 776 | 900 / 776 |
| Features A (5 + 7) | 1676 / 776 | 1676 / 776 |
| Features B (7 + 5) | 2452 / 776 | 2452 / 776 |
| Made by humans | 3228 / 388 | 3228 / 388 |
| What is inside | 3616 / 816 | 3616 / 816 |
| Download | 4432 / 576 | 4432 / 576 |
| Misinformation | 5008 / 576 | 5008 / 576 |
| Community | 5584 / 514 | 5584 / 514 |
| FAQ | 6098 / 1120 | 6098 / 1120 |
| Footer | 7218 / 304 | 7218 / 304 |
| **Document** | **7522** | **7522** |

Eleven of eleven exact, and the document height on the nose. No row is explained
away as copy.

### What measuring caught

In the order it caught them, after the two dump errors above:

- **The review cards were 7px short**, which is the kind of number that is never a
  coincidence. Two causes in one card: the quotation is 20px on a **28px** line
  (I had 26) and the attribution is 14px on an **18px** line (I had the font's
  default, 21). The card's height is set by the tallest quotation plus the
  attribution, so both errors landed in the same 7px.
- **The copyright line was 3px short** — 16px type on a 24px line, where I had
  14px on the font's default.
- **The FAQ control is a 48px circle and the row is `py-4 pr-4 pl-6`**, not a 32px
  glyph in a `p-10` box. A shut row is 80px either way you count it: 16 of padding
  each side of a 24px question, or the 48px control plus the same padding.
- **The "Try now" button has no hover at all.** It is `active:bg-[#3A4248]` — it
  lightens when *pressed*. I had written that colour as a hover, which is the
  obvious reading and the wrong one. The stylesheet does carry a
  `.hover:bg-[#232930]` rule, but nothing on the home page uses it.
- **The App Store badge does not change colour either.** Its hover is a child `div`
  at `rgba(255,255,255,0.15)` with `backdrop-blur-md`, fading in over 300ms: the
  badge *frosts*.
- **The footer's social circles have no border and no hover.** I had given them
  both. They are three 24px glyphs on the panel's own fill and nothing else.

### Side by side

`refs/shot-reasonal-00..08.png` against `ka-00..08.png`, nine bands each, paired.
Band for band they are the same page with different words in it: the same sky, the
same three-line headline at 128px/140px, the same scattered objects, the same four
panels in 5–7 and 7–5, the same three chip marquees, the same phone on the same
chair, the same four review cards, one open FAQ row and seven shut, the same footer
columns.

## The type

Nothing substituted, which has not happened before in this series. **Archivo**
(headings and body) and **Gabarito** (eyebrows and labels) are both OFL 1.1 and both
on fontsource, and the reference self-hosts them through `next/font`
(`/_next/static/media/*.woff2`). At 128px the hero headline sets to 128px/140px at
weight 600 and -1.92px of tracking in both, which is the check that no substitution
is happening by accident.

The *before* is set in **Geist** for display and **IBM Plex Mono** for every label.
That is its own choice, has nothing to do with the reference, and is the second most
load-bearing thing about the angle after the white space.

## The before: the agency portfolio piece

The last of the four angles that were listed as unspent. It went to this business
because it is the one where it is most plausible: a consumer learning app is exactly
the kind of client who hires a studio, and a studio's instinct is to make the page
*feel* like the idea rather than explain it.

The rule for it was one sentence — beautiful, award-shaped, and after a full screen
you still cannot say what it does — and everything in it serves that:

- The hero is 130px lowercase display type reading **"a practice of thinking well"**,
  with a 10px mono caption. The word "app" does not appear above the fold.
- The four things the product actually does are a horizontal strip of **abstract
  plates** — a circle, a vertical rule, a halftone square, a triangle — numbered 01
  to 04, with 15px titles. Each description is `opacity: 0` until the pointer is on
  it, so on a touch screen the page explains nothing at all.
- "Ethos" is a 300px word in #e4e0d9 behind the three paragraphs that actually
  explain the product, which are 13px in a 340px column.
- A marquee of six adjectives.
- Four awards, all invented.
- The prices, the trial, the eight answered questions and the four reviews are all
  on the page — at 11px, inside three accordions that are **shut** when you arrive,
  under the heading "appendix", five screens down (y 4444 of 5364).
- Every photograph the after shows, this shows too: the seven objects as 56px
  desaturated plates with Fig. numbers, the nineteen lesson thumbnails as 20px
  squares in a two-column index.

It is not cheap and it is not broken. Somebody paid for it, somebody signed it off,
and it is useless — which is the property the two best angles in this series have
had.

### Both pages, measured

The same probe over both panes at 1440, scoped to `[data-pane]` so the hidden one is
not measured.

| | Before | After |
|---|---|---|
| Height | 5364 | 7522 |
| Selectable characters | 4521 | 7035 |
| Images | 26 | 50 |
| Pictures of text | 0 | 0 |
| Text nodes failing AA | **86 of 132** | **0 of 309** |
| Worst contrast ratio | **1.09:1** ("ethos", 300px) | 6.36:1 |
| Interactive targets under 44px | 38 | 16 |
| …under 24px | **17** | 0 |
| CSS animations at rest | 1 (infinite) | 5 (infinite) |
| Entrances that replay on every pass | 0 | 0 |
| Horizontal overflow at 390 | 0 | 0 |

The 86 failures are not an accident of one colour: the whole page is built out of
one label style, 10px IBM Plex Mono at `#a8a49c` on `#eceae5`, which is **2.07:1**
where AA wants 4.5. Seventeen of its targets are under 24px — the 13px footer and
appendix links, which are as tall as their own line and nothing more.

And the page has exactly one pointer habit: everything clickable fades to half
opacity. It is the house style of the genre and it is on real sites everywhere,
which is the only reason it is here. What it costs is measurable: half opacity takes
a 2.07:1 label to about **1.4:1**, so the element you are pointing at becomes the
least readable thing on the screen — and on a twenty-row index, the row under the
cursor is the one you can no longer read.

### What the before is right about

Two things, and the second one is the more uncomfortable.

**1. The lesson index.** The before lists all twenty lessons at rest: two columns,
a figure number and a thumbnail each, twenty selectable lines visible at once in
431px of page. The rebuild puts the same twenty titles in **three marquee rows that
never stop moving** — you cannot scan them, you cannot read the far end of a row,
and you certainly cannot find one you heard about. The reference does this and the
rebuild copies it, because rule 0. The bad page is better at the one job both pages
have on that screen.

**2. Neither page will tell you the price.** This is the number that makes the
episode.

| | Before | After |
|---|---|---|
| Where "£4.99" sits | y 4686 of 5364 — **87% down** | y 6950 of 7522 — **92% down** |
| At what size | 11px | 20px |
| Visible at rest? | **No** — inside a shut accordion | **No** — inside a shut FAQ row |
| Characters per line | 112 | 112 |

The redesign did not fix the burial. It **inherited it and moved the price five
percentage points further down the page**, and both versions put it behind a click.
The only thing the rebuild improves is the point size. The line length — 112
characters, against the 45–75 that is the usual target — is identical on both,
because the after's answer paragraph is 20px across the full 1176px of the panel.

That is not a defect this build introduced and it is not one rule 0 lets it fix. It
is in Declared departures as a thing the reference does, left alone on purpose.

## Hovers

The pass of rule 5, in full. `grep -o "[^{}]*:hover[^{}]*{[^}]*}"` over the
reference's stylesheet returns six rules and nothing else, so this page's pointer
vocabulary is unusually small — and two of the three things you would expect to have
a hover do not have one.

Each pair is photographed with a real pointer parked over the element through CDP
and diffed; a pair with `maxdiff = 0` is a *finding*, not a failure.

| Element | What happens | Where it came from |
|---|---|---|
| Try now | Nothing on hover. Lightens to `#3A4248` when **pressed** | `active:bg-[#3A4248]` in its own class string |
| Nav link | A `rgba(24,29,31,0.1)` pill fades in behind the label, 150ms | `.hover\:bg-\[rgba\(24,29,31,0\.1\)\]:hover`, `transition-[background-color] duration-150` |
| App Store badge | Frosts: a white 15% layer with `backdrop-blur-md` fades in over 300ms `ease-out`. The fill never changes | `group-hover/btn:opacity-100` on an `absolute inset-0 backdrop-blur-md opacity-0` child |
| Footer link | Fades to `white/80` | `.hover\:text-white\/80:hover` |
| FAQ row control | **Nothing.** The 48px circle has no hover rule | No `:hover` rule matches it; `maxdiff = 0` confirms |
| Footer social | **Nothing.** No border, no fill, no hover | Same; the reference's anchors carry no border or background at all |
| *(before)* Case plate | The description appears from `opacity: 0` over 500ms | Mine |
| *(before)* Anything clickable | Fades to 50% over 450ms | Mine — see the contrast arithmetic above |

Three things about photographing a `position: fixed` header, each of which cost an
attempt, are now written into `tools/hovers.js` where the next episode will find
them: `scroll-behavior: smooth` makes a scroll-then-measure read the old position;
`captureBeyondViewport` renders the page at the clip's offset, where a fixed element
is not, and turning it off returns a blank white surface under a device-metrics
override; and **`backdrop-filter` is not painted into a beyond-viewport capture at
all** — not the blur and not the element's own background — so a frosted bar comes
back invisible. The runner grew two fields for it: `"press"` (photograph `:active`
instead of `:hover`) and `"pre"` (run one expression before measuring).

## Reduced motion

The reference ships a blanket rule — `animation-duration: 0.01ms !important` and the
same for transitions, on every element — and the after keeps it, because rule 0.
It is blunt, but it does switch everything off: the word-by-word entrances resolve
instantly, the clouds stop drifting, the three chip marquees stop, and the header is
already down on the first render rather than transitioning into place.

The before switches off more deliberately, because switching its animation off is
not enough:

- The marquee stops.
- **The preloader is not shown at all.** A counter frozen at "000" over the hero
  would be worse than no preloader, so the stylesheet takes it off the page.
- **The four case descriptions are shown.** Their reveal is a transition, and a
  blanket "no transitions" would have left four abstract shapes with no copy and no
  way to get it — the setting would have turned a bad page into an empty one. With
  the setting on, the page says more than it does without it, which is the right way
  round.

Checked by opening both with the setting on and using them.

## Declared departures

Everywhere the after differs from the reference, and why.

**Rule 10, the brand marks.** The `Reasonal` wordmark, the white wordmark and the
square icon are out; the `crux` wordmark is drawn in the same idiom at the same size
in the same place. Apple's App Store badge is drawn rather than copied. The four
social platform marks are drawn as 24px glyphs.

**Three assets rebuilt in the DOM.** The tag cloud (a picture of eight words), the
Milgram lesson card (a screenshot of the reference's own app) and the case-study
card (which names a real company and a real breach, with the lesson's deliberately
wrong claims printed on it). All three are live markup here, and the case study is
re-subjected to an invented company that says so in its own body text. One of the
twenty lesson thumbnails — a pixelated photograph of a named living person — is a
drawn mark; the other nineteen are the reference's own files.

**Inferred, not read (rule 5).** The reference's entrances come from a client bundle
the survey did not fetch, so while every start state is read from the markup, these
are matched to the capture rather than read: the per-word stagger (0.45s, 40ms
apart, 14px), the per-character stagger in the "why" paragraphs (12ms), the three
chip marquees (46s, 38s, 52s), the "why" objects' spring back from `scale-75`, and
the header's 300ms drop-in. The cloud drift (24s and 31s) and every hover (150ms)
*are* read.

**Copy, which is the only thing rule 0 lets change.** The hero headline is three
lines of ours ("Think clearly / when it / matters most") where the reference has
three lines of its own; it is deliberately three, because the hero is one
composition and a two-line version leaves 140px of empty gradient under it. Eight
FAQ answers, four reviews, twenty lesson titles, the case study and the prices are
all invented. Section heights are unaffected: the hero is 100vh, the review cards
are sized by the tallest quotation, and seven of the eight FAQ rows are shut.

**Left alone on purpose.** The 112-character answer line and the price at 92% behind
a click are the reference's decisions, measured above and not fixed. Sixteen of the
after's interactive targets are under 44px — the footer links and the nav pills,
which are as tall as their own 24px line — and that is the reference's geometry
exactly. Changing either would make the build a better page and a worse rebuild.

## Files

```
src/content/site.ts        one deck: brand, copy, photographs, prices, the two
                           rebuilt cards as data
src/after/                 the rebuild — Parts, Panels, AfterPage
src/before/                the agency portfolio piece — BeforePage, before.css
src/compare/Toggle.tsx     the control, which belongs to neither design
src/motion/motion.ts       every timing, with its provenance
src/styles/index.css       the reference's tokens, its three component classes,
                           its keyframes and its reduced-motion rule
src/cx.ts                  class joining, because prettier-plugin-tailwindcss eats
                           the leading space in a conditional template literal
```
