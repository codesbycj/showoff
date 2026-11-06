# The design bar

**Rules every app build must pass before it is handed over.** These are not
style advice and they are not negotiable per screen. A screen that fails one of
them is not finished, however good the rest of it looks.

They exist because a batch of forty-one showcases shipped with: a quarter of one
screen empty in the middle, body copy nobody asked for running two lines deep,
control discs sitting on top of the chart bars they belong to, and dock labels
at 2:1 contrast. None of it was caught, because nothing was _measured_ — the
only automatic check in the repo looked at the foot of the screen and nowhere
else.

So every rule below has a number, a measurement, and a command that reports it.
If a rule cannot be measured it is not in this file.

---

## The gate

With the dev server up, for **every screen of every showcase**:

```bash
node tools/preview/audit.js <slug>          # DOM audit: must print "no failures"
node tools/preview/shoot.js <slug> shot.png && python tools/preview/foot.py shot.png
```

`audit.js` exits 1 on any FAIL. **A screen is not done until it exits 0**, and
the handover quotes its output for each screen. "I looked at it and it seemed
fine" is what produced the batch this file is reacting to.

WARNs are judgment calls, not noise. Each one is either fixed or named in the
handover with the reason it stands. An unexamined WARN counts as a FAIL.

---

## R1 — The screen is full, all the way down and all the way through

No run of empty canvas over **48dp between blocks** (FAIL at 72dp), and no more
than **24dp of dead canvas at the foot**, measured from the safe area.

- `audit.js` reports `GAP` and `FOOT`. `foot.py` is the pixel authority for the
  foot; the DOM measurement is there to agree with it.
- **`FOOT` passing proves nothing about the middle.** voltprompt read 8dp dead
  at the foot — it ends on a pinned ask bar — while carrying 146dp of white in
  the centre of the screen. That is the screenshot the complaint keeps coming
  back to, and it is why `GAP` exists.
- A `ScrollView` carries `flexGrow: 1` and will happily eat every spare dp into
  one hole below the last block. Either the content fills it, or the block above
  grows, or there should not be a scroller there.

**The fix is never padding and never a spacer.** Make the hero bigger, open the
rhythm out, let the list run under the edge, add the row the reference crops.
Scale up; do not spread out.

## R2 — Nothing is clipped and nothing leaves the frame

No painted element crosses x=0 or x=393 unless it sits inside a horizontal
scroller, and no text box sticks out of an ancestor that clips.

- `audit.js` reports `OFFSCREEN` and `CLIPPED`.
- A line of body copy losing its last word off the right edge, or a caption cut
  in half by the rounded box of the photo it sits on, is a defect at any zoom.
- A row that genuinely runs off the edge is a **horizontal ScrollView**, not a
  wrap and not an overflowing fixed row.

## R3 — Nothing collides

A floating control, badge or rail may sit _inside_ a surface, but it may not
straddle the edge of the content it covers.

- `audit.js` reports `COVERED` — it only fires when the two boxes overlap
  partially, which is the shape an accident has. Wholly-inside is layering by
  design and is ignored.
- Covering **text** is a FAIL. Covering a bar, a photo or a shape is a WARN and
  needs a reason: a tool rail half on the last bar of its own chart is not one.
- The fix is to inset the content, not to move the control one dp.

## R4 — Every string is readable

Body text at **4.5:1** against its background, large or bold text (≥24dp, or
≥19dp bold) at **3:1**.

- `audit.js` reports `CONTRAST`, resolving the real background off the hit
  stack, and skips text over photography — judge that by eye.
- The muted grey from the reference is the usual offender: it is picked to look
  calm in a design shot and it lands at 3.2:1 on a white card. An inactive dock
  label at 2:1 is not "muted", it is unreadable.
- **Fix the reference's mistake.** A design shot is not an authority on
  contrast; see the inspo-brief rules in AGENTS.md.

## R5 — Copy is labels, not prose

**Never write a sentence the design does not have.** The data file carries what
the screen says, and what it says is what the reference says, trimmed to fit.

- Hard ceilings: a chip or tab ≤ 2 words; a card title ≤ 40 characters; any
  single run of body copy ≤ 110 characters, and **one line wherever the design
  shows one line**.
- `audit.js` reports `COPY` over 110 characters.
- "Balanced meals fuel energy, steady focus and consistent progress — you are
  40% of the way there" is 94 characters of invented motivational filler under a
  progress bar that already says 40%. It made the block two lines taller, it
  said nothing the bar did not, and it is exactly the thing that reads as
  padding. If a block looks short, R1 says make it _bigger_, not wordier.
- Microcopy that _does_ earn its place: a unit, a count, a state. Anything that
  reads like it was written to fill a gap was.

## R6 — One screenful, not a scroll essay

The recorded frame is the first screen. Content runs past the frame only when
the design is a list or a sheet that genuinely continues, and then by a little.

- `audit.js` reports `SCROLL` as a multiple of the screen; over **1.6 screens**
  is a WARN that must be justified in the handover.
- Inventing sections below the fold — a full nutrition table under a dish sheet
  the reference ends after two rows — is not generosity, it is the same padding
  reflex as R5 pointed downwards.

## R7 — Controls are at least 44dp

Every pressable is ≥44dp in both directions, or has hit slop that makes it so.

- `audit.js` reports `TAP` with the measured box. A 34dp icon button is a WARN
  by default because the reference drew it that way; the fix is `hitSlop`, and
  the handover says so.

## R8 — One thing is the biggest thing

Each screen has a single dominant element — a hero, a figure, a headline — and
everything else is visibly subordinate. Two blocks competing at the same weight
is the most common reason a build "looks like a toy" while every measurement
passes.

Not machine-checkable. Check it by looking at the shot at 100% and naming the
dominant element out loud in the handover. If naming it is hard, the screen does
not have one.

## R9 — The picture agrees with the numbers

A bar chart's tallest bar is its largest datum; a ring at 40% sweeps 40%; a
"+360%" headline is computed from the series under it, not typed next to it.
Ticks bracket the data rather than stopping at the maximum.

## R10 — The handover proves it

Every handover ends with, per screen:

```
<slug>  audit: no failures (N warnings: <one line each, fixed or why not>)
        foot: <n>dp dead
        dominant element: <what it is>
        deviations from the reference: <list, with the reason>
```

A handover without those four lines is not a handover. This is the rule the
other nine depend on: the batch that caused this file was not built blind, it
was built unchecked.

---

## What this does not change

`AGENTS.md` still governs everything else — pixel accuracy against a screenshot
reference, the inspo-brief exemptions for a design shot, what is in drawing
range, one showcase per screen, component-at-a-time assembly, the staging and
the done-gate. These rules sit **on top** of it: passing them is necessary, not
sufficient. A screen can pass every check here and still be wrong against its
reference.

Where this file and a reference disagree, this file wins, and the handover says
which rule overrode what.
