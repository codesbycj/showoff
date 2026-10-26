/**
 * Everything the exercise says, so the components stay presentational.
 *
 * The Italian is correct: "Come ti chiami?" is how you ask someone's name,
 * and `chiami` is the answer the chips are built around. The reference shows
 * the right answer already lit, which is a presentation state rather than a
 * quiz; here the choice is real state and starts unanswered.
 *
 * **The speakers are photographs.** They are people in a conversation, and a
 * face is a picture rather than an icon (AGENTS.md, "Faces are photographs").
 */

export const copy = {
  headline: ['What word is missing', 'in the dialog?'],
  action: 'Next',
} as const;

export const hearts = 5;

export const faces = [
  require('../../../../assets/images/larkquiz/face-1.jpg'),
  require('../../../../assets/images/larkquiz/face-2.jpg'),
];

export const lines = [
  { id: 'l1', who: 0, side: 'left', text: 'Ciao! Come ti ______?' },
  { id: 'l2', who: 1, side: 'right', text: 'Mi chiamo Marco. E tu?' },
  {
    id: 'l3',
    who: 0,
    side: 'left',
    text: 'Mi chiamo Laura, sono di Milano e studio all’università.',
  },
  { id: 'l4', who: 1, side: 'right', text: 'Che bello! Anch’io studio all’università.' },
] as const;

export const answers = ['parli', 'chiami', 'chiedi', 'stai'] as const;

/** The one that completes the dialog. */
export const correct = 'chiami';
