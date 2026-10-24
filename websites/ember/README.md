# ember — before / after, episode 1

One business, two designs, and a button that crossfades between them.

**Ember Health** sells red light therapy panels. The *after* is its website as it is now:
a rebuild of a real reference site, measured rather than eyeballed. The *before* is the
same business, built badly — bootstrapped, not found, because there is no old version of
an invented brand to dig up.

**This episode's angle is the 2012 brochure**: fixed 960px, floats, a jQuery carousel,
bevelled buttons, a sidebar of boxes and a hit counter. Each episode takes a different
angle on being bad — see the table in [`../README.md`](../README.md#3-the-before-a-different-kind-of-bad-every-episode)
— so the series never ships the same before twice.

Both pages read from one content deck (`src/content/site.ts`). Same words, same
photographs, same prices. The only variable is the design.

```bash
npm install
npm run dev        # http://localhost:5216
```

The toggle is bottom-centre and says **Before CJ / After CJ** — no dates, no timeline,
because the difference is the work rather than the decade. Arrow keys move between the
two; the swap preserves your position *proportionally*, so a third of the way down the
2012 page is a third of the way down the modern one.

---

## The diagnosis

Not a changelog. For each change: what the 2012 page does, what it costs, what the modern
page does instead — and, where it matters, the number.

### 1. One width, and no breakpoints

**Before:** a 960px container, centred, with `min-width: 960px` on the root. On a 390px
phone the page is **2.46 screens wide** and you pan sideways to read a sentence.

**Cost:** everything. In 2012 this was free, because the phone was not where people were.
It stopped being free somewhere around 2014 and the site did not notice.

**After:** flex and grid off a 1440 → 320 range with breakpoints at 991 and 767. Nothing
is positioned absolutely except decoration.

This is the one difference that is not a matter of taste, and it is why the before is
honest rather than cruel: it was a competent site. The ground moved.

### 2. Where the information went

**Before:** the price is on the page. So is the phone number (twice, above the fold),
the opening hours, the postal address, the delivery threshold, and a date saying when the
site was last touched.

**After:** no price anywhere. A phone number nowhere. The address is in a link called
"Imprint". The hours do not exist.

**Cost:** this one runs the other way, and it is the most interesting thing in the
episode. The modern page is better at *everything except telling you things*. Somebody
arriving to find out what a panel costs is worse off in 2026 than they were in 2012. The
price did not move to a better place; it moved behind a button called "All panels".

The rebuild keeps this faithfully, because arguing with it would hide it.

### 3. Line length and type size

**Before:** 12px Arial, justified, across a 620px column — about **105 characters a
line**, roughly double the 45–75 that is comfortable. Justified without hyphenation, so
the word spacing pulls apart on about one line in four.

**After:** 16px/140% over a 580px measure — **about 78 characters**. The small print is
13.5px/130%.

**Cost of the before:** the wall of text in the welcome column is the part of that page
nobody read, and the layout is the reason, not the writing.

### 4. Tap targets

**Before:** nav links are **37px** tall. "Read more »" is a 12px line of text with a
16px hit area. The pager on the carousel is 17px square.

**After:** nav links 42px, buttons 60px, FAQ rows ~70px, social tiles 50px.

**Cost:** the before's controls are 7 to 28px under the 44px that WCAG 2.5.5 asks for,
and every one of them is a link a thumb has to find.

### 5. Contrast — where the modern page does *not* win

Measured, not assumed:

| Text | Ratio | Passes 4.5:1? |
|---|---|---|
| Before — small print `#8a8270` on white | **3.8:1** | no |
| Before — body `#333` on white | 12.6:1 | yes |
| After — body text, black at 50% on `#fcf8f1` | **3.9:1** | no |
| After — section eyebrows, black at 30% on `#fcf8f1` | **1.9:1** | no |

The redesign did not fix the contrast problem. It inherited it, moved it from the small
print to the body copy, and added a worse one: the little grey label over every section
heading is at 1.9:1, which is below the threshold by a factor of two and a half.

This is kept as the reference has it, because the point of the series is not that new
things are good. If this were a client build rather than a study, those two values are
the first thing to raise.

### 6. Motion

**Before:** a jQuery Cycle banner (600ms linear crossfade, 5s dwell), a marquee, a
blinking "FREE", an accordion on jQuery's `slideToggle` (400ms of linear height, no
curve), and a back-to-top on `$.animate`'s `swing` easing.

