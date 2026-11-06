# tasklio — episode 30

A studio's kanban board, rebuilt from a posed design board as a working three-tab task
manager. Port 5416.

```bash
npm install && npm run dev                              # http://localhost:5416

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5416/ --click "[data-tab='tasks']"
node ../tools/drive.js drive/board.json
```

## The reference

`ref/shot.png`, 752×564: a rounded app window posed on grey. The board behind it and the
window's own frame are presentation furniture and both are dropped; the app inside is
about 700×470 of the picture, which is a fraction of the pixels this is built at.

refscan read `#fbfaf8` for the page and six pastel card grounds — lilac, peach, mint,
rose, sky and blush — which are kept exactly, along with the four column tints.

**DM Sans** carries the interface: a grotesque with tabular figures, which a column of
hour counts needs.

### The split, measured

The reference's lilac `#9981d9` is **3.23:1** against white: it clears the 3:1 a graphic
needs and fails the 4.5:1 type needs, so it is the _mark_ colour and `--color-accent-deep`
`#5a44a8` (7.4:1) is what any word, pill or button uses.

The six card tints are grounds, never ink. Each carries `--color-ink` at 12:1 or better —
but `--color-muted` on the lilac is **4.31:1**, so a card's second line is set in
`--color-body` (8.1:1) rather than muted. One pastel decided that rule for all six.

Each column has a deep partner for its own heading: `--color-done-deep` started at
`#2c7a4b` and read 4.07:1 on its own mint ground, so it is `#226039` (5.8:1).

## The three tabs

**Board, All tasks and Team** are built. **Schedule, Reports, Clients** and **Settings**
stay in the sidebar and are genuinely inert: dimmed to their own token
(`--color-muted-inert`, 5.3:1), `aria-disabled`, skipped by the keyboard,
`cursor: not-allowed`, and a click does nothing. So is **Create task**, which would need a
form this episode does not have. The reference's other four destinations were cut rather
than left as decoration.

Board because it is the screen that was dropped. All tasks because a board cannot answer
"what is due this week" or "what has run over its budget" — those cut across the columns.
Team because the sidebar promises it, and because five avatars above a board say nothing
about who is holding what.

**One task list feeds all three tabs.** Thirteen tasks carry a column, a client, people,
a budget, hours logged and a checklist. The board's columns, the list's four figures and
every person's load read them. Move a card on the board and the counts move with it.

## Interactions

Every one is a beat in `drive/`. The three files run **66 beats with zero problems**, plus
a six-beat hover sweep.

| Control                                        | What happens                                               | Beats file |
| ---------------------------------------------- | ---------------------------------------------------------- | ---------- |
| The arrows on a card                           | Move it a column left or right, and the counts follow      | `board`    |
| A tag                                          | Filters the whole board to the cards carrying it           | `board`    |
| Everyone / Mine                                | The board, or what the studio lead is on                   | `board`    |
| A card                                         | Opens that task on All tasks                               | `board`    |
| Every column / four columns                    | Filters the list                                           | `tasks`    |
| Due first / furthest along / biggest / by name | Four orders                                                | `tasks`    |
| A row                                          | Changes the detail pane, its steps and its people          | `tasks`    |
| Most loaded / most open / by name              | Three orders on the team board                             | `team`     |
| A person                                       | Expands to every task they hold, done ones included        | `team`     |
| One of their tasks                             | Opens it on All tasks                                      | `team`     |
| Search                                         | Tasks, clients and people — whichever tab is showing       | all three  |
| Scroll                                         | Seven regions scroll inside the shell; the page never does | all three  |
| Tab, Tab                                       | A visible focus ring, proved as a beat                     | `board`    |
| Four inert destinations                        | **Nothing.** Proved with `expectUnchanged`                 | all three  |

## What the probe and the beats found

- **One designer was carrying 153% of a 32-hour week** while the studio lead carried
  nothing at all. The numbers were written by hand and never summed; the board is spread
  now, the fullest person is at 91%, and the "spare capacity" figure means something.
- **Three beats on the team board did nothing.** Expanding a row pushes the rows under it
  out of the scroller, so a beat that named the fifth person clicked nothing — and because
  that beat failed, the row it should have closed was still open, so the next one closed
  the row the beat after that needed. The sequence opens and shuts explicitly now.
- **The move buttons were exactly 24px**, which is the floor rather than a margin over it.
  They are 28px.
- **`--color-done-deep` failed on its own column.** A colour chosen against white and used
  on a mint ground is two different decisions; both are in the token file now.
- After those: 0 contrast failures on all three tabs, no duplicate SVG def ids, no dead
  space over 24px, no document or horizontal scroll at 1280, 1440 or 1920, and no animation
  running at rest.

### Targets under 44px

Listed by the probe, with the reason. Nothing is under 24px: the move buttons are 28px,
the segmented pills 28px and the tag chips 36px.

## Declared departures

1. **Built at 1440×900**, and the app runs to the window edge.
2. **The brand is invented.** The reference calls itself "weihu" and then misspells its own
   name inside one of its own cards ("Wehiu product task"). **Tasklio** replaces it, with
   the mark drawn in the same idiom — three bars of different lengths, a board seen from
   the side.
3. **The cards move.** A board whose cards cannot change column is a picture of a board.
4. **Every percentage has a denominator.** The reference's cards print "40%" over a row of
   dots that does not add up to it, and "Progress" against nothing in particular. Here the
   meter is steps done over steps, printed beside it, and the hours read "14h logged of
   16h · 88% of the budget".
5. **The Done column's checklists are ticked.** The reference draws them with empty marks
   in the column where everything is finished.
6. **One date, and the right one.** The reference heads its board "May" above "Today is
   Saturday, Jul 9th, 2023" — two months, and 9 July 2023 was a Sunday.
7. **"Activites" is "Activities"**, and the user card's `simmons@gamil.com` is an address
   at the studio's own domain.
8. **The meeting is not at 2:34 AM**, and nothing says "finish this before the weekend" on
   a weekend.
9. **The Filters button filters.** The reference's opens nothing; these are the tags its
   own cards carry.
10. **The task notes are about the tasks.** The reference's "Note:" lines are reminders
    about meetings; these say what still has to happen.
11. **A visible focus ring everywhere.** The picture has none.
12. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — every meter is drawn at its width and every figure at its final value. Shot as
`shots/reduced.png`, pixel-identical to `shots/board.png`.
