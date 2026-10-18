/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * One correction to the reference, deliberately: its title reads "New Case
 * Managment". A design shot is not an authority on its own spelling
 * (AGENTS.md, "Three kinds of reference").
 *
 * The people carry free-licensed portraits, bundled and credited in
 * `assets/images/sugarcase/CREDITS.md`.
 */

export const header = { one: 'New Case', two: 'Management' } as const;

export type NodeKind = 'step' | 'active';

export const flow = [
  {
    key: 'allocate',
    text: 'Allocate Case to User!',
    face: 0,
    kind: 'step' as NodeKind,
    done: true,
  },
  {
    key: 'acknowledge',
    text: 'Acknowledge Case receipt to customer!',
    face: 2,
    kind: 'step' as NodeKind,
    done: true,
  },
  {
    key: 'identify',
    text: 'Identify Issue Impact',
    face: 1,
    kind: 'step' as NodeKind,
    done: true,
  },
  {
    key: 'resolution',
    text: 'Allocate to Resolution Team',
    face: 3,
    kind: 'active' as NodeKind,
    done: false,
  },
  {
    key: 'resolve',
    text: 'Agree resolution and close the case',
    face: 4,
    kind: 'step' as NodeKind,
    done: false,
  },
] as const;

export type RailKey = 'search' | 'share' | 'star' | 'phone' | 'data' | 'send';

export const rail: RailKey[] = ['search', 'share', 'star', 'phone', 'data', 'send'];

export type FootKey = 'plus' | 'share' | 'calendar';

export const foot: { key: FootKey; dark: boolean }[] = [
  { key: 'plus', dark: false },
  { key: 'share', dark: false },
  { key: 'calendar', dark: true },
];
