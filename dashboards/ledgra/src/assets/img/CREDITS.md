# ledgra — image credits

Two bundled portraits, from **Pexels** under the Pexels licence. They stand in for the
reference's own photography, which is not redistributable. Square-cropped on the head and
resampled once to 240px, which covers the 32px account disc and the 28px collaborator
disc at 3x and beyond.

| File | Pexels photo | Where it appears |
|---|---|---|
| `face-1.jpg` | <https://www.pexels.com/photo/12311572/> | The account at the foot of the sidebar |
| `face-2.jpg` | <https://www.pexels.com/photo/30468665/> | The collaborator in the breadcrumb bar |

Baked for an earlier showcase in this repository by `tools/bake/faces.py` and copied here
rather than re-downloaded, so the build has no network dependency.

Only two, because this design shows exactly two people. Shipping the other four this
repository holds would be assets nothing references, which is the "nothing unused
shipped" half of rule 8 — and `faces.ts` naming six while two were on disk is how that
was found: `tsc` cannot see it, because Vite's asset module declaration accepts any path.

## Why these are photographs

The account row and the "edited 23m ago" collaborator are people, and a face is a picture,
not an icon (rule 8). The reference has a monogram disc on one of them — which is a
fallback state, not a design decision — and a photograph on the other.

Everything else is drawn: the Tallora rule, all nine sidebar glyphs, the small info glyph
beside every heading, the warning triangle in the tax table, the cash-flow heatmap, the
stacked tax bar and the statement curve.
