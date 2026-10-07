import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The header every tabbed screen wears: the mark, a notification button, a
 * token count in a lime pill, and the account photo ringed in lime.
 *
 * The mark here is the small lockup — a bold `Pesse` at 10dp with its lime dot,
 * then the word again at headline size. That is the reference's own doubling: a
 * logotype beside a wordmark, not one or the other.
 */
export function AppHeader({
  tokens,
  photo,
  onProfile,
  onNotifications,
}: {
  tokens: string;
  photo: number;
  onProfile?: () => void;
  onNotifications?: () => void;
}) {
  return (
    <View
      style={{
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
          <Text
            style={{
              fontFamily: FONT.extrabold,
              fontSize: 10,
              lineHeight: 13,
              letterSpacing: -0.2,
              color: ps.onSurface,
            }}
          >
            Pesse
          </Text>
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 1.5,
              backgroundColor: ps.lime,
              marginBottom: 2,
            }}
          />
        </View>
        <Text style={[TYPE.headlineSm, { color: ps.onSurface }]}>Pesse</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Pressable
          onPress={onNotifications}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.full,
              backgroundColor: ps.surfaceContainer,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="notifications" size={20} color={ps.onSurface} />
          </View>
        </Pressable>

        <View
          style={{
            height: 36,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingHorizontal: 12,
            borderRadius: R.full,
            backgroundColor: ps.lime,
          }}
        >
          <Symbol name="token" size={16} color={ps.onLime} />
          <Text style={[TYPE.labelMd, { color: ps.onLime }]}>{tokens}</Text>
        </View>

        <Pressable onPress={onProfile} accessibilityRole="button" accessibilityLabel="Profile">
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: R.full,
              borderWidth: 2,
              borderColor: ps.lime,
              padding: 2,
            }}
          >
            <Image
              source={photo}
              style={{ width: 28, height: 28, borderRadius: 14 }}
              contentFit="cover"
              transition={0}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
