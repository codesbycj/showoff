/** Number formatting, in one place so a figure reads the same everywhere. */
const money0 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const money2 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const plain = new Intl.NumberFormat('en-US');

export const usd = (n: number, cents = false) => (cents ? money2 : money0).format(n);
export const num = (n: number) => plain.format(n);
export const short = (n: number) => compact.format(n);
export const pct = (n: number, digits = 0) => (n > 0 ? '+' : '') + n.toFixed(digits) + '%';

export const dateLong = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
