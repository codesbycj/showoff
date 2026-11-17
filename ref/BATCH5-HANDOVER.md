# Batch 5 — handover

**40 screens, 40 showcases, 13 apps, built from design shots.**
`INSPO-RULES.md` governs (I1–I9); `RULES.md` supplies the mechanics. Rule 1
(pixel perfect) is **off** for every screen here — each reference is a board of
posed phones, not an export of a real screen.

The plan, the board-by-board table and the boards that were rejected are in
[BATCH5-PLAN.md](BATCH5-PLAN.md).

---

## Where the batch stands

| Gate | State |
|---|---|
| `audit.js`, every screen | **40/40 exit 0** — no FAIL anywhere |
| `foot.py`, every finished screen | **40/40 ≤24dp**, at the emulator's inset |
| `npx tsc --noEmit`, all of `src/` | clean |
| I6 — the screens shown and signed off | **awaiting sign-off** |
| Staging, `stepdiff`, `verify`, `rehearse`, the done-gate | **not started** — I6 comes first |

Nothing is staged, locked or recorded. INSPO-RULES I6: *"No screen is staged,
locked or recorded until it has been shown and signed off… staging is expensive
and a screen restaged after a layout change is a staging pass thrown away."*

---

## Per screen (R10)

Each block is: the audit result with every warning either fixed or answered,
the dead canvas at the foot, the dominant element, and the deviations from the
board with the reason for each.

