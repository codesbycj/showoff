/**
 * The three tickets.
 *
 * Stub is invented — the studio, the tiers, the prices and every line of copy.
 * The reference's own packages are not reproduced here; what was taken from it
 * is the shape of the object (a card with a face, a perforation and a priced
 * stub) and nothing that belongs to the company that made it.
 */

/** A run of copy. `em` marks the phrases that drop into the italic serif. */
export type Phrase = { text: string; em?: boolean };

export type Ticket = {
  /** Tier name, set in the italic serif at the top of the face. */
  name: string;
  /** Three letters, set huge on the back. The only thing visible face-down. */
  monogram: string;
  /** Serial along the top of the back, in the mono. */
  code: string;
  blurb: Phrase[];
  includes: Phrase[][];
  price: string;
  /** The small print along the bottom of the stub. */
  footnote: string;
};

export const TICKETS: Ticket[] = [
  {
    name: 'Signal',
    monogram: 'SGL',
    code: 'STB/PKG.01-S1',
    blurb: [
      { text: 'A standing start, turned into something credible enough to send to ' },
      { text: 'people who matter', em: true },
      { text: '.' },
    ],
    includes: [
      [{ text: 'One to three pages' }],
      [{ text: 'Custom visual direction' }],
      [{ text: 'Written for ' }, { text: 'one job', em: true }],
    ],
    price: '$2,400',
    footnote: 'No templates were used',
  },
  {
    name: 'Momentum',
    monogram: 'MMT',
    code: 'STB/PKG.02-M1',
    blurb: [
      {
        text: 'You already have traction. We take out the friction and leave a system your team can ',
      },
      { text: 'extend without us', em: true },
      { text: '.' },
    ],
    includes: [
      [{ text: 'Eight pages ' }, { text: '+ unlimited CMS', em: true }],
      [{ text: 'Complete brand identity' }],
      [{ text: 'Integrations, wired up' }],
    ],
    price: '$5,200',
    footnote: 'Valid for one launch',
  },
  {
    name: 'Flagship',
    monogram: 'FLG',
    code: 'STB/PKG.03-F1',
    blurb: [
      { text: 'The whole build — motion, tooling and a design system, ' },
      { text: 'documented end to end', em: true },
      { text: ' and handed over.' },
    ],
    includes: [
      [{ text: 'Unlimited pages and CMS' }],
      [{ text: 'A ' }, { text: 'bespoke', em: true }, { text: ' motion system' }],
      [{ text: 'Six months alongside you' }],
    ],
    price: '$9,800',
    footnote: 'Keep this stub',
  },
];

/**
 * The headline sitting behind the cards. Two soft lines, then one sharp one.
 *
 * Kept to roughly the reference's line lengths — eleven characters, then nine —
 * because the block is 600px wide at 80px type and a longer line does not break
 * gracefully, it breaks into three. Copy that has to fit a measure is written to
 * the measure.
 */
export const HEADLINE = {
  soft: ['We hand you', 'more than'],
  sharp: 'a finished file',
};
