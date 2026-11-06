/**
 * Everything the second onboarding screen says.
 *
 * **The assistant's reply is trimmed.** The reference's runs 136 characters
 * in one bubble; R5 caps a run at 110 and the reason shows here — the long
 * version pushes the headline down into the dots.
 */
export const copy = {
  headline: 'Ask anything about\nyour data',
  body: 'Your AI assistant answers questions about your readings in plain language.',
  next: 'Next',
  assistant: 'GLU ASSISTANT',
  reply: 'Your oats had less protein than yesterday, so the curve rose faster. Try adding almonds.',
  prompt: 'Want to see the carb breakdown?',
} as const;

export const pages = 3;
export const page = 1;
