# medivra — episode 26

A hospital ward's nursing console, rebuilt from a posed design board as a working
three-tab shift board. Port 5400.

```bash
npm install && npm run dev                              # http://localhost:5400

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5400/ --click "[data-tab='patients']"
node ../tools/drive.js drive/shift.json
```

## The reference

`ref/shot.png`, 1200×1500: a browser window posed on a grey board with the designer's own
chrome around it — a name chip, a year, a "Dashboard Design" label and a phone number. All
of that and the window frame are presentation furniture and all of it is dropped.

refscan read `#d9d9d9` across 48% of the frame (the board), `#fbfbfb` for the page and
`#748d53` for the one accent. The window's tab reads "Rexora - Sales Management" above a
nursing dashboard, which is the first sign the picture is a mock-up rather than a product.

**Figtree** carries the whole interface, with tabular figures everywhere: a ward list is
read down its columns — bed, score, time due — and proportional figures cannot be.

### The split, measured

`#748d53` is **3.70:1** against white. That clears the 3:1 a graphic needs and fails the
4.5:1 type needs, so it is the _mark_ colour — the logo tile, a ring's arc, a bar, a dot —
and `--color-accent-deep` `#4e6a2f` (6.1:1) is what any word, pill or button uses.

The clinical colours are not decoration and are not chosen one at a time. An escalation
band is read across a ward at a glance, so each band carries a ground _and_ a text colour
that clears 4.5:1 **on that ground**: `--color-band-low` on `--color-band-low-wash`, and
the same for the middle and high bands.

## The three tabs

