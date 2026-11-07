# Inspo pulls — free, no login, no exporting

These are **design shots**, so they are inspo briefs and **rule 1 is off**: match
the spirit, build at real 393dp sizes, fix the reference's mistakes, and say
which calls were yours. See the inspo-brief section of the rules.

## The recipe

```bash
node tools/ref/browse.js images \
  "https://dribbble.com/search/<query>" \
  ref/inspo/<name> \
  --min 300 --settle 13000 --scope ".shot-thumbnail-placeholder"
```

Swap `<query>` for any Dribbble search slug: `fintech-app-ui`,
`food-delivery-app`, `health-fitness-app`, `banking-app`, `ecommerce-app`,
`music-player-app`, `onboarding-screens`. Roughly 40 boards per pull at
1200x900, each board carrying two or three phones — so one pull is ~100 screens
of ideas.

## Three things that each cost a pass

- **`--settle 13000`.** Dribbble is a slow SPA. At the 3.5s default the page is
  blank and the pull silently returns nothing — the run looks successful.
- **`--scope ".shot-thumbnail-placeholder"`.** Without it the footer rail is
  collected too: six images that are *identical on every query* and look like
  results until you hash two pulls against each other. The obvious selector
  (`a[href*='/shots/']`) does **not** work — the thumbnail is not inside the
  anchor, so it matches only the footer.
- **Download in Node, not in the page.** An in-page `fetch` to a different-origin
  CDN is refused by CORS unless that CDN opts in, and the refusal arrives as a
  thrown TypeError — indistinguishable from "no image" if you swallow it.
  `browse.js` collects URLs in the page and downloads them in Node, carrying
  cookies explicitly.

## What else was tested

| Source | Result |
|---|---|
| Dribbble | **works** — free, no login, 1200x900 |
| Collect UI | loads free, but its front page is *web* landing pages, not mobile |
| Behance | returns a near-empty shell headless; open it in your own browser |
| Pinterest | search is behind a login wall; content is re-pinned Dribbble at lower res |
| mobile-patterns.com | dead (522) |
| App Store / Play | marketing art — see [../batch4/README.md](../batch4/README.md) |

## Current pulls

`fintech` (43) · `food` (43) · `health` (41)
