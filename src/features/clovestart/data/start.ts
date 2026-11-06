/**
 * Everything the opening screen says.
 *
 * **The reference's body copy is cut down.** It reads "Manage your finances
 * easily using our intuitive and user-friendly interface and set financial
 * goals and monitor your progress" — 124 characters that say "manage your
 * money" three times. The design bar puts the ceiling on one run of body copy
 * at 110, and the real reason is that the long version pushes the headline up
 * and the button down for no information at all.
 */
export const copy = {
  headline: 'Track Your\nSpending\nEffortlessly',
  body: 'Set a goal, watch where the money actually goes, and keep the month on plan.',
  cta: 'Get Started',
  haveAccount: 'Already have an account? ',
  login: 'Login',
} as const;

/** What the hero card shows. It is the app's own product, posed. */
export const card = {
  label: 'Wallet balance',
  balance: '$17,298.92',
  digits: '•••• 7391',
  holder: 'Jonathan Reyes',
} as const;
