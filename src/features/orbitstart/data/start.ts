/**
 * Everything the onboarding screen says, so the components stay
 * presentational.
 *
 * **The card number shows its last four, not its first.** The reference masks
 * the wrong end — "7812 2139 0823 XXXX" — which is the group a card is
 * actually identified by. Masked the right way round here.
 */

export const copy = {
  display: ['Keep your money', 'moving with you'],
  action: 'Get started',
  foot: 'Have an account?',
  footLink: 'Sign in',
} as const;

export const card = {
  pan: '•••• •••• •••• 0823',
  validLabel: 'Valid thru',
  valid: '05/24',
  cvvLabel: 'CVV',
  cvv: '•••',
} as const;
