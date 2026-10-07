# redbrew imagery

The export references 25 images, all pointing at `lh3.googleusercontent.com`
URLs that no longer resolve. Two shipped in the bundle; the rest are
free-licensed stock standing in for the brand's own photography.

## Shipped with the export

| File | From |
|---|---|
| `hero-cafe.jpg`, `order-slice.jpg` | The bundle's own cappuccino render (`close_up_appetizing_shot_of_an_artisanal_single_origin_cappuccino_in_a_modern`), cropped twice at different aspect ratios. |
| `cup-hero.jpg`, `cup-thumb.jpg` | The bundle's own takeaway-cup render (`a_bold_red_takeaway_paper_coffee_cup_with_a_modern_minimalist_black_sip_lid`). |

Both carry a "Daily Grind Coffee Co." cup design rather than Red Brew's — an
artefact of how they were generated, legible at the product-detail hero's size.
They are used anyway because they are the only brand-red cups in the set and the
reference itself used them.

## Free-licensed stock (Pexels)

All under the [Pexels licence](https://www.pexels.com/license/): free to use,
no attribution required. Credited here anyway.

| File | Pexels photo | Used for |
|---|---|---|
| `cappuccino.jpg`, `thumb-capp.jpg` | 302899 | Origin Cappuccino card, cart thumbnail |
| `flat-white.jpg` | 2396220 | Double Flat White card |
| `cold-brew.jpg` | 1493080 | Nitro Cold Brew card |
| `red-latte.jpg`, `thumb-latte.jpg` | 350478 | Classic Red Latte card, cart thumbnail |
| `cortado.jpg` | 1170659 | Reorder block |
| `thumb-black.jpg` | 312418 | Cart thumbnail |
| `alex.jpg` | 2379004 | Alex Mercer — header avatar and profile |
| `dianna.jpg` | 1181690 | Dianna McKenzie — concierge row |

Every file is resized and re-encoded to the size it renders at; the whole set is
337KB. Nothing is hotlinked — the recording does not depend on the network.

## Not photographed

The Red Brew mark and wordmark are `components/brand-mark.tsx`: the export's own
SVG paths for the `R` in its rounded square, with the wordmark set as live text
in Space Grotesk so it picks up the loaded face at any size.

Icons come from Material Symbols Outlined, the set the design specifies, subset
to the 51 glyphs this app uses (`assets/fonts/redbrew-symbols`, 8.7KB from
944KB). The one exception is the rating star: the Outlined cut is FILL 0, so its
`star` is hollow, and the reference's solid crimson stars are drawn as a path in
`components/order-parts.tsx`.
