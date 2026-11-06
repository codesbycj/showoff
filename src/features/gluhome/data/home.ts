/**
 * Everything the home screen says.
 *
 * **The average is computed from the week.** The reference prints
 * "Avg. 108 mg/dL" beside a trend line drawn separately; here the figure is
 * the mean of `week`, so the number and the line are the same fact.
 *
 * **The waving hand is drawn, not an emoji.** Emoji differ across Windows,
 * Android and iOS and the web harness cannot check what Android draws.
 */
export const copy = {
  welcome: 'Welcome back, Jay',
  latest: 'Latest cgm reading',
  unit: 'mg/dL',
  inRange: 'In Range',
  at: '2:45 PM',
  insightTitle: 'Glu Insight',
  insightBody:
    'Your readings have been slightly higher after dinner this week. Morning fasting looks great.',
  trend: '7-day trend',
  today: "Today's readings",
} as const;

export const latest = 112;

export const week = [
  { id: 'mon', label: 'Mon', value: 104 },
  { id: 'tue', label: 'Tue', value: 118 },
  { id: 'wed', label: 'Wed', value: 97 },
  { id: 'thu', label: 'Thu', value: 126 },
  { id: 'fri', label: 'Fri', value: 103 },
  { id: 'sat', label: 'Sat', value: 115 },
  { id: 'sun', label: 'Sun', value: 108 },
] as const;

export const average = Math.round(week.reduce((t, d) => t + d.value, 0) / week.length);

export const readings = [
  { id: 'r1', label: 'After lunch', at: '2:45 PM', value: 112 },
  { id: 'r2', label: 'Before lunch', at: '1:15 PM', value: 135 },
];

export const tabs = [
  { id: 'home', label: 'Home', icon: 'home' as const },
  { id: 'insights', label: 'Insights', icon: 'trend' as const },
  { id: 'glu', label: 'Glu', icon: 'mascot' as const },
  { id: 'meals', label: 'Meals', icon: 'meals' as const },
  { id: 'profile', label: 'Profile', icon: 'person' as const },
];
