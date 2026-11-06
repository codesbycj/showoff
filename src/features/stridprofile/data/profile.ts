/**
 * Everything the profile says.
 *
 * The badge description is the reference's, trimmed to one line: "Has
 * completed 90% of weekly activity goals over the past month" is 58
 * characters and stays well under the copy ceiling, so only the tense moved.
 */
export const copy = {
  name: 'Lisaoohnil',
  handle: '@liso_345',
  follow: 'Follow',
  award: 'Consistency Pro',
  awardBody: 'Completed 90% of weekly activity goals over the past month.',
  compare: 'Compare',
  rate: '6/Week',
} as const;

export const photo = require('../../../../assets/images/stridprofile/lisa.jpg');

export const stats = [
  { id: 'followers', label: 'Followers', value: '1,130' },
  { id: 'following', label: 'Following', value: '475' },
  { id: 'activities', label: 'Activities', value: '12' },
];

/** Five badges, the middle one the award named under the row. */
export const badges = [
  { id: 'b3', num: '3', tone: 'locked' as const },
  { id: 'b4', num: '4', tone: 'silver' as const },
  { id: 'b5', num: '5', tone: 'bronze' as const, on: true },
  { id: 'b6', num: '', tone: 'locked' as const },
  { id: 'b7', num: '', tone: 'locked' as const },
];
