# elite imagery

EliteBeauty is the salon app the reference design invents. There is no brand
photography to stand in for, so these four files are free-licensed stock
standing in for a catalogue the salon does not have.

All four are from [Pexels](https://www.pexels.com) under the
[Pexels licence](https://www.pexels.com/license/): free to use, modification
allowed, attribution not required. Credited here anyway, because the
photographers did the work.

They are bundled rather than hotlinked, because a recording must not depend on
the network.

| File | Drawn at | Source | Photographer |
|---|---|---|---|
| `hero-stylist.jpg` | 393x500dp, full-bleed hero | [pexels 9709014](https://www.pexels.com/photo/a-woman-in-black-clothes-sitting-on-a-barber-chair-while-holding-scissors-9709014/) | Kamil Rybarski |
| `card-facial.jpg` | 84x118dp, left of the fan | [pexels 12115041](https://www.pexels.com/photo/beautician-removing-clay-cosmetic-mask-from-woman-face-12115041/) | Denys Mikhalevych |
| `card-wash.jpg` | 108x146dp, front of the fan | [pexels 3993449](https://www.pexels.com/photo/person-washing-woman-s-hair-3993449/) | cottonbro studio |
| `card-cut.jpg` | 84x118dp, right of the fan | [pexels 3993453](https://www.pexels.com/photo/person-holding-black-hair-comb-3993453/) | cottonbro studio |

## The hero is baked, not layered

`tools/bake/elite.py` writes every file at **3x its drawn size**, cropped about
a chosen centre rather than the frame's middle — `resizeMode="cover"` would
centre each one, and the subject of a stock photograph rarely is.

The hero gets more than a crop. The reference lays a **cut-out** stylist on a
flat mauve wash that fades to white where the page begins. The frame standing
in for her is a whole salon interior and there is no figure to cut out of it,
so the wash and the fade are applied to the photograph itself and baked in.

`expo-linear-gradient` could do the fade at runtime, but the hero would then be
three stacked views whose order and opacity have to stay right on two
platforms, and the tint over them wants a blend mode React Native does not
have. Baked, it is one asset and one draw, with no boundary for anything to
line up against.

**The tint is not the colour the reference samples at.** Its wash reads
`#d9cfd7` over `#d2c8d0`, but those are the colour of a flat backdrop behind a
cut-out. Mixing a near-neutral mauve into a colour photograph at a third
strength does not tint it lavender — it desaturates it, which is exactly how
the first bake came out: a grey salon rather than a lilac one. The values in
the script are pushed toward the brand violet until the cast reads through the
photograph. The sampled numbers stay recorded in `src/features/elite/theme.ts`.

Re-run it with `python tools/bake/elite.py` after changing a crop. Swapping a
file is one line in `src/features/elite/data/onboarding.ts` plus a crop in the
script.
