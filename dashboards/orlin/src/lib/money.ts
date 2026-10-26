/**
 * The reference writes its figures the continental way — 12.135,00 — and that
 * is part of what the design looks like, so the formatter is here rather than
 * reaching for `usd` and getting 12,135.00.
 */
const dotted = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dottedWhole = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });

export const euro = (n: number, cents = true) => (cents ? dotted : dottedWhole).format(Math.abs(n));

/** Signed, for a ledger row: -15,30 / +1.840,00. */
export const signedEuro = (n: number) => (n < 0 ? '-' : '+') + euro(n);

/** Compact, for an axis label. */
export function shortEuro(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return dottedWhole.format(n / 1_000_000) + 'M';
  if (abs >= 1_000) return dottedWhole.format(n / 1_000) + 'K';
  return dottedWhole.format(n);
}

/**
 * A figure, or a mask when the shield in the toolbar is on.
 *
 * It lives here rather than beside the cards because a component file that
 * also exports a helper breaks Fast Refresh for the whole file.
 */
export const fig = (text: string, masked: boolean) => (masked ? '••••••' : text);
