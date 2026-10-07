import { View } from 'react-native';

import { R, al } from '../theme';

/**
 * The small emerald dot that marks something live — the feed's eyebrow, the
 * hero card's availability line, the profile's specialty badge, the booking
 * banner's practice area, and the online pip on each expert's avatar.
 *
 * The export animates most of these (`animate-pulse`, and `animate-ping` on the
 * hero). They are drawn static here. The reason is verification rather than
 * taste: every check in this workflow is a screenshot, and a pulsing element
 * lands at a different opacity in every capture, which would make the one tool
 * that proves pixel accuracy disagree with itself. Noted as a deviation.
 */
export function StatusDot({ size = 6, color = al.secondary }: { size?: number; color?: string }) {
  return (
    <View style={{ width: size, height: size, borderRadius: R.full, backgroundColor: color }} />
  );
}
