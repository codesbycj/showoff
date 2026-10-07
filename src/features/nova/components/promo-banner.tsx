import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { FONT, LEVEL, R, nv } from '../theme';

/**
 * The dark "Auto-Invest" banner on the dashboard.
 *
 * It clips a soft circle off its bottom-right corner, so the clip and the drop
 * are split across two Views — the same rule the balance card follows.
 *
 * The title carries a lime run inside it, which is why `title` and `titleAccent`
 * are two props rather than one string: the accent has to sit on the same
 * baseline as the rest, which only a nested `Text` gives.
 */
export function PromoBanner({
  eyebrow,
  title,
  titleAccent,
  body,
  onPress,
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  body: string;
  onPress?: () => void;
}) {
  return (
    <View style={[{ borderRadius: R.lg }, LEVEL.sm]}>
      <View
        style={{
          borderRadius: R.lg,
          backgroundColor: nv.inkCard,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: -16,
            bottom: -24,
            width: 112,
            height: 112,
            borderRadius: 56,
            backgroundColor: '#2a2e39',
            opacity: 0.4,
          }}
        />

        <View style={{ flex: 1, paddingRight: 12 }}>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(200,241,53,0.12)',
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 6,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 10,
                lineHeight: 14,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: nv.lime,
              }}
            >
              {eyebrow}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 14,
              lineHeight: 19,
              letterSpacing: -0.14,
              color: '#ffffff',
            }}
          >
            {title}{' '}
            <Text style={{ fontFamily: FONT.extrabold, color: nv.lime }}>{titleAccent}</Text>
          </Text>

          <Text
            style={{
              fontFamily: FONT.regular,
              fontSize: 11,
              lineHeight: 15,
              color: '#9ca3af',
              marginTop: 2,
            }}
          >
            {body}
          </Text>
        </View>

        <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: nv.lime,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="arrowRight" size={16} color={nv.ink} strokeWidth={2.5} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
