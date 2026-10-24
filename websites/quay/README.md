# quay — before / after, episode 8

One business, two websites. **quay.** is an invented student house on a
harbourside: 23 studios, four room types, all bills in. Everything on both
pages — the prices, the rooms, the services, the travel times, the FAQs, the
application form — comes out of one content deck, `src/content/site.ts`, so the
only thing being compared is the design.

```bash
cd websites/quay && npm install && npm run dev    # http://localhost:5244
```

- **Before:** the content-managed sprawl.
- **After:** a pixel-perfect rebuild of the reference's home page (rule 0).

---

## The reference

<https://allinnhomeofstudents.com> — a student house in Gdańsk, run on a
bespoke WordPress block theme.

It is an unusually generous reference to rebuild, because a block theme ships
its whole stylesheet inside the document and its behaviour as one small script
per block. Nothing in the after was timed off a video or measured off a
screenshot:

| What | Where it came from |
|---|---|
| Every rem, colour, breakpoint and easing | the page's own stylesheet, in the HTML |
| The typewriter's 75/500/1500ms | `data-animation-config` on the hero's own markup |
| The carousel's 25s and the 12° rock | `@keyframes carousel` and `@keyframes itemRotate` |
| The word-rise entrance | `gsap.from(words, { duration: 1, y: 100, stagger: 0.05 })` in `components/section-header/script.js` |
| The slogan shapes' spin | `gsap.fromTo(el, { scale: 0, rotation: 120 }, { …, ease: 'back.out(1.7)' })` |
| The scroll spy | its own `IntersectionObserver`, `rootMargin: '-20% 0px -70% 0px'` |
| The icons | 17 glyphs lifted out of `icons.woff2` with fontTools, as path data |

All of it is recorded, with provenance, in `src/motion/motion.ts`.

---

## The after, measured

Rule 6: shoot the build with the same harness that surveyed the reference, at
the same viewport, and diff every section's top and height in page coordinates.
Thirteen of fourteen are exact.

| Section | Reference top/height | This build | Δ |
|---|---|---|---|
| Announcement bar | 0 / 42 | 0 / 42 | — |
| Header | 42 / 83 | 42 / 83 | — |
| Hero | 42 / 900 | 42 / 900 | — |
| Subnav | 970 / 68 | 970 / 68 | — |
| Slogan | 1062 / 398 | 1062 / 398 | — |
| Welcome tiles | 1484 / 743 | 1484 / 743 | — |
| Rooms & prices | 2251 / 1318 | 2251 / 1318 | — |
| Shared spaces | 3594 / 1144 | 3594 / 1144 | — |
| Services | 4762 / 673 | 4762 / 673 | — |
| Location | 5459 / 795 | 5459 / 795 | — |
| Extras | 6278 / 844 | 6278 / 844 | — |
| Infopoint | 7146 / 795 | 7146 / 795 | — |
| Apply | 8038 / 1853 | 8038 / 1853 | — |
| Footer | 9859 / 776 | 9859 / **774** | −2 |
| **Page** | **10,636** | **10,633** | −3 |

The footer's 2px is the wordmark: the reference's logotype is a 1318×369 SVG
and quay's is set in a 1318×369 box, so at 1327 wide it lands 371 tall against
the reference's 372. Nothing else differs.

### What measuring caught

Every one of these was invisible in a screenshot and obvious in the table.

1. **24px between every block.** The reference inherits WordPress's
   `--wp--style--block-gap: 24px`, written at a specificity so low that any
   block's own margin beats it. Without it the slogan started at 1038 instead
   of 1062 and the error compounded all the way down. Copied as
   `:where(.q main) > *`, which keeps that ordering.
2. **`.q h3 { margin: 0 }` beat `.q-tile__heading { margin-bottom: 0.5rem }`.**
   The reference's base rules are bare element selectors; mine were scoped with
   a class and so outranked every block. Four tile headings, the apply
   standfirst and a location line all silently lost their bottom margin — 8px a
   block. Fixed by scoping with `:where()` so the base rules keep their
   original weight.
3. **69px of nothing under the rooms block.** `-active` carries
   `margin: 0.75rem 0 3.5rem` on the room panel, which belongs to the phone's
   accordion; on a desktop the panel is a tab and sits flush.
4. **The footer slides 32px *under* the apply block.** `.footer { margin-top:
   -2rem }` is what the yellow panel's 1.5rem radius is cut into. Without it
   the page was 32px too tall and the rounded foot sat against nothing.
