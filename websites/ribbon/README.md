# Ribbon — a motion study

Two deformations, rebuilt: a strip of cards bent into one continuous ribbon by
how fast you throw it, and a hover that dents a card's middle without moving its
outline by a pixel.

```bash
cd websites/ribbon && npm install   # from inside the folder, see ../README.md
npm run dev:ribbon                  # http://localhost:5196
npm run build:ribbon
```

Scroll or drag sideways. Hover a card.

## What it is made of

| File | What lives there |
|---|---|
| `src/motion/motion.ts` | Every constant, with where it came from |
| `src/gl/surface.glsl.ts` | The surface: the sweep, the wind, the hinge, the dome, the normal, the light |
| `src/gl/card.ts` | The card material — the two stages that use the surface |
| `src/gl/strip.ts` | Layout, wrapping, the velocity model, the hover hit test |
| `src/gl/floor.ts` | The grid, so the deformation has something to bend against |
| `src/textures/cover.ts` | The covers: the photograph, the tone lift, the overlay type |
| `src/assets/images/` | Eight public-domain FSA/OWI Kodachromes, and their credits |
| `tools/dent.js` | The silhouette check below — run it against a live dev server |

## The two effects

### The ribbon

The strip is **not** a row of planes each leaning on its own. Every card is
pushed through one shared world-space function, so they lie on a single surface
— which is why the order inside it matters and why the cards' own transforms
never touch it.

The shape is one S in **depth**, not in screen y: near through the left half, far
through the right, faded to flat at both ends by a gaussian tail. That
distinction is the whole thing. Run as a vertical wave it bends each card's
silhouette directly and you get wavy top edges and a pinched middle. Run through
z, the silhouette bends because *perspective* bends it — the near half stands
large, the far half shrinks, and the undulating outline is the camera's work
rather than the geometry's.

On top of that, three things speed does: the sweep digs deeper, the left of the
ribbon lifts and comes nearer with the right half seated as a fulcrum, and the
two ends wring against each other.

### The dent

The middle of the card bows away and the rim does not move at all. The dome is a
product of two parabolas — `(1-qx²)(1-qy²)` — which is 1 at the centre and
**exactly 0 along every edge**, so the silhouette is untouched however deep it
goes.

That zero on the boundary is not an aesthetic choice, it is what makes the effect
possible at all: every material on the strip runs `depthTest: false` and is drawn
in a fixed order, so a card that grew on hover would simply draw on top of its
neighbour. Nothing about the card's box changes — its rect, its corners, what it
overlaps. It is a surface answering rather than a colour.

## Why everything is computed twice

The vertex stage moves 25×25 points and the GPU draws straight lines between
them, so anything handed down as a varying arrives as the **chords** across the
curve rather than the curve. Under a specular exponent of 48 that is a ripple
that crawls as the strip moves.

So the only thing passed down is the plane's world position *before* any of this
touched it — which is affine in the plane's own coordinates, the one case the
interpolator reproduces exactly. The fragment stage then re-evaluates the
displacement and the normal from the same closed form, per pixel.

Which is possible because the surface is a height field with a closed form: if
you can write z as a function of x, you can write dz/dx too, and the normal is
exact for free. Taking it from the geometry instead — vertex normals, or `dFdx`
of a world position — hands back the 24 flat facets the mesh is actually made of,
and a gloss exponent turns a facet edge into a visible seam.

## Where the numbers came from

Not from a stopwatch. The reference is a Nuxt app, and its GLSL lives in template
literals — which a minifier cannot touch, so the whole shader ships with its
comments intact, every constant a named float with a paragraph beside it.

```bash
curl -sL https://jesperlandberg.com -o index.html
grep -oE '/_nuxt/[A-Za-z0-9._-]+\.js' index.html | sort -u
```

Fetch those, find the one with the GLSL in it, and pull every backtick string
containing `gl_Position` or `uniform `. That was 258KB of commented shader. The
JS-side values — camera, uniform feeds, the hover's tween — came out of the same
bundle.

What that yielded, and what each does:

- **Camera `fov 53.4` at `z 41.18`.** Not decoration: this is what gives `z`
  enough to say for a depth sweep to read as one at all.
- **The sweep is `mix(1-q², sin(πq), C) · exp(-q²)`** over
  `q = x/W · 1.15 - 0.2`, scaled by a depth of `0.2 · W`. The shift puts the near
  peak left of centre, so the frame reads as the ribbon swelling on its way in
  rather than peaking dead ahead.
- **The bank is that curve's own exact derivative**, scaled to -0.16 radians at
  the steepest point — so where the ribbon dives hardest it leans hardest, and
  the two cannot disagree because one is read off the other.
- **The hinge is `s(1.5 - 0.5s³)`**, not a clamp. A clamp has a corner at ±1,
  which is a step in dz/dx, and under this gloss a step in the normal is a sharp
  vertical seam landing mid-card.
- **Speed terms:** depth ×(1 + 1.1·v), rear-up 0.1/0.2 of the half-width in y and
  z, edge twist 1.8 radians.
- **The dent is 0.1 of the card's height**, tweened 0→1 over 0.5s on `expo` and
  back out over 0.5s on `expo` — the reference's `cards.hover`, verbatim.
- **The light is `dir(-0.4, 0.5, 1)`, gloss 48, spec 0.35, diffuse 0.12**, with a
  wrapped rather than clamped diffuse term, because a hard terminator on a
  surface this shallow puts a visible line across the card.
