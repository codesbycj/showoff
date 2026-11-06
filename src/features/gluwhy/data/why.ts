/**
 * Everything the "why" screen says.
 *
 * Each feature is a title and one sentence. The reference's sentences run to
 * two lines at this width and stay under the copy ceiling; none of them
 * needed cutting, which is worth saying — R5 is a ceiling, not a target.
 */
export const copy = {
  eyebrow: 'WHY GLU?',
  headline: 'Designed for your\npeace of mind',
  cta: 'Continue',
} as const;

export const features = [
  {
    id: 'track',
    title: 'Track readings effortlessly',
    body: 'Automate sync with your CGM, or log manually in seconds.',
    icon: 'pulse' as const,
  },
  {
    id: 'ai',
    title: 'Understand patterns with AI',
    body: 'Get real-time analysis of how meals affect your energy and glucose.',
    icon: 'brain' as const,
  },
  {
    id: 'insight',
    title: 'Personalized insights',
    body: 'Daily highlights built for your body, habits and target ranges.',
    icon: 'person' as const,
  },
  {
    id: 'calm',
    title: 'Stay beautifully informed',
    body: 'Clear, non-clinical graphs designed for peace of mind, not stress.',
    icon: 'bars' as const,
  },
];
