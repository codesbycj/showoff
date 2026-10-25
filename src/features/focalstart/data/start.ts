/**
 * Everything the onboarding screen says, so the components stay
 * presentational.
 *
 * **"You're productive than 53% team" is a sentence here.** The reference's
 * chip is missing two words and a preposition; a design shot is not an
 * authority on grammar (AGENTS.md, "Fix the reference's mistakes").
 *
 * **The gauge's share is derived from the points.** The reference draws an
 * arc at roughly two thirds beside "576 points" and says nothing about what
 * the arc is of; here `points` is read against `target`, so the sweep and
 * the figure are the same fact.
 */

export const copy = {
  brand: 'FocusFlow',
  skip: 'Skip',
  displayLines: [
    [{ text: 'Take', weight: 'bold' }],
    [{ text: 'Charge Of', weight: 'light' }],
    [{ text: 'This Productivity', weight: 'light' }],
  ],
  blurb: 'Prioritise and set deadlines so you don’t miss anything important.',
  gaugeTitle: 'Your productivity',
  gaugeUnit: 'points',
  action: 'Let’s get started!',
  foot: 'Already have an account?',
  footLink: 'Sign in',
} as const;

export const points = 576;
export const target = 800;

export const beatsTeamPct = 53;

export const uplift = 93;

/** The small chart on the second card: five weeks, climbing. */
export const trend = [0.32, 0.45, 0.4, 0.68, 0.92] as const;

export const share = points / target;

export const note = 'You’re more productive than ' + beatsTeamPct + '% of your team';
