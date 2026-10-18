/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * Each customer carries a free-licensed portrait, bundled and credited in
 * `assets/images/crmnet/CREDITS.md`. `face` is an index into `FACES`, so the
 * data says which photograph without importing one.
 *
 * The indices are chosen so the portrait matches the name. That is not
 * fussiness: a man's photograph over "Maria Green" is the first thing anyone
 * looks at on this screen, and it reads as a bug in the app rather than as a
 * stand-in.
 */

export const header = { one: 'Your Customer', two: 'Network' } as const;

export const filters = ['All', 'Permanent', 'Hot', 'New', 'Cold'] as const;

export const customers = [
  {
    key: 'maria',
    name: 'Maria Green',
    company: 'Chemical Machinery & Orbi',
    amount: '$120,100',
    face: 1,
    accent: false,
    dim: false,
  },
  {
    key: 'john',
    name: 'John Smith',
    company: 'Tech Solutions, Inc.',
    amount: '$80,320',
    face: 0,
    accent: false,
    dim: false,
  },
  {
    key: 'eva',
    name: 'Eva Robinson',
    company: 'Alabama Machinery & Supply',
    amount: '$350,500',
    face: 3,
    accent: true,
    dim: false,
  },
  {
    key: 'emily',
    name: 'Emily Davis',
    company: 'Creative Design Studio, LLC.',
    amount: '$1,260',
    face: 5,
    accent: false,
    dim: true,
  },
  {
    key: 'david',
    name: 'David Bright',
    company: 'Cinema Factory Solutions, Inc.',
    amount: '$15,570',
    face: 2,
    accent: false,
    dim: false,
  },
  {
    key: 'sarah',
    name: 'Sarah Johnson',
    company: 'Manufacturing Solutions, Inc.',
    amount: '$42,900',
    face: 7,
    accent: false,
    dim: false,
  },
  {
    key: 'omar',
    name: 'Omar Haddad',
    company: 'Northern Logistics Group',
    amount: '$96,400',
    face: 4,
    accent: false,
    dim: false,
  },
  {
    key: 'lena',
    name: 'Lena Fischer',
    company: 'Fischer Industrial Supply',
    amount: '$64,800',
    face: 10,
    accent: false,
    dim: false,
  },
] as const;

export const labels = { pipeline: 'Total in Pipeline' } as const;

export type BarKey = 'settings' | 'add' | 'edit';

export const bar: BarKey[] = ['settings', 'add', 'edit'];
