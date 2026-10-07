import { Bell, User } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { BRAND } from '../data/election';
import { FONT, R, SP, vt } from '../theme';
import { BallotMark } from './ballot-mark';
import { Wordmark } from './wordmark';

/**
 * Home's masthead: the mark and tagline on the left, the two account controls
 * on the right.
 *
 * The unread dot is drawn with a 2dp border in the *canvas* colour rather than
 * white, which is what cuts it out of the bell's strokes. Hardcoding white
 * there would leave a pale ring on this page's off-white.
 */
export function AppHeader({
  onNotifications,
  onProfile,
  unread = true,
}: {
  onNotifications?: () => void;
  onProfile?: () => void;
  unread?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SP.margin,
        paddingTop: 12,
        paddingBottom: SP.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <BallotMark />
        <View>
          <Wordmark size={24} ink={vt.ink} accent={vt.primary} />
          <Text
            style={{
              marginTop: 2,
              fontFamily: FONT.semibold,
              fontSize: 11,
              lineHeight: 15,
              letterSpacing: 0.275,
              color: vt.muted,
            }}
          >
            {BRAND.tagline}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Pressable onPress={onNotifications} hitSlop={6}>
          <View style={{ padding: SP.sm }}>
            <Bell size={24} color={vt.inkSoft} strokeWidth={2} />
            {unread ? (
              <View
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#EF4444',
                  borderWidth: 2,
                  borderColor: vt.canvas,
                }}
              />
            ) : null}
          </View>
        </Pressable>

        <Pressable onPress={onProfile} hitSlop={6}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: R.full,
              backgroundColor: '#E2E8F0',
              borderWidth: 1,
              borderColor: vt.ghost,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={20} color={vt.muted} fill={vt.muted} strokeWidth={0} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