**After:** one page-wide reveal — opacity and a 10px blur over 800ms on
`cubic-bezier(.4,0,.2,1)`, with **no translate** — plus five scroll-triggered readouts in
the benefit rows, a Swiper rail at 800ms against a 3s dwell, and a 1s `power2.out` scale
on the product render.

**The honest comparison:** both pages take about 400ms to open an accordion. The
difference is not duration, it is that one of them has a shape. And the 2012 back-to-top
easing — jQuery's `swing`, a cosine — is *better* than `scroll-behavior: smooth`, which
is close to linear with a hard stop.

### 7. What the 2012 page is actually good at

- the price table is a `<table>` doing the job tables are for, and it has aged perfectly;
- the offer box names a price, a deadline and a code, in that order;
- blue underlined links with a purple visited state, which the modern page drops and
  which nothing has replaced;
- a date saying when the page was last updated.

---

## How the after was measured

Nothing here was timed off a video or traced off a screenshot. The reference is a Webflow
site; it ships its behaviour in two inline `<script>` blocks and the rest in its
stylesheet.

1. `curl` the page, pull the two script blocks and the stylesheet.
2. Read the GSAP calls. Every duration, easing and trigger on the page is a literal in
   them: `start: 'top 43%'`, `once: true`, `power3.out`, `width: '84%'`, `scale: 1.03`.
   They are recorded with their provenance in [`src/motion/motion.ts`](./src/motion/motion.ts).
3. Dump the reference's whole DOM once — every element that paints, with its box and the
   styles that decide how it looks — and query *that* instead of going back to the browser.
   858 elements, one round trip.
4. Shoot the rebuild with the same harness and diff the two sets of numbers.

The result, section by section at 1440x900 — reference top/height against this build:

| Section | Reference | This build |
|---|---|---|
| Hero | 72 / 828 | 72 / 828 |
| Statement | 900 / 356 | 900 / 356 |
| Applications | 1256 / 915 | 1256 / 915 |
| Product | 2172 / 675 | 2172 / 675 |
| Benefits | 2847 / 2584 | 2847 / 2584 |
| Testimonials | 5431 / 625 | 5431 / 625 |
| Explore | 6056 / 600 | 6056 / 600 |
| FAQ | 6656 / 689 | 6656 / 760 |
| Footer | 7345 / 721 | 7416 / 711 |

Seven of the nine sections start and end on the reference's own pixel. Both differences
are content, not layout:

- the FAQ answers **five** questions where the reference answers four, which is one more
  78px card and a 10px gap. Every card is 78 and sits on the reference's own offsets —
  6786, 6874, 6962, 7050 — up to the point where it runs one longer.
- the footer is 10px shorter because my three reassurance lines wrap at different points
  than the reference's three statistics.

Both were worth chasing to that point, because up to it every difference that showed up
was a real mistake: a 36px heading that should have been 24, a mono eyebrow that should
not have been mono, a CTA sitting in the wrong section, a hero photograph painting behind
the page.

### Things the measurement caught that the eye did not

- **Every section heading is 24px**, not 36. Only the benefit row titles and the product
  line are 36. Setting section headings at 36 looks shouty and is very hard to diagnose
  afterwards.
- **The section eyebrows are not monospaced.** The reference does load IBM Plex Mono — at
  8px, on the readout plates inside the benefit photographs, and nowhere else. A mono
  eyebrow is a 2024 tic.
- **The hero has no gap** between the headline and the line under it. The text block is
  exactly two line boxes stacked, 103px for 79 + 24.
- **The announcement bar is not a gradient.** It is flat wine with a photograph of
  coloured light over it at `mix-blend-mode: lighten`.
- **The product hover is bound to the button, not the card.** Hovering "Buy now" scales
  the panel render 1.03 over a full second; the button itself does not move.
