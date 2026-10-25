/**
 * Everything the onboarding screen says, so the components stay
 * presentational.
 *
 * The brand and the copy are invented.
 */

export const copy = {
  brand: 'stash',
  display: [
    { text: 'New level in', mark: false },
    { text: 'managing', mark: true },
    { text: 'your storage', mark: false },
  ],
  action: 'Next',
} as const;

export const pages = { total: 3, at: 0 } as const;