```

nordhome    audit: no failures (3 warnings: all TAP, 34dp heart buttons, hitSlop'd)
            foot: 0dp dead (content runs under the floating dock, as the board crops it)
            dominant: the hero lodge photograph with the greeting over it
            deviations: board hero is a glass dome lodge (no free frame exists) -> a lit
              timber lodge at dusk. Struck-through price darkened from #9B9894 (2.87:1,
              R4 FAIL) to #6E6C68. Inactive dock label 74% white (board ~2.9:1). Place
              tiles carry no caption: the dock crops them at 21dp and a label there is in
              the DOM and not on the screen. Card totals computed (nightly x 3).
nordsearch  audit: no failures (3 warnings: all TAP, 34dp heart buttons, hitSlop'd)
            foot: 0dp dead (the results list runs off the bottom edge)
            dominant: the first result card
            deviations: a third result invented (I3) so the list runs past the frame.
              Close/filter controls 44dp (board ~28dp).
nordstay    audit: no failures (2 warnings: TAP on the 40dp gallery controls, hitSlop'd)
            foot: 10dp dead (the pinned price bar clears the home indicator)
            dominant: the gallery
            deviations: R9 - the board prints EUR384 for 3 nights beside EUR91/night;
              the bar computes nightly x nights. Gallery is the REMAINDER so the rows can
              never run under the bar (R3 caught that). Amenities budgeted at three rows:
              eight chips wrap to three at 393dp, and assuming two put a note under the bar.
              Four gallery frames because the pager draws four dots.

skyplan     audit: no failures (2 warnings: COVERED - the sky gradient passes under the
              search card, which is the board's own composition; TAP on "See more",
              hitSlop'd to 92x46)
            foot: 0dp dead (full-width tab bar at the frame)
            dominant: the search card over the blue sky
            deviations: carriers invented (board names three real airlines). R3 - the
              From/To rows are inset 56dp so the swap control cannot straddle them.
              Ticket notches needed a 26dp rail gap or they touched. A fare-facts row
              was added to the stub: at 393dp the board's ticket has a 90dp hole in it.
skyresults  audit: no failures (0 warnings)
            foot: 7dp dead (the list runs off the bottom edge)
            dominant: the first (cheapest) offer card
            deviations: the board's floating filter button sits ON its own third card's
              arrival time - covering text is an R3 FAIL, so it is dropped; the sort
              chips carry the same function. All three arrival clocks are computed from
              departure + block time + offset; the board prints 07:47 -> 14:30 under
              three different durations. Carriers and their marks invented.
skyticket   audit: no failures (0 warnings)
            foot: 0dp dead (ends on its action)
            dominant: the flight card
            deviations: the board prints 01:30 AM at BOTH ends of one 7h15m flight;
              computed here. Three passengers, not two - the planner books three, and
              two left a 100dp hole in the card (R1c). Barcode drawn from a fixed
              sequence, never Math.random, so the picture is the same in every frame.

nebuhome    audit: no failures (0 warnings)
            foot: 8dp dead (floating dock)
            dominant: the total balance
            deviations: tokens invented (board shows ETH/BTC marks). R9 - the total is
              the SUM of the holdings and the headline % their value-weighted move; the
              board prices 0.0018 of a $2,115.88 coin at $3.51 and 0.028 of an $83,240
              coin at $5.02. "Receive", not the board's "Recieve". Invert tokens added:
              the up-green is 8.4:1 on the page and 1.9:1 on the white panel inside the
              featured card - an R4 FAIL only the audit saw. Avatar is a photograph; the
              board's is a 3D cartoon head.
nebuswap    audit: no failures (0 warnings)
            foot: 0dp dead (the list runs under the floating dock)
            dominant: the send/receive pair
            deviations: the board sends 0.3471 from a balance of 0.0018, and prices the
              same coin at 2,115.88 on one screen and 4,692.11 on the next. One price,
              the amount inside the balance, and the receive figure computed (R9).

volthome    audit: no failures (7 warnings: 2 TAP on "See all" links, hitSlop'd to 86x46;
              4 TAP on the 30dp save buttons, hitSlop'd to 46; 1 COVERED - the cart badge
              sits on the corner of its own glyph, which is the board's composition)
            foot: 0dp dead (full-width tab bar at the frame)
            dominant: the categories rail over the promo
            deviations: every product invented (board sells a named console, two named
              phones, a named game). THE FIVE CATEGORY TILES ARE PHOTOGRAPHS, not drawn
              marks - I4's single most-cited case. Four flash products, not two: two left
              75dp of empty canvas above the tab bar (GAP FAIL). The sale clock COUNTS;
              the board types 02:59:23 into a frozen frame. Struck price darkened from
              3.3:1 to 4.6:1. The board's 3D blob rebuilt as two acid discs.
voltitem    audit: no failures (3 warnings: all TAP, 40dp gallery controls, hitSlop'd)
            foot: 12dp dead (ends on the delivery line under its action)
            dominant: the gallery
            deviations: the board's three-line blurb ending in "Read more" replaced by a
              spec row (R5). R9 - the monthly finance figure is price/term, computed; the
              board prints "from GBP14 per month" beside GBP169. Gallery is the REMAINDER
              so the sheet can never run under the action.
voltcart    audit: no failures (14 warnings: TAP on the 22dp ticks and 30dp steppers, all
              hitSlop'd past 44; 1 COVERED, the cart badge on its glyph)
            foot: 0dp dead (full-width tab bar)
            dominant: the line list
            deviations: four lines, not two - two left 102dp between the list and the
              summary (GAP FAIL). The fourth is unticked, and the subtotal, the item
              count and the button's figure are all computed from the ticked lines (R9).
              A subtotal/delivery summary was added; the board ends on a bare Checkout.

orbithome   audit: no failures (2 warnings: TAP on the two "See all" links, hitSlop'd)
            foot: 0dp dead (the list runs under the floating dock)
            dominant: the account balance
            deviations: the board names a real design tool and a real AI service in its
              activity list; both invented here. R9 - the balance is the opening balance
              plus every movement below it. The board's gift is a 3D EMOJI; drawn here
              (I8: emoji differ across platforms and flags are missing on Windows).
              Two orange steps added: white on the board's #E8541B is 3.4:1 and its own
              peach card ink is 4.1:1 - both fail R4, so fills keep the board's orange
              and type takes darker ones.
orbitsend   audit: no failures (0 warnings)
            foot: 8dp dead (the slide control clears the home indicator)
            dominant: the amount panel
            deviations: the keypad is the REMAINDER, so the control always sits on the
              foot. Balance matches orbithome's computed figure; the board prints
              $24,600.07 on one screen and $24,600.00 on the other. Slide track deepened
              for 4.5:1 under its own label.
orbitchart  audit: no failures (0 warnings)
            foot: 0dp dead (the sheet runs off the bottom edge)
            dominant: the balance chart
            deviations: R9 three times - the headline is the series' last point, the
              marker pill reads the value of the point it sits on (the board labels its
              peak $5,100 on an axis where it is nearer 5.6k), and the gridlines BRACKET
              the data instead of stopping at its maximum. Every chart helper is guarded
              for an empty series, because the reveal fills it one point at a time.

stridehome  audit: no failures (1 warning: COVERED - the START disc sits over its own
              slot in the week card, layered by design, covering no text)
            foot: 0dp dead (the week card is cropped by the dock)
            dominant: the readiness card
            deviations: R9 twice - the session's "52 min" is its own warm-up plus six
              reps plus cool-down, and "32.6" is the sum of the week's bars. The ring
              sweeps the score it prints (82% of the circle). Lime carries INK, never
              white: white on it is 1.4:1.
stridestart audit: no failures (0 warnings)
            foot: 0dp dead (the sheet ends on its controls)
            dominant: the map
            deviations: THE MAP IS BUILT, NOT TRACED (I4) - a rotated road grid, one
              park block and a route polyline with a start ring. No real place, no real
              street name. The board's own map is a flat render of one.
striderun   audit: no failures (1 warning: a 70dp run of empty canvas between the clock
              and the stats, 2dp under R1's FAIL line; the clock is the dominant element
              and growing it further would crowd the splits)
            foot: 0dp dead
            dominant: the duration clock
            deviations: A SPLITS STRIP WAS ADDED (I3) - the board's recording screen has
              nothing between its stats and its controls, which at 393dp left 84dp of
              dead canvas and a 76dp hole. R9 - the pace is computed from the duration
              and the distance, and the split bars are scaled across their own range so
              four kilometres eight seconds apart read as four different bars. The pause
              glyph had to be raised above its own gradient: on web an <svg> paints BELOW
              an absolutely-positioned sibling, which swallowed the mark entirely.

verdestart  audit: no failures (1 warning: TAP on the "Create an account" link, hitSlop'd)
            foot: 20dp dead (ends on the sign-in line)
            dominant: the hero photograph
            deviations: "Minerale" -> "Minerals" (I1). The board's welcome body is two
              sentences run together without a full stop; R5 trims it to one line. A
              cut-out was TRIED AND ABANDONED: cutout.py --report measured the sky's
              border deviation at 70 against the 12 that cuts cleanly, so the frame
              fills the panel instead.
verdehome   audit: no failures (6 warnings: TAP on four 20dp save hearts and two links,
              all hitSlop'd past 44)
            foot: 0dp dead (the grid runs under the pill dock)
            dominant: the promo card
            deviations: THE CATEGORY CHIPS CARRY PHOTOGRAPHS - the board sets them as
              EMOJI (burger, pear, pizza slice), which I4 calls a picture of a thing and
              I8 bans outright. "kcal", not the board's "Kal". The board's 3D fries
              mascot is replaced by a photograph (a render cannot be traced). White on
              the board's green is 2.5:1 and fails R4 at every size, so every ground
              that carries type takes a deeper green and the bright one stays on marks.
verdedish   audit: no failures (6 warnings: TAP on three 24dp ticks, two 36dp steppers
              and the "More details" link, all hitSlop'd past 44)
            foot: 8dp dead (ends on the order bar)
            dominant: the plate gallery
            deviations: "4.5 Reating" -> rating, "170 kalories" -> kcal (I1). The board's
              description describes THE APP ("combines minimal UI with smooth
              interactions"); R5 replaces it with one line about the food. A customise
              list was added under the board's own empty "Customize" heading (I3), and
              R9 - the button's figure is the dish plus the ticked extras, computed.

flowstart   audit: no failures (1 warning: TAP on the sign-in link, hitSlop'd)
            foot: 17dp dead (ends on the sign-in line)
            dominant: the hero photograph
            deviations: THE BOARD'S ILLUSTRATION IS REPLACED BY PHOTOGRAPHY across all
              five Flowan screens - an illustration of a person is still a picture OF a
              person (I4). Headline kept verbatim; the sub-line trimmed to one line (R5).
flowhome    audit: no failures (3 warnings: TAP on the "See full plan" link and the 42dp
              arrow, both hitSlop'd; COVERED - the cycle marker sits ON its own band,
              which is what a marker is)
            foot: 18dp dead (full-width dock)
            dominant: the phase card
            deviations: R9 twice - "Period in 19 days" is 28 minus day 9, and the marker
              sits at 9/28 along a bar whose four bands are their own share of the cycle.
              The board marks HOME in its dock while showing a CYCLE card; fixed. Rose
              and mint type steps added: the board's are 2.9:1 and 3.2:1, both R4 FAILs.
flowtrain   audit: no failures (0 warnings)
            foot: 14dp dead (ends on the transport row)
            dominant: the set clock
            deviations: R9 - the bar under the clock is elapsed/set length, and the pill
              counts the session's own exercises. Lilac type step added (2.96:1 -> 5.2:1).
flowmeals   audit: no failures (4 warnings: TAP on three 32dp bookmarks and one 40dp
              arrow, all hitSlop'd past 44)
            foot: 18dp dead (full-width dock)
            dominant: the hero meal card
            deviations: the day's kcal line is summed from the four cards on screen (R9).
flowrecipe  audit: no failures (6 warnings: TAP on two 34dp tabs inside a 42dp bar and
              four 24dp ticks, all hitSlop'd past 44)
            foot: 10dp dead (ends on its action)
            dominant: the dish photograph
            deviations: R9 - each macro ring sweeps that macro's share of the three, and
              the kcal line is computed from the macros at 4/4/9 rather than typed.

wisetrip    audit: no failures (0 warnings)
            foot: 7dp dead (ends on its action)
            dominant: the trip collage
            deviations: THE FLAGS ARE DRAWN DISCS - the board sets them as emoji, which
              Windows does not ship at all (I8). The board stacks its two collage cards
              so the list sits on the trip card's own country and budget lines; covering
              text is an R3 FAIL, so they are unstacked. CTA orange deepened: white on
              the board's #F2642A is 3.2:1.
wisefriends audit: no failures (0 warnings)
            foot: 7dp dead
            dominant: the friend field
            deviations: THE BOARD'S DOTTED WORLD MAP IS BUILT AS THE MAP IDEA - a dot
              field with friends pinned on it. A map is a picture of a place, so tracing
              one is copying an arrangement; no country here is identifiable (I4).
wiseplaces  audit: no failures (0 warnings)
            foot: 7dp dead
            dominant: the place stack
            deviations: places are photographs, the route between them is drawn (I4).

lumofeed    audit: no failures (7 warnings: TAP on the four action counts and the 34dp
              bell, all hitSlop'd past 44; COVERED - the featured card's own gradient
              behind its button, which is layering by design)
            foot: 0dp dead (the post runs to the dock)
            dominant: the post photograph
            deviations: "MESSAGES", not the board's "Massage", and "Profile", not its
              wrapped "Pro file" (I1). Creators and posts invented. The board's 3D
              megaphone is rebuilt as a drawn mark (a render cannot be traced). Counts
              are FORMATTED from their own numbers, shared by all three screens (R9).
              The dock had to be budgeted into the layout: leaving it out pushed the
              action row and caption under the bar - five R3 FAILs at once.
lumoreel    audit: no failures (0 warnings)
            foot: 0dp dead (the photograph is the page)
            dominant: the reel photograph
            deviations: "@rayyan.official", not the board's "@rayyan.offical", and an
              invented track in the audio line where the board names a real band (I1).
              Four hashtags, not eight (R5).
lumoprofile audit: no failures (2 warnings: TAP on the two 36dp header buttons, hitSlop'd)
            foot: 0dp dead (the grid runs under the dock)
            dominant: the account header
            deviations: nine grid tiles, not six - six left 115dp of empty canvas above
              the dock (GAP FAIL), and I3 says the fix is the rows the board cropped.
              Bio and link invented; counts formatted by the shared helper (R9).

kovahome    audit: no failures (3 warnings: TAP on the "Manage" and two "See all" links,
              all hitSlop'd past 44)
            foot: 6dp dead (the upcoming rail runs under the floating dock)
            dominant: the greeting and the count strip
            deviations: R9 - the three counts are the lists below them (clients, the
              reminders dated today, the queue); the board types all three.
kovacal     audit: no failures (8 warnings: TAP on the day cells, 38dp wide and
              hitSlop'd to 48, and on the two mode tabs)
            foot: 0dp dead (the job card runs under the dock)
            dominant: the day strip
            deviations: R9 - the strip is GENERATED from its first date, so a weekday
              can never sit over the wrong number. The board's third reminder option
              trails off mid-sentence ("Send to: @... - notifies them directly"); R5
              makes it a title and one line.
kovastats   audit: no failures (0 warnings)
            foot: 6dp dead
            dominant: the four metric tiles
            deviations: R9 - every delta is computed from this period against the one
              before, and its sign picks the colour; the board types all four and one
              disagrees with its own arrow. Four top posts, not two: two left 102dp of
              empty canvas above the dock (GAP FAIL), and they are in rate order, which
              is what "top performing" claims.

alpenfly    audit: no failures (4 warnings: all TAP - the mode chips, the filter chips,
              the "Change" link and the 38dp filter button, every one hitSlop'd past 44)
            foot: 0dp dead (the fare list runs off the bottom edge)
            dominant: the route card with the pass photograph behind it
            deviations: three of the board's own mistakes fixed - its date strip reads
              S13 M14 T15 W16 T16 (the same number twice), so the strip is GENERATED
              from its first date; its search card says "Searching..." and "14 Tickets
              found" at once, so the search has resolved; its airline and airport names
              are real and are invented here. R9 - the count is the list's own length and
              every arrival clock is its departure plus the block time.
alpenstay   audit: no failures (1 warning: TAP on the "72k reviews" link, 17dp at its
              line height, hitSlop'd to 45)
            foot: 17dp dead (the price bar clears the home indicator)
            dominant: the gallery
            deviations: the hotel and its region are invented (the board names a real
              one). R9 - the total the button books is the nightly rate times the
              nights, so the two figures cannot disagree. Three gallery frames because
              the pager draws three dots. The gallery is the REMAINDER, so the amenity
              row can never run under the price bar.
alpenpick   audit: no failures (0 warnings)
            foot: 10dp dead (the primary button clears the home indicator)
            dominant: the destination grid
            deviations: the board's flags are emoji - Windows ships none at all - so each
              is a drawn disc (I8). Four destinations, two columns: the grid is the
              REMAINDER, so its cards grow into whatever the header, the chips and the
              action leave rather than leaving a band above the button.

fernhome    audit: no failures (0 warnings)
            foot: 0dp dead (the floating dock runs to the indicator)
            dominant: the hero trip - a 413dp photographic arch
            deviations: the board's waving hand and sun are emoji; both are drawn (I8).
              The activity rail is a horizontal ScrollView with flexGrow 0 - left at the
              default it ate 45dp of the column into itself and the hero lost them. A
              fourth activity (Climbing) added so the rail crops at the edge as the board
              shows. The dock's account tab is a photograph, not initials on a disc (I4).
fernlist    audit: no failures (1 warning: TAP on the 21dp bookmark, hitSlop'd to 49)
            foot: 8dp dead (the deck's front card clears the indicator)
            dominant: the front card of the deck
            deviations: the board labels its front card AUSTRIA over the title "Heart of
              Norway's Majestic Forests" - the flag is corrected to Norway so the card
              agrees with itself (I1), and the two it covers take the other countries.
              Each back card is clipped to the strip it actually shows: a full card laid
              under a full card is the partial overlap audit reports as COVERED. The deck
              is the REMAINDER. Card depth is carried in the data, not read off the array
              index, so a card keeps its place while the reveal is still filling the deck.
ferntrip    audit: no failures (0 warnings)
            foot: 0dp dead (the stay card runs to the indicator)
            dominant: the summit photograph, and the headline on the sheet under it
            deviations: the board books "Lenas Donau Hotel, 22nd district, Donaustadt,
              Vienna" for a trip to the Tyrolean Alps - 480km away, on the Danube - so
              the stay is moved to Innsbruck (I1), and its rating's decimal comma is made
              a point to match the price under it. The sheet's dome is drawn INSIDE the
              hero, across its own bottom edge, rather than as a sibling pulled up over
              it, which would be a surface straddling a surface. The star badge sits on
              the photograph just above the curve rather than across it, for the same
              reason. The reviews link is padded to its own 44dp box (R7).
```

