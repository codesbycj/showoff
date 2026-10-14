# botanic imagery

Botanic is not a real product — it is the app Google Stitch invented for its
"Organic Botanic Dark" design system, and all three images in the export were
generated alongside it. So there is no brand photography here to stand in for:
these files **are** the reference's own images, fetched from the
`lh3.googleusercontent.com/aida-public` URLs in `ref/botanic/code.html`.

They are bundled rather than hotlinked, because a recording must not depend on
the network — and those URLs are a Stitch export's temporary CDN links, which
will stop resolving long before the video does.

| File | Source | Drawn at | Prepared |
|---|---|---|---|
| `bowl.jpg` | export, 512×279 | 256dp square | centre square crop, 768px (3×), q92 |
| `avatar.jpg` | export, 512×512 | 32dp circle | 96px (3×), q92 |
| `logo.png` | export, 512×286 | 50×28dp | background keyed out, 150px (3×) |

The bowl's crop is the `object-cover` the markup performs: a 256×256 box over a
512×279 source takes the centre 279 square, which is where the dish sits.

## Why the logo is a PNG and the others are not

The export's logo is a JPEG of a circular badge on a flat field, and that field
is `#15191a` — measured across its border ring at a standard deviation under 1.2,
so it is genuinely flat rather than a gradient. The header it sits on is
`#111411`. Those are four to nine levels apart per channel, which on a dark bar
draws a visible rectangle around the mark.

So the field is keyed out and the file written with alpha. The key is a distance
ramp from the measured backdrop rather than a threshold — fully out within 10
levels, fully in past 42 — which keeps the ring's antialiased edge instead of
cutting it to a stencil. The badge's interior was the same flat field, so it
keys out too; the mark reads as a ring and a wordmark over whatever is behind it,
which is what the original looked like on the dark header anyway.

`tools/preview/sample.js <image> border` is what measured it, and is the check to
run before keying anything else: a high deviation means the edge carries detail
and a flood fill will tear it.

## Not here

Nothing else. The screen's eleven icons come from Material Symbols Outlined,
subset to 2.8KB by `tools/subset-symbols.py`; the three the static cut cannot
supply — `spa` and `star` at `FILL 1`, plus the filled `favorite` the toggle
needs — are inlined as paths in `components/drawn-icon.tsx`.
