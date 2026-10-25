/**
 * Orbit — onboarding, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — black with a
 * holographic sweep of mint, lilac and peach — and the order of the blocks
 * are taken from it; every size is chosen for a real 393dp screen.
 *
 * The holographic fill is a real gradient rather than a photograph of one,
 * and its id comes from `useId` wherever it is used: react-native-svg's
 * `Defs` ids are document-global on web, so two gradients sharing a name
 * both render the first one's colours.
 */

export const ob = {
  canvas: '#0A0A0B',
  card: '#141416',
  cardEdge: '#1F1F22',

  ink: '#FFFFFF',
  body: '#9A9CA0',
  muted: '#64666A',

  /** The three stops of the holographic sweep. */
  holo1: '#B9F5CF',
  holo2: '#C9BBF7',
  holo3: '#F7C9A8',

  onHolo: '#0A0A0B',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Keep your money / moving with you". */
  display: { size: 27, line: 35, tracking: -0.7, family: 'PlusJakartaSans_600SemiBold' },

  /** The digits on the card. */
  pan: { size: 12.5, line: 18, tracking: 0.9, family: 'PlusJakartaSans_600SemiBold' },
  /** "VALID THRU". */
  cardLabel: { size: 8, line: 11, tracking: 0.6, family: 'PlusJakartaSans_500Medium' },
  cardValue: { size: 11, line: 15, tracking: 0.3, family: 'PlusJakartaSans_600SemiBold' },

  /** "Get started". */
  action: { size: 14.5, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "You have account?" */
  foot: { size: 11.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  footLink: { size: 11.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },
} as const;

export const radius = {
  card: 18,
  pill: 999,
  control: 999,
} as const;
