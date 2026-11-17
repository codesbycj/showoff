import { ct } from '../theme';

/**
 * Everything romeospot says, so the components stay presentational.
 *
 * Types are annotated rather than inferred: the reveal stages these arrays one
 * entry at a time, and a type inferred from whichever rows happen to be
 * uncommented loses every field that only appears on a later row (RULES §5.4,
 * INSPO-RULES I7).
 *
 * Copy follows the reference (I1) with its mistakes corrected (also I1). Each
 * fix is marked FIX and repeated in the handover.
 */

export type OrderMode = {
  id: string;
  title: string;
  sub: string;
  tint: readonly [string, string];
  glyph: 'qr' | 'moped' | 'bag';
};

export type Slot = { id: string; label: string; taken?: boolean };

export const spot = {
  /** FIX: reference writes "Get Direction" — singular reads as a typo. */
  name: 'Romeo Lane · Civil Lines',
  area: 'Delhi',
  openLabel: 'Open now',
  rating: '4.1',
  reviews: '1k Reviews',
  pills: ['More info', 'Get Directions'] as const,

  slotsHead: 'Available slots for today',
  cta: { secondary: 'Food Menu', primary: 'Book a Table' },
} as const;

export const modes: OrderMode[] = [
  {
    id: 'table',
    title: 'Order at table',
    // FIX: reference reads "Scan QR order with ease", which is ungrammatical.
    sub: 'Scan the QR to order',
    tint: ct.tileGreen,
    glyph: 'qr',
  },
  {
    id: 'delivery',
    // FIX: reference mixes case across the three rows ("Order for Delivery",
    // "Order for collection"). Settled on sentence case throughout.
    title: 'Order for delivery',
    sub: 'Order to your door',
    tint: ct.tileCoral,
    glyph: 'moped',
  },
  {
    id: 'collect',
    title: 'Order for collection',
    sub: 'Order now & collect',
    tint: ct.tilePink,
    glyph: 'bag',
  },
];

/**
 * FIX: the reference lists "12:30am" and "4:30am" alongside 1:30pm–6:30pm as
 * slots *for today*. A restaurant does not seat at half past four in the
 * morning — both are pm in every reading that makes sense, so both are pm here.
 */
export const slots: Slot[] = [
  { id: 's1', label: '12:30pm' },
  { id: 's2', label: '1:30pm' },
  { id: 's3', label: '2:00pm' },
  { id: 's4', label: '4:00pm' },
  { id: 's5', label: '4:30pm' },
  { id: 's6', label: '6:30pm' },
];

/** The slot the screen opens on, matching the reference's selected chip. */
export const defaultSlot = 's3';
