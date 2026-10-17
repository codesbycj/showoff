# marina imagery

Marina is the boat-charter app the reference design invents. There is no brand
photography to stand in for, so these two files are free-licensed stock
standing in for a fleet that does not exist.

Both are from [Pexels](https://www.pexels.com) under the
[Pexels licence](https://www.pexels.com/license/): free to use, modification
allowed, attribution not required. Credited here anyway, because the
photographers did the work.

They are bundled rather than hotlinked, because a recording must not depend on
the network.

| File | Drawn at | Source | Photographer |
|---|---|---|---|
| `hero-yacht.jpg` | 393x255dp, full-bleed hero | [pexels 18262641](https://www.pexels.com/photo/bird-eye-view-on-yacht-in-sea-18262641/) | Burak Evlivan |
| `agent.jpg` | 56x56dp, the agent's avatar | [pexels 12437056](https://www.pexels.com/photo/portrait-of-a-smiling-man-12437056/) | Lubomir Satko |

Only two, because everything else on this screen is type, a chip or an icon.

## The hero is framed on the hull, and darkened at the top

`tools/bake/marina.py` writes both files at **3x their drawn size**, cropped
about a chosen centre rather than the frame's middle — `resizeMode="cover"`
centres whatever it is given, and the subject of a stock photograph rarely is.

The hero needed two passes to get right, and the reason is worth recording.
Measuring the brightest pixels in the source puts their centre at y = 0.283 —
but that figure includes the **wake** trailing behind the boat. The hull itself
runs y 444..900. Framed on the wake-inclusive centre, the bow came up into
exactly the band where the title sits, so the boat's name printed across it and
the hull name disappeared against white paintwork.

Framed on the hull instead, and zoomed to 0.80, the bow lands at about 45% of
the hero with open water above it for the type.

The top of the hero also carries a **darkening ramp**, baked in. White chrome —
the back button, the title, the heart — sits over a drone shot of bright water
and has nothing to sit against otherwise. Baking it means the hero is one image
and one draw, rather than a third stacked view with gradient stops to keep
right on two platforms.

Re-run with `python tools/bake/marina.py` after changing a crop. Swapping a
file is one line in `src/features/marina/data/boat.ts` plus a crop in the
script.
