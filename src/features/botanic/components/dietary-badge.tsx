import { Text, View } from 'react-native';

import type { SymbolName } from '../symbols';
import { alpha, bt, radius, type as t } from '../theme';
import { Symbol } from './symbol';

/**
 * One of the two pills pinned to the dish's corners.
 *
 * `px-3 py-1` over a 16dp glyph gives the 24dp height the DOM reports, and the
 * fill is `bg-surface-container/85` — translucent, so the photograph reads
 * faintly through it. The export also asks for a `backdrop-blur-md` here, which
 * React Native cannot do over an image without compositing the image twice;
 * the alpha carries alone and the difference at this size is a few levels of
 * one channel.
 *
 * `gap` is a prop because the two badges genuinely disagree — `gap-1.5` on the
 * plant-based pill, `gap-1` on the spice one. That is Stitch generating each in
 * its own pass rather than a considered distinction, but it is 2dp that shows
 * at this scale, so it is reproduced rather than averaged away.
 */
export function DietaryBadge({
  icon,
  label,
  tint,
  gap,
  style,
}: {
  icon: SymbolName;
  label: string;
  tint: string;
  gap: number;
  style?: object;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: radius.full,
          backgroundColor: alpha.badge,
        },
        style,
      ]}
    >
      <Symbol name={icon} size={16} color={tint} />
      <Text
        style={{
          fontFamily: t.labelSm.family,
          fontSize: t.labelSm.size,
          lineHeight: t.labelSm.line,
          letterSpacing: t.labelSm.tracking,
          color: bt.ink,
        }}
      >
        {label.toUpperCase()}
      </Text>
    </View>
  );
}
