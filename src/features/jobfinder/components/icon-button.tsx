import { type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { R, jf } from '../theme';

/**
 * The white circular control — search, notifications, back, filter, compose.
 *
 * Every screen's header is built from these, so the size is a prop rather than
 * a constant: the feed uses 40dp, the profile header 44dp.
 *
 * The visual box is an inner `View` for the same reason the CTA's is — a style
 * function on the `Pressable` is dropped in static render, and the harness only
 * ever takes static renders.
 */
export function IconButton({
  icon: Icon,
  onPress,
  size = 40,
  glyph = 16,
  tone = jf.card,
  inkTone = '#262626',
  strokeWidth = 2.2,
  fill,
  badge,
  accessibilityLabel,
}: {
  icon: LucideIcon;
  onPress?: () => void;
  size?: number;
  glyph?: number;
  tone?: string;
  inkTone?: string;
  strokeWidth?: number;
  /** Solid glyphs — the bookmark and the star — are filled, not just stroked. */
  fill?: string;
  /** A dot in the upper-right, ringed in the button's own fill. */
  badge?: string;
  accessibilityLabel?: string;
}) {
  // A bare control still has a hit area, but a shadow under a transparent disc
  // shows up as a grey halo where the reference has nothing.
  const bare = tone === 'transparent';
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: R.full,
          backgroundColor: tone,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000000',
          shadowOpacity: bare ? 0 : 0.05,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
          elevation: bare ? 0 : 1,
        }}
      >
        <Icon size={glyph} color={inkTone} strokeWidth={strokeWidth} fill={fill ?? 'transparent'} />
        {badge ? (
          <View
            style={{
              position: 'absolute',
              top: size * 0.25,
              right: size * 0.25,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: badge,
              borderWidth: 2,
              borderColor: tone,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
