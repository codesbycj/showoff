# sprigdish — image credits

One free-licensed photograph from **Pexels**, used under the Pexels licence,
masked by `tools/bake/sprig.py`.

| File | Pexels photo | What it is |
|---|---|---|
| `dish.png` | <https://www.pexels.com/photo/4828100/> | The tofu and corn poke bowl filling the hero |

**It is a circular crop, not a flood-fill cut-out.** A bowl shot from directly
overhead is already a circle, so masking at its own rim gives a perfect edge
with no tolerance to tune and no grey halo — and it drops the photograph's
pale backdrop, which would otherwise sit as a disc of the wrong colour on the
lime panel. The mask is drawn at 4x and resampled down; a 1px circle drawn at
the final size aliases into a staircase that is plainly visible against a flat
fill.

The frame was checked at 1:1 for other brands' marks before it was used. The
bowl in the top left of the same photograph carries embossed lettering and is
not used anywhere.

Everything else on this screen is drawn: the chevron, the heart, the stepper,
the dropdown caret and the table rules.
