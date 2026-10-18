/** The screen's content, kept out of the components so they stay presentational. */

export const search = { placeholder: 'Search location...' } as const;

export type ChipName = 'add' | 'grocery' | 'fuel';

export const chips: { key: ChipName; label: string; accent: boolean }[] = [
  { key: 'add', label: 'Add', accent: true },
  { key: 'grocery', label: 'Grocery Store', accent: false },
  { key: 'fuel', label: 'Petrol Pump', accent: false },
];

export const place = {
  name: 'Nila Supermarket',
  address: '58 MD Rd, Ernakulam, Kochi, Kerala 682035',
} as const;

export type ModeKey = 'car' | 'bike';

export const modes: { key: ModeKey; label: string }[] = [
  { key: 'car', label: 'Car' },
  { key: 'bike', label: 'Bike' },
];

export const avoid = [
  { key: 'tolls', label: 'Avoid tolls', on: true },
  { key: 'motorways', label: 'Avoid motor ways', on: false },
] as const;

export const route = {
  duration: '2hr 13min',
  distance: '(65 km)',
  note: 'Best route, despite the casual traffic.',
} as const;

export type ActionKey = 'start' | 'call' | 'share' | 'save';

export const actions: { key: ActionKey; label: string | null }[] = [
  { key: 'start', label: 'Start' },
  { key: 'call', label: 'Call' },
  { key: 'share', label: 'Share' },
  { key: 'save', label: null },
];
