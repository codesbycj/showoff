# velora imagery

Velora is invented — there is no brand photography to stand in for, so these
eight files are free-licensed stock standing in for a catalogue the store does
not have.

All eight are from [Pexels](https://www.pexels.com) under the
[Pexels licence](https://www.pexels.com/license/): free to use, modification
allowed, attribution not required. Credited here anyway, because the
photographers did the work.

They are bundled rather than hotlinked, because a recording must not depend on
the network.

## Baked, not cropped at runtime

Each file is written by `tools/bake/velora.py` at **3x the slot it is drawn
in**, cropped about a chosen centre rather than the frame's middle. Two reasons:
`resizeMode="cover"` would centre every one of them, which puts the stool in
frame on the jacket shot and cuts the heel off the shoes — the subject is
rarely in the middle of a stock photograph — and resampling once here is
sharper than asking the GPU to do it every frame.

Re-run it with `python tools/bake/velora.py` after changing a crop.

| File | Drawn at | Source | Photographer |
|---|---|---|---|
| `promo-shopper.jpg` | 140x180dp, promo panel | [pexels 5622859](https://www.pexels.com/photo/woman-holding-shopping-bags-5622859/) | Gustavo Fring |
| `product-jacket.jpg` | 170x240dp, product card | [pexels 23910818](https://www.pexels.com/photo/studio-shoot-of-a-man-wearing-a-leather-jacket-23910818/) | Kobby Katalist |
| `product-shoes.jpg` | 170x240dp, product card | [pexels 1464625](https://www.pexels.com/photo/grey-sneakers-with-dense-surface-of-texture-for-comfortable-everyday-wearing-1464625/) | Ray Piedra |
| `product-overshirt.jpg` | 170x240dp, product card | [pexels 9466721](https://www.pexels.com/photo/a-man-wearing-a-brown-jacket-over-a-black-shirt-9466721/) | Ron Lach |
| `product-trousers.jpg` | 170x240dp, product card | [pexels 17394914](https://www.pexels.com/photo/beautiful-woman-in-white-pants-17394914/) | Aldair Nuñez |
| `cat-men.jpg` | 44x48dp, category chip | [pexels 9466721](https://www.pexels.com/photo/a-man-wearing-a-brown-jacket-over-a-black-shirt-9466721/) | Ron Lach |
| `cat-women.jpg` | 44x48dp, category chip | [pexels 17394914](https://www.pexels.com/photo/beautiful-woman-in-white-pants-17394914/) | Aldair Nuñez |
| `cat-shoes.jpg` | 44x48dp, category chip | [pexels 1464625](https://www.pexels.com/photo/grey-sneakers-with-dense-surface-of-texture-for-comfortable-everyday-wearing-1464625/) | Ray Piedra |

Three frames are used twice, at different crops — `cat-shoes` against
`product-shoes`, `cat-men` against `product-overshirt`, `cat-women` against
`product-trousers`. That is deliberate rather than thrift: a small store whose
footwear category and whose featured shoe are the same product is what its home
screen would actually look like.

## The promo panel is a bleed, not a cut-out

The reference puts a cut-out shopper on the green card. The frame standing in
for her has a backdrop whose border pixels measure a standard deviation of 31,
so a flood-fill cut leaves a grey halo and chewed edges on the hair and the bag
handles — at 140dp, that is all you would see. The panel bleeds to the card's
own corners instead. Said here rather than passed off as the same thing.

Swapping any file is one line in `src/features/velora/data/home.ts`, plus a
crop in the bake script.
