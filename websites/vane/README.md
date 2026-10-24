# vane — before / after, episode 9

One business, two websites. **vane** is an invented carbon-accounting and
sustainability-reporting platform: four product lines, four AI agents, 4,000
customers. Everything on both pages — the product claims, the statistics, the
standards, the customer quotations, the resources, the form — comes out of one
content deck, `src/content/site.ts`.

```bash
cd websites/vane && npm install && npm run dev    # http://localhost:5248
```

- **Before:** the conversion-optimised.
- **After:** a pixel-perfect rebuild of the reference's home page (rule 0).

---

## The reference

<https://greenly.earth> — a carbon-accounting platform, serving French by
geolocation.

It is a Next.js site on **Tailwind 4**, which makes it the most literal
rebuild in the series so far: its utility classes *are* its design
specification and they are in the HTML. The `@theme` in `src/styles/index.css`
is its own `--color-*` scale, read out of its stylesheet; `.h1`, `.p-medium`,
`.container-x` and the rest are its own component classes, copied declaration
for declaration.

| What | Where it came from |
|---|---|
| Every colour, size, radius and breakpoint | the class strings in its own markup |
| `.h1` 32/48px, `.h2` 26/34px, `.container-x` 1248px | its stylesheet's component layer |
| The arrow's −35° kick on `cubic-bezier(0.33, 3.2, 0.515, 1)` | `.btn:hover .btn_arrow` |
| The label roll, 300ms | `group-hover/btnAnim:*:first:-translate-y-full` |
| The text link's 4px lift and 0.5s underline on a 1.325 overshoot | `.btn-link:hover` |
| The partner rows' 1.5px rule and 10.5px shift | `[@media(hover:hover)]:hover:pl-[10.5px]` |

All of it is in `src/motion/motion.ts` with its provenance.

**The one thing the survey found by looking rather than reading:** this page has
**no scroll entrance on its headings**. The only 0.5s/0.6s transitions in its
DOM dump are on `<g>` elements inside one decorative SVG, moving 5px. Its
statistics heading is marked up one `<span>` per word, which looks exactly like
a staggered rise waiting to happen — and is there to carry an italic. So the
after does not add one either.

---

## The after, measured

Rule 6: shoot the build with the same harness that surveyed the reference, at
the same viewport, and diff every section's top and height.

| Section | Reference top/height | This build | Δ height |
|---|---|---|---|
| Announcement strip | 0 / 40 | 0 / 40 | — |
| Header | 40 / 81 | 40 / 81 | — |
| Hero | 121 / 519 | 121 / 514 | −5 |
| Client wall + awards | 640 / 316 | 635 / 316 | — |
| Platform (dark) | 956 / 838 | 951 / 838 | — |
| Statistics | 1793 / 519 | 1789 / 519 | — |
| Reasons grid | 2312 / 1099 | 2308 / 1090 | −9 |
| Partner bar | 3411 / 933 | 3398 / 933 | — |
| Standards wall | 4344 / 403 | 4331 / 401 | −2 |
| AI agents (dark) | 4747 / 876 | 4732 / 876 | — |
| Recognition | 5623 / 729 | 5607 / 729 | — |
| Resources | 6351 / 960 | 6336 / 932 | −28 |
| Partner programme | 7312 / 542 | 7268 / 546 | +4 |
| Testimonials | 7854 / 879 | 7814 / 842 | −37 |
| Footer | 8733 / 1240 | 8656 / 1240 | — |
| **Page** | **10,223** | **10,146** | −77 |