5. **The services "Parents' guide" button is inside the parents' panel,** not
   under the block. It only exists for whoever opened that row — which is why
   the reference's services block is 673px and mine was 752.
6. **The infopoint's first row is open at rest.** Six shut rows is a block with
   no content in it.
7. **The location block has no address line under it** — the address is in the
   map modal. 20px, and a line of copy that was not in the reference.
8. **The slogan wrapped onto three lines, not two.** Geist runs about 1% wider
   than Labil Grotesk, and at 1440 that was three pixels of 1,256 — enough to
   push the last shape onto a row of its own and add 125px. The tracking gives
   way (−0.015em rather than −0.01em) and the composition is kept.

### Side by side

`scratchpad/pair-NN.png` holds the reference and the build at the same twelve
scroll positions at 1440. They are the same page.

---

## The type

All three of the reference's faces are commercial, so all three are
substituted. Stabil and Labil are sibling faces in the original — same
skeleton, one stable and one with wonky alternates — which is why the
substitutes are two neutral grotesks rather than two faces chosen to look
different from each other.

| Reference | Substitute | Used for |
|---|---|---|
| Stabil Grotesk | **Onest Variable** (OFL) | body, headings, nav, buttons |
| Labil Grotesk | **Geist Variable** (OFL) | the slogan, the marquee, the wordmark |
| ABC Gaisyr | **Newsreader Variable** (OFL) | section eyebrows, the typed word |

What is lost is Labil's alternate glyphs — one letter a line, set wonky, which
is the whole joke of a face called *Labil*. The slogan sets that letter in the
italic instead: the same joke made with what a free family has.

The reference also scales its entire page off the viewport —
`html { font-size: min(1.12vw, 20px) }` above 768 — which is where every `.008`
in its measurements comes from. Copied verbatim; it is not a detail, it is why
a rem value lifted from the reference lands in the right place. The **before**
is written entirely in px for the same reason: both pages share one `html`, and
a before in rem would inherit the after's fluid scale and stop being its own
design.

---

## The before: the content-managed sprawl

Somebody paid for this once. What happened since is that eleven people have had
the keys and none of them has ever had permission to delete anything.

- **Four navigations,** each added by a different person who could not find
  something in the last one: a utility bar, an eleven-item main nav that wraps
  onto two rows, a "Quick links" strip, and a sidebar "In this section" menu
  with twelve entries including two superseded price lists.
- **Three "temporary" notices** live at once: a 2024/25 banner flag, a
  red-on-cream shout about the spring term, and a green "Rooms still
  available!".
- **Every price three times** and in three formats — `£949/month` in the table,
  `219.17 GBP` in the next column, `POA` in the fourth row, and `£619 pppm` in
  the sidebar — because three people typed them.
- **Five calls to action in five styles,** none of them primary: an orange
  gradient SUBMIT, a red rounded APPLY NOW!, a navy Book a viewing, an
  underlined Download the brochure, and "or call 0117 496 0188".
- **A sidebar of widgets** nobody has looked at since 2019: a news list whose
  newest item is from 2021, a Facebook feed that cannot load because it is
  waiting for cookie consent, and a hit counter.
- **A date on the bottom** that says the site was last updated on 14/03/2019,
  under a copyright line that says 2026.

It is 11px Arial on a fixed 980px canvas, and it carries **every** piece of
content the after does: all ten room variants with their prices and features,
all seven shared spaces, both service lists, all eight travel times, all five
extras, all six FAQs and the same application form.

### Both pages, measured

Run with `node ../tools/probe.js http://localhost:5244/ [--before]`.

| | Before | After |
|---|---|---|
| Page height at 1440 | **4,675px** | 10,633px |
| Selectable characters | 11,407 | 10,873 |
| Body size | 11px | 16.1px (22.2px for the standfirst) |
| Longest line of body copy | **147 characters** | 73 |
| Median line | 32 characters | 41 |
| Interactive targets in the first 900px | **48** | 11 |
| Targets under 44px | 112 | 106 |
| Text that fails AA on its own ground | **25** | 6 |
| Worst contrast ratio | 1.91 : 1 | 1.79 : 1 |
| Images | 33 | 150 |
| Animations running at rest | 0 | 11 (4 distinct, all off under reduced motion) |

