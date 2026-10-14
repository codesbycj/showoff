/**
 * The bars across the stub, and the thing they turn into.
 *
 * Drawn rather than an image, so it stays crisp when the stage is scaled — and
 * so it can close. On hover every bar slides and widens into a gapless slot,
 * which collapses the barcode into one solid block for the call-to-action to
 * sit on. The reference does the same with a 72-layer Lottie; this is the same
 * interpolation without the player.
 *
 * The morph is driven by `--morph`, which the stub transitions from 0 to 1 and
 * which every bar reads through `calc`. Two things make that work:
 *
 *  - `--morph` is registered with `@property` in index.css. An unregistered
 *    custom property is a string as far as the engine is concerned, so it would
 *    jump rather than animate. Where `@property` is unsupported it still jumps,
 *    and the button simply appears — which is the right thing to degrade to.
 *  - the bars move by `transform`, not by animating `x` and `width`. Those are
 *    SVG geometry properties, and whether they are animatable as CSS varies by
 *    engine in a way a transform does not.
 */
import { useMemo } from 'react';

import { rng, seedFrom } from '@/lib/hash';

type Props = { seed: string; className?: string };

const WIDTH = 286;
const HEIGHT = 48;

type Bar = {
  /** Resting geometry. */
  x: number;
  w: number;
  /** How far left to slide, and how much to widen, to close the gaps. */
  dx: number;
  sx: number;
};

export function Barcode({ seed, className }: Props) {
  const bars = useMemo<Bar[]>(() => {
    const next = rng(seedFrom(seed));
    const rest: { x: number; w: number }[] = [];
    let x = 0;
    while (x < WIDTH - 2) {
      const w = 1 + Math.floor(next() * 4);
      const gap = 1 + Math.floor(next() * 3);
      if (x + w > WIDTH) break;
      rest.push({ x, w });
      x += w + gap;
    }

    // Closed, each bar keeps its share of the width, so no bar has to scale by
    // an absurd factor to get there.
    //
    // Each one is then widened by OVERLAP past its slot while its left edge
    // stays exact. Butted edge to edge the block is not solid: the viewBox is
    // stretched to whatever width the stage scale leaves, so the joins land on
    // fractional pixels and the "solid" bar comes out ruled with hairlines.
    // Overlapping hides every join and costs nothing — the last bar's overhang
    // is clipped by the wrapper.
    const OVERLAP = 1.5;
    const total = rest.reduce((sum, b) => sum + b.w, 0);
    let at = 0;
    return rest.map((b) => {
      const share = (b.w / total) * WIDTH;
      const closedX = at;
      at += share;
      return { x: b.x, w: b.w, dx: closedX - b.x, sx: (share + OVERLAP) / b.w };
    });
  }, [seed]);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      {bars.map((b) => (
        <rect
          key={b.x}
          className="barcode-bar"
          x={b.x}
          y="0"
          width={b.w}
          height={HEIGHT}
          fill="currentColor"
          style={
            {
              '--bar-dx': b.dx,
              '--bar-sx': b.sx,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}
