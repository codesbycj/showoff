/** The screen's content, kept out of the components so they stay presentational. */

export const form = {
  title: 'Transfer',
  destinationLabel: 'Destination',
  destination: 'Bank BCA',
  numberLabel: 'Account number',
  number: '8009665142887',
  cta: 'Continue',
} as const;

/**
 * The people you sent to last.
 *
 * Each payee carries a free-licensed portrait, bundled and credited in
 * `assets/images/finanssend/CREDITS.md`, and the indices are chosen so the
 * photograph suits the name.
 */
export const recent = [
  { key: 'amara', name: 'Amara', face: 1 },
  { key: 'ridho', name: 'Ridho', face: 0 },
  { key: 'safira', name: 'Safira', face: 3 },
  { key: 'inara', name: 'Inara', face: 5 },
  { key: 'mega', name: 'Mega', face: 7 },
] as const;

export const list = {
  title: 'Transfer list',
  filters: ['All', 'Friends', 'Favorites'],
  search: 'Search',
  rows: [
    { key: 'adam', name: 'Adam S.', number: '900764999451', bank: 'BCA', face: 2 },
    { key: 'agung', name: 'Agung Hapsin', number: '812654120093', bank: 'BRI', face: 4 },
    { key: 'bagus', name: 'Bagus Prakoso', number: '773901458820', bank: 'BNI', face: 6 },
    { key: 'citra', name: 'Citra Dewi', number: '664120983312', bank: 'BCA', face: 3 },
    { key: 'dimas', name: 'Dimas Putra', number: '551209874420', bank: 'Mandiri', face: 0 },
    { key: 'eka', name: 'Eka Wulandari', number: '480923118877', bank: 'BNI', face: 5 },
  ],
} as const;

export const headings = { recent: 'Last transfer' } as const;
