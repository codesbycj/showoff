import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { FONT, LEVEL, nv } from '../theme';

/**
 * The onboarding CTA — a dark capsule with a lime circle set into its left end.
 *
 * The capsule is padded 6dp all round and 32dp on the right, so the lime circle
 * sits flush inside the corner radius and the label hangs off it. That
 * asymmetry is the whole shape; centring the contents loses it.
 */
export function StartButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: nv.onboardCard,
            borderRadius: 999,
            padding: 6,
            paddingRight: 32,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
          },
          LEVEL.card,
        ]}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: nv.lime,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="arrowRight" size={20} color="#000000" strokeWidth={2.5} />
        </View>

        <Text
          style={{
            fontFamily: FONT.semibold,
            fontSize: 16,
            lineHeight: 22,
            letterSpacing: 0.3,
            color: '#ffffff',
            marginLeft: 16,
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
