# voyago imagery

Voyago is a fictional travel app. The itinerary, prices, flight number, seat and
rating are invented content for a UI showcase. "Address Sky View", "Grand
Cosmopolitan", "Caesars Palace Dubai" and "Five Jumeirah Village" are real Dubai
hotels named in the reference design; nothing here is a claim about any of them,
and no booking, price or rating shown is real.

## Photography — AI-generated, shipped with the Stitch export

Every `.jpg` here comes from the Google Stitch export this showcase rebuilds.
Stitch generated the images and hot-linked them from `lh3.googleusercontent.com`,
so they are not photographs of a place as it is, and none of them survive
offline. Each was pulled once at the largest size the host serves, cropped to the
slot it fills in the design, and downscaled to 3x that slot.

| File | Slot in the reference | Shipped |
|---|---|---|
| `chip-uae.jpg` | home, country chip thumbnail | 96x96 |
| `chip-egypt.jpg` | home, country chip thumbnail | 96x96 |
| `chip-tropical.jpg` | home, third chip (image only) | 96x96 |
| `hero-dubai.jpg` | home, 353x290dp featured card | 1059x870 |
| `mini-skyview.jpg` | home, 144x79dp strip on the hotel teaser | 432x237 |
| `hotel-skyview.jpg` | hotels, 345x360dp featured card | 1035x1080 |

`chip-tropical.jpg` is cropped from the lower right of its source rather than
centred: Stitch burned a caption ("PARADISE FOUND! Bora Bora, French Polynesia")
into the top-left of that image, and a centre crop carries a fragment of it into
a 32dp circle.

## Two of them are composites, not crops

`hero-dubai.jpg` and `hotel-skyview.jpg` are not the source photographs. Each
card in the reference is a stack of a gradient, a filtered photo and an overlay,
and the filters and blend modes involved — `contrast()`, `brightness()`,
`mix-blend-multiply` — have no React Native equivalent. Both stacks are therefore
composited ahead of time, by `tools/bake/voyago-hero.py` and
`tools/bake/voyago-hotel.py`, and the cards draw one flat asset each. The scripts
are rerunnable from the repo root; their inputs are in `tools/bake/sources/`,
which is outside `assets/` so the originals are not bundled into the app.

## Nothing else is an image

Every other mark in the showcase is drawn in code: the plane on home's active tab
and on the ticket's route badge, the house in the ticket dock, the barcode, the
perforation and its notches, and the `//` overflow control. The plane and the
house are the export's own SVG paths, carried across verbatim rather than mapped
onto an icon set — the export sets the plane two different ways across two
screens (Font Awesome on home, an inline path on the ticket), and the two point
in different directions, so matching the reference's angle by rotating a
lookalike would have been guesswork.

No emoji ship as UI. The export sets none, so unlike other Stitch rebuilds here
there was nothing to replace.
