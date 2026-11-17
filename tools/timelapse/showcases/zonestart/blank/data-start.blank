/**
 * Everything zonestart says.
 *
 * **The brand is fictional and so is the legal line.** The board's small print
 * names Google, Facebook, Apple and DoorDash; a rebuild that ships a real
 * company's terms is impersonation. Named in the handover.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const brand = { name: 'Food Zone' };

export const banner = { label: 'Earn Crowns — Join Now' };

/** Two lines, as the board sets them. */
export type Line = { key: string; text: string };

/** Two lines, as the board sets them - and one row each, so the headline
 *  lands line by line rather than all at once (I5's third level). */
export const headline: Line[] = [
  { key: 'h1', text: 'Welcome to' },
  // STEP 1.06 h2
  // { key: 'h2', text: 'Food Zone' },
];

export const burger = require('../../../../assets/images/zonestart/burger.jpg');

export type Action = {
  id: string;
  label: string;
  glyph: 'mail' | 'moped';
  tone: 'solid' | 'outline';
};

export const actions: Action[] = [
  { id: 'email', label: 'Continue with Email', glyph: 'mail', tone: 'solid' },
  // STEP 1.15 "Order Delivery"
  // { id: 'delivery', label: 'Order Delivery', glyph: 'moped', tone: 'outline' },
];

/**
 * The small print.
 *
 * **R5: one run, 96 characters.** The board's own line runs to 164 and names
 * four real companies.
 */
export const legal = {
  text: 'By continuing you agree to the Food Zone Terms and Privacy Policy.',
  links: ['Terms', 'Privacy Policy'],
};
