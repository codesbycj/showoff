/**
 * The screen's words, kept out of the components so they stay presentational.
 *
 * The em dash is a real character in the string. A JSX attribute does not
 * process escapes, and `—` written as one has shipped as literal backslash-u
 * before now.
 */
export const onboarding = {
  step: 1,
  total: 3,
  headline: { top: 'Your Money', bottom: 'Better Days' },
  lede: 'Save, spend, and grow your wealth — all in one simple place.',
  cta: 'Get Started',
} as const;
