# pulsefit imagery

PulseFit is not a real product — it is the app Google Stitch invented for this
design, and every photograph in the export was generated alongside it. So there
is no brand photography here to stand in for: these five files **are** the
reference's own images, fetched from the `lh3.googleusercontent.com/aida-public`
URLs in `ref/pulsefit/code.html`, centre-cropped square and resampled to 3x
their display size.

They are bundled rather than hotlinked, because a recording must not depend on
the network — and those URLs are a Stitch export's temporary CDN links, which
will stop resolving long before the video does.

| File | Size | Drawn at | Stands for |
|---|---|---|---|
| `avatar.jpg` | 160px | 48dp in the greeting, 32dp in the header | Sajibur Rahman |
| `bf-toast.jpg` | 144px | 44dp | breakfast — avocado toast with poached egg |
| `bf-bowl.jpg` | 144px | 44dp | breakfast — yoghurt, granola and berries |
| `ln-steak.jpg` | 144px | 44dp | lunch — steak with asparagus and potatoes |
| `ln-salad.jpg` | 144px | 44dp | lunch — mixed green salad |

Swapping any of them is one line in `src/features/pulsefit/data/home.ts`; a
free-licensed stock photograph of the same dish would drop straight in, and
should be credited here if it does.

The brand mark is not here at all. The export hotlinks it as a bitmap too, but
it is a lime squircle with a white check, so it is redrawn as SVG in
`src/features/pulsefit/components/brand-mark.tsx`.
