/**
 * Screen 3 content — the attorney profile.
 *
 * `METRICS` and `SPECIALTIES` carry explicit element types because both are
 * emptied one entry at a time for the timelapse, and an empty array literal
 * infers `never[]`.
 */

export const HEADER = {
  title: 'Attorney Profile Details',
  avatar: require('../../../../assets/images/auralegal/alexi-avatar.jpg') as number,
} as const;

export const LAWYER = {
  name: 'Alexi Turner',
  place: 'Sydney, Australia',
  specialty: 'Family Lawyer',
  portrait: require('../../../../assets/images/auralegal/alexi-portrait.jpg') as number,
} as const;

export type Metric = {
  key: string;
  label: string;
  value: string;
  /** The middle pod sits on its own raised fill; the outer two do not. */
  raised?: boolean;
  /** Only the rating carries a star. */
  star?: boolean;
  tone: 'secondary' | 'onSurface';
};

export const METRICS: readonly Metric[] = [
  { key: 'cases', label: 'Cases Won', value: '100+', tone: 'secondary' },
  { key: 'experience', label: 'Experience', value: '8+ yrs', raised: true, tone: 'onSurface' },
  { key: 'rating', label: 'Rating', value: '4.9', star: true, tone: 'secondary' },
];

export const BIO = {
  pill: 'About Lawyer',
  credential: 'NSW Bar Assoc.',
  /**
   * The export truncates its own summary with an ellipsis and hides the rest
   * behind "Read More". Both halves are carried: the screen shows `summary` and
   * the toggle reveals `rest`, which is what the reference's script does.
   */
  summary:
    'With a passion for justice and an unwavering commitment to client success, Alexi Turner stands as a seasoned legal professional specialized in high-stakes domestic litigation, family mediation, and asset safeguarding...',
  rest: 'Her modern approach blends compassionate advocacy with robust strategic negotiation, achieving milestone resolutions across complex international custody agreements and estate settlements.',
  more: 'Read More',
  less: 'Show Less',
} as const;

export type Specialty = { key: string; label: string };

export const SPECIALTIES: readonly Specialty[] = [
  { key: 'custody', label: 'Child Custody' },
  { key: 'property', label: 'Property Division' },
  { key: 'prenup', label: 'Prenuptial' },
  { key: 'mediation', label: 'Dispute Mediation' },
];

export const ENDORSEMENT = {
  title: 'Elite Tier Counsel',
  subtitle: 'Top 2% Ranked in Sydney Metro',
  badge: '99% Success',
} as const;

export const CTA = 'Book Appointment';
