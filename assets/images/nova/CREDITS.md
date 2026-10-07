# nova imagery

**No image files.** Nova is the first showcase here that ships none — every
mark on all six screens is drawn in code.

| What | How |
|---|---|
| The onboarding hero — lilac Ethereum coin, sage hardware wallet, three gold coins, two orbiting arrows | One `react-native-svg` composition on a 280-unit box (`components/hero-artwork.tsx`). The export builds it from stacked `div`s using `radial-gradient` and `inset` box-shadows, neither of which React Native has; the SVG gets the radial gradients outright and replaces each inset shadow with the specular ellipse it was imitating. |
| The six coin logos — BTC, ETH, SOL, UNI, DOGE, ADA | Paths on a shared 32-unit box (`components/coin-mark.tsx`). The export only draws ETH and SOL properly; BTC and UNI are set as text characters (`₿`, an emoji) and the activity screen falls back to a coloured letter. A `₿` is a font glyph, not the Bitcoin mark — it renders in whatever face is loaded — so all six are drawn, on the same rule `AGENTS.md` applies to emoji. |
| The two account avatars (wallet card, settings banner) | Plain `View`s — a head, shoulders and a verification tick. The export references no image file for either. |
| The price chart | The export's own SVG path, carried across verbatim (`data/trade.ts`). It is already drawn on the 320×190 box the panel gives it. |

The reference also sets two decorative emoji in running text — a 👋 after the
greeting on the dashboard and a 🔥 in the "Hot" filter chip. Both are dropped:
they are the one glyph class that is a different picture on every platform, and
neither carries meaning the sentence needs.
