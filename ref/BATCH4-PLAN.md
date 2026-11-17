# Batch 4 — plan

**Reference class: design shot → inspo brief. Rule 1 is OFF** (RULES §2.2).
Build the spirit at real 393dp sizes, fix the reference's mistakes, say which
calls were mine. Everything else holds: one showcase per screen, components not
markup, one component at a time, full staging, the done-gate.

Source: the first board of each `ref/inspo/<category>/01.*`, per the agreed plan
— one board per category, every phone on that board becomes its own showcase.

## 35 screens, 35 slugs

| # | Board | Slug | Screen |
|---|---|---|---|
| 1 | booking-app/01 | `romeospot` | restaurant detail — hero photo, order modes, time slots |
| 2 | | `romeobook` | book a table — date strip, time, party size |
| 3 | | `romeodate` | book a table — month calendar open |
| 4 | crypto-wallet/01 | `crypinhome` | portfolio value, actions, markets list |
| 5 | | `crypinswap` | swap — pay/receive, numeric keypad |
| 6 | | `crypinconfirm` | confirm swap — fee rows, slide to confirm |
| 7 | ecommerce-app/01 | `vestahome` | home — promo card, special-for-you grid |
| 8 | | `vestabrowse` | explore — filter chips, product grid |
| 9 | | `vestaitem` | product detail — colourways, size, add to cart |
| 10 | fintech/01 | `lumistart` | onboarding — card render, headline, CTA |
| 11 | | `lumihome` | wallet — balance, quick actions, transactions |
| 12 | | `lumistock` | holding detail — line chart, stats |
| 13 | fitness-tracker/01 | `tamarstart` | onboarding — full-bleed portrait, CTA |
| 14 | | `tamarfind` | find classes — category chips, **map**, result card |
| 15 | | `tamargym` | gym detail — photo, amenities, price, reserve |
| 16 | food/01 | `zonestart` | onboarding — burger hero, email / delivery |
| 17 | | `zonehome` | home — discount banner, **photo category tiles**, restaurants rail |
| 18 | | `zonemenu` | restaurant — hero, offers, tabs, menu grid |
| 19 | | `zoneroute` | delivery **map** — route, pins |
| 20 | | `zoneitem` | item detail — hero, add-ons, qty, add to cart |
| 21 | health/01 | `vitalcycle` | cycle log — day strip, symptom chips, promo |
| 22 | | `vitalweight` | weight breakdown — chart, four stat tiles |
| 23 | | `vitalprog` | programs — leaderboard banner, trending rows |
| 24 | | `vitalstats` | stats — rankings tabs, leaderboard rows |
| 25 | | `vitalday` | day view — week ring strip, month bars, following |
| 26 | music-app/01 | `sonichome` | home — categories, popular songs, new collection |
| 27 | | `sonicplay` | player — art, scrubber, transport |
| 28 | | `sonicexplore` | explore — search, mood & genre tiles |
| 29 | onboarding-app/01 | `quranone` | onboarding 1 — crescent, headline, Get Started |
| 30 | | `qurantwo` | onboarding 2 — arch, headline, Next |
| 31 | | `quranthree` | onboarding 3 — skyline, headline, Next |
| 32 | social-media-app/01 | `twirlfeed` | feed — stories rail, post card, tab bar |
| 33 | travel-app/01 | `globestart` | onboarding — coast photo, headline, Continue |
| 34 | | `globehome` | home — greeting, region chips, destination cards |
| 35 | | `globestay` | stay detail — hero, facilities, price, Book Now |

## Out of drawing range (RULES §2.5) — the asset plan

Photographs, not vectors. Free-licensed stock, bundled, `CREDITS.md` per showcase.

- **Food** — `zonestart` `zonehome` `zonemenu` `zoneitem`. The category tiles on
  `zonehome` are **six photographs**, not six drawn icons; that is the exact
  mistake §2.5 calls out as the thing that most makes a screen read as a toy.
- **People / portraits** — `vitalstats` `vitalday` `twirlfeed` `tamarstart`
  `vestahome` `vestabrowse` `vestaitem` `sonichome` `sonicplay`.
- **Places / interiors** — `romeospot` `globestart` `globehome` `globestay`
  `tamargym`.
- **Maps** — `tamarfind` `zoneroute`. A map is **out of drawing range**: a static
  tile from a free-licensed source, or the map *idea* (route line, pin, radius
  ring) over a flat ground. Say which in the handover.
- **3D card render** — `lumistart`. Rebuild the *idea* as a real card component,
  posed and shadowed (§2.2).

## Reference mistakes to fix (RULES §2.2) — found already

- **health/01**: "Our advance**de**d weight tracking feature" → "advanced".
  "Control you're looking to track progress," and "By tracking these area
  consistently score" are both broken grammar → rewrite as labels (R5).
  **"Avg Wt 03.7 Kg"** next to Current 67.0 and Track 62.9 is impossible — R9
  says the picture agrees with the numbers, so the stat gets a real value.
- **food/01**: "Add to **card**" → "Add to cart". "Add ons for **Bourger**" →
  "Burger".
- **food/01** leans on real **McDonald's** marks and a DoorDash mention in its
  legal text. Substituted with a fictional brand — the repo does not ship a
  rebuild that impersonates a real chain.
- Contrast and tap targets to be checked per screen against R4 / R7; the muted
  greys in several of these boards will not clear 4.5:1.

## Risks, stated up front

- **35 screens is larger than the batch of 29 that was deleted.** This is a
  multi-session programme, not one run.
- **health/01 is a collage of fragments** — most of its five screens are cropped
  top and bottom with no status bar, so the foot is invented, not read. Fine
  under an inspo brief, but it is the thinnest spec in the batch.
- **social-media-app/01 is one phone held in a hand**, partly obscured and small
  in frame. It yields one screen and the least information of any board.
- Six of eleven boards are photography-led, so Step 5 (assets before components)
  is the long pole, not the layout.

## Order of work

0. **Build the per-step diff probe first.** RULES §8.2-5d: *"The probe for this
   does not exist yet; building it is the first task of the next batch."*
   Rules 0.2, 0.3 and 0.4 are unenforced without it, and that is the state that
   produced the deleted batch.
1. Then per board, in table order: Step 3 read → scaffold → theme/layout/text →
   assets → components one at a time → design bar → staging → done-gate.
