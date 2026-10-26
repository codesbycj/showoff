/**
 * The reference writes its figures as "IDR 12.450.000" — dotted thousands and
 * no minor unit, which is how rupiah are written and part of what the design
 * looks like. The formatter is here rather than reaching for `usd`.
 */
const dotted = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });

export const idr = (n: number, prefix = true) =>
  (prefix ? 'IDR ' : '') + (n < 0 ? '-' : '') + dotted.format(Math.abs(Math.round(n)));

/** Compact, for an axis or a legend swatch. */
export function shortIdr(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return dotted.format(Math.round(n / 100_000) / 10) + ' jt';
  if (abs >= 1_000) return dotted.format(Math.round(n / 1_000)) + ' rb';
  return dotted.format(n);
}