- **The depth haze is 0.8 toward `#0f0f0f`** — and this is the one shader
  constant here that departs from it, at 0.55. The reference's covers are
  screenshots of bright websites, which still read at a fifth of their own
  luminance; photographs have far less headroom, and 0.8 crushed the right-hand
  third of every card to black rather than to distance.

Only then was it recorded playing, to confirm that what the source said is what
it does. It was — the rest state shows the S's undulating silhouette and the
hover shows the middle receding with the outline unchanged.

### The one number that was not read

**The unit of the velocity.** The reference normalises it as `tanh(v / 550)` and
the bundle does not say what `v` is measured in. Read as pixels per *second*, 550
is a slow drag: every ordinary scroll pins `tanh` at 1, and at full velocity the
1.8-radian edge twist folds a card into a cone. Read as pixels per *frame* it is
an enormous throw, which is what a saturation ceiling is supposed to be, and a
firm flick lands around 0.1–0.2 where the deformation is strong and coherent.
Per frame it is.

## Verifying it

The claim worth testing is the dent's: that the middle moves and the rim does
not. `tools/dent.js` shoots the strip at rest and hovered and diffs — in two
passes, because one cannot answer both halves.

```bash
npm run dev:ribbon                                   # in one terminal
node websites/ribbon/tools/dent.js --silhouette      # does the outline move?
node websites/ribbon/tools/dent.js                   # does the surface answer?
```

**Pass 1, geometry.** `?silhouette` renders flat white cards with shading off,
so the only thing that can change a pixel is the card moving:

```
card pixels in both shots: 684094
pixels that changed at all: 24  0.00%
  -> OK - the outline is pinned; nothing but shading can move on hover
```

**Pass 2, shading.** The real cards, where the interior must change a lot — and
only on the hovered one. The change is confined to the middle bands of the frame
with its neighbours untouched, which is the other half of the claim.

### The false positive this used to produce

The first version of this test had one pass and called a pixel "card" if it was
brighter than a threshold. That worked while the covers were flat gradients and
broke the moment they became photographs: the dent changes the *shading*, so dark
pixels near a card's edge cross any threshold you pick, and the script duly
reported a 4% silhouette drift on an effect that cannot move a silhouette at all.

The dome is `(1-qx²)(1-qy²)` — identically zero on the boundary — so the rim is
pinned by construction and the only honest reading was that the measurement was
wrong. Hence the flat pass: strip the texture and the shading, and the question
becomes exact rather than a matter of where you put the threshold.

## Deviations, and why

**The designer and the projects are invented; the covers are real photographs.**
The reference's cards are screenshots of real client work, and none of that is
ours to redistribute. These are public-domain FSA/OWI Kodachromes from 1940–43 —
the Library of Congress colour transparencies, by Jack Delano, John Vachon,
Marion Post Wolcott and Russell Lee. Every licence was read off the source rather
than assumed, and every file is credited in `src/assets/images/CREDITS.md`.

They are cropped to the card's ratio at bake time and tone-lifted at load, which
is not vanity: the sheen is an additive 0.35 at a gloss of 48, so it is legible
on a mid-tone and lost on anything dark, and the depth haze then takes the far
half of every card down on top of that. The frames ship at a mean luminance of
59 to 144; each one's `lift` aims at about 150. The cap of ~1.4 is there because
`brightness` is a linear multiply and the two darkest frames posterised into flat
bands of yellow and red long before they got near it — so they stay moodier than
the rest, and a contrast cut rides along with the lift to make room at the top.

**The hover hit test is not a raycast.** Every vertex is moved by the shader, so
the CPU-side geometry a raycaster tests is nowhere near where the card is drawn.
The planes are axis-aligned rectangles on z = 0 before the surface touches them,
so the honest test is to put the pointer through that plane and ask which
rectangle it lands in. It loses accuracy where the sweep has pushed a card far
from its flat position, but it is wrong in a way that is stable and symmetric,
where a stale raycast is wrong in a way that jitters as the strip moves.

**The titles are DOM, not GL.** Real text in the real font, selectable and
readable, projected through the same camera every frame so they stay pinned to a
card that is bending. Glyphs baked into a texture would be none of those.

**The grid is drawn analytically.** A line mesh gives aliased, flickering
one-pixel strands as the camera moves; measuring how many pixels a cell covers
and fading the line to match does not.

## Things that bit

- **An impulse-and-friction scroll model has a hidden gain.** Accumulating input
  into a velocity, adding it to the target every frame and damping it with
  `v *= 0.92` does not move the strip by the input — it moves it by the sum of a
  geometric series, **12.5×** as far. The strip felt fine and the ribbon tore
  itself into cones, because the velocity the surface was being handed was an
  order of magnitude past anything a hand can produce. Target plus an eased
  follow has no such gain.
- **A symmetric profile inverts the shading.** The depth haze is normalised by
  the sweep's own range, so with a bowl the deepest point sits in the middle of
  the frame and the card you are looking at is the one shaded hardest. The
  reference does not solve this; it switches the ribbon off below its breakpoint,
  which is what this does too.
- **A long-lived Vite dev server will serve a stale transform.** After a batch of
  edits the page failed with `does not provide an export named 'drawCover'` on a
  file that exported it and that `tsc` and `vite build` were both happy with.
  `rm -rf node_modules/.vite` and restart; do not go looking for the bug.

## Reduced motion

`prefers-reduced-motion: reduce` switches the ribbon off and the dent to zero:
the strip lies flat, the hover does nothing, and the cards still scroll. Verified
under `--force-prefers-reduced-motion`.

## Checked at

1600×900, 1280×800 and 390×844, at rest, hovered, mid-throw and settled, plus
reduced motion — and `tsc`, `eslint` and `vite build` clean.
