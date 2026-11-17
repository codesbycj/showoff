# The board each app was built from

One image per app that exists in the repo, named for the **group** its slugs
share — `fern.png` produced `fernhome`, `fernlist` and `ferntrip`.

This is RULES rule 8 ("reference filenames match the build") applied at the
level the design shots actually work at: a board is two or three phones, so it
produces two or three showcases, and the thing they have in common is the app.

Every file here is a copy of its source under [../inspo](../inspo), which stays
the full pull. These are the ones that got built.

| Group | Screens | Board |
|---|---|---|
| `alpen` | alpenfly · alpenstay · alpenpick | inspo/travel-app/02 |
| `fern` | fernhome · fernlist · ferntrip | inspo/travel-app/03 |
| `flow` | flowstart · flowhome · flowtrain | inspo/health/02 |
| `flowmeals` | flowmeals · flowrecipe | inspo/health/03 |
| `kova` | kovahome · kovacal · kovastats | inspo/social-media-app/03 |
| `lumo` | lumofeed · lumoreel · lumoprofile | inspo/social-media-app/02 |
| `nebu` | nebuhome · nebuswap | inspo/crypto-wallet/02 |
| `nord` | nordhome · nordsearch · nordstay | inspo/booking-app/02 |
| `orbit` | orbithome · orbitsend · orbitchart | inspo/fintech/02 |
| `sky` | skyplan · skyresults · skyticket | inspo/booking-app/03 |
| `sonic` | sonichome · sonicplay · sonicexplore | inspo/music-app/01 |
| `stride` | stridehome · stridestart · striderun | inspo/fitness-tracker/03 |
| `tamar` | tamarstart · tamarfind · tamargym | inspo/fitness-tracker/01 |
| `twirl` | twirlfeed | inspo/social-media-app/01 |
| `verde` | verdestart · verdehome · verdedish | inspo/food/03 |
| `vesta` | vestahome · vestabrowse · vestaitem | inspo/ecommerce-app/01 |
| `vital` | vitalcycle · vitalweight · vitalprog · vitalstats · vitalday | inspo/health/01 |
| `volt` | volthome · voltitem · voltcart | inspo/ecommerce-app/02 |
| `wise` | wisetrip · wisefriends · wiseplaces | inspo/onboarding-app/02 |
| `zone` | zonestart · zonehome · zonemenu · zoneroute · zoneitem | inspo/food/01 |

**Flowan has two boards.** `health/02` is the app's onboarding, home and
exercise screens; `health/03` is its nourish and recipe screens. The second is
filed under the first slug it produced, because `flow.png` was already taken by
the first.

Batches 1–3 and the `aura` set were deleted on 2026-11-16: their showcases are
long gone from the tree, so the references were pictures of nothing. They are
recoverable from git history if a build ever needs to be read back.
