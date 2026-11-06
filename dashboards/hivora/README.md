# hivora — episode 28

A team workspace with a recording library, rebuilt from a posed design board as a working
three-tab console. Port 5408.

```bash
npm install && npm run dev                              # http://localhost:5408

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5408/ --click "[data-tab='recordings']"
node ../tools/drive.js drive/home.json
```

## The reference

`ref/shot.png`, 1200×900: a rounded app window posed on white with a wide margin all
round. The margin and the window's own frame are presentation furniture and both are
dropped.

refscan read `#ffffff` for the page, `#f0f0f0` for the ground and `#d5d0f0` for the one
accent — a lilac that turns up as the hero's ground, the upsell's ground and the 3D renders
inside both.

**Plus Jakarta Sans** carries the interface: a grotesque with a tall x-height and tabular
figures, which this build needs for a column of durations.

### The split, measured

`#d5d0f0` is **1.49:1** against white. It is a _ground_ and nothing else — the hero, a
tile, a waveform's unplayed bars. `--color-accent-deep` `#594aa8` (7.1:1) is what any word,
pill or button uses, and `--color-accent` `#8b7ad6` sits between them for a mark that
carries no type.

The three series colours are chosen together rather than one at a time: calls violet,
focus magenta and async green each clear 4.5:1 on white, so a legend, a stacked bar and a
figure can share a colour.

## The three tabs

**Home, Recordings and Team** are built, and they are **named**: the reference's rail is
eight glyphs with no labels, no tooltips and no current state, so there is no telling one
from another. Calendar, Files and Settings keep their glyphs and are genuinely inert:
dimmed, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click does
nothing.

Home because it is the screen that was dropped. Recordings because its "Last videos" strip
scrolls off the edge and leads nowhere. Team because its Members card is six faces with
nothing behind them, and where everyone is, is the question a workspace is opened for.

**One recording list and one week feed all three tabs.** Ten recordings carry a length, an
owner, attendees, views and comments; six people carry a week split three ways. Home's
figures, the library and the team board all read them. Change one person's focus hours in
`src/data/deck.ts` and the week's total, the split, the day chart and that person's row all
move together.

## Interactions

Every one is a beat in `drive/`. The three files run **67 beats with zero problems**, plus
a seven-beat hover sweep.

| Control                           | What happens                                                     | Beats file   |
| --------------------------------- | ---------------------------------------------------------------- | ------------ |
| A day in the week strip           | Changes the hours stated under it                                | `home`       |
| Overview / Shared / Comments      | Three lenses over the notifications                              | `home`       |
| Hover the day chart               | The day, all three figures and the total                         | `home`       |
| A recording, a notification       | Opens that recording in the library                              | `home`       |
| The members arrow                 | Opens the team board                                             | `home`       |
| All / Unwatched                   | Two lenses over the library                                      | `recordings` |
| Every topic / five topics         | Filters the library                                              | `recordings` |
| Most recent / discussed / longest | Three orders                                                     | `recordings` |
| A library row                     | Changes the detail pane, its chapters and who it was shared with | `recordings` |
| A role tile                       | Narrows the board to Design, Engineering, Research or Product    | `team`       |
| Most hours / calls / focus / name | Four orders on the board                                         | `team`       |
| A member row                      | Expands to the projects they lead and the sessions they recorded | `team`       |
| A session                         | Opens it in the library                                          | `team`       |
| Search                            | Recordings, notifications and people — whichever tab is showing  | all three    |
| Scroll                            | Six regions scroll inside the shell; the page never does         | all three    |
| Tab, Tab                          | A visible focus ring, proved as a beat                           | `home`       |
| Three inert destinations          | **Nothing.** Proved with `expectUnchanged`                       | all three    |

## What the probe and the beats found

- **The day chart was 50px tall.** The legend above it is a fixed height, so a 250px card
  left the chart whatever was spare and its three gridline labels overlapped. The row
  carries the difference now.
- **Chapters were found by threshold, and the threshold was wrong.** "Every bar under
  0.3" produced two chapters on a busy recording and nine on a quiet one, so the detail
  card was two-thirds empty on half the library. One per quarter, the quietest bar in each.
- **The waveform had to be invented twice over.** See the declared departures: the
  reference's video tiles could not be kept and could not be redrawn.
- After those: 0 contrast failures on all three tabs, no duplicate SVG def ids, the day
  chart labelled, no dead space over 24px, no document or horizontal scroll at 1280, 1440
  or 1920, and no animation running at rest.

### Targets under 44px

Listed by the probe, with the reason. Nothing is under 24px: the segmented pills are 28px,
the members' arrow is 32px and the notification kind badges are 28px indicators with a
tooltip rather than controls — the row around them is the target.

## Declared departures

1. **Built at 1440×900**, and the workspace runs to the window edge.
2. **The brand is invented.** The reference names nothing; **Hivora** is added, with the
   mark drawn in the same idiom — three strokes leaning the same way.
3. **The real institution and the real instrument are gone.** The reference's video list
   names the National Hospital for Neurology and Neurosurgery and a Leica M530 OH6
   surgical microscope beside invented view counts. A real institution and a real
   instrument over invented figures is the one thing this series must not produce (rule 8).
4. **The video tiles are waveforms.** Having lost the captions, the frames could not stay
   either: a frame of surgical footage is a photograph of a thing, so it is out of drawing
   range, and unbranded stock of an operating microscope does not exist. The subject
   changed rather than the medium — a workspace's recording list needs a length, a shape
   and who was in it, and all three are interface.
5. **Both 3D renders are gone.** A render cannot be recreated and must not be traced, and
   neither of them was carrying information. The hero carries the call that is actually
   happening instead.
6. **The floating call pill can be joined.** The reference's reads "Breakthrough
   Brainstorm · 12:45 pm" with a close button and no way into the call, which is the one
   thing that pill is for.
7. **The subscription upsell is gone.** "Unleash Your Potential · Indulge in the ultimate
   subscription · Upgrade plan" is an advertisement in the middle of a dashboard. The
   recordings list has that corner now.
8. **"49 83 tasks complete" is "74 of 108".** Two numbers side by side with no separator
   are not a figure.
9. **"10,4h" is "149h 00m".** A decimal comma in an English interface, and an hour count
   written as a decimal rather than hours and minutes.
10. **The three shares state what they are shares of.** The reference prints +50% / +33% /
    +17% beside three bars and never names the total; these three sum to the figure above
    them and each says "% of the week".
11. **"Impact +56%" is gone.** A percentage with no subject and no window is not a
    measurement. The week-on-week change in focus time is on the hours card instead,
    against a stated last week.
12. **The rail is named and reachable.** Labels, tooltips, a current state, and the three
    destinations that are not built dimmed and skipped by the keyboard.
13. **A visible focus ring everywhere.** The picture has none.
14. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the bars are drawn at their heights, the waveforms at their shapes, every meter
at its width and every figure at its final value. Shot as `shots/reduced.png`,
pixel-identical to `shots/home.png`.