The line that matters is the first and the last pair together. The before fits
the same content into **44% of the page** — and does it by setting it at 11px,
running body copy to 147 characters a line, and putting 48 things to click in
the first screen. The after is more than twice as long and asks you to make one
decision at a time.

**And the after does not win on contrast.** Six of its text nodes fail AA
against their own ground, and the worst of them — 1.79 : 1 — is *worse* than
anything on the before. Three of the six are the white "FREE" flag on the
reference's sky blue, and one is yellow on orange in the apply block's stamps.
Those are the reference's own colour pairs and rule 0 keeps them; but the
redesign did not fix the contrast problem, it inherited it and made it louder.
(A seventh reading, 1.06 for "What you want", is a probe artefact: that row
paints its plum fill with a `z-index: -1` pseudo element, so the probe reads
white against the page's cream rather than against #402531, where it is
12.9 : 1.)

### What the before is right about

Three things, and the after has none of them:

1. **The phone number is on the page** — twice, with the hours it is answered.
2. **The opening hours are on the page**: reception 24h, enquiries Mon–Fri
   9–5, viewings Saturday 10–2.
3. **It tells you when it was last updated.** 14/03/2019 is a bad answer, but
   it is an answer. The after's footer carries a copyright year and nothing
   else, so a visitor has no way at all to tell whether the £949 is current.

---

## Hovers

Photographed in pairs with `node ../tools/hovers.js` and
`scratchpad/q/hovers-after.json`; the sheet is `scratchpad/hov-sheet.png`.

| Element | What happens | Where the number came from |
|---|---|---|
| Any button | The 0.5rem radius grows to 1.75rem over 200ms — a rectangle becomes a pill and nothing else moves | `transition: border-radius 0.2s ease-in-out` |
| Welcome tile | The tile under the pointer takes a third of the row and the other three share what is left; the ground goes cream-700 → cream-800; **the copy fades in 0.25s behind the width** so the words arrive after the box has stopped | `.block-tiles__items:has(.block-tiles__item:hover)`, `transition-delay: 0.25s` |
| Rail card | 28.75rem → 33.875rem, ground darkens, the gallery's dots and arrows fade in | `.block-tiles-slider__item:hover` |
| Rail arrow | `scale(1.2)` and the ground goes cream-700 → cream-800 | `transition: transform 0.3s, background-color 0.3s` |
| Gallery arrow | `scale(1.2)` | same |
| Subnav link | A 5% plum wash | `.block-subnav__link:hover` |
| Rooms type tab | cream-700 → cream-800, except on the open one | `.block-rooms__nav-button:hover` |
| Rooms floor pill | A 5% plum wash | `.block-rooms__item-nav-button:hover` |
| Rooms gallery | The two arrows fade in over the photograph | `.block-rooms__item-gallery:hover` |
| "Load more" | The underline's colour goes transparent — the only hover on the page that *removes* something | `transition: text-decoration-color 0.3s` |
| Services row | Both halves of the flag — the slab and the chamfered point — go cream-700 → cream-800 together | `.block-services__item-toggler:hover::before, ::after` |
| Infopoint row | The flag's point slides 1rem right, so the row stretches; the icon disc takes a 5% wash and rotates 90° — or back to 0° if the row is already open | `transform: translateX(1rem)`, `rotate(90deg)` |
| Location bar | The whole row lifts 20px out of the stack — **up on the odd rows and down on the even ones**, so the two halves of the chart separate | `:has(.block-location__item-bar:hover)` |
| Footer link | A 1px underline at a 0.25rem offset | `text-underline-offset: 0.25rem` |
| Footer "Up" | `scale(1.1)` | `.block-footer__up-button:hover` |
| Announcement close | A 10% plum disc | `.announcement-bar__close:hover` |

Nothing was inferred. Every row above is a declaration in the reference's own
stylesheet.

---

## Reduced motion

With `prefers-reduced-motion: reduce`:

- the hero's typewriter **never starts** and the headline renders its first
  word as plain text — the reference's own branch, and the right one: a caret
  flickering inside an `h1` is exactly what that setting is asking to stop;
- the 25s carousel and the 12° rock are off, and every item is where the
  stylesheet puts it, so the hero is a still composition rather than a gap;
- the 20s marquee is off;
- the word-rise, the slogan's spin-in, the apply stamps, their scroll drift and
  the location bars' growth all render at their final values;