---

## Once for each app

### The substitute typeface, and what it cost

Every board sets a proprietary face that cannot be obtained. The substitute was
chosen by **ratio first, weight by stem against cap height**, then size and
tracking solved together — at a matched cap height a substitute usually runs
10–15% wider, and you cannot match both width and height.

| App | Board's face reads as | Substitute | What it cost |
|---|---|---|---|
| Nordvik (`nord*`) | a geometric grotesque | Plus Jakarta Sans | wider at matched cap height; display sizes dropped ~1dp and tracking tightened |
| Skylark (`sky*`) | a rounded grotesque | Poppins | taller x-height, so body sits 0.5dp smaller than the board's ratio |
| Nebula (`nebu*`) | a neutral UI grotesque | Inter | closest of the set; tabular figures used for every balance |
| Voltline (`volt*`) | a humanist grotesque | Plus Jakarta Sans | prices needed tighter tracking to hold the board's rhythm |
| Orbit (`orbit*`) | a geometric grotesque | Plus Jakarta Sans | the keypad digits were sized to the board's touch targets, not its glyphs |
| Stride (`stride*`) | a condensed technical face | Inter | **the real cost** — no free condensed match, so the stat labels carry letter-spacing instead of a narrower face |
| Verde (`verde*`) | a rounded geometric | Poppins | the closest free match; the board's tighter apertures are not reproduced |
| Flowan (`flow*`) | a display serif over a grotesque | Instrument Serif + Plus Jakarta Sans | the serif is used only for the two display lines, as the board does |
| WanderWise (`wise*`) | a geometric grotesque | Plus Jakarta Sans | wider; the three onboarding headlines were set a step down to hold two lines |
| Lumora (`lumo*`) | a tight grotesque | Plus Jakarta Sans | counts needed tabular figures so the stat row does not jitter |
| Kova (`kova*`) | a neutral grotesque | Plus Jakarta Sans | none material |
| Alpenroute (`alpen*`) | a geometric grotesque | Plus Jakarta Sans | none material |
| Fernweh (`fern*`) | an extra-bold geometric | Plus Jakarta Sans ExtraBold | the display runs ~8% wider, so "Nature Power" is set at 40dp rather than the board's apparent 43 |

