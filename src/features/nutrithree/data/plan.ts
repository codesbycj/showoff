/** The screen's words, kept out of the components so they stay presentational. */

export const header = {
  wordmark: 'Nutrilens',
  sup: 'AI',
  skip: 'Skip',
} as const;

export const intro = {
  display: 'Personalized\nCustom Plan',
  cta: 'Get Started',
} as const;

export const macros = [
  { key: 'proteins', value: '105g', label: 'Proteins' },
  { key: 'carbs', value: '130g', label: 'Carbs' },
  { key: 'fat', value: '12g', label: 'Fat' },
] as const;

export const steppers = [
  { key: 'target', label: 'Daily\nTarget', value: '2000', mark: 'target' },
  { key: 'meals', label: 'Daily\nMeals', value: '3', mark: 'bowl' },
] as const;

export const closing = {
  line: 'Personal Meals, Your\nWay, Anytime.',
  footLead: 'Already Have An Account?',
  footLink: 'Log In',
} as const;
