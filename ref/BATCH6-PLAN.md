# Batch 6 — plan

**Reference class: design shot → inspo brief.** [INSPO-RULES.md](../INSPO-RULES.md)
governs (I1–I11), [RULES.md](../RULES.md) supplies the mechanics, and rule 1
(pixel perfect) is **off**.

**33 screens, 33 showcases, 11 apps.** Every board is a fresh one: batch 4 took
the `01`s, batch 5 took the `02`/`03`s, so these come from `04`+ except where a
category's low numbers were never used.

**Ten different domains, deliberately.** Batches 4 and 5 produced four
food-delivery apps and three wallets between them. Nothing here repeats a
domain already built: a pet shop, a furniture shop, a snack shop, a jeweller, a
watch marketplace, a juice bar, a ramen house, a card manager, a wealth desk, a
risk register and a soundscape app.

---

## The 33

| # | Board | Slug | Screen |
|---|---|---|---|
| 1 | ecommerce-app/08 | `pawstart` | onboarding — cat photograph, pager, headline, Get Started |
| 2 | | `pawshome` | home — greeting, search, pet-type chips, popular 2-up, flash sale, dock |
| 3 | | `pawsitem` | product — halo hero, variant thumbs, weight, qty, description, Add to Cart |
| 4 | ecommerce-app/09 | `nookstart` | splash — "Designer Furniture", product cut-outs on colour discs, round CTA |
| 5 | | `nookshop` | catalog — search, cart badge, type glyph rail, 2-up grid, promo card |
| 6 | | `nookroom` | room preview — interior photograph, price pill, interior thumb rail |
| 7 | ecommerce-app/30 | `cocoahome` | shop — "Best Of Snacks", category chips, collection rail, pinned cart bar |
| 8 | | `cocoaitem` | product — pack hero, purity chip, qty stepper, price pill, Add To Cart |
| 9 | | `cocoacart` | cart — dark sheet, three lines, totals card, Make Payment |
| 10 | ecommerce-app/39 | `orlafind` | discover — wordmark, serif display, ring card carousel, price, View Details |
| 11 | | `orlaring` | ring — colour rail, ring hero, three fact discs, Try It Now, cart |
| 12 | | `orlafit` | virtual fitting — camera frame over a hand, measuring line, Shop Now |
| 13 | ecommerce-app/16 | `kilnview` | object view — dark, piece on its ground, AR/Object toggle, finish rail |
| 14 | | `kilnfind` | search — query field, filter and sort, 2-up result grid, dock |
| 15 | | `kilnitem` | detail — piece in use, maker chip, title, thumb rail, provenance, pinned Buy bar |
| 16 | food/22 | `pulphome` | home — greeting, search, "Ready for something fresh?", chips, bottle cards, pill dock |
| 17 | | `pulpitem` | bottle — hero, tags, four nutrition tiles, qty, Add to cart |
| 18 | | `pulptrack` | tracking — the **map idea**, route, pins, sheet with a 4-step rail and the courier |
| 19 | food/32 | `slurpdish` | dish — dark hero, qty rail, size discs, white sheet, chips, pinned selection bar |
| 20 | | `slurpcart` | cart — two line cards, promo row, order summary, Proceed |
| 21 | | `slurppay` | checkout — payment rows, address, summary, Pay Now |
| 22 | fintech/05 | `foldhome` | home — greeting, card stack, four actions, transactions |
| 23 | | `foldcard` | new card — card preview, form fields, country row, Save |
| 24 | | `foldspend` | activity — total, **bar chart**, income/expense pills, category tiles |
| 25 | fintech/16 | `vaultperf` | performance — serif figure, annual return, two stat cards |
| 26 | | `vaultadvisor` | advisor — portrait card, serif name, role, trust line, round CTA |
| 27 | | `vaultassets` | assets — serif total, four coloured stat rows |
| 28 | fintech/25 | `axisprofile` | risk profile — tabs, function display, 2x2 fact grid, three avatar stacks, description |
| 29 | | `axisrisk` | risk — headline, risk-score gradient bar, four fact pairs, assessments rows |
| 30 | | `axistime` | timeline — two-series **line chart**, weekday axis, two incident cards |
| 31 | music-app/22 | `hushstart` | onboarding — portrait, wordmark, Skip, headline, Continue |
| 32 | | `hushshare` | share — generative wave artwork, caption, share targets |
| 33 | | `hushmix` | session — stacked cards: sleep, timer, foundation, motive, controls, Play |

---

## The board's mistakes, per app (I1 — fix silently, list here)

