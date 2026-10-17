# pennant

One screen of a reference site, rebuilt: a looping render of printed ribbons,
drawn into a WebGL canvas and pushed around by the pointer — ambient drift
always, drag and pressure under the cursor, and a ring that spreads from a
click — under a line of copy that resolves out of blur.

```bash
cd websites/pennant && npm install
npm run dev          # http://localhost:5212
```

Install from inside this folder. `npm --prefix websites/pennant install` from
the repository root writes a dependency on the Expo project above into this
`package.json` — see the note in [`../README.md`](../README.md).

**This one is a declared exception, like `switchblade/` and `bulwark/`.** The
render and its poster are the reference's own files; everything else — the
studio, the mark, the copy, the page furniture — is invented. The reasoning and
the consequence are in
[`src/assets/video/CREDITS.md`](./src/assets/video/CREDITS.md): it is a private
study and it is not to be deployed.

## It looks like a video and it is not

That is the whole reason this was worth building. The first screen appears to
be an autoplaying `<video>` with `mix-blend-multiply` over a flat grey page —
and that markup is really there, because it is the server-rendered fallback.
What ends up on screen on a desktop is a `<canvas>` that samples that video as
a texture through a displacement shader, with the `<video>` faded to zero
underneath it.

Nothing about watching the page would have told you that, and nothing about
watching it would have given up a single number. The site is Next.js, so its
behaviour ships as chunks:

```bash
curl -sL https://<reference> -o home.html
grep -o 'src="/_next/static/immutable/chunks/[^"]*"' home.html   # 18 of them
# download, then find the one that mentions a class you can see in the DOM
grep -l 'title-and-desc-title' chunks/*     # the copy's entrance
grep -l 'flagsOptimized' chunks/*           # the hero's asset registry
grep -l 'gl_FragColor' chunks/*             # and the field itself
```

The third one is the prize: the fragment shader is sitting in the bundle as a
template literal, unminified, because a shader is a string. Every uniform it
reads is set a few hundred characters later.

## The numbers

All of them are in [`src/motion/motion.ts`](./src/motion/motion.ts), with the
derivation beside each one. The component takes props and the hero uses its
defaults, so the authored values and the computed uniforms are kept apart:

| authored | value | | uniform | value |
|---|---|---|---|---|
| `strength` | 0.8 | | `u_ambientStrength` | 0.004 x s x idle = **0.00128** |
| `effectRadius` | 0.5 | | `u_idleRadius` | 0.42 x r = **0.21** |
| `mouseForce` | 2.5 (clamped from 3) | | `u_dragStrength` | 0.09 x s x f = **0.18** |
| `smoothness` | 1 | | `u_dragVelocityStrength` | 0.28 x s x f = **0.56** |
| `idleMotion` | 0.4 | | `u_pressureStrength` | 0.12 x s x f = **0.24** |
| `liquidness` | 0.01 | | `u_swirlStrength` | 0.025 x s x l = **0.0002** |
| `edgeProtection` | 0.1 | | `u_rippleStrength` | 0.03 x s = **0.024** |

The two that explain the look: `ambientStrength` is 0.00128 of the frame, which
is about two pixels — the drift that stops a looping render from reading as a
loop — and `liquidness` is 0.01, so the swirl and the radial wave are present in
the shader and almost absent on screen. Someone turned them down rather than
out, and copying the shader without the values would have given a soup.

Smoothing is frame-rate independent: `1 - (1 - rate) ^ (dt / 16.67)`, with the
frame delta clamped to 8..50ms so a backgrounded tab cannot teleport the field.
The pointer chases at 0.04 per frame, velocity at 0.12, and hover takes hold
nearly three times faster than it lets go (0.06 in, 0.021 out).

## What was checked against the reference

Headless Chrome at two sizes, reading the live DOM on both sides:

| | reference | this build |
|---|---|---|
| canvas CSS box at 1440x900 | `[-160, -90, 1600, 900]` | `[-160, -90, 1600, 900]` |
| canvas backing store | 1600 x 900 | 1600 x 900 |
| wrapper at 1920x1080 | `[0, -108, 1920, 1080]` | `[0, -108, 1920, 1080]` |
| copy block origin | `[48, 924]` | `[48, 924]` |
| copy | 36px / 36px, #434343 | 36px / 36px, #434343 |
| page | flat `#f5f5f5` at every corner | `#f5f5f5` |

The render's box is `h-full aspect-video` pinned right and lifted 10% — so on a
1440 viewport it is 1600 wide and hangs 160px off the left and 90px off the top.
Below `xl` it is pushed 75% of its own width off the *right* edge instead, which
keeps the same part of the render in frame on a narrow screen rather than
shrinking all of it into a corner. Both are the reference's own classes.

## Reading the loop before copying it

Three things in `flagsField.ts` are the reference's and are worth keeping:

* **the loop stops.** `requestAnimationFrame` is only re-armed while something
  is still moving — pointer, hover, velocity or a live ripple. When all of that
  settles, the canvas redraws only when the *video* presents a new frame, via
  `requestVideoFrameCallback`. An idle hero costs one draw per video frame.
* **`texSubImage2D` after the first upload.** Re-allocating a 2560x1440 texture
  every frame is the most expensive thing a video-to-GL loop can do.
* **an early-out in the shader.** With the pointer away and no ripple alive, the
  whole interactive half is skipped and the fragment is one texture read.

## Reduced motion

No video, no loop, no WebGL: the poster alone, with the copy already resolved.
The reference does the same. A five-second loop of fabric is exactly what that
setting is asking to be spared.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