Nine of fifteen exact; the rest within 37px on a 10,000px page. Every
difference left is **copy**: the reference is in French and this is in English,
and French runs roughly 15–20% longer for the same sentence. Three paragraphs
were lengthened to put their blocks back on the table (the hero standfirst, the
featured testimonial, the platform heading's second line); the remaining
−77px is the compound of six blocks whose English copy sets a line shorter than
the French. Nothing structural differs.

**The reference was surveyed at a 1,425px content width** (1440 less a 15px
scrollbar) and this build is measured at 1440 with the scrollbar hidden. The
measure is `container-x`, capped at 1248px and centred, so the content box is
identical either way; only the full-bleed section widths differ, by 7.5px a
side.

### What measuring caught

1. **Every heading on a dark section was near-black on near-black.** `.h2 {
   color: var(--color-primary-2) }` written in `@layer utilities` lands *after*
   Tailwind's generated `.text-white`, so `className="h2 text-white"` resolved
   to the dark colour — a contrast ratio of **1.00**, four headings, invisible.
   The reference's own build emits its component classes before its utilities;
   moving the block to `@layer components` reproduces that order. The probe
   found this, not the eye: at a glance the section simply looked like it had
   no heading.
2. **The announcement strip is `sticky` with no offset,** which is a no-op —
   it scrolls away and only the header pins. Written as `sticky top-0` it
   leaves a dark band across the page for its whole length, which is what this
   looked like until it was put beside the reference's band at the same scroll
   position.
3. **A 48px ruler of twenty-one hairlines** sits under the platform cards. It
   is decorative, it is invisible in a thumbnail, and it is exactly the 48px
   that section was short.
4. **The badge wall is four columns, not six.** Its grid is driven by a
   `--desktop-cols` custom property; at six the wall is two rows and 90px
   short, at four it is three rows and right.
5. **The partner bar is a three-row bordered table,** not the two-column block
   it looks like in a thumbnail: headline | logo and bullets, then an image |
   partner and bullets, then three figures. 402px of the page.
6. **The footer is 1,240px and then a 250px sticky band behind it** — a line of
   copy the footer slides off as you reach the bottom.

### Side by side

`scratchpad/vq-NN.png` holds the reference and the build at the same nine
scroll positions at 1440.

---

## The type

| Reference | Substitute | Used for |
|---|---|---|
| Inter | **Inter Variable** (OFL) | body, UI, every label — *the same face* |
| Caveat | **Caveat Variable** (OFL) | handwritten accents — *the same face* |
| Pangea (Atipo, commercial) | **Figtree Variable** (OFL) | every heading and every figure |

Two of three need no substitute at all. Figtree is the closest free match to
Pangea: the same geometric-humanist skeleton, the same tall x-height, the same
tailless `a`. It runs about 2% wider at matched cap height, which is inside the
tolerance of every heading box on this page.

---

## The before: the conversion-optimised

Somebody paid for every block on this page, and every block won its test.

- A **countdown** across the top that has been running for three years and
  resets when it reaches zero.
- A **trust bar** under it, and a **logo strip** under that, and a **badge row**
  further down, all saying the same thing three different ways.
- **Five button styles**, each from a different quarter's winner: an orange
  gradient that pulses, a green pill, a navy rectangle, a white outline, and a
  link pretending to be a button. Eleven calls to action in total, asking for
  four different things.
- A **social-proof toast** that cycles four strangers who just booked a demo,
  "verified by Proofly".
- A **sticky bar** at the foot with two more CTAs, and a **chat bubble** over
  the top of it.
- A **value stack** with £20,400 of struck-through line items and no price.
- A **ten-field form** with an asterisk on eight of them.
- And an asterisk on the headline, whose small print is at the very bottom.

### Both pages, measured

`node ../tools/probe.js http://localhost:5248/ [--before]`

| | Before | After |
|---|---|---|
| Page height at 1440 | **5,273px** | 10,194px |
| Selectable characters | 8,944 | 9,657 |
| Calls to action above the fold | **7** | 2 |
| Animations running at rest | **5** | 1 (the awards marquee) |
| …of which infinite | **5** | 1 |
| Targets under 44px | 41 | 66 |
| Text that fails AA on its own ground | **16** | 12 |
| Worst contrast ratio | **1.70 : 1** | 2.87 : 1 |
| Page height at 390 | 11,097px | 18,461px |

The pair that matters is the first and the fourth. The before fits the same
content into **52% of the page** and keeps **five things moving while you read
it** — a countdown, a pulsing button, a toast that replaces itself every five
seconds, and two sliding labels. The after moves one thing, in a strip that
carries no information, and it is off under reduced motion.

**And the after does not win on contrast by much.** Twelve of its text nodes
fail AA, and all twelve are the reference's own colour pairs: `#1e9b48` on
white is 3.6:1 and is used for every figure on the page, and `#8b9c99` on
`#f9fbfa` is 2.87:1 and is used for its section eyebrows. Rule 0 keeps them.
The redesign did not fix the contrast problem; it inherited it and set it in a
bigger size.

### What the before is right about

Two things, and the after has neither:

1. **It tells you what the numbers mean.** "−52%" appears on both pages. Only
   the before carries the sentence underneath it: *averages reported by 40
   customers surveyed in Q4 2025, not a guarantee of results*. The after prints
   the figure at 64px and says nothing.
2. **It admits what the badges are.** The before's small print says the
   certification marks indicate standards the platform supports and are not an
   endorsement. The after shows twelve badges in a row and leaves you to assume.

---

## Hovers

Photographed in pairs with `node ../tools/hovers.js` and
`scratchpad/q/hovers-vane.json`; the sheet is `scratchpad/hv-sheet.png`.

| Element | What happens | Where the number came from |
|---|---|---|
| Any button | The small arrow rotates −35° on `cubic-bezier(0.33, 3.2, 0.515, 1)` — an easing with a 3.2 overshoot, so it kicks past the angle and settles. The most characteristic thing the page does | `.btn:hover .btn_arrow` |
| Primary button | Fill goes `#2fce65` → `#52d67e` over 200ms | `.btn--1:hover` |
| Dark button | Fill goes `#0e0e0e` → `#2b3b37` | `.btn--2:hover` |
| Ghost button | Fill goes to `rgba(16,16,16,0.1)`; on dark, `rgba(255,255,255,0.1)` | `.btn--3:hover`, `.btn--3_1:hover` |
| Header buttons | Two copies of the label in one grid cell: the first slides out of the top as the second arrives, 300ms | `group-hover/btnAnim:*:first:-translate-y-full` |
| Text link | The label lifts 4px and an underline scales in from nothing over 0.5s on a 1.325 overshoot | `.btn-link:hover .btn_text::after` |
| Product chip | Fill goes to **its own card's colour** — mint, sky, lilac or cream — and the arrow rotates −45° | per-card `hover:bg-[#BEF4CF]` and friends |
| Client / badge cell | Ground goes white → `#f4f6f5` | `hover:bg-greyscale-4` |
| Nav link | Colour goes to `#192e29` and the weight goes to medium | `[@media(hover:hover)]:group-hover:text-primary-11` |
| Partner row | Grows a 1.5px left rule in the brand green and shifts its text 10.5px right — the only hover on the page that moves type | `[@media(hover:hover)]:hover:pl-[10.5px]` |
| Resource card | Its illustration scales 1.05 over 300ms inside a clipped box | `group-hover:scale-105` |
| Footer link | Colour goes to white | `hover:text-white` |

Nothing was inferred except the marquee, below.

---

## Reduced motion

With `prefers-reduced-motion: reduce`:

- the awards marquee stops;
- the before's pulsing hero button stops (its countdown and its toast do not —
  they are not motion, they are content, and switching them off would hide what
  the page says);