Fonts are registered **per weight** (`font-sans`, `font-sans-medium`,
`font-sans-semibold`, `font-sans-bold`), never through Tailwind's
`font-medium`, and imported by subpath so the barrel does not pull 18 faces.

### Which assets are stock standing in for brand photography

**All of them.** Every photograph in this batch is free-licensed Pexels stock,
bundled locally — never hotlinked, because recording must not depend on the
network — and credited file by file in `assets/images/<slug>/CREDITS.md`, one
per showcase, with the bake script named. The bakes themselves live in
`tools/bake/<app>.py` and are re-runnable.

Brand photography is not redistributable, so none of it is used. Every baked
frame was checked at 1:1 for **other brands' marks**; two sources were dropped
for carrying them (a Coca-Cola can in a food frame, a US flag on a porch).

### Which subjects were changed because they were out of drawing range

I4: if it is a picture *of* something it is a photograph; if it is interface it
is a vector. Where a subject could not be had, the subject changed rather than
being drawn badly.

| Board | Changed to | Why |
|---|---|---|
| Nordvik's glass-dome lodge | a lit timber lodge at dusk | no free frame of a glass dome exists |
| Verde's 3D fries mascot | a drawn mark, and the hero is a cut-out burger | a 3D render cannot be traced honestly |
| Orbit's 3D megaphone and money bag | real card and badge components, posed and shadowed | same |
| Stride's map | the map **idea** — a route line, a pin, a radius ring over a flat ground | a map has no idea to interpret; vectoring one is tracing it |
| WanderWise's world map | a dot field with friend pins | same |
| Lumora's creator portraits | free-licensed portraits | faces are photographs; initials on a disc is a fallback state, not a substitute |
| Verde's category tiles | photographs | a category tile is a picture, not an icon — drawing them produces cartoons where the design had food |
| Fernweh's Norway front card | a Nordic forest and water frame | the board's own card contradicted itself (see `fernlist`) |

