import { sg } from '../theme';

/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * The people carry free-licensed portraits, bundled and credited in
 * `assets/images/sugarjourneys/CREDITS.md`. `face` is an index into `FACES`.
 */

export const brand = { name: 'sugarcrm' } as const;

export const header = { one: 'Customer', two: 'Journeys' } as const;

/** The badge on a person is their open task count; "!" is the one overdue. */
export const journeys = [
  {
    key: 'brand',
    title: 'Brand Identity',
    team: [
      { face: 1, badge: '!', color: sg.badges[0] },
      { face: 0, badge: '3', color: sg.badges[1] },
      { face: 2, badge: '8', color: sg.badges[2] },
      { face: 3, badge: '2', color: sg.badges[3] },
      { face: 4, badge: '4', color: sg.badges[4] },
    ],
    allocation: [0.42, 0.2, 0.18, 0.2],
    stats: [
      { key: 'lead', value: '134', unit: 'hrs.', label: 'Lead time' },
      { key: 'budget', value: '12,310', unit: '$', label: 'Development budget' },
    ],
    footer: [
      { key: 'team', value: '5', label: 'Team members', glyph: 'people' as const },
      { key: 'iterations', value: '2', label: 'Iterations', glyph: null },
    ],
  },
  {
    key: 'product',
    title: 'Product Design',
    team: [
      { face: 5, badge: '2', color: sg.badges[1] },
      { face: 3, badge: '3', color: sg.badges[2] },
      { face: 1, badge: '2', color: sg.badges[0] },
      { face: 2, badge: '1', color: sg.badges[3] },
      { face: 4, badge: '1', color: sg.badges[4] },
    ],
    allocation: [0.3, 0.26, 0.22, 0.22],
    stats: [
      { key: 'lead', value: '96', unit: 'hrs.', label: 'Lead time' },
      { key: 'budget', value: '42,110', unit: '$', label: 'Development budget' },
    ],
    footer: [
      { key: 'team', value: '4', label: 'Team members', glyph: 'people' as const },
      { key: 'iterations', value: '3', label: 'Iterations', glyph: null },
    ],
  },
] as const;

export const labels = { allocation: 'Task allocation' } as const;
