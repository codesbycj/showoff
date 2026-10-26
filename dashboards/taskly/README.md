# taskly — episode 4

A project workspace, rebuilt from a posed board as a working three-tab app with a real
light/dark switch. Port 5312.

```bash
npm install && npm run dev                              # http://localhost:5312

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5312/ --click "[data-tab='calendar']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 1200×900: a white panel on a pale lavender ground with a drop shadow.
`refscan.py` calls it a posed board, which it is, so this is an **inspo brief** and the
backdrop goes — at real size the panel is the viewport.

Its palette read is the panel's and those are the tokens: `#f7f6f9` ground, `#ede9f1` and
`#e4ddeb` for the sunken tints, and the four pastels it found at well under one per cent
of the frame each — `#c6a0f1`, `#d9bdf4`, `#f0a1bb`, `#f6c6d6`.

## The three tabs

**Dashboard, Task Overview and Calendar** are built. Team Members, Report Summary and
Settings stay in the menu and are genuinely inert: dimmed, `aria-disabled`, skipped by the
keyboard, `cursor: not-allowed`, and a click does nothing.

Dashboard because it is the screen that was dropped. Task Overview because the board only
ever shows one column at a time and the point of a task tool is seeing the rest. Calendar
because the dashboard's month chip is the only place dates appear and there is nowhere to
act on them. Team Members and Report Summary would both have been another list of the same
people.

**The project tree is not inert.** Its disclosure really collapses and its two leaves
really switch project — the heading, the column counts, the board's cards, the task table
and the calendar's list all change. A tree of dead rows under a live menu would be the
worst of both: it looks like navigation and answers to nothing.

## Type

The board's face is a friendly geometric sans with a single-storey `g`. The substitute is
**Plus Jakarta Sans** (OFL, via fontsource), which matches that and holds up at the two
sizes this design leans on — the 19px card titles and the 11px chips.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**68 beats with zero problems**, including "did nothing" checks on all three inert menu
entries.

| Control | What happens | Beats file |
|---|---|---|
| Board column tabs | Four real columns, each with its own cards, count and empty state | `dashboard` |
| Card "…" | Opens that card's actions in place | `dashboard` |
| Checklist count | Ticks an item off and wraps round at the end | `dashboard` |
| Calendar day | Selects it; the month chip shows the sprint tints with a key | `dashboard` |
| Month | Sep, Oct, Nov — and the two empty months say so instead of drawing a blank grid | `dashboard` |
| Mic / camera | Toggle, and the preview dims and says "Camera off" | `dashboard` |
| Join Meet | Switches the chip from Preview to Live | `dashboard` |
| Chat | Typing and sending really appends a message | `dashboard` |
| Timer | Starts and stops, counting down from 20:10 | `dashboard` |
| Note | Marks done and strikes through, and undoes | `dashboard` |
| Project tree | Switches project: heading, counts, cards, table and calendar all follow | `dashboard`, `calendar` |
| Tree disclosure | Collapses and expands | `dashboard` |
| Theme | A real switch: every token is redefined for dark | `dashboard` |
| Column filter | Narrows the table; the footer counts what is open | `tasks` |
| Sort | Due date, priority or progress | `tasks` |
| A row | Expands in place with the summary and its counts | `tasks` |
| Calendar day | Rewrites the day's list; a day with nothing due says so | `calendar` |
| Search | Filters the board, the table or the day's list | all three |
| Three menu entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe found

- **White on the vivid pink was 3.30:1** — the "due today" day in the calendar. Ink on the
  same fill is 5.43:1, so the marker keeps the reference's colour and became readable.
- **The positive green was 3.45:1 on its own tint** behind every "Completed" badge.
  Darkened to `#0f7a4e`: 4.74:1.
- **The "Preview" chip was translucent over a photograph**, which is both hard to read on a
  light frame and impossible to measure — the probe walks up past a translucent layer to
  find a ground, so it reported 1.14:1 against the card behind the photo. Made opaque.
- **"Today" on the pink note tile was ink at 60%**: 4.26:1.
- After those: 0 contrast failures on all three tabs **in both themes**, no duplicate SVG
  def ids, nothing animating at rest, no dead space over 24px, and no document or
  horizontal scroll at 1280, 1440 or 1920.

Two layout defects the shots caught that no check would have:

- **The board sat at its content height** inside a taller row, leaving a band of empty
  canvas under the two cards. The board root was a flex child with no `flex-1`; the cards
  also needed `auto-rows-fr`, because `h-full` on a grid whose rows are `auto` still tracks
  the tallest card.
- **The Calendar pane's month grid filled half its card.** It now shares the region between
  its week rows, and the day list gained a "Later this month" block so the column is full
  rather than one card and 450px of nothing.

## Declared departures

1. **No backdrop.** The board's lavender surround is gone; at real size the panel is the
   viewport.
2. **Built at 1440×900**, not at the board's scale.
3. **The timer starts paused.** The reference draws a stop button, implying it is running —
   but a clock ticking on first paint means every frame of every capture differs from the
   last, and the numeric diff that proves the take would report a change on every beat.
   Paused is the honest resting state for something that gets filmed; the take presses
   start.
4. **The calendar's tints are decoded.** The reference tints three runs of days in three
   pastels and never says what any of them mean; each one is a real state here and the key
   under the grid names them.
5. **The pink and the green are darker** than the board's, for the contrast reasons above.
6. **Twelve tasks across two projects**, not the two the board shows: two cards do not fill
   a 1440×900 shell, and three of the four columns would have been empty.
7. **The column counts are my data's, not the reference's** 2/4/5/7 — the numbers on a
   board have to be the number of cards in it.
8. **The three emoji are drawn** — 👋, 🔥 and 👍 render differently on Windows, Android and
   iOS, and one of them in a different skin tone.
9. **A visible focus ring everywhere.** The board has none.
10. **The Plyra mark is invented**, drawn in the board's idiom — a lilac rounded square
    with a tick in it.
11. **The meeting preview is a free-licensed Pexels portrait**, credited in
    `src/assets/img/CREDITS.md`. It is a photograph of a person, which is the one thing on
    this screen that must not be drawn.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance and the timer is paused at rest anyway, so the dashboard is fully usable with it
on. Shot as `shots/reduced.png`.