**Dashboard, Patients and Assignments** are built. **Doctors, Medications** and
**Reports** stay in the bar and are genuinely inert: dimmed to their own token
(`--color-muted-inert`, still 5.1:1 — being inert does not exempt a word from being
readable), `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click
does nothing.

Dashboard because it is the screen that was dropped. Patients because the picture counts
patients four ways and never lists one. Assignments because the reference's nav has a
Schedules destination it never shows, and who holds which bed is the question a nurse in
charge answers every hour.

Two destinations are **added**: Medications, because administering them is most of a
nursing shift, and Reports, because the ward's figures have to leave the screen. Both are
inert, and naming them is more honest than a four-item nav that implies this is
everything.

**One patient list feeds all three tabs.** Eighteen patients carry a bed, a diagnosis, a
set of observations, flags, an acuity in hours and a nurse. The dashboard's four counts,
the escalation bands, the task board, the ward list, the nurse loads and the handover
notes all read them. Change one respiratory rate in `src/data/deck.ts` and the score, the
band, the ward list, the dashboard's counts and that nurse's load all move together.

### The score is computed, never stored

Each observation contributes 0–3 and the total decides how often the patient is seen. It
is written out in `score()` and derived from the observations on every render, because a
stored score beside a changed observation drifts silently — which is the one failure a
ward board cannot have. The bands and what each one requires are in the deck beside it.

## Interactions

Every one is a beat in `drive/`. The three files run **62 beats with zero problems**, plus
a five-beat hover sweep.

| Control                                | What happens                                              | Beats file    |
| -------------------------------------- | --------------------------------------------------------- | ------------- |
| Still to do / Done / All               | Three lenses over the shift's tasks                       | `shift`       |
| An escalation band                     | Filters the task list to that band's patients             | `shift`       |
| A task                                 | Opens that patient on the ward list                       | `shift`       |
| A handover note                        | Opens the patient it is about                             | `shift`       |
| Hover the trend                        | The hour and the share in band 0–4                        | `shift`       |
| Search                                 | Filters tasks, beds or nurses — whichever tab is showing  | all three     |
| Highest score / due / bed / care hours | Four orders on the ward list                              | `patients`    |
| A band tile                            | Narrows the ward to that band, and back                   | `patients`    |
| A patient row                          | Expands to all six observations and the admission         | `patients`    |
| By care hours / name / escalating      | Three orders on the board                                 | `assignments` |
| A nurse row                            | Expands to the beds they hold, with each one's score      | `assignments` |
| A bed                                  | Opens that patient on the ward list                       | `assignments` |
| Scroll                                 | Four regions scroll inside the shell; the page never does | all three     |
| Tab, Tab                               | A visible focus ring, proved as a beat                    | `shift`       |
| Three inert destinations               | **Nothing.** Proved with `expectUnchanged`                | all three     |

## What the probe and the beats found

- **The nurse loads were nonsense on the first render** — one nurse at 0% and three over
  100%, because the assignments were written by hand and never summed. The board is
  rebalanced so every nurse is between 75% and 94% and the ward keeps 5.5 spare hours,
  which is the number the whole tab exists to show.
- **A task's nurse was stored beside the patient's nurse**, and the two drifted apart the
  moment the board was rebalanced: one nurse held three patients and none of their work.
  `taskNurse()` derives it from the bed.
- **Three contrast failures**, all the same one: the inert nav words at `text-muted/70`,
  3.17:1.
- **The clock was clipped off the bar at 1280.** Every item in the header group was
  `shrink-0`, so the group could not give ground and the shell's `overflow: hidden` took
  the last chip — with no horizontal scroll to report it. The search is the one thing in
  there that can shrink, and now does.
- **Four hover rules matched nothing.** Three were seeded `Controls` components no pane
  calls — `Controls.tsx` is down to the segmented control this build actually uses — and
  the fourth was real but only exists on an expanded nurse row, so the sweep clicks
  through to it.
- **One card squeezed another.** A separate "care hours" card left the handover panel 88px
  and one visible note; the load meters moved into the nurses card and the handover got
  its height back.
- After those: 0 contrast failures on all three tabs, no duplicate SVG def ids, every
  chart labelled, no dead space over 24px, no document or horizontal scroll at 1280, 1440
  or 1920, and no animation running at rest.

### Targets under 44px

Listed by the probe, with the reason. Nothing is under 24px: the lens and sort pills are
28px and the flag discs on a ward row are 24px, which is the floor itself — they are
indicators with a tooltip rather than controls, and the row around them is the target.

## Declared departures

1. **Built at 1440×900**, and the ward runs to the window edge.
2. **The brand and the hospital are invented.** The reference reads "Rexora" and
   "St. Mary's Medical Center"; this is **Medivra** at **Elmridge General**. A real
   institution over invented observations is the one thing this series must not produce
   (rule 8).
3. **The four counts add up.** The reference's rings read 128 total, 86 stable, 12
   critical and 24 discharges, which leaves thirty patients in no category at all. These
   four are computed from one list: on the ward, stable, escalating, for discharge.
4. **"Appointments" is this shift's work.** The reference lists five appointments for the
   same patient — "Michael Chen · Follow-up Consultation" five times — counts them as 3,
   and mixes 24-hour times with 2:20 and 3:20. This is eighteen tasks across eighteen
   patients, each with its nurse, its state and the time it is due.
5. **The shift clock agrees with itself.** The reference prints 60% elapsed beside
   "7:00 AM - 4:00PM" and "3h 12m remaining"; 60% of nine hours leaves 3h 36m. Both
   numbers here come from the same clock.
6. **"Patient Flow 900 / 100% Capacity" is gone.** A 32-bed ward with 900 of something at
   100% capacity and a 400 marker beside it is not a measurement. In its place: the
   escalation bands, which are counts of patients with the action each one requires.
7. **The AI assistant is a handover panel.** The reference gives that slot to an assistant
   selling credits and offering "Why is my HRV low?" — heart-rate variability is a
   consumer wearable's metric, not a nursing one, and an upsell is not a ward tool. A
   ward's fourth panel is the handover: the artefact the next shift cannot start without.
8. **It is nurses, not doctors.** The reference's one staff list on a _nursing_ dashboard
   is five doctors with duty states. The doctors are still in the nav; the board shows who
   is on the ward, what they are holding and whether it fits their roster.
9. **"Recovery 86%" has a denominator.** It is the share of the ward scoring 0–4, against
   a stated ward target, hour by hour.
10. **One search for the whole ward.** The reference puts a search glyph inside the doctor
    card and nowhere else, which finds one list out of five.
11. **A visible focus ring everywhere.** The picture has none.
12. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the rings are drawn at their arcs, the meters at their widths, the trend at its
path, every figure at its final value. Shot as `shots/reduced.png`, pixel-identical to
`shots/shift.png`.
