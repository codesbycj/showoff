# apexpay imagery

ApexPay is not a real product — it is the app Google Stitch invented for the
"Obsidian Kinetic" design system, and both portraits in the export were
generated alongside it. So there is no brand photography here to stand in for:
these two files **are** the reference's own images, fetched from the
`lh3.googleusercontent.com/aida-public` URLs in `ref/apexpay/code.html`,
centre-cropped square and resampled to 3x their display size.

They are bundled rather than hotlinked, because a recording must not depend on
the network — and those URLs are a Stitch export's temporary CDN links, which
will stop resolving long before the video does.

| File | Size | Drawn at | Stands for |
|---|---|---|---|
| `avatar.jpg` | 132px | 44dp in the greeting row | Sajibur Rahman |
| `avatar-bar.jpg` | 96px | 32dp in the app bar | Sajibur Rahman |

The export uses **two different generated portraits** for the same person — one
in the app bar, a second in the greeting row directly beneath it. Both are kept
rather than collapsed to one, because at 32dp and 44dp the difference is
visible and reconciling it would be a change to the design rather than a
faithful build of it.

## Not here

The app icon is **not** bundled. The export points at a third CDN image for it;
it is three primitives — an arc, a ring and a dot on a dark squircle — so it is
redrawn as SVG in `components/brand-mark.tsx` instead. Geometry costs nothing,
needs no network, and stays sharp at any density the emulator runs at.