- every transition on a drawn product panel is switched off;
- and the page was then opened with the setting on and used: every tab, every
  rail and both forms still work.

---

## Declared departures

1. **Pangea is substituted** by Figtree, named above. Inter and Caveat are the
   reference's own faces and are used as-is.
2. **Every client, partner, certification and testimonial mark is invented and
   drawn**, and every product screenshot is rebuilt in the DOM. This is rule 10
   doing most of the work in this episode; the reasoning, and where the line
   between a public standard and a certification claim falls, is in
   `src/assets/img/CREDITS.md`.
3. **The page is in English; the reference serves French.** This is the one
   copy change that moves a measurement: French runs 15–20% longer for the same
   sentence, and six blocks on this page set a line shorter than the
   reference's because of it. Three paragraphs were lengthened to put their
   blocks back on the table; the residual −77px over 10,000px is the rest.
4. **The awards marquee is inferred, not read.** The reference ships its five
   items twice in a row that overflows its container, which is how a marquee is
   built and is not how anything else is — but the transform is attached by a
   script this build did not fetch, so there is no number to copy. 30s linear
   is matched to the pace in the capture.
5. **The drawn product panels use greyscale-8 for their labels, not
   greyscale-6.** The reference's own screenshots use the paler grey, but they
   are rasters: nobody can read them with a screen reader and no checker can
   measure them. These are live text, so they *are* measurable, and at
   greyscale-6 the 10px labels came out at 2.76:1. An improvement, and a
   deliberate one.
6. **Three interactions are simplified.** The hero's video lightbox is a static
   panel with a play control that does nothing; the testimonial rail steps
   rather than loops; and the header's mega-menus open nothing. All three are
   routes into pages that do not exist in a one-page study.
7. **Lenis is not used.** The reference does not run it; this is noted only
   because episode 8's reference did and the two are otherwise similar sites.
8. **The before's timers stop with the toggle.** Rule 7: the hidden pane may
   not run an interval. Both the countdown and the toast are cleared when the
   after is showing.

---

## Files

```
src/content/site.ts     one content deck; both designs read it
src/styles/index.css    the reference's @theme and component classes
src/after/Marks.tsx     every mark on the page, drawn and invented
src/after/Visuals.tsx   the product screenshots, rebuilt in the DOM
src/after/Ui.tsx        the button, the text link, the chip
src/before/before.css   the conversion-optimised, entirely in px
src/motion/motion.ts    every timing, with where it came from
```
