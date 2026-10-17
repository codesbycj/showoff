# cargo imagery

Cargo is the shipping app the reference design invents. There is no brand
photography to stand in for, so this file is free-licensed stock standing
in for a fleet that does not exist.

It is from [Pexels](https://www.pexels.com) under the
[Pexels licence](https://www.pexels.com/license/): free to use, modification
allowed, attribution not required. Credited here anyway, because the
photographer did the work.

It is bundled rather than hotlinked, because a recording must not depend on
the network.

| File | Drawn at | Source | Photographer |
|---|---|---|---|
| `hero-truck.jpg` | 393x580dp, full-bleed hero | [pexels 12261472](https://www.pexels.com/photo/a-white-truck-on-the-road-12261472/) | Giovanni Spoletini |

One file, because everything else on this screen is type, a drawn box or an
icon. The home screen of the same design is its own showcase, `cargohome`,
and the avatar it uses is credited there.

## Desaturate, warm, tint, fade — in that order

`tools/bake/cargo.py` writes it at **3x** and does four things to it, and the
order is the whole job.

The reference's screen is a truck photograph that does not stop anywhere: it is
washed yellow all the way down and simply *becomes* the page, with the road at
the bottom turning into flat brand yellow with no seam. So the asset ends on
`#f8dd4e` exactly — its last row **is** the page colour, which is why there is
no boundary to line up and the script asserts that match when it runs.

Getting there took three attempts, all failing the same way:

1. **Tint a colour photograph yellow** and you get green. Yellow over a blue
   sky is green; that is simply what those two make.
2. **Pull the blue channel down first** and it is still green, because what is
   left of a grey-blue storm sky is a high *green* channel.
3. **Drain the colour first, then warm, then tint.** Yellow over grey is gold.

How far to drain is not a taste call either. Sweeping the value and measuring
the sky's channels, the cast only flips from green to warm — red at or above
green — at `0.88`. It is set to `0.90` for margin, with the contrast lifted
afterwards to put back the detail that draining the colour costs the truck.

The first version of all this walked 1179x1740 pixels in Python and took over
two minutes. `ImageEnhance` and `Image.composite` do the same work in C, with
the tint and fade collapsed into a single per-row mask: one second.

Re-run with `python tools/bake/cargo.py` after changing a crop. Swapping the
file is one line in `src/features/cargo/data/onboarding.ts`. The same script
also writes the home screen's avatar into `assets/images/cargohome/`, because
it bakes the design rather than either showcase.
