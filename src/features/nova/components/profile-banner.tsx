import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { FONT, LEVEL, R, nv } from '../theme';

/**
 * The blue account banner at the top of the settings screen.
 *
 * Same construction as the balance card — a clipped decorative circle inside,
 * so the drop lives on an outer wrapper — but a different content shape: an
 * avatar, a name with a lime Verified badge, a copyable address chip, and a
 * status row under a hairline.
 */
export function ProfileBanner({
  name,
  badge,
  address,
  account,
  status,
  onCopy,
}: {
  name: string;
  badge: string;
  address: string;
  account: string;
  status: string;
  onCopy?: () => void;
}) {
  return (
    <View style={[{ borderRadius: R.xl }, LEVEL.blue]}>
      <View
        style={{
          borderRadius: R.xl,
          backgroundColor: nv.blue,
          padding: 18,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: -40,
            bottom: -56,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: nv.blueGlow,
            opacity: 0.45,
          }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Avatar />

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 17,
                  lineHeight: 23,
                  letterSpacing: -0.34,
                  color: '#ffffff',
                }}
                numberOfLines={1}
              >
                {name}
              </Text>

              <View
                style={{
                  backgroundColor: nv.lime,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 999,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.bold,
                    fontSize: 10,
                    lineHeight: 14,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    color: nv.ink,
                  }}
                >
                  {badge}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={onCopy}
              accessibilityRole="button"
              accessibilityLabel="Copy address"
            >
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: R.sm,
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    fontSize: 12,
                    lineHeight: 16,
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  {address}
                </Text>
                <Icon name="copy" size={13} color="rgba(255,255,255,0.7)" />
              </View>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <Text
            style={{
              fontFamily: FONT.semibold,
              fontSize: 12,
              lineHeight: 16,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {account}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text
              style={{ fontFamily: FONT.semibold, fontSize: 12, lineHeight: 16, color: nv.lime }}
            >
              {status}
            </Text>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: nv.lime }} />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * The account avatar — an amber rounded square, rimmed in lime, holding a
 * figure, with a green tick clipped to its corner.
 *
 * Drawn rather than photographed: the export references no image file for it,
 * and at 56dp a silhouette carries the whole idea. The shirt is deliberately a
 * deeper navy than the banner behind it — at the card's own blue it read as a
 * hole punched through the avatar rather than as a body.
 */
function Avatar() {
  return (
    <View style={{ width: 56, height: 56 }}>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: R.base,
          backgroundColor: '#fde68a',
          borderWidth: 2,
          borderColor: 'rgba(200,241,53,0.8)',
          alignItems: 'center',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 10,
            width: 19,
            height: 19,
            borderRadius: 10,
            backgroundColor: '#3f2d12',
          }}
        />
        <View
          style={{
            width: 36,
            height: 18,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: '#1e3a8a',
          }}
        />
      </View>

      {/* The verification tick clipped to the bottom-right corner. */}
      <View
        style={{
          position: 'absolute',
          right: -2,
          bottom: -2,
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: '#22c55e',
          borderWidth: 2,
          borderColor: nv.blue,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="verified" size={10} color="#ffffff" strokeWidth={3} />
      </View>
    </View>
  );
}
