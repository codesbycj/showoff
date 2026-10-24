# verge — before / after, episode 3

One business, two designs, and a button that crossfades between them.

**verge** is an invented company that runs cycle-to-work schemes, pool bikes and commute
rewards for UK employers. The *after* is the site it should have. The *before* is the site
it bought — and this episode's angle is **the template clash**.

```bash
npm install
npm run dev        # http://localhost:5224
```

The toggle is bottom-centre and says **Before CJ / After CJ**.

---

## This episode's before

Nothing here is dated and nothing is broken. Every block is a current, competent component
of the kind that ships in a multipurpose theme with forty demo layouts. The failure is
that eleven of them are on one page and none was drawn for this company:

- a hero photograph of a **meeting room**, selling a cycling scheme;
- a parallax band, a counter band, an icon-circle grid, a pricing table with a "most
  popular" ribbon, a testimonial slider, a team grid, a blog teaser, a newsletter bar;
- section padding that never repeats — 80, 110, 100, 60, 80, 90, 45, 60, 80, 45 — because
  each block brought its own and nobody has opened the stylesheet to reconcile them.

It is the most common failure in B2B and the hardest to argue with, because every
individual part of it is fine.

## The diagnosis

Measured on both designs at 1440×900 with the same probe.

### 1. How many ways the page says "click here"

| | before | after |
|---|---|---|
| Distinct button treatments | **6** | 2 |

Six: a blue 3px-radius solid, a green 40px-radius uppercase pill, an orange square-cornered
Arial Black block, a white ghost outline, a navy input-attached button, and a bare text
link with an arrow. **Four of them are visible at once in the first screen.** The after has
two — one solid, one inverted — and both are the same component.

### 2. How many typefaces

| | before | after |
|---|---|---|
| Families carrying body text | **3** | 2 |

Georgia for headings, Trebuchet for body, Arial Black for the counters. Each was a default
in whichever demo that block came from. The after uses Bricolage Grotesque for display and
Public Sans for text, and the split is by job rather than by section.

### 3. How many colours a full-width band can be

| | before | after |
|---|---|---|
| Distinct large-block background colours | **5** | 3 |

White, grey, navy, green, orange. None of them is the logo's green, which appears only in
the wordmark and on two of the six buttons.

### 4. Length

| | before | after |
|---|---|---|
| Page height | 6,918px | **8,688px** |

The after is **26% taller**, and that is the trade. It spends the height on one thing the
before does not do at all: a section that argues there is a problem worth solving before
it starts selling. A reader who has not agreed to that is not reading the pricing table.

### 5. What the before does better

- **The phone number and the email are in a bar on every screen.** The after has them in
  the footer.
- **The FAQ is open.** All five answers are readable without a click; the after makes you
  open four of them.
- **The pricing table is a pricing table.** Three columns, one ribbon, instantly
  comparable. The after's three cards are better looking and marginally harder to compare.

## How the after was measured

The reference is a Nuxt build whose motion is almost entirely in per-component CSS. There
is no timeline to find and no bundle to read — which makes it the easiest kind of site to
measure wrongly, because the vocabulary is only visible when you pull every declaration
out at once and count:

```bash
for f in *.css; do grep -ohE "transition:[^;}]*" $f; done | sort | uniq -c | sort -rn
grep -ohE "[^{}]*:hover[^{}]*\{[^}]*\}" *.css | sort -u
```

Four curves came back, used everywhere, plus one spring expressed as a sampled `linear()`.
Three durations carry everything: 0.3s for colour, 0.5s for interface parts, 0.7–1.2s for
structure. That discipline is the thing worth taking, and
[`src/motion/motion.ts`](./src/motion/motion.ts) records each curve with the job it does
here.

**No tween library and no scroll library.** Every movement in this episode is a CSS
transition or a keyframe, which is how the reference does it too. The build is 267kB where
episode 2's was 416kB.

## The hovers

Rule 5: find them all, build them, photograph each one. The hover grep is also what turned
up the signature interaction, which no screenshot would ever show.

| Element | What happens | Timing |
|---|---|---|
| **The swoosh button** | Three fill layers, each 120% wide and tilted 12°, sweep up from below staggered 64ms apart, while the label somersaults out and an identical label somersaults in from underneath | 0.6s fill, 0.75s labels on a spring |
| Links | The underline is there at rest and **retracts to the right** — a response rather than an introduction | 0.5s |
| Tabs | The inactive one dims to 50%, its rule scales to zero from the left | 0.5s |
| Journal rows | The whole row is a link; the title's rule retracts like any other | 0.5s |
| Footer links | Pick up the accent, no underline — the footer has enough rules in it | 0.3s |

The stagger on the fill layers is **negative at rest and positive on hover**: same three
layers, opposite order, so leaving is not the entrance played backwards.

## Reduced motion

Switches things off and leaves everything reachable: the hero wedge does not draw itself,
the marquee stops and the names stay on screen, wipes render in place, the swoosh becomes
a button that changes colour, and the parallax is not bound at all. The estimator slider
and the audience tabs work identically either way.

## Declared departures

- **No imagery, copy, logos or branding from the reference.** Including its customer band:
  ours is eight invented company names set in type, because a fictional logo is still a
  logo somebody has to draw.
- **The statistics are invented**, written in the shape a real scheme would publish them
  and labelled as illustrative on both designs.
- **The estimator's rates are invented** and say so inside the component, at the same size
  as the figures rather than in grey underneath them.

## Shape

```
src/content/site.ts     one deck: brand, copy, photographs, prices. Both designs read it.
src/after/              thirteen components, plus the swoosh button
src/before/             the bought theme, in three files and its own stylesheet
src/compare/Toggle.tsx  the control, which belongs to neither design
src/motion/motion.ts    every curve and duration, with where it came from
tools/                  how the photography was sourced and cropped
```