- the two clips do not play — and would not have anyway, see below.

And then the page was opened with the setting on and used: every rail, every
accordion, every tab and the form still work, because none of them was ever
driven by the motion.

---

## Declared departures

Every place the build is not a literal copy, and why.

1. **The three typefaces** are substituted, named above. Unavoidable.
2. **The icon webfont** is not shipped. Its 17 pictograms were extracted with
   fontTools and inlined as path data (`src/after/Icons.tsx`), which is what
   rule 10 asks for a drawn asset. The two **logo** glyphs in that font were
   dropped rather than copied.
3. **The brand marks are invented** — rule 10's one exception. quay's wordmark
   is set in the display face at the reference's two sizes and places, with a
   drawn circle for the stop (a text period stretched to fill a 1318-unit box
   is an oblong, and the mark is a round dot in the middle of a word). The
   reference's operator logo is replaced by the invented "Moorside Group".
4. **The apply stamps' drift speeds are seeded.** The reference picks them with
   `Math.random()` on every load, so no two visits agree and no screenshot of
   that block is reproducible. `STAMP_DRIFT.speeds` in `motion.ts` fixes them.
   It is the only number on the page deliberately not the reference's.
5. **Lenis is started and stopped with the toggle.** The reference mounts it
   unconditionally where the pointer is fine; rule 7 forbids the hidden pane
   running a rAF loop, so it is created when the after is shown and destroyed
   when it is not. Both of the reference's own conditions — fine pointer, no
   reduced motion — are kept.
6. **`overflow: hidden` became `overflow-x: clip`.** The reference sets it on
   `body`, where it is not a scroll container; copied literally onto a div it
   would be one, and the subnav, the rooms sidebar, the infopoint heading and
   the apply column would all stop sticking.
7. **The pagination dots get a 24px hit area** from a transparent pseudo
   element. They look exactly like the reference's 8px dots and are now a
   target you can hit. An improvement, not a copy.
8. **Three rows of the services/infopoint flags carry `isolation: isolate`.**
   Their colour is painted by a `z-index: -1` pseudo element, and with two
   pages stacked — each pane a stacking context — that paints below the page's
   own cream instead of behind the row. The reference has one page and does not
   need it.
9. **The hero clips carry posters.** Both files are the reference's own, and
   both are **HEVC** in an MP4 with the `moov` atom after `mdat` — never
   remuxed for the web. Chrome on Windows will not decode HEVC, so the
   reference ships a poster image per clip and shows a photograph where the
   codec is missing. Both posters here are its own. `preload="auto"` rather
   than the default, because with the index at the end of the file nothing can
   be read until the whole 0.6MB has arrived.
10. **Galleries and rails are hand-rolled, not Swiper.** The reference's
    options are kept (`slidesPerView: 'auto'`, `loop`, `allowTouchMove: false`
    on the two card rails; one slide at a time inside a card). The reason is
    specific: these sit inside cards whose **width** transitions on hover, and
    a measured slider has to be told to recalculate on every frame of that
    transition. A fader and a transform have nothing to recalculate.
11. **Copy lengths were tuned to the reference's.** Three paragraphs — one
    welcome tile, the shared room description, the apply standfirst and the
    consent line — were written a clause longer or shorter so the blocks match
    the table above to the pixel. That is copy, and this is it being said out
    loud.
12. **Some photographs are of the reference's city, not quay's.** The small
    masked shape in the slogan is a harbour crane in Gdańsk, and the four
    slides behind the city tile are Gdańsk. Rule 0 does not allow swapping a
    reference's photographs, so they stay, and their alt text describes what is
    in the frame rather than claiming a place the picture does not support.
13. **The reference's mobile subnav is simplified.** It collapses to the
    current section plus a toggler, as the reference's does, but it does not
    reproduce the Swiper that drives the expanded list below 768.

---

## Files

```
src/content/site.ts     one content deck; both designs read it
src/after/after.css     the rebuild's shell, hero, slogan, tiles and rails
src/after/after-blocks.css   rooms, services, location, infopoint, apply, footer
src/after/Icons.tsx     the reference's icon font, as path data (generated)
src/after/Parts.tsx     the wordmark, the button, the word-rise, the gallery, the rail
src/before/before.css   the sprawl, entirely in px
src/motion/motion.ts    every timing, with where it came from
src/cx.ts               why no class name on this page is a template literal
```
