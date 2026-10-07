import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { FONT, LEVEL, SP, ll } from '../theme';

/**
 * The lime "Unlock Study Pro" banner, which the home and profile screens share.
 *
 * It clips a decorative circle that bleeds off its top-right corner, so the
 * banner carries no elevation of its own — a clip and an elevation on one View
 * is the pairing Android renders unreliably. The drop lives on the wrapper.
 *
 * The two screens draw it at slightly different scales: home sets the title at
 * 16dp inside 20dp padding, profile at 16dp inside 16dp. `compact` is that
 * difference, and nothing else varies.
 */
export function PromoBanner({
  title,
  body,
  cta,
  compact = false,
  onPress,
}: {
  title: string;
  body: string;
  cta: string;
  compact?: boolean;
  onPress?: () => void;
}) {
  const pad = compact ? SP.md : SP.margin;

  return (
    <View style={[{ borderRadius: 28 }, LEVEL.sm]}>
      <View style={{ borderRadius: 28, overflow: 'hidden' }}>
        <LinearGradient
          colors={['#9de843', '#88e02c']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: pad }}
        >
          {/* The soft circle bleeding off the top-right corner. */}
          <View
            style={{
              position: 'absolute',
              right: -32,
              top: -32,
              width: 128,
              height: 128,
              borderRadius: 64,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(0,0,0,0.1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="crown" size={17} color="#ffffff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 16,
                  lineHeight: 20,
                  letterSpacing: -0.2,
                  color: '#111712',
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: 12,
                  lineHeight: 16.5,
                  color: ll.onLime,
                  marginTop: 4,
                  opacity: 0.9,
                }}
              >
                {body}
              </Text>
            </View>
          </View>

          <Pressable onPress={onPress} accessibilityRole="button">
            <View
              style={[
                {
                  marginTop: compact ? 14 : SP.md,
                  height: 40,
                  borderRadius: 999,
                  backgroundColor: ll.surface,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                LEVEL.sm,
              ]}
            >
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 12.5,
                  lineHeight: 16,
                  letterSpacing: -0.1,
                  color: '#111712',
                }}
              >
                {cta}
              </Text>
            </View>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
}
