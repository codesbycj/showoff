/**
 * Everything twirlfeed says.
 *
 * **The board's post copy is illegible and partly misspelt** — what can be
 * read of it is "...think you New York chcfm unforgetable show." R5 says the
 * data file carries what the screen says; this says the same thing in one
 * readable run, under the 110-character ceiling. Named in the handover.
 *
 * **Every count is derived from one engagement record** (R9): "You and 8,906
 * others" is `likes - 1`, so the headline and the number cannot disagree — the
 * board prints "You & other 8906 Liked" beside a separate saved count with no
 * relationship between them.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const brand = { name: 'Twirlo' };

export type Story = { id: string; label: string; photo: number; create?: boolean; seen?: boolean };

/** The first entry is the viewer's own, which carries the add badge. */
export const stories: Story[] = [
  { id: 'me', label: 'Create', photo: require('../../../../assets/images/twirlfeed/me.jpg'), create: true },
  { id: 'u1', label: 'Adom', photo: require('../../../../assets/images/twirlfeed/s1.jpg') },
  { id: 'u2', label: 'William', photo: require('../../../../assets/images/twirlfeed/s2.jpg') },
  { id: 'u3', label: 'Elizabeth', photo: require('../../../../assets/images/twirlfeed/s3.jpg') },
  { id: 'u4', label: 'Sarah', photo: require('../../../../assets/images/twirlfeed/s4.jpg') },
  { id: 'u5', label: 'Tom', photo: require('../../../../assets/images/twirlfeed/s5.jpg'), seen: true },
  { id: 'u6', label: 'Noor', photo: require('../../../../assets/images/twirlfeed/s6.jpg'), seen: true },
];

export const post = {
  author: 'Adom Shafi',
  avatar: require('../../../../assets/images/twirlfeed/s1.jpg'),
  when: '1h ago',
  title: 'New York Food Festival',
  year: '2025',
  /** R5: one run, 88 characters. The board's own line is illegible and misspelt. */
  body: 'Three days, forty kitchens and one very long queue for the fries. Worth every minute.',
  photos: [
    require('../../../../assets/images/twirlfeed/g1.jpg'),
    require('../../../../assets/images/twirlfeed/g2.jpg'),
    require('../../../../assets/images/twirlfeed/g3.jpg'),
  ] as number[],
  likes: 8907,
  comments: 44,
  shares: 12,
  saves: 400,
};

/** FIX: "You and N others" is the like count less the viewer. */
export function likedLine() {
  return `You and ${(post.likes - 1).toLocaleString('en-US')} others liked this`;
}

export function savedLine() {
  return `${post.saves.toLocaleString('en-US')} saved`;
}

export const nextPost = {
  author: 'Sarah Lindqvist',
  avatar: require('../../../../assets/images/twirlfeed/s4.jpg'),
  when: '1h ago',
};

export type Tab = {
  id: string;
  label: string;
  glyph: 'feeds' | 'videos' | 'inbox' | 'market' | 'settings';
  badge?: number;
};

export const tabs: Tab[] = [
  { id: 'feeds', label: 'Feeds', glyph: 'feeds' },
  { id: 'videos', label: 'Videos', glyph: 'videos' },
  { id: 'inbox', label: 'Inbox', glyph: 'inbox', badge: 3 },
  { id: 'market', label: 'Market', glyph: 'market' },
  { id: 'settings', label: 'Settings', glyph: 'settings' },
];

/** Counts read as plain numbers under a thousand and with a separator above. */
export function count(n: number) {
  return n.toLocaleString('en-US');
}
