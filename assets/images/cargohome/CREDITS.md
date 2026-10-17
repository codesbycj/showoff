# cargohome imagery

Cargo is the shipping app the reference design invents, and this showcase is its
home screen; the onboarding screen is the `cargo` showcase next door. There is
no brand photography to stand in for, so this file is free-licensed stock
standing in for a customer who does not exist.

It is from [Pexels](https://www.pexels.com) under the
[Pexels licence](https://www.pexels.com/license/): free to use, modification
allowed, attribution not required. Credited here anyway, because the
photographer did the work.

It is bundled rather than hotlinked, because a recording must not depend on the
network.

| File | Drawn at | Source | Photographer |
|---|---|---|---|
| `avatar.jpg` | 44x44dp, the greeting row | [pexels 9775432](https://www.pexels.com/photo/close-up-photo-of-young-man-with-a-big-smile-9775432/) | SHVETS production |

One file, because everything else on this screen is type, a drawn box or an
icon.

`avatar.jpg` is cropped to a square around the face — `box = min * 0.55` at
`cx 0.60, cy 0.26` — because at 44dp a head-and-shoulders crop is a smudge. The
first pass framed the whole torso and the face landed about eight pixels across.

`tools/bake/cargo.py` writes both this and the onboarding hero, and still does:
it is the bake script for the design, not for either showcase. Re-run it with
`python tools/bake/cargo.py` after changing a crop — it writes `avatar.jpg`
here and `hero-truck.jpg` into `assets/images/cargo/`.
