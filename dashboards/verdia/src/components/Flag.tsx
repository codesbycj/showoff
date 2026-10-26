import { ref, useDefIds } from '@/charts/ids';
import type { CurrencyId } from '@/data/deck';

/**
 * The currency disc beside USD.
 *
 * It is drawn, because a flag emoji is simply absent on Windows and renders as
 * two letters in a box — the exact failure rule 8 names. It is also *not* a
 * traced flag: at 18px a national flag is two or three bands of colour and a
 * disc, and reproducing the arrangement of fifty stars would be tracing rather
 * than drawing an idea.
 */
const DISCS: Record<CurrencyId, { label: string; bands: string[]; canton?: string }> = {
  usd: { label: 'United States dollar', bands: ['#b22234', '#ffffff'], canton: '#3c3b6e' },
  idr: { label: 'Indonesian rupiah', bands: ['#ce1126', '#ffffff'] },
  myr: { label: 'Malaysian ringgit', bands: ['#cc0001', '#ffffff'], canton: '#010066' },
};

export function Flag({ id, size = 18 }: { id: CurrencyId; size?: number }) {
  const d = DISCS[id];
  const stripes = id === 'idr' ? 2 : 6;
  const band = 24 / stripes;
  /* A clipPath id is document-global: two discs sharing one would collapse
     into a single clip and the second would paint uncropped. */
  const ids = useDefIds('clip');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={d.label}
      className="shrink-0"
    >
      <defs>
        <clipPath id={ids.clip}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={ref(ids.clip)}>
        <rect width="24" height="24" fill={d.bands[1]} />
        {Array.from({ length: Math.ceil(stripes / 2) }, (_, i) => (
          <rect key={i} y={i * band * 2} width="24" height={band} fill={d.bands[0]} />
        ))}
        {d.canton ? <rect width="11" height={band * 3} fill={d.canton} /> : null}
      </g>
      <circle
        cx="12"
        cy="12"
        r="11.4"
        fill="none"
        stroke="rgb(17 33 15 / 0.12)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
