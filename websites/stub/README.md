# stub

One section of a reference site, rebuilt: three ticket cards come up from below the fold
face-down, then turn over one after another while the headline behind them goes soft and
the whole stage changes colour.

```bash
cd websites/stub && npm install
npm run dev          # http://localhost:5200
```

Install from inside this folder. `npm --prefix websites/stub install` from the repository
root writes a dependency on the Expo project above into this `package.json` — see the
note in [`../README.md`](../README.md).

Stub is invented. The studio, the three tiers, the prices and every line of copy are
made up, and the red is a neighbour of the reference's rather than a copy of it. What
was taken from the reference is the motion, which is in
[`src/motion/motion.ts`](./src/motion/motion.ts) with its provenance beside each number.

## How the timings were recovered

The reference is a Webflow site, and that is the whole story. A Webflow site ships its
interactions as data: the page bundle carries them as an IX2 action list, and the
keyframes are plain numbers sitting in the open. Watching the thing play, frame by frame,
would have been slower and less accurate.

The script filenames in the page source name the stack before you read a line of it —
GSAP, ScrollTrigger, SplitText, Lenis. The section itself turned out not to use any of
them.

**1. Find the action list.** The page chunk is minified onto one line, so grep for a class
name you can see in the DOM and read outwards:

```bash
curl -sL https://<reference> -o index.html
grep -oE 'src="https://cdn\.prod\.website-files\.com/[^"]+"' index.html   # the chunks
grep -c 'service_card' neutomni-*.js                                      # which one
```

It opens with its own name, which is as good as a comment:

```js
"a-6": { id: "a-6", title: "Service cards (desktop)",
         continuousParameterGroups: [{ type: "SCROLL_PROGRESS", ... }] }
```

**2. Print the keyframes.** The slice between that id and the next `"a-N":` splits cleanly
on `{keyframe:N,actionItems:` and each item carries a `selector`, an `actionTypeId`, an
`easing` and its values. Forty lines of Python turns 11KB of minified object literal into
the table that became `motion.ts`.

**3. Find what drives it.** Search for the list's id in the events, not the actions:

```js
"e-172": { eventTypeId: "SCROLLING_IN_VIEW",
           action: { config: { actionListId: "a-6" } },
           config: [{ continuousParameterGroupId: "a-6-p", smoothing: 60, ... }] }
```

**4. Then check it, rather than trusting it.** Headless Chrome over CDP, scroll to a
position, wait for the smoothing to settle, read the computed transform off each card.
This is what fixed the easing: Webflow writes `easing: "easeInOut"` and there are several
curves that could mean, but only one of them predicts a card at 690.3px when the page
reports 690.6px.

It also caught something the bundle alone would have got wrong. The list carries a second
blur animation, aimed at the italic line of the headline between keyframes 45 and 52. It
is dead — its action item targets an element id that no longer resolves, and the live page
reports `filter: none` on that line at every scroll position. The bundle says the italic
line blurs. It does not.

## What it does

All of it is in `motion.ts`; this is the shape.

| Progress | What happens |
| --- | --- |
| 0 – 30 | A blurred blob grows out of the top edge and the stage turns from white to blue. The cards have not moved. |
| 30 – 35 | All three cards leave at once, still face-down. The headline's sans lines reach full blur. |
| 35 – 45 | The first card finishes its rise and its turn together, and lands face-up. |
| 45 – 52 | The second lands. |
| 52 – 60 | The third lands, and the pill and the small print fade in behind it. |

## The hover

A separate interaction, and a separate pair of action lists — `a-27` "Service Cards on
Hover" and `a-28` "Service Cards on Hover 2", bound to `.service_card_front`, with every
target scoped to `useEventTarget: "CHILDREN"` so one card's stub moves and its neighbours'
do not.

