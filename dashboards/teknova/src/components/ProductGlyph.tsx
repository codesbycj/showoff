import type { Glyph } from '@/data/deck';
import { cx } from '@/lib/cx';

/*
 * Drawn, not photographed. A pair of earbuds, a watch, a charger, a tablet, a
 * camera, an SSD, a speaker and a keyboard are all small objects, which is
 * exactly what is in drawing range — a vectored *person* or *car* would read as
 * a cartoon, but a product silhouette at 24px reads as a product.
 */
const GLYPHS: Record<Glyph, string> = {
  buds: 'M8.5 5.5c-1.9 0-3 1.6-3 3.6v4.4c0 1.7 1.1 2.9 2.6 2.9s2.4-1.1 2.4-2.6V9.1c0-2-1-3.6-2-3.6M8.2 18.5a1.6 1.6 0 1 0 0 .01M15.5 5.5c1.9 0 3 1.6 3 3.6v4.4c0 1.7-1.1 2.9-2.6 2.9s-2.4-1.1-2.4-2.6V9.1c0-2 1-3.6 2-3.6M15.8 18.5a1.6 1.6 0 1 0 0 .01',
  watch:
    'M8 8.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zM9.5 6.5l.4-2.6h4.2l.4 2.6M9.5 17.5l.4 2.6h4.2l.4-2.6M17.5 10.5v3',
  charger: 'M6.5 4.5h11v8.5a5.5 5.5 0 0 1-11 0zM10 4.5V2M14 4.5V2M12 18.5V22',
  tablet: 'M5.5 4.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2zM10.5 18.5h3',
  camera:
    'M3.5 8.5a2 2 0 0 1 2-2h2.2l1.4-2h5.8l1.4 2h2.2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM12 9.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4',
  ssd: 'M3.5 7.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM7 10.5h6M7 13.5h3M17 10.5h.01M17 13.5h.01',
  speaker:
    'M6.5 4.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2zM12 12.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6M12 6.2h.01',
  keys: 'M2.5 8.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2zM6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M8 13.5h8',
};

export function ProductGlyph({
  glyph,
  size = 38,
  tone = 'sunken',
  className,
}: {
  glyph: Glyph;
  size?: number;
  tone?: 'sunken' | 'ink' | 'plain';
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, borderRadius: size * 0.3 }}
      className={cx(
        'grid shrink-0 place-items-center',
        tone === 'sunken' && 'bg-sunken text-body',
        tone === 'ink' && 'bg-fill text-fill-fg',
        tone === 'plain' && 'text-body',
        className,
      )}
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={GLYPHS[glyph]} />
      </svg>
    </span>
  );
}
