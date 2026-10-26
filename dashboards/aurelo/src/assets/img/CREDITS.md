# aurelo — image credits

Six bundled portraits, from **Pexels** under the Pexels licence. They stand in for the
reference's own photography, which is not redistributable. Square-cropped on the head and
resampled once to 240px, which covers the 52px discs in the contact strip at 3x.

| File | Pexels photo | Where it appears |
|---|---|---|
| `face-1.jpg` | <https://www.pexels.com/photo/12311572/> | The account portrait in the header |
| `face-2.jpg` | <https://www.pexels.com/photo/30468665/> | Contact strip · Send money |
| `face-3.jpg` | <https://www.pexels.com/photo/26872232/> | Contact strip · ledger row |
| `face-4.jpg` | <https://www.pexels.com/photo/29852895/> | Contact strip · ledger row |
| `face-5.jpg` | <https://www.pexels.com/photo/31409070/> | Contact strip · ledger row |
| `face-6.jpg` | <https://www.pexels.com/photo/38197025/> | Contact strip · ledger row |

Baked for an earlier showcase in this repository by `tools/bake/faces.py` and copied here
rather than re-downloaded, so the build has no network dependency.

## Why these are photographs

The contact strip and the person rows in the ledger are people, and a face is a picture,
not an icon (rule 8). Initials on a coloured disc is a fallback state, not a substitute:
the reference has photographs in both places.

Each row gets its own portrait. Six is every distinct one this repository holds, which is
why the strip shows six and an overflow count rather than the board's seven — the same
face twice in one row reads as the same person twice.

Everything else is drawn: the Orvela mark, every rail glyph, the six counterparty marks,
the payment card with its chip and its invented scheme mark, the analytics gauge, the
month columns, the in/out columns and the balance curve.
