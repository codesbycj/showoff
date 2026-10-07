import { Text, View } from 'react-native';

import { FONT, jf } from '../theme';

/**
 * A small heading with a note at the far right — "Selected Case Studies" /
 * "3 of 18".
 *
 * The two are aligned on their baselines rather than centred on each other,
 * because they are different sizes and centring 14dp bold against 12dp semibold
 * leaves the smaller one visibly high.
 */
export function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
      }}
    >
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: 14,
          lineHeight: 19,
          letterSpacing: -0.2,
          color: jf.ink,
        }}
      >
        {title}
      </Text>
      {note ? (
        <Text style={{ fontFamily: FONT.semibold, fontSize: 12, lineHeight: 17, color: jf.muted }}>
          {note}
        </Text>
      ) : null}
    </View>
  );
}