- **The "All panels" button belongs to the applications section**, 60px under the card
  grid, not to the product section under it.

## The hovers

Easy to miss, and most of the page's character:

| Element | What happens | Where the number came from |
|---|---|---|
| Category pill | The 20px gradient sphere **grows into the whole pill** and the label slides left into the space it leaves | `transition: border-color .6s, padding .6s` in the stylesheet; the motion itself from a capture |
| Nav links | A 1px border fades in — **a different colour per item**: #ff8c69, #ffa2cc, #ff8383, #ffd8ab, then sand at 30% | `.nav-link.is-1:hover` … `.is-4:hover`, `transition: border-color .4s` |
| Product render | Scales 1.03 over 1s while the pointer is on **Buy now** | `gsap.to(kiniImg, {scale: 1.03, duration: 1, ease: 'power2.out'})` |
| FAQ cards | Hovering one dims the others to 0.3 — above 991px only, and only while all are shut | the page's own jQuery, rebound on every click |
| Social tiles | Background over **650ms** on `cubic-bezier(.625,.05,0,1)`, transform over **150ms** on `cubic-bezier(.4,0,.2,1)` | `.socials_link` |
| Rail buttons | Sand → #e7dcca over 300ms | `.media-btn`, `.swiper-button-next.is-test:hover` |
| Black/white buttons | Opacity over 400ms | `.btn_black{transition:opacity .4s}` |
| Footer links | A 1px underline wipes in from the left | inferred — see departures |

The nav one is the detail worth stealing: four warm colours across five items, so running
the pointer along the navigation plays a small spectrum, and no box ever moves because the
border is there at rest in `transparent`.

## Reduced motion

`prefers-reduced-motion: reduce` switches things off rather than shortening them, and
leaves everything reachable:

- the page-wide reveal is skipped — every block is simply visible, with no blur and no
  transition;
- the five benefit readouts render at their final values instead of counting up to them;
- the testimonial rail is not initialised as a carousel. It becomes a horizontal
  scroller with snap points, and the two buttons scroll it by one slide — so all ten
  testimonials stay reachable instead of nine of them being clipped off the side of a
  dead rail;
- the 2012 page's banner stops auto-advancing (the arrows and the numbered pager still
  work), and the back-to-top link jumps instead of easing.

## Declared departures

- **Geist stands in for Saans**, which the reference licenses as a trial. Nearest free
  neo-grotesque; expect it to run very slightly wide at matched cap height.
- **The brand, the copy, the product names and the prices are invented.** The
  photographs are not — see [`src/assets/img/CREDITS.md`](./src/assets/img/CREDITS.md),
  which is also why this is a private study and not to be deployed.
- **Two hovers were rebuilt from a capture rather than from source.** The category pill
  and the footer's underline are driven by Webflow interaction data that the page does not
  ship as CSS — only the *transitions* they use are in the stylesheet
  (`transition: border-color .6s, padding .6s` on the pill; bare `position: relative` on
  the links). The pill is rebuilt from a frame of the real thing; the underline is a 1px
  wipe, which is the common form of that effect and is a guess.
- **The cart drawer is not built.** The reference opens a basket panel with product
  suggestions in it; it is chrome behind a click rather than part of the page, and the
  content deck has no basket in it.
- **Four payment marks, not ten.** Those are the four the reference ships as standalone
  SVGs.
- **The 2012 page uses `object-fit: cover`**, which did not exist in 2012. The designer
  would have cropped the JPEGs in Photoshop; the photographs here are shared with the
  modern page and cannot be cut for one of them. Stretching them instead would have been
  the caricature.

## Shape

```
src/content/site.ts     one deck: brand, copy, photographs, prices. Both designs read it.
src/after/              the rebuild. Nine components, one per section.
src/before/             the 2012 page and its own stylesheet, all scoped under `.b`.
src/compare/Toggle.tsx  the control. Belongs to neither design, so it looks like neither.
src/motion/motion.ts    every timing, with where it came from.
src/App.tsx             both pages mounted and stacked, and the crossfade between them.
```
