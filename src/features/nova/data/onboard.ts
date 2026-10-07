/** Everything the welcome screen says. */
export const ONBOARD = {
  /**
   * The headline sets one word-group per line, and the first and last lines
   * are lime. Kept as a list rather than a string with newlines so the accent
   * is data rather than markup.
   */
  headline: [
    // STEP 1.05 one word at a time
    // { key: 'easy', text: 'Easy', accent: true },
    // STEP 1.06 the second line
    // { key: 'wayto', text: 'Way to', accent: false },
    // STEP 1.07 the third
    // { key: 'investin', text: 'Invest in', accent: false },
    // STEP 1.08 and what it is all for
    // { key: 'crypto', text: 'Crypto', accent: true },
  ],

  body: 'A new way to manage and trade all your crypto easily and fastest in the market',
  cta: 'Start',
} as const;