| App | What is wrong on the board | Fix |
|---|---|---|
| `paws` | the onboarding sells **restaurant delivery** on a pet-food app ("Discover restaurants near you and order your favorite meals") | copy about pet food |
| `paws` | a real pack brand on every product; "Pendigree Nang Chay" is garbled | invent a house brand, unbranded packs |
| `nook` | prices read `€1.150` / `€850` — thousands separator used as a decimal | one format, computed totals |
| `cocoa` | real brands on-pack (`dang`, `GOOD SOURCE`) | loose product on a colour ground, house names |
| `cocoa` | `$ 08.00` and `USD 38.00` in one flow | one money format throughout |
| `orla` | body grey on cream is under 4.5:1 | darker ink step |
| `pulp` | category chips are **emoji** | drawn glyphs (I8) |
| `slurp` | "3 Item Selected $15.99" over a cart holding 2 lines at $13.67 | computed from the lines (R9) |
| `slurp` | Mastercard / PayPal / Apple Pay marks; "Al Baik Fast Food" is a real chain | invented payment brands and restaurant |
| `slurp` | the hero says "Noodles Ramen", the sheet under it says "Noodles Twistara" | one dish, one name |
| `fold` | VISA and PayPal marks; the country row is an **emoji flag** | house scheme name, drawn flag disc |
| `vault` | **three typos**: "Smart Profolio", "Trusted by 3k+ clients wordwide", "Total Mange Assets" | Portfolio, worldwide, Managed |
| `axis` | residual risk 5 and inherent risk 20 on one card, with a 1–5 "Very High 5" bar | one scale, and the bar reads it (R9) |
| `hush` | "Instagram" in the share row | generic share targets |

---

## Assets (I4 — draw the interface, photograph the picture)

**Photographs** (free-licensed Pexels, bundled, `CREDITS.md` per slug):

- `paws` — a cat, pet-food packs (unbranded), small pet portraits for the type chips
- `nook` — chairs/tables cut out for the colour discs, an interior for the room preview
- `cocoa` — chocolate and coconut-chip product shots, cut out onto the card colours
- `orla` — rings on a light sweep, a hand for the fitting frame
- `pulp` — juice bottles (red, green), a portrait for the greeting, greens for the cards
- `slurp` — a ramen bowl, skewers, three size variants of the same dish
- `fold` — an account portrait
- `vault` — one black-and-white studio portrait (the advisor)
- `axis` — six small portraits for the owner / manager / stakeholder stacks
- `hush` — a portrait in headphones for the onboarding

**Vectors**: every chip glyph, the card-scheme marks (invented), the flag disc,
the dock icons, `fold`'s bar chart, `axis`'s two-series line chart, `hush`'s
generative wave artwork (contour lines are an idea, not a picture), and
`pulp`'s map — the **map idea**: a route line, a pin and a radius ring over a
flat ground, never a traced map.

**Cut-outs** (`tools/bake/cutout.py`): `nook`'s furniture and `cocoa`'s snacks
both sit on coloured grounds, so both need a clean cut. Measure the border mean
and standard deviation first; judge the tolerance on the page's own colour.

---

## Risks, named now

- **Brand marks on stock.** `cocoa` and `paws` are packaged goods, and packaged
  goods photograph with somebody's label on them. Prefer loose product and
  plain packs, and check every baked frame at 1:1.
- **ecommerce-app/16 was a watch marketplace and is now a ceramics one.**
  Nine stock watch frames were pulled and checked at 1:1 — the rule's own
  test, because a contact sheet cannot show a 40px wordmark — and every frame
  with a usable dial carried a legible mark (SKAGEN, SEIKO, INDIGLO). The
  frames that were clean were abstract strap and case textures that cannot
  carry a product grid. RULES §2.5 covers it: change the subject to one that
  keeps the app's plot. The plot is a collector's marketplace — an object
  view, a searchable grid of named pieces with prices, a provenance page with
  a Buy bar — and studio ceramics keep every one of those without anybody's
  mark on them. The slugs are `kiln*` so the name matches the build (rule 8).
- **`vault` is a sparse board.** Three screens of a serif figure and two or
  three blocks each. It will not reach the 20-step floor as markup, so it needs
  extraction from the start (I5) — the same lesson `flowstart` and `verdestart`
  taught in batch 5.
- **`axis` and `fold` carry real charts.** Every number computed from its own
  series, ticks bracketing the data (R9).
- **`nookroom` and `orlafit` are camera surfaces.** Neither is a map or a 3D
  render; both are a photograph with interface over it, which is in range.

---

## Order of work

Assets first, because they change layout (Step 5). Then one app at a time:
foundation → components one at a time → the design bar → the wall on 8082 →
sign-off (I6/I10) → staging → the step probe → the done-gate.

The stager fixes made during batch 6's predecessor are already in
`tools/timelapse/stage.js`: string literals no longer claim data arrays, inset
spacers and SVG definitions are not steps, a keyed list's shell is merged with
its first row, and a staged mistake carries both dimensions so it displaces
something in a row as well as a column.
