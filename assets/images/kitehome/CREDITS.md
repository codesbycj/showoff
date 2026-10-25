# kitehome — image credits

Free-licensed portraits from **Pexels**, used under the Pexels licence, baked
by `tools/bake/faces.py kitehome 6`.

| File | Pexels photo | Where it appears |
|---|---|---|
| `face-1.jpg` | <https://www.pexels.com/photo/12311572/> | The account portrait on the panel |
| `face-2.jpg` | <https://www.pexels.com/photo/30468665/> | Transaction row 1 |
| `face-3.jpg` | <https://www.pexels.com/photo/26872232/> | Transaction row 2 |
| `face-4.jpg` | <https://www.pexels.com/photo/29852895/> | Transaction row 3 |
| `face-5.jpg` | <https://www.pexels.com/photo/31409070/> | Transaction row 4 |
| `face-6.jpg` | <https://www.pexels.com/photo/38197025/> | Transaction row 5 |

## Why these are photographs

These rows are people you have paid, and a person's face is a picture, not an
icon (AGENTS.md, "Faces are photographs"). Each row gets its own portrait:
reusing one across two rows reads as a duplicate transaction, which is the
bug the reference's own list has.

Each is square-cropped on the head and resampled once to 240px, which covers
the 36dp discs on this screen at 3x.
