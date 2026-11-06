/** Number formatting, in one place so a figure reads the same everywhere. */
const plain = new Intl.NumberFormat('en-US');

/** Weights, pallets and miles all read in thousands, so this is the only one. */
export const num = (n: number) => plain.format(n);