### Every call that was mine rather than the board's

- **Six pinned docks were taking `insets.bottom` on top of their own height**
  (`lumofeed`, `lumoreel`, `lumoprofile`, `flowhome`, `flowmeals`,
  `stridehome`), which does not read as a gap under the bar - it reads as a
  bar 34-40dp longer than its contents, with the labels floating in the top of
  it. Every one is now flush, its ink centred in its own band, and
  `dockcheck.js` grew a `skew` column that fails this (I11). `stridehome`
  dropped from 7 warnings to 1 as a side effect, because the week card no
  longer has to overlap anything.
- **`volthome` and `voltcart` report `off-centre` by -5dp and are correct.**
  The cart badge overhangs its glyph by 8dp by design, so the probe's ink
  union starts higher than the tab row it belongs to.

- **Emoji are never shipped as UI** (I8). Every board emoji — flags, suns,
  waving hands, sparkles — is drawn: a flag disc, a sun, a hand. Windows ships
  no flag emoji at all, so the web render could not even have shown the defect.
- **Contrast was raised wherever the board failed 4.5:1** (R4). This is the
  most frequent silent change in the batch: a muted grey picked to look calm on
  a board lands at ~3:1 on a white card. Each app grew a darker type token
  (`faint`, `accentInk`, `greenDeep`, `orangeDeep`, `wasInk`, `limeDeep`, …);
  fills keep the board's colour and type takes the darker step.
