/** The bars across the stub. Drawn, not an image, so it stays crisp when scaled. */
import { useMemo } from 'react';

import { rng, seedFrom } from '@/lib/hash';

type Props = { seed: string; className?: string };

const WIDTH = 286;
const HEIGHT = 48;

export function Barcode({ seed, className }: Props) {
  const bars = useMemo(() => {
    const next = rng(seedFrom(seed));
    const out: { x: number; w: number }[] = [];
    let x = 0;
    while (x < WIDTH - 2) {
      const w = 1 + Math.floor(next() * 4);
      const gap = 1 + Math.floor(next() * 3);
      if (x + w > WIDTH) break;
      out.push({ x, w });
      x += w + gap;
    }
    return out;
  }, [seed]);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y="0" width={b.w} height={HEIGHT} fill="currentColor" />
      ))}
    </svg>
  );
}
