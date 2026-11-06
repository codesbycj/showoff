# parlexa — episode 27

A language-learning app, rebuilt from a posed design board as a working three-tab study
console. Port 5404.

```bash
npm install && npm run dev                              # http://localhost:5404

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5404/ --click "[data-tab='courses']"
node ../tools/probe.js http://localhost:5404/ --click "[data-theme-btn='dark']|[data-tab='courses']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 752×564: a rounded app window posed on a purple gradient board. The board
and the window's own frame are presentation furniture and both are dropped; the app inside
is about 700×480 of the picture, which is well under a third of the pixels this is built
at.

refscan read `#fefefe` for the page, `#a6b6e9` for the one accent and four pastel card
tints — lavender, blue, green and pink — which are kept exactly.

**Outfit** carries the interface: a geometric sans with a tall x-height, which is what the
reference's display title is set in, and tabular figures for the minute counts.

### The split, measured

`#a6b6e9` is **2.00:1** against white. It cannot carry type at all, so it is the _mark_
colour — the logo's inner stroke, a chart's fill, a card's tint — and `--color-accent-deep`
`#514f8c` (7.4:1) is what any word, pill or bar uses.

The four card tints are the same case from the other side: they are grounds, never ink.
Each carries `--color-ink` at 11:1 or better, which is why the course cards keep their
colour and stay readable — but a _muted_ grey on a pastel is only 4.5:1, so the blurb on a
tinted card is set in `--color-body` rather than `--color-muted`.

The three series colours are chosen together rather than one at a time: theory blue,
practice pink and lexicon green each clear 4.5:1 on white, so a legend chip, a stacked
band and a figure can all be set in the same colour.

## The three tabs

**Dashboard, Progress and Courses** are built. **Speaking, Review** and **Community** stay
in the bar and are genuinely inert: dimmed to their own token (`--color-muted-inert`, 5.2:1
in light and 4.8:1 in dark — being inert does not exempt a word from being readable),
`aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click does nothing.

Dashboard because it is the screen that was dropped. Courses because the reference's own
nav promises it and its "Select a course" card shows three tiles with no way into one.
Progress for the same reason, and because a streak, a word count and a skill level are
claims the picture makes and never supports.

Review and Community are **added**: spaced repetition is most of a language learner's day
and the friends board has to lead somewhere.

**One course list and one week of minutes feed all three tabs.** Six courses carry their
lessons; seven days carry their minutes split three ways. The chart, the homework bars, the
goal ring, the streak, the skill breakdown and the catalogue all read them. Change one
day's minutes in `src/data/deck.ts` and the chart, the weekly total, the rail's ring and
the progress tab all move together.

## Interactions

Every one is a beat in `drive/`. The three files run **58 beats with zero problems**, plus
a four-beat hover sweep.

| Control                       | What happens                                              | Beats file  |
| ----------------------------- | --------------------------------------------------------- | ----------- |
| Weekly / Monthly              | Two windows on the same chart, seven days or four weeks   | `dashboard` |
| A legend chip                 | Drops that band out of the stack and rescales the axis    | `dashboard` |
| Hover the chart               | The day, all three figures and the total                  | `dashboard` |
| All / Top 3                   | Two scopes on the friends board                           | `dashboard` |
| A course tile                 | Opens that course on the Courses tab                      | `dashboard` |
| All courses / Mine            | The catalogue, or the three already started               | `courses`   |
| Any level / A2 / B1 / B2 / C1 | Filters the catalogue by level                            | `courses`   |
| A catalogue row               | Changes the whole detail pane, lessons and next-up        | `courses`   |
| Where I am / What moved       | Sorts the skills by level, or by what gained most         | `progress`  |
| Light / Dark                  | A real theme, not two icons                               | all three   |
| Search                        | Courses and lessons on two tabs, skills on the third      | all three   |
| Scroll                        | Five regions scroll inside the shell; the page never does | all three   |
| Tab, Tab                      | A visible focus ring, proved as a beat                    | `dashboard` |
| Three inert destinations      | **Nothing.** Proved with `expectUnchanged`                | all three   |

## What the probe and the beats found

- **Two cards overflowed a third.** The progress tab's right column held 767px of cards in
  610, and `Card` does not clip — so the vocabulary list painted straight over the one
  below it. "Courses under way" moved to the left column, under a Skills card that had
  130px of nothing beneath it.
- **A quarter of the course card was empty.** It listed only the three enrolled courses;
  it lists all six now, started first, and scrolls.
- **Five contrast failures in dark that light passed**: the inert nav words at 4.29:1, and
  `--color-muted` at 4.41:1 **on a segmented control's track** — it cleared the surface at
  5.7:1 and the track is darker. A token has to clear every ground it lands on, not the
  commonest one.
- **A stacked area left slivers of background between its bands.** The upper edge was
  smoothed and the lower edge was straight, so a band's floor was not the ceiling of the
  one under it. Both edges are straight segments now, which also stops the chart inventing
  minutes between two days.
- **Three seeded `Controls` components matched no hover rule**, because nothing calls
  them. `Controls.tsx` is down to the segmented control this build uses.
- After those: 0 contrast failures on all three tabs **in both themes**, no duplicate SVG
  def ids, the chart labelled, no dead space over 24px, no document or horizontal scroll at
  1280, 1440 or 1920, and no animation running at rest.

### Targets under 44px

Listed by the probe, with the reason. Nothing is under 24px: the segmented pills are 28px,
the legend chips 32px and the calendar squares 36px.

## Declared departures

1. **Built at 1440×900**, and the app runs to the window edge.
2. **The brand is invented.** The reference has no name anywhere; **Parlexa** is added,
   with the mark drawn in the same idiom — two speech tails meeting, which is one language
   passing into another.
3. **The chart's axis is in minutes, on even ticks.** The reference's reads
   `0% / 40% / 80% / 100%`: three steps, two of them 40 and one of them 20, and a
   percentage of nothing stated. These are minutes a day, and the ticks come from the data.
4. **The three series are stacked, not overlaid.** They are parts of one day; three
   independent curves make the day's total — the number a learner actually tracks —
   impossible to read. The top edge of the stack is the total, and the legend is a control
   so any one band can be taken out.
5. **The tooltip says what it is.** The reference's reads "+12 · More practise", with no
   unit, no day and the British spelling against "Practice" in its own legend.
6. **Every homework percentage is a count over a count.** The reference prints "Learn 10
   new words today" at 57%, which is five and seven tenths of a word; this reads "6 of 10
   words · 60%".
7. **The learner is on their own leaderboard.** The reference's "Friends Score · See how
   you rank among friends" lists four other people and not the user, so there is no rank in
   it. Mira is third of six, highlighted, and the card says so.
8. **The rail carries information.** The reference's is six unlabelled glyphs that cannot
   be told apart or reached by keyboard. Here it holds the three things a learner opens the
   app to check — the streak, today's minutes against the goal, and the week — and the
   theme toggle, which is real.
9. **"832 words" is broken into what it means.** New, learning, known and mastered are the
   four states a review schedule is made of; a single count is not a claim about anything.
10. **The streak has its calendar.** Twenty-eight squares, each one a day's minutes, so
    "23 days" can be checked rather than believed.
11. **Dates are formatted the same way.** The reference's read "27 Apr 2025", "30Apr 2025"
    and "15 May 2025".
12. **A visible focus ring everywhere.** The picture has none.
13. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the bands are drawn at their heights, the meters at their widths, the goal ring
at its arc, every figure at its final value. Shot as `shots/reduced.png`, pixel-identical
to `shots/dashboard.png`.