Only the stub moves. The face does not lift, tilt or scale, which is worth saying because
it is the first thing you would reach for: the card stays put and the bottom quarter of it
comes away — 16px down, 5° about its own centre, over 500ms, on
`cubic-bezier(0.579, 0.423, 0.17, 1.452)`. That last control point is past 1, so the stub
drops a little further than 16px and settles back up. Coming back is 300ms of `outSine`
with no overshoot: it just returns.

Hovering the reference's middle card leaves `.card_bottom` at
`matrix(0.996195, 0.0871557, -0.0871557, 0.996195, 0, 16)`. This build reports the same
matrix, to every digit. The check that it is a rotation about the centre rather than a
resize is the bounding box: 163 × 334 at 5° should measure 191.5 tall, and the page
reports 191.

At the same time the barcode closes into a button. In the reference that is a
`PLUGIN_LOTTIE` action driving a 294 × 48 file at 60fps with an out point of 30 — half a
second, 36 bars on 72 layers. Here each bar slides and widens into a gapless slot, which is
the same interpolation without shipping a player for one file. The bars overlap by 1.5
units at full close: butted exactly edge to edge, the joins land on fractional pixels once
the stage is scaled and the "solid" bar comes out ruled with hairlines.

The morph rides a registered `--morph` custom property that the stub transitions and every
bar reads through `calc`. It has to be registered with `@property` — to the engine an
unregistered custom property is a string, and strings do not interpolate. Where `@property`
is unsupported the value jumps and the button simply appears, which is the right thing to
fall back to.

The hover is also `:focus-within`, so the call-to-action inside is reachable by keyboard
and shows itself when it gets there rather than being an invisible tab stop. And the
trigger is the whole card rather than the stub, because the stub leaves the cursor as it
goes and triggering off it would make it chatter.

The one number in `motion.ts` that is a judgement rather than a reading is the smoothing.
The reference binds its timeline with `smoothing: 60`, but that dial is not a time
constant and the probe deliberately let every sample settle so the keyframes could be read
without it, so the lag is modelled as a half-life and matched by feel.

## Decisions worth knowing about

**The stage is scaled, not reflowed.** The card, the gap, the 860px the cards rise through
and the 2000px of perspective they turn under were all measured off one 1512×950 frame and
only agree with each other at that size. So the stage is laid out at those numbers and
scaled as a unit. Zoom a space and everything in it stays in proportion; reflow it and the
rise distance has to be re-derived per breakpoint.

**Below 1100px the cards share a box.** That is the reference's own breakpoint behaviour —
it sets `position: absolute; inset: 0 0 auto` on the second and third cards — and the deal
still reads, because the stagger is in time rather than in space. The one departure: the
reference lands all three in exactly the same place, which leaves the first two
permanently buried. A few pixels of fan fixes that and costs nothing.

**The track is shorter than the reference's.** The reference runs 1000vh and spends the
last 40% of it holding the finished frame while it hands over to the section below. There
is nothing here to hand over to. The track is cut to the point where the pace of the beat
still matches — 45 keyframes worth 4714px against the reference's 4702 — with a screen of
pinned hold left after the last card lands. The arithmetic is written out in `motion.ts`,
because the trap is that progress and the pin do not cover the same range, and a hold that
looks generous on paper can land the last card as the section starts sliding away.

**Reduced motion switches the section off.** The track collapses to its content, nothing
is pinned, and the cards are face-up where they were going to end. That setting exists to
stop pinned sections, not to play them faster. The hover keeps its affordance and loses
its movement: the stub does not tear and the bars do not travel, the button is simply there
— which is the information the motion was carrying.

## Credits

No photography. The barcode, the block mark, the registration crosshair and the feed
arrows are all drawn from path data in [`src/components`](./src/components) — nothing is
an icon font and nothing is an emoji, both of which differ enough across platforms to make
a registration mark render as a dingbat.

Type is [Geist](https://vercel.com/font), [Instrument
Serif](https://github.com/Instrument/instrument-serif) and [IBM Plex
Mono](https://github.com/IBM/plex), all open licence, via Fontsource.
