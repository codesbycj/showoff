# skillra — episode 29

An e-learning platform, rebuilt from a posed design board as a working three-tab study
console. Port 5412.

```bash
npm install && npm run dev                              # http://localhost:5412

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5412/ --click "[data-tab='courses']"
node ../tools/probe.js http://localhost:5412/ --click "[data-theme-btn='dark']|[data-tab='courses']"
node ../tools/drive.js drive/learn.json
```

## The reference

`ref/shot.png`, 1200×900: a rounded app window posed on a pale gradient board. The board
and the window's own frame are presentation furniture and both are dropped.

refscan read `#e9e9e9` for the board, `#ffffff` for the cards and a near-black for the
pills. Sampling inside the window gives the page's own ground as `#f4f1ec` — a warm cream
rather than grey — and the accent as `#ffce1f`.

**Manrope** carries the interface: a grotesque with a tall x-height and tabular figures,
which a column of runtimes needs.

### The split, measured

`#ffce1f` is **1.49:1** against white, and 1.5:1 against its own white type. It is a
_ground_ and nothing else — the active pill, the play button, a progress bar — and what it
carries is ink at **10.9:1**. `--color-accent-deep` `#8a6008` (5.6:1) is the one any yellow
_word_ on a light ground uses.

**The inverted tile needed its own three tokens.** The reference's black square with a
yellow glyph in it was built here as `bg-ink text-accent` — and in dark mode
`--color-ink` flips to near-white while the type on it stays light, so tile and glyph went
invisible together at 1:1. `--color-invert`, `--color-invert-fg` and
`--color-invert-accent` flip as a set. The same was true of the level chips: a white label
on `--color-beginner` is 5.3:1 in light and 2.2:1 in dark, so `--color-level-fg` flips too.

## The three tabs

**Learn, Courses and Tasks** are built, and they are **named**: the reference's rail is
seven glyphs with no labels, no tooltips and no current state. Calendar, Messages and
Settings keep their glyphs and are genuinely inert: dimmed to their own token
(`--color-muted-inert`, 5.2:1 in light and 4.5:1 in dark), `aria-disabled`, skipped by the
keyboard, `cursor: not-allowed`, and a click does nothing.

Learn because it is the screen that was dropped. Courses because the two course cards at
the foot of the reference are the only sight of a catalogue and neither opens. Tasks
because its Tasks Board is one column headed by a dropdown that never opens.

**One course list feeds all three tabs.** Eight courses carry their lessons, each with a
runtime and a done flag. The player, the continue card, the track counts, the catalogue
and every task's "set with" line read them. Change one lesson's length in
`src/data/deck.ts` and the course total, the track percentage, the left-to-watch figure
and the catalogue row all move together.

## Interactions

Every one is a beat in `drive/`. The three files run **74 beats with zero problems**, plus
a five-beat hover sweep.

| Control                                         | What happens                                              | Beats file |
| ----------------------------------------------- | --------------------------------------------------------- | ---------- |
| Play / pause                                    | A real toggle, with the glyph and the state changing      | `learn`    |
| Back / forward 30s                              | Moves the position, the clock and the waveform's fill     | `learn`    |
| A day in the week strip                         | Changes the minutes watched and what is booked on it      | `learn`    |
| The track pills                                 | Filter the tab that is showing — all three of them        | all three  |
| Continue                                        | Opens the course on the Courses tab                       | `learn`    |
| The tasks arrow, or a task                      | Opens the board                                           | `learn`    |
| All courses / Mine                              | The catalogue, or the five already started                | `courses`  |
| Any level / Beginner / Intermediate / Advanced  | Filters the catalogue                                     | `courses`  |
| Furthest along / best rated / longest / by name | Four orders                                               | `courses`  |
| A catalogue row                                 | Changes the whole detail pane and its lessons             | `courses`  |
| Board / One list                                | Three columns, or everything in due order                 | `tasks`    |
| A task card                                     | Expands to the course it was set with                     | `tasks`    |
| Light / Dark                                    | A real theme, not two icons                               | all three  |
| Search                                          | Courses, lessons and tasks — whichever tab is showing     | all three  |
| Scroll                                          | Five regions scroll inside the shell; the page never does | all three  |
| Tab, Tab                                        | A visible focus ring, proved as a beat                    | `learn`    |
| Three inert destinations                        | **Nothing.** Proved with `expectUnchanged`                | all three  |

## What the probe and the beats found

- **Thirteen contrast failures in dark that light passed.** Two were the inverted tile
  described above, at 1:1 — the worst reading this series has produced. The rest were the
  level chips' white labels and `--color-muted` on a segmented control's track at 4.36:1,
  which cleared the surface at 6.4:1. A token has to clear every ground it lands on.
- **A beat clicked a row the sort had pushed below the fold.** Under "furthest along" the
  advanced courses sit at the bottom of a ten-row scroller; the beat reported NO CHANGE and
  was right to.
- **Two columns of the task board were a third empty.** Six tasks across three columns is
  two each; there are nine now, and the board fills.
- **"Your tracks" stacked five rows at the top of its card** and left ninety pixels under
  them. The list spreads.
- After those: 0 contrast failures on all three tabs **in both themes**, no duplicate SVG
  def ids, no dead space over 24px, no document or horizontal scroll at 1280, 1440 or 1920,
  and no animation running at rest.

### Targets under 44px

Listed by the probe, with the reason. Nothing is under 24px: the segmented pills are 28px,
the week-strip days are 40px and the card's arrow buttons are 32px.

## Declared departures

1. **Built at 1440×900**, and the app runs to the window edge.
2. **The brand is invented.** The reference calls itself **Quest**, which is a real
   product name in this category, so the name goes and **Skillra** takes its place — with
   the mark drawn in the same idiom, a cap with the tassel as the accent.
3. **The course cards lead with the instructor, not a photograph of a desk.** The
   reference's three course images are photographs of people at work. A photograph of a
   scene is out of drawing range (rule 8) and free-licensed unbranded stock of one is not
   to hand — so the card leads with the instructor's portrait, which this build has, and
   which is what a learner picks a course by anyway.
4. **The player works.** The reference prints "02:35" with no total beside it, a waveform
   that never moves and a play button that does nothing. This one plays, pauses, skips and
   fills its waveform as it goes.
5. **The track pills filter something.** The reference's are a filter in appearance only:
   one is dark, the others are not, and the screen behind them never changes.
6. **"2/8 watched" says what the eight are.** The reference's three track cards print a
   fraction with no statement of its denominator; these read "6 of 13 lessons · 2 courses"
   and both halves come from the same list.
7. **The week strip is a control.** The reference circles one day and nothing happens when
   another is picked. This one drives the minutes and the sessions under it.
8. **"12:00 - 01:30" is "12:00–13:30".** An end before its start, in a 12-hour clock with
   no meridiem.
9. **Every task has a budget.** The reference logs "13h 20m" against a month-long date
   range with nothing to log it against; these read "13h 20m of 20h 00m", and over budget
   says so.
10. **The task bodies are about the tasks.** The reference's two cards carry the same
    paragraph of inspirational copy about education, which is not a brief.
11. **"What d you want to learn today?" has its apostrophe**, and "Beginning" is
    "Beginner".
12. **The ratings have numbers.** The reference draws five stars and no figure; these read
    4.8 with the count beside it.
13. **The waving hand is gone.** An emoji is a different drawing on every platform (rule 8).
14. **A visible focus ring everywhere.** The picture has none.
15. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the waveform is drawn at its position, every meter at its width and every figure
at its final value. Shot as `shots/reduced.png`, pixel-identical to `shots/learn.png`.
