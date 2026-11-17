import type { GlyphName } from '../components/glyph';

/**
 * Everything hushshare says, so the components stay presentational.
 *
 * **The share targets are generic.** The board names Instagram; that mark is
 * not ours to ship, and a row of other companies' logos is not this app's
 * interface (I1 / I4).
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const header = {
  title: 'Share',
  session: 'Sleep',
  mood: 'Relaxation',
  /** A share sheet always shows what it is about to send; the board crops it
   *  (I3). A link is a label, not a sentence (R5). */
  link: 'hush.fm/s/7Q2-NX',
  copy: 'Copy',
};

export type Target = { id: string; label: string; icon: GlyphName };

export const targets: Target[] = [
  { id: 'story', label: 'Story', icon: 'story' },
  // STEP 1.18 "Message"
  // { id: 'message', label: 'Message', icon: 'chat' },
  // STEP 1.19 "Copy link"
  // { id: 'link', label: 'Copy link', icon: 'link' },
  // STEP 1.20 "Mail"
  // { id: 'mail', label: 'Mail', icon: 'mail' },
  // STEP 1.21 "More"
  // { id: 'more', label: 'More', icon: 'more' },
];

/** The artwork is generated from these, not traced: a contour is an idea, and
 *  the same wave displaced twelve times is what the board draws (I4). */
export const wave = { lines: 12, points: 7 };