- **Every number on every screen is computed, not typed** (R9): totals from
  rates times nights, arrival clocks from departure plus block time, deltas
  from this period against the last, ring sweeps from their own percentage,
  counts from the list's own length, axis ticks bracketing the data.
- **Content was added where the board cropped**, never padding or a spacer
  (I3): a third search result, two more products, four grid tiles, a splits
  strip, a fare-facts row. Every screen's largest block is the **remainder** of
  the column, so it can never leave a band above the dock.
- **Tap targets were brought to 44dp** (I2/R7) by `hitSlop` where the board
  drew a smaller control, and by padding the anchor where it was a text link.
- **Controls that straddled text were moved or dropped** (R3) — the board's
  floating filter button sits on its own card's arrival time.
- **Copy stayed the board's**, trimmed to fit (R5). Nothing motivational was
  invented; where a board's own sentence trailed off, it became a title and one
  line.
- **Every showcase is one screen** with its own slug, feature folder and assets
  (rule 4), so a take never has to perform screen 1 to reach screen 2.

---

## What is not done

Pending sign-off (I6), in this order:

1. stage each screen — `apply.js final` → `stage.js --dry` → `stage.js` →
   `gen.js`, **≥20 steps**, 30–40 the target
2. `blank.js` over every screen, exit 0 — nothing but the page's own ground
3. `stepshots.js` + `stepdiff.py` — no zero-diff step, no step over ~15% of the
   frame, no step that errors
4. `verify`, then `rehearse`, per screen
5. the done-gate with the dev server stopped: `tsc`, `npx expo export
   --platform android` from the finished state, `lock`, then a deliberate break
   to confirm preflight reports `DRIFT`
6. leave every showcase in **blank** state
