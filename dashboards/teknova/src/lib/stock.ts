import type { Product } from '@/data/deck';

export type StockId = 'all' | 'in' | 'low' | 'out';

/**
 * Which band a product's stock falls in.
 *
 * It lives here rather than beside the table because two components need it,
 * and exporting a plain function from a file that also exports a component
 * breaks Fast Refresh for that file — the one lint warning this episode had.
 */
export const stockState = (p: Product): Exclude<StockId, 'all'> =>
  p.stock === 0 ? 'out' : p.stock < 100 ? 'low' : 'in';
